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

export default function Home({ showMessage }) {
  // const [notification, setNotification] = useState(false);
  // const [messaging, setMessaging] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.user);
  // const timelinePosts = useSelector(state => state.user.timelinePosts);
  const allPosts = useSelector(state => state.user.allPosts);

  const RightSide = ({ showMessage }) => {
    // if (notification) return <Notification />;
    // else if (messaging) return <Messenger />;
    return <Rightbar showMessage={showMessage} />;
  }

  const fetchAllPosts = async () => {
    const res = await axios.get(`/api/post/all/${user?._id}`);
    dispatch(setAllPosts(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }))
    );
    localStorage.setItem('allPosts',JSON.stringify(res.data));
  };

  useEffect(() => {
    // fetchPosts();
    fetchAllPosts();
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
          <RightSide showMessage={showMessage}/>
        </div>
      </div>
    </>
  );
}
