import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  recommendedConnections : [],
  connections : JSON.parse(localStorage.getItem("connections")) || [],
  connectionRequests : [],
  connectRequests : [],
};

const connectionSlice = createSlice({
  name: "connection",
  initialState: initialStateValue,
  reducers: {
    setRecommendedConnections : (state, action) => {
      state.recommendedConnections = action.payload;
    },
    setConnections : (state, action) => {
      state.connections = action.payload;
    },
    setConnectionRequests : (state, action) => {
      state.connectionRequests = action.payload;
    },
    setConnectRequests : (state, action) => {
      state.connectionRequests = action.payload;
    },
  },
});

export const {
    setRecommendedConnections,
    setConnections,
    setConnectionRequests,
    setConnectRequests,
} = connectionSlice.actions;
export default connectionSlice.reducer;