import React, { useState } from "react";

const ProfileBtn = (props) => {
    return <button className="btn">{props.btnName}</button>;
};

const PrivateBtn = (props) => {
    const [isFunction, setIsFunction] = useState(true);

    return (
        <button className="btn" onClick={() => setIsFunction(!isFunction)}>
            {isFunction ? props.OptionA : props.OptionB}
        </button>
    );
};

export { ProfileBtn, PrivateBtn };
