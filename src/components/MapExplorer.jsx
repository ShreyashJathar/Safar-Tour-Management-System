import React, { useState } from "react";

export default function MapExplorer({ tours = [], onSelectTour }) {
  const [activePin, setActivePin] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [mapStyle, setMapStyle] = useState("satellite"); // satellite or vector

  // Map coordinates mapped for visual display on India Map canvas
  const pins = tours.map((tour, idx) => {
    const locLower = tour.location.toLowerCase();
    
    // Assign relative X/Y percentages on India Map canvas
    let x = 40;
    let y = 45;
    let region = "North";

    if (locLower.includes("leh") || locLower.includes("ladakh")) { x = 32; y = 14; region = "North"; }
    else if (locLower.includes("gulmarg") || locLower.includes("kashmir") || locLower.includes("srinagar")) { x = 28; y = 18; region = "North"; }
    else if (locLower.includes("manali") || locLower.includes("shimla") || locLower.includes("himachal")) { x = 34; y = 24; region = "North"; }
    else if (locLower.includes("rishikesh") || locLower.includes("haridwar") || locLower.includes("uttarakhand")) { x = 38; y = 28; region = "North"; }
    else if (locLower.includes("delhi") || locLower.includes("agra")) { x = 36; y = 34; region = "North"; }
    else if (locLower.includes("jaipur") || locLower.includes("udaipur") || locLower.includes("rajasthan") || locLower.includes("jaisalmer")) { x = 24; y = 40; region = "West"; }
    else if (locLower.includes("varanasi") || locLower.includes("ayodhya") || locLower.includes("uttar pradesh")) { x = 52; y = 42; region = "East"; }
    else if (locLower.includes("darjeeling") || locLower.includes("gangtok") || locLower.includes("sikkim") || locLower.includes("assam")) { x = 74; y = 38; region = "East"; }
    else if (locLower.includes("goa")) { x = 24; y = 72; region = "South"; }
    else if (locLower.includes("alleppey") || locLower.includes("kerala") || locLower.includes("munnar") || locLower.includes("kochi")) { x = 30; y = 88; region = "South"; }
    else if (locLower.includes("ooty") || locLower.includes("coorg") || locLower.includes("bangalore")) { x = 32; y = 80; region = "South"; }
    else if (locLower.includes("andaman")) { x = 86; y = 82; region = "South"; }
    else {
      // Procedural distribution fallback
      x = 25 + ((idx * 13) % 55);
      y = 25 + ((idx * 17) % 55);
    }

    return { ...tour, x, y, region };
  });

  const filteredPins = selectedRegion === "All" ? pins : pins.filter(p => p.region === selectedRegion);

  return (
    <div className="map-explorer-wrapper animate-fade" style={{ padding: "30px", background: "var(--bg-secondary)", borderRadius: "24px", border: "1px solid var(--border-color)", marginBottom: "40px" }}>
      
      {/* Map Filter & Style Controls Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "800", display: "flex", alignItems: "center", gap: "10px" }}>
            {mapStyle === "satellite" ? "📡 Orbital Satellite View Explorer" : "🗺️ Tactical Vector Map Explorer"}
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "4px" }}>
            High-resolution orbital satellite perspective across Indian regions. Click pins to inspect packages.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          {/* Map Layer Mode Switcher */}
          <div style={{ display: "flex", background: "rgba(255,255,255,0.06)", padding: "4px", borderRadius: "100px", border: "1px solid var(--border-color)" }}>
            <button
              onClick={() => setMapStyle("satellite")}
              style={{
                padding: "6px 14px",
                borderRadius: "100px",
                fontWeight: "700",
                fontSize: "0.8rem",
                border: "none",
                background: mapStyle === "satellite" ? "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)" : "transparent",
                color: "white",
                cursor: "pointer"
              }}
            >
              📡 Satellite View
            </button>
            <button
              onClick={() => setMapStyle("vector")}
              style={{
                padding: "6px 14px",
                borderRadius: "100px",
                fontWeight: "700",
                fontSize: "0.8rem",
                border: "none",
                background: mapStyle === "vector" ? "#00df89" : "transparent",
                color: mapStyle === "vector" ? "#0b132a" : "white",
                cursor: "pointer"
              }}
            >
              🗺️ Vector Map
            </button>
          </div>

          {/* Region Filter Buttons */}
          <div style={{ display: "flex", gap: "6px" }}>
            {["All", "North", "South", "West", "East"].map(r => (
              <button
                key={r}
                className={`sub-filter-btn ${selectedRegion === r ? "active" : ""}`}
                onClick={() => setSelectedRegion(r)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "100px",
                  fontWeight: "700",
                  fontSize: "0.8rem",
                  border: "1px solid var(--border-color)",
                  background: selectedRegion === r ? "#00df89" : "transparent",
                  color: selectedRegion === r ? "#0b132a" : "var(--text-primary)",
                  cursor: "pointer"
                }}
              >
                {r === "All" ? "All India" : r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Canvas Box */}
      <div 
        className="india-map-canvas"
        style={{
          position: "relative",
          width: "100%",
          height: "520px",
          borderRadius: "20px",
          background: mapStyle === "satellite" 
            ? "radial-gradient(circle at 50% 50%, #0d1a2d 0%, #040914 100%), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80')"
            : "radial-gradient(circle at 50% 50%, #172442 0%, #0b132a 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: mapStyle === "satellite" ? "1px solid rgba(168, 85, 247, 0.4)" : "1px solid rgba(0, 223, 137, 0.3)",
          overflow: "hidden",
          boxShadow: "inset 0 0 50px rgba(0,0,0,0.8)"
        }}
      >
        {/* Satellite Dark Overlay */}
        {mapStyle === "satellite" && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(4, 9, 20, 0.65)", backdropFilter: "contrast(125%) saturation(140%)" }}></div>
        )}

        {/* Satellite HUD Coordinates Overlay */}
        <div style={{ position: "absolute", top: "14px", left: "16px", zIndex: 20, fontSize: "0.72rem", fontFamily: "monospace", color: mapStyle === "satellite" ? "#a855f7" : "#00df89", background: "rgba(11, 19, 42, 0.8)", padding: "4px 10px", borderRadius: "6px", border: "1px solid var(--border-color)" }}>
          <span>🛰️ ORBITAL SATELLITE HUD: LAT 20.5937° N | LON 78.9629° E | ALT 450KM</span>
        </div>

        {/* Grid Overlay */}
        <div style={{ position: "absolute", inset: 0, opacity: mapStyle === "satellite" ? 0.25 : 0.15, backgroundImage: "linear-gradient(rgba(168, 85, 247, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.2) 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>

        {/* Pins */}
        {filteredPins.map((pin) => (
          <div
            key={pin.id}
            style={{
              position: "absolute",
              left: `${pin.x}%`,
              top: `${pin.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: activePin && activePin.id === pin.id ? 50 : 10
            }}
          >
            {/* Animated Satellite Pin Beacon Marker */}
            <button
              onClick={() => setActivePin(activePin && activePin.id === pin.id ? null : pin)}
              style={{
                background: activePin && activePin.id === pin.id 
                  ? "#00df89" 
                  : (mapStyle === "satellite" ? "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)" : "rgba(168, 85, 247, 0.85)"),
                color: "white",
                border: "2px solid rgba(255,255,255,0.9)",
                borderRadius: "100px",
                padding: "6px 14px",
                fontSize: "0.78rem",
                fontWeight: "800",
                cursor: "pointer",
                boxShadow: mapStyle === "satellite" ? "0 0 20px rgba(168, 85, 247, 0.8)" : "0 6px 20px rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              }}
            >
              <span>{mapStyle === "satellite" ? "🛰️" : "📍"}</span>
              <span>{pin.location.split(",")[0]}</span>
            </button>

            {/* Active Pin Popup Card */}
            {activePin && activePin.id === pin.id && (
              <div 
                className="animate-scale-up"
                style={{
                  position: "absolute",
                  bottom: "125%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "270px",
                  background: "var(--bg-secondary)",
                  border: "1px solid #a855f7",
                  borderRadius: "16px",
                  padding: "12px",
                  boxShadow: "0 14px 40px rgba(0,0,0,0.8)",
                  zIndex: 100
                }}
              >
                <img 
                  src={pin.image} 
                  alt={pin.title} 
                  style={{ width: "100%", height: "115px", objectFit: "cover", borderRadius: "10px", marginBottom: "8px" }} 
                />
                <h4 style={{ fontSize: "0.95rem", fontWeight: "700", marginBottom: "4px", color: "var(--text-primary)" }}>{pin.title}</h4>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px", gap: "6px" }}>
                  <span style={{ fontSize: "1.05rem", fontWeight: "800", color: "#00df89" }}>₹{pin.price.toLocaleString("en-IN")}</span>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pin.location + " " + pin.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary-sm"
                      style={{ fontSize: "0.72rem", padding: "6px 8px", textDecoration: "none" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      🗺️ Maps
                    </a>
                    <button 
                      className="btn-primary-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTour(pin);
                      }}
                      style={{ fontSize: "0.75rem", padding: "6px 12px" }}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
