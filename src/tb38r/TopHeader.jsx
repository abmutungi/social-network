import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
// import {  logoutUser } from "./ClickFuncs";
import "./tbr.css"


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
      <div  >
        <FontAwesomeIcon icon={faBell} className="ClickableHeaderIcons"/>
      </div>
      <div  >
        <FontAwesomeIcon icon={faRightFromBracket} className="ClickableHeaderIcons"/>
      </div>
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
