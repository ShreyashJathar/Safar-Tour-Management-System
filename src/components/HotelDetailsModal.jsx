import React, { useState, useEffect } from "react";
import WeatherWidget from "./WeatherWidget";

export default function HotelDetailsModal({ 
  hotel, 
  onClose, 
  onStartBooking, 
  currentUser,
  onAddReview,
  onEditHotel
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedRoomId, setSelectedRoomId] = useState(hotel.roomTypes[0].id);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  // Availability simulation states
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState("idle"); // idle, checking, available, unavailable

  // New review states
  const [reviewName, setReviewName] = useState(currentUser ? currentUser.fullName : "");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Keyboard shortcut (Escape to close) and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  // Auto trigger availability check when dates change
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const inDate = new Date(checkInDate);
      const outDate = new Date(checkOutDate);

      if (outDate <= inDate) {
        setAvailabilityStatus("invalid-dates");
        return;
      }

      setIsCheckingAvailability(true);
      setAvailabilityStatus("checking");

      const timer = setTimeout(() => {
        setIsCheckingAvailability(false);
        // 90% chance of room being available for simulation
        const isAvailable = Math.random() < 0.92;
        setAvailabilityStatus(isAvailable ? "available" : "unavailable");
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setAvailabilityStatus("idle");
    }
  }, [checkInDate, checkOutDate, selectedRoomId]);

  if (!hotel) return null;

  // Find active room pricing
  const selectedRoom = hotel.roomTypes.find(r => r.id === selectedRoomId) || hotel.roomTypes[0];
  const pricePerNight = Math.round(hotel.price * selectedRoom.priceMultiplier);

  // Nights Math
  let nightsCount = 0;
  if (checkInDate && checkOutDate) {
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = Math.abs(end - start);
    nightsCount = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Cost calculations
  const totalCost = nightsCount > 0 ? (pricePerNight * nightsCount) : pricePerNight;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!checkInDate || !checkOutDate) {
      alert("Please choose check-in and check-out dates.");
      return;
    }
    if (availabilityStatus !== "available") {
      alert("Selected rooms are currently not available. Try another dates combination.");
      return;
    }
    onStartBooking({
      hotel,
      room: selectedRoom,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights: nightsCount,
      adults,
      children,
      totalCost,
      bookingType: "hotel"
    });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviewError("");
    setReviewSuccess(false);

    if (!reviewName.trim() || !reviewComment.trim()) {
      setReviewError("Please fill out your name and write a comment.");
      return;
    }

    const newReviewObj = {
      author: reviewName,
      rating: Number(reviewRating),
      date: new Date().toISOString().split("T")[0],
      comment: reviewComment
    };

    onAddReview(hotel.id, newReviewObj, true); // true indicates hotel review
    setReviewSuccess(true);
    setReviewComment("");
    if (!currentUser) setReviewName("");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="details-modal glassmorphic-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Admin Quick Edit Button */}
        {currentUser && currentUser.role === "Admin" && (
          <button 
            className="btn-primary-sm" 
            style={{ position: "absolute", top: "18px", right: "60px", zIndex: 10, background: "#00df89", color: "#0b132a", fontWeight: "700" }}
            onClick={() => {
              if (onEditHotel) onEditHotel(hotel);
            }}
          >
            ✏️ Edit Hotel as Admin
          </button>
        )}

        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close hotel details">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Hero Top Image */}
        <div className="modal-hero">
          <img src={hotel.image} alt={hotel.name} className="modal-hero-img" />
          <div className="modal-hero-gradient"></div>
          <div className="modal-hero-text">
            <span className="tour-badge">HOTEL & RESORT</span>
            <h2 className="modal-title">{hotel.name}</h2>
            <div className="modal-quick-meta">
              <span className="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {hotel.location}
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.location + " " + hotel.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginLeft: "8px",
                    background: "rgba(0, 223, 137, 0.2)",
                    color: "#00df89",
                    padding: "2px 8px",
                    borderRadius: "100px",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px"
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  🗺️ Google Maps
                </a>
              </span>
              <span className="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                {hotel.rating} ({hotel.reviewsCount} guest reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Body Layout */}
        <div className="modal-body-layout">
          {/* Main Content Info */}
          <div className="modal-main-content">
            {/* Tabs Bar */}
            <div className="details-tabs">
              <button 
                className={`details-tab ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button 
                className={`details-tab ${activeTab === "rooms" ? "active" : ""}`}
                onClick={() => setActiveTab("rooms")}
              >
                Rooms Selection
              </button>
              <button 
                className={`details-tab ${activeTab === "reviews" ? "active" : ""}`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews ({hotel.reviews ? hotel.reviews.length : 0})
              </button>
            </div>

            {/* Tab content */}
            <div className="tab-panel-content">
              {activeTab === "overview" && (
                <div className="tab-panel animate-fade">
                  <WeatherWidget location={hotel.location} category="Resort" />

                  <h3>About the Resort</h3>
                  <p className="tour-full-desc">{hotel.description}</p>

                  <h3 className="highlights-header">Hotel Services & Amenities</h3>
                  <div className="hotel-amenities-grid">
                    {hotel.amenities.map((amenity, idx) => (
                      <div key={idx} className="amenity-grid-item">
                        <span className="amenity-check">✓</span>
                        <span>{amenity}</span>
                      </div>
                    ))}
                    <div className="amenity-grid-item">
                      <span className="amenity-check">✓</span>
                      <span>24-Hour Desk</span>
                    </div>
                    <div className="amenity-grid-item">
                      <span className="amenity-check">✓</span>
                      <span>Air Conditioning</span>
                    </div>
                  </div>

                  <div className="inc-exc-box hotel-policy-box">
                    <div className="inc-column">
                      <h4>Check-in / Check-out</h4>
                      <ul>
                        <li>🔑 Check-in time starts at 2:00 PM</li>
                        <li>🔑 Check-out time is before 12:00 PM</li>
                        <li>🔑 Express check-in/out options available</li>
                      </ul>
                    </div>
                    <div className="exc-column">
                      <h4>General Policies</h4>
                      <ul>
                        <li>🐾 Pets are not allowed (service animals allowed)</li>
                        <li>🚭 Non-smoking facility inside rooms</li>
                        <li>👶 Children under 6 stay free sharing existing bed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "rooms" && (
                <div className="tab-panel animate-fade">
                  <h3>Available Room Tiers</h3>
                  <p className="wizard-intro-text">Select your preferred accommodation package below.</p>

                  <div className="rooms-tier-list">
                    {hotel.roomTypes.map((room) => (
                      <div 
                        key={room.id}
                        className={`room-tier-item ${selectedRoomId === room.id ? "selected" : ""}`}
                        onClick={() => setSelectedRoomId(room.id)}
                      >
                        <div className="room-radio-circle">
                          {selectedRoomId === room.id && <div className="inner-dot"></div>}
                        </div>
                        
                        <div className="room-meta">
                          <span className="room-title">{room.name}</span>
                          <span className="room-description">{room.description}</span>
                        </div>

                        <div className="room-pricing">
                          <span className="room-price">₹{Math.round(hotel.price * room.priceMultiplier).toLocaleString("en-IN")}</span>
                          <span className="unit">/ night</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="tab-panel animate-fade">
                  <h3>Guest Book Comments</h3>
                  <div className="reviews-list-container">
                    {hotel.reviews && hotel.reviews.length > 0 ? (
                      hotel.reviews.map((rev, idx) => (
                        <div key={idx} className="review-item-card">
                          <div className="review-meta-row">
                            <span className="review-author">{rev.author}</span>
                            <span className="review-date">{rev.date}</span>
                          </div>
                          <div className="review-rating-stars">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < rev.rating ? "currentColor" : "none"} stroke="currentColor" className="star-icon">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                            ))}
                          </div>
                          <p className="review-comment-text">"{rev.comment}"</p>
                        </div>
                      ))
                    ) : (
                      <p className="no-reviews-fallback">No reviews yet for this hotel.</p>
                    )}
                  </div>

                  {/* Submit review */}
                  <div className="add-review-form-section">
                    <h4>Write a Guest Review</h4>
                    {reviewSuccess && <div className="review-success-msg">Thank you! Your review was published successfully.</div>}
                    {reviewError && <div className="review-error-msg">{reviewError}</div>}
                    
                    <form className="review-form" onSubmit={handleReviewSubmit}>
                      <div className="review-inputs-row">
                        <div className="review-input-box">
                          <label htmlFor="revNameHotel">Name</label>
                          <input 
                            type="text" 
                            id="revNameHotel" 
                            value={reviewName}
                            onChange={(e) => setReviewName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="review-input-box rating-box">
                          <label htmlFor="revRatingHotel">Rating</label>
                          <select 
                            id="revRatingHotel" 
                            value={reviewRating}
                            onChange={(e) => setReviewRating(Number(e.target.value))}
                          >
                            <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                            <option value="4">⭐⭐⭐⭐ (4/5)</option>
                            <option value="3">⭐⭐⭐ (3/5)</option>
                            <option value="2">⭐⭐ (2/5)</option>
                            <option value="1">⭐ (1/5)</option>
                          </select>
                        </div>
                      </div>

                      <div className="review-input-box text-area-box">
                        <label htmlFor="revCommentHotel">Comment</label>
                        <textarea 
                          id="revCommentHotel" 
                          rows="3" 
                          placeholder="Tell us about your stay, cleanliness, and facilities..."
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          required
                        />
                      </div>

                      <button type="submit" className="btn-secondary submit-rev-btn">
                        Submit Review
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Booking Sidebar Card */}
          {(!currentUser || currentUser.role !== "Admin") && (
            <div className="modal-booking-sidebar">
              <div className="booking-card-wrapper glassmorphic">
                <div className="pricing-header">
                  <span className="price-tag">₹{pricePerNight.toLocaleString("en-IN")}</span>
                  <span className="price-freq">/ night</span>
                </div>
                
                <hr className="divider" />

                <form className="booking-sidebar-form" onSubmit={handleBookingSubmit}>
                  {/* Checkin Date */}
                  <div className="sidebar-field">
                    <label htmlFor="checkIn">Check-In Date</label>
                    <input 
                      type="date" 
                      id="checkIn"
                      min={new Date().toISOString().split("T")[0]}
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      required 
                    />
                  </div>

                  {/* Checkout Date */}
                  <div className="sidebar-field">
                    <label htmlFor="checkOut">Check-Out Date</label>
                    <input 
                      type="date" 
                      id="checkOut"
                      min={checkInDate || new Date().toISOString().split("T")[0]}
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      required 
                    />
                  </div>

                  {/* Guest counters */}
                  <div className="sidebar-field travelers-field">
                    <label>Guests</label>
                    
                    <div className="counter-row">
                      <div className="counter-label-group">
                        <span className="c-name">Adults</span>
                      </div>
                      <div className="counter-controls">
                        <button 
                          type="button" 
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="counter-btn"
                        >-</button>
                        <span className="counter-val">{adults}</span>
                        <button 
                          type="button" 
                          onClick={() => setAdults(adults + 1)}
                          className="counter-btn"
                        >+</button>
                      </div>
                    </div>

                    <div className="counter-row">
                      <div className="counter-label-group">
                        <span className="c-name">Children</span>
                      </div>
                      <div className="counter-controls">
                        <button 
                          type="button" 
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="counter-btn"
                        >-</button>
                        <span className="counter-val">{children}</span>
                        <button 
                          type="button" 
                          onClick={() => setChildren(children + 1)}
                          className="counter-btn"
                        >+</button>
                      </div>
                    </div>
                  </div>

                  {/* Real-time availability check indicators */}
                  <div className="availability-status-row">
                    {availabilityStatus === "checking" && (
                      <div className="status-indicator checking">
                        <div className="mini-spinner"></div>
                        <span>Checking availability manifests...</span>
                      </div>
                    )}
                    {availabilityStatus === "available" && (
                      <div className="status-indicator success">
                        <span className="dot">•</span>
                        <span>Rooms are available!</span>
                      </div>
                    )}
                    {availabilityStatus === "unavailable" && (
                      <div className="status-indicator danger">
                        <span className="dot">•</span>
                        <span>Fully booked on this dates choice.</span>
                      </div>
                    )}
                    {availabilityStatus === "invalid-dates" && (
                      <div className="status-indicator danger">
                        <span>Check-out date must be after check-in.</span>
                      </div>
                    )}
                    {availabilityStatus === "idle" && (
                      <div className="status-indicator idle">
                        <span>Select dates to check availability</span>
                      </div>
                    )}
                  </div>

                  {/* Summary */}
                  {nightsCount > 0 && availabilityStatus === "available" && (
                    <div className="booking-summary-box">
                      <div className="summary-row">
                        <span>Rate ({selectedRoom.name})</span>
                        <span>₹{pricePerNight.toLocaleString("en-IN")} / night</span>
                      </div>
                      <div className="summary-row">
                        <span>Duration</span>
                        <span>{nightsCount} nights</span>
                      </div>
                      <hr className="summary-divider" />
                      <div className="summary-row total-row">
                        <span>Total Stay</span>
                        <span>₹{totalCost.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn-primary start-booking-btn"
                    disabled={availabilityStatus !== "available" || isCheckingAvailability}
                  >
                    Reserve Room
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
