import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Login } from "../Login/LoginComponent";
import { Link, Route, Routes } from "react-router-dom";

// import {  logoutUser } from "./ClickFuncs";
import "../index.css";

function ContainerLogo() {
  return (
    <div className="ContainerLogo">
      <span>facebook</span>
    </div>
  );
}

function ContainerIcons() {
  return (
    <div className="ContainerEventIcons">
      <div>
        <FontAwesomeIcon icon={faBell} className="ClickableHeaderIcons" />
      </div>

      <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
        <div>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className="ClickableHeaderIcons"
          />
        </div>
      </Link>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
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
