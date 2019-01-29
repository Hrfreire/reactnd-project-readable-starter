export const START_FETCH_POSTS = 'START_FETCH_POSTS'
export const SUCCESS_FETCH_POSTS = 'SUCCESS_FETCH_POSTS'
export const FAILED_FETCH_POSTS = 'FAILED_FETCH_POSTS'

export function startFetchPosts (filter) {
    return {
        type: START_FETCH_POSTS,
        filter
    }
}

export function successFetchPosts (posts) {
    return {
        type: SUCCESS_FETCH_POSTS,
        payload: posts
    }
}

function failedFetchPosts (error) {
    return {
        type: FAILED_FETCH_POSTS,
        error
    }
}

export const actionCreators = {
    startFetchPosts,
    successFetchPosts,
    failedFetchPosts
}