import React, { useEffect, useState, useRef } from "react";
import "./style.css";

import Sidebar from "../../components/sidebar/Sidebar";
import { useSelector } from "react-redux";
import axios from "axios";
// import { Link } from "react-router-dom";
// import DropzoneComponent from "../../components/dropzone/Dropzone.jsx";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import { Cancel } from "@material-ui/icons";
import EventCard from "../../components/eventCard/EventCard.jsx";
import EventCard1 from "./EventCard1.jsx";

const Event = () => {
  const user = useSelector((state) => state.user.user);

  const [events, setEvents] = useState([]);
  const [campusEvents, setCampusEvents] = useState([]);
  const [exploreEvents, setExploreEvents] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [showEvents, setShowEvents] = useState(true);
  const [showCampusEvents, setShowCampusEvents] = useState(false);
  const [showExploreEvents, setShowExploreEvents] = useState(false);

  const fetchEvents = async () => {
    const res = await axios.get(`/api/event/all/${user._id}`);
    setEvents(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  };

  const fetchCampusEvents = async () => {
    const res = await axios.get(`/api/event/institute/all/${user.institute}`);
    setCampusEvents(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  };

  const fetchExploreEvents = async () => {
    const res = await axios.get(`/api/event/all/${user.institute}`);
    setExploreEvents(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  };

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const AddEvent = () => {
    const hostname = useRef(null);
    const name = useRef(null);
    const description = useRef(null);
    const from = useRef(null);
    const to = useRef(null);
    const venue = useRef(null);
    const summary = useRef(null);
    const type = useRef(null);
    const [file, setFile] = useState(null);

    const saveHandler = async (e) => {
      e.preventDefault();
      const addEvent = {
        userId: user._id,
        hostname: hostname.current.value,
        name: name.current.value,
        description: description.current.value,
        from: from.current.value,
        to: to.current.value,
        venue: venue.current.value,
        summary: summary.current.value,
        type: type.current.value,
        institute: user.institute,
      };
      if (file) {
        const data = new FormData();

        const fileName = Date.now() + file.name;
        data.append("name", fileName);
        data.append("file", file);
        addEvent.coverPicture = "/assets/" + fileName;
        try {
          await axios.post("/api/upload", data);
        } catch (err) {
          console.log(err);
        }
      }
      try {
        await axios.post(`/api/event/`, addEvent);
      } catch (err) {
        console.log(err);
      }
      setIsOpen(false);
      setFile(null);
      setShowEvents(true);
    };

    const cancelHandler = () => {
      setIsOpen(false);
      setShowEvents(true);
    };

    return (
      <>
        <div className="addEventShadowBox">
          <div className="shadowBoxUpper">
            <span className="shadowBoxText">Create Event</span>
          </div>
          <div className="add addEventContainer">
            <form className="form">
              <div className="halfSection">
                <div className="halfInputContainer">
                  <label className="label">Event Name</label>
                  <input type="text" className="input" ref={name} />
                </div>

                <div className="halfInputContainer">
                  <label className="label">Host Name</label>
                  <input type="text" className="input" ref={hostname} />
                </div>
              </div>

              <div className="fullSection">
                <div className="inputContainer">
                  <label className="label">Event Summary</label>
                  <input type="text" className="input" ref={summary} />
                </div>
              </div>

              <div className="fullSection">
                <div className="inputContainer">
                  <label className="label">Venue</label>
                  <input type="text" className="input" ref={venue} />
                </div>
              </div>

              <div className="halfSection">
                <div className="halfInputContainer">
                  <label className="label">From</label>
                  <input type="datetime-local" className="input" ref={from} />
                </div>
                <div className="halfInputContainer">
                  <label className="label">To</label>
                  <input type="datetime-local" className="input" ref={to} />
                </div>
              </div>

              <section className="halfInputContainer">
                <label className="labelEventType">Event Type</label>
                <select className="selectEvent" ref={type}>
                  <option value="Select event" diasabled>
                    --Select--
                  </option>
                  <option value="General">General</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Literary">Literary</option>
                  <option value="Technical">Technical</option>
                </select>
              </section>

              {/* <div className="fullSection">
                <div className="inputContainer">
                  <label className="label">Cover Picture</label>
                  <DropzoneComponent />
                </div>
              </div> */}

              <div className="inputContainer">
                <label htmlFor="file" className="shareOption">
                  <PhotoCameraBackIcon
                    htmlColor="tomato"
                    className="shareIcon"
                  />
                  <span className="label">Event Cover</span>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    accept=".png,.jpeg,.jpg, .pdf, .dox, .zip, .xlsx"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </label>
              </div>

              {file && (
                <div className="shareEventImgContainer">
                  <img
                    className="shareImg"
                    src={URL.createObjectURL(file)}
                    alt=" "
                  />
                  <Cancel
                    className="shareCancelImg"
                    onClick={() => setFile(null)}
                  />
                </div>
              )}

              <div className="fullSection">
                <div className="inputContainer">
                  <label className="label">Description</label>
                  <textarea
                    className=" addEventTextarea"
                    type="text"
                    rows={4}
                    ref={description}
                  />
                </div>
              </div>

              <div className="boxBottom">
                <div className="cancel" onClick={cancelHandler}>
                  Cancel
                </div>
                <div className="save" onClick={saveHandler}>
                  save
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };

  // const EventCard = ({ event }) => {
  //   const from = new Date(event.from);
  //   const month = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ];
  //   const time =
  //     month[from.getMonth()] +
  //     " " +
  //     from.getDate() +
  //     ", " +
  //     (from.getHours() % 12 < 10
  //       ? "0" + (from.getHours() % 12)
  //       : from.getHours() % 12) +
  //     ":" +
  //     (from.getMinutes() < 10 ? "0" + from.getMinutes() : from.getMinutes()) +
  //     " " +
  //     (from.getHours() >= 12 ? " PM" : " AM") +
  //     " IST";
  //   return (
  //     <>
  //       <div className="eventCardContainer">
  //         <img
  //           src={event.coverPicture || ""}
  //           className="eventThumbnailEvent"
  //           alt=" "
  //         />

  //         <div className="eventHost">{event.hostname}</div>
  //         <div className="eventTitle">{event.eventName}</div>
  //         <div className="startsOn">STARTS ON</div>
  //         <div className="eventTime">{time}</div>
  //         <Link to={{ pathname: `/event/${event._id}` }} className="learnMore">
  //           Know more
  //         </Link>
  //       </div>
  //     </>
  //   );
  // };

  const EventsList = ({ eventsList }) => {
    return (
      <>
        <div className="eventsList">
          {eventsList.map((event) => {
            return <EventCard event={event} />;
          })}
        </div>
      </>
    );
  };

  const showEventHandler = () => {
    setIsOpen(false);
    setShowCampusEvents(false);
    setShowEvents(true);
    setShowExploreEvents(false);
    fetchEvents();
  };

  const showCampusEventHandler = () => {
    setIsOpen(false);
    setShowCampusEvents(true);
    setShowEvents(false);
    setShowExploreEvents(false);
    fetchCampusEvents();
  };

  const showExploreEventHandler = () => {
    setIsOpen(false);
    setShowCampusEvents(false);
    setShowEvents(false);
    setShowExploreEvents(true);
    fetchExploreEvents();
  };

  const showAddEventHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="eventPageContainer">
        <div className="PagesSidebarWrapper">
          <Sidebar />
        </div>

        <div className="eventPageRight">
          <div className="yourEvents">
            <div className="commonLayoutHeader">
              <div className="commonLayoutHeaderLeft">
                <div className="fullScreen">
                  <div
                    className="commonLayoutHeading"
                    onClick={showEventHandler}
                  >
                    Your&nbsp;Events
                  </div>
                  <div
                    className="commonLayoutHeading"
                    onClick={showCampusEventHandler}
                  >
                    Campus&nbsp;Events
                  </div>
                  <div
                    className="commonLayoutHeading"
                    onClick={showExploreEventHandler}
                  >
                    Explore
                  </div>
                </div>

                {/* <div className="mobileScrean">
                  <div className="shareTypeOption">
                    <Event htmlColor="#00b4d8" className="shareIcon" />
                    <select
                      name="audience"
                      id="audience"
                      className="selectShare"
                    >
                      <optgroup label="Audience">
                        <option onClick={showEventHandler}>
                          Your&nbsp;Events
                        </option>
                        <option onClick={showCampusEventHandler}>
                          Campus&nbsp;Events
                        </option>
                        <option onClick={showExploreEventHandler}>
                          Explore
                        </option>
                      </optgroup>
                    </select>
                  </div>
                </div> */}
              </div>

              <div className="commonLayoutHeaderRight">
                <div
                  className="commonLayoutHeading"
                  onClick={showAddEventHandler}
                >
                +&nbsp;Add
                </div>
              </div>

              <div className="mobileScreen">
                <img src="/assets/plus.png" alt=" " className="eventAdd" onClick={showAddEventHandler}/>
              </div>


            </div>

            {isOpen ? <AddEvent /> : null}

            {showEvents ?<>
              <EventCard1 />
              {/* <EventsList eventsList={events} /> */}
            
            </> 
             : null}

            {showCampusEvents ? <EventsList eventsList={campusEvents} /> : null}

            {showExploreEvents ? (
              <EventsList eventsList={exploreEvents} />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
