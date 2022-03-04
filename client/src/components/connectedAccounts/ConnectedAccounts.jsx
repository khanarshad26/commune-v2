import React from "react";
import "./connectedAccounts.css";

const ConnectedAccounts = () => {
  return (
    <div className="sidebarConnectedAccounts ">
      <div className="sidebarWrapperAccounts">
        

            <div className="shadowBoxText">Connected Accounts</div>
        

            <div className="accounts">
              <div className="accountIcon">
              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="30px" height="30px"><path fill="#455A64" d="M40.3,15.7c0.6-1.7,1.2-5-0.4-8.7c-4.5,0-8.3,3.2-8.9,3.8c-2.2-0.5-4.6-0.7-7-0.7c-2.5,0-4.9,0.3-7.2,0.8C13.7,7.7,9.6,7,8,7c0,0-0.9,1.8-0.9,5c0,2,0.5,3.2,0.8,3.8C5.5,18.3,4,21.7,4,26.1c0,11.2,7.1,15,20,15s20-3.8,20-15C44,21.5,42.6,18.1,40.3,15.7z"/><path fill="#FFCCBC" d="M24,39c-8.2,0-15-1.4-15-9c0-2.9,1.6-4.5,2.7-5.5c2.5-2.2,6.7-1.2,12.3-1.2c4.1,0,7.6-0.7,10.4,0.2c2.8,0.9,4.6,3.5,4.6,6.3C39,37.7,35,39,24,39z"/><path fill="#D84315" d="M25,34c0,0.6-0.4,1-1,1s-1-0.4-1-1s0.4-1,1-1S25,33.4,25,34z M26.5,36.5c0.2-0.2,0.2-0.5,0-0.7s-0.5-0.2-0.7,0c-0.9,0.9-2.6,0.9-3.5,0c-0.2-0.2-0.5-0.2-0.7,0s-0.2,0.5,0,0.7c0.7,0.7,1.5,1,2.5,1S25.8,37.1,26.5,36.5z"/><path fill="#FFF" d="M19,29.5c0,2.5-1.3,4.5-3,4.5s-3-2-3-4.5s1.3-4.5,3-4.5S19,27,19,29.5z M32,25c-1.7,0-3,2-3,4.5s1.3,4.5,3,4.5c1.7,0,3-2,3-4.5S33.7,25,32,25z"/><path fill="#6D4C41" d="M34,30c0,1.7-0.9,3-2,3s-2-1.3-2-3c0-0.2,0-0.5,0.1-0.7c0.1,0.4,0.5,0.7,0.9,0.7c0.6,0,1-0.4,1-1c0-0.6-0.4-1-1-1c-0.2,0-0.4,0.1-0.6,0.2c0.4-0.7,0.9-1.2,1.6-1.2C33.1,27,34,28.3,34,30z M16,27c-0.7,0-1.2,0.5-1.6,1.2c0.2-0.1,0.4-0.2,0.6-0.2c0.6,0,1,0.4,1,1c0,0.6-0.4,1-1,1c-0.4,0-0.8-0.3-0.9-0.7c0,0.2-0.1,0.5-0.1,0.7c0,1.7,0.9,3,2,3s2-1.3,2-3S17.1,27,16,27z"/></svg>
              </div>
              <span className="accountPlateform">Github</span>
            </div>
            <div className="accounts">
              <div className="accountIcon">
              <img src="/assets/stack-overflow.png" style={{height:'30px', width:'30px'}} alt=" "/>              </div>
              <span className="accountPlateform">Stack Overflow</span>
            </div>
            <div className="accounts">
              <div className="accountIcon">
              <img src="/assets/linkedin.png"  style={{height:'30px', width:'30px'}} alt=" "/>              </div>
              <span className="accountPlateform">LinkedIn</span>
            </div>
            <div className="accounts">
              <div className="accountIcon">
                <img src="/assets/hackerrank.png" style={{height:'30px', width:'30px'}} alt=" " />
              </div>
              <span className="accountPlateform">HackerRank</span>
            </div>
            <button className="shareButton1">Connect</button>
      </div>
    </div>
  );
};

export default ConnectedAccounts;
