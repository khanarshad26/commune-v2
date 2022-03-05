import React, { useRef } from "react";
import "./signup2.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup2 = () => {
  const email = useRef();
  const password = useRef();
  const username = useRef();
  const institute = useRef();
  // const usertype = useRef();
  const navigate = useNavigate();
  const [type, setType] = useState("Institute")

  const submitHandler = async (e) => {
    e.preventDefault();
    if(type==="Institute"){
      const institute = {
        name: username.current.value,
        email: email.current.value,
        password: password.current.value
      };
      console.log(institute)
      try {
        await axios.post("/api/institute/register", institute);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
    else if(type === "Club" || type === "Association"){
      const user = {
        name: username.current.value,
        email: email.current.value,
        password: password.current.value,
        type : type,
        department : "Engineering",
        institute : institute.current.value
      };
      try {
        await axios.post("/api/cell/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
    else if(type === "Faculty"){
      const faculty = {
        name: username.current.value,
        email: email.current.value,
        password: password.current.value,
        type : type,
        institute : institute.current.value
      };
      try {
        await axios.post("/api/auth/register", faculty);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <div className="signup">
        <div className="logoTextSignup">Commune</div>
        <div className="signupBox">
        <Link to="/register" className="instituteDirect">
            Are you an student?
            <span className="iink"> Register Here</span>
          </Link>
          <form onSubmit={submitHandler} className="form">

          <div className="inputContainer">
              <label className="label">Type</label>
              <select name="event" id="event" className="select" value={type} onChange={(e) => setType(e.target.value)}>
                <optgroup label="Event type">
                <option value="select" disabled>---select---</option>
                  <option value="Institute">Institute</option>
                  <option value="Club">Club</option>
                  <option value="Association">Association</option>
                  <option value="Faculty">Faculty</option>
                </optgroup>
              </select>
            </div>


            <div className="inputContainer">
              <label className="label">Name</label>
              <input type="text" className="input" ref={username} />
            </div>

            {(type !== "Institute") ? <div className="inputContainer">
              <label  className="label">
                Institute
              </label>
              <select name="event" id="event" className="select" ref={institute}>
                <optgroup label="Institute">
                  <option value="621baa97a71682039fc8ecde">NIT Andhra Pradesh</option>
                  <option value="Other">Other</option>
                </optgroup>
              </select>
            </div> : null}

            <div className="inputContainer">
              <label className="label">Email</label>
              <input type="email" className="input" ref={email} />
            </div>

            <div className="inputContainer">
              <label className="label">Password</label>
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
          {/* <hr className="hr" />
          <div className="googleLogin1">
            <img
              src="assets/google.png"
              width={"20px"}
              height={"20px"}
              alt=""
              className="googleIcon"
            />
            <div className="googleText">Continue&nbsp;with&nbsp;Google</div>
          </div> */}

          <div className="loginDirect">
            Already on Commune?&nbsp;
            <Link to="/login" className="iink">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup2;
