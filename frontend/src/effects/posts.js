import { takeLatest, put, call, all } from 'redux-saga/effects'
import { START_FETCH_POSTS, START_REGISTER_VOTE, actionCreators } from '../actions/posts'
import api from '../api'

function* fetchPosts({ filter }) {
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
      takeLatest(START_REGISTER_VOTE, registerVote)
  ]);
}