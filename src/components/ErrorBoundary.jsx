import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: "" };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, errorInfo: error.toString() };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an analytics system if needed
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleTryAgain = () => {
    // Reset state to clear the error fallback UI
    this.setState({ hasError: false, errorInfo: "" });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom 500 Server Error View
      return (
        <div className="error-page-container server-error animate-fade">
          <div className="error-card glassmorphic-modal">
            <div className="error-graphic-wrapper">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="error-icon-500">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            
            <h1 className="error-title">500</h1>
            <h2 className="error-subtitle">Unexpected Server Error</h2>
            <p className="error-desc">
              Our travel systems encountered a critical exception while loading this page. 
              Rest assured, our engineers have been notified.
            </p>
            
            <div className="error-details-box">
              <code>{this.state.errorInfo}</code>
            </div>

            <div className="error-actions">
              <button className="btn-primary" onClick={this.handleTryAgain}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
                </svg>
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
