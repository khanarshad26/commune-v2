import "./register.css";
import {Link} from "react-router-dom"

export default function Register() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <div className="loginLogo1">CampusCommune</div>
          <span className="loginDesc">
            Connect with your vitual campus and create strong and meaningful communities.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Username" className="loginInput" />
            <input placeholder="Email" className="loginInput" />
            <input placeholder="Password" className="loginInput" />
            <input placeholder="Password Again" className="loginInput" />
            <button className="loginButton">Create your free account</button>
            {/* <button className="loginRegisterButton"> */}
              <Link to="#">Log into Account</Link>
            {/* </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
