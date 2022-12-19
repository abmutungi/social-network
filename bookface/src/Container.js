import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { showNotifications, logoutUser } from "./ClickFuncs";

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
      <div onClick={showNotifications} >
        <FontAwesomeIcon icon={faBell} className="ClickableHeaderIcons"/>
      </div>
      <div onClick={logoutUser}  >
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
