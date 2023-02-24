import { createSlice } from "@reduxjs/toolkit";

const INIT_STATE = {
  user: {},
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: INIT_STATE,
  reducers: {
    loginUser: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
    },
  },
});

export const { loginUser, logout } = authSlice.actions;
