import "./rightbar.css";
import EventHome from "../eventHome/EventHome";
// import { Users } from "../../dummyData";
// import Online from "../online/Online";
import Friends  from "../friends/Friends";
import Intro from "../intro/Intro";
import Messenger from '../messenger/Messenger';

export default function Rightbar({ profile, showMessage }) {
  const HomeRightbar = () => {
    return (
      <>
      <EventHome />

      {showMessage && <Messenger />}
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
