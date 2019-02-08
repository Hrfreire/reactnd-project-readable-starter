import { takeLatest, put, call, all } from 'redux-saga/effects'
import uuidv1 from 'uuid/v1'
import moment from 'moment'

import {
  actionCreators,
  START_REGISTER_COMMENT_VOTE,
  START_FETCH_COMMENTS,
  START_CREATE_NEW_COMMENT
} from '../actions/comments'
import api from '../api'

function* fetchComments ({ postId }) {
  try {
    const comments =  yield call(api, 'get', `posts/${postId}/comments`)

    yield put(actionCreators.successFetchComments(comments))
  }
  catch (error) {
    yield put(actionCreators.failedFetchComments(error))
  }
}

function* registerCommentVote ({ commentId, vote }) {
  try {
    const comment = yield call(api, 'post', `comments/${commentId}`, { option: vote })
    yield put(actionCreators.successRegisterCommentVote(comment))
  }
  catch (error) {
    yield put(actionCreators.failedRegisterCommentVote(error, commentId, vote))
  }
}

function* createNewComment ({ body, author, parentId }) {
  try {
    const comment = yield call(api, 'post', 'comments', {
      id: uuidv1(),
      timestamp: moment().format(),
      parentId,
      body,
      author
    })

    yield put(actionCreators.successCreateNewComment(comment))
  } catch (error) {
    yield put(actionCreators.failedCreateNewComment(error))
  }
}


export default function* root() {
  yield all([
      takeLatest(START_FETCH_COMMENTS, fetchComments),
      takeLatest(START_REGISTER_COMMENT_VOTE, registerCommentVote),
      takeLatest(START_CREATE_NEW_COMMENT, createNewComment)
  ])
}