import React from "react";
import "./workshopLayout.css";
 

const WorkshopLayout = () => {
  return (
    <>
       
      <div className="projectLayoutContainer">
        <div className="hero1">
          <div className="heroHeader">
            <div className="projectName1">Google Data Analytics<br/>Professional WorkShop</div>
            <div className="offeredByWrapper">
                <span className="superscript">Offered By</span> 
                <span className="offeredBy"> Commune </span>
                </div>
          </div>
          <div className="projectDiscription">This is your path to a career in data analytics. In this program, you’ll learn in-demand skills that will have you job-ready in less than 6 months. No degree or experience required.</div>
          <div className="projectDiscription">This is your path to a career in data analytics. In this program, you’ll learn in-demand skills that will have you job-ready in less than 6 months. No degree or experience required.</div>
          <div className="projectDiscription">This is your path to a career in data analytics. In this program, you’ll learn in-demand skills that will have you job-ready in less than 6 months. No degree or experience required.</div>
          <div className="projectDiscription">This is your path to a career in data analytics. In this program, you’ll learn in-demand skills that will have you job-ready in less than 6 months. No degree or experience required.</div>
          <div className="projectDiscription">This is your path to a career in data analytics. In this program, you’ll learn in-demand skills that will have you job-ready in less than 6 months. No degree or experience required.</div>
          <div className="rating"></div>
          <div className="enrollNow">Enroll&nbsp;Now</div>
        </div>

        <div className="headingProjectLayout">About&nbsp;Workshop</div>
        <hr className="heProjectLayout" />

        <div className="layoutBottom">
          <div className="layoutLeftBottom">
            <div className="syllabus">
                <div className="syllabusHeader">WHAT YOU WILL LEARN</div>
                <div className="descriptionPoints">
                    <div className="descriptionText">Gain an immersive understanding of the practices and processes used by a junior or associate data analyst in their day-to-day job</div>
                    <div className="descriptionText">Learn key analytical skills (data cleaning, analysis, & visualization) and tools (spreadsheets, SQL, R programming, Tableau) </div>
                </div>
            </div>

            <div className="skillWrapper">
            <div className="syllabusHeader">SKILLS YOU WILL GAIN</div>
            <div className="skills">
                
                <div className="skill">Spreadsheet</div>
                <div className="skill">Data&nbsp;Cleansing</div>
                <div className="skill">Data&nbsp;Analysis</div>
                <div className="skill">Data&nbsp;Visualization</div>
            </div>
            </div>
          </div>
          
          

          <div className="layoutRightBottom">
              <div className="instructorHeading">Instructors</div>
            <div className="instructor">
              <img src="assets/person/2.jpeg" className="instructorImg" alt=" " />
              <div className="instructorInfo">
                <div className="instructorName">Hariom Singh</div>
                <div className="instructorProfession">Software Developer</div>
                <div className="instructorCompany">@Google</div>
              </div>
            </div>
          </div>

          
        </div>

        <div className="headingProjectLayout">Download&nbsp;files</div>
          <hr className="heProjectLayout" />
        <div className="projectFiles">
            
              <div className="file">project.zip</div>
          </div>
      </div>
    </>
  );
};

export default WorkshopLayout;
