import React, { useState } from "react";
import { getBackendBaseUrl } from "../services/api";

export default function BookingWizard({ 
  bookingData, 
  currentUser, 
  onClose, 
  onCompleteBooking 
}) {
  const bookingType = bookingData.type || bookingData.bookingType || "tour";
  const { 
    tour, 
    hotel, 
    room, 
    date, 
    checkIn, 
    checkOut, 
    nights, 
    adults = 1, 
    children = 0
  } = bookingData;

  const initialCost = bookingData.calculatedPrice || bookingData.totalCost || 50;
  const numAdults = adults || bookingData.passengers || 1;
  const numChildren = children || 0;

  const [step, setStep] = useState(1);
  
  // Form States
  const [primaryName, setPrimaryName] = useState(currentUser ? currentUser.fullName : "");
  const [primaryEmail, setPrimaryEmail] = useState(currentUser ? currentUser.email || "" : "");
  const [primaryPhone, setPrimaryPhone] = useState("");
  const [otherTravelers, setOtherTravelers] = useState(
    Array.from({ length: Math.max(0, (numAdults + numChildren - 1)) }, (_, i) => ({
      name: "",
      age: i < (numAdults - 1) ? "Adult" : "Child"
    }))
  );

  // Addons states (customized for tours vs hotels)
  const [tourAddons, setTourAddons] = useState({
    insurance: false, // ₹49 per person
    transfer: false,  // ₹59 flat
    upgrade: false,   // ₹150 flat
    cab: false        // ₹1200 flat
  });

  const [hotelAddons, setHotelAddons] = useState({
    breakfast: false, // ₹20 per person per night
    transfer: false,  // ₹60 flat
    lateCheckout: false, // ₹40 flat
    cab: false        // ₹1200 flat
  });

  // Promo Code States
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [showQrVerification, setShowQrVerification] = useState(false);

  // Credit Card States
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Final ticket states
  const [bookingId, setBookingId] = useState("");

  const totalTravelers = adults + children;
  
  // Calculate running total cost
  let finalCost = initialCost;
  if (bookingType === "tour") {
    if (tourAddons.insurance) finalCost += 49 * totalTravelers;
    if (tourAddons.transfer) finalCost += 59;
    if (tourAddons.upgrade) finalCost += 150;
    if (tourAddons.cab) finalCost += 1200;
  } else {
    if (hotelAddons.breakfast) finalCost += 20 * totalTravelers * (nights || 1);
    if (hotelAddons.transfer) finalCost += 60;
    if (hotelAddons.lateCheckout) finalCost += 40;
    if (hotelAddons.cab) finalCost += 1200;
  }

  // Calculate promo code discount
  let discountValue = 0;
  if (appliedPromo) {
    if (appliedPromo.type === "flat") {
      discountValue = appliedPromo.amount;
    } else if (appliedPromo.type === "percent") {
      discountValue = Math.round(finalCost * (appliedPromo.amount / 100));
    }
  }
  finalCost = Math.max(0, finalCost - discountValue);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError("");
    const code = promoCodeInput.trim().toUpperCase();
    if (!code) return;

    if (code === "SAFAR2026") {
      setAppliedPromo({ code: "SAFAR2026", type: "flat", amount: 1000, label: "₹1,000 Special Discount" });
    } else if (code === "SHREYASH") {
      setAppliedPromo({ code: "SHREYASH", type: "flat", amount: 1500, label: "₹1,500 Admin VIP Discount" });
    } else if (code === "WELCOME10") {
      setAppliedPromo({ code: "WELCOME10", type: "percent", amount: 10, label: "10% Welcome Discount" });
    } else {
      setPromoError("Invalid or expired coupon code. Try SAFAR2026 or SHREYASH");
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!primaryName || !primaryEmail || !primaryPhone) {
        alert("Please complete the primary contact info.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const completeBookingProcess = (generatedId, paymentRef = null) => {
    setBookingId(generatedId);
    
    const isHotel = bookingType === "hotel";
    const isAttraction = bookingType === "attraction";
    const isFlight = bookingType === "flight";

    const newBookingObj = {
      bookingId: generatedId,
      bookingType: bookingType,
      paymentId: paymentRef,
      paymentMethod: paymentRef ? "Razorpay (UPI/Cards/NetBanking)" : "Credit Card",
      
      // Tour specifics
      tourId: bookingType === "tour" ? tour?.id : null,
      tourTitle: bookingType === "tour" ? tour?.title : null,
      tourLocation: bookingType === "tour" ? tour?.location : null,
      tourImage: bookingType === "tour" ? tour?.image : null,
      date: bookingType === "tour" ? date : null,
      
      // Hotel specifics
      hotelId: isHotel ? hotel?.id : null,
      hotelName: isHotel ? hotel?.name : null,
      hotelLocation: isHotel ? hotel?.location : null,
      hotelImage: isHotel ? hotel?.image : null,
      roomType: isHotel ? room?.name : null,
      checkIn: isHotel ? checkIn : null,
      checkOut: isHotel ? checkOut : null,
      nights: isHotel ? nights : null,

      // Attraction specifics
      placeId: isAttraction ? bookingData.item?.id : null,
      placeName: isAttraction ? bookingData.item?.name : null,
      placeCity: isAttraction ? bookingData.item?.city : null,
      placeImage: isAttraction ? bookingData.item?.image : null,
      ticketTypeName: isAttraction ? bookingData.ticketType?.name : null,

      // Flight specifics
      flightId: isFlight ? bookingData.item?.id : null,
      airline: isFlight ? bookingData.item?.airline : null,
      flightNumber: isFlight ? bookingData.item?.flightNumber : null,
      originCity: isFlight ? bookingData.item?.originCity : null,
      destinationCity: isFlight ? bookingData.item?.destinationCity : null,
      departureTime: isFlight ? bookingData.item?.departureTime : null,
      cabinName: isFlight ? bookingData.cabinClass?.name : null,
      departDate: isFlight ? bookingData.departDate : null,

      // Common details
      adults: numAdults,
      children: numChildren,
      addons: isHotel ? hotelAddons : tourAddons,
      finalCost: finalCost,
      primaryContact: {
        name: primaryName,
        email: primaryEmail,
        phone: primaryPhone
      },
      otherTravelers: otherTravelers,
      status: "Confirmed",
      bookedAt: new Date().toISOString().split("T")[0]
    };

    onCompleteBooking(newBookingObj);
    setStep(4);
  };

  const handleRazorpayPayment = async (e) => {
    if (e) e.preventDefault();
    setIsProcessing(true);

    try {
      const backendUrl = getBackendBaseUrl();
      const res = await fetch(`${backendUrl}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalCost, currency: "INR" })
      });
      const data = await res.json();

      if (!res.ok || !data.success || !data.order) {
        setIsProcessing(false);
        alert(data.message || "Failed to initialize payment gateway.");
        return;
      }

      const order = data.order;
      const razorpayKey = data.key || "rzp_test_TK6y872Uunu0Bm";

      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "Safar Luxury Travel",
        description: `Payment for ${tour?.title || hotel?.name || bookingData.item?.name || "Travel Stay"}`,
        image: "https://cdn-icons-png.flaticon.com/512/201/201623.png",
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyRes = await fetch(`${backendUrl}/api/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });
            const verifyData = await verifyRes.json();

            setIsProcessing(false);

            if (verifyData.success) {
              const generatedId = "SFR-" + Math.floor(100000 + Math.random() * 900000);
              completeBookingProcess(generatedId, response.razorpay_payment_id);
            } else {
              alert("Payment verification failed.");
            }
          } catch (err) {
            setIsProcessing(false);
            alert("Error verifying transaction.");
          }
        },
        prefill: {
          name: primaryName || "Safar Traveler",
          email: primaryEmail || "traveler@safar.com",
          contact: primaryPhone || "9876543210"
        },
        notes: {
          bookingType,
          email: primaryEmail
        },
        theme: {
          color: "#00df89"
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          }
        }
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        setIsProcessing(false);
        alert("Razorpay checkout SDK loading...");
      }
    } catch (err) {
      setIsProcessing(false);
      alert("Cannot connect to server. Ensure backend is running.");
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
      alert("Please fill in your credit card details or use Razorpay Quick Pay.");
      return;
    }
    
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const generatedId = "VFW-" + Math.floor(100000 + Math.random() * 900000);
      completeBookingProcess(generatedId);
    }, 2000);
  };

  const handleOtherTravelerChange = (index, value) => {
    const updated = [...otherTravelers];
    updated[index].name = value;
    setOtherTravelers(updated);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  return (
    <div className="modal-overlay wizard-overlay">
      <div className="wizard-modal glassmorphic-modal">
        {/* Step Indicator */}
        {step < 4 && (
          <div className="wizard-steps-header">
            <div className={`step-item ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""}`}>
              <span className="step-num">1</span>
              <span className="step-label">Travelers</span>
            </div>
            <div className={`step-divider ${step > 1 ? "completed" : ""}`}></div>
            <div className={`step-item ${step >= 2 ? "active" : ""} ${step > 2 ? "completed" : ""}`}>
              <span className="step-num">2</span>
              <span className="step-label">Add-ons</span>
            </div>
            <div className={`step-divider ${step > 2 ? "completed" : ""}`}></div>
            <div className={`step-item ${step >= 3 ? "active" : ""} ${step > 3 ? "completed" : ""}`}>
              <span className="step-num">3</span>
              <span className="step-label">Checkout</span>
            </div>
          </div>
        )}

        <button className="modal-close-btn" onClick={onClose} disabled={isProcessing}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Step 1: Passenger Details Form */}
        {step === 1 && (
          <form className="wizard-form animate-fade" onSubmit={handleNextStep}>
            <h3>{bookingType === "tour" ? "Who is traveling?" : "Primary Guest Information"}</h3>
            <div className="form-grid">
              <div className="wizard-field full-width">
                <label>Primary Guest Name</label>
                <input 
                  type="text" 
                  value={primaryName}
                  onChange={(e) => setPrimaryName(e.target.value)}
                  placeholder="Full Name"
                  required 
                />
              </div>

              <div className="wizard-field">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={primaryEmail}
                  onChange={(e) => setPrimaryEmail(e.target.value)}
                  placeholder="name@example.com"
                  required 
                />
              </div>

              <div className="wizard-field">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  value={primaryPhone}
                  onChange={(e) => setPrimaryPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  required 
                />
              </div>
            </div>

            {otherTravelers.length > 0 && (
              <div className="other-travelers-section">
                <h4>Additional Guests</h4>
                {otherTravelers.map((traveler, index) => (
                  <div key={index} className="other-traveler-row">
                    <span className="t-index">{index + 2}</span>
                    <input 
                      type="text" 
                      placeholder={`${traveler.age} Full Name`}
                      value={traveler.name}
                      onChange={(e) => handleOtherTravelerChange(index, e.target.value)}
                      required
                    />
                    <span className="t-badge">{traveler.age}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="wizard-footer-buttons">
              <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn-primary">Continue to Add-ons</button>
            </div>
          </form>
        )}

        {/* Step 2: Addons */}
        {step === 2 && (
          <div className="wizard-form animate-fade">
            <h3>Personalize Your Stay</h3>
            <p className="wizard-intro-text">
              {bookingType === "tour" 
                ? `Enhance your trip to ${tour.location} with our premium services.`
                : `Add extra comfort to your booking at ${hotel.name}.`}
            </p>

            <div className="addons-list">
              {bookingType === "tour" ? (
                /* Tour Add-ons */
                <>
                  <div className={`addon-item ${tourAddons.insurance ? "selected" : ""}`}>
                    <input 
                      type="checkbox" 
                      id="addon-insurance" 
                      checked={tourAddons.insurance}
                      onChange={(e) => setTourAddons({ ...tourAddons, insurance: e.target.checked })}
                    />
                    <label htmlFor="addon-insurance" className="addon-label">
                      <div className="addon-meta">
                        <span className="addon-title">Comprehensive Travel Insurance</span>
                        <span className="addon-description">Medical cover, trip cancellation insurance, and baggage protection. Recommended.</span>
                      </div>
                      <span className="addon-price">₹49 / person</span>
                    </label>
                  </div>

                  <div className={`addon-item ${tourAddons.transfer ? "selected" : ""}`}>
                    <input 
                      type="checkbox" 
                      id="addon-transfer" 
                      checked={tourAddons.transfer}
                      onChange={(e) => setTourAddons({ ...tourAddons, transfer: e.target.checked })}
                    />
                    <label htmlFor="addon-transfer" className="addon-label">
                      <div className="addon-meta">
                        <span className="addon-title">Airport Private Shuttle Transfer</span>
                        <span className="addon-description">Personal chauffeur meeting you inside the terminal gates. Direct to hotel.</span>
                      </div>
                      <span className="addon-price">₹59 flat</span>
                    </label>
                  </div>

                  <div className={`addon-item ${tourAddons.upgrade ? "selected" : ""}`}>
                    <input 
                      type="checkbox" 
                      id="addon-upgrade" 
                      checked={tourAddons.upgrade}
                      onChange={(e) => setTourAddons({ ...tourAddons, upgrade: e.target.checked })}
                    />
                    <label htmlFor="addon-upgrade" className="addon-label">
                      <div className="addon-meta">
                        <span className="addon-title">5-Star Luxury Resort Room Upgrade</span>
                        <span className="addon-description">Upgrade to Premium Suite with panoramic ocean/mountain views and lounge access.</span>
                      </div>
                      <span className="addon-price">₹150 flat</span>
                    </label>
                  </div>

                  <div className={`addon-item ${tourAddons.cab ? "selected" : ""}`}>
                    <input 
                      type="checkbox" 
                      id="addon-cab" 
                      checked={tourAddons.cab}
                      onChange={(e) => setTourAddons({ ...tourAddons, cab: e.target.checked })}
                    />
                    <label htmlFor="addon-cab" className="addon-label">
                      <div className="addon-meta">
                        <span className="addon-title">🚗 Intercity Private Cab Pickup & Drop</span>
                        <span className="addon-description">Dedicated AC Sedan/SUV for door-to-door intercity travel throughout your stay.</span>
                      </div>
                      <span className="addon-price">₹1,200 flat</span>
                    </label>
                  </div>
                </>
              ) : (
                /* Hotel Add-ons */
                <>
                  <div className={`addon-item ${hotelAddons.breakfast ? "selected" : ""}`}>
                    <input 
                      type="checkbox" 
                      id="addon-breakfast" 
                      checked={hotelAddons.breakfast}
                      onChange={(e) => setHotelAddons({ ...hotelAddons, breakfast: e.target.checked })}
                    />
                    <label htmlFor="addon-breakfast" className="addon-label">
                      <div className="addon-meta">
                        <span className="addon-title">All-Inclusive Breakfast Buffet</span>
                        <span className="addon-description">Fresh local and continental hot breakfast served daily in the central restaurant.</span>
                      </div>
                      <span className="addon-price">₹20 / person / night</span>
                    </label>
                  </div>

                  <div className={`addon-item ${hotelAddons.transfer ? "selected" : ""}`}>
                    <input 
                      type="checkbox" 
                      id="addon-hotel-transfer" 
                      checked={hotelAddons.transfer}
                      onChange={(e) => setHotelAddons({ ...hotelAddons, transfer: e.target.checked })}
                    />
                    <label htmlFor="addon-hotel-transfer" className="addon-label">
                      <div className="addon-meta">
                        <span className="addon-title">Airport Chauffeur Transfer (Two-way)</span>
                        <span className="addon-description">Private pick-up at terminal arrival on check-in day and return shuttle on check-out day.</span>
                      </div>
                      <span className="addon-price">₹60 flat</span>
                    </label>
                  </div>

                  <div className={`addon-item ${hotelAddons.lateCheckout ? "selected" : ""}`}>
                    <input 
                      type="checkbox" 
                      id="addon-latecheckout" 
                      checked={hotelAddons.lateCheckout}
                      onChange={(e) => setHotelAddons({ ...hotelAddons, lateCheckout: e.target.checked })}
                    />
                    <label htmlFor="addon-latecheckout" className="addon-label">
                      <div className="addon-meta">
                        <span className="addon-title">Guaranteed Late Check-out (until 4:00 PM)</span>
                        <span className="addon-description">Keep your suite longer on departure day. Subject to availability at desk.</span>
                      </div>
                      <span className="addon-price">₹40 flat</span>
                    </label>
                  </div>

                  <div className={`addon-item ${hotelAddons.cab ? "selected" : ""}`}>
                    <input 
                      type="checkbox" 
                      id="addon-hotel-cab" 
                      checked={hotelAddons.cab}
                      onChange={(e) => setHotelAddons({ ...hotelAddons, cab: e.target.checked })}
                    />
                    <label htmlFor="addon-hotel-cab" className="addon-label">
                      <div className="addon-meta">
                        <span className="addon-title">🚗 Intercity Cab & Sightseeing Transport</span>
                        <span className="addon-description">Private chauffeur for local sight-seeing and airport transfers.</span>
                      </div>
                      <span className="addon-price">₹1,200 flat</span>
                    </label>
                  </div>
                </>
              )}
            </div>

            {/* Promo Code Box */}
            <div className="promo-code-section glassmorphic" style={{ padding: "16px", borderRadius: "12px", marginBottom: "20px", border: "1px solid var(--border-color)" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: "700", display: "block", marginBottom: "8px" }}>🎟️ Have a Coupon / Promo Code?</span>
              <form onSubmit={handleApplyPromo} style={{ display: "flex", gap: "8px" }}>
                <input 
                  type="text" 
                  placeholder="e.g. SAFAR2026 or SHREYASH"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  style={{ flex: 1, padding: "8px 14px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "rgba(255,255,255,0.05)", color: "white", textTransform: "uppercase" }}
                />
                <button type="submit" className="btn-secondary-sm" style={{ padding: "8px 16px" }}>Apply Code</button>
              </form>

              {appliedPromo && (
                <div style={{ marginTop: "8px", color: "#00df89", fontSize: "0.85rem", fontWeight: "700", display: "flex", justifyContent: "space-between" }}>
                  <span>✓ Applied: {appliedPromo.code} ({appliedPromo.label})</span>
                  <button type="button" onClick={() => setAppliedPromo(null)} style={{ background: "none", border: "none", color: "var(--danger)", cursor: "pointer", textDecoration: "underline" }}>Remove</button>
                </div>
              )}
              {promoError && (
                <div style={{ marginTop: "6px", color: "var(--danger)", fontSize: "0.82rem" }}>{promoError}</div>
              )}
            </div>

            <div className="wizard-price-breakdown glassmorphic">
              <div className="breakdown-row">
                <span>
                  {bookingType === "tour" 
                    ? `Base Trip Price (${totalTravelers} travelers)` 
                    : `Base Room Cost (${nights} nights, ${room.name})`}
                </span>
                <span>₹{initialCost.toLocaleString("en-IN")}</span>
              </div>
              
              {bookingType === "tour" ? (
                <>
                  {tourAddons.insurance && (
                    <div className="breakdown-row text-accent">
                      <span>Travel Insurance (₹49 × {totalTravelers})</span>
                      <span>+₹{(49 * totalTravelers).toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  {tourAddons.transfer && (
                    <div className="breakdown-row text-accent">
                      <span>Airport Chauffeur Transfer</span>
                      <span>+₹59</span>
                    </div>
                  )}
                  {tourAddons.upgrade && (
                    <div className="breakdown-row text-accent">
                      <span>Resort Room Suite Upgrade</span>
                      <span>+₹150</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {hotelAddons.breakfast && (
                    <div className="breakdown-row text-accent">
                      <span>Breakfast Buffet (₹20 × {totalTravelers} guests × {nights} nights)</span>
                      <span>+₹{(20 * totalTravelers * (nights || 1)).toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  {hotelAddons.transfer && (
                    <div className="breakdown-row text-accent">
                      <span>Two-way Chauffeur Shuttle</span>
                      <span>+₹60</span>
                    </div>
                  )}
                  {hotelAddons.lateCheckout && (
                    <div className="breakdown-row text-accent">
                      <span>Late Check-out (4:00 PM)</span>
                      <span>+₹40</span>
                    </div>
                  )}
                </>
              )}
              <hr />
              <div className="breakdown-row final-total">
                <span>Grand Total</span>
                <span>₹{finalCost.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="wizard-footer-buttons">
              <button type="button" className="btn-secondary" onClick={() => setStep(1)}>Back</button>
              <button type="button" className="btn-primary" onClick={handleNextStep}>Proceed to Payment</button>
            </div>
          </div>
        )}

        {/* Step 3: Payment Checkout */}
        {step === 3 && (
          <div className="wizard-form animate-fade">
            <h3>Complete Checkout</h3>

            {isProcessing ? (
              <div className="payment-processing-spinner">
                <div className="spinner"></div>
                <p>Connecting to Secure Razorpay Gateway...</p>
                <span>Please do not refresh or close this window</span>
              </div>
            ) : (
              <div className="payment-options-wrapper" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                
                {/* RAZORPAY INSTANT CHECKOUT OPTION */}
                <div className="razorpay-checkout-banner glassmorphic" style={{
                  background: "linear-gradient(135deg, rgba(0, 223, 137, 0.15), rgba(11, 19, 42, 0.6))",
                  border: "1px solid var(--accent-primary, #00df89)",
                  borderRadius: "16px",
                  padding: "20px",
                  textAlign: "center",
                  boxShadow: "0 10px 30px rgba(0,223,137,0.15)"
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "8px" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00df89" strokeWidth="2.5">
                      <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="2" y1="10" x2="22" y2="10"></line>
                    </svg>
                    <h4 style={{ margin: 0, fontSize: "1.15rem", color: "#00df89", fontWeight: "700" }}>
                      Instant Pay via Razorpay
                    </h4>
                  </div>
                  <p style={{ fontSize: "0.85rem", opacity: 0.9, marginBottom: "14px" }}>
                    Pay securely using <strong>UPI, Google Pay, PhonePe, Paytm, Cards, or NetBanking</strong>
                  </p>
                  
                  <button 
                    type="button" 
                    className="btn-primary" 
                    style={{ 
                      width: "100%", 
                      padding: "14px", 
                      fontSize: "1.05rem", 
                      fontWeight: "700",
                      background: "linear-gradient(90deg, #00df89, #00b871)",
                      color: "#0b132a",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      boxShadow: "0 4px 20px rgba(0,223,137,0.4)"
                    }}
                    onClick={handleRazorpayPayment}
                  >
                    ⚡ Pay ₹{finalCost.toLocaleString("en-IN")} via Razorpay
                  </button>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "4px 0" }}>
                  <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.15)" }}></div>
                  <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", opacity: 0.6 }}>Or Pay via Card</span>
                  <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.15)" }}></div>
                </div>

                <div className="payment-layout">
                {/* 3D Flipping Card Visual */}
                <div className="credit-card-view-wrapper">
                  <div className={`credit-card-inner ${isFlipped ? "flipped" : ""}`}>
                    {/* Front */}
                    <div className="card-face card-front">
                      <div className="card-top-row">
                        <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
                          <line x1="2" y1="10" x2="22" y2="10"></line>
                        </svg>
                        <span className="card-brand-tag">TH Secure</span>
                      </div>
                      <div className="card-number-display">
                        {cardNumber || "•••• •••• •••• ••••"}
                      </div>
                      <div className="card-bottom-row">
                        <div className="card-holder-group">
                          <span className="lbl">Card Holder</span>
                          <span className="val">{cardName || "YOUR NAME"}</span>
                        </div>
                        <div className="card-expiry-group">
                          <span className="lbl">Expires</span>
                          <span className="val">{cardExpiry || "MM/YY"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Back */}
                    <div className="card-face card-back">
                      <div className="card-magnetic-strip"></div>
                      <div className="card-signature-strip">
                        <div className="card-cvv-display">{cardCvv || "•••"}</div>
                      </div>
                      <div className="card-back-text">
                        Security verification code (CVV)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card inputs */}
                <form className="payment-form" onSubmit={handlePaymentSubmit}>
                  <div className="payment-fields-grid">
                    <div className="wizard-field full-width">
                      <label htmlFor="cardNum">Card Number</label>
                      <input 
                        type="text" 
                        id="cardNum"
                        maxLength="19"
                        placeholder="4111 2222 3333 4444"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        onFocus={() => setIsFlipped(false)}
                        required
                      />
                    </div>

                    <div className="wizard-field full-width">
                      <label htmlFor="cardName">Cardholder Name</label>
                      <input 
                        type="text" 
                        id="cardName"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        onFocus={() => setIsFlipped(false)}
                        required
                      />
                    </div>

                    <div className="wizard-field">
                      <label htmlFor="cardExp">Expiration Date</label>
                      <input 
                        type="text" 
                        id="cardExp"
                        maxLength="5"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => {
                          let v = e.target.value.replace(/[^0-9]/g, "");
                          if (v.length >= 2) {
                            v = v.slice(0,2) + "/" + v.slice(2,4);
                          }
                          setCardExpiry(v);
                        }}
                        onFocus={() => setIsFlipped(false)}
                        required
                      />
                    </div>

                    <div className="wizard-field">
                      <label htmlFor="cardCvv">CVV Code</label>
                      <input 
                        type="password" 
                        id="cardCvv"
                        maxLength="3"
                        placeholder="123"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, ""))}
                        onFocus={() => setIsFlipped(true)}
                        onBlur={() => setIsFlipped(false)}
                        required
                      />
                    </div>
                  </div>

                  <div className="payment-summary-summary">
                    <span>Grand Total:</span>
                    <strong>₹{finalCost.toLocaleString("en-IN")}</strong>
                  </div>

                  <div className="wizard-footer-buttons">
                    <button type="button" className="btn-secondary" onClick={() => setStep(2)}>Back</button>
                    <button type="submit" className="btn-primary flex-btn">
                      Confirm & Pay ₹{finalCost.toLocaleString("en-IN")}
                    </button>
                  </div>
                </form>
              </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Success confirmation and Voucher */}
        {step === 4 && (
          <div className="wizard-form animate-scale-up ticket-success-view">
            <div className="success-icon-wrapper">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="success-checkmark">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            
            <h3>Reservation Confirmed!</h3>
            <p>Your transaction cleared. Your boarding stay details are generated below.</p>
            
            {/* The printable ticket card */}
            <div className="ticket-printable-container" id="printable-ticket">
              <div className="ticket-header">
                <div className="ticket-logo">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                  </svg>
                  <span>Safar</span>
                </div>
                <div className="ticket-status-badge">
                  {bookingType === "tour" ? "BOARDING PASS" : "HOTEL VOUCHER"}
                </div>
              </div>

              <div className="ticket-main-info">
                <div className="ticket-col">
                  <span className="ticket-lbl">{bookingType === "tour" ? "Traveler" : "Primary Guest"}</span>
                  <span className="ticket-val">{primaryName}</span>
                </div>
                <div className="ticket-col">
                  <span className="ticket-lbl">Voucher Ref</span>
                  <span className="ticket-val highlighted-ref">{bookingId}</span>
                </div>
              </div>

              <div className="ticket-middle-info">
                <div className="ticket-col">
                  <span className="ticket-lbl">{bookingType === "tour" ? "Destination" : "Hotel Name & Location"}</span>
                  <span className="ticket-val">{bookingType === "tour" ? tour.location : `${hotel.name}, ${hotel.location.split(",")[0]}`}</span>
                </div>
                <div className="ticket-col">
                  <span className="ticket-lbl">{bookingType === "tour" ? "Departure Date" : "Check-in / Check-out"}</span>
                  <span className="ticket-val">
                    {bookingType === "tour" ? date : `${checkIn} to ${checkOut}`}
                  </span>
                </div>
              </div>

              <div className="ticket-body-details">
                <div className="ticket-detail-item">
                  <span>{bookingType === "tour" ? "Package Title:" : "Room Tier Selected:"}</span>
                  <strong>{bookingType === "tour" ? tour.title : room.name}</strong>
                </div>
                <div className="ticket-detail-item">
                  <span>Guests/Travelers:</span>
                  <strong>{adults} Adults {children > 0 ? `, ${children} Children` : ""}</strong>
                </div>
                {bookingType === "hotel" && (
                  <div className="ticket-detail-item">
                    <span>Duration:</span>
                    <strong>{nights} Nights stay</strong>
                  </div>
                )}
                <div className="ticket-detail-item">
                  <span>Add-ons:</span>
                  <strong>
                    {bookingType === "tour" ? (
                      [
                        tourAddons.insurance ? "Insurance" : "",
                        tourAddons.transfer ? "Private Shuttle" : "",
                        tourAddons.upgrade ? "Suite Upgrade" : ""
                      ].filter(Boolean).join(", ") || "None"
                    ) : (
                      [
                        hotelAddons.breakfast ? "Buffet Breakfast" : "",
                        hotelAddons.transfer ? "Airport Shuttle" : "",
                        hotelAddons.lateCheckout ? "Late Checkout" : ""
                      ].filter(Boolean).join(", ") || "None"
                    )}
                  </strong>
                </div>
                <div className="ticket-detail-item price-row">
                  <span>Total Amount Paid:</span>
                  <strong>₹{finalCost.toLocaleString("en-IN")}</strong>
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
                    <rect x="10" y="35" width="15" height="5"></rect>
                    <rect x="15" y="45" width="5" height="15"></rect>
                    <rect x="35" y="55" width="20" height="5"></rect>
                    <rect x="70" y="35" width="10" height="10"></rect>
                    <rect x="80" y="45" width="10" height="15"></rect>
                    <rect x="70" y="70" width="15" height="5"></rect>
                    <rect x="80" y="80" width="10" height="10"></rect>
                  </svg>
                </div>
                <div className="ticket-barcodes">
                  <div className="bar1"></div>
                  <div className="bar2"></div>
                  <div className="bar3"></div>
                  <div className="bar4"></div>
                  <div className="bar2"></div>
                  <div className="bar1"></div>
                  <div className="bar3"></div>
                  <span className="barcode-number">{bookingId}</span>
                </div>
              </div>
            </div>

            <div className="wizard-footer-buttons">
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => setShowQrVerification(true)}
              >
                🔍 Verify Authenticity
              </button>
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => {
                  window.print();
                }}
              >
                📄 Download / Print Voucher
              </button>
              <button 
                type="button" 
                className="btn-primary" 
                onClick={onClose}
              >
                Go to Dashboard
              </button>
            </div>

            {/* QR Authenticity Overlay Modal */}
            {showQrVerification && (
              <div 
                className="auth-overlay animate-fade"
                onClick={() => setShowQrVerification(false)}
                style={{ zIndex: 9999 }}
              >
                <div 
                  className="auth-modal glassmorphic animate-scale-up"
                  onClick={(e) => e.stopPropagation()}
                  style={{ textAlign: "center", padding: "30px", maxWidth: "380px" }}
                >
                  <div style={{ width: "60px", height: "60px", background: "rgba(0, 223, 137, 0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px auto", color: "#00df89", fontSize: "1.8rem" }}>
                    ✓
                  </div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: "800", marginBottom: "6px" }}>Voucher Verified Authentic</h3>
                  <span style={{ fontSize: "0.75rem", color: "#00df89", fontWeight: "700", textTransform: "uppercase" }}>Cryptographic Hash Signature Valid</span>
                  
                  <div style={{ background: "rgba(255,255,255,0.04)", padding: "14px", borderRadius: "12px", border: "1px solid var(--border-color)", margin: "20px 0", textAlign: "left", fontSize: "0.85rem" }}>
                    <div><strong>Booking ID:</strong> {bookingId}</div>
                    <div><strong>Primary Guest:</strong> {primaryName}</div>
                    <div><strong>Verified Date:</strong> {new Date().toLocaleDateString("en-IN")}</div>
                    <div><strong>Security Hash:</strong> {Math.random().toString(36).substring(2, 12).toUpperCase()}</div>
                  </div>

                  <button 
                    className="btn-primary" 
                    onClick={() => setShowQrVerification(false)}
                    style={{ width: "100%" }}
                  >
                    Close Verification
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
