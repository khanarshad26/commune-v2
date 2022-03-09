import "./topbar.css";
// import { useState } from "react";
import { Search } from "@material-ui/icons";
import MenuIcon from '@mui/icons-material/Menu';
import  {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Nav from './Nav.jsx';
import {useDispatch} from 'react-redux';
import {setShowMenu} from '../../state/utility.js';

export default function Topbar() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  // const notification_count = 0;
  // const msg_count = 0;
  // const [showMessage,setShowMessage] = useState(false);

  // const notificationHandler = () => {
  //   // props.setNotification(!props.notification);
  //   // props.setMessaging(false);
  // }

  // const messagingHandler = () => {
  //   // props.setMessaging(!props.messaging);
  //   // props.setNotification(false);
  //   setShowMessage(!showMessage);
  // }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <div className="homeMenubar">
        <MenuIcon onClick={() => dispatch(setShowMenu())}/>
        </div>
        <Link to='/' className="logo">Commune</Link>
        <span className="searchbar">
          <Search className="searchIcon" />
          <input placeholder="Search" className="searchInput" />
        </span>
      </div>

      <div className="topbarCenter"></div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="navWrapper">
          <Nav />
          </div>

          <div className="vl"></div>

          <Link to='/profile' className="topbarIconItem">
          <img src={user?.profilePicture} alt=" " className="topbarImg" />
          </Link>
        </div>
      </div>
    </div>
  );
}
