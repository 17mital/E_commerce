const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authentication Middleware
async function auth(req, res, next) {
  console.log("🛂 Auth middleware hit");

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.warn("⚠️ Authorization header missing or malformed");
      return res.status(401).json({ error: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id || decoded.userId).select('-password');

    if (!user) {
      console.warn("⚠️ User not found after decoding token");
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user; // Attach user to request object

    // ✅ Debug logs
    console.log("✅ Auth Middleware: User verified");
    console.log("   👉 ID:", user._id);
    console.log("   👉 Email:", user.email);
    console.log("   👉 Role:", user.role);

    next();
  } catch (err) {
    console.error("❌ Auth error:", err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Role-Based Access Middleware
function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      console.warn("❌ No user attached to request in authorize middleware");
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      console.warn(`⛔ Forbidden: role '${req.user.role}' not in [${allowedRoles}]`);
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  };
}

module.exports = {
  auth,
  authorize,
};
