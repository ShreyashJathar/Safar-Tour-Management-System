import React from "react";
import { useCurrency } from "../context/CurrencyContext";

export default function TicketVoucherModal({ booking, onClose }) {
  const { formatPrice } = useCurrency();
  if (!booking) return null;

  const isTour = booking.bookingType === "tour" || !!booking.tourTitle;
  const isHotel = booking.bookingType === "hotel" || !!booking.hotelName;
  const isFlight = booking.bookingType === "flight" || !!booking.flightNumber;
  const isAttraction = booking.bookingType === "attraction" || !!booking.placeName;

  const title = booking.tourTitle || booking.hotelName || booking.placeName || (isFlight ? `${booking.airline || "Flight"} (${booking.originCity} -> ${booking.destinationCity})` : "Safar Journey");
  const reference = booking.bookingId || booking.id || "SFR-992104";
  const guestName = booking.primaryContact?.name || booking.customerName || "Safar Traveler";
  const guestPhone = booking.primaryContact?.phone || booking.phone || "+91 98220 53589";
  const bookedDate = booking.bookedAt || booking.date || booking.checkIn || new Date().toISOString().split("T")[0];
  const finalPrice = booking.finalCost || booking.totalCost || booking.amount || 0;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `✈️ *Safar Verified Booking Voucher*\n` +
      `Booking Ref: ${reference}\n` +
      `Item: ${title}\n` +
      `Traveler: ${guestName}\n` +
      `Status: Confirmed\n\n` +
      `View live at https://shreyashjathar.com`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="trip-modal-backdrop animate-fade" onClick={onClose}>
      <div className="ticket-modal-card animate-scale-up" onClick={(e) => e.stopPropagation()}>
        <div className="ticket-modal-header no-print">
          <div className="ticket-header-title">
            <span className="voucher-icon">🎫</span>
            <div>
              <h3>Official E-Ticket & Confirmation Voucher</h3>
              <p>Trip.com Global Partner Verified</p>
            </div>
          </div>
          <button className="trip-modal-close-btn" onClick={onClose}>&times;</button>
        </div>

        {/* Printable Ticket Area */}
        <div className="ticket-printable-document" id="safar-printable-pass">
          <div className="voucher-head">
            <div className="voucher-brand">
              <span className="brand-logo">Sa<span>far</span></span>
              <span className="brand-sub">Luxury Tour & Travel Management</span>
            </div>
            <div className="voucher-badge">
              {isFlight ? "E-BOARDING PASS" : isHotel ? "HOTEL CHECK-IN VOUCHER" : "VIP TOUR VOUCHER"}
            </div>
          </div>

          <div className="voucher-grid-2">
            <div className="voucher-block">
              <span className="v-label">PRIMARY TRAVELER / GUEST</span>
              <span className="v-value prominent">{guestName}</span>
              <span className="v-sub">{guestPhone}</span>
            </div>
            <div className="voucher-block align-right">
              <span className="v-label">RESERVATION REFERENCE</span>
              <span className="v-value code-ref">{reference}</span>
              <span className="v-sub status-confirmed">● Booking Confirmed</span>
            </div>
          </div>

          <div className="voucher-divider"></div>

          <div className="voucher-grid-3">
            <div className="voucher-block">
              <span className="v-label">DESTINATION / PROPERTY</span>
              <span className="v-value">{title}</span>
              <span className="v-sub">{booking.tourLocation || booking.hotelLocation || booking.placeCity || "Worldwide Destination"}</span>
            </div>
            <div className="voucher-block">
              <span className="v-label">TRAVEL / CHECK-IN DATES</span>
              <span className="v-value">{booking.date || `${booking.checkIn || bookedDate} to ${booking.checkOut || 'Open'}`}</span>
              <span className="v-sub">{booking.nights ? `${booking.nights} Nights Stay` : "Full Day Excursion"}</span>
            </div>
            <div className="voucher-block">
              <span className="v-label">GUESTS & PARTY</span>
              <span className="v-value">{booking.adults || 1} Adults {booking.children ? `, ${booking.children} Children` : ""}</span>
              <span className="v-sub">{booking.roomType || booking.ticketTypeName || "Standard VIP Tier"}</span>
            </div>
          </div>

          <div className="voucher-financial-summary">
            <div className="fin-row">
              <span>Payment Gateway Ref</span>
              <span>{booking.paymentId || "RPAY_PROD_VERIFIED"}</span>
            </div>
            <div className="fin-row">
              <span>Payment Mode</span>
              <span>{booking.paymentMethod || "Credit / Debit / UPI (Instant)"}</span>
            </div>
            <div className="fin-row total">
              <span>Total Paid & Cleared</span>
              <span className="paid-amount">{formatPrice(finalPrice)}</span>
            </div>
          </div>

          <div className="voucher-footer-strip">
            <div className="qr-box">
              <svg width="70" height="70" viewBox="0 0 100 100" fill="#0f172a">
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
              <span className="qr-caption">Scan to Verify</span>
            </div>
            <div className="voucher-terms">
              <p>• Present this e-ticket or mobile QR upon arrival at hotel check-in or airport boarding counter.</p>
              <p>• Government photo ID is required for all adult guests matching the voucher names.</p>
              <p>• 24/7 Global Traveler Helpline: +91 98220 53589 | support@shreyashjathar.com</p>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="ticket-modal-actions no-print">
          <button className="btn-secondary" onClick={handleWhatsAppShare}>
            <span>📲 Send to WhatsApp</span>
          </button>
          <button className="btn-primary" onClick={handlePrint}>
            <span>🖨️ Download / Print PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
