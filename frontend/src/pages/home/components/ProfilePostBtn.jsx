import React, { useState } from "react";
import CreatePostModal from "./CreatePost"

const ProfilePostBtn = (props) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)} className={props.className}>
        {props.btnName}
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
    <button className={props.className} onClick={() => setIsFunction(!isFunction)}>
      {isFunction ? props.OptionA : props.OptionB}
    </button>
  );
};

export { ProfilePostBtn, PrivateBtn };
