import {
  START_FETCH_POSTS,
  FAILED_FETCH_POSTS,
  SUCCESS_FETCH_POSTS,
  START_REGISTER_VOTE,
  FAILED_REGISTER_VOTE,
  START_FETCH_POST,
  SUCCESS_FETCH_POST,
  FAILED_FETCH_POST
} from '../actions/posts'

const initialState = {
  loadingPosts: false,
  posts: [],
  currentPost: null,
  loadingPost: false,
  comments: [],
  loadingComments: false,
  filter: null,
  error: null
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
        posts: action.payload
      }
    case START_REGISTER_VOTE:
      return {
        ...state,
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
    default:
        return state;
  }
}