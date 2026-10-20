import React, { useState } from "react";
import PlaceCard from "./PlaceCard";

export default function PlacesExplorer({ 
  places = [], 
  onSelectPlace, 
  onToggleWishlist, 
  wishlist = [],
  currentUser,
  onEditPlace
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(300);
  const [sortBy, setSortBy] = useState("popular");

  const categories = ["All", "Landmarks", "Historical", "Museums", "Theme Parks", "Nature", "Architecture"];
  const cities = ["All", "Paris", "Agra", "Dubai", "Kyoto", "Rome", "Orlando", "New York", "Barcelona", "Singapore", "Bali"];

  // Filter places logic
  const filteredPlaces = places.filter(p => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesCity = selectedCity === "All" || p.city === selectedCity;
    const matchesSearch = searchQuery === "" || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = p.ticketPrice <= maxPrice;

    return matchesCategory && matchesCity && matchesSearch && matchesPrice;
  });

  // Sort logic
  const sortedPlaces = [...filteredPlaces].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "price-low") return a.ticketPrice - b.ticketPrice;
    if (sortBy === "price-high") return b.ticketPrice - a.ticketPrice;
    return b.reviewsCount - a.reviewsCount; // popular default
  });

  return (
    <div className="places-explorer-container section-container">
      {/* Page Header */}
      <div className="section-header-centered">
        <span className="section-subtitle-badge">🎡 Trip.com Featured Attractions</span>
        <h2 className="section-title">Explore Iconic Places & Attractions</h2>
        <p className="section-description">
          Book skip-the-line passes, museum tickets, and guided tours for the world's most famous landmarks.
        </p>
      </div>

      {/* Control Bar & Filters */}
      <div className="explorer-filters-wrapper glassmorphic">
        {/* Search & Sort Controls */}
        <div className="filter-row top-row">
          <div className="search-input-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Search places, landmarks, or cities..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery("")}>✕</button>
            )}
          </div>

          <div className="sort-input-box">
            <label>Sort By:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="price-filter-box">
            <div className="price-label">
              <span>Max Ticket:</span> <strong>${maxPrice}</strong>
            </div>
            <input 
              type="range" 
              min="10" 
              max="300" 
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
        </div>

        {/* City Filter Pills */}
        <div className="city-pills-row">
          <span className="pills-label">City:</span>
          <div className="pills-scroll">
            {cities.map((city) => (
              <button 
                key={city}
                className={`city-pill ${selectedCity === city ? "active" : ""}`}
                onClick={() => setSelectedCity(city)}
              >
                {city === "All" ? "🌐 All Cities" : city}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="category-pills-row">
          <span className="pills-label">Category:</span>
          <div className="pills-scroll">
            {categories.map((cat) => (
              <button 
                key={cat}
                className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Place Cards */}
      <div className="places-grid-container">
        {sortedPlaces.length > 0 ? (
          sortedPlaces.map((place) => {
            const isWishlisted = wishlist.some(item => item.id === place.id && item.type === "place");
            return (
              <PlaceCard 
                key={place.id}
                place={place}
                onSelect={onSelectPlace}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={isWishlisted}
                currentUser={currentUser}
                onEditPlace={onEditPlace}
              />
            );
          })
        ) : (
          <div className="empty-state-box">
            <div className="empty-icon">🎡</div>
            <h3>No Attractions Found</h3>
            <p>Try adjusting your search term, city, or price filter to find places.</p>
            <button 
              className="btn-secondary"
              onClick={() => {
                setSelectedCategory("All");
                setSelectedCity("All");
                setSearchQuery("");
                setMaxPrice(300);
              }}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
