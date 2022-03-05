import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  darkTheme : false,
  showMenu : false,
};

const utilitySlice = createSlice({
  name: "utility",
  initialState: initialStateValue,
  reducers: {
    setShowMenu : (state, action) => {
      state.showMenu = !state.showMenu;
    },
    setDarkTheme : (state) => {
      state.darkTheme = !state.darkTheme;
    },
  },
});

export const {
    setShowMenu,
    setDarkTheme,
} = utilitySlice.actions;
export default utilitySlice.reducer;
