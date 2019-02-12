import { takeLatest, put, call, all } from 'redux-saga/effects'
import uuidv1 from 'uuid/v1'
import moment from 'moment'
import {
  actionCreators,
  START_FETCH_POSTS,
  START_REGISTER_VOTE,
  START_FETCH_POST,
  START_CREATE_NEW_POST
} from '../actions/posts'
import api from '../api'

function* fetchPosts ({ filter }) {
  try {
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
}

function* fetchPost ({ postId }) {
  try {
    const post =  yield call(api, 'get', `posts/${postId}`)

    yield put(actionCreators.successFetchPost(post))
  }
  catch (error) {
    yield put(actionCreators.failedFetchPost(error))
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

    const post = yield call(api, 'post', 'posts', {
      id: uuidv1(),
      timestamp: moment().format(),
      title,
      body,
      author,
      category
    })

    yield put(actionCreators.successCreateNewPost(post))
  } catch (error) {
    yield put(actionCreators.failedCreateNewPost(error))
  }
}


export default function* root() {
  yield all([
      takeLatest(START_FETCH_POSTS, fetchPosts),
      takeLatest(START_FETCH_POST, fetchPost),
      takeLatest(START_REGISTER_VOTE, registerVote),
      takeLatest(START_CREATE_NEW_POST, createNewPost)
  ])
}