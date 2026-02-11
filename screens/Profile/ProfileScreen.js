import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getStoredUser } from '../../services/auth';
import { useAuth } from '../../contexts/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const { logout: authLogout } = useAuth();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await getStoredUser();
      setUser(userData || {
        fullName: 'John Doe',
        email: 'john@example.com',
        phoneNo: '+919876543210'
      });
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await authLogout();
              // The navigation will be handled by the context state change
            } catch (error) {
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          }
        }
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Coming Soon', 'Profile editing will be available in the next update.');
  };

  const handleMyBookings = () => {
    navigation.navigate('BookingsStack');
  };

  const handleSupport = () => {
    Alert.alert('Support', 'Contact us at support@patilassociates.com');
  };

  const handlePrivacyPolicy = () => {
    Alert.alert('Privacy Policy', 'Privacy policy information will be shown here.');
  };

  const handleTermsOfService = () => {
    Alert.alert('Terms of Service', 'Terms of service information will be shown here.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
          <Text style={styles.profileName}>{user?.fullName || 'User Name'}</Text>
          <Text style={styles.profileEmail}>{user?.email || 'user@example.com'}</Text>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={handleEditProfile}
            activeOpacity={0.8}
          >
            <View style={styles.menuItemContent}>
              <View style={styles.menuItemLeft}>
                <Ionicons name="person-outline" size={20} color="#6c757d" style={styles.menuItemIcon} />
                <Text style={styles.menuItemText}>Edit Profile</Text>
              </View>
              <Text style={styles.menuItemArrow}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={handleMyBookings}
            activeOpacity={0.8}
          >
            <View style={styles.menuItemContent}>
              <View style={styles.menuItemLeft}>
                <Ionicons name="calendar-outline" size={20} color="#6c757d" style={styles.menuItemIcon} />
                <Text style={styles.menuItemText}>My Bookings</Text>
              </View>
              <Text style={styles.menuItemArrow}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={handleSupport}
            activeOpacity={0.8}
          >
            <View style={styles.menuItemContent}>
              <View style={styles.menuItemLeft}>
                <Ionicons name="help-circle-outline" size={20} color="#6c757d" style={styles.menuItemIcon} />
                <Text style={styles.menuItemText}>Help & Support</Text>
              </View>
              <Text style={styles.menuItemArrow}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={handlePrivacyPolicy}
            activeOpacity={0.8}
          >
            <View style={styles.menuItemContent}>
              <View style={styles.menuItemLeft}>
                <Ionicons name="lock-closed-outline" size={20} color="#6c757d" style={styles.menuItemIcon} />
                <Text style={styles.menuItemText}>Privacy Policy</Text>
              </View>
              <Text style={styles.menuItemArrow}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, styles.lastMenuItem]} 
            onPress={handleTermsOfService}
            activeOpacity={0.8}
          >
            <View style={styles.menuItemContent}>
              <View style={styles.menuItemLeft}>
                <Ionicons name="document-text-outline" size={20} color="#6c757d" style={styles.menuItemIcon} />
                <Text style={styles.menuItemText}>Terms of Service</Text>
              </View>
              <Text style={styles.menuItemArrow}>›</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.logoutContainer}>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    textAlign: 'center',
  },
  profileSection: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 40,
    marginBottom: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: '700',
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#6c757d',
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
  },
  menuItemArrow: {
    fontSize: 20,
    color: '#6c757d',
  },
  logoutContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#dc3545',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;