import React, {useState, useEffect} from "react";
import InstituteSidebar from "./instituteSidebar/InstituteSidebar.jsx";
import Feed from "../../components/feed/Feed.jsx";
import ClubIntro from "./clubIntro/ClubIntro.jsx";
import Photos from "./photos/Photos.jsx";
import Videos from "./videos/Videos.jsx";
import EventCard from "../../components/eventCard/EventCard.jsx";
import { useSelector } from 'react-redux'; 
import axios from "axios";
import "./institute.css";

const Institute = () => {

  const user = useSelector(state => state.user.user);

    const [campusEvents, setCampusEvents] = useState([]);
    const [campusworkshops, setCampusworkshops] = useState([]);

    const [showHome, setShowHome] = useState(true);
    const [showAbout, setShowAbout] = useState(false);
    const [showEvent, setShowEvent] = useState(false);
    const [showWorkshop, setShowWorkshop] = useState(false);
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
      const res = await axios.get(`/api/post/timeline/all/${user.type}/${user._id}`);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
  // 
    useEffect(() => {
      fetchPosts();
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // const [showInstituteRightBar, setShowInstituteRightBar] = useState(true);
    // const [showAddCell, setShowAddCell] = useState(false);

    const fetchCampusEvents = async () => {
      let id = "";
      if(user.type !== "Institute") id = user.institute
      else id = user._id
      const res = await axios.get(`/api/event/institute/all/${id}`);
      // console.log()
      setCampusEvents(
        res.data.sort((p1, p2) => {
          return new Date(p1.createdAt) - new Date(p2.createdAt);
        })
      );
      // console.log(campusEvents);
    };

    const fetchCampusworkshops = async () => {
      let id = "";
      if(user.type !== "Institute") id = user.institute
      else id = user._id
      const res = await axios.get(`/api/workshop/institute/all/${id}`);
      setCampusworkshops(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };

    useEffect(() => {
      fetchCampusEvents();
      fetchCampusworkshops();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  const ClubHome = () => {
    return (
      <>
      <div className="clubHome">
        <div className="instituteclubBottomLeft">
          <ClubIntro />
          <Photos />
          <Videos />
        </div>
        <div className="instituteclubBottomRight">
          <Feed posts={posts}/>
        </div>
        </div>
      </>
    );
  };


  const ClubAbout = () => {
      return(
        <div className="aboutBottom">
        <div className="generalInfo">
          <div className="Header">
            <span>
              GENERAL INFORMATION
              <hr />
            </span>
          </div>
          <div className="genInfo genInfospan">
            <div>
              <img
                className="genInfoIcons"
                src="assets/images/organizationIcon.png"
                alt=" "
              />
            </div>
            <div>
              <span>Engineering Institute</span>
            </div>
          </div>
          <div className="genInfo">
            <div>
              <img
                className="genInfoIcons"
                src="assets/images/DescriptionIcon.png"
                alt=" "
              />
            </div>
            <div>
              <span>An autonomous Institute under the aegis of Ministry of Education, Govt. of India</span>
            </div>
          </div>
          <div className="genInfo">
            <div>
              <img
                className="genInfoIcons"
                src="assets/images/calendarIcon.png"
                alt=" "
              />
            </div>
            <div>
              <span>National Institute of Technology, Andhra Pradesh is the 31st institution among the chain of NITs started by the Government of India. NIT Andhra Pradesh is established in the state of Andhra Pradesh recently in the academic year 2015 – 2016. Currently the Institute is offering B.Tech., M.Tech., Ph.D. and MS programmes.</span>
            </div>
          </div>
          <div className="genInfo">
            <div>
              <img
                className="genInfoIcons"
                src="assets/images/addressIcon.png"
                alt=" "
              />
            </div>
            <div>
              <span>old aerodrome, Near Kondruprolu, Tadepalligudem, Andhra Pradesh 534101</span>
            </div>
          </div>
          <div className="people">
            <div className="peopleInfo">
              <div className="">
                <img
                  className="genInfoPics"
                  src="assets/images/camera icon.png"
                  alt=" "
                />
              </div>
              <div className="peopleRight">
                <span className="peopleName">Prof. C. S. P. Rao</span>
                <span className="peoplePosition">Director</span>
              </div>
            </div>
            <div className="peopleInfo">
              <div className="peoplePic">
                <img
                  className="genInfoPics"
                  src="assets/images/sanju.jpg"
                  alt=" "
                />
              </div>
              <div className="peopleRight">
                <span className="peopleName">Hariom Singh</span>
                <span className="peoplePosition">General Secretary</span>
              </div>
            </div>
          </div>
        </div>
        <div classpans="ContactInfo">
          <div className="Header">
            <span className="general">
              CONTACT INFORMATION
              <hr />
            </span>
          </div>
          <div className="conInfo">
            <div className="conInfoRight">
              <div>
                <img
                  className="genInfoIcons"
                  src="assets/images/emailIcon.png"
                  alt=" "
                />
              </div>
              <div className="conMail">
                <span>nitandhra@commune.ac.in</span>
              </div>
            </div>
            <div className="conInfoRightPhone">
              <div>
                <img
                  className="genInfoIcons"
                  src="assets/images/phoneIcon.png"
                  alt=" "
                />
              </div>
              <div className="conMail">
                <span>+91 8299165446</span>
              </div>
            </div>
          </div>
        </div>
        <div className="sposors">
          <div className="sponInfo Header">
            <span className="general">
              Sponsors
              <hr />
            </span>
          </div>
        </div>
        <div className="socialMedia">
          <div className="conInfo Header">
            <span className="general">
              Social Media Accounts
              <hr />
            </span>
          </div>
          <div className="SocialmediaIcons">
            <div className="Insta">
              <img
                className="genInfoIcons"
                src="assets/images/icons8-instagram-48.png"
                alt=" "
              />
            </div>
            <div className="Facebook">
              <img
                className="genInfoIcons"
                src="assets/images/icons8-facebook-48.png"
                alt=" "
              />
            </div>
            <div className="Twitter">
              <img
                className="genInfoIcons"
                src="assets/images/icons8-twitter-circled-48.png"
                alt=" "
              />
            </div>
            <div className="LinkedIn">
              <img
                className="genInfoIcons"
                src="assets/images/icons8-linkedin-circled-48.png"
                alt=" "
              />
            </div>
            <div className="Youtube">
              <img
                className="genInfoIcons"
                src="assets/images/icons8-youtube-48.png"
                alt=" "
              />
            </div>
          </div>
        </div>
        </div>
      )
  }

  const ClubEvent = () => {
    return (
        <>
          <div className="eventsList">
            {campusEvents.map((event) => {
              return <EventCard event={event} />;
            })}
          </div>
        </>
      );
  }

  const ClubWorkshop = () => {
    return (
        <>
          <div className="eventsList">
            {campusworkshops.map((event) => {
              return <EventCard event={event} />;
            })}
          </div>
        </>
      );
  }


const homeClickHandler = () => {
    if(!showHome) setShowHome(true);
    if(showAbout) setShowAbout(false);
    if(showWorkshop) setShowWorkshop(false) 
    if(showEvent) setShowEvent(false) ;
}

  const eventClickHandler = () => {
    if(showHome)  setShowHome(false) ;
    if(showAbout)  setShowAbout(false) ;
    if(showWorkshop)  setShowWorkshop(false) ;
    if(!showEvent)  setShowEvent(true) ;
    fetchCampusEvents();
    console.log(campusEvents)
}

const aboutClickHandler = () => {
    if(showHome)  setShowHome(false) ;
    if(!showAbout)  setShowAbout(true) ;
    if(showWorkshop)  setShowWorkshop(false) ;
    if(showEvent) setShowEvent(false) ;
}

const workshopClickHandler = () => {
    if(showHome) setShowHome(false) ;
    if(showAbout) setShowAbout(false) ;
    if(!showWorkshop)  setShowWorkshop(true) ;
    if(showEvent) setShowEvent(false) ;
}

  return (
    <>
       
      <div className="instituteAdminContainer">
        <div className="instituteSidebar">
          <InstituteSidebar />
        </div>
        <div className="instituteRightbar">
          <div className="instituteclubTop">
            <div className="instituteliveOption">
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
            </div>
            <div className="instituteprofileCover">
              <img
                className="profileCoverImgInstitute"
                src="/assets/nitandhra.png"
                alt=" "
              />
            </div>
            <div className="instituteprofile">
              <div className="instituteprofileLeft">
                <div className="instituteprofileImage">
                  <img
                    className="instituteprofileUserImg"
                    src="/assets/nitaplogo3.jpeg"
                    alt=" "
                  />
                </div>
                <div className="instituteName">
                  <span className="cellName">NIT&nbsp;Andhra&nbsp;Pradesh</span>
                  <div className="cellUserId">
                    <span className="cellUsername">@nitandhra</span>
                    <span className="instituteclubType">An autonomous Institute under the aegis of Ministry of Education, Govt. of India</span>
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
                      Teams
                      </option>
                      <option value="Certificates">
                      Certificates
                      </option>
                      <option value="Projects">
                      Projects
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
          {showHome ? <ClubHome /> : null }
          {showAbout ? <ClubAbout /> : null}
          {showEvent ? <ClubEvent /> : null}
          {showWorkshop ? <ClubWorkshop /> : null}

        </div>
      </div>
    </>
  );
};

export default Institute;
