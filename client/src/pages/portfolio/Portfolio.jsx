import "./portfolio.css";
import React, { useState, useContext, useEffect } from 'react';
import axios from "axios";
import { AuthContext } from '../../context/AuthContext.js';
import Topbar from "../../components/topbar/Topbar";
import ConnectedAccounts from "../../components/connectedAccounts/ConnectedAccounts";
import About from "../../components/portfolio/about/About";
import Education from "../../components/portfolio/education/Education";
import Experience from "../../components/portfolio/experience/Experience";
import Project from "../../components/portfolio/project/Project";
import Achievement from "../../components/portfolio/achievement/Achievement";
import Interest from "../../components/portfolio/interest/Interest";
import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Portfolio() {
  const { user: currrentUser } = useContext(AuthContext);
  // const [user, setUser] = useState({});
  // const {user : currrentUser} = useContext(AuthContext);

  // const fetchUser = async () => {
  //   const res = await axios.get(`/api/user/${currrentUser._id}`);
  //   setUser(res.data);
  // };

  // useEffect(() => {
  //   fetchUser();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[])

  return (
    <>

      <div className="portfolio">
        <div className="portfolioTop">

          <img src="/assets/noAvatar.png" className="portfolioTopImage" alt=" " />

          <div className="portfolioTopLeft">

            <div className="name">{currrentUser?.username}</div>
            <div className="address">{currrentUser?.address?.city}</div>

            {currrentUser?.email && <div className="emailnPhone">
              <AttachEmailOutlinedIcon className="shareIcon"
                htmlColor="#0077b6" />
              <div className="portfolioDetail">{currrentUser?.email}</div>
            </div>}


            {currrentUser?.phone && <div className="emailnPhone">

              <LocalPhoneOutlinedIcon className="shareIcon"
                htmlColor="#0077b6" />
              <div className="portfolioDetail">{currrentUser?.phone}</div>
            </div>
            }


          </div>

          <div className="portfolioTopRight">
            <div className="portfolioTopEdit">
              <MoreVertIcon />
            </div>
            <div className="portfolioShare">
              <SendIcon className="shareIcon"
                htmlColor="#0077b6" />
              <div className="portfolioShareText">Share</div>
            </div>
          </div>

        </div>

        <div className="portfolioBottom">

          <div className="portfolioBottomLeft">
            <ConnectedAccounts />
          </div>

          <div className="portfolioBottomRight">
            <About />
            <Education />
            <Experience />
            <Project />
            <Achievement />
            <Interest />
          </div>

        </div>

      </div>
    </>
  );
}
