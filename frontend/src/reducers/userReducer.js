import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import loginService from '../services/login';

export const initializeUser = createAsyncThunk(
  'user/initializeUser',
  async () => {
    const storedUser = window.localStorage.getItem('loggedBlogUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem(
        'loggedBlogUser',
        JSON.stringify(user)
      );

      return user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Login failed'
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async () => {
    window.localStorage.removeItem('loggedBlogUser');
    return null;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // INIT
      .addCase(initializeUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.status = 'succeeded';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
        state.status = 'idle';
      });
  },
});

export default userSlice.reducer;