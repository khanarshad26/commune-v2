import React, {useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router";
import "./eventLayout.css";
 
import { useSelector } from 'react-redux'; 
import axios from "axios";


const EventLayout = () => {
  const params = useParams();
  const [event, setEvent] = useState({});
  const user = useSelector(state => state.user.user);

  const [isParticipated, setIsParticipated] = useState(false);

  const fetchEvent = async() => {
    try{
      const res = await axios.get(`/api/event/${params.id}`);
      setEvent(res.data);
      console.log(res.data);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    fetchEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const from = new Date(event.from);
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

  const time =
      month[from.getMonth()] +
      " " +
      from.getDate() +
      ", " +
      (from.getHours() % 12 < 10
        ? "0" + (from.getHours() % 12)
        : from.getHours() % 12) +
      ":" +
      (from.getMinutes() < 10 ? "0" + from.getMinutes() : from.getMinutes()) +
      " " +
      (from.getHours() >= 12 ? " PM" : " AM") +
      " IST";

  const Organizer = ({organizer}) => {
    const {image, name, position, contact} = organizer;
    return(
      <>
        <div className="instructor">
              <img src={image} className="instructorImgEvent" alt=" "/>
              <div className="instructorInfo">
                <div className="instructorName">{name}</div>
                <div className="instructorProfession">{position}</div>
                <div className="instructorCompany">{contact}</div>
              </div>
            </div>
      </>
    );
  }

  const participateHandler = async() => {
    try{
      await axios.post(`/api/event/participate/${event._id}/${user._id}`);
      setIsParticipated(true);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
       
      <div className="projectLayoutContainer">
        <div
          className="heroEvent"
          style={{ backgroundImage: `url(${event.coverPicture})` }}
        >
          <div className="heroHeader">
            <div className="projectName">{event.name}</div>
            <div className="offeredByWrapper">
              <span className="superscript">Hosted On</span>
              <span className="offeredBy"> Commune </span>
            </div>
          </div>
          <div className="projectDiscription">{event.summary}</div>
          <div className="projectDiscription">Time : {time}</div>
          {event.venue ? <div className="projectDiscription">Venue : {event.venue}</div> : null}
          <div className="projectDiscription">Host : {event.hostname}</div>
          {/* <div className="projectDiscription">{eventDesc}</div> */}

          <div className="rating"></div>
          <div className="participate">
          <div className="enrollNowEvent" onClick={participateHandler}>Participate Now</div>
          {isParticipated ? <p className="participateMsg">Succesfully Registered</p>: null}
          </div>

        </div>

        <div className="headingProjectLayout">About&nbsp;Event</div>
        <hr className="heProjectLayout" />

        <div className="layoutBottom1">
          <div className="layoutLeftBottom">
            <div className="aboutEvent">
              <div className="syllabusHeader1">Description</div>
              <div className="descriptionPoints">
                <div className="descriptionText">{event.description}</div>
              </div>
            </div>
          </div>

          <div className="layoutRightBottom">
            <div className="organizerHeading">Organizers</div>
            {event.organizers ? event.organizers.map((organizer) => {
              return <Organizer organizer = {organizer} />
            }) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventLayout;
