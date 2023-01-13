import React from 'react';
import "./Events.css"

export const EventForm = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="event-form-group">
        <label htmlFor="title">Title</label>
        <input className="form-control" id="event-form-title" />
      </div>

      <div className="event-form-group">
        <label htmlFor="description">Description</label>
        <input type="textarea"
          
          className="event-form-control"
          id="event-form-desc"
        />
      </div>
      <div className="event-form-group">
        <label htmlFor="description">Start Date</label>
        <input type ="date" 
        min="2023-01-01"
          className="event-form-control"
          id="event-form-date-start"
        />
           
      </div>
      <div className="event-form-group">

      <label htmlFor="description">End Date</label>
        <input type ="date" 
        min="2023-01-01"
          className="event-form-control"
          id="event-form-date-end"
        />
</div>
      <div className="event-form-group">
        <button className="form-control btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
export default EventForm;
