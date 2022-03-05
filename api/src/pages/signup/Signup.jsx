import React, {useRef} from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';



const Signup = () => {
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const institute = useRef();
  const navigate = useNavigate();

  const submitHandler = async(e) => {
     e.preventDefault();
     const user = {
       username : username.current.value,
       email : email.current.value,
       password : password.current.value,
       institute : institute.current.value,
       type : "Student"
     }
     try {
      await axios.post("/api/auth/register", user);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="signup">
        <div className="logoText1">Commune</div>
        <div className="signupBox">

          <Link to="/signup" className="instituteDirect">
            Not a student?
            <span className="iink"> Register Here</span>
          </Link>
          <form onSubmit={submitHandler} className="form">
          <div className="inputContainer">
              <label  className="label">
                Name
              </label>
              <input type="text" className="input" ref={username} />
            </div>

            <div className="inputContainer">
              <label  className="label">
                Institute
              </label>
              <select name="event" id="event" className="select" ref={institute}>
                <optgroup label="Institute">
                {/* <option value="select" disabled>---select---</option> */}
                  <option value="6221915c5636700c16806c89">NIT Andhra Pradesh</option>
                  <option value="Other">Other</option>
                </optgroup>
              </select>
            </div>

            <div className="inputContainer">
              <label  className="label">
                Email
              </label>
              <input type="email" className="input" ref={email} />
            </div>

            <div className="inputContainer">
              <label className="label">
                Password
              </label>
              <input type="password" className="input" ref={password} />
            </div>

            <div className="agreeTerms">
              By clicking Agree & Join, you agree to the Commune{" "}
              <span className="iink">User Agreement</span>,
              <span className="iink">Privacy Policy</span>, and{" "}
              <span className="iink">Cookie Policy</span>.
            </div>

            <input type="submit" className="submitBtn1" value="Agree & Join" />
          </form>
          {/* <hr className='hr'/>
          <div className="googleLogin1">
              <img src="assets/google.png" width={'20px'} height={'20px'} alt='' className="googleIcon"/>
          <div className="googleText">Continue&nbsp;with&nbsp;Google</div>
          </div> */}

          <div className="loginDirect">
          Already on Commune?&nbsp;<Link to='/login' className="iink">Sign in</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
