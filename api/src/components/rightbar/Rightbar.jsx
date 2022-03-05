import "./rightbar.css";
import EventHome from "../eventHome/EventHome";
// import { Users } from "../../dummyData";
// import Online from "../online/Online";
import Friends  from "../friends/Friends";
import Intro from "../intro/Intro";

export default function Rightbar({ profile }) {
  const HomeRightbar = () => {
    return (
      <>
      <EventHome />
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
      <Intro />
      <Friends />
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
