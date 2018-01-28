import Immutable from 'seamless-immutable'
import FinditApi from '../lib/api/finditApi'
import { runAsyncHelper } from '../lib/async'

export const ADD_DROPPED_FILES = "ADD_DROPPED_FILES"
export const ADD_ERROR_FILES = "ADD_ERROR_FILES"
export const CLEAR_FILES = "CLEAR_FILES"

export const addFilesAction = (files) => (dispatch) => {
  dispatch({
    type: ADD_DROPPED_FILES,
    files,
  })
}

export const addErrorFilesAction = (files) => (dispatch) => {
  dispatch({
    type: ADD_ERROR_FILES,
    files,
  })
}

export const clearFilesAction = () => (dispatch) => {
  dispatch({
    type: CLEAR_FILES,
  })
}

export const uploadFilesAction = (files) => async (dispatch) => {

  files = Array.isArray(files) ? files : [files]

  const todo = files.map((file) => {
    const form = new FormData()
    form.append('document', file)
    return FinditApi.upload(form)
  })

  const res = await runAsyncHelper({ todo })

  console.log('res', res)

  dispatch(clearFilesAction())
}

const initialState = Immutable({ files: [], errorFiles: [] })

export const getInitialState = () => initialState

export const reducer = (state = initialState, action) => {

  const { type } = action

  switch (type) {

    case ADD_DROPPED_FILES: {
      const { files: newFiles } = action
      const { files } = state
      return state.set('files', files.concat(newFiles))
    }

    case ADD_ERROR_FILES: {
      const { files } = action
      const { errorFiles } = state
      return state.set('errorFiles', errorFiles.concat(files))
    }

    case CLEAR_FILES: {
      return state
        .set('errorFiles', [])
        .set('files', [])
    }

    default:
      return state
  }

}