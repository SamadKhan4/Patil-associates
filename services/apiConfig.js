// API Configuration - Switch between real API and mock data
export const USE_MOCK_DATA = true; // Set to false to use real API

// Export the appropriate API service based on configuration
const apiService = USE_MOCK_DATA 
  ? require('./mockApi').default 
  : require('./api').default;

export default apiService;

// Export individual functions for convenience
export const {
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
  
  // Hotel APIs
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
  
  // Additional APIs
  getSearchSuggestions,
  getCategories,
  getFeaturedItems,
  getTestimonials,
  getUserProfile
} = apiService;