import { useState } from "react";

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

export { PrivateBtn };
