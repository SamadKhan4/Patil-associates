import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { getRestaurantBookingById, getHotelRoomById, getPropertyById } from '../../services/api';

const { width } = Dimensions.get('window');

const DetailScreen = ({ route, navigation }) => {
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
        price = `₹${detailData.partySize * 500 || 'N/A'}`;
        images = ['https://via.placeholder.com/400x250']; // Default restaurant image
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
          : ['https://via.placeholder.com/400x250'];
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
          : ['https://via.placeholder.com/400x250'];
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
        images = ['https://via.placeholder.com/400x250'];
        additionalInfo = [];
    }

    return (
      <ScrollView style={styles.contentContainer}>
        {/* Image Carousel */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: images[0] }} style={styles.mainImage} resizeMode="cover" />
        </View>
        
        {/* Title and Price */}
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>{price}</Text>
          </View>
        </View>
        
        {/* Description */}
        <View style={styles.sectionContainer}>
          <Text style={styles.description}>{description}</Text>
        </View>
        
        {/* Additional Info */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Details</Text>
          {additionalInfo.map((info, index) => (
            <View key={index} style={styles.infoRow}>
              <Text style={styles.infoLabel}>{info.label}</Text>
              <Text style={styles.infoValue}>{info.value}</Text>
            </View>
          ))}
        </View>
        
        {/* Book Now Button */}
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => navigation.navigate('Booking', { id, type, detailData })}
          activeOpacity={0.8}
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
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#007AFF',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
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
    width: width,
    height: 250,
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c3e50',
    flex: 1,
    marginRight: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#28a745',
    alignSelf: 'flex-start',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 1,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6c757d',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  infoLabel: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '600',
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'right',
    fontWeight: '500',
  },
  bookButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    margin: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
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
    color: '#6c757d',
    textAlign: 'center',
  },
});

export default DetailScreen;