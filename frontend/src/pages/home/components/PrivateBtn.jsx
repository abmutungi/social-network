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

  let lu = JSON.parse(localStorage.getItem("loggedInUser"));
  const handleClick = () => {
    console.log("LU Check --> ", lu);

    if (PrivacyStatus) {
      lu.Privacy = 0;
      localStorage.setItem("loggedInUser", JSON.stringify(lu));
      updatePrivacyBtnText(PublicText);
      updatePrivacyStatus(false);
      fetch("http://localhost:8080/updatePrivacy", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          loggedInUserID: LoggedInUserID,
          privacyStatus: false,
        }),
      });
    } else if (!PrivacyStatus) {
      lu.Privacy = 1;
      localStorage.setItem("loggedInUser", JSON.stringify(lu));

      updatePrivacyBtnText(PrivateText);
      updatePrivacyStatus(true);
      fetch("http://localhost:8080/updatePrivacy", {
        method: "POST",
        credentials: "include",
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
