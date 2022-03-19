import React, { useState, useEffect,    useRef } from "react";
import "./education.css";
import { useSelector } from 'react-redux';
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { MoreVert } from "@material-ui/icons";
import axios from "axios";

const Education = () => {
  const user = useSelector(state => state.user.user);
  const [educations, setEducations] = useState([]);
  const [toggle, setToggle] = useState(false);
  

  const institution = useRef();
  const major = useRef();
  const degree = useRef();
  const location = useRef();
  const description = useRef();
  const from = useRef();
  const to = useRef();
  const isChecked = useRef();

  const fetchEducation = async () => {
    try {
      const res = await axios.get(`/api/education/all/${user._id}`);
      setEducations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(user._id);

  useEffect(() => {
    fetchEducation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveHandler = async (e) => {
    e.preventDefault();
    const education = {
      userId : user._id,
      institution: institution.current.value,
      major: major.current.value,
      degree: degree.current.value,
      location: location.current.value,
      description: description.current.value,
      from: from.current.value,
      to: to.current.value,
      current : isChecked.current.checked
    };
    try {
      await axios.post("/api/education/", education);
    } catch (err) {
      console.log(err);
    }
    setToggle(!toggle);
    fetchEducation();
  };

  const cancelHandler = () => {
    setToggle(!toggle);
  }

  const AddEducation = () => {
    return(
      <>
        <div className="addEducationContainer">
          <form className="form">

            <div className="fullSection">
              <div className="inputContainer">
                <label className="label">institution</label>
                <input type="text" className="input" ref={institution} />
              </div>
            </div>

            <div className="halfSection">
              <div className="halfInputContainer">
                <label className="label">major</label>
                <input type="text" className="input" ref={major} />
              </div>

              <div className="halfInputContainer">
                <label className="label">degree</label>
                <input type="text" className="input" ref={degree} />
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
              <input type="checkbox" className="chechboxEducation" ref={isChecked} />
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

  const EducationCard = ({ education }) => {
    const [showModel, setShowModel] = useState(false);
    const deleteHandler = async() => {
      try{
        await axios.delete(`/api/education/${education._id}/${education.userId}`);  
      }catch(err){
        console.log(err);
      }
    }
    return (
      <>
        <div className="educationCardContainer">
          <img src="/assets/graduate.png" className="educationImage" alt=" " />
          <div className="educationCardContainerRight">
            <div className="degree">
              {education.degree + " : " + education.major}
            </div>
            <div className="institution">{education.institution}</div>
          </div>
          
          <MoreVert onClick={() => setShowModel(!showModel)}/>
          {showModel ? <div className="morePost">
              {/* <div id="more1" className="copyLink">
                <div id="cpylinkIcon"><img id="morepostIcon" className="cpylinkIcon" src="/assets/images/linkIcon.png" alt=" " /></div>
                <div id="more2" className="spn"><span className="morepostRighttop" onClick={() => edit}>Edit</span></div>
              </div> */}
              <div id="more1" className="hidePost">
                <img id="morepostIcon" className="hidepostIcon" src="/assets/images/hideIcon.png" alt=" " />
                <div className="additionalOption" onClick={deleteHandler}>Delete</div>
              </div>
            </div> : null}
      
        </div>
      </>
    );
  };

  return (
    <>
      <div className="shadowBox">
        <div className="shadowBoxUpper">
          <span className="shadowBoxText">Education</span>
          <ModeEditOutlineIcon
            className="shadowBoxIcon"
            onClick={(e) => setToggle(!toggle)}
          />
        </div>

        {toggle ? <AddEducation /> : null}

        <div className="shadowBoxLower">
          {educations.map((education) => {
            return <EducationCard education={education} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Education;
