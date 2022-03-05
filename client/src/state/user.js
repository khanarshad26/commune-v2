import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
  profileFeeds: JSON.parse(localStorage.getItem("profileFeeds")) || null,
  timelinePosts: JSON.parse(localStorage.getItem("profileFeeds")) || null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialStateValue,
  reducers: {
    loginStart: (state) => {
      state.user = null;
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isFetching = false;
      state.error = false;
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.isFetching = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    saveProfileFeeds: (state, action) => {
      state.profileFeeds = action.payload;
    },
    getProfileFeeds: (state, action) => {
      state.profileFeeds = action.payload;
    },
    saveTimelinePosts: (state, action) => {
      state.profileFeeds = action.payload;
    },
    getTimelinePosts: (state, action) => {
      state.profileFeeds = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  saveProfileFeeds,
  getProfileFeeds,
  saveTimelinePosts,
  getTimelinePosts,
} = userSlice.actions;
export default userSlice.reducer;
