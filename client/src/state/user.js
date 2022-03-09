import { createSlice } from "@reduxjs/toolkit";
import produce from 'immer'


const initialStateValue = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
  profilePosts: JSON.parse(localStorage.getItem("profilePosts")) || [],
  timelinePosts: JSON.parse(localStorage.getItem("timelinePosts")) || [],
  allPosts: JSON.parse(localStorage.getItem("allPosts")) || [],
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
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setProfileFeeds: (state, action) => {
      state.profileFeeds = action.payload;
    },
    setTimelinePosts: (state, action) => {
      state.profileFeeds = action.payload;
    },
    setProfilePicture : (state, action) => {
      // localStorage.setItem('user',JSON.stringify({...state.user, ...{profilePicture : action.payload}}));
      // return produce(state, draft => {
      //   draft.user.profilePicture = action.payload;
      // })
      // return {
      //   ...state,
      //   user : {
      //     ...state.user,
      //     profilePicture : action.payload
      //   }
      // }
      state.user = {...state.user, profilePicture : action.payload};
    },
    setCoverPicture : (state, action) => {
      state.user.coverPicture = action.payload;
    },
    setAllPosts : (state, action) => {
      state.allPosts = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setUser,
  setProfileFeeds,
  setTimelinePosts,
  setProfilePicture,
  setCoverPicture,
  setAllPosts,
} = userSlice.actions;
export default userSlice.reducer;
