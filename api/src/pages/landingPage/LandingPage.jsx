import React from 'react';
import './landingPage.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
      <>
        {/* topbar------ */}
        <div className="hero-image" >
        <div className="topbar">
            <div className="lefttopbar">
                <div className="logoText">Commune</div>
            </div>
            <div className="righttopbar">
                <Link to='/register' className="join"  >Join&nbsp;now</Link>
                <Link to='/login' className="signIn">Sign&nbsp;In</Link>
            </div>
        </div>

        {/* -----welcome------- */}
        <div className="welcomeText">
        Welcome to your <br/> Campus community
        </div>

        <div className="footer-text">
          Commune  {"Ⓒ"} 2022
        </div>
        </div>
      </>
  );
};

export default LandingPage;
