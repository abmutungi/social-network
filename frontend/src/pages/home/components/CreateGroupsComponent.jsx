import React from "react";
import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {faXmark,} from "@fortawesome/free-solid-svg-icons";
import { loggedInUserContext } from "../../../context/loggedInUserContext";


const CreateGroupModal = ({show, onClose}) => {
  const { loggedInUser } = useContext(loggedInUserContext);

  
  const [formValues, setFormValues] = useState({
   groupName:"",
   groupDescription:"",
   creatorID: loggedInUser.ID
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
      

      async function CreateGroup() {
        const response = await fetch("http://localhost:8080/creategroup", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(formValues),
  
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
  
        const data = await response.json();
        //should send back group object 
        console.log("Response froom CreateGroup -> ", data);
  
      }
  
      CreateGroup();
    console.log('Create group FormValues',
    formValues);
    
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