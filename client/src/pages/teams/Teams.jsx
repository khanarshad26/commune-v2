import React from "react";
import "./teams.css";
import Topbar from "../../components/topbar/Topbar";
// import EventCard from "../../components/eventCard/EventCard";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";

const Teams = () => {

  const teams = [{
    team_id : 1,
    thumbnail : "/assets/defaultEvent.jpeg",
    name : "Pretam",
    project : "Advanced Clean Transportation Expo",
    teamMembers : [ "Arshad Khan", "Shivanshu Nayak", "Hariom Singh" ]
  },{
    team_id : 2,
    thumbnail : "",
    name : "Deception",
    project : "Advanced Clean Transportation Expo",
    teamMembers : [ "Arshad Khan", "Shivanshu Nayak", "Hariom Singh" ]
  }];

  const TeamTemplate = ({team}) => {
    const {thumbnail, name, project, teamMembers, team_id } = team;
    return (
      <>
        <div className="eventCardContainer1">
          <img src={thumbnail} className="eventThumbnail2" alt=" " />

          <div className="eventTitle1">Team : {name}</div>
          <div className="eventTitle2">Project : {project} </div>
          <div className="eventTitle2">Team Members</div>
          {teamMembers.map(member => {
            return <div className="eventTitle3">{member}</div>
          })}
          
          
          <Link to={{pathname : `/teams/${team_id}`}} className="learnMore">
            Manage
          </Link>
        </div>
      </>
    );
  };

  return (
    <>
       
      <div className="eventPageContainer">
        <Sidebar />
        <div className="teamPageRight">
          <div className="yourEvents">
            
          <div className="commonLayoutHeaderTeams">
              <div className="commonLayoutHeaderLeft">
              <div className="commonLayoutHeading">Teams</div>
              </div>
              <div className="commonLayoutHeaderRight">
              <div className="commonLayoutHeading">Create&nbsp;Team</div>
              </div>
            </div>

            <div className="eventsList">
              {teams.map(team => {
                return <TeamTemplate team = {team} />
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Teams;
