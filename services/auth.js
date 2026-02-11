// Auth service for handling user authentication
const BASE_URL = 'https://api.patilassociates.in/api'; // Update this to your actual backend URL

// Import mock data for demo mode
import { demoUsers } from './demoData';
import { USE_MOCK_DATA } from './apiConfig';

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

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API call failed: ${url}`, error);
    throw error;
  }
};

// Mock authentication functions
const mockLogin = async (email, password) => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
  
  const user = demoUsers.find(u => u.email === email);
  
  if (!user) {
    return {
      success: false,
      message: "User not found"
    };
  }
  
  // Simple password check for demo (in real app, this should be hashed)
  if (password !== "password123") {
    return {
      success: false,
      message: "Invalid password"
    };
  }
  
  const token = `demo_token_${user.id}_${Date.now()}`;
  const userData = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    roles: ["customer"]
  };
  
  // Store token and user data
  await storeToken(token);
  await storeUser(userData);
  
  return {
    success: true,
    message: "Login successful",
    token,
    user: userData
  };
};

const mockSignup = async (fullName, email, password, phoneNo) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  
  const existingUser = demoUsers.find(u => u.email === email);
  
  if (existingUser) {
    return {
      success: false,
      message: "User with this email already exists"
    };
  }
  
  const newUser = {
    id: demoUsers.length + 1,
    fullName,
    email,
    phone: phoneNo,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
    membership: "Silver",
    preferences: {
      cuisine: ["Indian"],
      priceRange: "$$",
      location: "Default"
    }
  };
  
  const token = `demo_token_${newUser.id}_${Date.now()}`;
  const userData = {
    id: newUser.id,
    fullName: newUser.fullName,
    email: newUser.email,
    phone: newUser.phone,
    roles: ["customer"]
  };
  
  // Store token and user data
  await storeToken(token);
  await storeUser(userData);
  
  return {
    success: true,
    message: "Account created successfully",
    token,
    user: userData
  };
};

// Login function
export const login = async (email, password) => {
  try {
    if (USE_MOCK_DATA) {
      return await mockLogin(email, password);
    }
    
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    // Store the token in async storage
    if (data.success && data.token) {
      await storeToken(data.token);
      await storeUser(data.user);
    }
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Signup function
export const signup = async (fullName, email, password, phoneNo) => {
  try {
    if (USE_MOCK_DATA) {
      return await mockSignup(fullName, email, password, phoneNo);
    }
    
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullName, email, password, phoneNo }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

// Logout function
export const logout = async () => {
  try {
    // Remove stored token and user data
    await removeToken();
    await removeUser();
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'authToken';
const USER_KEY = 'userData';

// Get stored token (implement token storage in your app)
const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

// Store user data
const storeUser = async (user) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error storing user data:', error);
  }
};

const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Error removing user data:', error);
  }
};

// Get stored token
export const getStoredToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting stored token:', error);
    return null;
  }
};

// Get stored user
export const getStoredUser = async () => {
  try {
    const userData = await AsyncStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting stored user:', error);
    return null;
  }
};

export default {
  login,
  signup,
  logout,
  getStoredToken,
  getStoredUser,
};