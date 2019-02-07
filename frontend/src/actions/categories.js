export const START_FETCH_CATEGORIES='START_FETCH_CATEGORIES'
export const SUCCESS_FETCH_CATEGORIES='SUCCESS_FETCH_CATEGORIES'
export const FAILED_FETCH_CATEGORIES='FAILED_FETCH_CATEGORIES'

function startFetchCategories() {
  return {
    type: START_FETCH_CATEGORIES
  }
}

function successFetchCategories(categories) {
  return {
    type: SUCCESS_FETCH_CATEGORIES,
    payload: categories
  }
}

function failedFetchCategories(error) {
  return {
    type: FAILED_FETCH_CATEGORIES,
    error
  }
}

export const actionCreators = {
  startFetchCategories,
  successFetchCategories,
  failedFetchCategories
}