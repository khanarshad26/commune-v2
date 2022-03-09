import React, {useState, useEffect} from "react";
import "./projectLayout.css";
 
import { useParams } from "react-router";
import axios from "axios";

const ProjectLayout = () => {
  const params = useParams();
  const [project, setProject] = useState({});

  const fetchProject = async() => {
    try{
      const res = await axios.get(`/api/projects/${params.id}`);
      setProject(res.data);
      console.log(res.data);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  
  const {thumbnail, title, teamName, teamMembers, techStack, projectSummary, description } = project;

  const Member = ({member}) => {
    const {image, name, position, contact} = member;
    return(
      <>
        <div className="instructor">
              <img src={image} className="instructorImgEvent" alt=" "/>
              <div className="instructorInfo">
                <div className="instructorName">{name}</div>
                <div className="instructorProfession">{position}</div>
                <div className="instructorCompany">{contact}</div>
              </div>
            </div>
      </>
    );
  }

  return (
    <>
       
      <div className="projectLayoutContainer">
      <div
          className="heroEvent"
          style={{ backgroundImage: `url(${thumbnail})` }}
        >
          <div className="heroHeader" >
            <div className="projectName">{title}</div>
            <div className="offeredByWrapper">
                <span className="superscript">Hosted On</span> 
                <span className="offeredBy"> Commune </span>
                </div>
          </div>
          <div className="projectDiscription">{projectSummary}</div>
          
          <div className="rating"></div>
          <div className="enrollNow">Explore</div>
        </div>

        <div className="headingProjectLayout">About&nbsp;Project</div>
        <hr className="heProjectLayout" />

        <div className="layoutBottom">
          <div className="layoutLeftBottom">
            <div className="syllabus">
                <div className="syllabusHeader">Description</div>
                <div className="descriptionPoints">
                    <div className="descriptionText">{description}</div>            
                </div>
            </div>

            <div className="skillWrapper">
            <div className="syllabusHeader">Skills Involved</div>
            <div className="skills">
                {techStack?.map(tech => {
                  return <div className="tech">{tech}</div>
                })}
            </div>
            </div>
          </div>
          
          

          <div className="layoutRightBottom">
              <div className="instructorHeading">Team : {teamName}</div>
            <div className="instructor">             
              <div className="instructorInfo">
                {teamMembers?.map(member => {
                  return <Member member={member}/>
                })}
              </div>
            </div>
          </div>

          
        </div>

        <div className="headingProjectLayout">Project&nbsp;files</div>
          <hr className="heProjectLayout" />
        <div className="projectFiles">
              <div className="file">project.zip</div>
          </div>
      </div>
    </>
  );
};

export default ProjectLayout;
