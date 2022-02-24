import { selectOrders } from '../Utils/selectors'
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const URL = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_ORDERS_URL}`

const initialState = {
  status: 'void',
  data: null,
  error:null
}

const { actions, reducer } = createSlice({
  name: 'orders',
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

export async function createOrder(store, object, image, token) {
  const status = selectOrders(store.getState()).status
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

export async function getAllOrdersOfAUser(store) {
  const status = selectOrders(store.getState()).status
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

export async function getOneOrder(store, gemId) {
  const status = selectOrders(store.getState()).status
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

export async function modifyOneOrder(store, gemId, object, image, token) {
  const status = selectOrders(store.getState()).status
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
    getOneOrder(store, gemId)
  }
  catch (error) {
    store.dispatch(actions.rejected(error))
  }
}

export async function deleteOneOrder(store, gemId, token) {
  const status = selectOrders(store.getState()).status
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