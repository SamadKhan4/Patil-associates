import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, RefreshControl } from 'react-native';
import { getRestaurantBookings, getHotelBookings } from '../../services/api';

const BookingsScreen = ({ navigation }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    loadBookings();
  }, [activeTab]);

  const loadBookings = async () => {
    setLoading(true);
    try {
      // In a real app, you would fetch bookings from the API
      // For now, using mock data
      const mockBookings = [
        {
          _id: '1',
          type: 'restaurant',
          title: 'Table Reservation',
          subtitle: 'Restaurant Name',
          date: '2024-02-15',
          time: '19:30',
          status: 'confirmed',
          partySize: 4,
          price: '₹2,500'
        },
        {
          _id: '2',
          type: 'hotel',
          title: 'Hotel Booking',
          subtitle: 'Grand Hotel, Mumbai',
          checkIn: '2024-02-20',
          checkOut: '2024-02-25',
          status: 'confirmed',
          guests: 2,
          price: '₹12,000'
        },
        {
          _id: '3',
          type: 'property',
          title: 'Property Inquiry',
          subtitle: 'Luxury Villa, Goa',
          date: '2024-02-10',
          status: 'pending',
          price: '₹2,50,00,000'
        }
      ];
      
      setBookings(mockBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadBookings();
    setRefreshing(false);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return '#4CAF50';
      case 'pending':
        return '#FF9800';
      case 'cancelled':
        return '#F44336';
      case 'completed':
        return '#2196F3';
      default:
        return '#9E9E9E';
    }
  };

  const getIconByType = (type) => {
    switch (type) {
      case 'restaurant':
        return '🍽️';
      case 'hotel':
        return '🏨';
      case 'property':
        return '🏠';
      default:
        return '📅';
    }
  };

  const renderBooking = ({ item }) => (
    <TouchableOpacity
      style={styles.bookingCard}
      onPress={() => navigation.navigate('Detail', { id: item._id, type: item.type })}
      activeOpacity={0.8}
    >
      <View style={styles.bookingHeader}>
        <View style={styles.bookingInfo}>
          <Text style={styles.bookingIcon}>{getIconByType(item.type)}</Text>
          <View>
            <Text style={styles.bookingTitle}>{item.title}</Text>
            <Text style={styles.bookingSubtitle}>{item.subtitle}</Text>
          </View>
        </View>
        <View style={styles.bookingDetailsRight}>
          <Text style={styles.bookingPrice}>{item.price}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.bookingDetails}>
        {item.date && (
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Date:</Text>
            <Text style={styles.detailValue}>{item.date}</Text>
          </View>
        )}
        {item.time && (
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Time:</Text>
            <Text style={styles.detailValue}>{item.time}</Text>
          </View>
        )}
        {item.checkIn && (
          <>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Check-in:</Text>
              <Text style={styles.detailValue}>{item.checkIn}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Check-out:</Text>
              <Text style={styles.detailValue}>{item.checkOut}</Text>
            </View>
          </>
        )}
        {(item.partySize || item.guests) && (
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Guests:</Text>
            <Text style={styles.detailValue}>{item.partySize || item.guests}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.bookingFooter}>
        <TouchableOpacity style={styles.viewDetailsButton}>
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'past', label: 'Past' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading your bookings...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>

      <View style={styles.tabsContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab.id)}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {bookings.length > 0 ? (
        <FlatList
          data={bookings}
          renderItem={renderBooking}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No bookings found</Text>
          <Text style={styles.emptySubtext}>Your upcoming reservations will appear here</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  tab: {
    paddingVertical: 15,
    paddingHorizontal: 12,
    marginRight: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#6c757d',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  listContainer: {
    padding: 20,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bookingInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 15,
  },
  bookingIcon: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 2,
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4,
  },
  bookingSubtitle: {
    fontSize: 14,
    color: '#6c757d',
  },
  bookingDetailsRight: {
    alignItems: 'flex-end',
  },
  bookingPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#28a745',
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  bookingDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  detailItem: {
    marginRight: 15,
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  viewDetailsButton: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  viewDetailsText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6c757d',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default BookingsScreen;