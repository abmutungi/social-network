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



function Container() {
  return (
    <div className="Container">
      <ContainerLogo />
      <ContainerIcons />
    </div>
  );
}

export default Container;
