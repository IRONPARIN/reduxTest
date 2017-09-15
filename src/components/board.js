import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  ListView,
  FlatList
} from 'react-native';
import { 
  List, 
  ListItem
} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import ListBoard from '../components/boardList';
import CatList from '../components/catList';
import BoardActionButton from '../components/boardActionButton';

class Board extends Component {   
  render() {
    return (
      <View style={styles.container}>
        <CatList style={styles.wrapCatList} />
        <ListBoard style={styles.wrapListBoard} />    
        <BoardActionButton />   
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  wrapCatList: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  wrapListBoard: {
    flex: 1,
    marginTop: 0,
    paddingTop: 0,
    justifyContent: 'flex-start',
  }
});

export default Board;
