import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements'

const buttonToTop = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
          style={styles.buttonTop}
          onPress={props.onPress}>
          <Icon
            size={25}
            color='#738585'
            name='angle-up'
            type='font-awesome' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3e5e8',
    opacity: 0.5,
    padding: 10,
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 50,
  }
});

export default buttonToTop;
