import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recentSearches, setRecentSearches] = useState([
    'Delhi', 'Mumbai', 'Bangalore', 'Restaurant in Delhi', 'Budget Hotel'
  ]);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Trigger animations on mount
  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const categories = [
    { id: 'restaurant', name: 'Restaurant & Bar', icon: 'restaurant', color: '#FF6B6B', gradient: ['#FF6B6B', '#FF8E8E'] },
    { id: 'hotel', name: 'Hotels', icon: 'bed', color: '#4ECDC4', gradient: ['#4ECDC4', '#6BDBC4'] },
    { id: 'property', name: 'Properties', icon: 'home', color: '#45B7D1', gradient: ['#45B7D1', '#5CC7E1'] },
  ];

  const popularDestinations = [
    { id: '1', title: 'Delhi', subtitle: '250+ Options', image: 'https://images.unsplash.com/photo-1590070008894-10c11c2a2c2a?w=200' },
    { id: '2', title: 'Mumbai', subtitle: '180+ Options', image: 'https://images.unsplash.com/photo-1529253355797-480957438f04?w=200' },
    { id: '3', title: 'Bangalore', subtitle: '120+ Options', image: 'https://images.unsplash.com/photo-1580354481871-790b2a980c7a?w=200' },
    { id: '4', title: 'Goa', subtitle: '90+ Options', image: 'https://images.unsplash.com/photo-1565722958481-0f6c9b7b1f9a?w=200' },
    { id: '5', title: 'Jaipur', subtitle: '75+ Options', image: 'https://images.unsplash.com/photo-1590070008894-10c11c2a2c2a?w=200' },
  ];

  const quickFilters = [
    { id: '1', title: 'Nearby', icon: 'location' },
    { id: '2', title: 'Best Rated', icon: 'star' },
    { id: '3', title: 'Deals', icon: 'pricetag' },
    { id: '4', title: 'Open Now', icon: 'time' },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Add to recent searches
      if (!recentSearches.includes(searchQuery)) {
        setRecentSearches([searchQuery, ...recentSearches.slice(0, 4)]);
      }
      
      // Navigate to search results
      navigation.navigate('SearchList', { 
        category: selectedCategory || 'all', 
        query: searchQuery 
      });
    }
  };

  const renderCategory = ({ item, index }) => (
    <Animated.View
      style={[
        {
          transform: [{ translateY: slideAnim }],
          opacity: fadeAnim,
        },
        { marginRight: index === categories.length - 1 ? 0 : 15 }
      ]}
    >
      <TouchableOpacity
        style={[
          styles.categoryCard,
          { backgroundColor: item.color },
          selectedCategory === item.id && styles.selectedCategory
        ]}
        onPress={() => setSelectedCategory(selectedCategory === item.id ? null : item.id)}
        activeOpacity={0.8}
      >
        <View style={styles.categoryIconContainer}>
          <Ionicons name={item.icon} size={28} color="#fff" />
        </View>
        <Text style={styles.categoryName}>{item.name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderDestination = ({ item, index }) => (
    <Animated.View
      style={[
        {
          transform: [{ translateX: slideAnim }],
          opacity: fadeAnim,
        },
        { marginRight: index === popularDestinations.length - 1 ? 0 : 15 }
      ]}
    >
      <TouchableOpacity
        style={styles.destinationCard}
        onPress={() => {
          setSearchQuery(item.title);
          navigation.navigate('SearchList', { 
            category: selectedCategory || 'all', 
            query: item.title 
          });
        }}
        activeOpacity={0.8}
      >
        <View style={styles.destinationImageContainer}>
          <View style={[styles.destinationImage, { backgroundColor: '#e9ecef' }]} />
          <View style={styles.destinationOverlay}>
            <Text style={styles.destinationName}>{item.title}</Text>
          </View>
        </View>
        <Text style={styles.destinationSubtitle}>{item.subtitle}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderRecentSearch = ({ item, index }) => (
    <Animated.View
      style={[
        {
          transform: [{ translateX: slideAnim }],
          opacity: fadeAnim,
        }
      ]}
    >
      <TouchableOpacity
        style={styles.recentSearchItem}
        onPress={() => {
          setSearchQuery(item);
          navigation.navigate('SearchList', { 
            category: selectedCategory || 'all', 
            query: item 
          });
        }}
        activeOpacity={0.8}
      >
        <View style={styles.recentSearchContent}>
          <View style={styles.recentSearchIconContainer}>
            <Ionicons name="time-outline" size={20} color="#007AFF" />
          </View>
          <Text style={styles.recentSearchText}>{item}</Text>
        </View>
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={() => setRecentSearches(recentSearches.filter(search => search !== item))}
        >
          <Ionicons name="close-circle" size={20} color="#ccc" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderQuickFilter = ({ item }) => (
    <TouchableOpacity style={styles.quickFilterButton} activeOpacity={0.8}>
      <Ionicons name={item.icon} size={18} color="#6c757d" style={styles.filterIcon} />
      <Text style={styles.quickFilterText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with gradient */}
      <Animated.View 
        style={[
          styles.headerContainer,
          {
            transform: [{ translateY: slideAnim }],
            opacity: fadeAnim,
          }
        ]}
      >
        <Text style={styles.headerTitle}>Discover</Text>
        <Text style={styles.headerSubtitle}>Find amazing places around you</Text>
      </Animated.View>
      
      {/* Enhanced Search Box */}
      <Animated.View 
        style={[
          styles.searchContainer,
          {
            transform: [{ translateY: slideAnim }],
            opacity: fadeAnim,
          }
        ]}
      >
        <View style={styles.searchBox}>
          <View style={styles.searchIconContainer}>
            <Ionicons name="search" size={22} color="#6c757d" />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search destinations, hotels, restaurants..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              style={styles.clearSearchButton}
              onPress={() => setSearchQuery('')}
            >
              <Ionicons name="close-circle" size={20} color="#ccc" />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Quick Filters */}
        <View style={styles.quickFiltersContainer}>
          <FlatList
            horizontal
            data={quickFilters}
            renderItem={renderQuickFilter}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </Animated.View>

      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
          }
        ]}
      >
        {/* Categories Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Browse Categories</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesList}
        />

        {/* Popular Destinations */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Destinations</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={popularDestinations}
          renderItem={renderDestination}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          style={styles.destinationsList}
        />

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <View style={styles.recentSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              <TouchableOpacity onPress={() => setRecentSearches([])}>
                <Text style={styles.clearAllText}>Clear all</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={recentSearches}
              renderItem={renderRecentSearch}
              keyExtractor={(item, index) => index.toString()}
              style={styles.recentSearchesList}
            />
          </View>
        )}
      </Animated.View>
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
    paddingTop: 50,
    paddingBottom: 25,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2c3e50',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '500',
  },
  searchContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 15,
  },
  searchIconContainer: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
  clearSearchButton: {
    padding: 5,
  },
  quickFiltersContainer: {
    flexDirection: 'row',
  },
  quickFilterButton: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  filterIcon: {
    marginRight: 6,
  },
  quickFilterText: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2c3e50',
  },
  seeAllText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  clearAllText: {
    fontSize: 16,
    color: '#ff6b6b',
    fontWeight: '600',
  },
  categoriesList: {
    height: 140,
    marginBottom: 30,
  },
  categoryCard: {
    width: 120,
    height: 120,
    borderRadius: 20,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  categoryIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 14,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  selectedCategory: {
    transform: [{ scale: 1.05 }],
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 12,
  },
  destinationsList: {
    height: 180,
    marginBottom: 30,
  },
  destinationCard: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  destinationImageContainer: {
    height: 120,
    position: 'relative',
  },
  destinationImage: {
    width: '100%',
    height: '100%',
  },
  destinationOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  destinationName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
  destinationSubtitle: {
    fontSize: 14,
    color: '#6c757d',
    padding: 12,
    fontWeight: '600',
  },
  recentSection: {
    flex: 1,
  },
  recentSearchesList: {
    flex: 1,
  },
  recentSearchItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  recentSearchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  recentSearchIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recentSearchText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
    flex: 1,
  },
  clearButton: {
    padding: 5,
  },
});

export default SearchScreen;