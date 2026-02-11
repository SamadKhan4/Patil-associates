import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recentSearches, setRecentSearches] = useState([
    'Delhi', 'Mumbai', 'Bangalore', 'Restaurant in Delhi', 'Budget Hotel'
  ]);

  const categories = [
    { id: 'restaurant', name: 'Restaurant & Bar', icon: 'restaurant' },
    { id: 'hotel', name: 'Hotels', icon: 'bed' },
    { id: 'property', name: 'Properties', icon: 'home' },
  ];

  const popularDestinations = [
    { id: '1', title: 'Delhi', subtitle: '250+ Options' },
    { id: '2', title: 'Mumbai', subtitle: '180+ Options' },
    { id: '3', title: 'Bangalore', subtitle: '120+ Options' },
    { id: '4', title: 'Goa', subtitle: '90+ Options' },
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

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        selectedCategory === item.id && styles.selectedCategory
      ]}
      onPress={() => setSelectedCategory(selectedCategory === item.id ? null : item.id)}
      activeOpacity={0.8}
    >
      <Ionicons name={item.icon} size={32} color={selectedCategory === item.id ? '#fff' : '#2c3e50'} />
      <Text style={[
        styles.categoryName,
        selectedCategory === item.id && styles.selectedCategoryText
      ]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderDestination = ({ item }) => (
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
      <Text style={styles.destinationName}>{item.title}</Text>
      <Text style={styles.destinationSubtitle}>{item.subtitle}</Text>
    </TouchableOpacity>
  );

  const renderRecentSearch = ({ item }) => (
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
        <Ionicons name="time-outline" size={16} color="#6c757d" style={styles.recentSearchIcon} />
        <Text style={styles.recentSearchText}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Search</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search destinations, hotels, restaurants..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            placeholderTextColor="#6c757d"
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch} activeOpacity={0.8}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
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

        <Text style={styles.sectionTitle}>Popular Destinations</Text>
        <FlatList
          horizontal
          data={popularDestinations}
          renderItem={renderDestination}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          style={styles.destinationsList}
          contentContainerStyle={styles.destinationsContainer}
        />

        <Text style={styles.sectionTitle}>Recent Searches</Text>
        <FlatList
          data={recentSearches}
          renderItem={renderRecentSearch}
          keyExtractor={(item, index) => index.toString()}
          style={styles.recentSearchesList}
          contentContainerStyle={styles.recentSearchesContainer}
        />
      </View>
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
  searchContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#2c3e50',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
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
    width: 110,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  selectedCategory: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryName: {
    fontSize: 14,
    textAlign: 'center',
    color: '#2c3e50',
    fontWeight: '600',
    marginTop: 8,
  },
  selectedCategoryText: {
    color: '#fff',
  },
  destinationsList: {
    height: 100,
  },
  destinationsContainer: {
    paddingRight: 15,
  },
  destinationCard: {
    width: 120,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginRight: 15,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
  },
  destinationSubtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
  },
  recentSearchesList: {
    flex: 1,
  },
  recentSearchesContainer: {
    paddingBottom: 20,
  },
  recentSearchItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  recentSearchContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentSearchIcon: {
    marginRight: 10,
  },
  recentSearchText: {
    fontSize: 16,
    color: '#2c3e50',
  },
});

export default SearchScreen;