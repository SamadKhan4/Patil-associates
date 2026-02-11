import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import { isTablet, isSmallDevice, responsivePadding, scaleSize, getGridColumns, getColumnWidth, getDeviceType } from '../utils/Responsive';

const ResponsiveContainer = ({ children, style, ...props }) => {
  const { width, height } = useWindowDimensions();
  
  const containerStyles = [
    styles.baseContainer,
    isTablet && styles.tabletContainer,
    isSmallDevice && styles.smallDeviceContainer,
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
    isTablet && styles.tabletCard,
    isSmallDevice && styles.smallDeviceCard,
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
    isSmallDevice && styles.smallDeviceText,
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
    isTablet && styles.tabletButton,
    isSmallDevice && styles.smallDeviceButton,
    style
  ];

  return (
    <TouchableOpacity style={buttonStyles} {...props}>
      {children}
    </TouchableOpacity>
  );
};

// Enhanced responsive components for specific use cases
const ResponsiveGrid = ({ children, columns, gap = 16, style }) => {
  const deviceColumns = columns || getGridColumns();
  const columnWidth = getColumnWidth(deviceColumns, gap);
  
  const gridStyles = [
    styles.gridContainer,
    { 
      flexDirection: deviceColumns > 1 ? 'row' : 'column',
      flexWrap: deviceColumns > 1 ? 'wrap' : 'nowrap',
      marginHorizontal: -gap/2
    },
    style
  ];

  const modifiedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        style: [
          child.props.style,
          {
            width: deviceColumns > 1 ? columnWidth : '100%',
            marginHorizontal: gap/2,
            marginBottom: gap
          }
        ]
      });
    }
    return child;
  });

  return (
    <View style={gridStyles}>
      {modifiedChildren}
    </View>
  );
};

const ResponsiveTabBar = ({ tabs, activeTab, onTabPress, style }) => {
  const isLargeScreen = isTablet || getDeviceType() === 'lg';
  
  const tabBarStyles = [
    styles.tabBar,
    isLargeScreen && styles.tabletTabBar,
    style
  ];

  const tabButtonStyles = (isActive) => [
    styles.tabButton,
    isLargeScreen && styles.tabletTabButton,
    isActive && [styles.activeTabButton, isLargeScreen && styles.tabletActiveTabButton]
  ];

  const tabTextStyles = (isActive) => [
    styles.tabText,
    isLargeScreen && styles.tabletTabText,
    isActive && [styles.activeTabText, isLargeScreen && styles.tabletActiveTabText]
  ];

  return (
    <View style={tabBarStyles}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={tabButtonStyles(activeTab === tab.id)}
          onPress={() => onTabPress(tab.id)}
          activeOpacity={0.7}
        >
          <Text style={tabTextStyles(activeTab === tab.id)}>
            {tab.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const ResponsiveListItem = ({ children, style, ...props }) => {
  const listItemStyles = [
    styles.listItem,
    isTablet && styles.tabletListItem,
    isSmallDevice && styles.smallDeviceListItem,
    style
  ];

  return (
    <View style={listItemStyles} {...props}>
      {children}
    </View>
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
  
  // Grid styles
  gridContainer: {
    width: '100%',
  },
  
  // Tab bar styles
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: responsivePadding(12),
    paddingHorizontal: responsivePadding(16),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabletTabBar: {
    paddingVertical: responsivePadding(16),
    paddingHorizontal: responsivePadding(24),
  },
  tabButton: {
    flex: 1,
    paddingVertical: responsivePadding(10),
    paddingHorizontal: responsivePadding(8),
    alignItems: 'center',
    borderRadius: scaleSize(8),
  },
  tabletTabButton: {
    paddingVertical: responsivePadding(12),
    paddingHorizontal: responsivePadding(12),
  },
  activeTabButton: {
    backgroundColor: '#007AFF',
  },
  tabletActiveTabButton: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: scaleSize(14),
    color: '#666',
    fontWeight: '500',
  },
  tabletTabText: {
    fontSize: scaleSize(16),
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  tabletActiveTabText: {
    color: '#fff',
  },
  
  // List item styles
  listItem: {
    backgroundColor: '#fff',
    padding: responsivePadding(16),
    marginVertical: responsivePadding(4),
    borderRadius: scaleSize(8),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  tabletListItem: {
    padding: responsivePadding(20),
    marginVertical: responsivePadding(6),
    borderRadius: scaleSize(12),
  },
  smallDeviceListItem: {
    padding: responsivePadding(12),
    marginVertical: responsivePadding(3),
    borderRadius: scaleSize(6),
  },
});

export { 
  ResponsiveContainer, 
  ResponsiveCard, 
  ResponsiveText, 
  ResponsiveButton,
  ResponsiveGrid,
  ResponsiveTabBar,
  ResponsiveListItem
};