import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
  },
  reducers: {
    updateStatus: (state, action) => {
      state.isAuth = action.payload;
    },
  },
});
