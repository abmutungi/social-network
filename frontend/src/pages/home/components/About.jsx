import React from "react";
import "../../../assets/css/about.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';


function AboutMe({text, email, dob, nickname}) {

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
                    {email}
                    </div>
                     <div>
                    {`Birthday: ${dob}`}
                    </div>
                     <div>
                    {nickname}
                    </div>
            </div>
            </div>
        </div>
    );

}

export {AboutMe}