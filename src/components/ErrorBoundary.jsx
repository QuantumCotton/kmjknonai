import React from 'react';
import PropTypes from 'prop-types';

/**
 * Error Boundary component to catch and display errors gracefully
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // You can also log the error to a service like Sentry, etc.
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-boundary-container">
          <div className="error-boundary-content">
            <h2>Oops! Something went wrong</h2>
            <p>We're sorry, but we encountered an error while processing your request.</p>
            
            {this.props.showDetails && this.state.error && (
              <details className="error-details">
                <summary>Error Details</summary>
                <p>{this.state.error.toString()}</p>
                {this.state.errorInfo && (
                  <pre>
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </details>
            )}
            
            <button 
              onClick={() => window.location.reload()}
              className="retry-button"
            >
              Refresh Page
            </button>
            
            {this.props.fallbackContact && (
              <p className="contact-info">
                If the problem persists, please contact us at: {this.props.fallbackContact}
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  showDetails: PropTypes.bool,
  fallbackContact: PropTypes.string
};

ErrorBoundary.defaultProps = {
  showDetails: process.env.NODE_ENV === 'development',
  fallbackContact: 'support@kmjk.pro'
};

export default ErrorBoundary;

// Helper component for API errors
export const ApiErrorDisplay = ({ error, onRetry }) => (
  <div className="api-error-display">
    <h3>Request Failed</h3>
    <div className="error-message">
      {error.message}
    </div>
    {error.message.includes('HTTP 400') && (
      <p className="error-suggestion">
        This appears to be a problem with the request data. Please check your information and try again.
      </p>
    )}
    {onRetry && (
      <button onClick={onRetry} className="retry-button">
        Try Again
      </button>
    )}
  </div>
);

ApiErrorDisplay.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
  onRetry: PropTypes.func
};
