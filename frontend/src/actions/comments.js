export const START_FETCH_COMMENTS = 'START_FETCH_COMMENTS'
export const SUCCESS_FETCH_COMMENTS = 'SUCCESS_FETCH_COMMENTS'
export const FAILED_FETCH_COMMENTS = 'FAILED_FETCH_COMMENTS'

export const START_REGISTER_COMMENT_VOTE  = 'START_REGISTER_COMMENT_VOTE'
export const SUCCESS_REGISTER_COMMENT_VOTE = 'SUCCESS_REGISTER_COMMENT_VOTE'
export const FAILED_REGISTER_COMMENT_VOTE = 'FAILED_REGISTER_COMMENT_VOTE' 

export const START_CREATE_NEW_COMMENT = 'START_CREATE_NEW_COMMENT'
export const SUCCESS_CREATE_NEW_COMMENT = 'SUCCESS_CREATE_NEW_COMMENT'
export const FAILED_CREATE_NEW_COMMENT = 'FAILED_CREATE_NEW_COMMENT'

export const START_DELETE_COMMENT = 'START_DELETE_COMMENT'
export const SUCCESS_DELETE_COMMENT = 'SUCCESS_DELETE_COMMENT'
export const FAILED_DELETE_COMMENT = 'FAILED_DELETE_COMMENT'

export const START_EDIT_COMMENT = 'START_EDIT_COMMENT'
export const SUCCESS_EDIT_COMMENT = 'SUCCESS_EDIT_COMMENT'
export const FAILED_EDIT_COMMENT = 'FAILED_EDIT_COMMENT'

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

function startCreateNewComment ({ body, author, parentId }) {
  return {
    type: START_CREATE_NEW_COMMENT,
    body,
    author,
    parentId
  }
}

function successCreateNewComment ({ comment, postId }) {
  return {
    type: SUCCESS_CREATE_NEW_COMMENT,
    payload:{ comment, postId }
  }
}

function failedCreateNewComment (error) {
  return {
    type: FAILED_CREATE_NEW_COMMENT,
    error
  }
}

function startDeleteComment ({ commentId, postId }) {
  return {
    type: START_DELETE_COMMENT,
    commentId,
    postId
  }
}

function successDeleteComment ({ commentId, postId }) {
  return {
    type: SUCCESS_DELETE_COMMENT,
    payload: { commentId, postId }
  }
}

function failedDeleteComment (error) {
  return {
    type: FAILED_DELETE_COMMENT,
    error
  }
}

function startEditComment ({ id, body }) {
  return {
    type: START_EDIT_COMMENT,
    id,
    body
  }
}

function successEditComment (comment) {
  return {
    type: SUCCESS_EDIT_COMMENT,
    payload: comment
  }
}

function failedEditComment (error) {
  return {
    type: FAILED_EDIT_COMMENT,
    error
  }
}


export const actionCreators = {
  startFetchComments,
  successFetchComments,
  failedFetchComments,

  startRegisterCommentVote,
  successRegisterCommentVote,
  failedRegisterCommentVote,

  startCreateNewComment,
  successCreateNewComment,
  failedCreateNewComment,

  startDeleteComment,
  successDeleteComment,
  failedDeleteComment,

  startEditComment,
  successEditComment,
  failedEditComment  
}