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
          add some content here
          {/* this is where each notification component will go */}
        </div>
      </div>
    </div>
  );
};

// single notifications component

export { NotificationsModal };
