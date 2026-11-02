import React, { useState } from "react";
import { useCurrency } from "../context/CurrencyContext";

export default function Navbar({ 
  currentUser, 
  onOpenAuth, 
  onLogout, 
  currentView, 
  setCurrentView, 
  wishlistCount,
  darkMode,
  toggleDarkMode,
  onOpenSupport,
  onOpenFindBookings
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const { currency, setCurrency, currencies } = useCurrency();

  return (
    <header className="main-header trip-top-header">
      <div className="header-container">
        {/* Left Section: Logo & Brand */}
        <div className="header-left-cluster">
          <div className="logo-section" onClick={() => setCurrentView("explore-hotels")}>
            <div className="brand-logo-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
              </svg>
            </div>
            <span className="logo-text">Sa<span>far</span></span>
          </div>
        </div>

        {/* Right Section: Trip.com Top Bar Features */}
        <div className="header-actions trip-header-actions">
          {/* List Your Property */}
          <button 
            className="header-text-link hide-on-mobile"
            onClick={onOpenSupport}
          >
            List your property
          </button>

          {/* Currency Switcher Dropdown */}
          <div className="currency-selector-wrapper">
            <button 
              className="currency-trigger-btn"
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
            >
              <span>{currencies[currency]?.flag} {currency}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {currencyDropdownOpen && (
              <>
                <div className="dropdown-overlay" onClick={() => setCurrencyDropdownOpen(false)}></div>
                <div className="currency-menu-dropdown animate-fade">
                  <div className="currency-menu-header">Select Currency</div>
                  {Object.entries(currencies).map(([code, meta]) => (
                    <button
                      key={code}
                      className={`currency-option ${currency === code ? "active" : ""}`}
                      onClick={() => {
                        setCurrency(code);
                        setCurrencyDropdownOpen(false);
                      }}
                    >
                      <span className="curr-flag">{meta.flag}</span>
                      <span className="curr-code">{code}</span>
                      <span className="curr-name">{meta.name}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Customer Support */}
          <button 
            className="header-text-link"
            onClick={onOpenSupport}
          >
            Customer support
          </button>

          {/* Find Bookings */}
          <button 
            className="header-text-link hide-on-mobile"
            onClick={onOpenFindBookings}
          >
            Find bookings
          </button>

          {/* Saved Wishlist */}
          <button 
            className="nav-icon-btn hide-on-mobile" 
            onClick={() => setCurrentView("dashboard")}
            title="Saved Wishlist"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
          </button>

          {/* Dark / Light Theme Toggle */}
          <button 
            className="theme-toggle-btn" 
            onClick={toggleDarkMode} 
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {darkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {/* Auth Button or User Profile */}
          {!currentUser ? (
            <button className="trip-primary-signin-btn" onClick={onOpenAuth}>
              Sign in / register
            </button>
          ) : (
            <div className="user-profile-menu">
              <button 
                className="user-avatar-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="avatar-circle">
                  {currentUser.fullName ? currentUser.fullName.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="user-greeting hide-on-mobile">
                  {currentUser.fullName ? currentUser.fullName.split(" ")[0] : "Account"}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              {dropdownOpen && (
                <>
                  <div className="dropdown-overlay" onClick={() => setDropdownOpen(false)}></div>
                  <div className="profile-dropdown animate-fade">
                    <div className="dropdown-header">
                      <strong>{currentUser.fullName || "Traveler"}</strong>
                      <span>{currentUser.email || currentUser.phone || "Verified Guest"}</span>
                      {currentUser.role === "Admin" && (
                        <span className="admin-badge-pill">Administrator</span>
                      )}
                    </div>
                    
                    <div className="dropdown-divider"></div>

                    {currentUser.role === "Admin" ? (
                      <button 
                        className="dropdown-item" 
                        onClick={() => {
                          setCurrentView("admin");
                          setDropdownOpen(false);
                        }}
                      >
                        ⚡ Admin Management Console
                      </button>
                    ) : (
                      <button 
                        className="dropdown-item" 
                        onClick={() => {
                          setCurrentView("dashboard");
                          setDropdownOpen(false);
                        }}
                      >
                        🧳 My Bookings & Boarding Passes
                      </button>
                    )}

                    <button 
                      className="dropdown-item"
                      onClick={() => {
                        onOpenSupport();
                        setDropdownOpen(false);
                      }}
                    >
                      🎧 24/7 Support Desk
                    </button>

                    <div className="dropdown-divider"></div>

                    <button 
                      className="dropdown-item logout-item" 
                      onClick={() => {
                        setDropdownOpen(false);
                        onLogout();
                      }}
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
