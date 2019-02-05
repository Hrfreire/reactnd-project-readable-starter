import { takeLatest, put, call, all } from 'redux-saga/effects'
import {
  actionCreators,
  START_REGISTER_COMMENT_VOTE,
  START_FETCH_COMMENTS
} from '../actions/comments'
import api from '../api'

function* fetchComments ({ postId }) {
  try {
  
    const comments =  yield call(api, 'get', `posts/${postId}/comments`);

    yield put(actionCreators.successFetchComments(comments))
  }
  catch (error) {
    yield put(actionCreators.failedFetchComments(error))
  }
}

function* registerCommentVote ({ commentId, vote }) {
  try {
    const comment = yield call(api, 'post', `comments/${commentId}`, { option: vote });
    yield put(actionCreators.successRegisterVote(comment))
  }
  catch (error) {
    yield put(actionCreators.failedRegisterVote(error, commentId, vote))
  }
}


export default function* root() {
  yield all([
      takeLatest(START_FETCH_COMMENTS, fetchComments),
      takeLatest(START_REGISTER_COMMENT_VOTE, registerCommentVote)
  ]);
}