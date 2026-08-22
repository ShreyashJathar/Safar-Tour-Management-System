import React, { useState } from "react";

export default function WeatherWidget({ location = "", category = "Nature" }) {
  const locLower = location.toLowerCase();

  // Climate data generator based on location
  let temp = "24°C";
  let weatherCondition = "Pleasant & Clear 🌤️";
  let bestTime = "October to March";
  let defaultPackList = ["Sunglasses & Sunscreen", "Comfortable Walking Shoes", "Camera & Charger", "Light Cotton Clothes"];

  if (locLower.includes("leh") || locLower.includes("ladakh") || locLower.includes("gulmarg") || locLower.includes("manali") || locLower.includes("shimla")) {
    temp = locLower.includes("gulmarg") ? "4°C" : "14°C";
    weatherCondition = "Crisp Mountain Air ❄️";
    bestTime = "May to September (Snow: Dec-Feb)";
    defaultPackList = [
      "Thermal Innerwear & Heavy Jackets",
      "Gore-Tex Snow Boots / Trekking Shoes",
      "UV Protective Sunglasses & Lip Balm",
      "Personal First Aid & Altitude Meds",
      "Powerbank & Woolen Gloves"
    ];
  } else if (locLower.includes("goa") || locLower.includes("alleppey") || locLower.includes("kerala") || locLower.includes("andaman")) {
    temp = "28°C";
    weatherCondition = "Tropical Sea Breeze 🌊";
    bestTime = "November to February";
    defaultPackList = [
      "Light Linen Shirts & Shorts",
      "Swimwear & Beach Towel",
      "Waterproof Phone Pouch",
      "SPF 50+ Sunscreen & Hat",
      "Flip-flops & Mosquito Repellent"
    ];
  } else if (locLower.includes("rishikesh") || locLower.includes("haridwar") || locLower.includes("varanasi") || locLower.includes("jaipur") || locLower.includes("udaipur") || locLower.includes("agra")) {
    temp = "22°C";
    weatherCondition = "Sunny & Cultural Vibe ☀️";
    bestTime = "October to March";
    defaultPackList = [
      "Modest Clothing for Temples/Ghats",
      "Slip-on Shoes / Sandals",
      "Re-usable Water Bottle",
      "Light Jacket for Evenings",
      "Hand Sanitizer & Moist Tissues"
    ];
  }

  const [checkedItems, setCheckedItems] = useState({});

  const toggleItem = (item) => {
    setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <div className="weather-widget-container glassmorphic" style={{ padding: "20px", borderRadius: "16px", marginBottom: "24px", border: "1px solid var(--border-color)", background: "rgba(255,255,255,0.03)" }}>
      {/* Header climate row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "14px" }}>
        <div>
          <span style={{ fontSize: "0.8rem", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.05em", fontWeight: "700" }}>Live Destination Climate</span>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px" }}>
            <span style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--text-primary)" }}>{temp}</span>
            <span style={{ fontSize: "1rem", fontWeight: "600", color: "#00df89" }}>{weatherCondition}</span>
          </div>
        </div>
        
        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: "0.8rem", textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.05em", fontWeight: "700" }}>Recommended Visit Window</span>
          <p style={{ fontSize: "0.9rem", fontWeight: "700", color: "var(--text-primary)", marginTop: "4px" }}>🗓️ {bestTime}</p>
        </div>
      </div>

      {/* Smart Packing Checklist */}
      <div>
        <h4 style={{ fontSize: "0.95rem", fontWeight: "700", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
          🎒 Smart Packing Checklist for {location.split(",")[0]}
        </h4>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "8px" }}>
          {defaultPackList.map((item, idx) => (
            <label 
              key={idx} 
              onClick={() => toggleItem(item)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.85rem",
                padding: "8px 12px",
                borderRadius: "8px",
                background: checkedItems[item] ? "rgba(0, 223, 137, 0.15)" : "rgba(255,255,255,0.04)",
                border: checkedItems[item] ? "1px solid #00df89" : "1px solid var(--border-color)",
                cursor: "pointer",
                textDecoration: checkedItems[item] ? "line-through" : "none",
                color: checkedItems[item] ? "#00df89" : "var(--text-primary)",
                transition: "all 0.2s ease"
              }}
            >
              <input 
                type="checkbox" 
                checked={!!checkedItems[item]} 
                onChange={() => {}} 
                style={{ accentColor: "#00df89" }}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
