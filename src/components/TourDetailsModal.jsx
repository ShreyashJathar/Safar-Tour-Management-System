import React, { useState, useEffect } from "react";
import WeatherWidget from "./WeatherWidget";

export default function TourDetailsModal({ 
  tour, 
  onClose, 
  onStartBooking, 
  currentUser,
  onAddReview,
  onEditTour
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedDay, setExpandedDay] = useState(1);
  const [bookingDate, setBookingDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

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

  // New review form states
  const [reviewName, setReviewName] = useState(currentUser ? currentUser.fullName : "");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  if (!tour) return null;

  // Pricing math
  const pricePerAdult = tour.price;
  const pricePerChild = Math.round(tour.price * 0.65);
  const totalCost = (adults * pricePerAdult) + (children * pricePerChild);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingDate) {
      alert("Please select a preferred travel date.");
      return;
    }
    onStartBooking({
      tour,
      date: bookingDate,
      adults,
      children,
      totalCost
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

    onAddReview(tour.id, newReviewObj);
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
              if (onEditTour) onEditTour(tour);
            }}
          >
            ✏️ Edit Package as Admin
          </button>
        )}

        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close details">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Top Image Banner */}
        <div className="modal-hero">
          <img src={tour.image} alt={tour.title} className="modal-hero-img" />
          <div className="modal-hero-gradient"></div>
          <div className="modal-hero-text">
            <span className="tour-badge">{tour.category}</span>
            <h2 className="modal-title">{tour.title}</h2>
            <div className="modal-quick-meta">
              <span className="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {tour.location}
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(tour.location + " " + tour.title)}`}
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {tour.duration} Days
              </span>
              <span className="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                {tour.rating} ({tour.reviewsCount} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="modal-body-layout">
          {/* Main Info Columns */}
          <div className="modal-main-content">
            {/* Tabs Navigation */}
            <div className="details-tabs">
              <button 
                className={`details-tab ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button 
                className={`details-tab ${activeTab === "itinerary" ? "active" : ""}`}
                onClick={() => setActiveTab("itinerary")}
              >
                Itinerary ({tour.duration} Days)
              </button>
              <button 
                className={`details-tab ${activeTab === "reviews" ? "active" : ""}`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews ({tour.reviews ? tour.reviews.length : 0})
              </button>
            </div>

            {/* Tab Panels */}
            <div className="tab-panel-content">
              {activeTab === "overview" && (
                <div className="tab-panel animate-fade">
                  <WeatherWidget location={tour.location} category={tour.category} />

                  <h3>Trip Description</h3>
                  <p className="tour-full-desc">{tour.description}</p>
                  
                  <h3 className="highlights-header">Experience Highlights</h3>
                  <ul className="highlights-list">
                    {tour.highlights && tour.highlights.map((hl, idx) => (
                      <li key={idx}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="highlight-check">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="inc-exc-box">
                    <div className="inc-column">
                      <h4>What's Included</h4>
                      <ul>
                        <li>✨ Boutique hotel accommodation (Double/Twin share)</li>
                        <li>✨ All airport transfers and ground transport</li>
                        <li>✨ Selected meals as detailed in the itinerary</li>
                        <li>✨ Expert local English-speaking guide services</li>
                        <li>✨ All park admission fees and activity tickets</li>
                      </ul>
                    </div>
                    <div className="exc-column">
                      <h4>Not Included</h4>
                      <ul>
                        <li>❌ International flights to/from destinations</li>
                        <li>❌ Travel insurance (highly recommended)</li>
                        <li>❌ Discretionary tips and gratuities</li>
                        <li>❌ Alcoholic drinks and personal shopping expenses</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "itinerary" && (
                <div className="tab-panel animate-fade">
                  <h3>Day-by-Day Timeline</h3>
                  <div className="timeline-container">
                    {tour.itinerary && tour.itinerary.map((day) => (
                      <div 
                        key={day.day} 
                        className={`timeline-day-card ${expandedDay === day.day ? "expanded" : ""}`}
                        onClick={() => setExpandedDay(day.day)}
                      >
                        <div className="day-card-header">
                          <div className="day-badge">Day {day.day}</div>
                          <h4 className="day-title">{day.title}</h4>
                          <span className="accordion-toggle-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </span>
                        </div>
                        {expandedDay === day.day && (
                          <div className="day-card-body animate-slide-down">
                            <p>{day.description}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="tab-panel animate-fade">
                  <h3>What Travelers Say</h3>
                  
                  {/* Reviews List */}
                  <div className="reviews-list-container">
                    {tour.reviews && tour.reviews.length > 0 ? (
                      tour.reviews.map((rev, idx) => (
                        <div key={idx} className="review-item-card">
                          <div className="review-meta-row">
                            <span className="review-author">{rev.author}</span>
                            <span className="review-date">{rev.date}</span>
                          </div>
                          <div className="review-rating-stars">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg 
                                key={i} 
                                width="14" 
                                height="14" 
                                viewBox="0 0 24 24" 
                                fill={i < rev.rating ? "currentColor" : "none"} 
                                stroke="currentColor" 
                                className="star-icon"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                            ))}
                          </div>
                          <p className="review-comment-text">"{rev.comment}"</p>
                        </div>
                      ))
                    ) : (
                      <p className="no-reviews-fallback">No reviews yet. Be the first to share your thoughts!</p>
                    )}
                  </div>

                  {/* Add Review Form */}
                  <div className="add-review-form-section">
                    <h4>Write a Review</h4>
                    {reviewSuccess && <div className="review-success-msg">Thank you! Your review was successfully published.</div>}
                    {reviewError && <div className="review-error-msg">{reviewError}</div>}
                    
                    <form className="review-form" onSubmit={handleReviewSubmit}>
                      <div className="review-inputs-row">
                        <div className="review-input-box">
                          <label htmlFor="revName">Name</label>
                          <input 
                            type="text" 
                            id="revName" 
                            placeholder="Your Name"
                            value={reviewName}
                            onChange={(e) => setReviewName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="review-input-box rating-box">
                          <label htmlFor="revRating">Rating</label>
                          <select 
                            id="revRating" 
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
                        <label htmlFor="revComment">Comment</label>
                        <textarea 
                          id="revComment" 
                          rows="3" 
                          placeholder="Share details of your experience on this trip..."
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

          {/* Sidebar Booking Card */}
          {(!currentUser || currentUser.role !== "Admin") && (
            <div className="modal-booking-sidebar">
              <div className="booking-card-wrapper glassmorphic">
                <div className="pricing-header">
                  <span className="price-tag">₹{tour.price.toLocaleString("en-IN")}</span>
                  <span className="price-freq">/ person</span>
                </div>
                
                <hr className="divider" />
                
                <form className="booking-sidebar-form" onSubmit={handleBookingSubmit}>
                  {/* Date Input */}
                  <div className="sidebar-field">
                    <label htmlFor="travelDate">Departure Date</label>
                    <input 
                      type="date" 
                      id="travelDate" 
                      min={new Date().toISOString().split("T")[0]}
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      required 
                    />
                  </div>

                  {/* Traveler Counters */}
                  <div className="sidebar-field travelers-field">
                    <label>Travelers</label>
                    
                    {/* Adults Counter */}
                    <div className="counter-row">
                      <div className="counter-label-group">
                        <span className="c-name">Adults</span>
                        <span className="c-price">₹{pricePerAdult.toLocaleString("en-IN")}</span>
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

                    {/* Children Counter */}
                    <div className="counter-row">
                      <div className="counter-label-group">
                        <span className="c-name">Children</span>
                        <span className="c-price">₹{pricePerChild.toLocaleString("en-IN")}</span>
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

                  {/* Summary Math */}
                  <div className="booking-summary-box">
                    <div className="summary-row">
                      <span>Adults ({adults} × ₹{pricePerAdult.toLocaleString("en-IN")})</span>
                      <span>₹{(adults * pricePerAdult).toLocaleString("en-IN")}</span>
                    </div>
                    {children > 0 && (
                      <div className="summary-row">
                        <span>Children ({children} × ₹{pricePerChild.toLocaleString("en-IN")})</span>
                        <span>₹{(children * pricePerChild).toLocaleString("en-IN")}</span>
                      </div>
                    )}
                    <hr className="summary-divider" />
                    <div className="summary-row total-row">
                      <span>Total Amount</span>
                      <span>₹{totalCost.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  {/* Action CTA */}
                  <button type="submit" className="btn-primary start-booking-btn">
                    Instant Booking
                  </button>
                </form>
                
                <p className="instant-guarantee-note">⚡ Real-time availability & instant booking confirmation.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
