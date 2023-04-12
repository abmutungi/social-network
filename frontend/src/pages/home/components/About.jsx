import {React, useContext} from "react";
import "../../../assets/css/about.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import { LowerHeaderContext } from "../../../context/lowerheadercontext";


function AboutMe({ text, email, dob, nickname }) {
    
    const { PrivacyStatus, Following } = useContext(LowerHeaderContext);
    const { groupNotUser, DynamicID } = useContext(LowerHeaderContext)
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")).ID;

    return(
        <div className="about-container">
            <div className="about-content">
            <div className="about-title">About
            </div>
            <FontAwesomeIcon icon={faAddressCard} /> 
                <div className="about-description">
                    <div>
                    {text}
                    </div>
                     <div>
                    {(DynamicID == loggedInUser && !groupNotUser) || !PrivacyStatus && !groupNotUser|| Following && !groupNotUser ? email: ""}
                    </div>
                     <div>
                    {(DynamicID == loggedInUser && !groupNotUser) || !PrivacyStatus && !groupNotUser|| Following  && !groupNotUser ? `Birthday: ${dob}`: ""}
                    </div>
                     <div>
                    {(DynamicID == loggedInUser && !groupNotUser) || !PrivacyStatus && !groupNotUser || Following && !groupNotUser ? nickname: ""}
                    </div>
            </div>
            </div>
        </div>
    );

}

export {AboutMe}