import { selectAdmin } from '../Utils/selectors'
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const URL = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_ADMIN_URL}`

const initialState = {
  status: 'void',
  data: null,
  error:null
}

const { actions, reducer } = createSlice({
  name: 'admin',
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
    },
    reset: (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.status = 'void'
        draft.data = null
        draft.error = null
        return
      }
      return
    }
  }
})

export async function signupAdmin(store, body, token) {
  const status = selectAdmin(store.getState()).status
  const axiosBody = {
    method: 'post',
    url: `${URL}signup`,
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
    loginAdmin(store, body)
  }
  catch (error) {
    store.dispatch(actions.rejected(error))
  }
}

export async function loginAdmin(store, body) {
  const status = selectAdmin(store.getState()).status
  const axiosBody = {
    method: 'post',
    url: `${URL}login`,
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

export async function modifyAdmin(store, body, adminId, token) {
  const status = selectAdmin(store.getState()).status
  const axiosBody = {
    method: 'put',
    url: `${URL}${adminId}`,
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
    loginAdmin(store, body)
  }
  catch (error) {
    store.dispatch(actions.rejected(error))
  }
}

export async function resetAdmin(store) {
  const status = selectAdmin(store.getState()).status
  if (status === 'pending' || status === 'updating') {
    return
  }
  store.dispatch(actions.fetching())
  store.dispatch(actions.reset())
}

export const { fetching, resolved, rejected, reset } = actions

export default reducer