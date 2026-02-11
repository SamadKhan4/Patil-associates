import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../../components/Button';

const SearchBookingScreen = ({ route, navigation }) => {
  const { id, type, detailData } = route.params;
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [guests, setGuests] = useState(2);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    setLoading(true);
    try {
      // Format date and time for API
      const formattedDate = date.toISOString().split('T')[0];
      const formattedTime = time.toTimeString().substring(0, 5);
      
      // Prepare booking data based on type
      let bookingData;
      switch (type) {
        case 'restaurant':
          bookingData = {
            partySize: parseInt(guests),
            bookingDate: formattedDate,
            bookingTime: formattedTime,
            specialRequests: '',
            bookingType: 'table'
          };
          break;
        case 'hotel':
          bookingData = {
            roomId: id,
            checkInDate: formattedDate,
            checkOutDate: formattedDate, // You'd likely have separate checkIn and checkOut dates
            numberOfGuests: parseInt(guests),
            guestName: 'Guest Name', // Would come from user profile
            guestEmail: 'guest@email.com', // Would come from user profile
            guestPhone: '+919876543210' // Would come from user profile
          };
          break;
        case 'property':
          bookingData = {
            propertyId: id,
            listingType: 'inquiry',
            customerInfo: {
              name: 'Guest Name',
              email: 'guest@email.com',
              phone: '+919876543210',
              message: 'Interested in viewing this property'
            }
          };
          break;
        default:
          bookingData = {};
      }

      // Make API call to create booking
      // const response = await createBooking(type, bookingData);
      
      // For now, showing a success alert
      Alert.alert(
        'Booking Confirmed',
        `Your booking has been confirmed!`,
        [{ text: 'OK', onPress: () => navigation.popToTop() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create booking. Please try again.');
      console.error('Booking error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const formatDateTime = (dateObj) => {
    return dateObj.toLocaleDateString();
  };

  const formatTime = (dateObj) => {
    return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Now</Text>
        <View style={styles.spacer} />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Booking Details</Text>
        
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>{detailData?.title || detailData?.roomType || `Booking #${id}`}</Text>
          <Text style={styles.detailSubtitle}>
            {type === 'restaurant' ? `Table for ${detailData?.partySize || guests}` : 
             type === 'hotel' ? `Room ${detailData?.roomNumber}` : 
             'Property Booking'}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Select Date & Time</Text>
        
        <View style={styles.inputGroup}>
          <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
            <Text style={styles.dateButtonText}>Date: {formatDateTime(date)}</Text>
          </TouchableOpacity>
          
          {type !== 'property' && (
            <TouchableOpacity style={styles.dateButton} onPress={showTimepicker}>
              <Text style={styles.dateButtonText}>Time: {formatTime(time)}</Text>
            </TouchableOpacity>
          )}
          
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
              minimumDate={new Date()}
            />
          )}
          
          {showTimePicker && type !== 'property' && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              onChange={onChangeTime}
            />
          )}
        </View>

        <Text style={styles.sectionTitle}>Number of Guests</Text>
        <View style={styles.guestSelector}>
          <TouchableOpacity 
            style={styles.guestButton} 
            onPress={() => setGuests(Math.max(1, guests - 1))}
          >
            <Text style={styles.guestButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.guestCount}>{guests}</Text>
          <TouchableOpacity 
            style={styles.guestButton} 
            onPress={() => setGuests(guests + 1)}
          >
            <Text style={styles.guestButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <Button 
          title="Confirm Booking" 
          onPress={handleBooking}
          disabled={loading}
          style={styles.bookButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
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
  content: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 15,
  },
  detailCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  detailSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  guestSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  guestButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  guestCount: {
    fontSize: 18,
    marginHorizontal: 20,
    color: '#333',
  },
  bookButton: {
    marginTop: 20,
  },
});

export default SearchBookingScreen;