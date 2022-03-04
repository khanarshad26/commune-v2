import React, { useContext, useEffect, useState, useRef } from "react";
import "./workshop.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import { Cancel } from "@material-ui/icons";
import WorkshopCard from "../../components/workshopCard/WorkshopCard.jsx";

const Workshop = () => {
  const { user } = useContext(AuthContext);

  const [workshops, setworkshops] = useState([]);
  const [campusworkshops, setCampusworkshops] = useState([]);
  const [exploreworkshops, setExploreworkshops] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [showworkshops, setShowworkshops] = useState(true);
  const [showCampusworkshops, setShowCampusworkshops] = useState(false);
  const [showExploreworkshops, setShowExploreworkshops] = useState(false);

  const fetchworkshops = async () => {
    const res = await axios.get(`/api/workshop/all/${user._id}`);
    setworkshops(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  };

  const fetchCampusworkshops = async () => {
    const res = await axios.get(`/api/workshop/institute/all/${user.institute}`);
    setCampusworkshops(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  };

  const fetchExploreworkshops = async () => {
    const res = await axios.get(`/api/workshop/all/${user.institute}`);
    setExploreworkshops(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  };

  useEffect(() => {
    fetchworkshops();
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []);

  const Addworkshop = () => {
    const hostname = useRef(null);
    const name = useRef(null);
    const description = useRef(null);
    const from = useRef(null);
    const to = useRef(null);
    const venue = useRef(null);
    const summary = useRef(null);
    const type = useRef(null);
    const [file, setFile] = useState(null);

    const saveHandler = async (e) => {
      e.preventDefault();
      const addworkshop = {
        userId: user._id,
        hostname: hostname.current.value,
        name: name.current.value,
        description: description.current.value,
        from: from.current.value,
        to: to.current.value,
        venue: venue.current.value,
        summary: summary.current.value,
        type: type.current.value,
        institute : user.institute
      };
      if (file) {
        const data = new FormData();

        const fileName = Date.now() + file.name;
        data.append("name", fileName);
        data.append("file", file);
        addworkshop.coverPicture = "/assets/" + fileName;
        try {
          await axios.post("/api/upload", data);
        } catch (err) {
          console.log(err);
        }
      }
      try {
        await axios.post(`/api/workshop/`, addworkshop);
      } catch (err) {
        console.log(err);
      }
      setIsOpen(false);
      setFile(null);
      setShowworkshops(true);
    };

    const cancelHandler = () => {
      setIsOpen(false);
      setShowworkshops(true);
    };

    return (
      <>
        <div className="addworkshopShadowBox">
          <div className="shadowBoxUpper">
            <span className="shadowBoxText">Create Workshop</span>
          </div>
          <div className="add addworkshopContainer">
            <form className="form">
              <div className="halfSection">
                <div className="halfInputContainer">
                  <label className="label">Workshop Title</label>
                  <input type="text" className="input" ref={name} />
                </div>

                <div className="halfInputContainer">
                  <label className="label">Host Name</label>
                  <input type="text" className="input" ref={hostname} />
                </div>
              </div>

              <div className="fullSection">
                <div className="inputContainer">
                  <label className="label">Summary</label>
                  <input type="text" className="input" ref={summary} />
                </div>
              </div>

              <div className="fullSection">
                <div className="inputContainer">
                  <label className="label">Venue</label>
                  <input type="text" className="input" ref={venue} />
                </div>
              </div>

              <div className="halfSection">
                <div className="halfInputContainer">
                  <label className="label">From</label>
                  <input type="datetime-local" className="input" ref={from} />
                </div>
                <div className="halfInputContainer">
                  <label className="label">To</label>
                  <input type="datetime-local" className="input" ref={to} />
                </div>
              </div>

              <section className="halfInputContainer">
                <label className="labelworkshopType">Workshop Type</label>
                <select className="selectworkshop" ref={type}>
                  <option value="Select Workshop" diasabled>
                    --Select--
                  </option>
                  <option value="Technical">Technical</option>
                  <option value="Non-Technical">Non-Technical</option>
                </select>
              </section>

              {/* <div className="fullSection">
                <div className="inputContainer">
                  <label className="label">Cover Picture</label>
                  <DropzoneComponent />
                </div>
              </div> */}

              <div className="inputContainer">
                <label htmlFor="file" className="shareOption">
                  <PhotoCameraBackIcon
                    htmlColor="tomato"
                    className="shareIcon"
                  />
                  <span className="label">Cover</span>
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
                <div className="shareworkshopImgContainer">
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

              <div className="fullSection">
                <div className="inputContainer">
                  <label className="label">Description</label>
                  <textarea
                    className=" addworkshopTextarea"
                    type="text"
                    rows={4}
                    ref={description}
                  />
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
        </div>
      </>
    );
  };

  const WorkshopsList = ({ workshopsList }) => {
    return (
      <>
        <div className="workshopsList">
          {workshopsList.map((workshop) => {
            return <WorkshopCard workshop={workshop} />;
          })}
        </div>
      </>
    );
  };

  const showworkshopHandler = () => {
    setIsOpen(false);
    setShowCampusworkshops(false);
    setShowworkshops(true);
    setShowExploreworkshops(false);
    fetchworkshops();
  };

  const showCampusworkshopHandler = () => {
    setIsOpen(false);
    setShowCampusworkshops(true);
    setShowworkshops(false);
    setShowExploreworkshops(false);
    fetchCampusworkshops();
  };

  const showExploreworkshopHandler = () => {
    setIsOpen(false);
    setShowCampusworkshops(false);
    setShowworkshops(false);
    setShowExploreworkshops(true);
    fetchExploreworkshops();
  };

  const showAddworkshopHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
       
      <div className="workshopPageContainer">
        <Sidebar />
        <div className="workshopPageRight">
          <div className="yourworkshops">
            <div className="commonLayoutHeader">
              <div className="commonLayoutHeaderLeft">
                <div className="commonLayoutHeading" onClick={showworkshopHandler}>
                  Your&nbsp;workshops
                </div>
                <div
                  className="commonLayoutHeading"
                  onClick={showCampusworkshopHandler}
                >
                  Campus&nbsp;workshops
                </div>
                <div
                  className="commonLayoutHeading"
                  onClick={showExploreworkshopHandler}
                >
                  Explore
                </div>
              </div>

              <div className="commonLayoutHeaderRight">
                <div
                  className="commonLayoutHeading"
                  onClick={showAddworkshopHandler}
                >
                  Create&nbsp;workshop
                </div>
              </div>
            </div>

            {isOpen ? <Addworkshop /> : null}

            {showworkshops ? <WorkshopsList workshopsList={workshops} /> : null}

            {showCampusworkshops ? <WorkshopsList workshopsList={campusworkshops} /> : null}

            {showExploreworkshops ? (
              <WorkshopsList workshopsList={exploreworkshops} />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Workshop;
