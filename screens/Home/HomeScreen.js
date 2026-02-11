import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFeaturedProperties } from '../../services/api';

const HomeScreen = ({ navigation }) => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const categories = [
    { id: 'restaurant', name: 'Restaurant & Bar', icon: 'restaurant', color: '#FF6B6B' },
    { id: 'hotel', name: 'Hotels', icon: 'bed', color: '#4ECDC4' },
    { id: 'property', name: 'Properties', icon: 'home', color: '#45B7D1' },
  ];

  useEffect(() => {
    loadFeaturedProperties();
  }, []);

  const loadFeaturedProperties = async () => {
    try {
      const response = await getFeaturedProperties();
      if (response.success) {
        setFeaturedProperties(response.data.slice(0, 3)); // Get first 3 featured properties
      }
    } catch (error) {
      console.error('Error loading featured properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFeaturedProperties();
    setRefreshing(false);
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate('List', { category: item.id })}
      activeOpacity={0.8}
    >
      <Ionicons name={item.icon} size={32} color="#fff" />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderFeaturedProperty = ({ item }) => (
    <TouchableOpacity
      style={styles.featuredCard}
      onPress={() => navigation.navigate('Detail', { id: item._id, type: 'property' })}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/300x200' }} 
        style={styles.propertyImage}
        resizeMode="cover"
      />
      <View style={styles.propertyInfo}>
        <Text style={styles.propertyTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.propertyLocation} numberOfLines={1}>{item.address?.city || 'Location N/A'}</Text>
        <View style={styles.propertyDetails}>
          <Text style={styles.propertyPrice}>₹{item.price?.toLocaleString() || 'N/A'}</Text>
          <Text style={styles.propertyBedrooms}>{item.bedrooms || 0} bed</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Discover</Text>
        <Text style={styles.subHeader}>Find the perfect place for your needs</Text>
      </View>
      
      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          horizontal
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesList}
          contentContainerStyle={styles.categoriesContainer}
        />
      </View>

      {/* Featured Properties */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Properties</Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        ) : featuredProperties.length > 0 ? (
          <FlatList
            horizontal
            data={featuredProperties}
            renderItem={renderFeaturedProperty}
            keyExtractor={(item) => item._id}
            showsHorizontalScrollIndicator={false}
            style={styles.featuredList}
            contentContainerStyle={styles.featuredContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No featured properties available</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    color: '#6c757d',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 15,
  },
  categoriesList: {
    height: 120,
  },
  categoriesContainer: {
    paddingRight: 15,
  },
  categoryCard: {
    width: 120,
    height: 100,
    borderRadius: 16,
    padding: 15,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },

  categoryName: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  featuredList: {
    height: 220,
  },
  featuredContainer: {
    paddingRight: 15,
  },
  featuredCard: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  propertyImage: {
    width: '100%',
    height: 140,
  },
  propertyInfo: {
    padding: 12,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
  },
  propertyLocation: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
  },
  propertyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  propertyPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#28a745',
  },
  propertyBedrooms: {
    fontSize: 14,
    color: '#6c757d',
  },
  loadingContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6c757d',
    fontSize: 16,
  },
});

export default HomeScreen;