import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter((n) => n.id !== action.payload);
    },
    clear() {
      return [];
    },
  },
})

export const notify = (message, type='success', seconds = 3) => {
  return async dispatch => {
    const id = Date.now();

    dispatch(add({ id, message, type }))

    setTimeout(() => {
      dispatch(remove(id))
    }, 1000 * seconds)
  }
}

export const { add, remove, clear } = slice.actions
export default slice.reducer


