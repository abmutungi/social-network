import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
// import { Login } from "../../../pages/login/components/LoginComponent";
// import { Link, Route, Routes } from "react-router-dom";
// import { currentUser } from "../../../pages/login/components/LoginComponent";
import { useNavigate } from "react-router-dom";

// import {  logoutUser } from "./ClickFuncs";
import "../../../index.css";
import { useContext, useState, useEffect } from "react";
import { NotificationsModal } from "../../../pages/home/components/notificationsModal";
import { loggedInUserContext } from "../../../context/loggedInUserContext";
import { LowerHeaderContext } from "../../../context/lowerheadercontext";

function ContainerLogo() {
  return (
    <div className="ContainerLogo">
      <span>facebook</span>
    </div>
  );
}

function ContainerIcons() {
  const { loggedInUser, Notifications, updateNotifications } =
    useContext(loggedInUserContext);
  const { LoggedInUserID } = useContext(LowerHeaderContext);
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
    }
  }

  const [showNotifModal, setShowNotifModal] = useState(false);

  async function SendNotificationRead() {
    console.log("LoggedInUserID", LoggedInUserID);
    try {
      const response = await fetch("http://localhost:8080/notifRead", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          loggedInUserID: LoggedInUserID,
          read: Notifications,
        }),
      });
      const data = await response.json();
      console.log(data);
      // if (data) {
      //   updateNotifications(true);
      // } else if (!data) {
      //   updateNotifications(false);
      // }
    } catch (e) {
      console.log("error sending notifications have been read", e);
    }
  }
  useEffect(() => {
    if (!Notifications) SendNotificationRead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Notifications]);

  return (
    <>
      <div className="ContainerEventIcons">
        <div>
          <FontAwesomeIcon
            onClick={() => {
              setShowNotifModal(true);
              updateNotifications(false);
            }}
            icon={faBell}
            className="ClickableHeaderIcons"
          />
          {Notifications ? <span className="dot"></span> : null}
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
