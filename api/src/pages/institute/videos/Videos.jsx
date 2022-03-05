import React, {useContext} from "react";
import {useEffect, useState} from "react";
// import axios from "axios";
import "./videos.css";

const Videos = () => {

  const [videos, setVideos] = useState(["/assets/images/sanju.jpg","/assets/images/sanju.jpg","/assets/images/sanju.jpg","/assets/images/sanju.jpg"]);


  const Video = ({video}) => {
    return(
      <>
        <div className="rightbarFollowing">
            <video
              src={Video}
              alt=" "
              className="rightbarFollowingVideo"
            />
          </div>
      </>
    );
  }

  return (
    <>
      <div className="photoscontainer">
        <h4 className="rightbarTitle">Videos</h4>
        <div className="rightbarFollowings">
        { videos.map((video) => {
            return <Video video={video} />
        })}
        </div>
      </div>
    </>
  );
};

export default Videos;
