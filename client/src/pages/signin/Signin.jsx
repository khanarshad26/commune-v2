import React, { useRef } from "react";
import "./signin.css";
import { Link } from "react-router-dom";
// import {useNavigate} from 'react-router-dom';
// import axios from "axios";
import { AuthContext } from '../../context/AuthContext.js';
import { useContext } from "react";
import {useDispatch} from 'react-redux';
import { loginCall } from "../../apiCalls";
import { useState } from "react";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
const clientId = "922824643249-iojogc08q3m32q62lnc4aq4ic5vpuu7r.apps.googleusercontent.com";

const Signin = () => {

  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);
  const onLoginSuccess = (res) => {
    console.log('Login Success:', res.profileObj);
    setShowloginButton(false);
    setShowlogoutButton(true);
  };

  const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
  };

  const onSignoutSuccess = () => {
    alert("You have been logged out successfully");
    console.clear();
    setShowloginButton(true);
    setShowlogoutButton(false);
  };

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
                  <option value="select" disabled>---select---</option>
                  <option value="Student">Student</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Institute">Institute</option>
                  <option value="Club">Club</option>
                  <option value="Association">Association</option>
                </optgroup>
              </select>
            </div>

            <div className="inputContainer">
              <label className="label">
                Email
              </label>
              <input type="email" className="input" ref={email} />
            </div>

            <div className="inputContainer">
              <label className="label">
                Password
              </label>
              <input type="password" className="input" ref={password} />
              <div className="forgotPassword">

                <span className="iink" style={{ fontSize: '12px' }} >Forgot Password?</span>
              </div>
            </div>



            <input type="submit" className="submitBtn" value="Sign in" />
          </form>
          <hr className='hr' />
          {/* <div className="googleLogin2">
              <img src="assets/google.png" width={'20px'} height={'20px'} alt='' className="googleIcon"/>
          <div className="googleText">Continue&nbsp;with&nbsp;Google</div>
          </div> */}

          <div>
            {showloginButton ?
              <GoogleLogin
                clientId={clientId}
                buttonText="Sign In"
                onSuccess={onLoginSuccess}
                onFailure={onLoginFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
              /> : null}

            {showlogoutButton ?
              <GoogleLogout
                clientId={clientId}
                buttonText="Sign Out"
                onLogoutSuccess={onSignoutSuccess}
              >
              </GoogleLogout> : null
            }
          </div>


          <div className="loginDirect">
            New to Commune?&nbsp;<Link to='/register' className="iink">Join now</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
