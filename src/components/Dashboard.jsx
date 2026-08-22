import React, { useState } from "react";

export default function Dashboard({ 
  currentUser, 
  bookings, 
  wishlist, 
  tours, 
  hotels = [],
  onCancelBooking, 
  onSelectTour,
  onSelectHotel,
  onToggleWishlist 
}) {
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookingsFilter, setBookingsFilter] = useState("all"); // all, tours, hotels
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Filter user specific bookings
  const userBookings = bookings.filter(b => b.primaryContact.email === currentUser.email || b.primaryContact.name === currentUser.fullName);
  
  // Filter user bookings by type
  const filteredUserBookings = userBookings.filter(b => {
    if (bookingsFilter === "all") return true;
    if (bookingsFilter === "tours") return b.bookingType === "tour" || !b.bookingType;
    if (bookingsFilter === "hotels") return b.bookingType === "hotel";
    if (bookingsFilter === "places") return b.bookingType === "attraction";
    if (bookingsFilter === "flights") return b.bookingType === "flight";
    return true;
  });

  // Get wishlisted tours objects
  const wishlistedTours = tours.filter(t => wishlist.includes(t.id));
  const wishlistedHotels = hotels.filter(h => wishlist.includes(h.id));

  // Mock past trips
  const mockPastTrips = [
    {
      id: "PST-92831",
      tourTitle: "Kyoto Autumn Foliage",
      location: "Kyoto, Japan",
      date: "2025-11-12",
      cost: 1650,
      status: "Completed",
      type: "tour"
    }
  ];

  return (
    <div className="dashboard-container animate-fade">
      {/* Profile Header Cards */}
      <section className="dashboard-profile-section">
        <div className="profile-card glassmorphic">
          <div className="profile-info-row">
            <div className="profile-avatar">
              {currentUser.fullName.charAt(0).toUpperCase()}
            </div>
            <div className="profile-meta">
              <h2>{currentUser.fullName}</h2>
              <p>{currentUser.email || `${currentUser.username}@safar.com`}</p>
              <span className="user-membership-tag">Explorer Tier</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card glassmorphic">
            <span className="stat-label">Total Reservations</span>
            <span className="stat-val">{userBookings.length}</span>
          </div>
          <div className="stat-card glassmorphic">
            <span className="stat-label">Travel Points</span>
            <span className="stat-val">{userBookings.length * 150 + 250} pts</span>
          </div>
          <div className="stat-card glassmorphic">
            <span className="stat-label">Saved Wishlist</span>
            <span className="stat-val">{wishlistedTours.length + wishlistedHotels.length}</span>
          </div>
        </div>
      </section>

      {/* Tabs Menu */}
      <div className="dashboard-tabs">
        <button 
          className={`dash-tab ${activeTab === "bookings" ? "active" : ""}`}
          onClick={() => setActiveTab("bookings")}
        >
          My Bookings ({userBookings.length})
        </button>
        <button 
          className={`dash-tab ${activeTab === "wishlist" ? "active" : ""}`}
          onClick={() => setActiveTab("wishlist")}
        >
          Wishlist ({wishlistedTours.length + wishlistedHotels.length})
        </button>
        <button 
          className={`dash-tab ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          Trip History
        </button>
      </div>

      {/* Tab Panels */}
      <div className="dashboard-panel-content">
        {activeTab === "bookings" && (
          <div className="dash-panel animate-fade">
            <div className="panel-header-row">
              <h3>Active Bookings & Stays</h3>
              {/* Bookings filter tags */}
              <div className="bookings-sub-filters">
                <button 
                  className={`sub-filter-btn ${bookingsFilter === "all" ? "active" : ""}`}
                  onClick={() => setBookingsFilter("all")}
                >
                  All ({userBookings.length})
                </button>
                <button 
                  className={`sub-filter-btn ${bookingsFilter === "tours" ? "active" : ""}`}
                  onClick={() => setBookingsFilter("tours")}
                >
                  Tours ({userBookings.filter(b => b.bookingType === "tour" || !b.bookingType).length})
                </button>
                <button 
                  className={`sub-filter-btn ${bookingsFilter === "hotels" ? "active" : ""}`}
                  onClick={() => setBookingsFilter("hotels")}
                >
                  Hotels ({userBookings.filter(b => b.bookingType === "hotel").length})
                </button>
                <button 
                  className={`sub-filter-btn ${bookingsFilter === "places" ? "active" : ""}`}
                  onClick={() => setBookingsFilter("places")}
                >
                  Attractions ({userBookings.filter(b => b.bookingType === "attraction").length})
                </button>
                <button 
                  className={`sub-filter-btn ${bookingsFilter === "flights" ? "active" : ""}`}
                  onClick={() => setBookingsFilter("flights")}
                >
                  Flights ({userBookings.filter(b => b.bookingType === "flight").length})
                </button>
              </div>
            </div>

            {filteredUserBookings.length > 0 ? (
              <div className="bookings-vertical-list">
                {filteredUserBookings.map((b) => (
                  <div key={b.bookingId} className="booking-list-item glassmorphic">
                    <img src={b.tourImage || b.hotelImage || b.placeImage || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=400&q=80"} alt="" className="booking-list-img" />
                    
                    <div className="booking-list-details">
                      <div className="b-header">
                        <h4>{b.tourTitle || b.hotelName || b.placeName || `${b.airline} ${b.flightNumber}`}</h4>
                        <span className="booking-status-tag">
                          {b.bookingType === "hotel" ? "🏨 HOTEL STAY" : 
                           b.bookingType === "attraction" ? "🎡 ATTRACTION TICKET" :
                           b.bookingType === "flight" ? "✈️ FLIGHT TICKET" : "🌍 TOUR PACKAGE"}
                        </span>
                      </div>
                      
                      <div className="b-meta-grid">
                        {b.bookingType === "hotel" && (
                          <>
                            <div className="b-meta-item">
                              <span className="lbl">Check-In / Out</span>
                              <span className="val">{b.checkIn} to {b.checkOut}</span>
                            </div>
                            <div className="b-meta-item">
                              <span className="lbl">Room Type</span>
                              <span className="val">{b.roomType}</span>
                            </div>
                            <div className="b-meta-item">
                              <span className="lbl">Stay Duration</span>
                              <span className="val">{b.nights} Nights</span>
                            </div>
                            <div className="b-meta-item">
                              <span className="lbl">Paid</span>
                              <span className="val">${b.finalCost?.toLocaleString()}</span>
                            </div>
                          </>
                        )}

                        {b.bookingType === "attraction" && (
                          <>
                            <div className="b-meta-item">
                              <span className="lbl">Location</span>
                              <span className="val">📍 {b.placeCity}</span>
                            </div>
                            <div className="b-meta-item">
                              <span className="lbl">Pass Type</span>
                              <span className="val">{b.ticketTypeName}</span>
                            </div>
                            <div className="b-meta-item">
                              <span className="lbl">E-Ticket ID</span>
                              <span className="val">{b.bookingId}</span>
                            </div>
                            <div className="b-meta-item">
                              <span className="lbl">Paid</span>
                              <span className="val">${b.finalCost?.toLocaleString()}</span>
                            </div>
                          </>
                        )}

                        {b.bookingType === "flight" && (
                          <>
                            <div className="b-meta-item">
                              <span className="lbl">Route</span>
                              <span className="val">{b.originCity} ➔ {b.destinationCity}</span>
                            </div>
                            <div className="b-meta-item">
                              <span className="lbl">Flight / Class</span>
                              <span className="val">{b.flightNumber} ({b.cabinName})</span>
                            </div>
                            <div className="b-meta-item">
                              <span className="lbl">Depart Time</span>
                              <span className="val">{b.departureTime}</span>
                            </div>
                            <div className="b-meta-item">
                              <span className="lbl">Paid</span>
                              <span className="val">${b.finalCost?.toLocaleString()}</span>
                            </div>
                          </>
                        )}

                        {(b.bookingType === "tour" || !b.bookingType) && (
                          <>
                            <div className="b-meta-item">
                              <span className="lbl">Departure Date</span>
                              <span className="val">{b.date}</span>
                            </div>
                            <div className="b-meta-item">
                              <span className="lbl">Reference ID</span>
                              <span className="val">{b.bookingId}</span>
                            </div>
                            <div className="b-meta-item">
                              <span className="lbl">Travelers</span>
                              <span className="val">{b.adults} Adults {b.children > 0 ? `, ${b.children} Children` : ""}</span>
                            </div>
                            <div className="b-meta-item">
                              <span className="lbl">Paid</span>
                              <span className="val">${b.finalCost?.toLocaleString()}</span>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="booking-item-actions">
                        <button 
                          className="btn-primary-sm" 
                          onClick={() => setSelectedTicket(b)}
                        >
                          {b.bookingType === "hotel" ? "View Stay Voucher" : 
                           b.bookingType === "attraction" ? "View E-Ticket Pass" :
                           b.bookingType === "flight" ? "View Boarding Pass" : "View Boarding Ticket"}
                        </button>
                        <button 
                          className="btn-danger-sm" 
                          onClick={() => onCancelBooking(b.bookingId)}
                        >
                          Cancel Stay
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="dashboard-empty-state">
                <p>You have no active bookings matching this filter. Ready to plan your next retreat?</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "wishlist" && (
          <div className="dash-panel animate-fade">
            <h3>My Saved Explorations</h3>
            
            {/* Wishlist grid containing both tours and hotels */}
            {wishlistedTours.length > 0 || wishlistedHotels.length > 0 ? (
              <div className="tours-grid dashboard-wishlist-grid">
                
                {/* Render Tours */}
                {wishlistedTours.map((tour) => (
                  <div key={tour.id} className="tour-card wishlist-card" onClick={() => onSelectTour(tour)}>
                    <div className="card-image-wrapper">
                      <img src={tour.image} alt={tour.title} className="tour-card-img" />
                      <button 
                        className="card-wishlist-btn active"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(tour.id);
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                    </div>
                    <div className="card-content">
                      <span className="cat-pill">TOUR</span>
                      <h4 className="card-title">{tour.title}</h4>
                      <p className="card-location">{tour.location}</p>
                      <div className="card-footer-row">
                        <span>{tour.duration} Days</span>
                        <strong>₹{tour.price.toLocaleString("en-IN")}</strong>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Render Hotels */}
                {wishlistedHotels.map((hotel) => (
                  <div key={hotel.id} className="tour-card wishlist-card" onClick={() => onSelectHotel(hotel)}>
                    <div className="card-image-wrapper">
                      <img src={hotel.image} alt={hotel.name} className="tour-card-img" />
                      <button 
                        className="card-wishlist-btn active"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(hotel.id);
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                    </div>
                    <div className="card-content">
                      <span className="cat-pill">HOTEL</span>
                      <h4 className="card-title">{hotel.name}</h4>
                      <p className="card-location">{hotel.location}</p>
                      <div className="card-footer-row">
                        <span>Per Night</span>
                        <strong>₹{hotel.price.toLocaleString("en-IN")}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="dashboard-empty-state">
                <p>Your wishlist is empty. Tap the heart icon on any package or resort to save it here!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div className="dash-panel animate-fade">
            <h3>Stay History</h3>
            <div className="history-table-wrapper">
              <table className="dashboard-history-table">
                <thead>
                  <tr>
                    <th>Trip ID</th>
                    <th>Destination / Hotel</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPastTrips.map((trip) => (
                    <tr key={trip.id}>
                      <td>{trip.id}</td>
                      <td>{trip.tourTitle}</td>
                      <td>{trip.date}</td>
                      <td>₹{trip.cost.toLocaleString("en-IN")}</td>
                      <td><span className="status-completed">{trip.status}</span></td>
                      <td>
                        <button 
                          className="btn-secondary-sm"
                          onClick={() => {
                            const matched = tours.find(t => t.title.toLowerCase().includes(trip.tourTitle.toLowerCase().split(" ")[0]));
                            if (matched) {
                              onSelectTour(matched);
                            } else {
                              alert("Review form is accessible within the active listings details!");
                            }
                          }}
                        >
                          Write a Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Boarding Pass stay details View Overlay */}
      {selectedTicket && (
        <div className="modal-overlay ticket-modal-overlay" onClick={() => setSelectedTicket(null)}>
          <div className="ticket-modal-card glassmorphic-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedTicket(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="ticket-printable-container">
              <div className="ticket-header">
                <div className="ticket-logo">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                  </svg>
                  <span>Safar</span>
                </div>
                <div className="ticket-status-badge">
                  {selectedTicket.bookingType === "hotel" ? "CONFIRMED STAY VOUCHER" : "CONFIRMED BOARDING PASS"}
                </div>
              </div>

              <div className="ticket-main-info">
                <div className="ticket-col">
                  <span className="ticket-lbl">{selectedTicket.bookingType === "hotel" ? "Primary Guest" : "Traveler"}</span>
                  <span className="ticket-val">{selectedTicket.primaryContact.name}</span>
                </div>
                <div className="ticket-col">
                  <span className="ticket-lbl">Reference ID</span>
                  <span className="ticket-val highlighted-ref">{selectedTicket.bookingId}</span>
                </div>
              </div>

              <div className="ticket-middle-info">
                <div className="ticket-col">
                  <span className="ticket-lbl">{selectedTicket.bookingType === "hotel" ? "Resort & Location" : "Destination"}</span>
                  <span className="ticket-val">{selectedTicket.tourLocation || selectedTicket.hotelName}</span>
                </div>
                <div className="ticket-col">
                  <span className="ticket-lbl">{selectedTicket.bookingType === "hotel" ? "Dates" : "Departure Date"}</span>
                  <span className="ticket-val">
                    {selectedTicket.bookingType === "hotel" ? `${selectedTicket.checkIn} to ${selectedTicket.checkOut}` : selectedTicket.date}
                  </span>
                </div>
              </div>

              <div className="ticket-body-details">
                <div className="ticket-detail-item">
                  <span>{selectedTicket.bookingType === "hotel" ? "Room Selected:" : "Package:"}</span>
                  <strong>{selectedTicket.tourTitle || selectedTicket.roomType}</strong>
                </div>
                <div className="ticket-detail-item">
                  <span>Travelers/Guests:</span>
                  <strong>{selectedTicket.adults} Adults {selectedTicket.children > 0 ? `, ${selectedTicket.children} Children` : ""}</strong>
                </div>
                {selectedTicket.bookingType === "hotel" && (
                  <div className="ticket-detail-item">
                    <span>Stay Duration:</span>
                    <strong>{selectedTicket.nights} Nights stay</strong>
                  </div>
                )}
                <div className="ticket-detail-item">
                  <span>Add-ons:</span>
                  <strong>
                    {selectedTicket.bookingType === "hotel" ? (
                      [
                        selectedTicket.addons.breakfast ? "Buffet Breakfast" : "",
                        selectedTicket.addons.transfer ? "Airport Shuttle" : "",
                        selectedTicket.addons.lateCheckout ? "Late Checkout" : ""
                      ].filter(Boolean).join(", ") || "None"
                    ) : (
                      [
                        selectedTicket.addons.insurance ? "Insurance" : "",
                        selectedTicket.addons.transfer ? "Private Shuttle" : "",
                        selectedTicket.addons.upgrade ? "Suite Upgrade" : ""
                      ].filter(Boolean).join(", ") || "None"
                    )}
                  </strong>
                </div>
                <div className="ticket-detail-item price-row">
                  <span>Total Amount Paid:</span>
                  <strong>₹{selectedTicket.finalCost.toLocaleString("en-IN")}</strong>
                </div>
              </div>

              <div className="ticket-barcode-section">
                <div className="mock-qr-code">
                  <svg width="60" height="60" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="10" y="10" width="20" height="20"></rect>
                    <rect x="15" y="15" width="10" height="10" fill="white"></rect>
                    <rect x="70" y="10" width="20" height="20"></rect>
                    <rect x="75" y="15" width="10" height="10" fill="white"></rect>
                    <rect x="10" y="70" width="20" height="20"></rect>
                    <rect x="15" y="75" width="10" height="10" fill="white"></rect>
                    <rect x="35" y="10" width="5" height="15"></rect>
                    <rect x="45" y="20" width="15" height="5"></rect>
                    <rect x="35" y="30" width="10" height="10"></rect>
                    <rect x="55" y="35" width="10" height="15"></rect>
                  </svg>
                </div>
                <div className="ticket-barcodes">
                  <div className="bar1"></div>
                  <div className="bar2"></div>
                  <div className="bar3"></div>
                  <div className="bar4"></div>
                  <div className="bar2"></div>
                  <div className="bar1"></div>
                  <span className="barcode-number">{selectedTicket.bookingId}</span>
                </div>
              </div>
            </div>
            
            <div className="ticket-modal-actions">
              <button className="btn-secondary" onClick={() => window.print()}>Print Ticket</button>
              <button className="btn-primary" onClick={() => setSelectedTicket(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
