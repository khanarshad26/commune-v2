import React from "react";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Portfolio from "./pages/portfolio/Portfolio";
import Signup from "./pages/signup/Signup";
import Signin from "./pages/signin/Signin";
import LandingPage from "./pages/landingPage/LandingPage";
import Event from "./pages/event/Event";
import Workshop from "./pages/workshops/Workshop";
import Project from "./pages/projects/Project";
import WorkshopLayout from "./pages/workshopLayout/WorkshopLayout";
import ProjectLayout from "./pages/projectLayout/ProjectLayout";
import EventLayout from "./pages/eventLayout/EventLayout";
import Connections from "./pages/connections/Connections";
import Forum from "./pages/forum/Forum";
import Teams from "./pages/teams/Teams";
import Cell from "./pages/cell/Cell";
import Signup2 from "./pages/signup2/Signup2";
import AddCell from "./pages/institute/addCell/AddCell";
import CellHome from "./pages/cellHome/CellHome";
import Topbar from "./components/topbar/Topbar.jsx";
import Sidebar from "./components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import Nav from "./components/topbar/Nav.jsx";
import ProfilePublic from "./pages/profilePublic/ProfilePublic";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Institute from "./pages/institute/Institute";
import { useSelector } from 'react-redux';
import './app.css';




function App() {
  const user = useSelector(state => state.user.user);
  const showMenu = useSelector(state => state.utility.showMenu);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    localStorage.setItem('user',JSON.stringify(user));
    console.log("app user is saving in local host due to user data change or app rerendering due to other reasons");
  },[user])

  const HomePage = () => {
    return (
      <>
        {(user.type === "Student" || user.type === "Faculty") ? <Home showMessage={showMessage}/> : null}
        {(user.type === "Club" || user.type === "Association") ? <CellHome /> : null}
        {(user.type === "Institute") ? <Institute /> : null}
      </>
    );
  }

  return (
    <>

      <Router>
        {user ? <Topbar setShowMessage={setShowMessage} showMessage={showMessage} /> : null}
        {showMenu ? <div className="mobileScreenSidebar" >
        <Sidebar />
        </div> : null}
       {user ? <div className="homeDownbar">
          <Nav />
        </div> : null}
        <Routes>
          <Route exact path="/" element={user ? <HomePage showMessage={showMessage}/> : <LandingPage />} ></Route>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Signin />} ></Route>
          <Route path="/register" element={user ? <Navigate to="/" /> : <Signup />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/portfolio" element={<Portfolio />}></Route>
          <Route path="/workshops" element={<Workshop />}></Route>
          <Route path="/projects" element={<Project />}></Route>
          <Route path="/events" element={<Event />}></Route>
          <Route path="/workshop/:id" element={<WorkshopLayout />}></Route>
          <Route path="/project/:id" element={<ProjectLayout />}></Route>
          <Route path="/event/:id" element={<EventLayout />}></Route>
          <Route path="/myconnections" element={<Connections />}></Route>
          <Route path="/forum" element={<Forum />}></Route>
          <Route path="/team" element={<Teams />}></Route>
          <Route path="/event/:id" element={<EventLayout />}></Route>
          <Route path="/institute" element={<Institute />}></Route>
          <Route path="/club/:id" element={<Cell />}></Route>
          <Route path="/association/:id" element={<Cell />}></Route>
          <Route path="/logintest" element={<Signin />} ></Route>
          <Route path="/registertest" element={<Signup />}></Route>
          <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup2 />}></Route>
          <Route path="/profile/:id" element={<ProfilePublic />}></Route>
          <Route path="/:type" element={<AddCell />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
