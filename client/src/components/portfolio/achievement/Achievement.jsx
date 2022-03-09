import React, { useState, useEffect,    useRef } from "react";
import { useSelector } from 'react-redux';
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./achievement.css";
import { v4 as uuidv4 } from "uuid";

const Achievement = () => {
  const user = useSelector(state => state.user.user);
  const [achievements, setAchievements] = useState([]);
  const achievementText = useRef();
  const [toggle, setToggle] = useState(false);

  const fetchAchievements = async () => {
    try {
      const res = await axios.get(`/api/achievement/${user._id}`);
      setAchievements(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAchievements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cancelHandler = () => {
    setToggle(!toggle);
  };

  const saveHandler = async (e) => {
    e.preventDefault();
    setToggle(!toggle);
    const achievement = {
      id: uuidv4(),
      achievement: achievementText.current.value,
    };
    if (achievementText !== null || achievementText !== "") {
      try {
        await axios.post(`/api/achievement/${user._id}`, achievement);
        setToggle(!toggle);
        fetchAchievements();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const deleteHandler = async (index) => {
    const achievementToBeDeleted = {
      achievement: achievements[index],
    };
    const removed = achievements.splice(index, 1);
    setAchievements(
      achievements.filter((achievement) => {
        return achievement !== removed;
      })
    );
    try {
      await axios.delete(
        `/api/achievement/${user._id}`,
        achievementToBeDeleted
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="shadowBox">
        <div className="shadowBoxUpper">
          <span className="shadowBoxText">Achievements</span>
          <ModeEditOutlineIcon
            className="shadowBoxIcon"
            onClick={() => setToggle(!toggle)}
          />
        </div>

        {toggle ? (
          <div className="addAchievement">
            <textarea className="textareaAchievement" ref={achievementText} />
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
        ) : null}

        <div className="shadowBoxLower">
          {achievements.map(({ id, achievement }) => {
            return (
              <>
                <div className="commonLayoutHeaderAchievement">
                  <div className="commonLayoutHeaderLeft">
                    <div className="achievementText">{achievement}</div>
                  </div>
                  <div className="commonLayoutHeaderRight">
                    <div
                      className="commonLayoutHeading"
                      onClick={deleteHandler(id)}
                    >
                      <DeleteOutlineIcon />
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Achievement;
