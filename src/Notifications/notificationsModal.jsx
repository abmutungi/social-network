import "./notifications-modal.css";

// single notifications component
const SingleNotificationComponent = ({ props }) => {
  return (
    <div className="notification-container">
      <div className="notifs-profile-content">
        <img
          className="notifs-profile cp-profile-pic"
          src={props.profileImgPath}
          alt="img"
        />
        <div className="notifs-content-date">
          <div className="notifs-content">
            <strong>{props.name}</strong> sent you a {props.notificationType}
          </div>
          <div className="notifs-date">01/01</div>
        </div>
      </div>
      <div className="notifs-action">
        <button className="confirm-button">Confirm</button>
        <button>Remove</button>
      </div>
    </div>
  );
};

// notifications modal that holds single notifications
const NotificationsModal = ({ show, onClose }) => {
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
          <SingleNotificationComponent
            props={{
              profileImgPath: "./Posts/man-utd.png",
              name: "Cristiano Ronaldo",
              notificationType: "follow request",
            }}
          />
          <SingleNotificationComponent
            props={{
              profileImgPath: "./Posts/man-utd.png",
              name: "Cristiano Ronaldo",
              notificationType: "follow request",
            }}
          />
          <SingleNotificationComponent
            props={{
              profileImgPath: "./Posts/man-utd.png",
              name: "Cristiano Ronaldo",
              notificationType: "follow request",
            }}
          />
          <SingleNotificationComponent
            props={{
              profileImgPath: "./Posts/man-utd.png",
              name: "Cristiano Ronaldo",
              notificationType: "follow request",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export { NotificationsModal };
