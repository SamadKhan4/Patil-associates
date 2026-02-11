import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  getFeaturedProperties,
  getFeaturedHotels,
  getFeaturedRestaurants,
} from '../../services/api';
import {
  scaleSize,
  scaleFont,
  responsivePadding,
  isSmallDevice,
  isTablet,
} from '../../utils/Responsive';

const HomeScreen = ({ navigation }) => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [featuredHotels, setFeaturedHotels] = useState([]);
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { width } = useWindowDimensions();

  const categories = [
    { id: 'restaurant', name: 'Restaurant & Bar', icon: 'restaurant', color: '#FF6B6B' },
    { id: 'hotel', name: 'Hotels', icon: 'bed', color: '#4ECDC4' },
    { id: 'property', name: 'Properties', icon: 'home', color: '#45B7D1' },
  ];

  useEffect(() => {
    loadAllFeaturedData();
  }, []);

  const loadAllFeaturedData = async () => {
    try {
      const [propertiesResponse, hotelsResponse, restaurantsResponse] = await Promise.all([
        getFeaturedProperties(),
        getFeaturedHotels(),
        getFeaturedRestaurants(),
      ]);

      if (propertiesResponse?.success) {
        setFeaturedProperties(propertiesResponse.data.slice(0, 3));
      }
      if (hotelsResponse?.success) {
        setFeaturedHotels(hotelsResponse.data.slice(0, 3));
      }
      if (restaurantsResponse?.success) {
        setFeaturedRestaurants(restaurantsResponse.data.slice(0, 3));
      }
    } catch (error) {
      console.error('Error loading featured data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAllFeaturedData();
    setRefreshing(false);
  };

  const renderCategory = ({ item }) => {
    const cardWidth = isTablet ? 140 : isSmallDevice ? 100 : 120;
    const cardHeight = isTablet ? 120 : isSmallDevice ? 80 : 100;

    return (
      <TouchableOpacity
        style={[
          styles.categoryCard,
          {
            backgroundColor: item.color,
            width: cardWidth,
            height: cardHeight,
            marginRight: responsivePadding(15),
          },
        ]}
        onPress={() => navigation.navigate('List', { category: item.id })}
        activeOpacity={0.8}
      >
        <Ionicons
          name={item.icon}
          size={isTablet ? 36 : isSmallDevice ? 24 : 32}
          color="#fff"
        />
        <Text style={[styles.categoryName, { fontSize: isSmallDevice ? 12 : 14 }]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const cardWidth = isTablet ? width * 0.45 : isSmallDevice ? width * 0.85 : 280;

  const FeaturedCard = ({ item, type }) => {
    const title =
      type === 'property' ? item.title : item.name;

    const subtitle =
      type === 'property'
        ? item.address?.city || 'Location N/A'
        : type === 'hotel'
        ? item.address?.city || 'Location N/A'
        : item.cuisineType || item.specialties?.[0] || 'Restaurant';

    const priceText =
      type === 'property'
        ? `₹${item.price?.toLocaleString() || 'N/A'}`
        : type === 'hotel'
        ? `₹${item.pricePerNight?.toLocaleString() || 'N/A'}/night`
        : item.priceRange || '₹₹₹';

    return (
      <TouchableOpacity
        style={[styles.featuredCard, { width: cardWidth, marginRight: responsivePadding(15) }]}
        onPress={() => navigation.navigate('Detail', { id: item._id, type, item })}
        activeOpacity={0.85}
      >
        <Image
          source={{
            uri:
              item.images && item.images.length > 0
                ? item.images[0]
                : 'https://via.placeholder.com/300x200',
          }}
          style={styles.propertyImage}
          resizeMode="cover"
        />
        <View style={styles.propertyInfo}>
          <Text style={[styles.propertyTitle, { fontSize: isSmallDevice ? 14 : 16 }]} numberOfLines={1}>
            {title}
          </Text>
          <Text style={[styles.propertyLocation, { fontSize: isSmallDevice ? 12 : 14 }]} numberOfLines={1}>
            {subtitle}
          </Text>
          <View style={styles.propertyDetails}>
            <Text style={[styles.propertyPrice, { fontSize: isSmallDevice ? 14 : 16 }]}>
              {priceText}
            </Text>
            {item.rating && (
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={isSmallDevice ? 12 : 14} color="#FFD700" />
                <Text style={[styles.ratingText, { fontSize: isSmallDevice ? 12 : 14 }]}>
                  {item.rating}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View
        style={[
          styles.headerContainer,
          {
            paddingHorizontal: responsivePadding(20),
            paddingTop: isSmallDevice ? 36 : 48,
            paddingBottom: isSmallDevice ? 12 : 16,
          },
        ]}
      >
        <Text style={[styles.header, { fontSize: isSmallDevice ? 24 : 28 }]}>Discover</Text>
        <Text style={[styles.subHeader, { fontSize: isSmallDevice ? 14 : 16 }]}>
          Find the perfect place for your needs
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Categories */}
        <View
          style={[
            styles.section,
            {
              paddingHorizontal: responsivePadding(20),
              marginTop: isSmallDevice ? 20 : 28,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { fontSize: isSmallDevice ? 18 : 20 }]}>Categories</Text>
          <FlatList
            horizontal
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.categoriesContainer, { paddingVertical: 4 }]}
          />
        </View>

        {/* Featured Properties */}
        <View style={[styles.section, { paddingHorizontal: responsivePadding(20), marginTop: isSmallDevice ? 20 : 28 }]}>
          <Text style={[styles.sectionTitle, { fontSize: isSmallDevice ? 18 : 20 }]}>Featured Properties</Text>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
            </View>
          ) : featuredProperties.length > 0 ? (
            <FlatList
              horizontal
              data={featuredProperties}
              renderItem={({ item }) => <FeaturedCard item={item} type="property" />}
              keyExtractor={(item) => item._id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[styles.featuredContainer, { paddingVertical: 4 }]}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No featured properties available</Text>
            </View>
          )}
        </View>

        {/* Featured Hotels */}
        <View style={[styles.section, { paddingHorizontal: responsivePadding(20), marginTop: isSmallDevice ? 20 : 28 }]}>
          <Text style={[styles.sectionTitle, { fontSize: isSmallDevice ? 18 : 20 }]}>Featured Hotels</Text>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
            </View>
          ) : featuredHotels.length > 0 ? (
            <FlatList
              horizontal
              data={featuredHotels}
              renderItem={({ item }) => <FeaturedCard item={item} type="hotel" />}
              keyExtractor={(item) => item._id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[styles.featuredContainer, { paddingVertical: 4 }]}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No featured hotels available</Text>
            </View>
          )}
        </View>

        {/* Featured Restaurants */}
        <View style={[styles.section, { paddingHorizontal: responsivePadding(20), marginTop: isSmallDevice ? 20 : 28 }]}>
          <Text style={[styles.sectionTitle, { fontSize: isSmallDevice ? 18 : 20 }]}>
            Featured Restaurants & Bars
          </Text>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
            </View>
          ) : featuredRestaurants.length > 0 ? (
            <FlatList
              horizontal
              data={featuredRestaurants}
              renderItem={({ item }) => <FeaturedCard item={item} type="restaurant" />}
              keyExtractor={(item) => item._id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[styles.featuredContainer, { paddingVertical: 4 }]}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No featured restaurants available</Text>
            </View>
          )}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scrollView: { flex: 1 },

  headerContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    justifyContent: 'center',
  },
  header: { fontWeight: '700', color: '#2c3e50' },
  subHeader: { color: '#6c757d' },

  section: { width: '100%' },
  sectionTitle: {
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 6,
  },

  categoriesContainer: {
    paddingRight: 15,
    alignItems: 'center',
  },
  categoryCard: {
    borderRadius: 16,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryName: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 6,
  },

  featuredContainer: {
    paddingRight: 15,
    alignItems: 'center',
  },
  featuredCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  propertyImage: {
    width: '100%',
    height: isSmallDevice ? 110 : 140,
  },
  propertyInfo: {
    padding: 12,
    paddingTop: 10,
  },
  propertyTitle: {
    fontWeight: '700',
    color: '#2c3e50',
  },
  propertyLocation: {
    color: '#6c757d',
    marginTop: 4,
  },
  propertyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    alignItems: 'center',
  },
  propertyPrice: {
    fontWeight: '700',
    color: '#28a745',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontWeight: '600',
    color: '#2c3e50',
    marginLeft: 4,
  },

  loadingContainer: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6c757d',
  },
  bottomSpacer: {
    height: 40,
  },
});

export default HomeScreen;
