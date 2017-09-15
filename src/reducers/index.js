import { combineReducers } from 'redux'
import {
  REQUEST_POSTS, 
  RECEIVE_POSTS,
  INVALIDATE_REDDIT
} from '../actions'
import { 
  RECEIVE_CAT,
  REQUEST_CAT 
} from '../actions/fetchCatagorie';
import {
  RECEIVE_DETAIL,
  INVALIDATE_DETAIL,
  REQUEST_DETAIL
} from '../actions/fetchDetail';
import {
  RECEIVE_COM,
  REQUEST_COM,
  INVALIDATE_COM
} from '../actions/fetchComment';
import {
  RECEIVE_AFTER,
  REQUEST_AFTER,
  INVALIDATE_AFTER
} from '../actions/fetchAfterBoard';
import {
  RECEIVE_AFTERCAT,
  REQUEST_AFTERCAT,
  INVALIDATE_AFTERCAT
} from '../actions/fetchAfterCatagorie';

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_REDDIT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt,
        after: action.after
      }
    case REQUEST_AFTER:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_AFTER:
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: [...state.items, ...action.posts],
      lastUpdated: action.receivedAt,
      after: action.after
    }
    default:
      return state
  }
}

const boardByReddit = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_REDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
    case RECEIVE_AFTER:
    case REQUEST_AFTER:
    case INVALIDATE_AFTER:
      return {
        ...state,
        catBoard: action.catBoard,
        [action.catBoard]: posts(state[action.catBoard], action)
      }
    default:
      return state
  }
}

const detail = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_DETAIL:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_DETAIL:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_DETAIL:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const detailByReddit = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_DETAIL:
    case RECEIVE_DETAIL:
    case REQUEST_DETAIL:
      return {
        ...state,
        [action.dataName]: detail(state[action.dataName], action)
      }
    default:
      return state
  }
}

const commentData = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_COM:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_COM:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_COM:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const commentByReddit = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_COM:
    case RECEIVE_COM:
    case REQUEST_COM:
      return {
        ...state,
        [action.comment]: commentData(state[action.comment], action)
      }
    default:
      return state
  }
}

const catByReddit = (state = {
  isFetching: false,
  didInvalidate: false,
  itemsCat: []
}, action) => {
  switch (action.type) {
    case REQUEST_CAT:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_CAT:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        itemsCat: action.posts,
        lastUpdated: action.receivedAt
      }
    case REQUEST_AFTERCAT:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_AFTERCAT:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        itemsCat: [ ...state.itemsCat, ...action.posts],
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  boardByReddit,
  catByReddit,
  detailByReddit,
  commentByReddit,
})

export default rootReducer
