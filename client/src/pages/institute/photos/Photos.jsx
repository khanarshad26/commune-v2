import React   from "react";
// import { useState} from "react";
// import axios from "axios";
import "./photos.css";

const Photos = () => {

  const photoes = ["/assets/images/sanju.jpg","/assets/images/sanju.jpg","/assets/images/sanju.jpg","/assets/images/sanju.jpg"];


  const Photo = ({photo}) => {
    return(
      <>
        <div className="rightbarFollowing">
            <img
              src={photo}
              alt=" "
              className="rightbarFollowingImg"
            />
          </div>
      </>
    );
  }

  return (
    <>
      <div className="photoscontainer">
        <h4 className="rightbarTitle">Photos</h4>
        <div className="rightbarFollowings">
        { photoes.map((photo) => {
            return <Photo photo={photo} />
        })}
        </div>
      </div>
    </>
  );
};

export default Photos;
