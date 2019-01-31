export const START_FETCH_POSTS = 'START_FETCH_POSTS'
export const SUCCESS_FETCH_POSTS = 'SUCCESS_FETCH_POSTS'
export const FAILED_FETCH_POSTS = 'FAILED_FETCH_POSTS'

export const START_REGISTER_VOTE  = 'START_REGISTER_VOTE'
export const SUCCESS_REGISTER_VOTE = 'SUCCESS_REGISTER_VOTE'
export const FAILED_REGISTER_VOTE = 'FAILED_REGISTER_VOTE' 

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

export const actionCreators = {
  startFetchPosts,
  successFetchPosts,
  failedFetchPosts,

  startRegisterVote,
  successRegisterVote,
  failedRegisterVote
}