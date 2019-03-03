import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import user from './reducers/user'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

if(process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger')
  middlewares.push(logger)
}

const reducers = combineReducers({
  user,
})

const configureStore = initialState => {
  const store = createStore(reducers, initialState, applyMiddleware(...middlewares))
  sagaMiddleware.run(rootSaga)
  return store
}

export default configureStore
