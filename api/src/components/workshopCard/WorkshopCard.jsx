import React from 'react';
import './workshopCard.css';
import { Link } from 'react-router-dom';

const WorkshopCard = ({ workshop }) => {
    const from = new Date(workshop.from);
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
            src={workshop.coverPicture || ""}
            className="eventThumbnailEvent"
            alt=" "
          />

          <div className="eventHost">{workshop.hostname}</div>
          <div className="eventTitle">{workshop.eventName}</div>
          <div className="startsOn">STARTS ON</div>
          <div className="eventTime">{time}</div>
          <Link to={{ pathname: `/event/${workshop._id}` }} className="learnMore">
            Know more
          </Link>
        </div>
      </>
    );
  };

  export default WorkshopCard;