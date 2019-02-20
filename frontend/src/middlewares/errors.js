import { message } from 'antd';
import {
  FAILED_CREATE_NEW_POST,
  FAILED_DELETE_POST,
  FAILED_EDIT_POST,
  FAILED_FETCH_POST,
  FAILED_FETCH_POSTS,
  FAILED_REGISTER_VOTE
} from '../actions/posts'
import {
  FAILED_CREATE_NEW_COMMENT,
  FAILED_DELETE_COMMENT,
  FAILED_EDIT_COMMENT,
  FAILED_REGISTER_COMMENT_VOTE,
  FAILED_FETCH_COMMENTS
} from '../actions/comments'
import {
  FAILED_FETCH_CATEGORIES
} from '../actions/categories'

const errors = (store) => (next) => (action) => {
  let errorMessage;

  switch (action.type) {
    case FAILED_CREATE_NEW_POST:
      errorMessage = 'Failed to create new post. Try Again Later.'
      break;
    case FAILED_EDIT_POST:
      errorMessage = 'Failed to edit post. Try Again Later.'
      break;
    case FAILED_DELETE_POST:
      errorMessage = 'Failed to delete post. Try Again Later.'
      break;
    case FAILED_FETCH_POST:
      errorMessage = 'Failed to fetch post. Try Again Later.'
      break;
    case FAILED_FETCH_POSTS:
      errorMessage = 'Failed to fetch posts. Try Again Later.'
      break;
    case FAILED_REGISTER_VOTE:
      errorMessage = 'Failed to register post vote. Try Again Later.'
      break;
    case FAILED_CREATE_NEW_COMMENT:
      errorMessage = 'Failed to create new comment. Try Again Later.'
      break;
    case FAILED_DELETE_COMMENT:
      errorMessage = 'Failed to delete comment. Try Again Later.'
      break;
    case FAILED_EDIT_COMMENT:
      errorMessage = 'Failed to edit comment. Try Again Later.'
      break;
    case FAILED_REGISTER_COMMENT_VOTE:
      errorMessage = 'Failed to register comment vote. Try Again Later.'
      break;
    case FAILED_FETCH_COMMENTS:
      errorMessage = 'Failed to fetch comments. Try Again Later.'
      break;
    case FAILED_FETCH_CATEGORIES:
      errorMessage = 'Failed to categories. Try Again Later.'
      break;
    default:
      errorMessage = action.error !== null && action.error !== undefined
      ? 'Sorry, There was an unknown error.'
      : null
       break;
  }

  if(errorMessage !== null ) {
    message.error(errorMessage);
  }

  return next(action);
}

export default errors;