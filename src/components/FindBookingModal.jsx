import React, { useState } from "react";

export default function FindBookingModal({ isOpen, onClose, bookings = [], onSelectBooking }) {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    const clean = query.trim().toLowerCase();
    if (!clean) return;

    setSearched(true);
    const found = bookings.find(b => {
      const bId = (b.bookingId || b.id || "").toString().toLowerCase();
      const phone = (b.primaryContact?.phone || b.phone || "").toString().toLowerCase();
      const email = (b.primaryContact?.email || b.email || "").toString().toLowerCase();
      return bId.includes(clean) || phone.includes(clean) || email.includes(clean);
    });

    setSearchResult(found || null);
  };

  return (
    <div className="trip-modal-backdrop animate-fade" onClick={onClose}>
      <div className="trip-modal-card animate-scale-up" onClick={(e) => e.stopPropagation()}>
        <div className="trip-modal-header">
          <div className="trip-modal-title">
            <span className="modal-icon">🔎</span>
            <div>
              <h3>Find Your Booking & E-Tickets</h3>
              <p>Quick lookup without needing to sign in</p>
            </div>
          </div>
          <button className="trip-modal-close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="trip-modal-body">
          <form className="find-booking-form" onSubmit={handleSearch}>
            <div className="find-input-box">
              <input
                type="text"
                placeholder="Enter Booking ID (e.g. SFR-123456) or Mobile Number"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                required
              />
              <button type="submit" className="find-submit-btn">
                Find Reservation
              </button>
            </div>
          </form>

          {searched && (
            <div className="find-result-area animate-fade">
              {searchResult ? (
                <div className="found-booking-card">
                  <div className="found-booking-header">
                    <span className="found-badge">Verified Reservation</span>
                    <span className="found-id">{searchResult.bookingId || searchResult.id}</span>
                  </div>
                  <div className="found-booking-title">
                    {searchResult.tourTitle || searchResult.hotelName || searchResult.placeName || "Trip Reservation"}
                  </div>
                  <div className="found-details-row">
                    <span>📅 {searchResult.date || searchResult.checkIn || "Scheduled"}</span>
                    <span>👤 {searchResult.primaryContact?.name || searchResult.customerName || "Traveler"}</span>
                    <span>💳 {searchResult.status || "Confirmed"}</span>
                  </div>
                  <button 
                    className="view-ticket-action-btn"
                    onClick={() => {
                      onSelectBooking(searchResult);
                      onClose();
                    }}
                  >
                    View Official E-Ticket & Boarding Pass &rarr;
                  </button>
                </div>
              ) : (
                <div className="not-found-banner">
                  <p>No reservation found matching "{query}". Please verify your Booking ID or check the digits entered.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
