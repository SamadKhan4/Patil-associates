import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const Loader = ({ loading, children, message = 'Loading...' }) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    );
  }

  return children;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});

export default Loader;