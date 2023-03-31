import {React, useContext} from "react";
import "../../../assets/css/about.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import { LowerHeaderContext } from "../../../context/lowerheadercontext";


function AboutMe({ text, email, dob, nickname }) {
    
    const { PrivacyStatus, Following } = useContext(LowerHeaderContext);

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
                    {!PrivacyStatus || Following ? email: ""}
                    </div>
                     <div>
                    {!PrivacyStatus || Following ? `Birthday: ${dob}`: ""}
                    </div>
                     <div>
                    {!PrivacyStatus || Following ? nickname: ""}
                    </div>
            </div>
            </div>
        </div>
    );

}

export {AboutMe}