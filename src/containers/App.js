import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux'
import { } from '../actions';
import { Router, Scene } from 'react-native-router-flux';
import { Board, Detail } from '../components';

class App extends Component {  
  render() {
    const { count, minus } = this.props
    return (
      <Router>
        <Scene>
          <Scene key="Board" component={Board} title="Board" initial />
          <Scene key="Detail" component={Detail} title="Detail"  />
        </Scene>
      </Router>
    );
  }
}

export default App
