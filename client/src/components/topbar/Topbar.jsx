import "./topbar.css";
// import { useState } from "react";
import { Search, Chat, Notifications, Home, People, RssFeed } from "@material-ui/icons";
import  {Link} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext.js';

export default function Topbar(props) {
  const {user} = useContext(AuthContext);
  const notification_count = 0;
  const msg_count = 0;

  const notificationHandler = () => {
    props.setNotification(!props.notification);
    props.setMessaging(false);
  }

  const messagingHandler = () => {
    props.setMessaging(!props.messaging);
    props.setNotification(false);
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Commune</span>
        <span className="searchbar">
          <Search className="searchIcon" />
          <input placeholder="Search" className="searchInput" />
        </span>
      </div>

      <div className="topbarCenter"></div>
      <div className="topbarRight">
        <div className="topbarIcons">
          
          <Link to='/' className="topbarIconItem">
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

          <Link to='/'className="topbarIconItem" onClick={notificationHandler} >
            <span className="topbarLink">
              <Notifications className="peopleIcon" />
              {notification_count ? (
              <span className="topbarIconBadge">{notification_count}</span>
            ) : null}
              <span className="iconText">Notifications</span>
            </span>
          </Link>

          <div className="vl"></div>

          <Link to='/profile' className="topbarIconItem">
          <img src={user.profilePicture} alt=" " className="topbarImg" />
          </Link>
        </div>
      </div>
    </div>
  );
}
