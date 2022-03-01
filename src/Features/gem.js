import { selectGem } from '../Utils/selectors'
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const URL = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_GEM_URL}`

const initialState = {}

function setVoidIfUndefined(draft, gemId) {
  if (draft[ gemId ] === undefined) {
    draft[ gemId ] = {status:'void'}
  }
}

const { actions, reducer } = createSlice({
  name: 'gem',
  initialState,
  reducers: {
    fetching: {
      prepare: (gemId) => ({
        payload: { gemId },
      }),
      reducer: (draft, action) => {
        setVoidIfUndefined(draft, action.payload.gemId)
        if (draft[ action.payload.gemId ].status === 'void') {
          draft[ action.payload.gemId ].status = 'pending'
          return
        }
        if (draft[ action.payload.gemId ].status === 'rejected') {
          draft[ action.payload.gemId ].error = null
          draft[ action.payload.gemId ].status = 'pending'
          return
        }
        if (draft[ action.payload.gemId ].status === 'resolved') {
          draft[ action.payload.gemId ].status = 'updating'
          return
        }
      }
    },
    resolved: {
      prepare: (gemId, data) => ({
        payload: { gemId, data },
      }),
      reducer: (draft, action) => {
        setVoidIfUndefined(draft, action.payload.gemId)
        if (draft[ action.payload.gemId ].status === 'pending' || draft[ action.payload.gemId ].status === 'updating') {
          draft[ action.payload.gemId ].data = action.payload.data
          draft[ action.payload.gemId ].status = 'resolved'
          return
        }
        return
      }
    },
    rejected: {
      prepare: (gemId, data) => ({
        payload: { gemId, data },
      }),
      reducer: (draft, action) => {
        setVoidIfUndefined(draft, action.payload.gemId)
        if (draft[ action.payload.gemId ].status === 'pending' || draft[ action.payload.gemId ].status === 'updating') {
          draft[ action.payload.gemId ].data = null
          draft[ action.payload.gemId ].error = action.payload.error
          draft[ action.payload.gemId ].status = 'rejected'
          return
        }
        return
      }
    }
  }
})

export async function getOneGem(store, gemId) {
  const selectGemById = selectGem(gemId)
  const status = selectGemById(store.getState()).status
    const axiosBody = {
    method: 'get',
    url: `${URL}${gemId}`,
  }
  if (status === 'pending' || status === 'updating') {
    return
  }
  store.dispatch(actions.fetching(gemId))
  try {
    const response = await axios(axiosBody)
    const data = await response.data
    store.dispatch(actions.resolved(gemId, data))
  }
  catch (error) {
    store.dispatch(actions.rejected(gemId, error))
  }
}

export async function modifyOneGem(store, gemId, object, image, token) {
  const selectGemById = selectGem(gemId)
  const status = selectGemById(store.getState()).status
  let body
  if (typeof image === 'string') {
    object.image = image
    body = object
  } else {
    body = new FormData()
    body.append('gemObject', JSON.stringify(object))
    body.append('image', image, object.name)
  }
  const axiosBody = {
    method: 'put',
    url: `${URL}${gemId}`,
    headers:{authorization:`Bearer ${token}`},
    data:body
  }
  if (status === 'pending' || status === 'updating') {
    return
  }
  store.dispatch(actions.fetching(gemId))
  try {
    const response = await axios(axiosBody)
    const data = await response.data
    store.dispatch(actions.resolved(gemId, data))
    getOneGem(store, gemId)
  }
  catch (error) {
    store.dispatch(actions.rejected(gemId, error))
  }
}

/* export async function deleteOneGem(store, gemId, token) {
  const selectGemById = selectGem(gemId)
  const status = selectGemById(store.getState()).status
  const axiosBody = {
    method: 'delete',
    url: `${URL}${gemId}`,
    headers:{authorization:`Bearer ${token}`}
  }
  if (status === 'pending' || status === 'updating') {
    return
  }
  store.dispatch(actions.fetching())
  try {
    const response = await axios(axiosBody)
    const data = await response.data
    store.dispatch(actions.resolved(data))
  }
  catch (error) {
    store.dispatch(actions.rejected(error))
  }
} */

export const { fetching, resolved, rejected } = actions

export default reducer