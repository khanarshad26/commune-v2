import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
  profilePosts: JSON.parse(localStorage.getItem("profilePosts")) || [],
  timelinePosts: JSON.parse(localStorage.getItem("timelinePosts")) || [],
  allPosts: JSON.parse(localStorage.getItem("allPosts")) || [],
  profilePicture : ""
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
    setProfilePosts: (state, action) => {
      return({
        ...state,
        profilePosts : action.payload
      })
    },
    setTimelinePosts: (state, action) => {
      return({
        ...state,
        timelinePosts : action.payload
      })
    },
    setProfilePicture : (state, action) => {
      return ({
        ...state,
        user : {
          ...state.user,
          profilePicture : action.payload
        }
      })
    },
    setCoverPicture : (state, action) => {
      return ({
        ...state,
        user : {
          ...state.user,
          coverPicture : action.payload
        }
      })
    },
    setAllPosts : (state, action) => {
      return({
        ...state,
        allPosts : action.payload
      })
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setProfilePosts,
  setTimelinePosts,
  setProfilePicture,
  setCoverPicture,
  setAllPosts,
} = userSlice.actions;
export default userSlice.reducer;
