import {
  START_FETCH_CATEGORIES,
  SUCCESS_FETCH_CATEGORIES,
  FAILED_FETCH_CATEGORIES
} from '../actions/categories'

const initialState = {
  categories: [],
  loading: false,
  error: null
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case START_FETCH_CATEGORIES:
      return {
        ...state,
        loading: true
      }
    case SUCCESS_FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      }
    case FAILED_FETCH_CATEGORIES:
      return {
        ...state,
        error: action.error
      }
    default:
        return state;
  }
}