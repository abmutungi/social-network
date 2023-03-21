import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
// import { Login } from "../../../pages/login/components/LoginComponent";
// import { Link, Route, Routes } from "react-router-dom";
// import { currentUser } from "../../../pages/login/components/LoginComponent";
import { useNavigate } from "react-router-dom";

// import {  logoutUser } from "./ClickFuncs";
import "../../../index.css";
import { useContext, useState } from "react";
import { NotificationsModal } from "../../../pages/home/components/notificationsModal";
import { loggedInUserContext } from "../../../context/loggedInUserContext";
import { LowerHeaderContext } from "../../../context/lowerheadercontext";
import { SocketContext } from "../../../context/webSocketContext";


function ContainerLogo() {
  return (
    <div className="ContainerLogo">
      <span>facebook</span>
    </div>
  );
}

function ContainerIcons() {
  const { loggedInUser, NewNotifsExist, updateNewNotifsExist, MyNotifs, updateMyNotifs } =
    useContext(loggedInUserContext);
  const { LoggedInUserID } = useContext(LowerHeaderContext);
  const {socket} = useContext(SocketContext)
  const navigate = useNavigate();

  
  
  
  /*On logout click,
  need to send info back to the log out handler
  and navigate to login page*/
  async function sendLogoutData() {
    const response = await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(loggedInUser),
      
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    
    const data = await response.json();
    console.log("Data check -> ", data);
    if (data.success) {
      navigate("/login");
      
      location.reload();
      localStorage.clear();
    }
  }
  
  //display all notifications
  async function DisplayNotifications() {
    try {
      const response = await fetch("http://localhost:8080/displayNotif", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          loggedInUserID: LoggedInUserID,
        }),
      });
      const data = await response.json();
      console.log("Notif data check on click ->", data);
      updateMyNotifs(data.AllNotifs);
    } catch (e) {
      console.log("error displaying notifications", e);
    }
  }
  
  
  const [showNotifModal, setShowNotifModal] = useState(false);
  
  // async function CheckNotifications() {
    //   try {
      //     const response = await fetch("http://localhost:8080/checkNotif", {
        //       method: "POST",
        //       credentials: "include",
        //       body: JSON.stringify({
          //         loggedInUserID: LoggedInUserID,
          //       }),
          //     });
          //     const data = await response.json();
          
          //     if (data.NewNotif) updateNewNotifsExist(true);
          
          //     console.log("Login notif data check ->", data);
          //   } catch (e) {
            //     console.log("error sending notifications that have been read", e);
            //   }
            // }
            
            console.log("socket from top header------------>", socket);
            
            socket.onmessage = (e) => {
              let data = JSON.parse(e.data)
              updateNewNotifsExist(data)
              console.log("socket on message in notif bell --------->", data);
            }
            
            // useEffect(() => {
              //   if (!NewNotifsExist) CheckNotifications();
              
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [NewNotifsExist]);

  return (
    <>
      <div className="ContainerEventIcons">
        <div>
          <FontAwesomeIcon
            onClick={() => {
              setShowNotifModal(true);
              updateNewNotifsExist(false);
              DisplayNotifications();
              
            }}
            icon={faBell}
            className="ClickableHeaderIcons"
          />
          {NewNotifsExist ? <span className="dot"></span> : null}
        </div>
        {/* <Link to="/login" style={{ textDecoration: "none", color: "white" }}> */}
        <div>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            onClick={() => sendLogoutData()}
            className="ClickableHeaderIcons"
          />
        </div>
        {/* </Link> */}
        {/* <Routes>
          <Route path="/login" element={<Login />}></Route>
        </Routes> */}
      </div>
      <NotificationsModal
        onClose={() => setShowNotifModal(false)}
        show={showNotifModal}
        data={MyNotifs}
      />
    </>
  );
}

function TopHeader() {
  return (
    <div className="TopHeader">
      <ContainerLogo />
      <ContainerIcons />
    </div>
  );
}

export default TopHeader;
