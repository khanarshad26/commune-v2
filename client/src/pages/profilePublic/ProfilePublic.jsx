import "./profile.css";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useSelector } from 'react-redux';
import {useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

export default function ProfilePublic() {
  const params = useParams();
  const user = useSelector(state => state.user.user);
  const [profileUser, setProfileUser] = useState({});
  const [posts, setPosts] = useState([]);

  const fetchProfileUser = async () => {
    const res = await axios.get(`/api/user/${params.id}`);
    setProfileUser(res.data);
  };


  useEffect(() => {
    fetchProfileUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPosts = async () => {
    const res = await axios.get(`/api/post/timeline/all/${user.type}/${user._id}`);
    setPosts(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  };

  useEffect(() => {
    fetchPosts();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
      <div className="profile1">
        
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">

              <div className="profileCoverImageTop" style={{backgroundImage: `url(${profileUser?.coverPicture})` }}></div>
              <div className="profileUserImg" style={{backgroundImage: "url(/assets/noAvatar.png)" }}></div>
            </div>

            <div className="profileInfo1">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">--</span>
            </div>
          </div>

{/* _______________________________________________nav */}

<div className="instituteabout">
              <div className="instituteaboutLeft">
                <ul className="instituteaboutleftList">
                  <li >Home </li>
                  <li >Projects</li>
                  <li >Portfolio</li>
                  <li >About</li>
                </ul>
              </div>
              <div className="institutefollow">
                <button className="institutefollowButton">Follow</button>
              </div>
            </div>

{/* _______________________________________________nav end */}
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
