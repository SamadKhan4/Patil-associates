// Mock API service using static demo data for development/testing
import {
  demoRestaurants,
  demoHotels,
  demoProperties,
  demoBookings,
  demoUsers,
  demoSearchSuggestions,
  demoCategories,
  demoFeaturedItems,
  demoTestimonials
} from './demoData';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ==================== RESTAURANT APIS ====================
export const getRestaurantBookingsByDateRange = async (startDate, endDate) => {
  await delay(500);
  const start = new Date(startDate);
  const end = new Date(endDate);
  const filteredBookings = demoBookings
    .filter(b => b.serviceType === 'restaurant')
    .filter(b => {
      const bookingDate = new Date(b.date);
      return bookingDate >= start && bookingDate <= end;
    });
  
  return {
    success: true,
    message: "Bookings retrieved successfully",
    data: filteredBookings
  };
};

export const getAvailableTables = async (date, time) => {
  await delay(300);
  return {
    success: true,
    message: "Available tables retrieved successfully",
    data: {
      date,
      time,
      availableTables: ["1", "3", "5", "7", "9"],
      bookedTables: ["2", "4", "6", "8"],
      totalAvailable: 5
    }
  };
};

export const getRestaurantBookings = async () => {
  await delay(400);
  return {
    success: true,
    message: "Bookings retrieved successfully",
    data: demoBookings.filter(b => b.serviceType === 'restaurant')
  };
};

export const getRestaurantBookingById = async (id) => {
  await delay(200);
  const booking = demoBookings.find(b => b.id === parseInt(id) && b.serviceType === 'restaurant');
  return {
    success: true,
    message: "Booking retrieved successfully",
    data: booking || null
  };
};

export const createRestaurantBooking = async (bookingData) => {
  await delay(600);
  const newBooking = {
    id: Date.now(),
    userId: 1, // Assuming logged in user
    serviceType: "restaurant",
    serviceId: bookingData.restaurantId || 1,
    serviceName: demoRestaurants.find(r => r.id === (bookingData.restaurantId || 1))?.name || "Restaurant",
    date: bookingData.bookingDate,
    time: bookingData.bookingTime,
    guests: bookingData.partySize,
    status: "pending",
    totalAmount: bookingData.partySize * 500, // Mock calculation
    bookingDetails: {
      tableType: bookingData.tableType || "Standard",
      specialRequests: bookingData.specialRequests || ""
    }
  };
  
  return {
    success: true,
    message: "Booking created successfully",
    data: newBooking
  };
};

// ==================== TABLE APIS ====================
export const getAvailableTablesByCriteria = async (date, time, partySize, location) => {
  await delay(400);
  const tables = [
    { id: 1, tableNumber: "1", capacity: 4, location: "indoor", shape: "round", isActive: true },
    { id: 2, tableNumber: "3", capacity: 6, location: "indoor", shape: "rectangle", isActive: true },
    { id: 3, tableNumber: "5", capacity: 2, location: "outdoor", shape: "round", isActive: true },
    { id: 4, tableNumber: "7", capacity: 8, location: "patio", shape: "oval", isActive: true }
  ];
  
  const filteredTables = tables.filter(table => 
    table.capacity >= partySize && 
    (!location || table.location === location)
  );
  
  return {
    success: true,
    message: "Available tables retrieved successfully",
    data: filteredTables
  };
};

// ==================== MENU APIS ====================
export const getMenuItems = async () => {
  await delay(300);
  const allMenuItems = demoRestaurants.flatMap(restaurant => 
    restaurant.menu.map(item => ({
      ...item,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name
    }))
  );
  
  return {
    success: true,
    message: "Menu items retrieved successfully",
    data: allMenuItems
  };
};

export const searchMenuItems = async (query) => {
  await delay(250);
  const allMenuItems = demoRestaurants.flatMap(restaurant => 
    restaurant.menu.map(item => ({
      ...item,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name
    }))
  );
  
  const filteredItems = allMenuItems.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  
  return {
    success: true,
    message: "Search completed successfully",
    data: filteredItems,
    query
  };
};

export const getMenuItemsByCategory = async (category) => {
  await delay(300);
  const allMenuItems = demoRestaurants.flatMap(restaurant => 
    restaurant.menu.map(item => ({
      ...item,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name
    }))
  );
  
  const filteredItems = allMenuItems.filter(item => 
    item.category.toLowerCase() === category.toLowerCase()
  );
  
  return {
    success: true,
    message: "Menu items retrieved successfully",
    data: filteredItems
  };
};

export const getDietaryMenuItems = async (dietaryType) => {
  await delay(300);
  // Mock dietary filtering
  const dietaryMap = {
    vegetarian: ["Paneer Tikka", "Biryani", "Naan Bread", "Margherita Pizza", "Caesar Salad"],
    vegan: ["Caesar Salad", "Garlic Bread"],
    gluten_free: ["Grilled Lobster", "Fish & Chips"]
  };
  
  const allowedItems = dietaryMap[dietaryType] || [];
  const allMenuItems = demoRestaurants.flatMap(restaurant => 
    restaurant.menu.map(item => ({
      ...item,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name
    }))
  );
  
  const filteredItems = allMenuItems.filter(item => 
    allowedItems.includes(item.name)
  );
  
  return {
    success: true,
    message: "Dietary menu items retrieved successfully",
    data: filteredItems
  };
};

// ==================== HOTEL APIS ====================
export const getAvailableRooms = async (checkIn, checkOut) => {
  await delay(500);
  const availableRooms = demoHotels.flatMap(hotel => 
    hotel.rooms.map(room => ({
      ...room,
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelImage: hotel.image
    }))
  );
  
  return {
    success: true,
    message: "Available rooms retrieved successfully",
    data: availableRooms
  };
};

export const getHotelRooms = async () => {
  await delay(400);
  return {
    success: true,
    message: "Hotel rooms retrieved successfully",
    data: demoHotels
  };
};

export const getHotelRoomById = async (id) => {
  await delay(200);
  const hotel = demoHotels.find(h => h.id === parseInt(id));
  return {
    success: true,
    message: "Hotel room retrieved successfully",
    data: hotel || null
  };
};

// ==================== HOTEL BOOKING APIS ====================
export const checkRoomAvailability = async (checkIn, checkOut) => {
  await delay(400);
  return {
    success: true,
    message: "Room availability checked successfully",
    data: {
      checkIn,
      checkOut,
      availableRooms: 12,
      totalRooms: 20
    }
  };
};

export const getHotelBookingsByDateRange = async (startDate, endDate) => {
  await delay(500);
  const start = new Date(startDate);
  const end = new Date(endDate);
  const filteredBookings = demoBookings
    .filter(b => b.serviceType === 'hotel')
    .filter(b => {
      const checkInDate = new Date(b.checkIn);
      return checkInDate >= start && checkInDate <= end;
    });
  
  return {
    success: true,
    message: "Bookings retrieved successfully",
    data: filteredBookings
  };
};

export const getHotelBookings = async () => {
  await delay(400);
  return {
    success: true,
    message: "Bookings retrieved successfully",
    data: demoBookings.filter(b => b.serviceType === 'hotel')
  };
};

export const getHotelBookingById = async (id) => {
  await delay(200);
  const booking = demoBookings.find(b => b.id === parseInt(id) && b.serviceType === 'hotel');
  return {
    success: true,
    message: "Booking retrieved successfully",
    data: booking || null
  };
};

export const createHotelBooking = async (bookingData) => {
  await delay(700);
  const hotel = demoHotels.find(h => h.id === bookingData.hotelId);
  const room = hotel?.rooms.find(r => r.id === bookingData.roomId);
  
  const checkIn = new Date(bookingData.checkInDate);
  const checkOut = new Date(bookingData.checkOutDate);
  const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  
  const newBooking = {
    id: Date.now(),
    userId: 1, // Assuming logged in user
    serviceType: "hotel",
    serviceId: bookingData.hotelId,
    serviceName: hotel?.name || "Hotel",
    checkIn: bookingData.checkInDate,
    checkOut: bookingData.checkOutDate,
    guests: bookingData.numberOfGuests,
    rooms: 1,
    status: "pending",
    totalAmount: room ? room.price * nights : 5000 * nights,
    bookingDetails: {
      roomType: room?.type || "Standard Room",
      specialRequests: bookingData.specialRequests || "",
      guestName: bookingData.guestName,
      guestEmail: bookingData.guestEmail,
      guestPhone: bookingData.guestPhone
    }
  };
  
  return {
    success: true,
    message: "Hotel booking created successfully",
    data: newBooking
  };
};

// ==================== PROPERTY APIS ====================
export const getFeaturedProperties = async () => {
  await delay(400);
  const featured = demoProperties.filter(p => p.price > 10000000);
  return {
    success: true,
    message: "Featured properties retrieved successfully",
    data: featured
  };
};

export const getProperties = async (filters = {}) => {
  await delay(500);
  let filteredProperties = [...demoProperties];
  
  if (filters.propertyType) {
    filteredProperties = filteredProperties.filter(p => p.type === filters.propertyType);
  }
  
  if (filters.listingType) {
    const statusMap = {
      sale: "For Sale",
      rent: "For Rent"
    };
    filteredProperties = filteredProperties.filter(p => p.status === statusMap[filters.listingType]);
  }
  
  if (filters.city) {
    filteredProperties = filteredProperties.filter(p => 
      p.location.toLowerCase().includes(filters.city.toLowerCase())
    );
  }
  
  if (filters.minPrice) {
    filteredProperties = filteredProperties.filter(p => p.price >= parseInt(filters.minPrice));
  }
  
  if (filters.maxPrice) {
    filteredProperties = filteredProperties.filter(p => p.price <= parseInt(filters.maxPrice));
  }
  
  return {
    success: true,
    message: "Properties retrieved successfully",
    data: filteredProperties
  };
};

export const getPropertyById = async (id) => {
  await delay(200);
  const property = demoProperties.find(p => p.id === parseInt(id));
  return {
    success: true,
    message: "Property retrieved successfully",
    data: property || null
  };
};

// ==================== PROPERTY LISTING APIS ====================
export const createPropertyListing = async (listingData) => {
  await delay(600);
  const property = demoProperties.find(p => p.id === listingData.propertyId);
  
  const newListing = {
    id: Date.now(),
    propertyId: listingData.propertyId,
    customerId: 1, // Assuming logged in user
    listingType: listingData.listingType || "inquiry",
    status: "pending",
    customerInfo: listingData.customerInfo,
    offerPrice: listingData.offerPrice,
    proposedRent: listingData.proposedRent,
    leaseDuration: listingData.leaseDuration,
    moveInDate: listingData.moveInDate,
    viewingSchedule: listingData.viewingSchedule,
    paymentInfo: listingData.paymentInfo,
    notes: listingData.notes,
    createdAt: new Date().toISOString()
  };
  
  return {
    success: true,
    message: "Property listing created successfully",
    data: newListing
  };
};

export const getPropertyListings = async () => {
  await delay(400);
  return {
    success: true,
    message: "Property listings retrieved successfully",
    data: demoBookings.filter(b => b.serviceType === 'property')
  };
};

export const getPropertyListingById = async (id) => {
  await delay(200);
  const listing = demoBookings.find(b => b.id === parseInt(id) && b.serviceType === 'property');
  return {
    success: true,
    message: "Property listing retrieved successfully",
    data: listing || null
  };
};

// ==================== ADDITIONAL APIS ====================
export const getSearchSuggestions = async () => {
  await delay(200);
  return {
    success: true,
    message: "Search suggestions retrieved successfully",
    data: demoSearchSuggestions
  };
};

export const getCategories = async () => {
  await delay(150);
  return {
    success: true,
    message: "Categories retrieved successfully",
    data: demoCategories
  };
};

export const getFeaturedItems = async () => {
  await delay(300);
  return {
    success: true,
    message: "Featured items retrieved successfully",
    data: demoFeaturedItems
  };
};

export const getTestimonials = async () => {
  await delay(250);
  return {
    success: true,
    message: "Testimonials retrieved successfully",
    data: demoTestimonials
  };
};

export const getUserProfile = async (userId) => {
  await delay(200);
  const user = demoUsers.find(u => u.id === parseInt(userId));
  return {
    success: true,
    message: "User profile retrieved successfully",
    data: user || null
  };
};

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
};