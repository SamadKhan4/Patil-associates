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

// Restaurant API calls
export const getRestaurantBookings = async () => {
  return apiCall('/restaurant/');
};

export const getRestaurantBookingById = async (id) => {
  return apiCall(`/restaurant/${id}`);
};

export const createRestaurantBooking = async (bookingData) => {
  return apiCall('/restaurant/', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  });
};

export const getAvailableTables = async (date, time) => {
  return apiCall(`/restaurant/available-tables?date=${date}&time=${time}`);
};

// Hotel API calls
export const getHotelRooms = async () => {
  return apiCall('/hotel/rooms/');
};

export const getHotelRoomById = async (id) => {
  return apiCall(`/hotel/rooms/${id}`);
};

export const getAvailableRooms = async (checkIn, checkOut) => {
  return apiCall(`/hotel/rooms/available?checkIn=${checkIn}&checkOut=${checkOut}`);
};

export const createHotelBooking = async (bookingData) => {
  return apiCall('/hotel/bookings/', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  });
};

export const getHotelBookings = async () => {
  return apiCall('/hotel/bookings/');
};

// Property API calls
export const getProperties = async () => {
  return apiCall('/properties/');
};

export const getPropertyById = async (id) => {
  return apiCall(`/properties/${id}`);
};

export const getFeaturedProperties = async () => {
  return apiCall('/properties/featured');
};

export const createPropertyListing = async (listingData) => {
  return apiCall('/property-listings/', {
    method: 'POST',
    body: JSON.stringify(listingData),
  });
};

// Menu API calls (for restaurants)
export const getMenuItems = async () => {
  return apiCall('/menu/');
};

export const searchMenuItems = async (query) => {
  return apiCall(`/menu/search?q=${query}`);
};

export default {
  getRestaurantBookings,
  getRestaurantBookingById,
  createRestaurantBooking,
  getAvailableTables,
  getHotelRooms,
  getHotelRoomById,
  getAvailableRooms,
  createHotelBooking,
  getHotelBookings,
  getProperties,
  getPropertyById,
  getFeaturedProperties,
  createPropertyListing,
  getMenuItems,
  searchMenuItems,
};