import React from "react";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { LowerHeaderContext } from "../../../context/lowerheadercontext";
import "../../../assets/css/Groups.css";
import { Checkbox } from "./Checkbox";


const GroupInviteModal = ({ show, onClose }) => {

  const { LoggedInUserID, GroupID, DBAllUsers } = useContext(LowerHeaderContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    
   console.log(GetCheckBoxValues(LoggedInUserID));
   let invited = GetCheckBoxValues(LoggedInUserID);

   const fdata = new FormData()
   fdata.append("data", JSON.stringify(invited))
   GroupInvitesToBackend(fdata)
   
  };

  async function GroupInvitesToBackend(values) {


    await fetch("http://localhost:8080/groupinvite", {
      method: "POST",
      body: values,
    });

  }





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
            <h3>Please Select</h3>
            <FontAwesomeIcon
              onClick={onClose}
              icon={faXmark}
              className="cg-modal-close"
              size="lg"
            />
          </div>
           <form
            id="groupInviteForm"
            className="gi-form"
            onSubmit={handleSubmit}
          >
            <div role="presentation" className="cg-modal-container" onClick={onClose}>
        <div
          role="presentation"
          className="cg-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="cg-modal-header">
            <div></div>
            <h3>Invite Users</h3>
            <FontAwesomeIcon
              onClick={onClose}
              icon={faXmark}
              className="cg-modal-close"
              size="lg"
            />
          </div>


<div className="invite-to-group">

  {DBAllUsers.map((user)=>(
    user.Groups == null   ?   
    <Checkbox
    key = {user.UserID}
    groupid={GroupID}
    userid = {user.UserID}
    label = {'    ' + user.Firstname + '  '+ user.Lastname}
    />
    
    :null

    
  )
  )}

{DBAllUsers.map((user)=>(
     user.Groups !== null  && !user.Groups.includes(GroupID) && user.UserID != LoggedInUserID  ?   
    <Checkbox
    key = {user.UserID}
    groupid={GroupID}
    userid = {user.UserID}
    label = {'    ' + user.Firstname + '  '+ user.Lastname}
    />
    
    :null

   

    
  )
  )}

</div>


          
          <div className="cg-modal-footer">
              <button
                onSubmit={handleSubmit}

                className="cg-submit-button"
                type="submit"
              >
                Invite
              </button>
            </div>
        </div>
      </div>
          
          </form> 
        </div>
      </div>
    </>
  );
};

const GetCheckBoxValues = (LIU)=>{
  var checkboxes = document.querySelectorAll('.invitecheck')


const selectedValues = [];

checkboxes.forEach((checkbox) => {
  if (checkbox.checked) {
    let checkarr = {}
    checkarr.invitedId = checkbox.id;
    checkarr.groupId = checkbox.name
    checkarr.inviter = LIU
    selectedValues.push(checkarr);
  }
});

return selectedValues

}


export { GroupInviteModal };