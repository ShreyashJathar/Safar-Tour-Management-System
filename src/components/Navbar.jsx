import React, { useState } from "react";

export default function Navbar({ 
  currentUser, 
  onOpenAuth, 
  onLogout, 
  currentView, 
  setCurrentView, 
  wishlistCount,
  darkMode,
  toggleDarkMode 
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="main-header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo-section" onClick={() => setCurrentView("explore")}>
          <svg className="logo-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
          </svg>
          <span className="logo-text">Sa<span>far</span></span>
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          {currentUser && currentUser.role !== "Admin" && (
            <button 
              className={`nav-link ${currentView === "dashboard" ? "active" : ""}`}
              onClick={() => setCurrentView("dashboard")}
            >
              My Bookings
            </button>
          )}

          {currentUser && currentUser.role === "Admin" && (
            <button 
              className={`nav-link ${currentView === "admin" ? "active" : ""}`}
              onClick={() => setCurrentView("admin")}
            >
              Admin Dashboard
            </button>
          )}
        </nav>

        {/* Action Buttons */}
        <div className="header-actions">
          {/* Dark Mode Toggle */}
          <button 
            className="action-btn theme-toggle" 
            onClick={toggleDarkMode}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {darkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {/* Wishlist Quick-access */}
          {currentView !== "login" && (!currentUser || currentUser.role !== "Admin") && (
            <button 
              className="action-btn wishlist-btn" 
              onClick={() => setCurrentView(currentUser ? "dashboard" : "explore")}
              title="View Wishlist"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
            </button>
          )}

          {/* User Section */}
          {currentUser ? (
            <div className="user-profile-menu">
              <button 
                className="profile-trigger" 
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="avatar">
                  {currentUser.fullName.charAt(0).toUpperCase()}
                </div>
                <span className="user-name-text">{currentUser.fullName.split(" ")[0]}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={dropdownOpen ? "rotated" : ""}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              {dropdownOpen && (
                <>
                  <div className="dropdown-overlay" onClick={() => setDropdownOpen(false)}></div>
                  <div className="profile-dropdown">
                    <div className="dropdown-header">
                      <span className="dropdown-name">{currentUser.fullName}</span>
                      <span className="dropdown-role">{currentUser.role} Account</span>
                    </div>
                    
                    {currentUser.role !== "Admin" ? (
                      <button 
                        className="dropdown-item" 
                        onClick={() => { setCurrentView("dashboard"); setDropdownOpen(false); }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        My Dashboard
                      </button>
                    ) : (
                      <button 
                        className="dropdown-item" 
                        onClick={() => { setCurrentView("admin"); setDropdownOpen(false); }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="9" y1="3" x2="9" y2="21"></line>
                          <line x1="9" y1="9" x2="21" y2="9"></line>
                        </svg>
                        Admin Settings
                      </button>
                    )}

                    <hr className="dropdown-divider" />
                    
                    <button 
                      className="dropdown-item logout" 
                      onClick={() => { onLogout(); setDropdownOpen(false); }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button className="btn-primary login-btn" onClick={onOpenAuth}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
