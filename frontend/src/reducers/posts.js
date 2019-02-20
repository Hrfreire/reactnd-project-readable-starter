import moment from 'moment'
import {
  SUCCESS_FETCH_POSTS,
  START_REGISTER_VOTE,
  FAILED_REGISTER_VOTE,
  START_FETCH_POST,
  SUCCESS_FETCH_POST,
  FAILED_FETCH_POST,
  SUCCESS_CREATE_NEW_POST,
  RESET_NEW_POST_STATE,
  SUCCESS_DELETE_POST,
  SUCCESS_EDIT_POST,
  SORT_POSTS
} from '../actions/posts'

const initialState = {
  posts: [],
  currentPost: null,
  filter: null,
  newPostRedirect: false,
  sortBy: 'date-descending',
  fetchPostError: null
}

const sortPosts = (posts, sortBy) => {
  
  switch(sortBy) {
    case 'score-descending':
      return [...posts].sort((a, b) => b.voteScore - a.voteScore)
    case 'score-ascending':
      return [...posts].sort((a, b) => a.voteScore - b.voteScore)
    case 'date-descending':
      return [...posts].sort(
        (a, b) => moment.utc(b.timestamp).diff(moment.utc(a.timestamp)))
    case 'date-ascending':
      return [...posts].sort(
        (a, b) => moment.utc(a.timestamp).diff(moment.utc(b.timestamp)))
    default:
      return posts
  }
 }

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case SUCCESS_FETCH_POSTS:
      return {
        ...state,
        posts: sortPosts(action.payload, state.sortBy)
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
    case FAILED_FETCH_POST:
      return {
        ...state,
        fetchPostError: action.error
      }
    case SUCCESS_FETCH_POST:
      return {
        ...state,
        currentPost: action.payload
      }
    case SUCCESS_CREATE_NEW_POST:
      return {
        ...state,
        newPostRedirect: true
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
        currentPost: null,
        posts: state.posts.filter((post) => post.id !== action.postId),
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
    case SORT_POSTS:
      return {
        ...state,
        sortBy: action.sortBy,
        posts: sortPosts(state.posts, action.sortBy)
      }
    default:
        return state
  }
}