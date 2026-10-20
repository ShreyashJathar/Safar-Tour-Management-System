import React, { useState } from "react";
import { destinationGuides } from "../data/guides";

export default function TravelGuides({ onExploreCity }) {
  const [selectedGuideId, setSelectedGuideId] = useState(destinationGuides[0]?.id || "g-paris");
  const currentGuide = destinationGuides.find(g => g.id === selectedGuideId) || destinationGuides[0];

  return (
    <div className="travel-guides-container section-container">
      {/* Header */}
      <div className="section-header-centered">
        <span className="section-subtitle-badge">🗺️ Trip.com Destination Guides</span>
        <h2 className="section-title">Travel Guides & Place Itineraries</h2>
        <p className="section-description">
          Curated insider travel guides, top attractions, recommended 3-day itineraries, and daily budget tips.
        </p>
      </div>

      {/* Guide Tabs Selector */}
      <div className="guides-tab-bar glassmorphic">
        {destinationGuides.map((guide) => (
          <button 
            key={guide.id}
            className={`guide-tab-btn ${selectedGuideId === guide.id ? "active" : ""}`}
            onClick={() => setSelectedGuideId(guide.id)}
          >
            <span className="guide-city-name">{guide.cityName}</span>
            <span className="guide-country-name">{guide.country}</span>
          </button>
        ))}
      </div>

      {/* Selected Guide Details Hero */}
      <div className="guide-hero-card glassmorphic">
        <div className="guide-hero-banner" style={{ backgroundImage: `url(${currentGuide.heroImage})` }}>
          <div className="guide-hero-overlay">
            <span className="badge country-tag">📍 {currentGuide.country}</span>
            <h2 className="guide-city-title">{currentGuide.cityName}</h2>
            <p className="guide-tagline">"{currentGuide.tagline}"</p>

            <div className="guide-quick-stats">
              <div className="stat-pill">
                <span>🗓️ Best Season:</span> <strong>{currentGuide.bestSeason}</strong>
              </div>
              <div className="stat-pill">
                <span>💵 Avg Daily Budget:</span> <strong>{currentGuide.avgDailyBudget}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="guide-body-grid">
          {/* Top Places & Must Visits */}
          <div className="guide-places-box">
            <h3>Top Attractions to Visit</h3>
            <div className="must-visit-pills">
              {currentGuide.mustVisitPlaces.map((place, idx) => (
                <div key={idx} className="must-visit-pill">
                  <span className="number">#{idx + 1}</span>
                  <span className="name">{place}</span>
                </div>
              ))}
            </div>

            {onExploreCity && (
              <button 
                className="btn-primary view-city-places-btn"
                onClick={() => onExploreCity(currentGuide.cityName)}
              >
                Find Tickets & Tours in {currentGuide.cityName}
              </button>
            )}
          </div>

          {/* Suggested 3-Day Itinerary */}
          <div className="guide-itinerary-box">
            <h3>Suggested 3-Day Itinerary</h3>
            <div className="itinerary-timeline">
              {currentGuide.suggestedItinerary.map((dayItem, idx) => (
                <div key={idx} className="itinerary-day-card">
                  <div className="day-badge">{dayItem.day}</div>
                  <div className="day-info">
                    <h4>{dayItem.title}</h4>
                    <p>{dayItem.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insider Travel Tips */}
        <div className="guide-tips-footer">
          <h3>💡 Local Insider Tips for {currentGuide.cityName}</h3>
          <ul className="tips-list">
            {currentGuide.insiderTips.map((tip, idx) => (
              <li key={idx}>
                <span className="tip-bullet">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
