export const REQUEST_AFTERCAT = 'REQUEST_AFTERCAT'
export const RECEIVE_AFTERCAT = 'RECEIVE_AFTERCAT'
export const INVALIDATE_AFTERCAT = 'INVALIDATE_AFTERCAT'

export const invalidateReddit = (afterCat) => ({
  type: INVALIDATE_AFTERCAT
})

export const requestPosts = (afterCat) => ({
  type: REQUEST_AFTERCAT
})

export const receivePosts = (afterCat, json) => ({  
  type: RECEIVE_AFTERCAT,
  posts: json.data.children.map(child => child.data),
  after: json.data.after,
  receivedAt: Date.now()
})

export const fecthBoard = (afterCat) => {
  return (dispatch) => {
    dispatch(requestPosts(afterCat))    
    return fetch(`https://www.reddit.com/subreddits.json?after=${afterCat}`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(afterCat, json)))
  }
}

const shouldFetchPosts = (state, afterCat) => {
  const posts = state.boardByReddit[afterCat]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false    
  }
  return posts.didInvalidate
}

export const fetchCatAfterIfNeeded = (afterCat) => {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), afterCat)) {
      return dispatch(fecthBoard(afterCat))
    }
    return dispatch(fecthBoard(afterCat))
  }
}
