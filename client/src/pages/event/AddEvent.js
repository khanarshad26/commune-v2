import React, { useState, useEffect, useContext, useRef } from "react";
import "./addEvent.css";
import { AuthContext } from "../../context/AuthContext"; 
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import axios from "axios";

const  AddEvent = ({isOpen}) => {
  // const {isOpen, setIsOpen} = props;
  const { user } = useContext(AuthContext);
  const [ addEvents, setAddEvents] = useState([]);
  const [toggle, setToggle] = useState(false);

  const institution = useRef();
  const major = useRef();
  const degree = useRef();
  const location = useRef();
  const description = useRef();
  const from = useRef();
  const to = useRef();
  const isChecked = useRef();

  

  // function openModal() {
  //   setIsOpen(true);
  //   // can I set the styling for '.body' or 'html' here?
  // }

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen])

  const saveHandler = async (e) => {
    e.preventDefault();
    const  addEvent = {
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
      await axios.post("/api/addEvent/",  addEvent);
    } catch (err) {
      console.log(err);
    }
    setToggle(!isOpen);
  };

  const cancelHandler = () => {
    setToggle(false);
  }

  const AddEventTemplate = () => {
    return(
      <>
        <div className="add addEventContainer">
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
                  className=" addEventTextarea"
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
              <input type="checkbox" className="chechbox addEvent" ref={isChecked} />
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

  return (
    <>
     <div className="shadowBox">
        <div className="shadowBoxUpper">
          <span className="shadowBoxText">Create Event</span>
        </div>
        <AddEventTemplate />
      </div>
    </>
  );
};

export default  AddEvent;
