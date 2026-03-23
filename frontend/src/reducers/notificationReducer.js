import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification(state, action) {
      state.push(action.payload);
    },
    removeNotification(state, action) {
      return state.filter((n) => n.id !== action.payload);
    },
    clearNotifications() {
      return [];
    },
  },
});

export const { addNotification, removeNotification, clearNotifications } =
  notificationSlice.actions;

export const showNotification = (message, type = "success", seconds = 3) => {
  return (dispatch) => {
    const id = Date.now();

    dispatch(addNotification({ id, message, type }));

    setTimeout(() => {
      dispatch(removeNotification(id));
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;
