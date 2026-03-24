import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


export const fetchBlogs = createAsyncThunk(
  'blogs/fetchAll',
  async () => {
    const blogs = await blogService.getAll()
    return blogs
  }
)

export const fetchById = createAsyncThunk(
  'blogs/fetchById',
  async (id) => {
    const blog = await blogService.getById(id)
    return blog
  }
)

export const createBlog = createAsyncThunk(
  'blogs/create',
  async (newBlog) => {
    const blog = await blogService.create(newBlog)
    return blog
  }
)

export const updateBlog = createAsyncThunk(
  'blogs/update',
  async ({ id, updatedBlog }) => {
    const blog = await blogService.update(id, updatedBlog)
    return blog
  }
)

export const deleteBlog = createAsyncThunk(
  'blogs/delete',
  async (id) => {
    await blogService.remove(id)
    return id
  }
)

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.fulfilled, (_, action) => action.payload)
      .addCase(createBlog.fulfilled, (state, action) => {
        state.push(action.payload)
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.findIndex(b => b.id === action.payload.id)
        if (index !== -1) state[index] = action.payload
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        return state.filter(b => b.id !== action.payload)
      })
  }
})

export default blogSlice.reducer