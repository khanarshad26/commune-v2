import React, {useContext, useEffect, useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import './event.css'

const EventHome = () => {
  const [events, setEvents] = useState([]);
  const {user} = useContext(AuthContext);

  const fetchEvents = async () => {
    const res = await axios.get(`/api/homeevents/all/${user._id}`);
    setEvents(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  };

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  const EventHomeTemplate = ({event}) => {
    return(
      <>
        <div className="eventContainer">
          <div className="eventText"><b>{event.hostname}</b> has organized this event {event.eventTime} <b>@{event.eventVenue}</b></div>
          <img src= {event.eventThumbnail} className="thumbnailEvent" alt=" " />
        </div>
      </>
    );
  }

  const BasicEventHomeTemplate = () => {
    return(
      <>
        <div className="eventContainer">
          <div className="eventText"><b>{"AIR Club"}</b> has organized this event {"Today 5PM"} <b>@{"Central Vista"}</b></div>
          <img src= "/assets/defaultEvent.jpeg" className="thumbnailEvent" alt=" " />
        </div>
      </>
    );
  }

   return(
      <>
        {events ? events.map(event => {
          return <EventHomeTemplate event={event}/>
        }) : null}
        <BasicEventHomeTemplate />
      </>
  );
};


export default EventHome;
