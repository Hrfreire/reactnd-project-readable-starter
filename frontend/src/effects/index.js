import { all, fork } from 'redux-saga/effects'
import posts from './posts'
import comments from './comments'

export default function* root() {
    yield all([
        fork(posts),
        fork(comments)
    ])
}