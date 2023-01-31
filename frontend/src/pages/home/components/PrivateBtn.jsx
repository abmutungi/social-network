import { useContext } from "react";
import { LowerHeaderContext } from "../../../context/lowerheadercontext";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLock, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faLock, faUsers);

const PrivateText = (
  <>
    <FontAwesomeIcon icon="fa-solid fa-lock" />
    <span className="icon-text">Private</span>
  </>
);

const PublicText = (
  <>
    <FontAwesomeIcon icon="fa-solid fa-users" />
    <span className="icon-text">Public</span>
  </>
);

const PrivateBtn = () => {
  const {
    PrivacyStatus,
    PrivacyBtnText,
    updatePrivacyBtnText,
    updatePrivacyStatus,
    LoggedInUserID,
  } = useContext(LowerHeaderContext);

  const handleClick = () => {
    if (PrivacyStatus) {
      updatePrivacyBtnText(PublicText);
      updatePrivacyStatus(false);
      fetch("http://localhost:8080/updatePrivacy", {
        method: "POST",
        body: JSON.stringify({
          loggedInUserID: LoggedInUserID,
          privacyStatus: false,
        }),
      });
    } else {
      updatePrivacyBtnText(PrivateText);
      updatePrivacyStatus(true);
      fetch("http://localhost:8080/updatePrivacy", {
        method: "POST",
        body: JSON.stringify({
          loggedInUserID: LoggedInUserID,
          privacyStatus: true,
        }),
      });
    }
  };

  return (
    <button className="privacy-btn" onClick={handleClick}>
      {PrivacyBtnText}
    </button>
  );
};

export { PrivateText, PublicText, PrivateBtn };
