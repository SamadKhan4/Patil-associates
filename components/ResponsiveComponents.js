import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { isTablet, isSmallDevice, responsivePadding, scaleSize } from '../utils/Responsive';

const ResponsiveContainer = ({ children, style, ...props }) => {
  const { width, height } = useWindowDimensions();
  
  const containerStyles = [
    styles.baseContainer,
    isTablet() && styles.tabletContainer,
    isSmallDevice() && styles.smallDeviceContainer,
    style
  ];

  return (
    <View style={containerStyles} {...props}>
      {children}
    </View>
  );
};

const ResponsiveCard = ({ children, style, ...props }) => {
  const cardStyles = [
    styles.baseCard,
    isTablet() && styles.tabletCard,
    isSmallDevice() && styles.smallDeviceCard,
    style
  ];

  return (
    <View style={cardStyles} {...props}>
      {children}
    </View>
  );
};

const ResponsiveText = ({ children, style, adjustsFontSizeToFit = true, ...props }) => {
  const textStyles = [
    styles.baseText,
    isSmallDevice() && styles.smallDeviceText,
    style
  ];

  return (
    <Text 
      style={textStyles} 
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      numberOfLines={1}
      {...props}
    >
      {children}
    </Text>
  );
};

const ResponsiveButton = ({ children, style, ...props }) => {
  const buttonStyles = [
    styles.baseButton,
    isTablet() && styles.tabletButton,
    isSmallDevice() && styles.smallDeviceButton,
    style
  ];

  return (
    <TouchableOpacity style={buttonStyles} {...props}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    padding: responsivePadding(20),
  },
  tabletContainer: {
    padding: responsivePadding(30),
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  smallDeviceContainer: {
    padding: responsivePadding(15),
  },
  
  baseCard: {
    backgroundColor: '#fff',
    borderRadius: scaleSize(12),
    padding: responsivePadding(16),
    marginVertical: responsivePadding(8),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  tabletCard: {
    padding: responsivePadding(24),
    marginVertical: responsivePadding(12),
  },
  smallDeviceCard: {
    padding: responsivePadding(12),
    marginVertical: responsivePadding(6),
  },
  
  baseText: {
    fontSize: scaleSize(16),
    color: '#333',
  },
  smallDeviceText: {
    fontSize: scaleSize(14),
  },
  
  baseButton: {
    backgroundColor: '#007AFF',
    paddingVertical: responsivePadding(12),
    paddingHorizontal: responsivePadding(20),
    borderRadius: scaleSize(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabletButton: {
    paddingVertical: responsivePadding(16),
    paddingHorizontal: responsivePadding(24),
    borderRadius: scaleSize(12),
  },
  smallDeviceButton: {
    paddingVertical: responsivePadding(10),
    paddingHorizontal: responsivePadding(16),
    borderRadius: scaleSize(6),
  },
});

export { ResponsiveContainer, ResponsiveCard, ResponsiveText, ResponsiveButton };