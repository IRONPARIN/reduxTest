export const REQUEST_COM = 'REQUEST_COM'
export const RECEIVE_COM = 'RECEIVE_COM'
export const INVALIDATE_COM = 'INVALIDATE_COM'

export const requestCom = (comment) => ({
  type: REQUEST_COM,
  comment
})

export const receiveCom = (json, comment) => ({  
  type: RECEIVE_COM,
  comment,
  posts: json[1].data.children.map(child => child.data),
  receivedAt: Date.now()
})

export const fecthComment = (comment) => {
  return (dispatch) => {
    dispatch(requestCom(comment))    
    return fetch(`https://www.reddit.com${comment}.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveCom(json, comment)))
  }
}

const shouldFetchCom = (state, comment) => {
  const posts = state.commentByReddit[comment]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchCommentIfNeeded = (comment) => {
  return (dispatch, getState) => {
    if (shouldFetchCom(getState(), comment)) {
      return dispatch(fecthComment(comment))
    }
    return dispatch(fecthComment(comment))
  }
}