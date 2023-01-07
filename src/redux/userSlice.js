import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLogin: false,
  loading: false,
  userFbInfor: null,
  error: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.isLogin = true;
    },
    loginFb: (state, action) => {
      state.loading = false;
      state.userFbInfor = action.payload;
      state.isLogin = true;
    },
    loginFailed: (state) => {
      state.loading = false;
      state.error = true;
      state.isLogin = false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.userFbInfor = null;
      state.error = false;
      state.isLogin = false;
    },
  },
});
export const { loginStart, loginSuccess, loginFb, loginFailed, logout } =
  userSlice.actions;

export default userSlice.reducer;
