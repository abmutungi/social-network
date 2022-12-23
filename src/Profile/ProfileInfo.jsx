import React from "react";

const ProfileInfo = (props) => {
    return (
        <div className="ProfileInfo">
            <div className="ProfileName">{props.ProfileName}</div>
            <div className="ProfileFollowing">{props.Following}</div>
            <div className="ProfileFollowers">{props.Followers}</div>
        </div>
    );
};

export default ProfileInfo