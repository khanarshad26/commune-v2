import React, {useContext} from "react";
// import {useEffect, useState} from "react";
 import { useSelector } from 'react-redux';
// import axios from "axios";
import "./friends.css";

const Friends = () => {
  const user = useSelector(state => state.user.user);
  const friends = user.connections;


  const Friend = ({friend}) => {
    return(
      <>
        <div className="rightbarFollowing">
            <img
              src={friend.profilePicture}
              alt=" "
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">{friend.username}</span>
          </div>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <h4 className="rightbarTitle">Friends</h4>
        <div className="rightbarFollowings">
        { friends.map((friend) => {
            return <Friend friend={friend} />
        })}
        </div>
      </div>
    </>
  );
};

export default Friends;
