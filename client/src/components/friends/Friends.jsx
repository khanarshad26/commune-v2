import React, {useContext} from "react";
// import {useEffect, useState} from "react";
import { AuthContext } from "../../context/AuthContext";
// import axios from "axios";
import "./friends.css";

const Friends = () => {
  const {user} = useContext(AuthContext);
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
