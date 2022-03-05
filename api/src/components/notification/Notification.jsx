import React from "react";
import "./notification.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import NotificationTemplate from "../notificationTemplate/NotificationTemplate";

const Notification = () => {
   
  const NotificationTemplate = () => {
    return (
        <>
        <div className="messageWrapper">
                <img src="assets/gift.png" className="messengeImg" alt=" "/>
                <div className="messageInfo">
                  <div className="msg"> It's Shivanshu Nayak's birthday today. Help him have a great day!</div>
                  <div className="msgTime">about an hour ago</div>
                  {/* <div className="instructorCompany">Lead</div> */}
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
                <div className="noficationHeading">Notifications</div>
                <div className="menuIcon">
                  <MoreVertIcon />
                </div>
              </div>

              <div className="readNotifications">
                  <div className="readNotification">All</div>
                  <div className="readNotification">Unread</div>
              </div>



            </div>

            <NotificationTemplate />
            <NotificationTemplate />
            <NotificationTemplate />

          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
