"use client"

import { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import "./Chatbot.css"

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your shopping assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickReplies = [
    "Track my order",
    "Return policy",
    "Product recommendations",
    "Contact support",
    "Shipping info",
    "Payment help",
  ]

  const botResponses = {
    "track my order": "You can track your order in the 'My Orders' section of your profile. Would you like me to redirect you there?",
    "return policy": "We offer a 30-day return policy for most items. Items must be in original condition with tags attached.",
    "product recommendations": "I'd be happy to recommend products! What category are you interested in? Electronics, Clothing, Books, or something else?",
    "contact support": "You can reach our support team at support@ecomstore.com or through our Support page. They're available 24/7!",
    "shipping info": "We offer free standard shipping (3-5 days) and express shipping (1-2 days) for a small fee. Where are you shipping to?",
    "payment help": "We accept all major credit cards, PayPal, and digital wallets. Is there a specific payment issue you're experiencing?",
    hello: "Hello! Welcome to our store. I'm here to help you with any questions about products, orders, or shopping.",
    hi: "Hi there! How can I assist you with your shopping today?",
    help: "I can help you with:\n• Product information\n• Order tracking\n• Returns & exchanges\n• Shipping details\n• Payment issues\n• General support",
    default: "I understand you're looking for help. Could you please be more specific? You can also try one of the quick options below or contact our support team for detailed assistance.",
  }

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase().trim()
    
    // Check for exact matches first
    if (botResponses[message]) {
      return botResponses[message]
    }
    
    // Check for partial matches
    for (const [key, response] of Object.entries(botResponses)) {
      if (message.includes(key) || key.includes(message)) {
        return response
      }
    }
    
    // Default response
    return botResponses.default
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickReply = (reply) => {
    setInputMessage(reply)
    setTimeout(() => handleSendMessage(), 100)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="chatbot-container">
      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="bot-avatar">
              <span>🤖</span>
            </div>
            <div className="bot-details">
              <h4>Shopping Assistant</h4>
              <span className="bot-status">Online</span>
            </div>
          </div>
          <button className="close-chat-btn" onClick={() => setIsOpen(false)}>
            ×
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">{formatTime(message.timestamp)}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message bot">
              <div className="message-content typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="quick-replies">
          <p>Quick options:</p>
          <div className="quick-replies-grid">
            {quickReplies.map((reply, index) => (
              <button key={index} className="quick-reply-btn" onClick={() => handleQuickReply(reply)}>
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="chatbot-input">
          <div className="input-wrapper">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              rows="1"
              className="message-input"
            />
            <button className="send-btn" onClick={handleSendMessage} disabled={!inputMessage.trim()}>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Powered by */}
        <div className="chatbot-footer">
          <span>Powered by AI Assistant</span>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button className={`chatbot-toggle ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <span className="close-icon">×</span>
        ) : (
          <span className="chat-icon">💬</span>
        )}
        {!isOpen && <div className="notification-badge">1</div>}
      </button>
    </div>
  )
}
