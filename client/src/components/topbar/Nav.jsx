import React from "react";
import { Link } from "react-router-dom";
import { Notifications, Home, People, RssFeed } from "@material-ui/icons";
import Stack from "@mui/material/Stack";

const Nav = () => {
  return (
    <>
     <div className="navContainer">
      <Stack direction="row" spacing={2}>
        <Link to="/" className="topbarIconItem">
          <span className="topbarLink">
            <Home className="peopleIcon" />
            <span className="iconText">Home</span>
          </span>
        </Link>
        <Link to="/myconnections" className="topbarIconItem">
          <span className="topbarLink">
            <People className="peopleIcon" />
            <span className="iconText">Networks</span>
          </span>
        </Link>
        <Link to="/events" className="topbarIconItem">
          <span className="topbarLink">
            <RssFeed className="peopleIcon" />
            <span className="iconText">Events</span>
          </span>
        </Link>
        <Link to="/" className="topbarIconItem">
          <span className="topbarLink">
            <Notifications className="peopleIcon" />
            {/* {notification_count ? (
              <span className="topbarIconBadge">{notification_count}</span>
            ) : null} */}
            <span className="iconText">Notifications</span>
          </span>
        </Link>
      </Stack>
      </div>
     
      {/* <Link to='/' className="topbarIconItem">
            <span className="topbarLink">
              <Home className="peopleIcon" />
              <span className="iconText">Home</span>
            </span>
          </Link>

          <Link to='/myconnections'className="topbarIconItem">
            <span className="topbarLink">
              <People className="peopleIcon" />
              <span className="iconText">Networks</span>
            </span>
          </Link>

          <Link to='/events'className="topbarIconItem">
            <span className="topbarLink">
              <RssFeed className="peopleIcon" />
              <span className="iconText">Events</span>
            </span>
          </Link>

          <Link to='/'className="topbarIconItem" onClick={messagingHandler} >
            <span className="topbarLink">
              <Chat className="peopleIcon" />
              {msg_count ? (
              <span className="topbarIconBadge">{msg_count}</span>
            ) : null}
              <span className="iconText">Messaging</span>
            </span>
          </Link>

          <Link to='/'className="topbarIconItem"  >
            <span className="topbarLink">
              <Notifications className="peopleIcon" />
              {notification_count ? (
              <span className="topbarIconBadge">{notification_count}</span>
            ) : null}
              <span className="iconText">Notifications</span>
            </span>
          </Link> */}
      {/* </div> */}
    </>
  );
};

export default Nav;
