import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, RefreshControl, SafeAreaView } from 'react-native';
import Card from '../../components/Card';
import { getRestaurantBookings, getHotelRooms, getProperties } from '../../services/api';

const SearchListScreen = ({ route, navigation }) => {
  const { category, query } = route.params;
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadListings();
  }, [category, query]);

  const loadListings = async () => {
    setLoading(true);
    try {
      let response;
      switch (category) {
        case 'restaurant':
          response = await getRestaurantBookings(); // Get all bookings (public endpoint)
          break;
        case 'hotel':
          response = await getHotelRooms(); // Get all rooms (admin endpoint - may need adjustment)
          break;
        case 'property':
          response = await getProperties(); // Get all properties (admin endpoint - may need adjustment)
          break;
        default:
          response = { success: true, data: [] };
      }
      
      if (response.success) {
        // Filter based on query if provided
        if (query) {
          const filtered = response.data.filter(item => {
            let searchField = '';
            switch (category) {
              case 'restaurant':
                searchField = `Table for ${item.partySize} on ${item.bookingDate}`;
                break;
              case 'hotel':
                searchField = `${item.roomType} Room ${item.roomNumber} ${item.description || ''}`;
                break;
              case 'property':
                searchField = `${item.title} ${item.description || ''} ${item.address?.city || ''}`;
                break;
              default:
                searchField = JSON.stringify(item);
            }
            return searchField.toLowerCase().includes(query.toLowerCase());
          });
          setListings(filtered);
        } else {
          setListings(response.data);
        }
      } else {
        console.error('Failed to load listings:', response.message);
      }
    } catch (error) {
      console.error('Error loading listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadListings();
    setRefreshing(false);
  };

  const renderListing = ({ item }) => {
    let title, subtitle, price, imageUrl, rating;
    
    switch (category) {
      case 'restaurant':
        title = `Table for ${item.partySize}`;
        subtitle = `${item.bookingDate} at ${item.bookingTime}`;
        price = `Status: ${item.status}`;
        imageUrl = 'https://via.placeholder.com/300x200'; // Default restaurant image
        rating = null;
        break;
      case 'hotel':
        title = `${item.roomType} Room`;
        subtitle = `Room ${item.roomNumber} • Floor ${item.floor || 'N/A'}`;
        price = `₹${item.pricePerNight}/night`;
        imageUrl = item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/300x200';
        rating = null;
        break;
      case 'property':
        title = item.title;
        subtitle = `${item.address?.city || 'City N/A'}, ${item.propertyType}`;
        price = `₹${item.price?.toLocaleString() || 'N/A'}`;
        imageUrl = item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/300x200';
        rating = null;
        break;
      default:
        title = 'Listing';
        subtitle = 'Details';
        price = 'Price';
        imageUrl = 'https://via.placeholder.com/300x200';
        rating = null;
    }

    return (
      <TouchableOpacity
        style={styles.listingCard}
        onPress={() => navigation.navigate('SearchDetail', { id: item._id, type: category, item })}
        activeOpacity={0.8}
      >
        <Card
          title={title}
          subtitle={subtitle}
          image={imageUrl}
          price={price}
          rating={rating}
          onPress={() => navigation.navigate('SearchDetail', { id: item._id, type: category, item })}
        />
      </TouchableOpacity>
    );
  };

  const getCategoryTitle = () => {
    switch (category) {
      case 'restaurant': return 'Restaurants & Bars';
      case 'hotel': return 'Hotels';
      case 'property': return 'Properties';
      default: return 'Search Results';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{getCategoryTitle()}</Text>
        <Text style={styles.queryText}>Results for "{query}"</Text>
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <FlatList
          data={listings}
          renderItem={renderListing}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
      
      {!loading && listings.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No {getCategoryTitle().toLowerCase()} found for "{query}"</Text>
          <Text style={styles.emptySubtext}>Try adjusting your search terms</Text>
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
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
  },
  queryText: {
    fontSize: 16,
    color: '#6c757d',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 20,
    paddingBottom: 20,
  },
  listingCard: {
    marginBottom: 15,
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
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default SearchListScreen;