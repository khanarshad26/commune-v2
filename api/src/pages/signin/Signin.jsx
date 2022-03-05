import React, { useRef } from "react";
import "./signin.css";
import { Link } from "react-router-dom";
import { loginCall } from "../../apiCalls";
import { useState } from "react";
import {useDispatch} from 'react-redux';

const Signin = () => {
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const [type, setType] = useState("Student");

  const SigninHandler = async (e) => {
    e.preventDefault();
    loginCall(
      {
        type: type,
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    );
  };

  return (
    <>
      <div className="signin">
        <div className="logoText2">Commune</div>
        <div className="signupBox">
          <form onSubmit={SigninHandler} className="form">
            <div className="inputContainer">
              <label className="label">Type</label>
              <select
                name="event"
                id="event"
                className="select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <optgroup label="Event type">
                  <option value="select" disabled>
                    ---select---
                  </option>
                  <option value="Student">Student</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Institute">Institute</option>
                  <option value="Club">Club</option>
                  <option value="Association">Association</option>
                </optgroup>
              </select>
            </div>

            <div className="inputContainer">
              <label className="label">Email</label>
              <input type="email" className="input" ref={email} />
            </div>

            <div className="inputContainer">
              <label className="label">Password</label>
              <input type="password" className="input" ref={password} />
              <div className="forgotPassword">
                <span className="iink" style={{ fontSize: "12px" }}>
                  Forgot Password?
                </span>
              </div>
            </div>

            <input type="submit" className="submitBtn" value="Sign in" />
          </form>
          <hr className="hr" />
          <div className="googleLogin2">
            <img
              src="assets/google.png"
              width={"20px"}
              height={"20px"}
              alt=""
              className="googleIcon"
            />
            <div className="googleText">Continue&nbsp;with&nbsp;Google</div>
          </div>

          <div className="loginDirect">
            New to Commune?&nbsp;
            <Link to="/register" className="iink">
              Join now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
