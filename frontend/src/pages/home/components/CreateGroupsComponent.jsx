import React, { StrictMode } from "react";
import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {faChampagneGlasses, faXmark,} from "@fortawesome/free-solid-svg-icons";
import { loggedInUserContext } from "../../../context/loggedInUserContext";
import { LowerHeaderContext } from "../../../context/lowerheadercontext";


const CreateGroupModal = ({show, onClose}) => {
  const { loggedInUser} = useContext(loggedInUserContext);
  const { AllGroupsData, updateAllGroupsData} = useContext(LowerHeaderContext);
  const [imgName, setimgName] = useState('')


  async function CreateGroup(fdata) {
    try{

      const response = await fetch("http://localhost:8080/creategroup", {
        method: "POST",
        credentials: "include",
        body: fdata,
      });

      const data = await response.json();

//responds with an array of group objects including the newly created group 
      updateAllGroupsData(data)
      onClose()

    }catch(e){
      console.log('Error with the creategroup fn', e);
    }

  }
    const handleSubmit = (e) => {

      e.preventDefault();
const form = e.target
const formData = new FormData(form)

formData.append("creatorID" , loggedInUser.ID)
formData.append("imgName", imgName)
CreateGroup(formData);
console.log('AGD', AllGroupsData);
    
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
            //value={formValues.groupName}
           // onChange={handleChange} 
            className="cg-input" type="text" placeholder="enter group name" required></input>
                    <input name="groupDescription"
           // value={formValues.groupDescription}
            //onChange={handleChange} 
            className="cg-input" type="text" placeholder="enter group description" required></input>
                         <label htmlFor="avatar">
            Choose an image 
          </label>
          <input
            type="file"
            name="group-avatar"
            onChange ={(e)=>{
              setimgName(e.target.files[0].name)
            }

            }
  
            
           
          />
            </div>
            <div className="cg-modal-footer">
                    <button  className="cg-submit-button" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export {CreateGroupModal}