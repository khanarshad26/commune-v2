import "./cellSidebar.css";
import { Group, HelpOutline, Event } from "@material-ui/icons";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import GroupWorkOutlinedIcon from "@mui/icons-material/GroupWorkOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
// import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import axios from "axios";
import { useSelector } from 'react-redux'; 


const CellSidebar = () => {
  const [cell, setCell] = useState({});
  const user = useSelector(state => state.user.user);

  const fetchCell = async() => {
    try{
      const res = await axios.get(`/api/cell/${user._id}`);
    setCell(res.data);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="instituteSidebar ">
      <div className="sidebarWrapper">
        <div className="sidebarList">
          <Link to="/institute" className="sidebarListItem">
            <ArticleOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Institute</span>
          </Link>
          <Link to="/events" className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </Link>
          <Link to="/workshops" className="sidebarListItem">
            <ScienceOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Workshops</span>
          </Link>
          <Link to="/projects" className="sidebarListItem">
            <ArticleOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Projects</span>
          </Link>
          <Link to="/team" className="sidebarListItem">
            <GroupWorkOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Teams</span>
          </Link>
          <Link to="/collaboration" className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Collaborations</span>
          </Link>
          <Link to="/institute/resourcehub" className="sidebarListItem">
            <GroupWorkOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Resources</span>
          </Link>
        </div>
        <button className="sidebarButton">Explore</button>
      </div>
    </div>
  );
}

export default CellSidebar;