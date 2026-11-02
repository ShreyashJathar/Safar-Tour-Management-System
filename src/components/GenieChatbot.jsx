import React, { useState } from "react";

export default function GenieChatbot({ onSelectDestination }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "genie",
      text: "👋 Hi! I'm GENIE, your Safar AI Travel Concierge. Where would you like to travel next? Ask me about flights, top hotels in Goa, or budget hacks!"
    }
  ]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    const text = inputText.trim();
    if (!text) return;

    const userMsg = { id: Date.now(), sender: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");

    setTimeout(() => {
      let reply = "I found great options matching your plan! Check out our featured resorts in Goa, Dubai, and the Swiss Alps.";
      const lower = text.toLowerCase();
      if (lower.includes("hotel") || lower.includes("stay") || lower.includes("room")) {
        reply = "Looking for hotels? We offer verified price match guarantees on 5-star properties across India and international retreats.";
      } else if (lower.includes("flight") || lower.includes("ticket") || lower.includes("airline")) {
        reply = "Safar Flights provides zero-convenience fee bookings and real-time PNR confirmation for domestic & international routes.";
      } else if (lower.includes("coupon") || lower.includes("discount") || lower.includes("promo") || lower.includes("offer")) {
        reply = "Use coupon code SAFAR10 for 10% off, FIRSTTRIP for ₹500 off, or LUXURY2026 for 15% off luxury packages!";
      } else if (lower.includes("goa") || lower.includes("manali") || lower.includes("kerala")) {
        reply = `Awesome choice! We have hand-picked 4-star and 5-star packages for ${text.toUpperCase()} with complimentary breakfast and cab transfers.`;
      }

      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, sender: "genie", text: reply }
      ]);
    }, 600);
  };

  return (
    <div className="safar-genie-container">
      {/* Floating Genie Pill / Icon */}
      {!isOpen && (
        <button className="genie-floating-btn" onClick={() => setIsOpen(true)}>
          <div className="genie-icon-badge">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-1v1a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-1H7a3 3 0 0 1-3-3v-5a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z"></path>
              <circle cx="9" cy="11" r="1.5" fill="currentColor"></circle>
              <circle cx="15" cy="11" r="1.5" fill="currentColor"></circle>
            </svg>
          </div>
          <span className="genie-pill-label">GENIE</span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="genie-chat-window animate-scale-up">
          <div className="genie-chat-header">
            <div className="genie-header-info">
              <div className="genie-avatar">🧞</div>
              <div>
                <h4>Safar GENIE AI</h4>
                <p>● Online 24/7 Concierge</p>
              </div>
            </div>
            <button className="genie-close-btn" onClick={() => setIsOpen(false)}>&times;</button>
          </div>

          <div className="genie-chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`genie-bubble-row ${msg.sender}`}>
                {msg.sender === "genie" && <div className="genie-bubble-avatar">🧞</div>}
                <div className={`genie-bubble ${msg.sender}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form className="genie-chat-input-bar" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Ask Genie anything about travel..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              autoFocus
            />
            <button type="submit" className="genie-send-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
