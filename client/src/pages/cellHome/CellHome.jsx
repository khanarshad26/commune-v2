import React, { useState, useEffect, useContext } from "react";
import Topbar from "../../components/topbar/Topbar.jsx";
import InstituteSidebar from "../institute/instituteSidebar/InstituteSidebar.jsx"
import Feed from "../../components/feed/Feed.jsx";
import CellIntro from "./cellInto/CellIntro.jsx";
import Photos from "./photos/Photos.jsx";
import Videos from "./videos/Videos.jsx";
import EventCard from "../../components/eventCard/EventCard.jsx";
import { AuthContext } from "../../context/AuthContext.js";
import { Link } from "react-router-dom";
import "./cell.css";
import { useParams } from "react-router";
import axios from "axios";
import CellAbout from "./cellAbout/CellAbout.jsx";
import CellSidebar from "./cellSidebar/CellSidebar.jsx"

const CellHome = () => {

  const {user} = useContext(AuthContext);

  const [cell, setCell] = useState({});

  const [showHome, setShowHome] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [showWorkshop, setShowWorkshop] = useState(false);

  const [events, setEvents] = useState([]);
  const [workshops, setWorkshops] = useState([]);

  const fetchCell = async() => {
    try{
      const res = await axios.get(`/api/cell/${user._id}`);
      setCell(res.data);
    }catch(err){
      console.log(err);
    }
  }

  const fetchEvents = async () => {
    const res = await axios.get(`/api/event/cell/all/${user._id}`,{
      instituteId : cell.institute
    });
    setEvents(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  };

  const fetchWorkshops = async () => {
    const res = await axios.get(`/api/workshop/cell/all/${user._id}`,{
      instituteId : cell.institute
    });
    setWorkshops(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  };

  useEffect(() => {
    fetchCell();
    fetchEvents();
    fetchWorkshops();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])





  const CellHome = ({ cell }) => {
    return (
      <>
        <div className="clubHome">
          <div className="instituteclubBottomLeft">
            <CellIntro cell={cell} />
            <Photos  />
            <Videos  />
          </div>
          <div className="instituteclubBottomRight">
            <Feed />
          </div>
        </div>
      </>
    );
  };

  const CellEvent = () => {
    return (
      <>
        <div className="eventsList">
          {events.map((event) => {
            return <EventCard event={event} />;
          })}
        </div>
      </>
    );
  }

  const CellWorkshop = () => {
    return (
      <>
        <div className="eventsList">
          {workshops.map((event) => {
            return <EventCard event={event} />;
          })}
        </div>
      </>
    );
  }


  const homeClickHandler = () => {
    if (!showHome) setShowHome(true);
    if (showAbout) setShowAbout(false);
    if (showWorkshop) setShowWorkshop(false)
    if (showEvent) setShowEvent(false);
  }

  const eventClickHandler = () => {
    if (showHome) setShowHome(false);
    if (showAbout) setShowAbout(false);
    if (showWorkshop) setShowWorkshop(false);
    if (!showEvent) setShowEvent(true);
  }

  const aboutClickHandler = () => {
    if (showHome) setShowHome(false);
    if (!showAbout) setShowAbout(true);
    if (showWorkshop) setShowWorkshop(false);
    if (showEvent) setShowEvent(false);
  }

  const workshopClickHandler = () => {
    if (showHome) setShowHome(false);
    if (showAbout) setShowAbout(false);
    if (!showWorkshop) setShowWorkshop(true);
    if (showEvent) setShowEvent(false);
  }

  return (
    <>
     
      <div className="instituteAdminContainer">
        <div className="instituteSidebar">
          <CellSidebar />
        </div>
        <div className="instituteRightbar">
          <div className="instituteclubTop">
           
            <Link to="" className="instituteliveOption">
              
              <div className="instituteliveIcon">
                <img
                  className="instituteLiveICON"
                  src="/assets/images/liveIcon.png"
                  alt=" "
                />
              </div>
              <div className="institutetext">
                <span>Live</span>
              </div>

            </Link>

            <div className="instituteprofileCover">
              <img
                className="profileCoverImgInstitute"
                src={cell.coverPicture}
                alt=" "
              />
            </div>
            <div className="instituteprofile">
              <div className="instituteprofileLeft">
                <div className="instituteprofileImage">
                  <img
                    className="instituteprofileUserImg"
                    src={cell.profilePicture}
                    alt=" "
                  />
                </div>
                <div className="instituteName">
                  <span className="cellName">{cell.name}</span>
                  <div className="cellUserId">
                    <span className="cellUsername">@{cell.username}</span>
                    <span className="instituteclubType">{cell.category}</span>
                  </div>
                </div>
              </div>

              {/* <div className="institutemessage">
                <button className="institutemessageButton">
                  <img
                    className="institutemessageIcon"
                    src="/assets/images/messageIcon.png"
                    alt=" "
                  />{" "}
                  <span className="institutemeSSage">Message</span>
                </button>
                <span className="institutenote"> drop your queries here</span>
              </div> */}

            </div>

            <hr />
            <div className="instituteabout">
              <div className="instituteaboutLeft">
                <ul className="instituteaboutleftList">
                  <li onClick={homeClickHandler}>Home </li>
                  <li onClick={eventClickHandler}>Events</li>
                  <li onClick={workshopClickHandler}>Workshops</li>
                  <li onClick={aboutClickHandler}>About</li>
                  <li>
                    <select name="More" id="More" className="institutemore">
                      <option value="Select More">More</option>
                      <option value="teams">
                        <a href="">Teams</a>
                      </option>
                      <option value="Certificates">
                        <a href="">Certificates</a>
                      </option>
                      <option value="Projects">
                        <a href="">Projects</a>
                      </option>
                    </select>
                  </li>
                </ul>
              </div>
              <div className="institutefollow">
                <button className="institutefollowButton">Follow</button>
              </div>
            </div>
          </div>
          <div className="instituteclubBottom">
          </div>

          {/* _____bottom_______ */}
          {showHome ? <CellHome /> : null}
          {showAbout ? <CellAbout /> : null}
          {showEvent ? <CellEvent /> : null}
          {showWorkshop ? <CellWorkshop/> : null}

        </div>
      </div>
    </>
  );
};

export default CellHome;