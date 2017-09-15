import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements'
import Timestamp from 'react-timestamp';

class ItemBoardList extends Component {
  render() {
    const { title, avatar, name, comment, numComment, score, date, user, onPress } = this.props   
    //console.log('avatar',avatar) 
    return (         
      <TouchableHighlight onPress={onPress}>
        <View style={styles.container}>
          { 
            avatar === null ? null : 
            <Image
              style={styles.image}
              source={{uri: avatar}}
            /> 
          }          
          <Text style={styles.title} ellipsizeMode={'tail'} numberOfLines={2}>{title}</Text>
          <View style={styles.wrapIconPro}>
            <Icon
                size={18}
                color='#738585'
                name='user-circle-o'
                type='font-awesome' />
            <Text style={styles.textUser}>{user}</Text>  
            <Icon
                size={18}
                color='#738585'
                name='clock-o'
                type='font-awesome' />
            <Timestamp time={date} format='ago' component={Text} style={styles.textUser}/>
          </View>          
          <View style={styles.wrapShow}>
            <View style={styles.wrapIcon}>
              <Icon
                size={18}
                color='#738585'
                name='trophy'
                type='font-awesome' />
              <Text style={styles.textIcon}>{score}</Text>
            </View>
            <View style={styles.wrapIcon}>
              <Icon
                size={18}
                color='#738585'
                name='comment-o'
                type='font-awesome' />
              <Text style={styles.textIcon}>{numComment}</Text>
            </View>
          </View>
        </View> 
      </TouchableHighlight> 
    );       
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 10,
    paddingBottom: 0,
    marginHorizontal: 10,
    marginBottom: 10,
    borderColor: '#738585',
    borderStyle: 'solid',
    borderWidth: 0.5,
  },
  title: {
    fontSize: 15,
    textAlign: 'left',
    marginTop: 5
  },
  image: {
    alignSelf: 'stretch',    
    width: '100%',
    height: 200,
  },
  wrapShow: {
    marginTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#738585',
    borderStyle: 'solid',
    flexDirection: 'row',
  },
  wrapIcon: {
    flexDirection: 'row',
    width: '40%',
    height: 50,    
  },
  textIcon: {
    fontSize: 12,
    color: '#738585',
    marginTop: 20,
    marginLeft: 10,
  },
  wrapIconPro: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    width: '100%',
  },
  textUser: {
    fontSize: 15, 
  }
});

export default ItemBoardList;
