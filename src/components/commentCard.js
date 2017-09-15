import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Avatar } from 'react-native-elements';
import Timestamp from 'react-timestamp';

const CommentCard = (props) => {
  //console.log('pop5 ', props)
  const { user, time, comment } = props
  return (
    <View style={styles.container}>
      <View style={styles.wrapCard}>  
        <View style={styles.wrapLine}></View> 
        <Avatar
          small
          rounded
          source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
          containerStyle={{marginTop: 5}}
        />     
        <View style={styles.wrapColumn}>        
          <View style={styles.wrapRow}>          
            <Text style={styles.text}>{user}</Text>
            <Timestamp time={time} format='ago' component={Text} style={styles.text}/>
          </View>                  
          <Text style={styles.textComment}>{comment}</Text>
        </View>
      </View>
    </View>
  );
};

const { height, width } = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  wrapCard :{
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: 5,   
    flexDirection: 'row',   
  },
  wrapRow: {
    flexDirection: 'row', 
  },
  text: {
    color: '#738585',
    fontSize : 12,
    marginRight: 20
  },
  textComment: {
    display: 'flex',
    fontSize: 14,
    paddingRight: 10,
    marginTop: 5,
    color: '#738585',
    flexWrap: 'wrap',
    width: width-75,
  },
  wrapColumn: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  wrapLine: {
    width: 5,
    backgroundColor: '#c9ddfc',
    paddingLeft: 0,
    marginRight: 10,
  }
});

export default CommentCard;
