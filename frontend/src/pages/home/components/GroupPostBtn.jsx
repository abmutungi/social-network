import React, { useState, useContext, useEffect } from "react";
import CreatePostModal from "./CreatePost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loggedInUserContext } from "../../../context/loggedInUserContext";
import { LowerHeaderContext } from "../../../context/lowerheadercontext";

const GroupPostBtn = () => {
  const [show, setShow] = useState(false);
  const [imgPath, setimgPath] = useState("")
  const {
    GroupID,

  } = useContext(LowerHeaderContext);

  const {
    loggedInUser

  } = useContext(loggedInUserContext);

 const GetImgPath = ()=>{
    loggedInUser.Avatar == "" || loggedInUser.Avatar == undefined? setimgPath("userdefaulttwo.png") : setimgPath(loggedInUser.Avatar);

  }

 

 console.log('IMAGE PATH FROM GP', imgPath,'\n', loggedInUser);


  useEffect(() => {

    if (GroupID > 0) GetImgPath();
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
       // profileImg= {`../assets/img/ext/${props.background}`}

        onClose={() => setShow(false)}
        show={show}
      />
    </>
  );
};



export { GroupPostBtn };
