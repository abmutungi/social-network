import { React } from "react";

const ProfilePhoto = (props) => {
    
  return (
    <div
      className="ProfilePic"
      style={{
        backgroundImage: `url(../assets/img/ext/${props.background})`,
      }}
    ></div>
  );
};

export { ProfilePhoto };
