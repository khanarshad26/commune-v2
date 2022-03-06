import "./profile.css";
 
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
// import Intro from "../../components/intro/Intro";
import { useSelector } from 'react-redux';
import { useContext, useState, useEffect } from "react";
// import AddIcon from '@mui/icons-material/Add';
import axios from "axios";

export default function Profile() {
  const [file, setFile] = useState(null);

  const [currrentUser, setCurrrentUser] = useState({});
  const user = useSelector(state => state.user.user);
  

  const [posts, setPosts] = useState([]);

  const fetchUser = async () => {
    const res = await axios.get(`/api/user/${currrentUser._id}`);
    setCurrrentUser(res.data);
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [profilePicture, setProfilePicture] = useState("/assets/noAvatar.png");
  const [coverPicture, setCoverPicture] = useState(currrentUser.coverPicture);

  const addProfileImage = async () => {
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
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
      setProfilePicture(fileName);
    }
  };

  const addCoverImg = async () => {
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
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
      setCoverPicture(fileName);
    }
  };

  const fetchPosts = async () => {
    const res = await axios.get(`/api/post/timeline/all/${user.type}/${user._id}`);
    setPosts(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  };
// 
  useEffect(() => {
    fetchPosts();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  // console.log(posts);

  return (
    <>
       
      <div className="profile1">
        <div className="profileSidebar">
          <Sidebar />
        </div>
        
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">

              <div className="profileCoverImageTop" style={{backgroundImage: "url(/assets/coverImage.png)" }}>
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

              <div className="profileUserImg" style={{backgroundImage: "url(/assets/noAvatar.png)" }}>
                {/* <img
                  src="/assets/noAvatar.png"
                  className="profileImg"
                  alt=" "
                /> */}
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
            <Feed posts={posts} />
            </div>
            
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}
