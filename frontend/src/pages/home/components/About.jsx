import React from "react";
import "../../../assets/css/about.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';


function AboutMe({text}) {

    return(
        <div className="about-container">
            <div className="about-content">
            <div className="about-title">About
            </div>
            <FontAwesomeIcon icon={faAddressCard} /> 
            <div className="about-description">
            {text}
            </div>
            </div>
        </div>
    );

}

export {AboutMe}