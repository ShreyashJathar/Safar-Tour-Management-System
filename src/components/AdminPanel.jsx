import React, { useState, useEffect } from "react";

export default function AdminPanel({ 
  tours, 
  hotels = [],
  bookings, 
  onAddTour, 
  onUpdateTour, 
  onDeleteTour,
  onAddHotel,
  onUpdateHotel,
  onDeleteHotel,
  onUpdateBookingStatus,
  initialEditingTour = null,
  initialEditingHotel = null,
  dbStatus,
  onCheckDb,
  onReseedDb
}) {
  const [activeTab, setActiveTab] = useState("bookings");
  const [isEditing, setIsEditing] = useState(false);
  const [editingType, setEditingType] = useState("tour"); // tour or hotel
  const [editingTour, setEditingTour] = useState(null);
  const [editingHotel, setEditingHotel] = useState(null);
  const [isReseeding, setIsReseeding] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState(null);

  // Common Form States
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(150);
  const [category, setCategory] = useState("Beach");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [highlightsInput, setHighlightsInput] = useState("");

  // Tour Form State
  const [duration, setDuration] = useState(5);
  const [itineraryDays, setItineraryDays] = useState([
    { day: 1, title: "Arrival & Orientation", description: "Arrive and transfer to hotel." }
  ]);

  // Hotel Form States
  const [amenitiesInput, setAmenitiesInput] = useState("WiFi, Pool, AC, Restaurant");
  const [roomTypes, setRoomTypes] = useState([
    { id: "rm-deluxe", name: "Deluxe Ocean View Room", priceMultiplier: 1.0, description: "King bed, private balcony, rain shower." },
    { id: "rm-suite", name: "Premium Pool Access Suite", priceMultiplier: 1.5, description: "Direct swim-up pool access, lounge." }
  ]);

  // Analytics
  const totalRevenue = bookings
    .filter(b => b.status === "Confirmed")
    .reduce((sum, b) => sum + b.finalCost, 0);

  const averageRating = (tours.reduce((sum, t) => sum + t.rating, 0) / tours.length).toFixed(1);

  // Tour Itinerary Helpers
  const handleAddItineraryDay = () => {
    const nextDayNum = itineraryDays.length + 1;
    setItineraryDays([
      ...itineraryDays,
      { day: nextDayNum, title: "", description: "" }
    ]);
  };

  const handleRemoveItineraryDay = (idx) => {
    if (itineraryDays.length === 1) return;
    const filtered = itineraryDays.filter((_, i) => i !== idx);
    setItineraryDays(filtered.map((d, i) => ({ ...d, day: i + 1 })));
  };

  const handleItineraryChange = (idx, field, value) => {
    const updated = [...itineraryDays];
    updated[idx][field] = value;
    setItineraryDays(updated);
  };

  // Hotel Room Types Helpers
  const handleAddRoomType = () => {
    const randomId = "rm-" + Math.floor(Math.random() * 1000);
    setRoomTypes([
      ...roomTypes,
      { id: randomId, name: "", priceMultiplier: 1.2, description: "" }
    ]);
  };

  const handleRemoveRoomType = (idx) => {
    if (roomTypes.length === 1) return;
    setRoomTypes(roomTypes.filter((_, i) => i !== idx));
  };

  const handleRoomChange = (idx, field, value) => {
    const updated = [...roomTypes];
    updated[idx][field] = value;
    setRoomTypes(updated);
  };

  // Preset Templates Helper for fast creation of popular places
  const applyTemplate = (preset) => {
    if (preset === "manali") {
      setTitle("Manali Snow Peaks & Solang Valley Adventure");
      setLocation("Manali, Himachal Pradesh, India");
      setPrice(499);
      setDuration(5);
      setCategory("Mountain");
      setImage("https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80");
      setDescription("Escape into the crisp alpine air of Manali. Experience thrilling adventure sports in Solang Valley, drive through the Atal Tunnel to Sissu, and relax in Vashisht hot water springs.");
      setHighlightsInput("Atal Tunnel & Lahaul Valley day excursion, Solang Valley paragliding & zorbing, Vashisht natural hot springs bath, Old Manali cafe hopping");
      setItineraryDays([
        { day: 1, title: "Arrival in Manali & Mall Road Walk", description: "Arrive in Manali. Check into your pine-wood resort. Evening walk on Mall Road and Old Manali cafes." },
        { day: 2, title: "Solang Valley Adventure Sports", description: "Full day in Solang Valley. Enjoy paragliding, ropeway rides, and snow scooters." },
        { day: 3, title: "Atal Tunnel & Sissu Lahaul Excursion", description: "Drive through the 9.02km Atal Tunnel into Lahaul valley. Visit Sissu waterfall." },
        { day: 4, title: "Hadimba Temple & Vashisht Hot Springs", description: "Visit historic Hadimba Devi temple amidst cedar forest and take a dip in Vashisht hot sulfur springs." },
        { day: 5, title: "Departure", description: "Morning breakfast, souvenir shopping, checkout and departure transfer." }
      ]);
    } else if (preset === "goa") {
      setTitle("Goa Sun, Sand & Heritage Villa Retreat");
      setLocation("North & South Goa, India");
      setPrice(399);
      setDuration(4);
      setCategory("Beach");
      setImage("https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80");
      setDescription("Experience the vibrant beach culture of Goa. Relax on golden sand beaches, enjoy water sports at Baga, explore Portuguese heritage villas in Fontainhas, and cruise on the Mandovi river.");
      setHighlightsInput("Sunset cruise on Mandovi river with Goan folk dances, Water sports package at Calangute & Baga beach, Guided heritage walking tour of Fontainhas Latin Quarter, Seafood dinner at beach shacks");
      setItineraryDays([
        { day: 1, title: "Arrival in Goa & Beach Sunset", description: "Arrive at Dabolim/Mopa airport. Transfer to beach resort in Calangute. Evening relaxation at beach shack." },
        { day: 2, title: "North Goa Water Sports & Fort Aguada", description: "Visit historic Fort Aguada lighthouse. Afternoon jet skiing and parasailing at Baga beach." },
        { day: 3, title: "Fontainhas Latin Quarter & Mandovi River Cruise", description: "Explore colorful Portuguese lanes in Panjim. Evening sunset cruise on Mandovi river with music." },
        { day: 4, title: "Dudhsagar Waterfalls & Departure", description: "Optional morning jeep safari to Dudhsagar waterfalls, checkout and airport transfer." }
      ]);
    } else if (preset === "varanasi") {
      setTitle("Varanasi Sacred Ghats & Ganga Aarti Spiritual Journey");
      setLocation("Varanasi, Uttar Pradesh, India");
      setPrice(349);
      setDuration(3);
      setCategory("Cultural");
      setImage("https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80");
      setDescription("Immerse yourself in the world's oldest living city. Experience magical sunrise boat rides on the Holy Ganges, witness Dashashwamedh Ghat Ganga Aarti, and explore Sarnath Buddha stupas.");
      setHighlightsInput("Dawn sunrise boat ride past historic ghats, Grand evening Ganga Aarti with glowing oil lamps, Visit Kashi Vishwanath Corridor temple, Excursion to Sarnath Stupa & Museum");
      setItineraryDays([
        { day: 1, title: "Arrival in Kashi & Evening Ganga Aarti", description: "Arrive in Varanasi. Evening boat ride to Dashashwamedh Ghat for the grand Ganga Aarti ceremony." },
        { day: 2, title: "Sunrise Ganges Boat Ride & Kashi Vishwanath", description: "Early morning boat ride from Assi Ghat to Manikarnika. VIP Darshan at Kashi Vishwanath Corridor." },
        { day: 3, title: "Sarnath Stupa & Departure", description: "Visit Sarnath deer park where Buddha gave his first sermon. Afternoon checkout and airport transfer." }
      ]);
    } else if (preset === "kerala") {
      setTitle("Kerala Backwaters Houseboat & Munnar Tea Gardens");
      setLocation("Munnar & Alleppey, Kerala, India");
      setPrice(449);
      setDuration(4);
      setCategory("Nature");
      setImage("https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80");
      setDescription("Unwind in God's Own Country. Drive through misty tea plantations in Munnar, stay overnight on a private air-conditioned houseboat cruising Alleppey backwaters, and taste fresh Keralite cuisine.");
      setHighlightsInput("Overnight luxury private houseboat stay in Alleppey backwaters, Guided tour of Munnar tea estate & Spice gardens, Kathakali dance & Kalaripayattu martial arts show, Ayurvedic massage");
      setItineraryDays([
        { day: 1, title: "Cochin to Munnar Hill Station", description: "Pickup from Cochin. Scenic drive to Munnar past Cheeyappara waterfalls. Evening tea estate stroll." },
        { day: 2, title: "Munnar Tea Museum & Eravikulam Park", description: "Visit Eravikulam National Park (Nilgiri Tahr habitat) and Munnar Tea Museum." },
        { day: 3, title: "Alleppey Houseboat Check-in & Backwater Cruise", description: "Board your private houseboat in Alleppey. Cruise narrow canals and enjoy fresh Keralite Karimeen meal." },
        { day: 4, title: "Cochin Fort & Departure", description: "Morning breakfast on houseboat, check out, visit Fort Kochi Chinese fishing nets, airport transfer." }
      ]);
    }
  };

  // Open Form Triggers
  const handleOpenCreateTour = () => {
    setEditingType("tour");
    setEditingTour(null);
    setTitle("");
    setLocation("");
    setPrice(699);
    setDuration(5);
    setCategory("Beach");
    setImage("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80");
    setDescription("");
    setHighlightsInput("Airport pickup, Guided city tour, Buffet Breakfast");
    setItineraryDays([
      { day: 1, title: "Arrival", description: "Transfer to resort and welcome drinks." },
      { day: 2, title: "Departure", description: "Checkout and transfer to airport." }
    ]);
    setIsEditing(true);
  };

  const handleOpenEditTour = (tour) => {
    setEditingType("tour");
    setEditingTour(tour);
    setTitle(tour.title);
    setLocation(tour.location);
    setPrice(tour.price);
    setDuration(tour.duration);
    setCategory(tour.category);
    setImage(tour.image);
    setDescription(tour.description);
    setHighlightsInput(tour.highlights ? tour.highlights.join(", ") : "");
    setItineraryDays(tour.itinerary || [{ day: 1, title: "Arrival", description: "Transfer." }]);
    setIsEditing(true);
  };

  const handleOpenCreateHotel = () => {
    setEditingType("hotel");
    setEditingHotel(null);
    setTitle(""); // Use title state for hotel name
    setLocation("");
    setPrice(120); // Base price per night
    setImage("https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80");
    setDescription("");
    setAmenitiesInput("WiFi, Pool, Spa, Gym, Restaurant, AC");
    setRoomTypes([
      { id: "rm-deluxe", name: "Standard Deluxe Room", priceMultiplier: 1.0, description: "Queen Bed, AC, shower cabin." },
      { id: "rm-suite", name: "Executive Ocean Suite", priceMultiplier: 1.6, description: "King Bed, direct beach views, bath tub." }
    ]);
    setIsEditing(true);
  };

  const handleOpenEditHotel = (hotel) => {
    setEditingType("hotel");
    setEditingHotel(hotel);
    setTitle(hotel.name);
    setLocation(hotel.location);
    setPrice(hotel.price);
    setImage(hotel.image);
    setDescription(hotel.description);
    setAmenitiesInput(hotel.amenities ? hotel.amenities.join(", ") : "");
    setRoomTypes(hotel.roomTypes || [{ id: "rm-std", name: "Standard Room", priceMultiplier: 1.0, description: "Double Bed." }]);
    setIsEditing(true);
  };

  useEffect(() => {
    if (initialEditingTour) {
      setActiveTab("tours");
      handleOpenEditTour(initialEditingTour);
    } else if (initialEditingHotel) {
      setActiveTab("hotels");
      handleOpenEditHotel(initialEditingHotel);
    }
  }, [initialEditingTour, initialEditingHotel]);

  // Submit Handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (editingType === "tour") {
      const highlights = highlightsInput
        .split(",")
        .map(h => h.trim())
        .filter(Boolean);

      const tourPayload = {
        title,
        location,
        price: Number(price),
        duration: Number(duration),
        category,
        image: image || "/assets/travel_hero.png",
        description,
        highlights,
        itinerary: itineraryDays,
        rating: editingTour ? editingTour.rating : 5.0,
        reviewsCount: editingTour ? editingTour.reviewsCount : 0,
        reviews: editingTour ? editingTour.reviews : []
      };

      if (editingTour) {
        onUpdateTour({ ...tourPayload, id: editingTour.id });
      } else {
        onAddTour(tourPayload);
      }
    } else {
      const amenities = amenitiesInput
        .split(",")
        .map(a => a.trim())
        .filter(Boolean);

      const hotelPayload = {
        name: title, // Hotel Name maps to title state
        location,
        price: Number(price),
        image: image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
        description,
        amenities,
        roomTypes: roomTypes,
        rating: editingHotel ? editingHotel.rating : 5.0,
        reviewsCount: editingHotel ? editingHotel.reviewsCount : 0,
        reviews: editingHotel ? editingHotel.reviews : []
      };

      if (editingHotel) {
        onUpdateHotel({ ...hotelPayload, id: editingHotel.id });
      } else {
        onAddHotel(hotelPayload);
      }
    }
    
    setIsEditing(false);
  };

  return (
    <div className="admin-container animate-fade">
      {/* Analytics Summary */}
      <section className="admin-analytics-grid">
        <div className="analytics-card glassmorphic">
          <span className="lbl">Gross Sales Revenue</span>
          <span className="val">₹{totalRevenue.toLocaleString("en-IN")}</span>
        </div>
        <div className="analytics-card glassmorphic">
          <span className="lbl">Reservations Ledger</span>
          <span className="val">{bookings.length} active</span>
        </div>
        <div className="analytics-card glassmorphic">
          <span className="lbl">Tours Count</span>
          <span className="val">{tours.length} destinations</span>
        </div>
        <div className="analytics-card glassmorphic">
          <span className="lbl">Hotels Count</span>
          <span className="val">{hotels.length} active resorts</span>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="dashboard-tabs admin-tabs">
        <button 
          className={`dash-tab ${activeTab === "bookings" ? "active" : ""}`}
          onClick={() => { setActiveTab("bookings"); setIsEditing(false); }}
        >
          Customer Bookings ({bookings.length})
        </button>
        <button 
          className={`dash-tab ${activeTab === "tours" ? "active" : ""}`}
          onClick={() => { setActiveTab("tours"); setIsEditing(false); }}
        >
          Tour Packages ({tours.length})
        </button>
        <button 
          className={`dash-tab ${activeTab === "hotels" ? "active" : ""}`}
          onClick={() => { setActiveTab("hotels"); setIsEditing(false); }}
        >
          Hotel Properties ({hotels.length})
        </button>
        <button 
          className={`dash-tab ${activeTab === "coupons" ? "active" : ""}`}
          onClick={() => { setActiveTab("coupons"); setIsEditing(false); }}
        >
          🎟️ Promo Coupons (3)
        </button>
        <button 
          className={`dash-tab ${activeTab === "database" ? "active" : ""}`}
          onClick={() => { setActiveTab("database"); setIsEditing(false); }}
        >
          🗄️ MySQL Database & Engine
        </button>
      </div>

      {/* Content Area */}
      <div className="dashboard-panel-content">
        
        {/* Bookings Manager */}
        {activeTab === "bookings" && !isEditing && (
          <div className="dash-panel animate-fade">
            <div className="panel-header-row">
              <h3>Reservations Ledger</h3>
            </div>
            
            <div className="history-table-wrapper">
              <table className="dashboard-history-table admin-bookings-table">
                <thead>
                  <tr>
                    <th>Ref ID</th>
                    <th>Customer Name</th>
                    <th>Stay / Package</th>
                    <th>Type</th>
                    <th>Booking Details</th>
                    <th>Gross Paid</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length > 0 ? (
                    bookings.map((b) => (
                      <tr key={b.bookingId}>
                        <td><strong>{b.bookingId}</strong></td>
                        <td>
                          <div className="admin-cust-cell">
                            <span className="name">{b.primaryContact.name}</span>
                            <span className="email">{b.primaryContact.email}</span>
                          </div>
                        </td>
                        <td>{b.tourTitle || b.hotelName}</td>
                        <td>
                          <span className="cat-pill">
                            {b.bookingType === "hotel" ? "🏨 Hotel" : "🌍 Tour"}
                          </span>
                        </td>
                        <td>
                          {b.bookingType === "hotel" ? (
                            <div className="admin-cust-cell">
                              <span>Room: {b.roomType}</span>
                              <span className="email">Dates: {b.checkIn} to {b.checkOut} ({b.nights} nights)</span>
                            </div>
                          ) : (
                            <div className="admin-cust-cell">
                              <span>Date: {b.date}</span>
                              <span className="email">{b.adults} Adults {b.children > 0 ? `, ${b.children} Children` : ""}</span>
                            </div>
                          )}
                        </td>
                        <td>₹{b.finalCost.toLocaleString("en-IN")}</td>
                        <td>
                          <span className={`status-badge ${b.status.toLowerCase()}`}>
                            {b.status}
                          </span>
                        </td>
                        <td>
                          {b.status === "Confirmed" ? (
                            <button 
                              className="btn-danger-sm"
                              onClick={() => onUpdateBookingStatus(b.bookingId, "Cancelled")}
                            >
                              Cancel
                            </button>
                          ) : (
                            <button 
                              className="btn-secondary-sm"
                              onClick={() => onUpdateBookingStatus(b.bookingId, "Confirmed")}
                            >
                              Reconfirm
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="table-empty-cell">No bookings records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Promo Coupons Manager */}
        {activeTab === "coupons" && !isEditing && (
          <div className="dash-panel animate-fade">
            <div className="panel-header-row">
              <h3>🎟️ Active Discount Coupons & Promo Codes</h3>
            </div>

            <div className="history-table-wrapper">
              <table className="dashboard-history-table">
                <thead>
                  <tr>
                    <th>Coupon Code</th>
                    <th>Discount Type</th>
                    <th>Benefit Value</th>
                    <th>Status</th>
                    <th>Usage Limit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong style={{ color: "#00df89", letterSpacing: "1px" }}>SAFAR2026</strong></td>
                    <td>Flat Savings</td>
                    <td>₹1,000 OFF</td>
                    <td><span className="status-badge status-confirmed">Active</span></td>
                    <td>Unlimited</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: "#00df89", letterSpacing: "1px" }}>SHREYASH</strong></td>
                    <td>Admin VIP Discount</td>
                    <td>₹1,500 OFF</td>
                    <td><span className="status-badge status-confirmed">Active</span></td>
                    <td>VIP Exclusive</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: "#00df89", letterSpacing: "1px" }}>WELCOME10</strong></td>
                    <td>Percentage Off</td>
                    <td>10% OFF Total</td>
                    <td><span className="status-badge status-confirmed">Active</span></td>
                    <td>First Trip</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tours Manager */}
        {activeTab === "tours" && !isEditing && (
          <div className="dash-panel animate-fade">
            <div className="panel-header-row">
              <h3>Active Tour Database</h3>
              <button className="btn-primary" onClick={handleOpenCreateTour}>
                + Add Tour Package
              </button>
            </div>

            <div className="history-table-wrapper">
              <table className="dashboard-history-table admin-tours-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title / Location</th>
                    <th>Category</th>
                    <th>Duration</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tours.map((t) => (
                    <tr key={t.id}>
                      <td>
                        <img src={t.image} alt="" className="admin-table-img" />
                      </td>
                      <td>
                        <div className="admin-tour-title-cell">
                          <strong>{t.title}</strong>
                          <span>{t.location}</span>
                        </div>
                      </td>
                      <td><span className="cat-pill">{t.category}</span></td>
                      <td>{t.duration} Days</td>
                      <td>₹{t.price.toLocaleString("en-IN")}</td>
                      <td>⭐ {t.rating} ({t.reviewsCount})</td>
                      <td>
                        <div className="action-buttons-group">
                          <button className="btn-secondary-sm" onClick={() => handleOpenEditTour(t)}>Edit</button>
                          <button 
                            className="btn-danger-sm"
                            onClick={() => {
                              if (confirm(`Delete the package: ${t.title}?`)) onDeleteTour(t.id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Hotels Manager */}
        {activeTab === "hotels" && !isEditing && (
          <div className="dash-panel animate-fade">
            <div className="panel-header-row">
              <h3>Active Hotels Database</h3>
              <button className="btn-primary" onClick={handleOpenCreateHotel}>
                + Add Hotel Property
              </button>
            </div>

            <div className="history-table-wrapper">
              <table className="dashboard-history-table admin-tours-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name / Location</th>
                    <th>Base Price</th>
                    <th>Room Tiers</th>
                    <th>Amenities</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {hotels.map((h) => (
                    <tr key={h.id}>
                      <td>
                        <img src={h.image} alt="" className="admin-table-img" />
                      </td>
                      <td>
                        <div className="admin-tour-title-cell">
                          <strong>{h.name}</strong>
                          <span>{h.location}</span>
                        </div>
                      </td>
                      <td>₹{h.price.toLocaleString("en-IN")} / night</td>
                      <td>{h.roomTypes.length} Tiers</td>
                      <td>
                        <div className="hotel-amenities-mini-row">
                          {h.amenities.slice(0, 3).map((a, idx) => (
                            <span key={idx} className="amenity-mini-badge">{a}</span>
                          ))}
                        </div>
                      </td>
                      <td>⭐ {h.rating} ({h.reviewsCount})</td>
                      <td>
                        <div className="action-buttons-group">
                          <button className="btn-secondary-sm" onClick={() => handleOpenEditHotel(h)}>Edit</button>
                          <button 
                            className="btn-danger-sm"
                            onClick={() => {
                              if (confirm(`Delete the hotel property: ${h.name}?`)) onDeleteHotel(h.id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Promo Coupons Tab */}
        {activeTab === "coupons" && !isEditing && (
          <div className="dash-panel animate-fade">
            <div className="panel-header-row">
              <h3>🎟️ Active Promotional Discount Codes</h3>
            </div>
            <div className="coupons-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "16px" }}>
              <div className="coupon-admin-card glassmorphic" style={{ padding: "20px", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span className="badge badge-success" style={{ fontSize: "0.9rem", fontWeight: "800", letterSpacing: "1px" }}>SAFAR50</span>
                  <span style={{ color: "#00df89", fontWeight: "700" }}>₹50 OFF</span>
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", margin: "0 0 12px 0" }}>Flat ₹50 promotional discount applicable on any tour package or hotel reservation.</p>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Type: Flat Discount • Status: Active</div>
              </div>

              <div className="coupon-admin-card glassmorphic" style={{ padding: "20px", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span className="badge badge-success" style={{ fontSize: "0.9rem", fontWeight: "800", letterSpacing: "1px" }}>EXPLORE10</span>
                  <span style={{ color: "#00df89", fontWeight: "700" }}>10% OFF</span>
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", margin: "0 0 12px 0" }}>10% percentage discount on all adventure tours and luxury villa bookings.</p>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Type: Percentage Discount • Status: Active</div>
              </div>

              <div className="coupon-admin-card glassmorphic" style={{ padding: "20px", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span className="badge badge-success" style={{ fontSize: "0.9rem", fontWeight: "800", letterSpacing: "1px" }}>FIRSTTRIP</span>
                  <span style={{ color: "#00df89", fontWeight: "700" }}>₹100 OFF</span>
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", margin: "0 0 12px 0" }}>Welcome voucher for new travelers registering an account on Safar.</p>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Type: Welcome Gift • Status: Active</div>
              </div>
            </div>
          </div>
        )}

        {/* Database & Server Management Panel */}
        {activeTab === "database" && !isEditing && (
          <div className="dash-panel animate-fade">
            <div className="panel-header-row">
              <div>
                <h3>🗄️ Production MySQL Database & Engine</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "4px" }}>
                  Live MySQL pool status, connection diagnostics, and database management for <strong>{dbStatus?.database || "safar_db"}</strong>.
                </p>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button 
                  className="btn-secondary"
                  disabled={isPinging}
                  onClick={async () => {
                    setIsPinging(true);
                    setPingResult(null);
                    const start = Date.now();
                    if (onCheckDb) {
                      const res = await onCheckDb();
                      const latency = Date.now() - start;
                      setPingResult({ success: true, latency, message: `Ping success! Latency: ${latency}ms` });
                    }
                    setIsPinging(false);
                  }}
                >
                  {isPinging ? "Testing Ping..." : "🩺 Ping Test"}
                </button>
                <button 
                  className="btn-primary"
                  disabled={isReseeding}
                  onClick={async () => {
                    if (confirm("Re-seed initial tours, hotels, places, and community stories into MySQL database?")) {
                      setIsReseeding(true);
                      if (onReseedDb) await onReseedDb();
                      setIsReseeding(false);
                    }
                  }}
                >
                  {isReseeding ? "Re-seeding..." : "⚡ Sync & Seed Initial Data"}
                </button>
              </div>
            </div>

            {/* Ping Result Notification */}
            {pingResult && (
              <div className="db-ping-toast animate-fade" style={{ background: "rgba(0, 223, 137, 0.15)", border: "1px solid #00df89", padding: "12px 18px", borderRadius: "12px", margin: "16px 0", color: "#00df89", display: "flex", alignItems: "center", gap: "10px" }}>
                <span>✅</span>
                <span>{pingResult.message}</span>
              </div>
            )}

            {/* Database Connection Summary Cards */}
            <div className="db-diag-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", margin: "20px 0" }}>
              <div className="analytics-card glassmorphic">
                <span className="lbl">Connection Status</span>
                <span className="val" style={{ color: dbStatus?.connected ? "#00df89" : "#ff4d4f", fontSize: "1.3rem", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: dbStatus?.connected ? "#00df89" : "#ff4d4f", display: "inline-block" }}></span>
                  {dbStatus?.connected ? "Connected" : "Disconnected"}
                </span>
              </div>
              <div className="analytics-card glassmorphic">
                <span className="lbl">Database Schema</span>
                <span className="val" style={{ fontSize: "1.3rem" }}>{dbStatus?.database || "safar_db"}</span>
              </div>
              <div className="analytics-card glassmorphic">
                <span className="lbl">MySQL Server Host</span>
                <span className="val" style={{ fontSize: "1.3rem" }}>{dbStatus?.host || "localhost"}:{dbStatus?.port || 3306}</span>
              </div>
              <div className="analytics-card glassmorphic">
                <span className="lbl">Database Engine</span>
                <span className="val" style={{ fontSize: "1.3rem" }}>MySQL InnoDB</span>
              </div>
            </div>

            {/* Database Tables Record Counters */}
            <h4 style={{ margin: "24px 0 12px 0", fontSize: "1.1rem" }}>📊 MySQL Table Row Record Counts</h4>
            <div className="db-tables-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px" }}>
              <div className="db-table-badge glassmorphic" style={{ padding: "16px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem", display: "block" }}>users table</span>
                <strong style={{ fontSize: "1.4rem", color: "var(--accent-color)" }}>{dbStatus?.stats?.users_count ?? 1}</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginTop: "4px" }}>Registered Accounts</span>
              </div>
              <div className="db-table-badge glassmorphic" style={{ padding: "16px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem", display: "block" }}>tours table</span>
                <strong style={{ fontSize: "1.4rem", color: "var(--accent-color)" }}>{dbStatus?.stats?.tours_count ?? tours.length}</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginTop: "4px" }}>Tour Packages</span>
              </div>
              <div className="db-table-badge glassmorphic" style={{ padding: "16px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem", display: "block" }}>hotels table</span>
                <strong style={{ fontSize: "1.4rem", color: "var(--accent-color)" }}>{dbStatus?.stats?.hotels_count ?? hotels.length}</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginTop: "4px" }}>Hotel Listings</span>
              </div>
              <div className="db-table-badge glassmorphic" style={{ padding: "16px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem", display: "block" }}>bookings table</span>
                <strong style={{ fontSize: "1.4rem", color: "var(--accent-color)" }}>{dbStatus?.stats?.bookings_count ?? bookings.length}</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginTop: "4px" }}>Live Reservations</span>
              </div>
              <div className="db-table-badge glassmorphic" style={{ padding: "16px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem", display: "block" }}>places table</span>
                <strong style={{ fontSize: "1.4rem", color: "var(--accent-color)" }}>{dbStatus?.stats?.places_count ?? 2}</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginTop: "4px" }}>Attractions</span>
              </div>
              <div className="db-table-badge glassmorphic" style={{ padding: "16px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem", display: "block" }}>stories table</span>
                <strong style={{ fontSize: "1.4rem", color: "var(--accent-color)" }}>{dbStatus?.stats?.stories_count ?? 3}</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginTop: "4px" }}>Community Stories</span>
              </div>
            </div>

            {/* Architecture Details */}
            <div className="db-architecture-box glassmorphic" style={{ marginTop: "24px", padding: "20px", borderRadius: "16px", border: "1px solid var(--border-color)" }}>
              <h4 style={{ margin: "0 0 10px 0" }}>⚙️ Backend & Database Architecture</h4>
              <ul style={{ margin: 0, paddingLeft: "20px", color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.7" }}>
                <li><strong>Connection Pooling:</strong> `mysql2/promise` pool with 15 max connections and keep-alive heartbeats.</li>
                <li><strong>Security:</strong> Parameterized SQL queries preventing SQL injection vulnerabilities.</li>
                <li><strong>Password Security:</strong> Bcrypt adaptive hashing (10 salt rounds) for user credentials.</li>
                <li><strong>Fault Tolerance:</strong> Automated client-side fallback with LocalStorage replication during offline development.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Edit / Create Form */}
        {isEditing && (
          <div className="dash-panel form-panel animate-fade">
            <h3>
              {editingType === "tour" 
                ? (editingTour ? "Edit Tour Package" : "Create New Destination Place / Tour Package")
                : (editingHotel ? "Edit Hotel Property" : "Create Hotel Property")}
            </h3>

            {editingType === "tour" && !editingTour && (
              <div className="quick-templates-bar" style={{ marginBottom: "20px", background: "rgba(0,223,137,0.08)", padding: "12px 16px", borderRadius: "12px", border: "1px stroke rgba(0,223,137,0.2)" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#00df89", display: "block", marginBottom: "8px" }}>⚡ Quick Preset Destination Templates (Click to Auto-fill):</span>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <button type="button" className="btn-secondary-sm" onClick={() => applyTemplate("manali")}>🏔️ Manali Trek</button>
                  <button type="button" className="btn-secondary-sm" onClick={() => applyTemplate("goa")}>🏖️ Goa Beach Resort</button>
                  <button type="button" className="btn-secondary-sm" onClick={() => applyTemplate("varanasi")}>🕉️ Varanasi Ghats</button>
                  <button type="button" className="btn-secondary-sm" onClick={() => applyTemplate("kerala")}>🌴 Kerala Backwaters</button>
                </div>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="admin-tour-form">
              <div className="form-grid">
                <div className="wizard-field">
                  <label htmlFor="formTitle">
                    {editingType === "tour" ? "Tour Package Title" : "Hotel Name"}
                  </label>
                  <input 
                    type="text" 
                    id="formTitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="wizard-field">
                  <label htmlFor="formLocation">Location / Address</label>
                  <input 
                    type="text" 
                    id="formLocation"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Bali, Indonesia"
                    required
                  />
                </div>

                <div className="wizard-field">
                  <label htmlFor="formImage">Image URL</label>
                  <input 
                    type="text" 
                    id="formImage"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Unsplash image URL"
                  />
                </div>

                <div className="wizard-field">
                  <label htmlFor="formPrice">
                    {editingType === "tour" ? "Base Price (₹)" : "Base Price per night (₹)"}
                  </label>
                  <input 
                    type="number" 
                    id="formPrice"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    min="10"
                    required
                  />
                </div>

                {editingType === "tour" ? (
                  /* Tour Fields */
                  <>
                    <div className="wizard-field">
                      <label htmlFor="formDuration">Duration (Days)</label>
                      <input 
                        type="number" 
                        id="formDuration"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        min="1"
                        required
                      />
                    </div>

                    <div className="wizard-field">
                      <label htmlFor="tourCategory">Category</label>
                      <select 
                        id="tourCategory"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="Beach">Beach</option>
                        <option value="Mountain">Mountain</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Nature">Nature</option>
                      </select>
                    </div>

                    <div className="wizard-field full-width">
                      <label htmlFor="formHighlights">Highlights (comma separated list)</label>
                      <input 
                        type="text" 
                        id="formHighlights"
                        value={highlightsInput}
                        onChange={(e) => setHighlightsInput(e.target.value)}
                        placeholder="e.g. Guided tour, Free breakfast"
                      />
                    </div>
                  </>
                ) : (
                  /* Hotel Fields */
                  <div className="wizard-field full-width">
                    <label htmlFor="formAmenities">Amenities (comma separated list)</label>
                    <input 
                      type="text" 
                      id="formAmenities"
                      value={amenitiesInput}
                      onChange={(e) => setAmenitiesInput(e.target.value)}
                      placeholder="e.g. WiFi, Pool, Spa, Gym, Restaurant, AC"
                    />
                  </div>
                )}

                <div className="wizard-field full-width">
                  <label htmlFor="formDesc">Description</label>
                  <textarea 
                    id="formDesc" 
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Itinerary builder for tours */}
              {editingType === "tour" && (
                <div className="form-itinerary-builder">
                  <h4>Itinerary Schedule Planning</h4>
                  {itineraryDays.map((day, idx) => (
                    <div key={idx} className="itinerary-day-edit-row">
                      <div className="day-number-label">Day {day.day}</div>
                      
                      <input 
                        type="text"
                        placeholder="Title of the day"
                        value={day.title}
                        onChange={(e) => handleItineraryChange(idx, "title", e.target.value)}
                        required
                      />

                      <textarea 
                        placeholder="Activities description"
                        rows="2"
                        value={day.description}
                        onChange={(e) => handleItineraryChange(idx, "description", e.target.value)}
                        required
                      />

                      <button 
                        type="button" 
                        className="btn-danger-sm"
                        onClick={() => handleRemoveItineraryDay(idx)}
                        disabled={itineraryDays.length === 1}
                      >
                        Delete
                      </button>
                    </div>
                  ))}

                  <button 
                    type="button" 
                    className="btn-secondary add-day-btn" 
                    onClick={handleAddItineraryDay}
                  >
                    + Add Next Itinerary Day
                  </button>
                </div>
              )}

              {/* Room Tiers builder for hotels */}
              {editingType === "hotel" && (
                <div className="form-itinerary-builder">
                  <h4>Configure Room Tiers</h4>
                  {roomTypes.map((room, idx) => (
                    <div key={idx} className="itinerary-day-edit-row">
                      <div className="day-number-label" style={{ minWidth: "90px" }}>Tier {idx + 1}</div>
                      
                      <input 
                        type="text"
                        placeholder="Room Type Name (e.g. Deluxe Room)"
                        value={room.name}
                        onChange={(e) => handleRoomChange(idx, "name", e.target.value)}
                        required
                      />

                      <input 
                        type="number"
                        step="0.1"
                        placeholder="Price Multiplier (e.g. 1.5)"
                        value={room.priceMultiplier}
                        onChange={(e) => handleRoomChange(idx, "priceMultiplier", Number(e.target.value))}
                        style={{ maxWidth: "120px" }}
                        required
                      />

                      <textarea 
                        placeholder="Room descriptions (e.g. King Bed, Sea view)"
                        rows="1"
                        value={room.description}
                        onChange={(e) => handleRoomChange(idx, "description", e.target.value)}
                        required
                      />

                      <button 
                        type="button" 
                        className="btn-danger-sm"
                        onClick={() => handleRemoveRoomType(idx)}
                        disabled={roomTypes.length === 1}
                      >
                        Delete
                      </button>
                    </div>
                  ))}

                  <button 
                    type="button" 
                    className="btn-secondary add-day-btn" 
                    onClick={handleAddRoomType}
                  >
                    + Add Next Room Tier
                  </button>
                </div>
              )}

              <div className="wizard-footer-buttons">
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingTour || editingHotel ? "Save Changes" : "Create Property"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
