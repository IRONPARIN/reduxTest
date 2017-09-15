import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { fetchTopBoardIfNeed } from '../actions/fetchTopBoard';

class BoardActionButton extends Component {
  getTopBoard = (topBoard, catBoard) => {
    this.props.dispatch(fetchTopBoardIfNeed(topBoard, catBoard))
  }

  render() {
    return (
      <ActionButton buttonColor="#E0E0E0">
      <ActionButton.Item 
        buttonColor='#DD9E8C' 
        title="Top" 
        onPress={() => this.getTopBoard('top', this.props.typeBoard)}>
        <Icon
          size={25}
          color='#fff'
          name='sort-asc'
          type='font-awesome' />
      </ActionButton.Item>
      <ActionButton.Item 
        buttonColor='#FFF1A3' 
        title="Hot" 
        onPress={() => console.log("notes tapped!")}
        >
        <Icon
          size={25}
          color='#fff'
          name='fire'
          type='font-awesome' />
      </ActionButton.Item>
      <ActionButton.Item 
        buttonColor='#AFC9BB' 
        title="New" 
        onPress={() => {}}
        >
        <Icon
          size={25}
          color='#fff'
          name='newspaper-o'
          type='font-awesome' />
      </ActionButton.Item>
      <ActionButton.Item 
        buttonColor='#BAD7F2' 
        title="Rising" 
        onPress={() => {}}>
        <Icon
          size={25}
          color='#fff'
          name='arrow-up'
          type='font-awesome' />
      </ActionButton.Item>
      <ActionButton.Item 
        buttonColor='#F2BAC9' 
        title="Random" 
        onPress={() => {}}>
        <Icon
          size={25}
          color='#fff'
          name='random'
          type='font-awesome' />
      </ActionButton.Item>
      <ActionButton.Item 
        buttonColor='#BEC5C6' 
        title="Controversial" 
        onPress={() => {}}>
        <Icon
          size={18}
          color='#fff'
          name='comments-o'
          type='font-awesome' />
      </ActionButton.Item>
    </ActionButton>
    );
  }
}

const mapStateToProps = state => {
  const { boardByReddit } = state
  const typeBoard = boardByReddit.catBoard
  return {    
    typeBoard
  }
}

export default connect(mapStateToProps)(BoardActionButton);
