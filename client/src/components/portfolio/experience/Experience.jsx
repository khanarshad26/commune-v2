import React, { useState, useEffect,    useRef } from "react";
import "./experience.css";
import { useSelector } from 'react-redux'; 
  
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import axios from "axios";

const Experience = () => {
  const user = useSelector(state => state.user.user);
  const [experiences, setExperiences] = useState([]);
  const [toggle, setToggle] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);

  const institution = useRef();
  const title = useRef();
  const isChecked = useRef();
  const location = useRef();
  const description = useRef();
  const from = useRef();
  const to = useRef();
  
  const fetchExperience = async () => {
    try {
      const res = await axios.get(`/api/experience/all/${user._id}`);
      setExperiences(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExperience();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveHandler = async (e) => {
    e.preventDefault();
    const experience = {
      userId : user._id,
      institution: institution.current.value,
      title: title.current.value,
      location: location.current.value,
      description: description.current.value,
      from: from.current.value,
      to: to.current.value,
      current : isChecked.current.checked
    };
    try {
      await axios.post("/api/experience/", experience);
    } catch (err) {
      console.log(err);
    }
    setToggle(!toggle);
    fetchExperience();
  };

  const cancelHandler = () => {
    setToggle(!toggle);
  }

  const AddExperience = () => {
    return(
      <>
        <div className="addEducationContainer">
          <form className="form">

            <div className="halfSection">
              <div className="halfInputContainer">
                <label className="label">Title</label>
                <input type="text" className="input" ref={title} />
              </div>

              <div className="halfInputContainer">
                <label className="label">Company</label>
                <input type="text" className="input" ref={institution} />
              </div>

            </div>

            <div className="fullSection">
              <div className="inputContainer">
                <label className="label">location</label>
                <input type="text" className="input" ref={location} />
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
              <input type="checkbox" className="chechboxEducation" ref={isChecked}  />
              <span className="currentText">I currently attend</span>
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

  const ExperienceCard = ({ experience }) => {
    return (
      <>
        <div className="educationCardContainer">
          <img src="/assets/company.png" className="educationImage" alt=" " />

          <div className="educationCardContainerRight">
            <div className="degree">
              {experience.title}
            </div>
            <div className="institution">{experience.institution}</div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="shadowBox">
        <div className="shadowBoxUpper">
          <span className="shadowBoxText">Experience</span>
          <ModeEditOutlineIcon
            className="shadowBoxIcon"
            onClick={(e) => setToggle(!toggle)}
          />
        </div>

        {toggle ? <AddExperience /> : null}

        <div className="shadowBoxLower">
          {experiences.map((experience) => {
            return <ExperienceCard experience={experience} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Experience;
