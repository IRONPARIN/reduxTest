export const REQUEST_AFTER = 'REQUEST_AFTER'
export const RECEIVE_AFTER = 'RECEIVE_AFTER'
export const INVALIDATE_AFTER = 'INVALIDATE_AFTER'

export const invalidateReddit = (getAfter, catBoard) => ({
  type: INVALIDATE_AFTER,
  getAfter, 
  catBoard
})

export const requestPosts = (getAfter, catBoard) => ({
  type: REQUEST_AFTER,
  getAfter, 
  catBoard
})

export const receivePosts = (getAfter, catBoard, json) => ({  
  type: RECEIVE_AFTER,
  getAfter, 
  catBoard,
  posts: json.data.children.map(child => child.data),
  after: json.data.after,
  receivedAt: Date.now()
})

export const fecthBoard = (getAfter, catBoard) => {
  return (dispatch) => {
    dispatch(requestPosts(getAfter, catBoard))    
    return fetch(`https://www.reddit.com/r/${catBoard}/.json?after=${getAfter}`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(getAfter, catBoard, json)))
  }
}

const shouldFetchPosts = (state, getAfter, catBoard) => {
  const posts = state.boardByReddit[getAfter, catBoard]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false    
  }
  return posts.didInvalidate
}

export const fetchPostsAfterIfNeeded = (getAfter, catBoard) => {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), getAfter, catBoard)) {
      return dispatch(fecthBoard(getAfter, catBoard))
    }
    return dispatch(fecthBoard(getAfter, catBoard))
  }
}
