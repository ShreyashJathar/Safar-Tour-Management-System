import React, { useState, useRef, useEffect } from "react";

export default function SafarCopilot({ tours = [], hotels = [], onSelectTour, onSelectHotel }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Namaste & Welcome! 🙏 I'm your Safar AI Travel Copilot powered by intelligent destination reasoning. Where would you like to travel today? Ask me about budgets in ₹, global countries, beach resorts, or Himalayan adventures!",
      tours: [],
      hotels: []
    }
  ]);
  const [input, setInput] = useState("");
  const [dynamicChips, setDynamicChips] = useState(["🌊 Rishikesh Rafting", "🇦🇪 Dubai Luxury", "🗼 Paris Romance", "🏖️ Goa Beaches", "🇲🇻 Maldives Villa"]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  // Intelligent Reasoning Engine
  const processQuery = (rawQuery) => {
    const query = rawQuery.trim();
    if (!query) return;

    const qLower = query.toLowerCase();

    // 1. Budget extraction (Regex for 50k, 60000, 1 lakh, under 40000)
    let extractedMaxBudget = null;
    if (qLower.includes("k") && (qLower.includes("under") || qLower.includes("below") || qLower.includes("<") || qLower.includes("budget"))) {
      const match = qLower.match(/(\d+)\s*k/);
      if (match) extractedMaxBudget = parseInt(match[1]) * 1000;
    } else if (qLower.includes("lakh") || qLower.includes("lac")) {
      const match = qLower.match(/(\d+)\s*(lakh|lac)/);
      if (match) extractedMaxBudget = parseInt(match[1]) * 100000;
    } else {
      const match = qLower.match(/(\d{4,6})/);
      if (match) extractedMaxBudget = parseInt(match[1]);
    }

    let replyText = "";
    let matchedTours = [];
    let matchedHotels = [];
    let nextChips = ["🌊 Rishikesh Rafting", "🇦🇪 Dubai Luxury", "🗼 Paris Romance", "🏖️ Goa Beaches", "🇲🇻 Maldives Villa"];

    // 2. Intent Matching
    if (extractedMaxBudget) {
      replyText = `🤖 AI Budget Filter: Here are handpicked packages within your target budget of ₹${extractedMaxBudget.toLocaleString("en-IN")}:`;
      matchedTours = tours.filter(t => t.price <= extractedMaxBudget).sort((a, b) => b.rating - a.rating).slice(0, 3);
      matchedHotels = hotels.filter(h => h.price <= extractedMaxBudget).sort((a, b) => b.rating - a.rating).slice(0, 3);
      nextChips = ["Under ₹30,000", "Under ₹60,000", "Under ₹1,000,000", "🏖️ Beach Escapes"];
    } else if (qLower.includes("dubai") || qLower.includes("uae") || qLower.includes("burj")) {
      replyText = "🇦🇪 Dubai Insight: Famous for the Burj Khalifa, red dune desert safaris, luxury yacht cruises, and gold souk shopping!";
      matchedTours = tours.filter(t => t.location.toLowerCase().includes("dubai") || t.title.toLowerCase().includes("dubai"));
      nextChips = ["🗼 Paris Escapade", "🇯🇵 Tokyo Odyssey", "🇲🇻 Maldives Villa", "🏖️ Goa Beaches"];
    } else if (qLower.includes("paris") || qLower.includes("france") || qLower.includes("eiffel") || qLower.includes("europe")) {
      replyText = "🇫🇷 Europe Insight: Experience the Eiffel Tower summit, Seine river dinner cruises, Louvre Mona Lisa, and French Riviera coastline!";
      matchedTours = tours.filter(t => t.location.toLowerCase().includes("france") || t.location.toLowerCase().includes("paris") || t.location.toLowerCase().includes("italy") || t.location.toLowerCase().includes("uk"));
      nextChips = ["🇯🇵 Tokyo Odyssey", "🇹🇷 Turkey Cappadocia", "🇬🇧 London UK", "🇮🇹 Rome Italy"];
    } else if (qLower.includes("japan") || qLower.includes("tokyo") || qLower.includes("kyoto") || qLower.includes("cherry")) {
      replyText = "🇯🇵 Japan Insight: Marvel at futuristic Shinjuku neon lights, Mount Fuji snow views, 300 km/h Shinkansen bullet train, and Kyoto Torii gates!";
      matchedTours = tours.filter(t => t.location.toLowerCase().includes("japan") || t.location.toLowerCase().includes("tokyo"));
      nextChips = ["🇦🇪 Dubai Luxury", "🇲🇻 Maldives Villa", "🇸🇬 Singapore", "🇹🇭 Thailand"];
    } else if (qLower.includes("maldives") || qLower.includes("bungalow") || qLower.includes("honeymoon")) {
      replyText = "🇲🇻 Maldives Honeymoon: Overwater ocean bungalow, floating pool breakfast, sunset dolphin catamaran cruise, and house reef snorkeling!";
      matchedTours = tours.filter(t => t.location.toLowerCase().includes("maldives") || t.category === "Beach");
      matchedHotels = hotels.filter(h => h.location.toLowerCase().includes("goa") || h.location.toLowerCase().includes("andaman"));
      nextChips = ["🏖️ Goa Beach", "🏝️ Kerala Lagoon", "🌊 Rishikesh Rafting", "⛰️ Shimla Snow"];
    } else if (qLower.includes("rafting") || qLower.includes("rishikesh") || qLower.includes("ganges")) {
      replyText = "🌊 Rishikesh Adventure Insight: White water rafting down Grade III Ganges rapids, cliff jumping, Himalayan camping & Ganga Aarti!";
      matchedTours = tours.filter(t => t.location.toLowerCase().includes("rishikesh") || t.title.toLowerCase().includes("rafting"));
      nextChips = ["⛰️ Manali Snow", "🏔️ Leh Ladakh", "🏖️ Goa Beaches", "⛩️ Varanasi Ghats"];
    } else if (qLower.includes("goa") || qLower.includes("beach") || qLower.includes("sea") || qLower.includes("ocean")) {
      replyText = "🏖️ Tropical Beach Escapes: Sunny coastlines, watersports, palm-fringed private houseboats, and seaside luxury resorts:";
      matchedTours = tours.filter(t => t.category === "Beach" || t.location.toLowerCase().includes("goa") || t.location.toLowerCase().includes("phuket"));
      matchedHotels = hotels.filter(h => h.location.toLowerCase().includes("goa") || h.amenities?.some(a => a.toLowerCase().includes("pool")));
      nextChips = ["🇲🇻 Maldives Villa", "🏝️ Kerala Backwaters", "🇹🇭 Thailand Phuket", "🇸🇬 Singapore"];
    } else if (qLower.includes("snow") || qLower.includes("mountain") || qLower.includes("leh") || qLower.includes("ladakh") || qLower.includes("manali") || qLower.includes("shimla")) {
      replyText = "❄️ Himalayan & Alpine Peaks: Crisp mountain air, high altitude passes, glaciers, snow chalets, and thermal baths:";
      matchedTours = tours.filter(t => t.category === "Mountain" || t.location.toLowerCase().includes("manali") || t.location.toLowerCase().includes("leh") || t.location.toLowerCase().includes("swiss"));
      nextChips = ["🏔️ Leh Ladakh", "⛷️ Swiss Alps", "❄️ Gulmarg Kashmir", "🌊 Rishikesh Rafting"];
    } else if (qLower.includes("hotel") || qLower.includes("resort") || qLower.includes("stay") || qLower.includes("palace")) {
      replyText = "🏨 Luxury Resorts & Heritage Palaces: Boutique suites, infinity pools, royal hospitality, and private wellness spas:";
      matchedHotels = hotels.slice(0, 4);
      nextChips = ["👑 Udaipur Palace", "🌊 Goa Beach Resort", "🌿 Kerala Heritage", "🏰 Taj View Hotel"];
    } else {
      replyText = `🔍 Safar Copilot AI Search results for "${query}":`;
      matchedTours = tours.filter(t => 
        t.title.toLowerCase().includes(qLower) || 
        t.location.toLowerCase().includes(qLower) ||
        t.description.toLowerCase().includes(qLower)
      ).slice(0, 3);

      matchedHotels = hotels.filter(h => 
        h.name.toLowerCase().includes(qLower) || 
        h.location.toLowerCase().includes(qLower)
      ).slice(0, 2);

      if (matchedTours.length === 0 && matchedHotels.length === 0) {
        replyText = `I couldn't find an exact match for "${query}", but here are our top-rated featured destinations:`;
        matchedTours = tours.filter(t => t.featured).slice(0, 3);
      }
    }

    setMessages(prev => [
      ...prev,
      {
        sender: "user",
        text: query
      },
      {
        sender: "bot",
        text: replyText,
        tours: matchedTours,
        hotels: matchedHotels
      }
    ]);
    setDynamicChips(nextChips);
    setInput("");
  };

  return (
    <>
      {/* Floating Copilot Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          background: "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)",
          color: "white",
          border: "none",
          borderRadius: "100px",
          padding: "12px 22px",
          fontSize: "0.95rem",
          fontWeight: "800",
          boxShadow: "0 10px 30px rgba(168, 85, 247, 0.5)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          transition: "all 0.25s ease"
        }}
      >
        <span style={{ fontSize: "1.3rem" }}>🤖</span>
        <span>Safar Copilot AI</span>
      </button>

      {/* Copilot Drawer Window */}
      {isOpen && (
        <div 
          className="animate-scale-up glassmorphic"
          style={{
            position: "fixed",
            bottom: "85px",
            right: "24px",
            width: "380px",
            height: "530px",
            zIndex: 9999,
            background: "var(--bg-secondary)",
            border: "1px solid rgba(168, 85, 247, 0.4)",
            borderRadius: "20px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.7)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
          }}
        >
          {/* Header Bar */}
          <div style={{ background: "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)", color: "white", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "1.4rem" }}>🤖</span>
              <div>
                <strong style={{ fontSize: "0.95rem", display: "block", color: "white" }}>Safar AI Copilot v2.0</strong>
                <span style={{ fontSize: "0.72rem", opacity: 0.9, color: "#00df89", fontWeight: "700" }}>● Intelligent Trip Engine Active</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "white", fontSize: "1.3rem", cursor: "pointer" }}>✕</button>
          </div>

          {/* Messages Feed */}
          <div style={{ flex: 1, padding: "14px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px" }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ alignSelf: msg.sender === "user" ? "flex-end" : "flex-start", maxWidth: "88%" }}>
                <div 
                  style={{
                    background: msg.sender === "user" ? "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)" : "rgba(168, 85, 247, 0.12)",
                    color: msg.sender === "user" ? "white" : "var(--text-primary)",
                    padding: "10px 14px",
                    borderRadius: msg.sender === "user" ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                    fontSize: "0.88rem",
                    fontWeight: "500",
                    lineHeight: "1.45",
                    border: msg.sender === "bot" ? "1px solid rgba(168, 85, 247, 0.3)" : "none"
                  }}
                >
                  {msg.text}
                </div>

                {/* Tour Cards inside chat */}
                {msg.tours && msg.tours.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
                    {msg.tours.map(t => (
                      <div 
                        key={t.id}
                        onClick={() => onSelectTour(t)}
                        style={{
                          display: "flex",
                          gap: "10px",
                          background: "var(--bg-primary)",
                          border: "1px solid #00df89",
                          borderRadius: "12px",
                          padding: "8px",
                          cursor: "pointer",
                          transition: "transform 0.2s ease"
                        }}
                      >
                        <img src={t.image} alt="" style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }} />
                        <div style={{ flex: 1, overflow: "hidden" }}>
                          <strong style={{ fontSize: "0.82rem", color: "var(--text-primary)", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.title}</strong>
                          <span style={{ fontSize: "0.74rem", color: "var(--text-muted)", display: "block" }}>📍 {t.location}</span>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
                            <span style={{ fontSize: "0.85rem", color: "#00df89", fontWeight: "800" }}>₹{t.price.toLocaleString("en-IN")}</span>
                            <span style={{ fontSize: "0.7rem", background: "#00df89", color: "#0b132a", padding: "2px 6px", borderRadius: "4px", fontWeight: "700" }}>Book Now</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Hotel Cards inside chat */}
                {msg.hotels && msg.hotels.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
                    {msg.hotels.map(h => (
                      <div 
                        key={h.id}
                        onClick={() => onSelectHotel(h)}
                        style={{
                          display: "flex",
                          gap: "10px",
                          background: "var(--bg-primary)",
                          border: "1px solid #a855f7",
                          borderRadius: "12px",
                          padding: "8px",
                          cursor: "pointer",
                          transition: "transform 0.2s ease"
                        }}
                      >
                        <img src={h.image} alt="" style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }} />
                        <div style={{ flex: 1, overflow: "hidden" }}>
                          <strong style={{ fontSize: "0.82rem", color: "var(--text-primary)", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{h.name}</strong>
                          <span style={{ fontSize: "0.74rem", color: "var(--text-muted)", display: "block" }}>📍 {h.location}</span>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
                            <span style={{ fontSize: "0.85rem", color: "#a855f7", fontWeight: "800" }}>₹{h.price.toLocaleString("en-IN")} / night</span>
                            <span style={{ fontSize: "0.7rem", background: "#a855f7", color: "white", padding: "2px 6px", borderRadius: "4px", fontWeight: "700" }}>Select Suite</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Dynamic Contextual Suggestion Chips */}
          <div style={{ padding: "8px 12px", borderTop: "1px solid var(--border-color)", display: "flex", gap: "6px", overflowX: "auto" }}>
            {dynamicChips.map((chip, idx) => (
              <button 
                key={idx}
                onClick={() => processQuery(chip)} 
                style={{ 
                  whiteSpace: "nowrap", 
                  fontSize: "0.73rem", 
                  background: "rgba(168, 85, 247, 0.12)", 
                  border: "1px solid rgba(168, 85, 247, 0.4)", 
                  color: "var(--text-primary)", 
                  padding: "5px 12px", 
                  borderRadius: "100px", 
                  cursor: "pointer", 
                  fontWeight: "600" 
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Intelligent Input Box */}
          <form 
            onSubmit={(e) => { 
              e.preventDefault(); 
              processQuery(input); 
            }} 
            style={{ padding: "10px 12px", borderTop: "1px solid var(--border-color)", display: "flex", gap: "8px" }}
          >
            <input 
              type="text" 
              placeholder="Ask AI: e.g. Dubai under 60k, Maldives..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ flex: 1, background: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: "100px", padding: "10px 16px", color: "var(--text-primary)", fontSize: "0.85rem", outline: "none" }}
            />
            <button type="submit" style={{ background: "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)", color: "white", border: "none", borderRadius: "50%", width: "38px", height: "38px", cursor: "pointer", fontWeight: "bold" }}>➔</button>
          </form>
        </div>
      )}
    </>
  );
}
