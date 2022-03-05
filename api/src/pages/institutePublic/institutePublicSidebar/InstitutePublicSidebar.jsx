import "./instituteSidebar.css";
import { Group, HelpOutline } from "@material-ui/icons";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import GroupWorkOutlinedIcon from "@mui/icons-material/GroupWorkOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
// import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {useNavigate } from 'react-router-dom';

export default function InstituteSidebar() {

  const [institute, setInstitute] = useState({});
 
  const navigate = useNavigate();
  // const history = useHistory();

  const fetchInstitute = async () => {
    try {
      const res = await axios.get(`/api/institute/${user.institute}`);
      setInstitute(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const associationClickedFunc = (association) => {
    console.log("asso",association._id);
    navigate(`/association/${association._id}`)
    // history.push("/association/"+association._id)
  }

  useEffect(() => {
    fetchInstitute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const UpdatedList = () => {
    const [clubClicked, setClubClicked] = useState(false);
    const [associationClicked, setAssociationClicked] = useState(false);

    const [clublist, setClublist] = useState([]);
    const [associationslist, setAssociationslist] = useState([]);

    const fetchClublist = async () => {
      try {
        if (user.type !== "Institute") {
          const res = await axios.get(`/api/cell/all/club/${user.institute}`);
          setClublist(res.data);
        } else {
          const res = await axios.get(`/api/cell/all/club/${user._id}`);
          setClublist(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchAssociationslist = async () => {
      try {
        if (user.type !== "Institute") {
          const res = await axios.get(
            `/api/cell/all/association/${user.institute}`
          );
          setAssociationslist(res.data);
        } else if (user.type === "Institute") {
          const res = await axios.get(`/api/cell/all/association/${user._id}`);
          setAssociationslist(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      fetchClublist();
      fetchAssociationslist();
      console.log(user.institute);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
      <>
        {!clubClicked ? (
          <div
            className="sidebarListItem"
            onClick={() => setClubClicked(!clubClicked)}
          >
            <ArticleOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Clubs/Cells</span>
          </div>
        ) : (
          <div className="updatedListView">
            <div className="updatedListViewTop">
              <div
                className="sidebarListItem"
                onClick={() => setClubClicked(!clubClicked)}
              >
                <ArticleOutlinedIcon className="sidebarIcon" />
                <span className="sidebarListItemText">Clubs/Cells</span>
              </div>
              <Link to="/Club" className="addClub">
                {"+ Add"}
              </Link>
            </div>
            <div className="updatedListViewBottom">
              {clublist.map((club) => {
                return (
                  <Link
                    to={{ pathname: `/club/${club._id}` }}
                    className="sidebarListItem"
                  >
                    <img src={club.profilePicture} className="sidebarIcon" />
                    <span className="sidebarListItemText">{club.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {!associationClicked ? (
          <div
            className="sidebarListItem"
            onClick={() => setAssociationClicked(!associationClicked)}
          >
            <ArticleOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Associations</span>
          </div>
        ) : (
          <div className="updatedListView">
            <div className="updatedListViewTop">
              <div
                className="sidebarListItem"
                onClick={() => setAssociationClicked(!associationClicked)}
              >
                <ArticleOutlinedIcon className="sidebarIcon" />
                <span className="sidebarListItemText">Associations</span>
              </div>
              <Link to="/Association" className="addClub">
                {"+ Add"}
              </Link>
            </div>
            <div className="updatedListViewBottom">
              {associationslist.map((association) => {
                return (
                  <div
                  onClick={() => associationClickedFunc(association)}
                    className="sidebarListItem"
                  >
                    <img
                      src={association.profilePicture}
                      className="sidebarIcon"
                    />
                    <span className="sidebarListItemText">
                      {association.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <Link to="/institute/resourcehub" className="sidebarListItem">
          <GroupWorkOutlinedIcon className="sidebarIcon" />
          <span className="sidebarListItemText">Resources</span>
        </Link>

        <Link to="/institute/people" className="sidebarListItem">
          <BookmarkBorderOutlinedIcon className="sidebarIcon" />
          <span className="sidebarListItemText">People</span>
        </Link>
      </>
    );
  };

  return (
    <div className="instituteSidebar ">
      <div className="sidebarWrapper">
        <div className="sidebarList">
          <Link to="/institute" className="sidebarListItem">
            <AccountBoxOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Institute</span>
          </Link>

          <UpdatedList />

          <Link to="/newsletters" className="sidebarListItem">
            <NewspaperOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Newsletters</span>
          </Link>
          <Link to="/forum" className="sidebarListItem">
            <ForumOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Student Forum</span>
          </Link>
        </div>
        <button className="sidebarButton">Explore</button>
      </div>
    </div>
  );
}
