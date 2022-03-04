import React, {useState, useEffect, useContext, useRef} from 'react';
import {AuthContext} from '../../../context/AuthContext.js';
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import axios from "axios";
import './interest.css'

const Interest = () => {
  const { user } = useContext(AuthContext);
  const [interests, setInterests] = useState([]);
  const interestText = useRef();
  const [toggle, setToggle] = useState(false);

  const fetchInterests = async () => {
    try {
      const res = await axios.get(`/api/interest/${user._id}`);
      setInterests(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchInterests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const cancelHandler = () => {
    setToggle(!toggle);
  }

  const saveHandler = async(e) => {
    e.preventDefault();
    const interest = {
      interest : interestText.current.value
    }
    if(interestText!==null || interestText===""){
      try {
        await axios.post(`/api/interest/${user._id}`, interest);
        setToggle(!toggle);
      } catch (err) {
        console.log(err);
      }
    }
    fetchInterests();
  }


  return (
    <>
      <div className="shadowBox">
        <div className="shadowBoxUpper">
          <span className="shadowBoxText">Interests</span>
          <ModeEditOutlineIcon className="shadowBoxIcon" onClick={() => setToggle(!toggle)}/>
        </div>
        
        {toggle ? (
          <div className="addInterest">
            <textarea
              className="textareaAchievement"
              ref={interestText}
            />
            <div className="boxBottom">
            <div className="cancel" onClick={cancelHandler}>
              Cancel
            </div>
            <div className="save" onClick={saveHandler}>
              save
            </div>
          </div>
          <hr />
          </div>
          ) : (
            null
          )}
        
        <div className="shadowBoxLower">
          {interests.map((interest) => {
            return <p>{interest}</p>;
          })}
        </div>
      </div>
    </>
  );
};

export default Interest;
