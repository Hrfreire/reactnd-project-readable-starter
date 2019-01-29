import { START_FETCH_POSTS, FAILED_FETCH_POSTS, SUCCESS_FETCH_POSTS } from '../actions/posts'

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
    default:
        return state;
  }
}