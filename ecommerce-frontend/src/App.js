import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Chatbot from "./components/Chatbot"

import Home from "./pages/Home"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Login from "./pages/LoginUser"
import Signup from "./pages/SignupUser"
import AddProduct from "./pages/AddProduct"
import ShopkeeperDashboard from "./pages/ShopkeeperDashboard"
import EditProduct from "./pages/EditProduct"
import RequireCustomer from "./components/RequireCustomer"
import RequireShopkeeper from "./components/RequireShopkeeper"
import CheckoutPage from "./pages/CheckoutPage"
import Wishlist from "./pages/Wishlist"
import Profile from "./pages/Profile"
import Support from "./pages/Support"
import OrderSuccess from "./pages/OrderSuccess"

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  // Check if user is a customer
  const isCustomer = isAuthenticated && user?.role === "customer"

  return (
    <Router>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/support" element={<Support />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route
            path="/cart"
            element={
              <RequireCustomer>
                <Cart />
              </RequireCustomer>
            }
          />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/checkout"
            element={
              <RequireCustomer>
                <CheckoutPage />
              </RequireCustomer>
            }
          />
          <Route
            path="/wishlist"
            element={
              <RequireCustomer>
                <Wishlist />
              </RequireCustomer>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireCustomer>
                <Profile />
              </RequireCustomer>
            }
          />
          {/* Shopkeeper-only routes with wrapper */}
          <Route
            path="/add-product"
            element={
              <RequireShopkeeper>
                <AddProduct />
              </RequireShopkeeper>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RequireShopkeeper>
                <ShopkeeperDashboard />
              </RequireShopkeeper>
            }
          />
          <Route
            path="/edit-product/:id"
            element={
              <RequireShopkeeper>
                <EditProduct />
              </RequireShopkeeper>
            }
          />
        </Routes>
      </div>
      <Footer />

      {/* Chatbot - only visible to customers */}
      {isCustomer && <Chatbot />}
    </Router>
  )
}

export default App
