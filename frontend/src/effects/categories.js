import { takeLatest, put, call, all } from 'redux-saga/effects'
import {
  actionCreators,
  START_FETCH_CATEGORIES
} from '../actions/categories'
import api from '../api'

function* fetchCategories() {
  try {
    const response =  yield call(api, 'get', `categories`)
    
    yield put(actionCreators.successFetchCategories(response.categories))
  }
  catch (error) {
    yield put(actionCreators.failedFetchCategories(error))
  }
}

export default function* root() {
  yield all([
      takeLatest(START_FETCH_CATEGORIES, fetchCategories),
  ])
}