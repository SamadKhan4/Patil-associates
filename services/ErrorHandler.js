// Comprehensive Error Handling Service
import { Alert, ToastAndroid, Platform } from 'react-native';

class ErrorHandler {
  // Network Error Types
  static NETWORK_ERROR = 'NETWORK_ERROR';
  static TIMEOUT_ERROR = 'TIMEOUT_ERROR';
  static SERVER_ERROR = 'SERVER_ERROR';
  static AUTH_ERROR = 'AUTH_ERROR';
  static VALIDATION_ERROR = 'VALIDATION_ERROR';
  static UNKNOWN_ERROR = 'UNKNOWN_ERROR';

  // Error Categories
  static CATEGORIES = {
    NETWORK: ['NETWORK_ERROR', 'TIMEOUT_ERROR'],
    SERVER: ['SERVER_ERROR'],
    AUTH: ['AUTH_ERROR'],
    VALIDATION: ['VALIDATION_ERROR'],
    UNKNOWN: ['UNKNOWN_ERROR']
  };

  // Parse error and return structured error object
  static parseError(error) {
    const errorString = error?.message || error?.toString() || 'Unknown error';
    
    // Network errors
    if (errorString.includes('Network request failed') || 
        errorString.includes('No internet') ||
        errorString.includes('network')) {
      return {
        type: this.NETWORK_ERROR,
        message: 'No internet connection. Please check your network settings.',
        userFriendly: 'Please check your internet connection and try again.',
        shouldRetry: true
      };
    }
    
    // Timeout errors
    if (errorString.includes('timeout') || 
        errorString.includes('Timeout') ||
        errorString.includes('timed out')) {
      return {
        type: this.TIMEOUT_ERROR,
        message: 'Request timed out. Server is taking too long to respond.',
        userFriendly: 'The server is taking too long to respond. Please try again.',
        shouldRetry: true
      };
    }
    
    // Authentication errors
    if (errorString.includes('Unauthorized') || 
        errorString.includes('401') ||
        errorString.includes('Invalid credentials')) {
      return {
        type: this.AUTH_ERROR,
        message: 'Authentication failed. Please login again.',
        userFriendly: 'Your session has expired. Please login again.',
        shouldRetry: false
      };
    }
    
    // Server errors
    if (errorString.includes('500') || 
        errorString.includes('502') ||
        errorString.includes('503') ||
        errorString.includes('Server error')) {
      return {
        type: this.SERVER_ERROR,
        message: 'Server error occurred. Please try again later.',
        userFriendly: 'Our servers are temporarily unavailable. Please try again in a few minutes.',
        shouldRetry: true
      };
    }
    
    // Validation errors
    if (errorString.includes('Validation') || 
        errorString.includes('Invalid') ||
        errorString.includes('required')) {
      return {
        type: this.VALIDATION_ERROR,
        message: errorString,
        userFriendly: errorString,
        shouldRetry: false
      };
    }
    
    // Default unknown error
    return {
      type: this.UNKNOWN_ERROR,
      message: errorString,
      userFriendly: 'Something went wrong. Please try again.',
      shouldRetry: true
    };
  }

  // Show appropriate error UI based on error type
  static showError(error, options = {}) {
    const parsedError = this.parseError(error);
    const { 
      showAlert = true, 
      showToast = false, 
      customHandler = null 
    } = options;

    // Execute custom handler if provided
    if (customHandler && typeof customHandler === 'function') {
      customHandler(parsedError);
      return parsedError;
    }

    // Show toast for minor errors
    if (showToast && Platform.OS === 'android') {
      ToastAndroid.show(parsedError.userFriendly, ToastAndroid.LONG);
    } else if (showToast && Platform.OS === 'ios') {
      // iOS toast implementation would go here
      Alert.alert('Error', parsedError.userFriendly);
    }
    
    // Show alert for major errors
    if (showAlert) {
      Alert.alert(
        this.getErrorTitle(parsedError.type),
        parsedError.userFriendly,
        [
          {
            text: 'OK',
            style: 'cancel'
          },
          ...(parsedError.shouldRetry ? [
            {
              text: 'Retry',
              onPress: options.onRetry || null
            }
          ] : [])
        ]
      );
    }

    return parsedError;
  }

  // Get appropriate title for error type
  static getErrorTitle(errorType) {
    const titles = {
      [this.NETWORK_ERROR]: 'Network Error',
      [this.TIMEOUT_ERROR]: 'Timeout Error',
      [this.SERVER_ERROR]: 'Server Error',
      [this.AUTH_ERROR]: 'Authentication Error',
      [this.VALIDATION_ERROR]: 'Validation Error',
      [this.UNKNOWN_ERROR]: 'Error'
    };
    return titles[errorType] || 'Error';
  }

  // Handle API errors with automatic retry logic
  static async handleApiError(error, retryFunction = null, retryCount = 0, maxRetries = 2) {
    const parsedError = this.parseError(error);
    
    // Auto-retry for network/server errors
    if (parsedError.shouldRetry && retryFunction && retryCount < maxRetries) {
      try {
        // Exponential backoff
        const delay = Math.pow(2, retryCount) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        return await retryFunction();
      } catch (retryError) {
        return this.handleApiError(retryError, retryFunction, retryCount + 1, maxRetries);
      }
    }
    
    // Show error to user
    this.showError(parsedError);
    throw parsedError;
  }

  // Log error for debugging (without sensitive data)
  static logError(error, context = '') {
    if (__DEV__) {
      console.log(`[ERROR] ${context}:`, {
        message: error?.message,
        stack: error?.stack,
        type: error?.type,
        context
      });
    }
    // In production, send to analytics/error tracking service
    // Example: Sentry.captureException(error, { context });
  }

  // Handle form validation errors
  static handleFormError(errors) {
    if (!errors || Object.keys(errors).length === 0) return null;
    
    const firstError = Object.values(errors)[0];
    const errorMessage = typeof firstError === 'string' ? firstError : firstError?.message || 'Validation error';
    
    this.showError({
      type: this.VALIDATION_ERROR,
      message: errorMessage,
      userFriendly: errorMessage
    }, { showAlert: true });
    
    return errorMessage;
  }

  // Handle authentication errors
  static handleAuthError(error, navigation) {
    const parsedError = this.parseError(error);
    
    if (parsedError.type === this.AUTH_ERROR) {
      // Clear auth state and redirect to login
      // This would integrate with your auth context
      Alert.alert(
        'Session Expired',
        'Your session has expired. Please login again.',
        [
          {
            text: 'Login',
            onPress: () => {
              // Clear auth state
              // navigation.reset({
              //   index: 0,
              //   routes: [{ name: 'Auth' }]
              // });
            }
          }
        ]
      );
    } else {
      this.showError(parsedError);
    }
    
    return parsedError;
  }
}

export default ErrorHandler;