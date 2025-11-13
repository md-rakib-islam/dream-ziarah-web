"use client";

import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to monitoring service
    console.error("Error boundary caught an error:", error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // Send error to monitoring service (e.g., Sentry)
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "exception", {
        description: error.toString(),
        fatal: false,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        // Handle both function and React element fallbacks
        if (typeof this.props.fallback === "function") {
          return this.props.fallback(this.state.error, this.state.errorInfo);
        } else {
          // React element fallback
          return this.props.fallback;
        }
      }

      return (
        <div className="error-boundary-container">
          <div className="error-boundary-content">
            <h2 className="error-title">Something went wrong</h2>
            <p className="error-message">
              We're sorry, but something unexpected happened. Please try
              refreshing the page.
            </p>
            <div className="error-actions">
              <button
                onClick={() => window.location.reload()}
                className="error-retry-button"
              >
                Refresh Page
              </button>
              <button
                onClick={() => window.history.back()}
                className="error-back-button"
              >
                Go Back
              </button>
            </div>

            {/* Show error details in development */}
            {process.env.NODE_ENV === "development" && this.state.errorInfo && (
              <details className="error-details">
                <summary>Error Details (Development Only)</summary>
                <pre>{this.state.error && this.state.error.toString()}</pre>
                <pre>{this.state.errorInfo.componentStack}</pre>
              </details>
            )}
          </div>

          <style jsx>{`
            .error-boundary-container {
              min-height: 240px;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
              background: #f8f9fa;
            }

            .error-boundary-content {
              text-align: center;
              max-width: 500px;
              padding: 40px 20px;
              background: white;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .error-title {
              font-size: 24px;
              font-weight: 600;
              color: #333;
              margin-bottom: 16px;
            }

            .error-message {
              font-size: 16px;
              color: #666;
              margin-bottom: 24px;
              line-height: 1.5;
            }

            .error-actions {
              display: flex;
              gap: 12px;
              justify-content: center;
            }

            .error-retry-button,
            .error-back-button {
              padding: 10px 20px;
              border-radius: 6px;
              border: none;
              font-weight: 500;
              cursor: pointer;
              transition: all 0.2s ease;
            }

            .error-retry-button {
              background: #007bff;
              color: white;
            }

            .error-retry-button:hover {
              background: #0056b3;
            }

            .error-back-button {
              background: #6c757d;
              color: white;
            }

            .error-back-button:hover {
              background: #545b62;
            }

            .error-details {
              margin-top: 20px;
              text-align: left;
              background: #f1f3f4;
              padding: 12px;
              border-radius: 4px;
              border: 1px solid #dee2e6;
            }

            .error-details summary {
              cursor: pointer;
              font-weight: 500;
              color: #495057;
            }

            .error-details pre {
              white-space: pre-wrap;
              word-wrap: break-word;
              font-size: 12px;
              color: #dc3545;
              margin: 8px 0 0 0;
            }

            @media (max-width: 480px) {
              .error-boundary-container {
                padding: 10px;
              }

              .error-boundary-content {
                padding: 30px 15px;
              }

              .error-actions {
                flex-direction: column;
              }
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
