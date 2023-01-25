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

        <div role="presentation" className="cg-modal-container" onClick={onClose}>
        <div role="presentation"  className="cg-modal" onClick={e => e.stopPropagation()}>
            <div className="cg-modal-header">
             <div></div>
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
            Choose an image 
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