import Immutable from 'seamless-immutable'
import FinditApi from '../lib/api/finditApi'
import { runAsyncHelper } from '../lib/async'

export const ADD_DROPPED_FILES = "ADD_DROPPED_FILES"
export const ADD_ERROR_FILES = "ADD_ERROR_FILES"
export const CLEAR_FILES = "CLEAR_FILES"
export const SET_FILES = "SET_FILES"
export const SET_ES_FILES = "SET_ES_FILES"

export const addPreviewFilesAction = (files) => (dispatch) => {
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

export const setFilesAction = (files) => (dispatch) => {
  dispatch({
    type: SET_FILES,
    files,
  })
}

export const setEsFilesAction = (hits) => (dispatch) => {
  dispatch({
    type: SET_ES_FILES,
    hits,
  })
}

export const uploadFilesAction = (files) => async (dispatch) => {

  files = Array.isArray(files) ? files : [files]

  const todo = files.map((file) => {
    const form = new FormData()
    form.append('document', file)
    return FinditApi.upload(form)
  })

  await runAsyncHelper({ todo })

  dispatch(clearFilesAction())
}

export const getAllFilesAction = (userId) => async (dispatch) => {
  let files = await runAsyncHelper({ todo: () => FinditApi.getFiles(userId) })
  files = files.map(({ uuid, location, originalName }) => ({ name: uuid, location, originalName }))
  dispatch(setFilesAction(files))
}

export const findFilesAction = (search, userId) => async (dispatch) => {
  if (search === '') return dispatch(getAllFilesAction(userId))
  let res = await runAsyncHelper({ todo: () => FinditApi.findFiles(search) })
  if (!res) return
  const { hits: { hits } } = res
  dispatch(setEsFilesAction(hits))
}

const initialState = Immutable({ previewFiles: [], errorFiles: [], files: [] })

export const getInitialState = () => initialState

export const reducer = (state = initialState, action) => {

  const { type } = action

  switch (type) {

    case ADD_DROPPED_FILES: {
      const { files } = action
      const { previewFiles } = state
      return state.set('previewFiles', previewFiles.concat(files))
    }

    case ADD_ERROR_FILES: {
      const { files } = action
      const { errorFiles } = state
      return state.set('errorFiles', errorFiles.concat(files))
    }

    case CLEAR_FILES: {
      return state
        .set('errorFiles', [])
        .set('previewFiles', [])
    }

    case SET_FILES: {
      const { files } = action
      return state.set('files', files)
    }

    case SET_ES_FILES: {
      const { hits } = action
      const files = hits.map(({ _source: { title, location } }) =>
        ({ name: title || 'noName', originalName: title || 'noTitle', location: location || 'noLoc' })
      )
      return state.set('files', files)
    }

    default:
      return state
  }

}