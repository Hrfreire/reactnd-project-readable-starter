import moment from 'moment'
import {
  START_FETCH_POSTS,
  FAILED_FETCH_POSTS,
  SUCCESS_FETCH_POSTS,
  START_REGISTER_VOTE,
  FAILED_REGISTER_VOTE,
  START_FETCH_POST,
  SUCCESS_FETCH_POST,
  FAILED_FETCH_POST,
  START_CREATE_NEW_POST,
  SUCCESS_CREATE_NEW_POST,
  FAILED_CREATE_NEW_POST,
  RESET_NEW_POST_STATE
} from '../actions/posts'

const initialState = {
  loadingPosts: false,
  posts: [],
  currentPost: null,
  loadingPost: false,
  comments: [],
  loadingComments: false,
  filter: null,
  error: null,
  newPostRedirect: false,
  loadingNewPost: false
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case START_FETCH_POSTS:
      return {
        ...state,
        loadingPosts: true
      }
    case FAILED_FETCH_POSTS:
      return {
        ...state,
        loadingPosts: false,
        error: action.error
      }
    case SUCCESS_FETCH_POSTS:
      return {
        ...state,
        loadingPosts: false,
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
        loadingPost: true,
        currentPost: null
      }
    case SUCCESS_FETCH_POST:
      return {
        ...state,
        loadingPost: false,
        currentPost: action.payload
      }
    case FAILED_FETCH_POST:
      return {
        ...state,
        loadingPost: false,
        error: action.error
      }
    case START_CREATE_NEW_POST:
      return {
        ...state,
        loadingNewPost: true
      }
    case SUCCESS_CREATE_NEW_POST:
      return {
        ...state,
        loadingNewPost: false,
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
        loadingNewPost: false,
        newPostRedirect: false,
        currentPost: null
      }
    default:
        return state
  }
}