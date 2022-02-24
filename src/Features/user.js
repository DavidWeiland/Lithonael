import { selectUser } from '../Utils/selectors'
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const URL = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_USER_URL}`

const initialState = {
  status: 'void',
  data: null,
  error:null
}

const { actions, reducer } = createSlice({
  name: 'user',
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

export async function signupUser(store, body) {
  const status = selectUser(store.getState()).status
  const axiosBody = {
    method: 'post',
    url: `${URL}signup`,
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
    loginUser(store, body)
  }
  catch (error) {
    store.dispatch(actions.rejected(error))
  }
}

export async function loginUser(store, body) {
  const status = selectUser(store.getState()).status
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

export async function modifyUser(store, body, userId, token) {
  const status = selectUser(store.getState()).status
  const axiosBody = {
    method: 'put',
    url: `${URL}${userId}`,
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
    loginUser(store, body)
  }
  catch (error) {
    store.dispatch(actions.rejected(error))
  }
}

export async function resetUser(store) {
  const status = selectUser(store.getState()).status
  if (status === 'pending' || status === 'updating') {
    return
  }
  store.dispatch(actions.fetching())
  store.dispatch(actions.reset())
}

export const { fetching, resolved, rejected, reset } = actions

export default reducer