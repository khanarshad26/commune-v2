import React, { useEffect   } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Share from '../../components/share/Share';
import "./home.css"
import axios from 'axios';
import { useSelector } from 'react-redux'
import { setAllPosts} from '../../state/user.js';
import { useDispatch } from 'react-redux';
// import Messenger from '../../components/messenger/Messenger';
import Messenger1 from '../../components/messenger/Messenger1';
import { setConnections } from '../../state/connection.js';

export default function Home({ showMessage }) {
  // const [notification, setNotification] = useState(false);
  // const [messaging, setMessaging] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.user);
  // const timelinePosts = useSelector(state => state.user.timelinePosts);
  const allPosts = useSelector(state => state.user.allPosts);

  // const timelinePosts = useSelector((state) => state.user.timelinePosts);
  // const [homePosts, setHomePosts] = useState(timelinePosts);

  const RightSide = ({ showMessage }) => {
    // if (notification) return <Notification />;
    // else if (messaging) return <Messenger />;
    return <Rightbar showMessage={showMessage} />;
  }

  const fetchAllPosts = async () => {
    const res = await axios.get(`/api/post/all/${user._id}`);
      dispatch(setAllPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }))
      );
    localStorage.setItem('allPosts',JSON.stringify(res.data));
  };

  const fetchAllConnections = async () => {
    const res = await axios.get(`/api/connection/${user._id}`);
    dispatch(setConnections(res.data));
    localStorage.setItem('connections',JSON.stringify(res.data));
  };

  useEffect(() => {
    // fetchPosts();
    fetchAllPosts();
    fetchAllConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="homeContainer">
        <div className="homeLeftbar">
        <Sidebar  />
        </div>
        <div className="shareFeedContainer">
          <Share /> 
          <Feed posts={allPosts} />
        </div>
        <div className="homeRightbar">
          <RightSide />
        </div>
      </div>
    </>
  );
}
