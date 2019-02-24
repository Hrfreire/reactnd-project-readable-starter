import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from '../reducers'
import effects from '../effects'
import loggerMiddleware from 'redux-logger'
import errorsMiddleware from '../middlewares/errors'

export default function() {
  const sagaMiddleware = createSagaMiddleware()

  const middlewares = [sagaMiddleware, errorsMiddleware];

  if(process.env.NODE_ENV !== 'production') {
    middlewares.push(loggerMiddleware);
  }

  const store = createStore(
      reducer,
      compose(
        applyMiddleware(...middlewares)
      )
  )

  sagaMiddleware.run(effects)

  return store
}