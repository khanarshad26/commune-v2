import React from "react";
import "./messenger.css";
import { Search } from "@material-ui/icons";
import Contact from "../contact/Contact";

const Messenger = () => {
  const [contact, setContact] = React.useState("");
  const MessengerTemplate = (props) => {
    return (
      <>
        <div className="messageWrapper">
          <img src="assets/person/4.jpeg" className="messengeImg" alt=" " />
          <div className="messageInfo1">
            <div className="msgName"> Arman Khan</div>
            <div className="msg1">Kya kar rha he bhai</div>
            <div className="msgTime1">about an hour ago</div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="rightbar">
        <div className="rightbarWrapper">
          <div className="notificationContainer">
            <div className="notificationTop">
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
            {contact === "" ? (
              <Contact contact={contact} setContact={setContact} />
            ) : (
              <MessengerTemplate />
            )}
            {/* <MessengerTemplate />
            <MessengerTemplate />
            <MessengerTemplate /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
