import "../../../assets/css/notifications-modal.css";
import { useContext, useEffect, useState } from "react";
import { LowerHeaderContext } from "../../../context/lowerheadercontext";

// single notifications component
const SingleNotificationComponent = ({ props }) => {
  const { LoggedInUserID } = useContext(LowerHeaderContext);

  let notifText = props.notifType;

  switch (notifText) {
    case "followRequest":
      notifText = "follow request";
      break;
    case "groupInvite":
      notifText = "group invitation to...";
      break;
    case "groupRequest":
      notifText = "request to join your group: ";
      break;
    case "eventInvite":
      notifText = "invitation to...";
      break;
    default:
  }
  console.log(notifText);

  const handleClick = () => {
    fetch("http://localhost:8080/actionNotif", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        notifID: props.id,
        notifierID: props.notifierID,
        notifiyeeID: LoggedInUserID,
      }),
    });
  };

  return (
    <div id={props.id} className="notification-container">
      <div className="notifs-profile-content">
        <img
          className="notifs-profile cp-profile-pic"
          src="../assets/img/ext/man-utd.png"
          alt="img"
        />
        <div className="notifs-content-date">
          <div className="notifs-content">
            <strong>
              {props.firstName} {props.lastName}
            </strong>
            {` sent you a ${notifText} ${props.groupName}`}
          </div>
          <div className="notifs-date">01/01</div>
        </div>
      </div>
      <div className="notifs-action">
        <button onClick={handleClick} className="confirm-button">
          Confirm
        </button>
        <button>Remove</button>
      </div>
    </div>
  );
};

// notifications modal that holds single notifications
const NotificationsModal = ({ show, onClose }) => {
  const { LoggedInUserID } = useContext(LowerHeaderContext);
  const [MyNotifs, setMyNotifs] = useState([]);

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
      setMyNotifs(data.AllNotifs);
    } catch (e) {
      console.log("error displaying notifications", e);
    }
  }

  useEffect(() => {
    DisplayNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(
  //   "MyNotifsMyNotifsMyNotifsMyNotifsMyNotifsMyNotifsMyNotifs",
  //   MyNotifs
  // );
  if (!show) {
    return null;
  }
  return (
    <div className="notifs-modal" onClick={onClose} role="presentation">
      <div
        className="notifs-modal-content"
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <div className="notifs-modal-header"></div>
        <div className="notifs-modal-title">Notifications</div>
        <div className="notifs-modal-body">
          {MyNotifs?.map((notif) => (
            <SingleNotificationComponent
              key={notif.notifID}
              props={{
                id: notif.notifID,
                firstName: notif.notifFName,
                lastName: notif.notifLName,
                notifType: notif.notifType,
                notifierID: notif.notifierID,
                groupName: notif.notifGroupName,
                profileImgPath: "../assets/img/ext/man-utd.png",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { NotificationsModal };
