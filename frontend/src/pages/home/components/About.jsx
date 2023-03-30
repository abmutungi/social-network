import {React, useContext} from "react";
import "../../../assets/css/about.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import { LowerHeaderContext } from "../../../context/lowerheadercontext";


function AboutMe({ text, email, dob, nickname }) {
    
    const { Following } = useContext(LowerHeaderContext);

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
                    {Following ? email: ""}
                    </div>
                     <div>
                    {Following ? `Birthday: ${dob}`: ""}
                    </div>
                     <div>
                    {Following ? nickname: ""}
                    </div>
            </div>
            </div>
        </div>
    );

}

export {AboutMe}