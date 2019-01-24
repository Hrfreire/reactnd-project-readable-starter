import { createStore, applyMiddleware } from 'redux'
import { createSagaMiddleware } from 'react-redux'
import reducer from './reducers'
import effects from './effects'

export default function() {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
      reducer,
      applyMiddleware(sagaMiddleware)
  )

  effects.map((effect) => sagaMiddleware.run(effect));

  return store;
}