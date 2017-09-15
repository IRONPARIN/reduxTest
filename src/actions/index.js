export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

export const invalidateReddit = (catBoard) => ({
  type: INVALIDATE_REDDIT,
  catBoard
})

export const requestPosts = (catBoard) => ({
  type: REQUEST_POSTS,
  catBoard
})

export const receivePosts = (catBoard, json) => ({  
  type: RECEIVE_POSTS,
  catBoard,
  posts: json.data.children.map(child => child.data),
  after: json.data.after,
  receivedAt: Date.now()
})

export const fecthBoard = (catBoard) => {
  console.log('$catboard', catBoard)
  return (dispatch) => {
    dispatch(requestPosts(catBoard))    
    return fetch(`https://www.reddit.com/r/${catBoard}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(catBoard, json)))
  }
}

const shouldFetchPosts = (state, catBoard) => {
  const type = state.boardByReddit.catBoard
  const posts = state.boardByReddit[type]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false    
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded = (catBoard) => {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), catBoard)) {
      return dispatch(fecthBoard(catBoard))
    }
    return dispatch(fecthBoard(catBoard))
  }
}
