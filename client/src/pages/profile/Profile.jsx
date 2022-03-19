import "./profile.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Share from '../../components/share/Share.jsx';
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import {setCoverPicture, setProfilePicture, setTimelinePosts} from '../../state/user.js';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.user);
  const timelinePosts = useSelector(state => state.user.timelinePosts);
  // const profilePicture = useSelector(state => state.user.profilePicture);
  // const [prPic, setPrPic] = useState(user.profilePicture);

    const fetchTimelinePosts = async () => {
    const res = await axios.get(`/api/post/timeline/all/${user?.type}/${user?._id}`);
    dispatch(setTimelinePosts(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }))
    );
    localStorage.setItem('timelinePosts',JSON.stringify(res.data));
  };

  // console.log()

  useEffect(() => {
    fetchTimelinePosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addProfileImage = async () => {
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      // setPrPic("/assets/" + fileName)
      dispatch(setProfilePicture("/assets/" + fileName));
      console.log("profilePicture",user.profilePicture);
      try {
        await axios.post("/api/upload", data);
      } catch (err) {
        console.log(err);
      }
      try {
        await axios.put(`/api/user/profilePicture/${user._id}`, {
          profilePicture: fileName,
        });
        
      } catch (err) {
        console.log(err);
      }
      // setProfilePicture(fileName);
      
    }
    
  };

  console.log("user : ",user.profilePicture);

  const addCoverImg = async () => {
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      dispatch(setCoverPicture("/assets/" + fileName));
      console.log("coverPicture",user.coverPicture);
      try {
        await axios.post("/api/upload", data);
      } catch (err) {
        console.log(err);
      }
      try {
        await axios.put(`/api/user/coverPicture/${user._id}`, {
          coverPicture: fileName,
        });
      } catch (err) {
        console.log(err);
      }
      // setCoverPicture(fileName);
    }
  };

  return (
    <>
       
      <div className="profile1">
      <div className="PagesSidebarWrapper">
        <Sidebar />
        </div>
        
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">

              <div className="profileCoverImageTop" style={{backgroundImage: `url(${user.coverPicture})` }}>
                <label htmlFor="file">
                  <img
                    src="/assets/plus.png"
                    className="coverUserImgAdd"
                    onClick={addCoverImg}
                    alt=" "
                  />
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    accept=".png,.jpeg,.jpg, .pdf, .dox, .zip, .xlsx"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </label>
              </div>

              <div className="profileUserImg" style={{backgroundImage: `url(${user.profilePicture})` }}>
                 <label htmlFor="file">
                  <img
                    src="/assets/plus.png"
                    className="profileUserImgAdd"
                    onClick={addProfileImage}
                    alt=" "
                  />
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    accept=".png,.jpeg,.jpg, .pdf, .dox, .zip, .xlsx"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </label>
              </div>
            </div>

            <div className="profileInfo1">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">--</span>
            </div>
          </div>

          <div className="profileRightBottom">
            <div className="profileRightBottomright">
              <div className="shareProfile">
              <Share />
              </div>  
            <Feed posts={timelinePosts} />
            </div>
            
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}
