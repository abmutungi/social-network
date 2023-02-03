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

function ContainerLogo() {
  return (
    <div className="ContainerLogo">
      <span>facebook</span>
    </div>
  );
}

function ContainerIcons() {
  const { loggedInUser } = useContext(loggedInUserContext);
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

  const [showNotifModal, setShowNotifModal] = useState(false);
  return (
    <>
      <div className="ContainerEventIcons">
        <FontAwesomeIcon
          onClick={() => setShowNotifModal(true)}
          icon={faBell}
          className="ClickableHeaderIcons"
        />

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
