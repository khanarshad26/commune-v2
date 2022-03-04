import "./sidebar.css";
import {Group, HelpOutline, Event} from "@material-ui/icons";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import GroupWorkOutlinedIcon from '@mui/icons-material/GroupWorkOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import {Link} from 'react-router-dom';
import { useState } from "react";

// import { Users } from "../../dummyData";
// import CloseFriend from "../closeFriend/CloseFriend";
// import  { Link } from 'react-router-dom';
// import {ArticleOutlinedIcon, AccountBoxOutlinedIcon, GroupWorkOutlinedIcon, NewspaperOutlinedIcon, ForumOutlinedIcon, BookmarkBorderOutlinedIcon, ScienceOutlinedIcon, FeedbackOutlinedIcon} from '@mui/icons-material';



export default function Sidebar() {
  const [instituteClicked, setInstituteClicked] = useState(false)
  return (
    <div className="sidebar ">
      <div className="sidebarWrapper">
        <div className="sidebarList">
          <Link to='/portfolio' className="sidebarListItem">
            <AccountBoxOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText"  style={{ textDecoration: 'none' }}>Portfolio</span>
          </Link>
          <Link to="/projects" className="sidebarListItem">
            <ArticleOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Projects</span>
          </Link>

          {instituteClicked 
          ? <Link to="/institute" className="sidebarListItem">
            <ArticleOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Institute</span>
          </Link> 
          : <Link to="/institute" className="sidebarListItem">
          <ArticleOutlinedIcon className="sidebarIcon" />
          <span className="sidebarListItemText">Institute</span>
        </Link>}

          <Link to="/myconnections" className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Connections</span>
          </Link>
          {/* <Link to="/team" className="sidebarListItem">
            <GroupWorkOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Teams</span>
          </Link> */}
          <Link to="/events" className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </Link>
          <Link to="/workshops" className="sidebarListItem">
            <ScienceOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Workshops</span>
          </Link>
          {/* <Link to="/bookmarks" className="sidebarListItem">
            <BookmarkBorderOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </Link> */}
          <Link to="/newsletters" className="sidebarListItem">
            <NewspaperOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Newsletters</span>
          </Link>
          <Link to="/forum" className="sidebarListItem">
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
        <button className="sidebarButton">Explore</button>
      </div>
    </div>
  );
}
