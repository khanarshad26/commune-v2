import React, {useState, useEffect, useContext} from 'react';
import { useSelector } from 'react-redux'; 
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import axios from "axios";

const About = () => {
  const user = useSelector(state => state.user.user);
  const [about, setAbout] = useState(user.about);
  const [aboutToggle, setAboutToggle] = useState(false);

  const fetchAbout = async() => {
    try{
      const res = await axios.get(`/api/about/${user._id}`);
      setAbout(res.data);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    fetchAbout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const aboutCancelHandler = (e) => {
      setAboutToggle(!about);
  }

  const aboutSaveHandler = async(e) => {
      try{
        console.log("About : " + about);
        setAboutToggle(!aboutToggle);
        await axios.post(`/api/about/${user._id}`,{
        about : about
        });
      }catch(err){
        console.log(err);
      }
  }

  return (
    <>
      <div className="shadowBox">
        <div className="shadowBoxUpper">
          <span className="shadowBoxText">About you</span>
          <ModeEditOutlineIcon
            className="shadowBoxIcon"
            onClick={() => setAboutToggle(!aboutToggle)}
          />
        </div>
        <div className="aboutBoxMiddle">
          {aboutToggle ? (
            <textarea
              className="textarea"
              value = {about}
              onChange={(e) => setAbout(e.target.value)}
            />
          ) : (
            <p>{about}</p>
          )}
        </div>

        {aboutToggle ? (
          <div className="boxBottom">
            <div className="cancel" onClick={aboutCancelHandler}>
              Cancel
            </div>
            <div className="save" onClick={aboutSaveHandler}>
              save
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default About;
