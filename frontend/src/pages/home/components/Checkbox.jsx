const Checkbox = ({ groupid, userid, label }) => {
    return (
      <label>
        <input className = 'invitecheck' id= {userid} name = {groupid} type="checkbox"  />
         {label}
         <br></br>
      </label>
    );
  };


  export {Checkbox};