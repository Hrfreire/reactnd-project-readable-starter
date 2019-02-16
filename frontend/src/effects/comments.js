import { takeLatest, put, call, all } from 'redux-saga/effects'
import uuidv1 from 'uuid/v1'
import moment from 'moment'
import { showLoading, hideLoading } from 'react-redux-loading'

import {
  actionCreators,
  START_REGISTER_COMMENT_VOTE,
  START_FETCH_COMMENTS,
  START_CREATE_NEW_COMMENT,
  START_EDIT_COMMENT,
  START_DELETE_COMMENT
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

function* deleteComment ({ commentId }) {
  try {
    yield put(showLoading())

    yield call(api, 'delete', `comments/${commentId}`)
    yield put(actionCreators.successDeleteComment(commentId))
  }
  catch (error) {
    yield put(actionCreators.failedDeleteComment(error))
  }
  finally {
    yield put(hideLoading())
  }
}

function* editComment ({ id, body  }) {
  try {
    yield put(showLoading())

    const comment = yield call(api, 'put', `comments/${id}`, {
      body
    })

    yield put(actionCreators.successEditComment(comment))
  }
  catch (error) {
    yield put(actionCreators.failedEditComment(error))
  }
  finally {
    yield put(hideLoading())
  }
}


export default function* root() {
  yield all([
      takeLatest(START_FETCH_COMMENTS, fetchComments),
      takeLatest(START_REGISTER_COMMENT_VOTE, registerCommentVote),
      takeLatest(START_CREATE_NEW_COMMENT, createNewComment),
      takeLatest(START_DELETE_COMMENT, deleteComment),
      takeLatest(START_EDIT_COMMENT, editComment)
  ])
}