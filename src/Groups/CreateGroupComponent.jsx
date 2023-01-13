import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
  
  faXmark,
 
} from "@fortawesome/free-solid-svg-icons";

const CreateGroupModal = (props) => {

    if (!props.show) {
        return null
    }

    return(
        <>

        <div className="cg-modal-container">
        <div className="cg-modal">
            <div className="cg-modal-header">
                <h3>Create Group</h3>     
          <FontAwesomeIcon
            icon={faXmark}
            className="cg-modal-close"
            size="lg"
          />
            </div>
            <div className="cg-modal-body">
                <form className="cg-form">
                    <input className="cg-input" type="text" placeholder="enter group name"></input>
                    <input className="cg-input" type="text" placeholder="enter group description"></input>
                         <label htmlFor="avatar">
            Choose an image to be your group avatar (Optional)
          </label>
          <input
            type="file"
            name="group-avatar"
           
          />
                </form>
            </div>
            <div className="cg-modal-footer">
                    <button className="cg-submit-button" type="submit">Submit</button>
                    </div>
            </div>
        </div>
        </>
    )
}

export { CreateGroupModal }