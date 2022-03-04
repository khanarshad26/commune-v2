import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  if(userCredential.type === "Student" || userCredential.type === "Faculty"){
    try {
      const res = await axios.post("/api/auth/login", userCredential);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
  }else if(userCredential.type === "Club" || userCredential.type === "Association"){
    try {
      const res = await axios.post("/api/cell/login", userCredential);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
  }else if(userCredential.type === "Institute"){
    try {
      const res = await axios.post("/api/institute/login", userCredential);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
  }
};

