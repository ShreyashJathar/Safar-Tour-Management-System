import React from "react";

export default function SupportModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleWhatsAppChat = () => {
    const text = encodeURIComponent("Hello Safar Concierge! I need assistance with my booking / listing property.");
    window.open(`https://wa.me/919822053589?text=${text}`, "_blank");
  };

  return (
    <div className="trip-modal-backdrop animate-fade" onClick={onClose}>
      <div className="trip-modal-card animate-scale-up" onClick={(e) => e.stopPropagation()}>
        <div className="trip-modal-header">
          <div className="trip-modal-title">
            <span className="modal-icon">🎧</span>
            <div>
              <h3>24/7 Global Customer Support</h3>
              <p>We are here to assist you anywhere in the world</p>
            </div>
          </div>
          <button className="trip-modal-close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="trip-modal-body">
          <div className="support-channels-grid">
            <div className="support-card highlighted" onClick={handleWhatsAppChat}>
              <div className="support-badge">Instant 24/7</div>
              <div className="support-card-icon">💬</div>
              <h4>WhatsApp Concierge</h4>
              <p>Get real-time agent support, booking updates, and e-ticket reprints via official WhatsApp.</p>
              <button className="support-action-btn wa-btn">
                <span>Chat on WhatsApp</span>
                <span className="arrow">&rarr;</span>
              </button>
            </div>

            <div className="support-card">
              <div className="support-card-icon">📞</div>
              <h4>Direct Telephone</h4>
              <p>Toll-free 24/7 helpline for emergency flight or hotel reservation assistance.</p>
              <a href="tel:+919822053589" className="support-action-btn phone-btn">
                <span>+91 98220 53589</span>
              </a>
            </div>

            <div className="support-card">
              <div className="support-card-icon">✉️</div>
              <h4>Priority Email Desk</h4>
              <p>Send documents, corporate booking inquiries, or host property listing requests.</p>
              <a href="mailto:support@shreyashjathar.com" className="support-action-btn email-btn">
                <span>support@shreyashjathar.com</span>
              </a>
            </div>
          </div>

          <div className="host-property-callout">
            <div className="host-icon">🏡</div>
            <div className="host-details">
              <h4>Want to list your hotel, villa or resort on Safar?</h4>
              <p>Join 12,000+ verified hospitality partners and receive verified international travelers.</p>
            </div>
            <button className="host-cta-btn" onClick={() => alert("Partner registration portal opens soon. Contact support@shreyashjathar.com with your property details!")}>
              Join as Partner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
