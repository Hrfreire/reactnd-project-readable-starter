import moment from 'moment'
import {
  FAILED_FETCH_POSTS,
  SUCCESS_FETCH_POSTS,
  START_REGISTER_VOTE,
  FAILED_REGISTER_VOTE,
  START_FETCH_POST,
  SUCCESS_FETCH_POST,
  FAILED_FETCH_POST,
  SUCCESS_CREATE_NEW_POST,
  FAILED_CREATE_NEW_POST,
  RESET_NEW_POST_STATE,
  SUCCESS_DELETE_POST,
  FAILED_DELETE_POST,
  SUCCESS_EDIT_POST,
  FAILED_EDIT_POST
} from '../actions/posts'

const initialState = {
  posts: [],
  currentPost: null,
  filter: null,
  error: null,
  newPostRedirect: false,
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case FAILED_FETCH_POSTS:
      return {
        ...state,
        error: action.error
      }
    case SUCCESS_FETCH_POSTS:
      return {
        ...state,
        posts: action.payload.sort(
          (a, b) => moment.utc(b.timestamp).diff(moment.utc(a.timestamp))
        ),
      }
    case START_REGISTER_VOTE:
      return {
        ...state,
        currentPost: state.currentPost !== null && state.currentPost.id === action.postId
        ?  { ...state.currentPost, 
          voteScore: action.vote === 'upVote'
            ? state.currentPost.voteScore + 1
            : state.currentPost.voteScore - 1
        }
        : state.currentPost,
        
        posts: state.posts.map(post => 
          post.id !== action.postId
            ? post
            : { ...post, 
                voteScore: action.vote === 'upVote'
                  ? post.voteScore + 1
                  : post.voteScore - 1
              }
          )
      }
    case FAILED_REGISTER_VOTE:
      return {
        ...state,
        error: action.error,
        currentPost: state.currentPost !== null && state.currentPost.id === action.postId
        ?  { ...state.currentPost, 
            voteScore: action.vote === 'upVote'
              ? state.currentPost.voteScore - 1
              : state.currentPost.voteScore + 1
          }
        : state.currentPost,
        
        posts: state.posts.map(post => 
          post.id !== action.postId
            ? post
            : { ...post, 
                voteScore: action.vote === 'upVote'
                  ? post.voteScore - 1
                  : post.voteScore + 1
              }
          )
      }
    case START_FETCH_POST:
      return {
        ...state,
        currentPost: null
      }
    case SUCCESS_FETCH_POST:
      return {
        ...state,
        currentPost: action.payload
      }
    case FAILED_FETCH_POST:
      return {
        ...state,
        error: action.error
      }
    case SUCCESS_CREATE_NEW_POST:
      return {
        ...state,
        newPostRedirect: true
      }
    case FAILED_CREATE_NEW_POST:
      return {
        ...state,
        error: action.error
      }
    case RESET_NEW_POST_STATE:
      return {
        ...state,
        newPostRedirect: false,
        currentPost: null
      }
    case SUCCESS_DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.postId),
      }
    case FAILED_DELETE_POST:
      return {
        ...state,
        error: action.error
      }
    case SUCCESS_EDIT_POST:
      return {
        ...state,
        newPostRedirect: true,
        posts: state.posts.map((post) => post.id !== action.payload.id
          ? { ...post }
          : { ...action.payload }
        )
      }
    case FAILED_EDIT_POST:
      return {
        ...state,
        error: action.error
      }
    default:
        return state
  }
}