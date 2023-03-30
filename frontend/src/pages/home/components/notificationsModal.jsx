import "../../../assets/css/notifications-modal.css";
import { useContext } from "react";
import { LowerHeaderContext } from "../../../context/lowerheadercontext";
import { SocketContext } from "../../../context/webSocketContext";

// single notifications component
const SingleNotificationComponent = ({ props }) => {
  const { LoggedInUserID } = useContext(LowerHeaderContext);
  const { socket } = useContext(SocketContext);

  console.log(
    "socket from single notification component ------------>",
    socket
  );

  let notifText = props.notifType;

  switch (notifText) {
    case "followRequest":
      notifText = "follow request";
      break;
    case "groupInvite":
      notifText = "group invitation to: ";
      break;
    case "groupRequest":
      notifText = "request to join your group: ";
      break;
    case "eventInvite":
      notifText = "invitation to an event with: ";
      break;
    default:
  }
  console.log(notifText);

  const handleClick = (e) => {
    socket.send(
      JSON.stringify({
        loggedInUserID: LoggedInUserID,
        type: "notifs",
      })
    );

    fetch("http://localhost:8080/actionNotif", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        notifID: props.id,
        notifierID: props.notifierID,
        notifiyeeID: LoggedInUserID,
        notifGroupID: Number(e.target.id),
        notifEventID: Number(e.target.name),
        notifAccept: 1,
      }),
    });
    const notificationContainer = document.getElementById(props.id);
    notificationContainer.parentNode.removeChild(notificationContainer);
  };

  const handleRemove = (e) => {
    fetch("http://localhost:8080/actionNotif", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        notifID: props.id,
        notifierID: props.notifierID,
        notifiyeeID: LoggedInUserID,
        notifGroupID: Number(e.target.id),
        notifEventID: Number(e.target.name),
        notifAccept: 0,
      }),
    });
    const notificationContainer = document.getElementById(props.id);
    notificationContainer.parentNode.removeChild(notificationContainer);
  };

  const handleProfilePicImgPath = (strImgPath) => {
    return strImgPath === ""
      ? `../assets/img/ext/babyblue-placeholder.jpeg`
      : `../assets/img/ext/${strImgPath}`;
  };

  return (
    <div id={props.id} className="notification-container">
      <div className="notifs-profile-content">
        <img
          className="notifs-profile cp-profile-pic"
          src={handleProfilePicImgPath(props.profileImg)}
          alt="img"
        />
        <div className="notifs-content-date">
          <div className="notifs-content">
            <strong>
              {props.firstName} {props.lastName}
            </strong>
            {` sent you a ${notifText} ${props.groupName}`}
          </div>
          <div className="notifs-date">{props.notifDate}</div>
        </div>
      </div>
      <div className="notifs-action">
        <button
          id={props.groupID}
          name={props.eventID}
          onClick={handleClick}
          className="confirm-button"
        >
          Confirm
        </button>
        <button id={props.groupID} name={props.eventID} onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};

// notifications modal that holds single notifications
const NotificationsModal = ({ show, onClose, data }) => {
  const { socket, MyNotifs, updateNewNotifsExist } = useContext(SocketContext);

  if (!show) {
    return null;
  } else {
    console.log("socket from notification modal ------------>", socket);
    updateNewNotifsExist(false);
    console.log("MyNotifs--------->", MyNotifs);
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
          {data.sort((a, b) => b.notifID - a.notifID).map((notif) => (
            <SingleNotificationComponent
            key={notif.notifID}
            props={{
              id: notif.notifID,
              firstName: notif.notifFName,
              lastName: notif.notifLName,
              notifType: notif.notifType,
              notifierID: notif.notifierID,
              groupName: notif.notifGroupName,
              groupID: notif.notifGroupID,
              notifDate: notif.notifDate,
              eventID: notif.notifEventID,
              profileImg: notif.notifAvatar,
            }}
            />
            ))}
        </div>
      </div>
    </div>
  );
};

export { NotificationsModal };
