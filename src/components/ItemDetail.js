import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'
import { Icon } from 'react-native-elements'
import Timestamp from 'react-timestamp';

class DetailItem extends Component {
  render() {
    const { image, title, score, user, date, heightImg, numComment } = this.props    
    console.log('img :' ,image)
    return (
      <View style={styles.container}>
        <View style={styles.wrapCard}>
          {
            image ? 
            <Image
              style={styles.image}
              source={{uri: image}}
            /> : null
          }          
          <Text style={styles.title}>{title}</Text>              
          <View style={styles.wrapIcon}>            
            <Icon
              size={18}
              color='#738585'
              name='user-circle-o'
              type='font-awesome' />
            <Text style={styles.textIcon}>{user}</Text>  
            <Icon
              size={18}
              color='#738585'
              name='clock-o'
              type='font-awesome' />
            <Timestamp time={date} format='ago' component={Text} style={styles.textIcon}/>
            <Icon
              size={18}
              color='#738585'
              name='trophy'
              type='font-awesome' />
            <Text style={styles.textIcon}>{score}</Text>
          </View>
          <View style={styles.line}></View> 
          <View style={styles.wrapNumComment}>
            <Icon
              size={30}
              color='#738585'
              name='comment-o'
              type='font-awesome' />
            <Text style={styles.textNumCom}>{numComment} Comment</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  wrapCard: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    padding: 10,
    paddingBottom: 0,
  },
  image: {
    marginTop: 10,
    alignSelf: 'stretch',
    width: '100%',
    height: 300,
    resizeMode: 'contain'
  },
  line: {
    width: '95%',
    height: 0.5,
    backgroundColor: '#738585',
    marginLeft: 10,
    marginTop: 10,
  },
  wrapIcon: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-around',
  },
  textIcon: {
    fontSize: 12,
    color: '#738585',
  },
  wrapNumComment: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    width: '50%'
  },
  textNumCom:{
    marginLeft: 10,
    fontSize: 16,
    marginTop: 10,
    color: '#738585',
  }
});

export default DetailItem;
