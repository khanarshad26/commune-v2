import "./share.css";
import { EventEmitter } from "events";
import { Event, Cancel } from "@material-ui/icons";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import axios from "axios";
import { useSelector } from "react-redux";
import { useContext, useRef, useState } from "react";

export default function Share() {
  const user = useSelector((state) => state.user.user);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [openfor, setOpenfor] = useState("Connections");
  const [type, setType] = useState("General");

  const shareHandler = () => {};

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!desc.current.value) return;
    const newPost = {
      userId: user._id,
      username: user.name || user.username,
      openFor: openfor || "Campus",
      type: type || "General",
      desc: desc.current.value || "",
      img: user.profilePicture || "/assets/noAvatar.png",
      userType: user.type,
    };
    if (file) {
      const data = new FormData();

      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.postImg = "/assets/" + fileName;
      try {
        await axios.post("/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("/api/post/", newPost);
      desc.current.value = "";
      setFile(null);
      setType("General");
      setOpenfor("Connections");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={user?.profilePicture || "/assets/noAvatar.png"}
            alt=" "
          />
          <input placeholder="Start a post" className="shareInput" ref={desc} />
        </div>
        <hr className="shareHr" />

        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt=" " />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}

        <form className="shareBottom" onSubmit={submitHandler}>
          
          <div className="shareOptions1">
            <label htmlFor="file" className="shareOption">
              <PhotoCameraBackIcon htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">File</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg, .pdf, .dox, .zip, .xlsx"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>

          <div className="shareOption1 shareOptions2">
            <SlowMotionVideoIcon htmlColor="#0077b6" className="shareIcon" />
            {/* <span className="shareOptionText">Video</span> */}
            <select
              name="event"
              id="event"
              className="selectShare"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <optgroup label="Event type">
                <option value="General">General</option>
                <option value="Project">Project</option>
                <option value="Event">Event</option>
                <option value="Workshop">Workshop</option>
              </optgroup>
            </select>
          </div>

          <div className="shareOption1 shareOptions2">
            <Event htmlColor="#00b4d8" className="shareIcon" />
            <select
              name="audience"
              id="audience"
              className="selectShare"
              value={openfor}
              onChange={(e) => setOpenfor(e.target.value)}
            >
              <optgroup label="Audience">
                <option value="Connections">Connections</option>
                <option value="Campus">Campus</option>
                <option value="All">All</option>
                <option value="Only Me">Private</option>
              </optgroup>
            </select>
          </div>
          <div className="shareOptionsButton shareOptions3">
            <button type="submit" className="shareButton" onClick={shareHandler}>
              Share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
