import React, { useState, useEffect, useContext, useRef } from "react";
import "./project.css";
import { useSelector } from 'react-redux'; 
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import axios from "axios";
import {format} from "timeago.js"

const Project = () => {
  const user = useSelector(state => state.user.user);
  const [projects, setProjects] = useState([]);
  const [toggle, setToggle] = useState(false);

  const title = useRef();
  const description = useRef();
  const from = useRef();
  const to = useRef();
  const isChecked = useRef();
  
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
  }, []);

  const saveHandler = async (e) => {
    e.preventDefault();
    const project = {
      userId : user._id,
      title: title.current.value,
      projectSummary: description.current.value,
      from: from.current.value,
      to: to.current.value,
      current : isChecked.current.checked
    };
    try {
      await axios.post("/api/project/", project);
    } catch (err) {
      console.log(err);
    }
    setToggle(!toggle);
    fetchProjects();
  };

  const cancelHandler = () => {
    setToggle(!toggle);
  }

  const AddProject = () => {
    return(
      <>
        <div className="addEducationContainer">
          <form className="form">

            <div className="fullSection">
              <div className="inputContainer">
                <label className="label">Title</label>
                <input type="text" className="input" ref={title} />
              </div>
            </div>

            <div className="fullSection">
              <div className="inputContainer">
                <label className="label">description</label>
                <textarea
                  className="educationTextarea"
                  type="text"
                  rows={4}
                  ref={description}
                />
              </div>
            </div>

            <div className="halfSection">
              <div className="halfInputContainer">
                <label className="label">from</label>
                <input type="date" className="input" ref={from} />
              </div>
              <div className="halfInputContainer">
              <label className="label">to</label>
              <input type="date" className="input" ref={to} />
              <div className="currentlyAttend">
              <input type="checkbox" className="chechboxEducation" ref={isChecked} />
              <span className="currentText">In Progress</span>
              </div>
              
            </div>
            </div>
            <div className="boxBottom">
            <div className="cancel" onClick={cancelHandler}>
              Cancel
            </div>
            <div className="save" onClick={saveHandler}>
              save
            </div>
          </div>

          </form>
        </div>
      </>
    );
  }

  const ProjectCard = ({ project }) => {
    const from = new Date(project.from);
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let to = new Date(project.to);;
    if(project.to!==null){
      to = month[to.getMonth()]+" "+to.getFullYear();
    }else{
      to = "in progress";
    }
    return (
      <>
        <div className="educationCardContainer">
          <img src="/assets/projectIcon.png" className="educationImage" alt=" " />

          <div className="educationCardContainerRight">
            <div className="degree">
              {project.title}
            </div>
            <div className="institution">{project.projectSummary}</div>
            {/* <div className="institution">{month[from.getMonth()]+" "+from.getFullYear()+"-"+to}</div> */}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="shadowBox">
        <div className="shadowBoxUpper">
          <span className="shadowBoxText">Project</span>
          <ModeEditOutlineIcon
            className="shadowBoxIcon"
            onClick={(e) => setToggle(!toggle)}
          />
        </div>

        {toggle ? <AddProject /> : null}

        <div className="shadowBoxLower">
          {projects.map((project) => {
            return <ProjectCard project={project} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Project;
