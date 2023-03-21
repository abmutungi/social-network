import "../../../assets/css/notifications-modal.css";
import { useContext } from "react";
import { LowerHeaderContext } from "../../../context/lowerheadercontext";
import { SocketContext } from "../../../context/webSocketContext";
import { loggedInUserContext } from "../../../context/loggedInUserContext";

// single notifications component
const SingleNotificationComponent = ({ props }) => {
  const { LoggedInUserID, GroupID } = useContext(LowerHeaderContext);
  const { socket } = useContext(SocketContext)

  

  console.log("socket from single notification component ------------>", socket);
  // socket.onmessage = (e) => {
  //   let data = JSON.parse(e.data)
  //   updateMyNotifs(data)
  //   console.log("socket on message--------->", data);
  // }
  
  // console.log("MyNotifs--------->", MyNotifs);
  
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
  socket.send(JSON.stringify({
    loggedInUserID: LoggedInUserID,
    type: "notifs",
   }))
  


    fetch("http://localhost:8080/actionNotif", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        notifID: props.id,
        notifierID: props.notifierID,
        notifiyeeID: LoggedInUserID,
        notifGroupID: GroupID,
        notifAccept: 1,
      }),
    })
    const notificationContainer = document.getElementById(props.id);
    notificationContainer.parentNode.removeChild(notificationContainer);
  };

  const handleRemove = () => {
    fetch("http://localhost:8080/actionNotif", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        notifID: props.id,
        notifierID: props.notifierID,
        notifiyeeID: LoggedInUserID,
        notifGroupID: GroupID,
        notifAccept: 0,
      }),
    })
    const notificationContainer = document.getElementById(props.id);
    notificationContainer.parentNode.removeChild(notificationContainer);
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
          <div className="notifs-date">{props.notifDate}</div>
        </div>
      </div>
      <div className="notifs-action">
        <button onClick={handleClick} className="confirm-button">
          Confirm
        </button>
        <button onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};



// notifications modal that holds single notifications
const NotificationsModal = ({ show, onClose, data }) => {
  
  const {MyNotifs, updateMyNotifs } = useContext(loggedInUserContext);
  const { socket } = useContext(SocketContext)


  // async function DisplayNotifications() {
  //   try {
  //     const response = await fetch("http://localhost:8080/displayNotif", {
  //       method: "POST",
  //       credentials: "include",
  //       body: JSON.stringify({
  //         loggedInUserID: LoggedInUserID,
  //       }),
  //     });
  //     const data = await response.json();
  //     console.log("Notif data check on click ->", data);
  //     setMyNotifs(data.AllNotifs);
  //   } catch (e) {
  //     console.log("error displaying notifications", e);
  //   }
  // }

  // useEffect(() => {
  //   DisplayNotifications();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // console.log(
  //   "MyNotifsMyNotifsMyNotifsMyNotifsMyNotifsMyNotifsMyNotifs",
  //   MyNotifs
  // );
  if (!show) {
    return null;
  } else {

  console.log("socket from notification modal ------------>", socket);

   socket.onmessage = (e) => {
    let dt = JSON.parse(e.data)
    updateMyNotifs(dt)
    console.log("socket on message--------->", data);
  }
  
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
          {data?.map((notif) => (
            <SingleNotificationComponent
              key={notif.notifID}
              props={{
                id: notif.notifID,
                firstName: notif.notifFName,
                lastName: notif.notifLName,
                notifType: notif.notifType,
                notifierID: notif.notifierID,
                groupName: notif.notifGroupName,
                notifDate: notif.notifDate,
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
