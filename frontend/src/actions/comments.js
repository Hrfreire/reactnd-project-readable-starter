export const START_FETCH_COMMENTS = 'START_FETCH_COMMENTS'
export const SUCCESS_FETCH_COMMENTS = 'SUCCESS_FETCH_COMMENTS'
export const FAILED_FETCH_COMMENTS = 'FAILED_FETCH_COMMENTS'

export const START_REGISTER_COMMENT_VOTE  = 'START_REGISTER_COMMENT_VOTE'
export const SUCCESS_REGISTER_COMMENT_VOTE = 'SUCCESS_REGISTER_COMMENT_VOTE'
export const FAILED_REGISTER_COMMENT_VOTE = 'FAILED_REGISTER_COMMENT_VOTE' 

function startFetchComments (postId) {
  return {
    type: START_FETCH_COMMENTS,
    postId
  }
}

function successFetchComments (comments) {
  return {
    type: SUCCESS_FETCH_COMMENTS,
    payload: comments
  }
}

function failedFetchComments (error) {
  return {
    type: FAILED_FETCH_COMMENTS,
    error
  }
}

function startRegisterCommentVote (commentId, vote) {
  return {
    type: START_REGISTER_COMMENT_VOTE,
    commentId,
    vote
  }
}

function successRegisterCommentVote (post) {
  return {
    type: SUCCESS_REGISTER_COMMENT_VOTE,
    payload: post
  }
}

function failedRegisterCommentVote (error, postId, vote) {
  return {
    type: FAILED_REGISTER_COMMENT_VOTE,
    error,
    postId,
    vote
  }
}

export const actionCreators = {
  startFetchComments,
  successFetchComments,
  failedFetchComments,

  startRegisterCommentVote,
  successRegisterCommentVote,
  failedRegisterCommentVote
}