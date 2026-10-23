import React, { useState } from "react";

export default function PlaceDetailsModal({ 
  place, 
  onClose, 
  onStartBooking, 
  currentUser,
  onAddReview 
}) {
  if (!place) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const gallery = place.galleryImages || [place.image];
  
  // Ticket variant & booking prep
  const [selectedTicketId, setSelectedTicketId] = useState(place.ticketTypes[0]?.id || "tk-std");
  const selectedTicket = place.ticketTypes.find(t => t.id === selectedTicketId) || place.ticketTypes[0];
  
  const calculatedTicketPrice = Math.round(place.ticketPrice * selectedTicket.priceMultiplier);

  // Review submission state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const reviewObj = {
      author: currentUser ? currentUser.fullName : "Guest Traveler",
      rating: Number(newRating),
      date: new Date().toISOString().split("T")[0],
      comment: newComment
    };

    if (onAddReview) {
      onAddReview(place.id, "place", reviewObj);
    }
    setReviewSuccess(true);
    setNewComment("");
  };

  const handleBookTicketClick = () => {
    onStartBooking({
      type: "attraction",
      item: place,
      ticketType: selectedTicket,
      calculatedPrice: calculatedTicketPrice
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content place-details-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {/* Gallery Section */}
        <div className="modal-gallery">
          <div className="main-gallery-image-wrapper">
            <img 
              src={gallery[activeImageIndex]} 
              alt={place.name} 
              className="main-gallery-image"
            />
            <span className="badge location-floating-badge">
              📍 {place.city}, {place.country}
            </span>
          </div>

          {gallery.length > 1 && (
            <div className="gallery-thumbnails">
              {gallery.map((imgUrl, idx) => (
                <img 
                  key={idx} 
                  src={imgUrl} 
                  alt={`Thumbnail ${idx + 1}`} 
                  className={`thumbnail ${activeImageIndex === idx ? "active" : ""}`}
                  onClick={() => setActiveImageIndex(idx)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modal Header Details */}
        <div className="modal-header-info">
          <div className="category-and-rating">
            <span className="badge category-badge">{place.category}</span>
            <div className="rating-pill">
              ⭐ {place.rating} <span>({place.reviewsCount.toLocaleString()} reviews)</span>
            </div>
          </div>

          <h2 className="modal-item-title">{place.name}</h2>
          
          <p className="modal-address">
            📍 <strong>Address:</strong> {place.address}
          </p>
          <p className="modal-opening">
            🕒 <strong>Hours:</strong> {place.openingHours}
          </p>
        </div>

        {/* Modal Body */}
        <div className="modal-body-grid">
          {/* Left Column: Description & Highlights */}
          <div className="modal-left-col">
            <h3>Overview</h3>
            <p className="modal-description">{place.description}</p>

            <h3>Highlights & Key Benefits</h3>
            <ul className="modal-highlights-list">
              {place.highlights?.map((h, i) => (
                <li key={i}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {/* Reviews Section */}
            <div className="modal-reviews-section">
              <h3>Visitor Reviews</h3>
              {place.reviews && place.reviews.length > 0 ? (
                <div className="reviews-list">
                  {place.reviews.map((rev, idx) => (
                    <div key={idx} className="review-card">
                      <div className="review-header">
                        <span className="review-author">{rev.author}</span>
                        <span className="review-stars">{"⭐".repeat(rev.rating)}</span>
                        <span className="review-date">{rev.date}</span>
                      </div>
                      <p className="review-comment">"{rev.comment}"</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-reviews-text">No reviews submitted yet. Be the first visitor to review!</p>
              )}

              {/* Add Review Form */}
              <div className="add-review-box">
                <h4>Share Your Visit Experience</h4>
                {reviewSuccess && (
                  <div className="alert success-alert">
                    Thank you! Your review has been added.
                  </div>
                )}
                <form onSubmit={handleReviewSubmit}>
                  <div className="form-group inline-group">
                    <label>Rating:</label>
                    <select 
                      value={newRating} 
                      onChange={(e) => setNewRating(e.target.value)}
                    >
                      <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                      <option value="4">⭐⭐⭐⭐ (4/5)</option>
                      <option value="3">⭐⭐⭐ (3/5)</option>
                      <option value="2">⭐⭐ (2/5)</option>
                      <option value="1">⭐ (1/5)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <textarea 
                      placeholder="Write your feedback, tips for visitors, or ticket queue advice..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows="3"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-secondary">
                    Post Review
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column: Ticket Type Selector & Direct Booking Box */}
          <div className="modal-right-col">
            <div className="ticket-selection-box glassmorphic">
              <h3>Select Pass & Ticket</h3>

              <div className="ticket-options-list">
                {place.ticketTypes?.map((tType) => (
                  <div 
                    key={tType.id}
                    className={`ticket-option-card ${selectedTicketId === tType.id ? "selected" : ""}`}
                    onClick={() => setSelectedTicketId(tType.id)}
                  >
                    <div className="ticket-opt-header">
                      <span className="ticket-opt-name">{tType.name}</span>
                      <span className="ticket-opt-price">
                        ${Math.round(place.ticketPrice * tType.priceMultiplier)}
                      </span>
                    </div>
                    <p className="ticket-opt-desc">{tType.description}</p>
                  </div>
                ))}
              </div>

              <hr className="divider" />

              <div className="ticket-total-summary">
                <span>Selected Ticket Price:</span>
                <span className="total-price-large">${calculatedTicketPrice}</span>
              </div>

              <button 
                className="btn-primary full-width-btn pulse-glow"
                onClick={handleBookTicketClick}
              >
                Proceed to Book Ticket
              </button>
              <p className="instant-confirm-note">
                ⚡ Instant E-Ticket Confirmation & QR Code Pass
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
