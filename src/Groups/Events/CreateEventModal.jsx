import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {faXmark,} from "@fortawesome/free-solid-svg-icons";
import "../Groups.css"



const CreateEventModal = ({show, onClose}) => {
  const [formValues, setFormValues] = useState({
   eventName:"",
   eventDescription:"",
   eventStartDate:"",

   
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

    const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    
  };

    if (!show) {
        return null
    }

    return(
        <>

        <div className="cg-modal-container" onClick={onClose}>
        <div className="cg-modal" onClick={e => e.stopPropagation()}>
            <div className="cg-modal-header">
                <h3>Create Event</h3>     
          <FontAwesomeIcon
          onClick={ onClose}
            icon={faXmark}
            className="cg-modal-close"
            size="lg"
          />
            </div>
                <form className="cg-form" onSubmit={handleSubmit}>
            <div className="cg-modal-body">
                  <div className="modal-titles">Event Name</div>
                    <input name="eventName"
            value={formValues.eventName}
            onChange={handleChange} className="cg-input" type="text" placeholder="what's your event called?" required></input>
                              
                              <br></br>

                              <div className="modal-titles">Event Description</div>
                    <textarea name="eventDescription" style={{resize:"none"}}
            value={formValues.eventDescription}
            onChange={handleChange} className="cg-input" placeholder="what's it about?" required/>
                        
<br></br>
                        <div className="event-form-group">
        <label style={{marginRight:"0.5rem"}} htmlFor="startDate">Date & Time</label>
        <input  name="eventStartDate"style={{marginRight:"2rem"}}type ="datetime-local" 
        min="2023-01-01"
        value={formValues.eventStartDate}
        onChange={handleChange}
        required

          className="event-form-control"
          id="event-form-date-start"
        />
           
      
      {/* <label style={{marginRight:"0.5rem"}} htmlFor="endDate">End Date</label>
        <input name="eventEndDate" type ="date" 
        min="2023-01-01"
        value={formValues.eventEndDate}
        onChange={handleChange}

          className="event-form-control"
          id="event-form-date-end"
        /> */}
</div>




            <div className="cg-modal-footer">
                    <button onSubmit={handleSubmit} className="cg-submit-button" type="submit">Submit</button>
                    </div>
            </div>
                </form>
            </div>
        </div>
        </>
    )
}

export {CreateEventModal}