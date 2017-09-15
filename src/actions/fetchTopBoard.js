export const REQUEST_TOP = 'REQUEST_TOP'
export const RECEIVE_TOP = 'RECEIVE_TOP'

export const requestPosts = (catBoard) => ({
  type: REQUEST_TOP,  
  catBoard
})

export const receivePosts = (catBoard, json) => ({  
  type: RECEIVE_TOP,  
  catBoard,
  posts: json.data.children.map(child => child.data),
  after: json.data.after,
  receivedAt: Date.now()
})

export const fecthBoard = (topBoard, catBoard) => {
  return (dispatch) => {
    dispatch(requestPosts(catBoard))    
    return fetch(`https://www.reddit.com/r/${catBoard}/${topBoard}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(catBoard, json)))
  }
}

const shouldFetchPosts = (state, topBoard, catBoard) => {
  const posts = state.boardByReddit[catBoard]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false    
  }
  return posts.didInvalidate
}

export const fetchPostsAfterIfNeeded = (topBoard, catBoard) => {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), topBoard, catBoard)) {
      return dispatch(fecthBoard(topBoard, catBoard))
    }
    return dispatch(fecthBoard(topBoard, catBoard))
  }
}
