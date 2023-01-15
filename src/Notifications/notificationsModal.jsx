import "./notifications-modal.css";

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
          <SingleNotificationComponent />
          <SingleNotificationComponent />
          <SingleNotificationComponent />
          <SingleNotificationComponent />
          <SingleNotificationComponent />
          <SingleNotificationComponent />
          <SingleNotificationComponent />
          <SingleNotificationComponent />
          <SingleNotificationComponent />
          <SingleNotificationComponent />
        </div>
      </div>
    </div>
  );
};

// single notifications component
const SingleNotificationComponent = () => {
  return (
    <div className="notification-container">
      <div className="notifs-profile-content">
        <img
          className="notifs-profile cp-profile-pic"
          src="./Posts/man-utd.png"
          alt="img"
        />
        <div className="notifs-content-date">
          <div className="notifs-content">
            Cristiano Ronaldo sent you a friend request
          </div>
          <div className="notifs-date">a week ago</div>
        </div>
      </div>
      <div className="notifs-action">
        <button className="confirm-button">Confirm</button>
        <button>Remove</button>
      </div>
    </div>
  );
};
export { NotificationsModal };
