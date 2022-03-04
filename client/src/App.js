import React, { useContext } from "react";
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
import Bookmarks from "./pages/bookmarks/Bookmarks";
import Cell from "./pages/cell/Cell";
import Signup2 from "./pages/signup2/Signup2";
import AddCell from "./pages/institute/addCell/AddCell";
import CellHome from "./pages/cellHome/CellHome";
import Topbar from "./components/topbar/Topbar.jsx";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {AuthContext} from './context/AuthContext.js'
import Institute from "./pages/institute/Institute";




function App() {
  const { user } = useContext(AuthContext);
  // let user = false;
  const connections = [{
        username : "Arshad Khan",
        // coverimgurl :'/assets/person/4.jpeg',
        imgurl :'/assets/person/4.jpeg',
        position : "UI Developer",
        organization : "Google"

  },
  {
    username : "Arshad Khan",
    // coverimgurl :'/assets/person/4.jpeg',
    imgurl :'/assets/person/4.jpeg',
    position : "UI Developer",
    organization : "Google"

},
{
  username : "Arshad Khan",
  // coverimgurl :'/assets/person/4.jpeg',
  imgurl :'/assets/person/4.jpeg',
  position : "UI Developer",
  organization : "Google"

},
  {
    username : "Arshad Khan",
    // coverimgurl :'/assets/person/4.jpeg',
    imgurl :'/assets/person/4.jpeg',
    position : "UI Developer",
    organization : "Google"

},{
  username : "Arshad Khan",
  // coverimgurl :'/assets/person/4.jpeg',
  imgurl :'/assets/person/4.jpeg',
  position : "UI Developer",
  organization : "Google"

}]

  const HomePage = () => {
    return(
      <>
      {(user.type==="Student" || user.type==="Faculty") ? <Home /> : null}
      {(user.type==="Club" || user.type==="Association") ? <CellHome /> : null}
      {(user.type==="Institute") ? <Institute /> : null}
      </>
    );
  }

  return (
    <>
   
      <Router>
      <Topbar />
          <Routes>
            {/* {(user.type==="Student" || user.type==="Faculty")} */}
            <Route exact path="/" element={user ? <HomePage /> : <LandingPage />} ></Route>
            <Route path="/landing" element={<LandingPage />} ></Route>
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
            <Route path="/myconnections" element={<Connections connections={connections} />}></Route>
            <Route path="/forum" element={<Forum />}></Route>
            <Route path="/team" element={<Teams />}></Route>
            <Route path="/event/:id" element={<EventLayout />}></Route>
            <Route path="/bookmark" element={<Bookmarks />}></Route>
            <Route path="/institute" element={<Institute />}></Route>
            <Route path="/club/:id" element={<Cell />}></Route>
            <Route path="/association/:id" element={<Cell />}></Route>
            <Route path="/logintest" element={ <Signin />} ></Route>
            <Route path="/registertest" element={<Signup />}></Route>
            <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup2 />}></Route>
            {/* <Route path="/project/:id" element={<ProjectLayout />}></Route> */}
            <Route path="/:type" element={ <AddCell />}></Route>

          </Routes>
        
      </Router>
    </>
  );
}

export default App;
