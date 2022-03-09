import React, {useEffect} from "react";
import { useSelector } from 'react-redux';
import {useDispatch} from "react-redux";
import axios from 'axios';
import Sidebar from "../../components/sidebar/Sidebar";
import './connections.css';
import { setRecommendedConnections, setConnectionRequests, setConnections, setConnectRequests } from '../../state/connection.js';
import { Link } from "react-router-dom";

const Connections = (props) => {
  const user = useSelector(state => state.user.user);
  const recommendedConnections = useSelector(state => state.connection.recommendedConnections);
  // const connections = useSelector(state => state.connection.connections);
  // const connectionRequests = useSelector(state => state.connection.connectionRequests); //requests other sent
  const connectRequests = useSelector(state => state.connection.connectRequests); //request we sent

  const dispatch = useDispatch();

  const fetchRecommendedConnections = async() => {
    try{
      const res = await axios.get('/api/connection/recommended/'+user._id);
      dispatch(setRecommendedConnections(res.data));
      console.log(res.data)
    }catch(err){
      console.log(err);
    }
  }

  const fetchConnectRequest = async() => {
    try{
      const res = await axios.get('/api/connection/connect/'+user._id);
      dispatch(setConnectRequests(res.data));
      console.log("fetchConnectRequest",res.data);
    }catch(err){
      console.log(err);
    }
  }

  const fetchConnectionRequests = async() => {
    try{
      const res = await axios.get('/api/connection/requests/'+user._id);
      dispatch(setConnectionRequests(res.data));
    }catch(err){
      console.log(err);
    }
  }

  const fetchConnections = async() => {
    try{
      const res = await axios.get('/api/connection/'+user._id);
      dispatch(setConnections(res.data));
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    fetchRecommendedConnections();
    fetchConnectionRequests();
    fetchConnections();
    fetchConnectRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const NoPendingRequests = () => {
    return (
      <div className="noPendingRequestsContainer">
        <div className="noPendingRequestsText">No pending invitations</div>
        {/* <div className="noPendingRequestsManage">Manage</div> */}
      </div>
    );
  };

  const ConnectionTemplate = ({connection}) => {

    const sendingConnectionRequest = async() => {
      try{
        await axios.put(`/api/connection/${connection._id}/request`, {
          userId : user._id,
        })
      }catch(err){
        console.log(err);
      }
    }

    return(
        <>
        <div className="connectionsTemplateContainer">
            <div className="connectionsTemplateHeader">
            <img src={connection?.coverPicture || "/assets/coverImage.png" } className='connectionCoverImage'  alt=" "/>
            <Link to={{ pathname : `/profile/${connection._id}` }} ><img src={connection?.profilePicture} className='connectionImage' alt=" " /></Link>
            </div>
            <div className="connectionInfo">
             <div className="connectionName">{connection?.username}</div>
             <div className="connectionPosition">{connection?.tagline || "Student"}</div>
             <div className="connectionPosition">{connection?.institute?.username || "NIT Andhra Pradesh"}</div>
             </div>
             <div onClick={sendingConnectionRequest} className="connect">Connect</div>
        </div>
        </>
    );
}

const RequestTemplate = ({connection}) => {
  const acceptingConnectionRequest = async() => {
    try{
      await axios.put(`/api/connection/${connection._id}/accept`, {
        userId : user._id,
      })
    }catch(err){
      console.log(err);
    }
  }
  return(
      <>
      <div className="connectionsTemplateContainer">
          <div className="connectionsTemplateHeader">
          <img src={connection?.coverPicture || "/assets/coverImage.png" } className='connectionCoverImage'  alt=" "/>
          <img src={connection?.profilePicture || "/assets/person/4.jpeg"} className='connectionImage' alt=" " />
          </div>
          <div className="connectionInfo">
           <div className="connectionName">{connection?.username}</div>
           <div className="connectionPosition">{connection?.tagline || connection?.type}</div>
           <div className="connectionPosition">{connection?.institute?.username || "NIT Andhra Pradesh"}</div>
           </div>
           <div onClick={acceptingConnectionRequest} className="connect">Accept</div>
      </div>
      </>
  );
}

  const ConnectionRequestsBox = () => {
    return (
      <>
      <div className="connectRequestContainer">
        <div className="connectRequestHeading1">Invitations</div>
        <div className="connectionsWrapper">
        {connectRequests ? (
          connectRequests.map((connreq) => {
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

  const RecommendedConnections = () => {
    return(
      <>
      <div className="connections">
                  <div className="connectionsTitle">People you may know</div>
                  <div className="connectionsWrapper" >
                      { recommendedConnections.map((connection) => {
                           return <ConnectionTemplate connection={connection} />
                      }) }
                  </div>
              </div>
      </>
    );
  }

  const InviteConnections = () => {
    console.log("RequestConnections",connectRequests)
    return(
      <>
      <div className="connections">
                  {/* <div className="connectionsTitle"></div> */}
                  {/* <div className="connectionsWrapper" > */}
                      { connectRequests.map((connection) => {
                           return <RequestTemplate connection={connection} />
                      }) }
                  {/* </div> */}
              </div>
      </>
    );
  }

  return (
    <>
      <div className="connectionsContainer">
        <div className="connectionSidebarWrapper">
        <Sidebar  />
        </div>
          
          <div className="connectionsRightbar">
              <InviteConnections />
              <ConnectionRequestsBox />
              <RecommendedConnections />
          </div>
      </div>
    </>
  );
};

export default Connections;
