import "./portfolio.css";
import React, {useState, useContext, useEffect} from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';
 
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
  // const [user, setUser] = useState({});
  const user = useSelector(state => state.user.user);

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
          
          <img src="/assets/noAvatar.png" className="portfolioTopImage" alt=" "/>

          <div className="portfolioTopLeft">

            <div className="name">{user.username || "Name"}</div>
            {user?.address?.current ? <div className="address">{user?.address?.current?.city + ", "+user?.address?.current?.state }</div> : null}
            
            {user.email ?<div className="emailnPhone">
              <AttachEmailOutlinedIcon className="shareIcon"
                htmlColor="#0077b6" />
               <div className="portfolioDetail">{user?.email}</div>
            </div> : null}
            
            { user.phone ?<div className="emailnPhone">
              <LocalPhoneOutlinedIcon className="shareIcon"
                htmlColor="#0077b6" />
                <div className="portfolioDetail">{user?.phone}</div>
            </div> : null}

          </div>

          <div className="portfolioTopRight">
            <div className="portfolioTopEdit">
              <MoreVertIcon />
            </div>
            <div className="portfolioShare">
              <SendIcon className="shareIcon"
                htmlColor="#0077b6"/>
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
