import { selectGem } from '../Utils/selectors'
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const URL = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_GEM_URL}`

const initialState = {
  status: 'void',
  data: null,
  error:null
}

const { actions, reducer } = createSlice({
  name: 'gem',
  initialState,
  reducers: {
    fetching: (draft, action) => {
      if (draft.status === 'void') {
        draft.status = 'pending'
        return
      }
      if (draft.status === 'rejected') {
        draft.error = null
        draft.status = 'pending'
        return
      }
      if (draft.status === 'resolved') {
        draft.status = 'updating'
        return
      }
      return
    },
    resolved: (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.data = action.payload
        draft.status = 'resolved'
        return
      }
      return
    },
    rejected: (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.data = null
        draft.error = action.payload
        draft.status = 'rejected'
        return
      }
      return
    }
  }
})

export async function createGem(store, object, image, token) {
  const status = selectGem(store.getState()).status
  const body = new FormData()
  body.append('gemObject', JSON.stringify(object))
  body.append('image', image, object.name)
  const axiosBody = {
    method: 'post',
    url: URL,
    headers:{authorization:`Bearer ${token}`},
    data:body
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
}

export async function getAllGem(store) {
  const status = selectGem(store.getState()).status
    const axiosBody = {
    method: 'get',
    url: URL,
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
}

export async function getOneGem(store, gemId) {
  const status = selectGem(store.getState()).status
    const axiosBody = {
    method: 'get',
    url: `${URL}${gemId}`,
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
}

export async function modifyOneGem(store, gemId, object, image, token) {
  const status = selectGem(store.getState()).status
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
  store.dispatch(actions.fetching())
  try {
    const response = await axios(axiosBody)
    const data = await response.data
    store.dispatch(actions.resolved(data))
    getOneGem(store, gemId)
  }
  catch (error) {
    store.dispatch(actions.rejected(error))
  }
}

export async function deleteOneGem(store, gemId, token) {
  const status = selectGem(store.getState()).status
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
}

export const { fetching, resolved, rejected } = actions

export default reducer