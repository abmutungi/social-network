import React from "react";
import SingleProfileComponent from "../../../components/SingleProfileComponent";
import "../../../assets/css/Events.css"

const EventBannerBody =(props)=>{
return (
    <div className="event-banner-body">
        <div className="event-body-date">
            {props.eventdate}
        </div>
        <div className="event-body-eventname">
            {props.eventname}
        </div>
        <div className="event-body-attendance">
            <div className="event-body-going">{props.attending}{" going"}</div><div className="event-body-notgoing">{props.notattending}{" can't go"}</div>
        </div>

    </div>
)

}

const EventBanner =()=>{
    return (
      <div className="event-banner">
        <div className="event-banner-head">
          <SingleProfileComponent
            chatName="tb38r"
            eventText=" created an event"
          />
        </div>
        <EventBannerBody
          eventdate="1 Aug 2023"
          eventname="Festival Season"
          attending="7"
          notattending="3"
        />
      </div>
    );
}



export default EventBanner