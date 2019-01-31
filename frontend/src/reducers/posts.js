import {
  START_FETCH_POSTS,
  FAILED_FETCH_POSTS,
  SUCCESS_FETCH_POSTS,
  START_REGISTER_VOTE,
  FAILED_REGISTER_VOTE,
} from '../actions/posts'

const initialState = {
  loading: false,
  posts: [],
  filter: null,
  error: null
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case START_FETCH_POSTS:
      return {
        ...state,
        loading: true
      }
    case FAILED_FETCH_POSTS:
      return {
        loading: false,
        error: action.error
      }
    case SUCCESS_FETCH_POSTS:
      return {
        loading: false,
        posts: action.payload
      }
    case START_REGISTER_VOTE:
      return {
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
    default:
        return state;
  }
}