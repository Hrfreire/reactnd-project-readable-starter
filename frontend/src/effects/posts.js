import { takeLatest, put, call, all } from 'redux-saga/effects'
import uuidv1 from 'uuid/v1'
import moment from 'moment'
import { showLoading, hideLoading } from 'react-redux-loading'
import {
  actionCreators,
  START_FETCH_POSTS,
  START_REGISTER_VOTE,
  START_FETCH_POST,
  START_CREATE_NEW_POST,
  START_DELETE_POST,
  START_EDIT_POST
} from '../actions/posts'
import api from '../api'

function* fetchPosts ({ filter }) {
  try {
    yield put(showLoading())
    
    let endPoint = 'posts'
    
    if(filter !== undefined) {
        endPoint = `${filter}/${endPoint}`
    }
  
    const posts =  yield call(api, 'get', endPoint)

    yield put(actionCreators.successFetchPosts(posts))
  }
  catch (error) {
    yield put(actionCreators.failedFetchPosts(error))
  }
  finally {
    yield put(hideLoading())
  }
}

function* fetchPost ({ postId }) {
  try {
    yield put(showLoading())

    const post =  yield call(api, 'get', `posts/${postId}`)

    yield put(actionCreators.successFetchPost(post))
  }
  catch (error) {
    yield put(actionCreators.failedFetchPost(error))
  }
  finally {
    yield put(hideLoading())
  }
}

function* registerVote ({ postId, vote }) {
  try {
    const post = yield call(api, 'post', `posts/${postId}`, { option: vote })
    yield put(actionCreators.successRegisterVote(post))
  }
  catch (error) {
    yield put(actionCreators.failedRegisterVote(error, postId, vote))
  }
}

function* createNewPost ({ title, body, author, category }) {
  try {
    yield put(showLoading())

    const post = yield call(api, 'post', 'posts', {
      id: uuidv1(),
      timestamp: moment().valueOf(),
      title,
      body,
      author,
      category
    })

    yield put(actionCreators.successCreateNewPost(post))
  }
  catch (error) {
    yield put(actionCreators.failedCreateNewPost(error))
  }
  finally {
    yield put(hideLoading())
  }
}

function* deletePost ({ postId }) {
  try {
    yield put(showLoading())

    yield call(api, 'delete', `posts/${postId}`)
    yield put(actionCreators.successDeletePost(postId))
  }
  catch (error) {
    yield put(actionCreators.failedDeletePost(error))
  }
  finally {
    yield put(hideLoading())
  }
}

function* EditPost ({ id, title, body  }) {
  try {
    yield put(showLoading())

    const post = yield call(api, 'put', `posts/${id}`, {
      title,
      body,
    })

    yield put(actionCreators.successEditPost(post))
  }
  catch (error) {
    yield put(actionCreators.failedEditPost(error))
  }
  finally {
    yield put(hideLoading())
  }
}


export default function* root() {
  yield all([
      takeLatest(START_FETCH_POSTS, fetchPosts),
      takeLatest(START_FETCH_POST, fetchPost),
      takeLatest(START_REGISTER_VOTE, registerVote),
      takeLatest(START_CREATE_NEW_POST, createNewPost),
      takeLatest(START_DELETE_POST, deletePost),
      takeLatest(START_EDIT_POST, EditPost)
  ])
}