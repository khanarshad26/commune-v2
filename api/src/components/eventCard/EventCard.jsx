import React from 'react';
import './eventCard.css';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
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
    return (
      <>
        <div className="eventCardContainer">
          <img
            src={event.coverPicture || ""}
            className="eventThumbnailEvent"
            alt=" "
          />

          <div className="eventHost">{event.hostname}</div>
          <div className="eventTitle">{event.eventName}</div>
          <div className="startsOn">STARTS ON</div>
          <div className="eventTime">{time}</div>
          <Link to={{ pathname: `/event/${event._id}` }} className="learnMore">
            Know more
          </Link>
        </div>
      </>
    );
  };

  export default EventCard;