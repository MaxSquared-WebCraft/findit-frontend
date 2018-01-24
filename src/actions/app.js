import Immutable from 'seamless-immutable'

export const SET_DRAWER_OPEN = "SET_DRAWER_OPEN"

export const toggleDrawerOpenStateAction = (open) => (dispatch) => {
  dispatch({ type: SET_DRAWER_OPEN, open })
}

const initialState = Immutable({})

export const getInitialState = () => initialState

export const reducer = (state = initialState, action) => {

  const { type } = action

  switch (type) {

    case SET_DRAWER_OPEN: {
      const { open } = action
      return state.set('drawerOpen', open)
    }

    default:
      return state
  }

}