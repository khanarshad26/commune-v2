import "./cellSidebar.css";
import { Group, Event } from "@material-ui/icons";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import GroupWorkOutlinedIcon from "@mui/icons-material/GroupWorkOutlined";
import { Link } from "react-router-dom";
import React from "react";
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';


const CellSidebar = () => {
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