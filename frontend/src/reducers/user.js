import { createSlice } from "@reduxjs/toolkit";

import loginService from "../services/login";
import storageService from "../services/storage";

const initialState = null;

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set(state, action) {
      return action.payload;
    },
    clear() {
      return initialState;
    },
  },
});

export const { set, clear } = slice.actions;

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials);
    storageService.saveUser(user);
    dispatch(set(user));
  };
};

export const initUser = () => {
  return async (dispatch) => {
    const user = storageService.loadUser();
    dispatch(set(user));
  };
};

export const clearUser = () => {
  return async (dispatch) => {
    storageService.removeUser();
    dispatch(clear());
  };
};

export default slice.reducer;
