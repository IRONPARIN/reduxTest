import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

const loading = () => {
  return (
    <ActivityIndicator
      animating={true}
      style={[styles.centering, {height: 50}]}
    />
  );
};

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default loading;
