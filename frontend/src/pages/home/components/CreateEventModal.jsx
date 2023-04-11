import React from "react";
import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { LowerHeaderContext } from "../../../context/lowerheadercontext";
import "../../../assets/css/Groups.css";
import { SocketContext } from "../../../context/webSocketContext";

const CreateEventModal = ({ show, onClose }) => {
  const { LoggedInUserID, GroupID } = useContext(LowerHeaderContext);
  const { socket} = useContext(SocketContext)
  const [formValues, setFormValues] = useState({
    eventName: "",
    eventDescription: "",
    eventStartDate: "",
    creator: LoggedInUserID,
    GroupID: GroupID,
    type: "eventInviteNotifs",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    formData.append("creator", LoggedInUserID);
    formData.append("groupID", GroupID);
    setFormValues("")
    //console.log("***** event invites******", JSON.stringify(formValues));

    socket.send(JSON.stringify(formValues))
    // CreateGroupEvent(formData);
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <>
      <div role="presentation" className="cg-modal-container" onClick={onClose}>
        <div
          role="presentation"
          className="cg-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="cg-modal-header">
            <div></div>
            <h3>Create Event</h3>
            <div className="closeicon">
            <FontAwesomeIcon
              onClick={onClose}
              icon={faXmark}
              className="cg-modal-close"
              size="xs"
            />
            </div>
          </div>
          <form
            id="createGroupEvent"
            className="cg-form"
            onSubmit={handleSubmit}
          >
            <div className="cg-modal-body">
              <div className="cg-modal-titles">Event Name</div>
              <input
                name="eventName"
                value={formValues.eventName}
                onChange={handleChange}
                className="cg-input"
                type="text"
                placeholder="what's your event called?"
                required
              ></input>

              <br></br>

              <div className="cg-modal-titles">Event Description</div>
              <textarea
                name="eventDescription"
                style={{ resize: "none" }}
                value={formValues.eventDescription}
                onChange={handleChange}
                className="cg-textarea"
                placeholder="what's it about?"
                required
              />

              <br></br>
              <div className="event-form-group">
                <label style={{ marginRight: "0.5rem" }} htmlFor="startDate">
                  Date & Time
                </label>
                <input
                  name="eventStartDate"
                  type="date"
                  min="2023-01-01"
                  value={formValues.eventStartDate}
                  onChange={handleChange}
                  required
                  className="event-form-control"
                  id="event-form-date-start"
                />
              </div>
            </div>
            <div className="cg-modal-footer">
              <button
                onSubmit={handleSubmit}
                className="cg-submit-button"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export { CreateEventModal };
