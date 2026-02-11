// Base API configuration
const BASE_URL = 'https://api.patilassociates.in/api'; // Update this to your actual backend URL

// Generic API call helper
const apiCall = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add authorization header if token exists
  const token = await getAuthToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API call failed: ${url}`, error);
    throw error;
  }
};

import { getStoredToken } from './auth';

// Helper to get stored auth token
const getAuthToken = async () => {
  return await getStoredToken();
};

// ==================== AUTHENTICATION APIS ====================
// These are already handled in auth.js service

// ==================== RESTAURANT APIS ====================
// Get restaurant bookings by date range (Public)
export const getRestaurantBookingsByDateRange = async (startDate, endDate) => {
  return apiCall(`/restaurant/date-range?startDate=${startDate}&endDate=${endDate}`);
};

// Get available tables (Public)
export const getAvailableTables = async (date, time) => {
  return apiCall(`/restaurant/available-tables?date=${date}&time=${time}`);
};

// Get all bookings for authenticated user
export const getRestaurantBookings = async () => {
  return apiCall('/restaurant/');
};

// Get specific booking by ID
export const getRestaurantBookingById = async (id) => {
  return apiCall(`/restaurant/${id}`);
};

// Create new restaurant booking
export const createRestaurantBooking = async (bookingData) => {
  return apiCall('/restaurant/', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  });
};

// Update existing booking (Admin Only - excluded as per request)
// export const updateRestaurantBooking = async (id, bookingData) => {
//   return apiCall(`/restaurant/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify(bookingData),
//   });
// };

// Delete booking (Admin Only - excluded as per request)
// export const deleteRestaurantBooking = async (id) => {
//   return apiCall(`/restaurant/${id}`, {
//     method: 'DELETE',
//   });
// };

// ==================== TABLE MANAGEMENT APIS ====================
// Get available tables by criteria (Public)
export const getAvailableTablesByCriteria = async (date, time, partySize, location) => {
  let url = `/tables/available?date=${date}&time=${time}&partySize=${partySize}`;
  if (location) {
    url += `&location=${location}`;
  }
  return apiCall(url);
};

// Get all tables (Admin Only - excluded as per request)
// export const getAllTables = async (filters = {}) => {
//   let url = '/tables/';
//   const queryParams = new URLSearchParams(filters).toString();
//   if (queryParams) {
//     url += `?${queryParams}`;
//   }
//   return apiCall(url);
// };

// Create new table (Admin Only - excluded as per request)
// export const createTable = async (tableData) => {
//   return apiCall('/tables/', {
//     method: 'POST',
//     body: JSON.stringify(tableData),
//   });
// };

// Get specific table by ID (Admin Only - excluded as per request)
// export const getTableById = async (id) => {
//   return apiCall(`/tables/${id}`);
// };

// Update table information (Admin Only - excluded as per request)
// export const updateTable = async (id, tableData) => {
//   return apiCall(`/tables/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify(tableData),
//   });
// };

// Delete table (Admin Only - excluded as per request)
// export const deleteTable = async (id) => {
//   return apiCall(`/tables/${id}`, {
//     method: 'DELETE',
//   });
// };

// ==================== MENU APIS ====================
// Get all menu items (Public)
export const getMenuItems = async () => {
  return apiCall('/menu/');
};

// Search menu items (Public)
export const searchMenuItems = async (query) => {
  return apiCall(`/menu/search?q=${query}`);
};

// Get menu items by category (Public)
export const getMenuItemsByCategory = async (category) => {
  return apiCall(`/menu/category/${category}`);
};

// Get dietary menu items (Public)
export const getDietaryMenuItems = async (dietaryType) => {
  return apiCall(`/menu/dietary/${dietaryType}`);
};

// Create menu item (Admin Only - excluded as per request)
// export const createMenuItem = async (menuItemData) => {
//   return apiCall('/menu/', {
//     method: 'POST',
//     body: JSON.stringify(menuItemData),
//   });
// };

// Get specific menu item by ID (Admin Only - excluded as per request)
// export const getMenuItemById = async (id) => {
//   return apiCall(`/menu/${id}`);
// };

// Update menu item information (Admin Only - excluded as per request)
// export const updateMenuItem = async (id, menuItemData) => {
//   return apiCall(`/menu/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify(menuItemData),
//   });
// };

// Delete menu item (Admin Only - excluded as per request)
// export const deleteMenuItem = async (id) => {
//   return apiCall(`/menu/${id}`, {
//     method: 'DELETE',
//   });
// };

// ==================== HOTEL ROOM APIS ====================
// Get available rooms (Public)
export const getAvailableRooms = async (checkIn, checkOut) => {
  return apiCall(`/hotel/rooms/available?checkIn=${checkIn}&checkOut=${checkOut}`);
};

// Get room statistics (Admin - excluded as per request)
// export const getRoomStats = async () => {
//   return apiCall('/hotel/rooms/stats');
// };

// Get all hotel rooms (Public)
export const getHotelRooms = async () => {
  return apiCall('/hotel/rooms/');
};

// Get specific room by ID
export const getHotelRoomById = async (id) => {
  return apiCall(`/hotel/rooms/${id}`);
};

// ==================== HOTEL BOOKING APIS ====================
// Check room availability (Public)
export const checkRoomAvailability = async (checkIn, checkOut) => {
  return apiCall(`/hotel/bookings/check-availability?checkIn=${checkIn}&checkOut=${checkOut}`);
};

// Get bookings by date range (Public)
export const getHotelBookingsByDateRange = async (startDate, endDate) => {
  return apiCall(`/hotel/bookings/date-range?startDate=${startDate}&endDate=${endDate}`);
};

// Get all bookings for authenticated user
export const getHotelBookings = async () => {
  return apiCall('/hotel/bookings/');
};

// Get specific booking by ID
export const getHotelBookingById = async (id) => {
  return apiCall(`/hotel/bookings/${id}`);
};

// Create new hotel booking
export const createHotelBooking = async (bookingData) => {
  return apiCall('/hotel/bookings/', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  });
};

// Get booking statistics (Admin - excluded as per request)
// export const getBookingStats = async () => {
//   return apiCall('/hotel/bookings/stats');
// };

// ==================== PROPERTY APIS ====================
// Get featured properties (Public)
export const getFeaturedProperties = async () => {
  return apiCall('/properties/featured');
};

// Get property statistics (Admin - excluded as per request)
// export const getPropertyStats = async () => {
//   return apiCall('/properties/stats');
// };

// Upload property images (Admin - excluded as per request)
// export const uploadPropertyImages = async (formData) => {
//   return apiCall('/properties/upload/images', {
//     method: 'POST',
//     body: formData,
//     headers: {}, // Let fetch handle multipart form data
//   });
// };

// Get all properties (Public)
export const getProperties = async (filters = {}) => {
  let url = '/properties/';
  const queryParams = new URLSearchParams(filters).toString();
  if (queryParams) {
    url += `?${queryParams}`;
  }
  return apiCall(url);
};

// Get specific property by ID
export const getPropertyById = async (id) => {
  return apiCall(`/properties/${id}`);
};

// Create new property (Admin - excluded as per request)
// export const createProperty = async (propertyData) => {
//   return apiCall('/properties/', {
//     method: 'POST',
//     body: JSON.stringify(propertyData),
//   });
// };

// ==================== PROPERTY LISTING APIS ====================
// Create property listing/inquiry
export const createPropertyListing = async (listingData) => {
  return apiCall('/property-listings/', {
    method: 'POST',
    body: JSON.stringify(listingData),
  });
};

// Get all property listings for authenticated user
export const getPropertyListings = async () => {
  return apiCall('/property-listings/');
};

// Get specific property listing by ID
export const getPropertyListingById = async (id) => {
  return apiCall(`/property-listings/${id}`);
};

// Schedule property viewing (Admin - excluded as per request)
// export const schedulePropertyViewing = async (id, viewingData) => {
//   return apiCall(`/property-listings/${id}/schedule-viewing`, {
//     method: 'POST',
//     body: JSON.stringify(viewingData),
//   });
// };

// Update viewing status (Admin - excluded as per request)
// export const updateViewingStatus = async (id, statusData) => {
//   return apiCall(`/property-listings/${id}/viewing-status`, {
//     method: 'PUT',
//     body: JSON.stringify(statusData),
//   });
// };

// Get listing statistics (Admin - excluded as per request)
// export const getListingStats = async () => {
//   return apiCall('/property-listings/stats');
// };

// Upload listing documents (Admin - excluded as per request)
// export const uploadListingDocuments = async (id, formData) => {
//   return apiCall(`/property-listings/${id}/documents`, {
//     method: 'POST',
//     body: formData,
//     headers: {},
//   });
// };

// Delete listing document (Admin - excluded as per request)
// export const deleteListingDocument = async (id, documentId) => {
//   return apiCall(`/property-listings/${id}/documents/${documentId}`, {
//     method: 'DELETE',
//   });
// };

// Update property listing (Admin - excluded as per request)
// export const updatePropertyListing = async (id, listingData) => {
//   return apiCall(`/property-listings/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify(listingData),
//   });
// };

// Delete property listing (Admin - excluded as per request)
// export const deletePropertyListing = async (id) => {
//   return apiCall(`/property-listings/${id}`, {
//     method: 'DELETE',
//   });
// };

export default {
  // Restaurant APIs
  getRestaurantBookingsByDateRange,
  getAvailableTables,
  getRestaurantBookings,
  getRestaurantBookingById,
  createRestaurantBooking,
  
  // Table APIs
  getAvailableTablesByCriteria,
  
  // Menu APIs
  getMenuItems,
  searchMenuItems,
  getMenuItemsByCategory,
  getDietaryMenuItems,
  
  // Hotel Room APIs
  getAvailableRooms,
  getHotelRooms,
  getHotelRoomById,
  
  // Hotel Booking APIs
  checkRoomAvailability,
  getHotelBookingsByDateRange,
  getHotelBookings,
  getHotelBookingById,
  createHotelBooking,
  
  // Property APIs
  getFeaturedProperties,
  getProperties,
  getPropertyById,
  
  // Property Listing APIs
  createPropertyListing,
  getPropertyListings,
  getPropertyListingById,
};