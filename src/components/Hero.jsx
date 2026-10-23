import React from "react";

export default function Hero({ 
  currentView = "explore",
  setCurrentView,
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  maxPrice, 
  setMaxPrice, 
  maxPriceLimit = 3000,
  
  // Hotel-specific inputs
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  guestsCount,
  setGuestsCount
}) {
  return (
    <section className="hero-section">
      <div className="hero-bg-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          Explore the World with Safar
        </h1>
        <p className="hero-subtitle">
          Book luxury tours, hotel suites, tourist places & attractions tickets, and international flights all in one place.
        </p>

        {/* Trip.com Main Category Switcher Tabs */}
        <div className="hero-category-tabs">
          <button 
            className={`hero-cat-btn ${currentView === "explore" ? "active" : ""}`}
            onClick={() => setCurrentView("explore")}
          >
            🧳 Tours
          </button>
          <button 
            className={`hero-cat-btn ${currentView === "explore-hotels" ? "active" : ""}`}
            onClick={() => setCurrentView("explore-hotels")}
          >
            🏨 Hotels
          </button>
          <button 
            className={`hero-cat-btn ${currentView === "explore-places" ? "active" : ""}`}
            onClick={() => setCurrentView("explore-places")}
          >
            🎡 Places & Attractions
          </button>
          <button 
            className={`hero-cat-btn ${currentView === "explore-flights" ? "active" : ""}`}
            onClick={() => setCurrentView("explore-flights")}
          >
            ✈️ Flights
          </button>
        </div>
        
        {/* Dynamic Advanced Search Container */}
        <div className="search-container glassmorphic hero-advanced-search">
          {currentView === "explore" && (
            /* Tours Search Box */
            <div className="search-row tours-search-row">
              <div className="search-field">
                <label>Where to?</label>
                <div className="search-input-wrapper">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Search tour packages, places..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="search-field">
                <label>Travel Style</label>
                <div className="search-input-wrapper">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                  </svg>
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="All">Any Travel Style</option>
                    <option value="Beach">Beach Escape</option>
                    <option value="Mountain">Alpine / Mountain</option>
                    <option value="Cultural">Cultural Heritage</option>
                    <option value="Nature">Wild Nature</option>
                  </select>
                </div>
              </div>

              <div className="search-field price-field">
                <div className="price-label-row">
                  <label>Max Budget</label>
                  <span className="price-value">₹{maxPrice.toLocaleString("en-IN")}</span>
                </div>
                <input 
                  type="range" 
                  min="300" 
                  max={maxPriceLimit} 
                  step="50"
                  value={maxPrice}
                  className="price-slider"
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>

              <button className="hero-search-submit-btn" title="Search Tours">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <span>Search</span>
              </button>
            </div>
          )}

          {currentView === "explore-hotels" && (
            /* Hotels Advanced Search Box */
            <div className="search-row hotel-search-row">
              <div className="search-field destination-field">
                <label>City or Hotel Name</label>
                <div className="search-input-wrapper">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"></path>
                    <polyline points="9 18 9 21 15 21 15 18"></polyline>
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Where are you staying?" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="search-field date-field">
                <label>Check-In</label>
                <div className="search-input-wrapper">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <input 
                    type="date" 
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
              </div>

              <div className="search-field date-field">
                <label>Check-Out</label>
                <div className="search-input-wrapper">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <input 
                    type="date" 
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>

              <div className="search-field guests-field">
                <label>Guests & Rooms</label>
                <div className="search-input-wrapper">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <select value={guestsCount} onChange={(e) => setGuestsCount(Number(e.target.value))}>
                    <option value="1">1 Guest, 1 Room</option>
                    <option value="2">2 Guests, 1 Room</option>
                    <option value="3">3 Guests, 1 Room</option>
                    <option value="4">4+ Guests, Family Suite</option>
                  </select>
                </div>
              </div>

              <button className="hero-search-submit-btn" title="Search Hotels">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <span>Search</span>
              </button>
            </div>
          )}

          {currentView === "explore-places" && (
            /* Places Search Box */
            <div className="search-row">
              <div className="search-field full-width-field">
                <label>Search Places & Tourist Attractions</label>
                <div className="search-input-wrapper">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Search Paris Eiffel Tower, Taj Mahal, Burj Khalifa..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <button className="hero-search-submit-btn" title="Search Places">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <span>Search</span>
              </button>
            </div>
          )}

          {currentView === "explore-flights" && (
            /* Flights Quick Box */
            <div className="search-row">
              <div className="search-field full-width-field">
                <label>Quick Flight Finder</label>
                <div className="search-input-wrapper">
                  <span>✈️</span>
                  <span className="hero-flight-hint">Select route, dates, and cabin options below to book instant flights!</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
