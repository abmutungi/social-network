import React, { useState, useContext, useEffect } from "react";
import CreatePostModal from "./CreatePost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LowerHeaderContext } from "../../../context/lowerheadercontext";

const GroupPostBtn = () => {
  const [show, setShow] = useState(false);
  const [imgPath, setimgPath] = useState("")
  const {
    AllGroupsData,
    GroupID,

  } = useContext(LowerHeaderContext);

  const GetImgPath = (gid)=>{

    for (const obj of AllGroupsData) {
      if (obj.GroupID == gid) {
      
      obj.Avatar != ""
          ? setimgPath(obj.Avatar) 
          : setimgPath("creategroupposticonone.png");
        
      }
     
    }
  }

  console.log('IMAGE PATH FROM GP', imgPath);


  useEffect(() => {

    if (GroupID > 0) GetImgPath(GroupID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GroupID]);


  return (
    <>
      <button onClick={() => setShow(true)} className={"add-post-btn"}>
        <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
        <span className="icon-text">Post</span>
      </button>
      <CreatePostModal
name={JSON.parse(localStorage.getItem("loggedInUser")).FName}
        profileImg={`../assets/img/ext/${imgPath}`}
        onClose={() => setShow(false)}
        show={show}
      />
    </>
  );
};



export { GroupPostBtn };
