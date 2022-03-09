import React from 'react';
import './clubIntro.css'

const ClubIntro = () => {

  return(
     <>
     <div className="clunIntrocontainer">
        <section className="clubIntrorightbarTitle">
                    <span className="instituteclubAboutSpan">About</span>
                    <img className="instituteIcons" src="/assets/images/infoIcon.png" alt=" " />
                  </section>
        <div className="rightbarInfo">
        <div className="accounts">
              <div className="accountIcon">
              <img src="/assets/school.png" style={{height:'30px', width:'30px'}} alt=" " />
              </div>
              <span className="accountPlateform1">NIT Andhra Pradesh</span>
            </div>
        <div className="accounts">
              <div className="accountIcon">
              <img src="/assets/like.png" style={{height:'30px', width:'30px'}} alt=" " />
              </div>
              <span className="accountPlateform1">1 person like</span>
            </div>
            <div className="accounts">
              <div className="accountIcon">
              <img src="/assets/images/followIcon.jpg" style={{height:'30px', width:'30px'}} alt=" "/>              </div>
              <span className="accountPlateform1">1 person follows</span>
            </div>
            <button className="shareButton1">Edit details</button>
        </div>
        </div>
     </>
  );
};

export default ClubIntro;
