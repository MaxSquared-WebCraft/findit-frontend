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
    const { uuid, role } = user
    //if (exp < Date.now() / 1000) return null
    setToken(token)
    return { uuid, role }
  } catch(err) {
    localStorage.removeItem('token')
    return null
  }
}

export const loginAction = (email, password) => async (dispatch) => {

  const { token } = await runAsyncHelper({
    todo: () => SoundBoardApi.login({ email, password }),
    dispatch,
  })

  if (!token) throw new Error('No token returned by the server.')

  const { username, role } = jwtDecode(token)

  setToken(token)

  dispatch({
    type: SET_USER,
    user: { username, role },
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
