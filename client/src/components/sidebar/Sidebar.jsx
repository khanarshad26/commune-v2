import "./sidebar.css";
import {Group, Event} from "@material-ui/icons";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import {Link} from 'react-router-dom';
import {setShowMenu} from '../../state/utility.js';
import { useDispatch } from "react-redux";


export default function Sidebar() {
  // const [instituteClicked, setInstituteClicked] = useState(false)
  const dispatch = useDispatch();
  return (
    <div className="sidebar ">
      <div className="homeSidebarWrapper">
        <div className="sidebarList">
          <Link to='/portfolio' className="sidebarListItem" onClick={() => dispatch(setShowMenu())}>
            <AccountBoxOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText"  style={{ textDecoration: 'none' }} >Portfolio</span>
          </Link>
          <Link to="/projects" className="sidebarListItem" onClick={() => dispatch(setShowMenu())}>
            <ArticleOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Projects</span>
          </Link>

          <Link to="/institute" className="sidebarListItem" onClick={() => dispatch(setShowMenu())}>
          <ArticleOutlinedIcon className="sidebarIcon" />
          <span className="sidebarListItemText">Institute</span>
          </Link> 

          <Link to="/myconnections" className="sidebarListItem" onClick={() => dispatch(setShowMenu())}>
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Connections</span>
          </Link>
          {/* <Link to="/team" className="sidebarListItem">
            <GroupWorkOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Teams</span>
          </Link> */}
          <Link to="/events" className="sidebarListItem" onClick={() => dispatch(setShowMenu())}>
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </Link>
          <Link to="/workshops" className="sidebarListItem" onClick={() => dispatch(setShowMenu())}>
            <ScienceOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Workshops</span>
          </Link>
          <Link to="/newsletters" className="sidebarListItem" onClick={() => dispatch(setShowMenu())}>
            <NewspaperOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Newsletters</span>
          </Link>
          <Link to="/forum" className="sidebarListItem" onClick={() => dispatch(setShowMenu())}>
            <ForumOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Student Forum</span>
          </Link>
          {/* <hr className="hr"/>
          
          <Link to="#" className="sidebarListItem">
            <FeedbackOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Feedback</span>
          </Link>
          <Link to="/forum" className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Ask Questions</span>
          </Link> */}
        </div>
        {/* <button className="sidebarButton">Explore</button> */}
      </div>
    </div>
  );
}
