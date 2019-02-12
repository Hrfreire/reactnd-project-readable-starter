export const START_FETCH_POSTS = 'START_FETCH_POSTS'
export const SUCCESS_FETCH_POSTS = 'SUCCESS_FETCH_POSTS'
export const FAILED_FETCH_POSTS = 'FAILED_FETCH_POSTS'

export const START_FETCH_POST = 'START_FETCH_POST'
export const SUCCESS_FETCH_POST = 'SUCCESS_FETCH_POST'
export const FAILED_FETCH_POST = 'FAILED_FETCH_POST'

export const START_REGISTER_VOTE  = 'START_REGISTER_VOTE'
export const SUCCESS_REGISTER_VOTE = 'SUCCESS_REGISTER_VOTE'
export const FAILED_REGISTER_VOTE = 'FAILED_REGISTER_VOTE' 

export const START_CREATE_NEW_POST = 'START_CREATE_NEW_POST'
export const SUCCESS_CREATE_NEW_POST = 'SUCCESS_CREATE_NEW_POST'
export const FAILED_CREATE_NEW_POST = 'FAILED_CREATE_NEW_POST'
export const RESET_NEW_POST_STATE = 'RESET_NEW_POST_STATE'

function startFetchPosts (filter) {
  return {
    type: START_FETCH_POSTS,
    filter
  }
}

function successFetchPosts (posts) {
  return {
    type: SUCCESS_FETCH_POSTS,
    payload: posts
  }
}

function failedFetchPosts (error) {
  return {
    type: FAILED_FETCH_POSTS,
    error
  }
}

function startFetchPost (postId) {
  return {
    type: START_FETCH_POST,
    postId
  }
}

function successFetchPost (post) {
  return {
    type: SUCCESS_FETCH_POST,
    payload: post
  }
}

function failedFetchPost (error) {
  return {
    type: FAILED_FETCH_POST,
    error
  }
}

function startRegisterVote (postId, vote) {
  return {
    type: START_REGISTER_VOTE,
    postId,
    vote
  }
}

function successRegisterVote (post) {
  return {
    type: SUCCESS_REGISTER_VOTE,
    payload: post
  }
}

function failedRegisterVote (error, postId, vote) {
  return {
    type: FAILED_REGISTER_VOTE,
    error,
    postId,
    vote
  }
}

function startCreateNewPost ({ title, body, author, category }) {
  return {
    type: START_CREATE_NEW_POST,
    title,
    body,
    author,
    category
  }
}

function successCreateNewPost (post) {
  return {
    type: SUCCESS_CREATE_NEW_POST,
    payload: post
  }
}

function failedCreateNewPost (error) {
  return {
    type: FAILED_CREATE_NEW_POST,
    error
  }
}

function resetNewPostState () {
  return {
    type: RESET_NEW_POST_STATE
  }
}

export const actionCreators = {
  startFetchPosts,
  successFetchPosts,
  failedFetchPosts,

  startFetchPost,
  successFetchPost,
  failedFetchPost,

  startRegisterVote,
  successRegisterVote,
  failedRegisterVote,

  startCreateNewPost,
  successCreateNewPost,
  failedCreateNewPost,
  resetNewPostState
}