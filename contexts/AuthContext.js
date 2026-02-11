import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredToken } from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkInitialAuthStatus();
  }, []);

  const checkInitialAuthStatus = async () => {
    try {
      const token = await getStoredToken();
      setIsLoggedIn(!!token);
    } catch (error) {
      console.error('Error checking initial auth status:', error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = async () => {
    setIsLoggedIn(false);
  };

  const value = {
    isLoggedIn,
    isLoading,
    login,
    logout,
    checkInitialAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};