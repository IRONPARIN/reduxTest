import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { assign } from 'lodash';
import DetailItem from './ItemDetail.js';
import CommentItem from './commentItem';
import { connect } from 'react-redux'
import Loading from '../components/loading';
import { fetchDetailIfNeeded } from '../actions/fetchDetail';

class Detail extends Component {
  componentDidMount() {
    const { dispatch, dataName } = this.props
    dispatch(fetchDetailIfNeeded(dataName))
  }

  render() { 
    const dataItem = this.props.items
    const img = dataItem && dataItem[0] && dataItem[0].preview ? dataItem[0].preview.images[0].source.url : null
    return ( 
      <View style={styles.container}>
        <ScrollView>
          { this.props.isFetching ? <Loading /> : null }
          { dataItem && dataItem[0] ?  
            <DetailItem 
              image={img}
              title={dataItem[0].title}
              score={dataItem[0].score}
              user={dataItem[0].author}
              date={dataItem[0].created}
              numComment={dataItem[0].num_comments}
            />      
            : null
          }
          <CommentItem 
            comment={this.props.comment}
          />
        </ScrollView>
      </View>
    )
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

const mapStateToProps = (state, ownProps) => {
  const { detailByReddit } = state
  console.log('dd : ',detailByReddit)
  const { 
    isFetching, 
    lastUpdated, 
    items, 
    didInvalidate 
  } = detailByReddit[ownProps.dataName] || { isFetching: true, itemsDetail: [] }  
  return {    
    isFetching, 
    lastUpdated, 
    items, 
    didInvalidate 
  }
}

export default connect(mapStateToProps)(Detail);
