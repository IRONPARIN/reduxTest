export const REQUEST_CAT = 'REQUEST_CAT'
export const RECEIVE_CAT = 'RECEIVE_CAT'

export const requestCat = () => ({
  type: REQUEST_CAT
})

export const receiveCat = (json) => ({  
  type: RECEIVE_CAT,
  posts: json.data.children.map(child => child.data),
  after: json.data.after,
  receivedAt: Date.now()
})

export const fecthCat = () => {
  return (dispatch) => {
    dispatch(requestCat())    
    return fetch(`https://www.reddit.com/subreddits.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveCat(json)))
  }
}

const shouldFetchCat = (state) => {
  const posts = state.catByReddit
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchCatIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldFetchCat(getState())) {
      return dispatch(fecthCat())
    }
    return dispatch(fecthCat())
  }
}