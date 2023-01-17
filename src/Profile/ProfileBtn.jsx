import React, { useState } from "react";
import CreatePostModal from "../Posts/CreatePost";

const ProfileBtn = (props) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)} className={props.className}>
        {props.btnName}
      </button>
      <CreatePostModal
        name="Bruno"
        profileImg="./Posts/man-utd.png"
        onClose={() => setShow(false)}
        show={show}
      />
    </>
  );
};

const PrivateBtn = (props) => {
  const [isFunction, setIsFunction] = useState(true);

  return (
    <button className="privacy-btn" onClick={() => setIsFunction(!isFunction)}>
      {isFunction ? props.OptionA : props.OptionB}
    </button>
  );
};

export { ProfileBtn, PrivateBtn };
