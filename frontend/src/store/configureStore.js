import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from '../reducers'
import effects from '../effects'

import loggerMiddleware from '../middlewares/logger'
import errorsMiddleware from '../middlewares/errors'

export default function() {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
      reducer,
      compose(
        applyMiddleware(sagaMiddleware, loggerMiddleware, errorsMiddleware)
      )
  )

  sagaMiddleware.run(effects)

  return store
}