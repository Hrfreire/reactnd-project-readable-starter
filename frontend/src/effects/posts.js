import { takeLatest, put, call, all } from 'redux-saga/effects'
import {
  actionCreators,
  START_FETCH_POSTS,
  START_REGISTER_VOTE,
  START_FETCH_POST
} from '../actions/posts'
import api from '../api'

function* fetchPosts ({ filter }) {
  try {
    let endPoint = 'posts';
    
    if(filter !== undefined) {
        endPoint = `${filter}/${endPoint}`
    }
  
    const posts =  yield call(api, 'get', endPoint);

    yield put(actionCreators.successFetchPosts(posts))
  }
  catch (error) {
    yield put(actionCreators.failedFetchPosts(error))
  }
}

function* fetchPost ({ postId }) {
  try {
    const post =  yield call(api, 'get', `posts/${postId}`);

    yield put(actionCreators.successFetchPost(post))
  }
  catch (error) {
    yield put(actionCreators.failedFetchPost(error))
  }
}

function* registerVote ({ postId, vote }) {
  try {
    const post = yield call(api, 'post', `posts/${postId}`, { option: vote });
    yield put(actionCreators.successRegisterVote(post))
  }
  catch (error) {
    yield put(actionCreators.failedRegisterVote(error, postId, vote))
  }
}

export default function* root() {
  yield all([
      takeLatest(START_FETCH_POSTS, fetchPosts),
      takeLatest(START_FETCH_POST, fetchPost),
      takeLatest(START_REGISTER_VOTE, registerVote)
  ]);
}