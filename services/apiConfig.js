// API Configuration - Production API only
export const USE_MOCK_DATA = false;

// Export the production API service
export { default } from './api';

// Export individual functions for convenience
export {
  // Restaurant APIs
  getRestaurantBookingsByDateRange,
  getAvailableTables,
  getAvailableTablesByCriteria,
  getRestaurantBookings,
  getRestaurantBookingById,
  getMenuItems,
  searchMenuItems,
  getMenuItemsByCategory,
  getDietaryMenuItems,
  createRestaurantBooking,
  getFeaturedRestaurants,
  
  // Hotel APIs
  getAvailableRooms,
  checkRoomAvailability,
  getHotelBookingsByDateRange,
  getHotelBookings,
  getHotelBookingById,
  getHotelRooms,
  getHotelRoomById,
  createHotelBooking,
  getFeaturedHotels,
  
  // Property APIs
  getFeaturedProperties,
  getProperties,
  getPropertyById,
  createPropertyListing,
  getPropertyListings,
  getPropertyListingById,
  
  // Additional APIs
  getSearchSuggestions,
  getCategories,
  getFeaturedItems,
  getTestimonials,
  getUserProfile,
  
  // Auth APIs
  login,
  signup,
  logout,
  getStoredToken,
  getStoredUser
} from './api';