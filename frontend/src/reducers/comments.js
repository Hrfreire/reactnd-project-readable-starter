import moment from 'moment' 

import {
  START_FETCH_COMMENTS,
  SUCCESS_FETCH_COMMENTS,
  FAILED_FETCH_COMMENTS,
  START_REGISTER_COMMENT_VOTE,
  FAILED_REGISTER_COMMENT_VOTE,
  START_CREATE_NEW_COMMENT,
  SUCCESS_CREATE_NEW_COMMENT,
  FAILED_CREATE_NEW_COMMENT,
  SUCCESS_DELETE_COMMENT,
  FAILED_DELETE_COMMENT,
  SUCCESS_EDIT_COMMENT,
  FAILED_EDIT_COMMENT

} from '../actions/comments'

const initialState = {
  comments: [],
  loading: false,
  loadingCreateComment: false,
  error: null
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case START_FETCH_COMMENTS:
      return {
        ...state,
        loading: true
      }
    case SUCCESS_FETCH_COMMENTS:
      return {
        ...state,
        comments: action.payload.sort(
          (a, b) => moment.utc(b.timestamp).diff(moment.utc(a.timestamp))
        ),
        loading: false
      }
    case FAILED_FETCH_COMMENTS:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case START_REGISTER_COMMENT_VOTE:
      return {
        ...state,
        comments: state.comments.map(comment => 
          comment.id !== action.commentId
            ? comment
            : { ...comment, 
                voteScore: action.vote === 'upVote'
                  ? comment.voteScore + 1
                  : comment.voteScore - 1
              }
          )
      }
    case FAILED_REGISTER_COMMENT_VOTE:
      return {
        ...state,
        error: action.error,
        comments: state.comments.map(comment => 
          comment.id !== action.commentId
            ? comment
            : { ...comment, 
                voteScore: action.vote === 'upVote'
                  ? comment.voteScore - 1
                  : comment.voteScore + 1
              }
          )
      }
    case START_CREATE_NEW_COMMENT:
      return {
        ...state,
        loadingCreateComment: true
      }
    case SUCCESS_CREATE_NEW_COMMENT:
      return {
        ...state,
        loadingCreateComment: false,
        comments: [action.payload.comment, ...state.comments]
      }
    case FAILED_CREATE_NEW_COMMENT:
      return {
        ...state,
        loadingCreateComment: false,
        error: action.error
      }
    case SUCCESS_EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) => comment.id !== action.payload.id
          ? comment
          : action.payload
        )
      }
    case FAILED_EDIT_COMMENT:
      return {
        ...state,
        error: action.error
      }
    case SUCCESS_DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.payload.commentId)
      }
    case FAILED_DELETE_COMMENT:
      return {
        ...state,
        error: action.error
      }
    default:
        return state
  }
}