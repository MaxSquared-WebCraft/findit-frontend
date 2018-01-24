import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import ReduxThunk from 'redux-thunk'
import * as authActions from './actions/auth'
import * as appActions from './actions/app'
import * as fileActions from './actions/file'

export const initStore = (env) => {

  const rootReducer = combineReducers({
    auth: authActions.reducer,
    app: appActions.reducer,
    file: fileActions.reducer,
  })

  const composeParams = [
    applyMiddleware(ReduxThunk)
  ]

  if (env === 'development' && window.devToolsExtension)
    composeParams.push(window.devToolsExtension())

  const initialState = {}

  initialState.auth = authActions.getInitialState()
  initialState.app = appActions.getInitialState()
  initialState.file = fileActions.getInitialState()

  return createStore(
    rootReducer,
    initialState,
    compose(...composeParams),
  )

}