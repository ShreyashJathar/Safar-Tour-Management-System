import React, { useState } from "react";

export default function FlightsExplorer({ 
  flights = [], 
  onStartBooking 
}) {
  const [tripType, setTripType] = useState("one-way"); // one-way or round-trip
  const [origin, setOrigin] = useState("All");
  const [destination, setDestination] = useState("All");
  const [departDate, setDepartDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState("economy");

  const [selectedFlightForModal, setSelectedFlightForModal] = useState(null);
  const [selectedCabinOption, setSelectedCabinOption] = useState(null);

  // Origins and destinations filter list
  const originCities = ["All", "Delhi (DEL)", "Mumbai (BOM)"];
  const destCities = ["All", "Mumbai (BOM)", "Dubai (DXB)", "Singapore (SIN)", "Paris (CDG)", "Goa (GOI)", "Tokyo (NRT)"];

  const filteredFlights = flights.filter(f => {
    const matchesOrigin = origin === "All" || f.originCity === origin;
    const matchesDest = destination === "All" || f.destinationCity === destination;
    return matchesOrigin && matchesDest;
  });

  const handleFlightBookClick = (flight) => {
    setSelectedFlightForModal(flight);
    setSelectedCabinOption(flight.cabinClasses[0]);
  };

  const handleConfirmFlightBooking = () => {
    if (!selectedFlightForModal || !selectedCabinOption) return;

    const calculatedPrice = Math.round(selectedFlightForModal.price * selectedCabinOption.priceMultiplier);

    onStartBooking({
      type: "flight",
      item: selectedFlightForModal,
      cabinClass: selectedCabinOption,
      calculatedPrice: calculatedPrice,
      passengers: passengers,
      departDate: departDate,
      tripType: tripType
    });
    setSelectedFlightForModal(null);
  };

  return (
    <div className="flights-explorer-container section-container">
      {/* Header */}
      <div className="section-header-centered">
        <span className="section-subtitle-badge">✈️ Trip.com Flight Search</span>
        <h2 className="section-title">Search & Book Worldwide Flights</h2>
        <p className="section-description">
          Find cheapest airfares, non-stop flights, and luxury cabin seats with live instant confirmation.
        </p>
      </div>

      {/* Flight Search Control Box */}
      <div className="flight-search-card glassmorphic">
        <div className="flight-tabs-row">
          <button 
            className={`trip-type-btn ${tripType === "one-way" ? "active" : ""}`}
            onClick={() => setTripType("one-way")}
          >
            One-Way Flight
          </button>
          <button 
            className={`trip-type-btn ${tripType === "round-trip" ? "active" : ""}`}
            onClick={() => setTripType("round-trip")}
          >
            Round-Trip Flight
          </button>
        </div>

        <div className="flight-search-fields-grid">
          <div className="flight-field">
            <label>From (Origin)</label>
            <select value={origin} onChange={(e) => setOrigin(e.target.value)}>
              {originCities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flight-field">
            <label>To (Destination)</label>
            <select value={destination} onChange={(e) => setDestination(e.target.value)}>
              {destCities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flight-field">
            <label>Departure Date</label>
            <input 
              type="date" 
              value={departDate}
              onChange={(e) => setDepartDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="flight-field">
            <label>Passengers & Class</label>
            <div className="passengers-inline">
              <select value={passengers} onChange={(e) => setPassengers(Number(e.target.value))}>
                <option value="1">1 Traveler</option>
                <option value="2">2 Travelers</option>
                <option value="3">3 Travelers</option>
                <option value="4">4 Travelers</option>
              </select>
              <select value={cabinClass} onChange={(e) => setCabinClass(e.target.value)}>
                <option value="economy">Economy</option>
                <option value="premium">Premium Eco</option>
                <option value="business">Business / First</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Flight Results List */}
      <div className="flight-results-list">
        <h3>Available Flights ({filteredFlights.length})</h3>

        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight) => (
            <div key={flight.id} className="flight-result-card glassmorphic hover-lift">
              {/* Airline Badge */}
              <div className="airline-col">
                <span className="airline-logo">{flight.logo}</span>
                <div>
                  <div className="airline-name">{flight.airline}</div>
                  <div className="flight-no">{flight.flightNumber} • {flight.aircraft}</div>
                </div>
              </div>

              {/* Schedule Timeline */}
              <div className="schedule-col">
                <div className="time-block">
                  <span className="time">{flight.departureTime}</span>
                  <span className="code">{flight.origin}</span>
                </div>

                <div className="timeline-block">
                  <span className="duration">{flight.duration}</span>
                  <div className="flight-line">
                    <span className="dot"></span>
                    <span className="plane-icon">✈</span>
                    <span className="dot"></span>
                  </div>
                  <span className="stops-badge">{flight.stops}</span>
                </div>

                <div className="time-block">
                  <span className="time">{flight.arrivalTime}</span>
                  <span className="code">{flight.destination}</span>
                </div>
              </div>

              {/* Price & Book Action */}
              <div className="price-booking-col">
                <div className="flight-price-box">
                  <span className="from-txt">from</span>
                  <span className="price-val">${flight.price}</span>
                  <span className="per-person">/ traveler</span>
                </div>

                <button 
                  className="btn-primary"
                  onClick={() => handleFlightBookClick(flight)}
                >
                  Select Flight
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state-box">
            <div className="empty-icon">✈️</div>
            <h3>No Direct Flights Found</h3>
            <p>Try resetting the Origin and Destination filters to see all available routes.</p>
            <button className="btn-secondary" onClick={() => { setOrigin("All"); setDestination("All"); }}>
              Show All Flights
            </button>
          </div>
        )}
      </div>

      {/* Cabin Class Selection Modal */}
      {selectedFlightForModal && (
        <div className="modal-backdrop" onClick={() => setSelectedFlightForModal(null)}>
          <div className="modal-content flight-select-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedFlightForModal(null)}>✕</button>

            <h2>{selectedFlightForModal.airline} — {selectedFlightForModal.flightNumber}</h2>
            <p className="flight-route-subtitle">
              {selectedFlightForModal.originCity} ➔ {selectedFlightForModal.destinationCity} ({selectedFlightForModal.duration})
            </p>

            <h3>Choose Cabin Fare Class</h3>

            <div className="cabin-options-list">
              {selectedFlightForModal.cabinClasses.map((cb) => {
                const finalPrice = Math.round(selectedFlightForModal.price * cb.priceMultiplier);
                return (
                  <div 
                    key={cb.id}
                    className={`cabin-card ${selectedCabinOption?.id === cb.id ? "selected" : ""}`}
                    onClick={() => setSelectedCabinOption(cb)}
                  >
                    <div className="cabin-header">
                      <span className="cabin-name">{cb.name}</span>
                      <span className="cabin-price">${finalPrice}</span>
                    </div>
                    <p className="cabin-baggage">🧳 {cb.baggage}</p>
                  </div>
                );
              })}
            </div>

            <div className="flight-modal-footer">
              <div className="total-due">
                Total for {passengers} passenger(s): 
                <strong> ${Math.round(selectedFlightForModal.price * (selectedCabinOption?.priceMultiplier || 1)) * passengers}</strong>
              </div>

              <button className="btn-primary" onClick={handleConfirmFlightBooking}>
                Book Boarding Pass
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
