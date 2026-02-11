import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator, RefreshControl, SafeAreaView, useWindowDimensions } from 'react-native';
import { getRestaurantBookings, getHotelRooms, getProperties } from '../../services/api';
import { scaleSize, scaleFont, responsivePadding, isSmallDevice, isTablet, getGridColumns } from '../../utils/Responsive';
import { ResponsiveContainer, ResponsiveCard, ResponsiveGrid } from '../../components/ResponsiveComponents';

const ListScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    loadListings();
  }, [category]);

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
        setListings(response.data);
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

    // Responsive layout - grid for tablets, list for phones
    const useGrid = isTablet && category !== 'restaurant'; // Restaurant bookings better as list
    const columns = useGrid ? 2 : 1;
    const cardWidth = useGrid ? (width - responsivePadding(40) - 15) / 2 : width - responsivePadding(40);
    const imageWidth = useGrid ? cardWidth : 120;
    const imageHeight = useGrid ? 150 : 120;

    return (
      <TouchableOpacity
        style={[
          styles.listingCard,
          {
            width: cardWidth,
            marginBottom: useGrid ? 15 : 15,
            flexDirection: useGrid ? 'column' : 'row',
            marginRight: useGrid ? 15 : 0
          }
        ]}
        onPress={() => navigation.navigate('Detail', { id: item._id, type: category, item })}
        activeOpacity={0.8}
      >
        <Image 
          source={{ uri: imageUrl }} 
          style={[styles.listingImage, { 
            width: imageWidth, 
            height: imageHeight,
            borderTopLeftRadius: useGrid ? scaleSize(16) : scaleSize(16),
            borderTopRightRadius: useGrid ? scaleSize(16) : 0,
            borderBottomLeftRadius: useGrid ? 0 : scaleSize(16)
          }]} 
          resizeMode="cover" 
        />
        <View style={[styles.listingInfo, { 
          padding: useGrid ? responsivePadding(12) : responsivePadding(15),
          paddingTop: useGrid ? responsivePadding(12) : responsivePadding(15)
        }]}>
          <Text style={[styles.listingTitle, { 
            fontSize: isSmallDevice ? 14 : 16,
            marginBottom: useGrid ? 6 : 4
          }]} numberOfLines={useGrid ? 2 : 1}>{title}</Text>
          <Text style={[styles.listingSubtitle, { 
            fontSize: isSmallDevice ? 12 : 14,
            marginBottom: useGrid ? 8 : 8
          }]} numberOfLines={useGrid ? 2 : 1}>{subtitle}</Text>
          <View style={[styles.listingFooter, { 
            marginTop: useGrid ? 8 : 0
          }]}>
            <Text style={[styles.listingPrice, { 
              fontSize: isSmallDevice ? 14 : 16
            }]}>{price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const getCategoryTitle = () => {
    switch (category) {
      case 'restaurant': return 'Restaurants & Bars';
      case 'hotel': return 'Hotels';
      case 'property': return 'Properties';
      default: return 'Listings';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.headerContainer, {
        paddingHorizontal: responsivePadding(20),
        paddingTop: isSmallDevice ? 15 : 20,
        paddingBottom: isSmallDevice ? 12 : 15
      }]}>
        <Text style={[styles.header, {
          fontSize: isSmallDevice ? 20 : 24
        }]}>{getCategoryTitle()}</Text>
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
          contentContainerStyle={[styles.listContainer, {
            padding: responsivePadding(20),
            paddingBottom: responsivePadding(20)
          }]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          numColumns={isTablet && category !== 'restaurant' ? 2 : 1}
        />
      )}
      
      {!loading && listings.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, {
            fontSize: isSmallDevice ? 14 : 16
          }]}>No {getCategoryTitle().toLowerCase()} found</Text>
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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  header: {
    fontWeight: '700',
    color: '#2c3e50',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
  },
  listingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  listingImage: {
  },
  listingInfo: {
    justifyContent: 'center',
  },
  listingTitle: {
    fontWeight: '700',
    color: '#2c3e50',
  },
  listingSubtitle: {
    color: '#6c757d',
  },
  listingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listingPrice: {
    fontWeight: '700',
    color: '#28a745',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    color: '#6c757d',
    textAlign: 'center',
  },
});

export default ListScreen;