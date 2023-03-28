import React, { useState } from "react";
import CreatePostModal from "./CreatePost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const GroupPostBtn = () => {
  const storedAvatar = JSON.parse(localStorage.getItem("loggedInUser")).Avatar;
  let profilePic =
    storedAvatar != ""
      ? `../assets/img/ext/${storedAvatar}`
      : "../assets/img/ext/man-utd.png";
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)} className={"add-post-btn"}>
        <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
        <span className="icon-text">Post</span>
      </button>
      <CreatePostModal
        name={JSON.parse(localStorage.getItem("loggedInUser")).FName}
        profileImg={profilePic}
        onClose={() => setShow(false)}
        show={show}
      />
    </>
  );
};



export { GroupPostBtn };
