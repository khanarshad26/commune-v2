import React, { useState, useEffect, useContext } from 'react';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Notification from '../../components/notification/Notification';
import Messenger from '../../components/messenger/Messenger';
import Share from '../../components/share/Share';
import "./home.css"
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export default function Home({ showMessage }) {
  const [notification, setNotification] = useState(false);
  const [messaging, setMessaging] = useState(false);

  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  const RightSide = ({ showMessage }) => {
    // if (notification) return <Notification />;
    // else if (messaging) return <Messenger />;
    return <Rightbar showMessage={showMessage} />;
  }

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
  }, [])

  return (
    <>
      {/* <Topbar setNotification ={setNotification} notification={notification} setMessaging={setMessaging} messaging={messaging}/> */}
      <div className="homeContainer">
        <Sidebar />
        <div className="shareFeedContainer">
          <Share /> 
          <Feed posts={posts} />
        </div>
        <div className="homeRightbar">
          <RightSide showMessage={showMessage}/>
        </div>
      </div>
    </>
  );
}
