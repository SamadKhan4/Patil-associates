// Static demo data for the application
export const demoRestaurants = [
  {
    id: 1,
    name: "The Grand Palace",
    cuisine: "Indian, Chinese, Continental",
    rating: 4.5,
    reviews: 1247,
    priceRange: "$$$",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    address: "123 MG Road, Bangalore",
    phone: "+91 80 1234 5678",
    description: "Experience authentic Indian cuisine in a royal setting with traditional decor and exceptional service.",
    openingHours: "11:00 AM - 11:00 PM",
    features: ["AC", "Wifi", "Parking", "Card Payment"],
    menu: [
      { id: 1, name: "Butter Chicken", price: 350, category: "Main Course" },
      { id: 2, name: "Paneer Tikka", price: 280, category: "Appetizer" },
      { id: 3, name: "Biryani", price: 320, category: "Main Course" },
      { id: 4, name: "Naan Bread", price: 45, category: "Bread" }
    ]
  },
  {
    id: 2,
    name: "Ocean Breeze Seafood",
    cuisine: "Seafood, Mediterranean",
    rating: 4.7,
    reviews: 892,
    priceRange: "$$$$",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800",
    address: "456 Beach Road, Goa",
    phone: "+91 832 234 5678",
    description: "Fresh seafood with ocean views. Specializing in coastal Mediterranean cuisine.",
    openingHours: "12:00 PM - 10:00 PM",
    features: ["Sea View", "Wifi", "Parking", "Card Payment", "Valet"],
    menu: [
      { id: 1, name: "Grilled Lobster", price: 1200, category: "Seafood" },
      { id: 2, name: "Fish & Chips", price: 450, category: "Appetizer" },
      { id: 3, name: "Seafood Platter", price: 1800, category: "Main Course" },
      { id: 4, name: "Garlic Bread", price: 120, category: "Bread" }
    ]
  },
  {
    id: 3,
    name: "Urban Bistro",
    cuisine: "Italian, Fusion",
    rating: 4.3,
    reviews: 654,
    priceRange: "$$",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    address: "789 IT Park, Hyderabad",
    phone: "+91 40 3456 7890",
    description: "Modern Italian cuisine with a fusion twist. Perfect for business lunches and casual dinners.",
    openingHours: "10:00 AM - 11:00 PM",
    features: ["Wifi", "Parking", "Card Payment", "Outdoor Seating"],
    menu: [
      { id: 1, name: "Margherita Pizza", price: 380, category: "Pizza" },
      { id: 2, name: "Pasta Carbonara", price: 420, category: "Pasta" },
      { id: 3, name: "Tiramisu", price: 250, category: "Dessert" },
      { id: 4, name: "Caesar Salad", price: 280, category: "Salad" }
    ]
  }
];

export const demoHotels = [
  {
    id: 1,
    name: "Luxury Grand Hotel",
    type: "5 Star",
    rating: 4.8,
    reviews: 2156,
    pricePerNight: 8500,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    address: "78 MG Road, Mumbai",
    phone: "+91 22 4567 8901",
    description: "Experience luxury in the heart of Mumbai with stunning city views and world-class amenities.",
    amenities: ["Swimming Pool", "Spa", "Gym", "Restaurant", "Free Wifi", "24/7 Room Service"],
    rooms: [
      { id: 1, type: "Deluxe Room", price: 8500, maxGuests: 2, available: 5 },
      { id: 2, type: "Executive Suite", price: 15000, maxGuests: 4, available: 3 },
      { id: 3, type: "Presidential Suite", price: 35000, maxGuests: 6, available: 1 }
    ]
  },
  {
    id: 2,
    name: "Himalayan Retreat Resort",
    type: "Resort",
    rating: 4.6,
    reviews: 987,
    pricePerNight: 12000,
    image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800",
    address: "Kullu Manali Highway, Himachal Pradesh",
    phone: "+91 1902 234 567",
    description: "Mountain resort offering breathtaking views of snow-capped peaks and serene valleys.",
    amenities: ["Mountain View", "Skiing", "Spa", "Restaurant", "Free Wifi", "Adventure Activities"],
    rooms: [
      { id: 1, type: "Mountain View Room", price: 12000, maxGuests: 2, available: 8 },
      { id: 2, type: "Luxury Cabin", price: 18000, maxGuests: 4, available: 4 },
      { id: 3, type: "Presidential Villa", price: 45000, maxGuests: 8, available: 2 }
    ]
  },
  {
    id: 3,
    name: "Beachside Paradise",
    type: "Boutique Hotel",
    rating: 4.4,
    reviews: 756,
    pricePerNight: 6500,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
    address: "Calangute Beach, Goa",
    phone: "+91 832 345 6789",
    description: "Charming boutique hotel just steps away from the pristine beaches of Goa.",
    amenities: ["Beach Access", "Pool", "Restaurant", "Free Wifi", "Water Sports", "Spa"],
    rooms: [
      { id: 1, type: "Standard Room", price: 6500, maxGuests: 2, available: 12 },
      { id: 2, type: "Deluxe Beach View", price: 9500, maxGuests: 3, available: 6 },
      { id: 3, type: "Honeymoon Suite", price: 15000, maxGuests: 2, available: 3 }
    ]
  }
];

export const demoProperties = [
  {
    id: 1,
    title: "Luxury Villa in South Bangalore",
    type: "Villa",
    price: 25000000,
    area: "4500 sq.ft",
    bedrooms: 5,
    bathrooms: 4,
    location: "Electronic City, Bangalore",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    description: "Spacious luxury villa with modern amenities, private garden, and premium location in Electronic City.",
    features: ["Swimming Pool", "Garden", "Parking", "Security", "Modern Kitchen", "AC"],
    status: "For Sale"
  },
  {
    id: 2,
    title: "2BHK Apartment in Central Mumbai",
    type: "Apartment",
    price: 15000000,
    area: "1200 sq.ft",
    bedrooms: 2,
    bathrooms: 2,
    location: "Andheri West, Mumbai",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
    description: "Modern 2BHK apartment in prime location with excellent connectivity and amenities.",
    features: ["Gym", "Swimming Pool", "Security", "Parking", "Club House", "AC"],
    status: "For Sale"
  },
  {
    id: 3,
    title: "Commercial Space in IT Hub",
    type: "Commercial",
    price: 8000000,
    area: "2500 sq.ft",
    bedrooms: 0,
    bathrooms: 3,
    location: "HITEC City, Hyderabad",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    description: "Prime commercial space in IT hub with excellent visibility and connectivity.",
    features: ["Parking", "Security", "Conference Room", "Reception Area", "High-Speed Internet"],
    status: "For Rent"
  }
];

export const demoBookings = [
  {
    id: 1,
    userId: 1,
    serviceType: "restaurant",
    serviceId: 1,
    serviceName: "The Grand Palace",
    date: "2024-02-15",
    time: "19:30",
    guests: 4,
    status: "confirmed",
    totalAmount: 1800,
    bookingDetails: {
      tableType: "AC Seating",
      specialRequests: "Birthday celebration"
    }
  },
  {
    id: 2,
    userId: 1,
    serviceType: "hotel",
    serviceId: 2,
    serviceName: "Himalayan Retreat Resort",
    checkIn: "2024-03-10",
    checkOut: "2024-03-15",
    guests: 2,
    rooms: 1,
    status: "confirmed",
    totalAmount: 60000,
    bookingDetails: {
      roomType: "Mountain View Room",
      mealPlan: "Breakfast Included"
    }
  },
  {
    id: 3,
    userId: 2,
    serviceType: "property",
    serviceId: 1,
    serviceName: "Luxury Villa in South Bangalore",
    visitDate: "2024-02-20",
    visitTime: "15:00",
    status: "scheduled",
    totalAmount: 5000,
    bookingDetails: {
      purpose: "Property Viewing",
      agent: "Mr. Rajesh Kumar"
    }
  }
];

export const demoUsers = [
  {
    id: 1,
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
    membership: "Gold",
    preferences: {
      cuisine: ["Indian", "Italian"],
      priceRange: "$$",
      location: "Bangalore"
    }
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "jane@example.com",
    phone: "+1987654321",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200",
    membership: "Silver",
    preferences: {
      cuisine: ["Seafood", "Mediterranean"],
      priceRange: "$$$",
      location: "Goa"
    }
  }
];

export const demoSearchSuggestions = [
  "Italian restaurants near me",
  "5-star hotels in Mumbai",
  "Luxury villas for sale",
  "Beach resorts in Goa",
  "Business hotels in Hyderabad",
  "Fine dining restaurants",
  "Affordable apartments",
  "Commercial spaces for rent"
];

export const demoCategories = [
  { id: 1, name: "Restaurants", icon: "restaurant", color: "#FF6B6B" },
  { id: 2, name: "Hotels", icon: "hotel", color: "#4ECDC4" },
  { id: 3, name: "Properties", icon: "home", color: "#45B7D1" },
  { id: 4, name: "Services", icon: "build", color: "#96CEB4" }
];

export const demoFeaturedItems = [
  {
    id: 1,
    type: "restaurant",
    name: "The Grand Palace",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
    rating: 4.5,
    priceRange: "$$$"
  },
  {
    id: 2,
    type: "hotel",
    name: "Luxury Grand Hotel",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    rating: 4.8,
    priceRange: "$$$$"
  },
  {
    id: 3,
    type: "property",
    name: "Luxury Villa in South Bangalore",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
    price: "₹2.5 Cr",
    area: "4500 sq.ft"
  }
];

export const demoTestimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    comment: "Amazing service! Booked a table at The Grand Palace for my anniversary and everything was perfect.",
    date: "2024-01-15"
  },
  {
    id: 2,
    name: "Rahul Mehta",
    rating: 4,
    comment: "Great hotel experience at Himalayan Retreat. The mountain views were breathtaking!",
    date: "2024-01-10"
  },
  {
    id: 3,
    name: "Anita Desai",
    rating: 5,
    comment: "Found my dream home through this platform. The property viewing process was smooth and professional.",
    date: "2024-01-05"
  }
];

export default {
  demoRestaurants,
  demoHotels,
  demoProperties,
  demoBookings,
  demoUsers,
  demoSearchSuggestions,
  demoCategories,
  demoFeaturedItems,
  demoTestimonials
};