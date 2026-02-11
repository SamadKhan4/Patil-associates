import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { getRestaurantBookingById, getHotelRoomById, getPropertyById } from '../../services/api';

const SearchDetailScreen = ({ route, navigation }) => {
  const { id, type, item } = route.params;
  const [detailData, setDetailData] = useState(item || null);
  const [loading, setLoading] = useState(!item); // Only load if item wasn't passed

  useEffect(() => {
    if (!item) {
      loadDetailData();
    }
  }, []);

  const loadDetailData = async () => {
    setLoading(true);
    try {
      let response;
      switch (type) {
        case 'restaurant':
          response = await getRestaurantBookingById(id);
          break;
        case 'hotel':
          response = await getHotelRoomById(id);
          break;
        case 'property':
          response = await getPropertyById(id);
          break;
        default:
          response = { success: false };
      }
      
      if (response.success) {
        setDetailData(response.data);
      } else {
        Alert.alert('Error', 'Failed to load details');
      }
    } catch (error) {
      console.error('Error loading detail:', error);
      Alert.alert('Error', 'An error occurred while loading details');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      );
    }

    if (!detailData) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No details available</Text>
        </View>
      );
    }

    let title, description, price, images, additionalInfo;
    
    switch (type) {
      case 'restaurant':
        title = `Table for ${detailData.partySize}`;
        description = `Booking for ${detailData.bookingDate} at ${detailData.bookingTime}. Status: ${detailData.status}`;
        price = `Party Size: ${detailData.partySize}`;
        images = ['https://via.placeholder.com/400x200']; // Default restaurant image
        additionalInfo = [
          { label: 'Booking Type', value: detailData.bookingType || 'Regular' },
          { label: 'Special Requests', value: detailData.specialRequests || 'None' },
          { label: 'Created', value: new Date(detailData.createdAt).toLocaleDateString() },
        ];
        break;
        
      case 'hotel':
        title = `${detailData.roomType} Room ${detailData.roomNumber}`;
        description = detailData.description || 'No description available';
        price = `₹${detailData.pricePerNight}/night`;
        images = detailData.images && detailData.images.length > 0 
          ? detailData.images 
          : ['https://via.placeholder.com/400x200'];
        additionalInfo = [
          { label: 'Capacity', value: `${detailData.capacity} guests` },
          { label: 'Floor', value: detailData.floor || 'N/A' },
          { label: 'Amenities', value: detailData.amenities?.join(', ') || 'N/A' },
          { label: 'View Type', value: detailData.viewType || 'N/A' },
        ];
        break;
        
      case 'property':
        title = detailData.title;
        description = detailData.description || 'No description available';
        price = `₹${detailData.price?.toLocaleString() || 'N/A'}`;
        images = detailData.images && detailData.images.length > 0 
          ? detailData.images 
          : ['https://via.placeholder.com/400x200'];
        additionalInfo = [
          { label: 'Type', value: detailData.propertyType || 'N/A' },
          { label: 'Area', value: `${detailData.area || 'N/A'} ${detailData.areaUnit || 'sqft'}` },
          { label: 'Bedrooms', value: detailData.bedrooms || 'N/A' },
          { label: 'Bathrooms', value: detailData.bathrooms || 'N/A' },
          { label: 'Address', value: `${detailData.address?.street || ''}, ${detailData.address?.city || ''}` },
        ];
        break;
        
      default:
        title = 'Details';
        description = 'Description';
        price = 'Price';
        images = ['https://via.placeholder.com/400x200'];
        additionalInfo = [];
    }

    return (
      <ScrollView style={styles.contentContainer}>
        {/* Image Slider */}
        <View style={styles.imageContainer}>
          {images.map((img, index) => (
            <Image key={index} source={{ uri: img }} style={styles.mainImage} />
          ))}
        </View>
        
        {/* Title and Price */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
        
        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{description}</Text>
        </View>
        
        {/* Additional Info */}
        <View style={styles.additionalInfoContainer}>
          <Text style={styles.sectionTitle}>Details</Text>
          {additionalInfo.map((info, index) => (
            <View key={index} style={styles.infoRow}>
              <Text style={styles.infoLabel}>{info.label}:</Text>
              <Text style={styles.infoValue}>{info.value}</Text>
            </View>
          ))}
        </View>
        
        {/* Book Now Button */}
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => navigation.navigate('SearchBooking', { id, type, detailData })}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <View style={styles.spacer} />
      </View>
      
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  spacer: {
    width: 50,
  },
  contentContainer: {
    flex: 1,
  },
  imageContainer: {
    backgroundColor: '#fff',
  },
  mainImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  descriptionContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  additionalInfoContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
  },
  bookButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    margin: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default SearchDetailScreen;