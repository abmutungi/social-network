import React, { useState } from "react";

const ProfileBtn = (props) => {
    return <button  className={props.className}>{props.btnName}</button>;
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
