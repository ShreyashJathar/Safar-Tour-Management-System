import React from "react";

export default function CommunityStories({ onSelectTour }) {
  const stories = [
    {
      id: 1,
      author: "Aarav Sharma",
      location: "Rishikesh White Water Rafting",
      image: "/assets/rishikesh_rafting.png",
      quote: "Rafting down the Grade III rapids with Safar guides was the highlight of our summer!",
      avatar: "👨‍💼",
      rating: 5
    },
    {
      id: 2,
      author: "Priya Nair",
      location: "Kerala Houseboat Cruise",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
      quote: "Gliding through the palm-fringed Alleppey backwaters on our private houseboat was so peaceful.",
      avatar: "👩‍💼",
      rating: 5
    },
    {
      id: 3,
      author: "Vikram & Ananya",
      location: "Goa Sun & Sand Villa",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
      quote: "Baga beach watersports and Fontainhas Portuguese heritage walk made our vacation memorable!",
      avatar: "👫",
      rating: 5
    }
  ];

  return (
    <section className="community-stories-section animate-fade" style={{ margin: "50px 0" }}>
      <div className="section-header-row" style={{ marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: "800", display: "flex", alignItems: "center", gap: "10px" }}>
            📸 Traveler Community Stories & Memories
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "4px" }}>
            Real experiences and verified photos shared by travelers who explored with Safar.
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
        {stories.map(s => (
          <div 
            key={s.id}
            className="story-card glassmorphic"
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid var(--border-color)",
              background: "var(--bg-secondary)",
              transition: "transform 0.3s ease"
            }}
          >
            <div style={{ position: "relative", height: "180px" }}>
              <img src={s.image} alt={s.author} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <span style={{ position: "absolute", bottom: "12px", left: "12px", background: "rgba(11, 19, 42, 0.85)", color: "white", fontSize: "0.75rem", padding: "4px 10px", borderRadius: "100px", fontWeight: "700" }}>
                📍 {s.location}
              </span>
            </div>

            <div style={{ padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <span style={{ fontSize: "1.4rem" }}>{s.avatar}</span>
                <div>
                  <strong style={{ display: "block", fontSize: "0.95rem", color: "var(--text-primary)" }}>{s.author}</strong>
                  <span style={{ fontSize: "0.8rem", color: "#00df89" }}>⭐⭐⭐⭐⭐ Verified Traveler</span>
                </div>
              </div>

              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", fontStyle: "italic", lineHeight: "1.5" }}>
                "{s.quote}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
