import {
  START_FETCH_COMMENTS,
  SUCCESS_FETCH_COMMENTS,
  FAILED_FETCH_COMMENTS,
  START_REGISTER_COMMENT_VOTE,
  FAILED_REGISTER_COMMENT_VOTE
} from '../actions/comments'

const initialState = {
  comments: [],
  loading: false,
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
        comments: action.payload,
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
    default:
        return state;
  }
}