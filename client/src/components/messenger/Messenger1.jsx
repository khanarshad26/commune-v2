import React, { useState } from "react";
import "./messenger.css";
import { Search } from "@material-ui/icons";
// import Contact from "../contact/Contact";
// import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
// import Typography from '@mui/material/Typography';
import './messenger.css';
import { useSelector } from "react-redux";

const Messenger1 = () => {
  // const [contact, setContact] = React.useState("");
  const connections = useSelector(state => state.connection.connections);
  const [showMessegeBox, setShowMessegeBox] = useState(false);


  const MessengerTemplate = ({connection}) => {
    return (
      <>
        <ListItem alignItems="flex-start" className="pd-0" onClick={() => setShowMessegeBox(!showMessegeBox)}>
        <ListItemAvatar>
          <Avatar alt={connection.username}  />
        </ListItemAvatar>
        <ListItemText
          primary={connection.username}
          secondary={
            <React.Fragment>
              {/* <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {"Hi...."}
              </Typography> */}
              {`Hi, I am ${connection.username}...`}
            </React.Fragment>
          }
        />
      </ListItem>
      {/* <Divider variant="inset" component="li" /> */}
      </>
    );
  };

  return (
    <>
      <div className="rightbar">
        <div className="rightbarWrapper">
          <div className="messengerContainer">
            <div className="messengerTop">
              <div className="notificationsHeader">
                <div className="noficationHeading">Messenger</div>
                <div className="menuIcon"></div>
              </div>

              {/* <div className="readNotifications">
                <div className="readNotification"> */}
              <span className="searchbar1">
                <Search className="searchIcon" />
                <input placeholder="Search" className="searchInput" />
              </span>
            </div>
            {/* <div className="readNotification">Unread</div> */}
            {/* </div>
            </div> */}
            {/* {contact === "" ? (
              <Contact contact={contact} setContact={setContact} />
            ) : (
              <MessengerTemplate />
            )} */}
            {connections.map(connection => {
              return <MessengerTemplate key={connection._id} connection={connection} />
            })}

          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger1;
