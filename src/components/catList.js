import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  FlatList,
  ImageBackground
} from 'react-native';
import { 
  List, 
  ListItem
} from 'react-native-elements';
import { fetchCatIfNeeded } from '../actions/fetchCatagorie'
import { fetchPostsIfNeeded } from '../actions'
import { connect } from 'react-redux'
import Loading from '../components/loading';
import { fetchCatAfterIfNeeded } from '../actions/fetchAfterCatagorie';

class CatList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCatIfNeeded())
  }

  hadelClickCat = (displayName) => {
    this.props.dispatch(fetchPostsIfNeeded(displayName))
  }

  _keyExtractor = (item, index) => index;
  
  _renderItem = ({item}) => { 
    return (
      <ListItem
        title={item.display_name}
        hideChevron={true}
        style={styles.listItems}
        onPress={() => this.hadelClickCat(item.display_name)}
      />
    )
  }

  _onEndReached = (afterCat) => {
    this.props.dispatch(fetchCatAfterIfNeeded(afterCat))
  }

  render() {        
    return (
      <View style={styles.listcat}>
        { this.props.isFetching ? <Loading /> : null }
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0 }}>
          <FlatList
            data={this.props.itemsCat}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            horizontal={true}  
            style={styles.flatList}     
            showsHorizontalScrollIndicator={false}  
            onEndReached={ () => this._onEndReached(this.props.after) }       
          />
        </List>
      </View>
    );
  }  
}

const styles = StyleSheet.create({
  listcat: {
    display: 'flex',
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 60
  },
  flatList: {
    flexDirection: 'row',
    padding: 10,
  },
  listItems: {
    paddingVertical: 10,
    borderColor: '#738585',
    borderStyle: 'solid',
    borderWidth: 0.5,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
    borderRadius: 10,
    paddingLeft: 0,
    paddingRight: 20,
  }
});

const mapStateToProps = state => {  
  const { catByReddit } = state
  const { 
    isFetching, 
    lastUpdated, 
    itemsCat, 
    didInvalidate,
    after
  } = catByReddit || { isFetching: true, itemsCat: [] }
  return {    
    itemsCat,
    isFetching,
    lastUpdated,
    didInvalidate,
    after
  }
}

export default connect(mapStateToProps)(CatList)
