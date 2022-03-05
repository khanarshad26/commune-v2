import React from "react";
import "./bookmarks.css";
 
// import EventCard from "../../components/eventCard/EventCard";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";

const Bookmarks = () => {
  const eventDetails = [
    {
      event_id: "1",
      hostname: "E-Yantra Club",
      eventName: "Advanced Clean Transportation Expo",
      eventTime: "Fab 7, 08:00 PM IST",
      eventThumbnail: "assets/defaultEvent.jpeg",
    },
    {
      event_id: "2",
      hostname: "E-Yantra Club",
      eventName: "Advanced Clean Transportation Expo",
      eventTime: "Fab 7, 08:00 PM IST",
      eventThumbnail: "assets/defaultEvent.jpeg",
    },
  ];

  const EventCard = ({event}) => {
    return(
        <>
          <div className="eventCardContainer">
            <img src={event.eventThumbnail || ""} className="eventThumbnailEvent" alt=" " />
            
              <div className="eventHost">{event.hostname}</div>
              <div className="eventTitle">{event.eventName}</div>
              <div className="startsOn">STARTS ON</div>
              <div className="eventTime">{event.eventTime}</div>
              <Link to ={{pathname : `/event/${event._id}`}} className="learnMore" >Know more</Link>
            
          </div>
        </>
    );
  };

  return (
    <>
      <div className="eventPageContainer">
        <Sidebar />
        <div className="eventPageRight">
          <div className="yourEvents">
            <div className="commonLayoutHeader">
              <div className="commonLayoutHeaderLeft">
                <div className="commonLayoutHeading">Events</div>
                <div className="commonLayoutHeading">Projects</div>
                <div className="commonLayoutHeading">Workshops</div>
                <div className="commonLayoutHeading">Newsletters</div>
                <div className="commonLayoutHeading">Research&nbsp;paper</div>
                <div className="commonLayoutHeading">Notifications</div>
                <div className="commonLayoutHeading">Explore</div>
              </div>
            </div>
            {/* <hr className="hrEvent" /> */}
            <div className="eventsList">
              {eventDetails.map((event) => {
                return <EventCard event={event} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookmarks;
