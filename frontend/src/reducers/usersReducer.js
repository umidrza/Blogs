import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../services/users'


export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async () => {
    const users = await userService.getAll()
    return users
  }
)

export const createUser = createAsyncThunk(
  'users/create',
  async (newUser) => {
    const user = await userService.create(newUser)
    return user
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (_, action) => action.payload)
      .addCase(createUser.fulfilled, (state, action) => {
        state.push(action.payload)
      })
  }
})

export default userSlice.reducer