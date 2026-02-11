import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recentSearches, setRecentSearches] = useState([
    'Delhi',
    'Mumbai',
    'Bangalore',
    'Restaurant in Delhi',
    'Budget Hotel',
  ]);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const categories = [
    { id: 'restaurant', name: 'Restaurant & Bar', icon: 'restaurant', color: '#FF6B6B' },
    { id: 'hotel', name: 'Hotels', icon: 'bed', color: '#4ECDC4' },
    { id: 'property', name: 'Properties', icon: 'home', color: '#45B7D1' },
  ];

  const popularDestinations = [
    { id: '1', title: 'Delhi', subtitle: '250+ Options' },
    { id: '2', title: 'Mumbai', subtitle: '180+ Options' },
    { id: '3', title: 'Bangalore', subtitle: '120+ Options' },
    { id: '4', title: 'Goa', subtitle: '90+ Options' },
    { id: '5', title: 'Jaipur', subtitle: '75+ Options' },
  ];

  const quickFilters = [
    { id: '1', title: 'Nearby', icon: 'location' },
    { id: '2', title: 'Best Rated', icon: 'star' },
    { id: '3', title: 'Deals', icon: 'pricetag' },
    { id: '4', title: 'Open Now', icon: 'time' },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      if (!recentSearches.includes(searchQuery)) {
        setRecentSearches([searchQuery, ...recentSearches.slice(0, 4)]);
      }

      navigation.navigate('SearchList', {
        category: selectedCategory || 'all',
        query: searchQuery,
      });
    }
  };

  const renderCategory = ({ item }) => (
    <Animated.View
      style={{
        transform: [{ translateY: slideAnim }],
        opacity: fadeAnim,
        marginRight: 14,
      }}
    >
      <TouchableOpacity
        style={[
          styles.categoryCard,
          { backgroundColor: item.color },
          selectedCategory === item.id && styles.selectedCategory,
        ]}
        onPress={() => setSelectedCategory(selectedCategory === item.id ? null : item.id)}
        activeOpacity={0.85}
      >
        <View style={styles.categoryIconContainer}>
          <Ionicons name={item.icon} size={26} color="#fff" />
        </View>
        <Text style={styles.categoryName}>{item.name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderDestination = ({ item }) => (
    <Animated.View
      style={{
        transform: [{ translateX: slideAnim }],
        opacity: fadeAnim,
        marginRight: 14,
      }}
    >
      <TouchableOpacity
        style={styles.destinationCard}
        onPress={() => {
          setSearchQuery(item.title);
          navigation.navigate('SearchList', {
            category: selectedCategory || 'all',
            query: item.title,
          });
        }}
        activeOpacity={0.85}
      >
        <View style={styles.destinationImagePlaceholder}>
          <Text style={styles.destinationName}>{item.title}</Text>
        </View>
        <Text style={styles.destinationSubtitle}>{item.subtitle}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderRecentSearch = ({ item }) => (
    <Animated.View style={{ opacity: fadeAnim }}>
      <TouchableOpacity
        style={styles.recentSearchItem}
        onPress={() => {
          setSearchQuery(item);
          navigation.navigate('SearchList', {
            category: selectedCategory || 'all',
            query: item,
          });
        }}
        activeOpacity={0.85}
      >
        <View style={styles.recentSearchContent}>
          <View style={styles.recentSearchIconContainer}>
            <Ionicons name="time-outline" size={18} color="#007AFF" />
          </View>
          <Text style={styles.recentSearchText}>{item}</Text>
        </View>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => setRecentSearches(recentSearches.filter((s) => s !== item))}
        >
          <Ionicons name="close-circle" size={20} color="#ccc" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderQuickFilter = ({ item }) => (
    <TouchableOpacity style={styles.quickFilterButton} activeOpacity={0.85}>
      <Ionicons name={item.icon} size={16} color="#6c757d" style={{ marginRight: 6 }} />
      <Text style={styles.quickFilterText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Animated.View
        style={[
          styles.headerContainer,
          {
            transform: [{ translateY: slideAnim }],
            opacity: fadeAnim,
          },
        ]}
      >
        <Text style={styles.headerTitle}>Discover</Text>
        <Text style={styles.headerSubtitle}>Find amazing places around you</Text>
      </Animated.View>

      {/* Search Box */}
      <Animated.View
        style={[
          styles.searchContainer,
          {
            transform: [{ translateY: slideAnim }],
            opacity: fadeAnim,
          },
        ]}
      >
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#6c757d" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search destinations, hotels, restaurants..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#ccc" />
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          horizontal
          data={quickFilters}
          renderItem={renderQuickFilter}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Browse Categories</Text>
        </View>
        <FlatList
          horizontal
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 24 }}
        />

        {/* Popular Destinations */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Destinations</Text>
        </View>
        <FlatList
          horizontal
          data={popularDestinations}
          renderItem={renderDestination}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 24 }}
        />

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <>
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
            />
          </>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },

  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2c3e50',
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6c757d',
    marginTop: 4,
  },

  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#f1f3f5',
    borderRadius: 14,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#2c3e50',
  },

  quickFilterButton: {
    flexDirection: 'row',
    backgroundColor: '#f1f3f5',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    marginRight: 10,
    alignItems: 'center',
  },
  quickFilterText: {
    fontSize: 13,
    color: '#6c757d',
    fontWeight: '600',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2c3e50',
  },
  clearAllText: {
    fontSize: 14,
    color: '#ff6b6b',
    fontWeight: '600',
  },

  categoryCard: {
    width: 120,
    height: 120,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  selectedCategory: {
    transform: [{ scale: 1.05 }],
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },

  destinationCard: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
  },
  destinationImagePlaceholder: {
    height: 110,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  destinationName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2c3e50',
  },
  destinationSubtitle: {
    fontSize: 13,
    color: '#6c757d',
    padding: 10,
    fontWeight: '600',
  },

  recentSearchItem: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  recentSearchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  recentSearchIconContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  recentSearchText: {
    fontSize: 15,
    color: '#2c3e50',
    fontWeight: '600',
    flex: 1,
  },
  clearButton: {
    padding: 4,
  },
});

export default SearchScreen;
