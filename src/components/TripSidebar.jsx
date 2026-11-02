import React from "react";

export default function TripSidebar({ currentView, setCurrentView, onOpenPlanner }) {
  const menuItems = [
    { id: "explore-hotels", label: "Hotels & Homes", icon: "🏨" },
    { id: "explore-flights", label: "Flights", icon: "✈️" },
    { id: "explore-combo", label: "Flight + Hotel", icon: "🏨✈️" },
    { id: "explore-cars", label: "Cars & Transfers", icon: "🚗" },
    { id: "explore-places", label: "Attractions & Tours", icon: "🎡" },
    { id: "explore", label: "Luxury Tours", icon: "🧳" },
    { id: "explore-cruises", label: "Cruises", icon: "🚢" },
    { id: "explore-group", label: "Group Tours", icon: "🌴" },
    { 
      id: "trip-planner", 
      label: "Trip.Planner", 
      icon: "🔀", 
      badge: "New",
      action: onOpenPlanner 
    },
    { id: "explore-stories", label: "Travel Inspiration", icon: "💡" },
    { id: "explore-map", label: "Interactive Map", icon: "🗺️" }
  ];

  const handleItemClick = (item) => {
    if (item.action) {
      item.action();
    } else if (item.id === "explore-combo") {
      setCurrentView("explore-flights");
    } else if (item.id === "explore-cars") {
      setCurrentView("explore-places");
    } else if (item.id === "explore-cruises" || item.id === "explore-group") {
      setCurrentView("explore");
    } else if (item.id === "explore-stories") {
      setCurrentView("explore-stories");
    } else if (item.id === "explore-map") {
      setCurrentView("explore-map");
    } else {
      setCurrentView(item.id);
    }
  };

  return (
    <aside className="trip-sidebar">
      <div className="trip-sidebar-inner">
        <ul className="trip-nav-list">
          {menuItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <li key={item.id} className="trip-nav-item">
                <button
                  className={`trip-nav-btn ${isActive ? "active" : ""}`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className="trip-nav-icon">{item.icon}</span>
                  <span className="trip-nav-label">{item.label}</span>
                  {item.badge && <span className="trip-new-badge">{item.badge}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
