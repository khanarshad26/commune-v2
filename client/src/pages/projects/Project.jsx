import React, {useContext, useEffect, useState} from "react";
import "./projects.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { format } from "timeago.js"; 

const Project = () => {
  const [projects, setProjects] = useState([]);
  const {user} = useContext(AuthContext);

  const fetchProjects = async () => {
    const res = await axios.get(`/api/project/all/${user._id}`);
    setProjects(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const ProjectCard = ({project}) => {
    const {_id, thumbnail, title, teamName, startedOn, techStack } = project;
    return (
      <>
        <div className="eventCardContainer1">
          <img src={thumbnail} className="eventThumbnail2" alt=" " />

          <div className="eventTitleProject">{title}</div>
          <div className="eventTitleProject2">Team {teamName} </div>
          <div className="techStack ">
            {techStack.map((tech) => {
              return <div className="tech">{tech}</div>
            })}
          </div>
          <div className="assigned">Assigned</div>
          <div className="startedon">Started on : {format(startedOn)} </div>
          
          
          
          <Link to={{pathname : `/project/${_id}`}} className="learnMore">
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
        <div className="eventPageRight1">
          <div className="yourEvents">
            
          <div className="commonLayoutHeaderTeams">
              <div className="commonLayoutHeaderLeft">
              <div className="commonLayoutHeading">Projects</div>
              </div>
              <div className="commonLayoutHeaderRight">
              <div className="commonLayoutHeading">Create&nbsp;Project</div>
              </div>
            </div>

            <div className="eventsList">
              {projects.map(project => {
                return <ProjectCard project = {project} />
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
