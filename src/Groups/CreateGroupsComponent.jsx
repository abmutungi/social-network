import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {faXmark,} from "@fortawesome/free-solid-svg-icons";



const CreateGroupModal = ({show, onClose}) => {
  const [formValues, setFormValues] = useState({
   groupName:"",
   groupDescription:"",
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
                <h3>Create Group</h3>     
          <FontAwesomeIcon
          onClick={ onClose}
            icon={faXmark}
            className="cg-modal-close"
            size="lg"
          />
            </div>
                <form className="cg-form" onSubmit={handleSubmit}>
            <div className="cg-modal-body">
                    <input name="groupName"
            value={formValues.groupName}
            onChange={handleChange} className="cg-input" type="text" placeholder="enter group name" required></input>
                    <input name="groupDescription"
            value={formValues.groupDescription}
            onChange={handleChange} className="cg-input" type="text" placeholder="enter group description" required></input>
                         <label htmlFor="avatar">
            Choose an image to be your group avatar (Optional)
          </label>
          <input
            type="file"
            name="group-avatar"
           
          />
            </div>
            <div className="cg-modal-footer">
                    <button onSubmit={handleSubmit} className="cg-submit-button" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export {CreateGroupModal}