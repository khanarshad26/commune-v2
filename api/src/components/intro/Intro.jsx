import React from 'react';
import './intro.css'

const Intro = () => {
  return(
     <>
     <div className="container">
        <h4 className="rightbarTitle">Intro</h4>
        <div className="rightbarInfo">
        <div className="accounts">
              <div className="accountIcon">
              <img src="/assets/school.png" style={{height:'30px', width:'30px'}} alt=" " />
              </div>
              <span className="accountPlateform1">Student at NIT-Andhra Pradesh</span>
            </div>
            <div className="accounts">
              <div className="accountIcon">
              <img src="/assets/graduate.png" style={{height:'30px', width:'30px'}} alt=" "/>              </div>
              <span className="accountPlateform1">Went to Govt. Excellence Higher Secondary School, Joura</span>
            </div>
            <div className="accounts">
              <div className="accountIcon">
              <img src="/assets/house.png"  style={{height:'30px', width:'30px'}} alt=" "/>              </div>
              <span className="accountPlateform1">Lives in Tadepalligudem</span>
            </div>
            <div className="accounts">
              <div className="accountIcon">
                <img src="/assets/heart 2.png" style={{height:'30px', width:'30px'}} alt=" "/>
              </div>
              <span className="accountPlateform1">Single</span>
            </div>
            <button className="shareButton1">Edit details</button>
        </div>
        </div>
     </>
  );
};

export default Intro;
