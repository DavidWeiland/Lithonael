import { selectItemsForSale } from '../Utils/selectors'
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const URL = `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_ITEM_FOR_SALE_URL}`

const initialState = {
  status: 'void',
  data: null,
  error:null
}

const { actions, reducer } = createSlice({
  name: 'itemsForSale',
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

export async function getAllItemsForSale(store) {
  const status = selectItemsForSale(store.getState()).status
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

export const { fetching, resolved, rejected } = actions

export default reducer