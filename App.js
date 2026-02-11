import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Import screens
import LoginScreen from './screens/Auth/LoginScreen';
import SignupScreen from './screens/Auth/SignupScreen';
import HomeScreen from './screens/Home/HomeScreen';
import ListScreen from './screens/Home/ListScreen';
import DetailScreen from './screens/Home/DetailScreen';
import BookingScreen from './screens/Home/BookingScreen';
import SearchScreen from './screens/Search/SearchScreen';
import SearchListScreen from './screens/Search/SearchListScreen';
import SearchDetailScreen from './screens/Search/SearchDetailScreen';
import SearchBookingScreen from './screens/Search/SearchBookingScreen';
import BookingsScreen from './screens/Bookings/BookingsScreen';
import ProfileScreen from './screens/Profile/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack Navigator
function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Signup" 
        component={SignupScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Home Stack Navigator
function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="List" 
        component={ListScreen} 
        options={{ title: 'Listings' }}
      />
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen} 
        options={{ title: 'Details' }}
      />
      <Stack.Screen 
        name="Booking" 
        component={BookingScreen} 
        options={{ title: 'Book Now' }}
      />
    </Stack.Navigator>
  );
}

// Search Stack Navigator
function SearchStack() {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="SearchList" 
        component={SearchListScreen} 
        options={{ title: 'Search Results' }}
      />
      <Stack.Screen 
        name="SearchDetail" 
        component={SearchDetailScreen} 
        options={{ title: 'Details' }}
      />
      <Stack.Screen 
        name="SearchBooking" 
        component={SearchBookingScreen} 
        options={{ title: 'Book Now' }}
      />
    </Stack.Navigator>
  );
}

// Bookings Stack Navigator
function BookingsStack() {
  return (
    <Stack.Navigator initialRouteName="Bookings">
      <Stack.Screen 
        name="Bookings" 
        component={BookingsScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Profile Stack Navigator
function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Main Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#6c757d',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e9ecef',
          paddingBottom: 5,
          paddingTop: 5,
        },
      })}
    >
      <Tab.Screen 
        name="HomeStack" 
        component={HomeStack} 
        options={{ 
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="SearchStack" 
        component={SearchStack} 
        options={{ 
          tabBarLabel: 'Search',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="BookingsStack" 
        component={BookingsStack} 
        options={{ 
          tabBarLabel: 'Bookings',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="ProfileStack" 
        component={ProfileStack} 
        options={{ 
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AuthWrapper />
    </AuthProvider>
  );
}

function AuthWrapper() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={MainTabs} />
          </Stack.Group>
        ) : (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen 
              name="Auth" 
              component={AuthStack} 
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});