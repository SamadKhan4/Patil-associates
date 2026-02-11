// Form Validation Service
class Validator {
  // Email validation
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    if (email.length > 254) return 'Email is too long';
    return null;
  }

  // Password validation
  static validatePassword(password) {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (password.length > 128) return 'Password is too long';
    // Check for common weak passwords
    const weakPasswords = ['password', '123456', 'qwerty', 'admin'];
    if (weakPasswords.includes(password.toLowerCase())) {
      return 'Please choose a stronger password';
    }
    return null;
  }

  // Name validation
  static validateName(name, fieldName = 'Name') {
    if (!name) return `${fieldName} is required`;
    if (name.length < 2) return `${fieldName} must be at least 2 characters`;
    if (name.length > 50) return `${fieldName} is too long`;
    // Check for invalid characters
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    if (!nameRegex.test(name)) return `${fieldName} contains invalid characters`;
    return null;
  }

  // Phone validation (Indian format)
  static validatePhone(phone) {
    if (!phone) return 'Phone number is required';
    // Remove spaces, dashes, parentheses
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    // Indian phone number validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) return 'Please enter a valid 10-digit Indian phone number';
    return null;
  }

  // Date validation
  static validateDate(dateString, fieldName = 'Date') {
    if (!dateString) return `${fieldName} is required`;
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return `Please enter a valid ${fieldName}`;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return `${fieldName} cannot be in the past`;
    
    // Check if date is too far in future (1 year)
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    if (date > maxDate) return `${fieldName} cannot be more than 1 year in the future`;
    
    return null;
  }

  // Time validation
  static validateTime(timeString, fieldName = 'Time') {
    if (!timeString) return `${fieldName} is required`;
    
    // HH:MM format validation
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(timeString)) return `Please enter a valid ${fieldName} (HH:MM format)`;
    
    return null;
  }

  // Number validation
  static validateNumber(value, fieldName = 'Number', options = {}) {
    const { min, max, required = true } = options;
    
    if (!value && value !== 0) {
      return required ? `${fieldName} is required` : null;
    }
    
    const num = Number(value);
    if (isNaN(num)) return `${fieldName} must be a valid number`;
    
    if (min !== undefined && num < min) {
      return `${fieldName} must be at least ${min}`;
    }
    
    if (max !== undefined && num > max) {
      return `${fieldName} must be at most ${max}`;
    }
    
    return null;
  }

  // Party size validation (for restaurants)
  static validatePartySize(size) {
    const error = this.validateNumber(size, 'Party size', { 
      min: 1, 
      max: 20, 
      required: true 
    });
    if (error) return error;
    
    const num = Number(size);
    if (!Number.isInteger(num)) return 'Party size must be a whole number';
    
    return null;
  }

  // Guest count validation (for hotels)
  static validateGuestCount(count) {
    const error = this.validateNumber(count, 'Guest count', { 
      min: 1, 
      max: 10, 
      required: true 
    });
    if (error) return error;
    
    const num = Number(count);
    if (!Number.isInteger(num)) return 'Guest count must be a whole number';
    
    return null;
  }

  // Check-in/Check-out validation
  static validateCheckInOutDates(checkIn, checkOut) {
    const checkInError = this.validateDate(checkIn, 'Check-in date');
    if (checkInError) return { checkIn: checkInError };
    
    const checkOutError = this.validateDate(checkOut, 'Check-out date');
    if (checkOutError) return { checkOut: checkOutError };
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    if (checkOutDate <= checkInDate) {
      return { checkOut: 'Check-out date must be after check-in date' };
    }
    
    // Maximum stay validation (30 days)
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 30) {
      return { checkOut: 'Maximum stay is 30 days' };
    }
    
    return null;
  }

  // Credit card validation
  static validateCreditCard(cardNumber) {
    if (!cardNumber) return 'Card number is required';
    
    // Remove spaces and dashes
    const cleanNumber = cardNumber.replace(/[\s\-]/g, '');
    
    // Basic length validation
    if (cleanNumber.length < 13 || cleanNumber.length > 19) {
      return 'Please enter a valid card number';
    }
    
    // Luhn algorithm validation
    if (!this.luhnCheck(cleanNumber)) {
      return 'Please enter a valid card number';
    }
    
    return null;
  }

  // Luhn algorithm for credit card validation
  static luhnCheck(cardNumber) {
    let sum = 0;
    let isEven = false;
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  }

  // Expiry date validation
  static validateExpiryDate(expiry) {
    if (!expiry) return 'Expiry date is required';
    
    // MM/YY format
    const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    const match = expiry.match(expiryRegex);
    
    if (!match) return 'Please enter expiry date in MM/YY format';
    
    const month = parseInt(match[1], 10);
    const year = parseInt(`20${match[2]}`, 10);
    const expiryDate = new Date(year, month - 1, 1);
    const currentDate = new Date();
    currentDate.setDate(1); // Set to first of current month
    
    if (expiryDate < currentDate) {
      return 'Card has expired';
    }
    
    return null;
  }

  // CVV validation
  static validateCVV(cvv) {
    if (!cvv) return 'CVV is required';
    if (!/^\d{3,4}$/.test(cvv)) return 'Please enter a valid CVV';
    return null;
  }

  // Validate entire form
  static validateForm(formData, validationRules) {
    const errors = {};
    
    Object.keys(validationRules).forEach(field => {
      const validator = validationRules[field];
      const value = formData[field];
      const error = validator(value, field);
      
      if (error) {
        errors[field] = error;
      }
    });
    
    return Object.keys(errors).length > 0 ? errors : null;
  }

  // Common validation rule sets
  static RULES = {
    LOGIN: {
      email: Validator.validateEmail,
      password: Validator.validatePassword
    },
    
    SIGNUP: {
      fullName: (name) => Validator.validateName(name, 'Full Name'),
      email: Validator.validateEmail,
      password: Validator.validatePassword,
      phoneNo: Validator.validatePhone
    },
    
    RESTAURANT_BOOKING: {
      bookingDate: Validator.validateDate,
      bookingTime: Validator.validateTime,
      partySize: Validator.validatePartySize
    },
    
    HOTEL_BOOKING: {
      checkInDate: Validator.validateDate,
      checkOutDate: Validator.validateDate,
      numberOfGuests: Validator.validateGuestCount
    },
    
    PROPERTY_INQUIRY: {
      customerName: (name) => Validator.validateName(name, 'Name'),
      customerEmail: Validator.validateEmail,
      customerPhone: Validator.validatePhone
    }
  };
}

export default Validator;