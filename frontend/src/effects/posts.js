import { takeLatest, put, call, all } from 'redux-saga/effects'
import { START_FETCH_POSTS, actionCreators } from '../actions/posts'
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

export default function* root() {
  yield all([
      takeLatest(START_FETCH_POSTS, fetchPosts),
  ]);
}