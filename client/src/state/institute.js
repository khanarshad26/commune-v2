import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  institute : JSON.parse(localStorage.getItem("user")) || null,
  profileFeeds: JSON.parse(localStorage.getItem("profileFeeds")) || null,
  timelinePosts: JSON.parse(localStorage.getItem("profileFeeds")) || null,
};

const instituteSlice = createSlice({
  name: "institute",
  initialState: initialStateValue,
  reducers: {
    setProfilePicture : (state, action) => {
      state.institute.profilePicture = action.payload;
    },
    setCoverPicture : (state, action) => {
      state.institute.coverPicture = action.payload;
    },
    setInstitute : (state, action) => {
      state.institute = action.payload;
    },
    setClublist : (state, action) => {
      state.institute.clubs = action.payload;
    },
    setAssociationslist : (state, action) => {
      state.institute.associations = action.payload;
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
  setProfilePicture,
  setCoverPicture,
  setInstitute,
  setClublist,
  setAssociationslist,
} = instituteSlice.actions;
export default instituteSlice.reducer;
