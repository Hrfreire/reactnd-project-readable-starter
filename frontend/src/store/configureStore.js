import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from '../reducers'
import effects from '../effects'

export default function() {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
      reducer,
      applyMiddleware(sagaMiddleware)
  )

  sagaMiddleware.run(effects)

  return store;
}