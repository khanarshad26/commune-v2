import './addCell.css';
import React, {useState, useEffect, useRef  } from 'react';
import axios from 'axios';
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import { Cancel } from "@material-ui/icons";
import { useParams } from 'react-router';
import {useNavigate} from 'react-router-dom';
 
import InstituteSidebar from '../institutePublicSidebar/InstituteSidebar';

  const AddCell = () => {
    const {type} = useParams();
    const navigate = useNavigate();

    const user = useSelector(state => state.user.user);

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const [file, setFile] = useState(null);

    const saveHandler = async (e) => {
      e.preventDefault();
      const cell = {
        institute: user._id,
        name: name.current.value,
        type: type,
        email : email.current.value,
        password : password.current.value
      };
      if (file) {
        const data = new FormData();

        const fileName = Date.now() + file.name;
        data.append("name", fileName);
        data.append("file", file);
        cell.coverPicture = "/assets/" + fileName;
        try {
          await axios.post("/api/upload", data);
        } catch (err) {
          console.log(err);
        }
      }
      try {
        await axios.post(`/api/cell/register`, cell);
      } catch (err) {
        console.log(err);
      }
      navigate('/')
    };

    const cancelHandler = () => {
      navigate('/')
    };

    return (
      <>
       
      <div className="instituteAdminContainer">
        <div className="instituteSidebar">
          <InstituteSidebar />
        </div>
        <div className="AddCellRightbar">
        <div className="addCellShadowBox">
          <div className="shadowBoxUpper">
            <span className="shadowBoxText">Create login credentials for {type}</span>
            <p> you can provide these credentials to the {type} members to manage or can manage yourself.</p>
          </div>
          <div className="add addEventContainer">
            <form className="form">
              <div className="halfSection">
                <div className="halfInputContainer">
                  <label className="label">Name</label>
                  <input type="text" className="input" ref={name} />
                </div>

                <div className="halfInputContainer">
                  <label className="label">Email</label>
                  <input type="text" className="input" ref={email} />
                </div>
              </div>

              <div className="fullSection">
                <div className="inputContainer">
                  <label className="label">Password</label>
                  <input type="text" className="input" ref={password} />
                </div>
              </div>

              <div className="inputContainer">
                <label htmlFor="file" className="shareOption">
                  <PhotoCameraBackIcon
                    htmlColor="tomato"
                    className="shareIcon"
                  />
                  <span className="label">Cover Picture</span>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    accept=".png,.jpeg,.jpg, .pdf, .dox, .zip, .xlsx"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </label>
              </div>

              {file && (
                <div className="shareEventImgContainer">
                  <img
                    className="shareImg"
                    src={URL.createObjectURL(file)}
                    alt=" "
                  />
                  <Cancel
                    className="shareCancelImg"
                    onClick={() => setFile(null)}
                  />
                </div>
              )}

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
        </div>
        </div>
      </div>



      </>
    );
  };

  export default AddCell;