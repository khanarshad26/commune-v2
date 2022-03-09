// import React from 'react';
import axios from "axios";
import {loginStart, loginSuccess, loginFailure} from "./state/user.js";

export const loginCall = async (userCredential, dispatch) => {
  dispatch(loginStart());
  if(userCredential.type === "Student" || userCredential.type === "Faculty"){
    try {
      const res = await axios.post("/api/auth/login", userCredential);
      dispatch(loginSuccess(res.data));
      localStorage.setItem('user',JSON.stringify(res.data));
    } catch (err) {
      dispatch(loginFailure(err));
    }
  }else if(userCredential.type === "Club" || userCredential.type === "Association"){
    try {
      const res = await axios.post("/api/cell/login", userCredential);
      dispatch(loginSuccess(res.data));
      localStorage.setItem('user',JSON.stringify(res.data));
    } catch (err) {
      dispatch(loginFailure(err));
    }
  }else if(userCredential.type === "Institute"){
    try {
      const res = await axios.post("/api/institute/login", userCredential);
      dispatch(loginSuccess(res.data));
      localStorage.setItem('user',JSON.stringify(res.data));
    } catch (err) {
      dispatch(loginFailure(err));
    }
  }
};




// ------------
// import axios from "axios";
// import { useDispatch } from 'react-redux';
// import {loginStart, loginSuccess, loginFailure} from "../state/user.js";

// export const loginCall = async (userCredential, dispatch) => {
//   dispatch(loginStart());
//   if(userCredential.type === "Student" || userCredential.type === "Faculty"){
//     try {
//       const res = await axios.post("/api/auth/login", userCredential);
//       dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
//     } catch (err) {
//       dispatch({ type: "LOGIN_FAILURE", payload: err });
//     }
//   }else if(userCredential.type === "Club" || userCredential.type === "Association"){
//     try {
//       const res = await axios.post("/api/cell/login", userCredential);
//       dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
//     } catch (err) {
//       dispatch({ type: "LOGIN_FAILURE", payload: err });
//     }
//   }else if(userCredential.type === "Institute"){
//     try {
//       const res = await axios.post("/api/institute/login", userCredential);
//       dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
//     } catch (err) {
//       dispatch({ type: "LOGIN_FAILURE", payload: err });
//     }
//   }
// };
