import React, { useState } from "react";
import CreatePostModal from "./CreatePost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ProfilePostBtn = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)} className={"add-post-btn"}>
        <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
        <span className="icon-text">Post</span>
      </button>
      <CreatePostModal
        name="Bruno"
        profileImg="../assets/img/ext/man-utd.png"
        onClose={() => setShow(false)}
        show={show}
      />
    </>
  );
};

const PrivateBtn = (props) => {
  const [isFunction, setIsFunction] = useState(true);

  return (
    <button
      className={props.className}
      onClick={() => setIsFunction(!isFunction)}
    >
      {isFunction ? props.OptionA : props.OptionB}
    </button>
  );
};

export { ProfilePostBtn, PrivateBtn };
