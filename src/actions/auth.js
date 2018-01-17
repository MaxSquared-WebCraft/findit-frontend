import Immutable from 'seamless-immutable'
import jwtDecode from 'jwt-decode'
import SoundBoardApi from '../lib/api/finditApi'
import { runAsyncHelper } from '../lib/async'

export const SET_USER = 'SET_USER'

const setToken = (token) => {
  localStorage.setItem('token', token)
  SoundBoardApi.setToken(token)
}

const tryDecodeToken = () => {
  try {
    const token = localStorage.getItem('token')
    const user = jwtDecode(token)
    const { exp, username, role } = user
    if (exp < Date.now() / 1000) return null
    setToken(token)
    return { username, role }
  } catch(err) {
    localStorage.removeItem('token')
    return null
  }
}

export const loginAction = (username, password) => async (dispatch) => {

  const { token } = await runAsyncHelper({
    todo: () => SoundBoardApi.login({ username, password }),
    dispatch,
  })

  if (!token) throw new Error('No token returned by the server.')

  const { username: decUsername, role } = jwtDecode(token)

  setToken(token)

  dispatch({
    type: SET_USER,
    user: { username: decUsername, role },
  })
}

export const logoutAction = () => (dispatch) => {

  localStorage.removeItem('token')

  setToken(null)

  dispatch({
    type: SET_USER,
    user: null,
  })
}

export const getInitialState = () => {
  const user = tryDecodeToken()
  return Immutable({ user })
}

const initialState = Immutable({ user: null })

export const reducer = (state = initialState, action) => {

  const { type } = action

  switch (type) {

    case SET_USER:
      const { user } = action
      return state.set('user', user)

    default:
      return state
  }
}
