import React from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
// import ConnectionTemplate from "../../components/connectionTemplate/ConnectionTemplate";
import './connections.css';

const Connections = (props) => {
  const NoPendingRequests = () => {
    return (
      <div className="noPendingRequestsContainer">
        <div className="noPendingRequestsText">No pending invitations</div>
        <div className="noPendingRequestsManage">Manage</div>
      </div>
    );
  };

  const ConnectionTemplate = ({connection}) => {
    return(
        <>
        <div className="connectionsTemplateContainer">
            <div className="connectionsTemplateHeader">
            <img src={connection.coverimgurl } className='connectionCoverImage'  alt=" "/>
            <img src={connection.imgurl || "/assets/person/4.jpeg"} className='connectionImage' alt=" " />
            </div>
            <div className="connectionInfo">
             <div className="connectionName">{connection.username || "Arshad Khan"}</div>
             <div className="connectionPosition">{connection.position || "UI Developer | Former CEO of Uber | Former CTO of LinkedIn"}</div>
             <div className="connectionPosition">{connection.organization || "Google"}</div>
             </div>
             <div className="connect">Connect</div>
        </div>
        </>
    );
}


  

  const ConnectRequests = (props) => {
    return (
      <>
      <div className="connectRequestContainer">
          <div className="connectRequestHeading1">Invitaions</div>
          <div className="connectRequestsWrapper">
        {props.connectionRequests ? (
          props.connectionRequests.map((connreq) => {
            return (
              <>
                 <ConnectionTemplate props={connreq}/>
              </>
            );
          })
        ) : (
          <NoPendingRequests />
        )}
        </div>
        </div>
      </>
    );
  };

  return (
    <>
    
      <div className="connectionsContainer">
          <Sidebar  />
          <div className="connectionsRightbar">
              <ConnectRequests />
              <div className="connections">
                  <div className="connectionsTitle">Your Connections</div>
                  <div className="connectionsWrapper" >
                  
                      { props.connections.map((connection) => {
                           return <ConnectionTemplate connection={connection} />
                      }) }
                  </div>
              </div>

          </div>
      </div>
      {/* <NoPendingRequests /> */}
    </>
  );
};

export default Connections;
