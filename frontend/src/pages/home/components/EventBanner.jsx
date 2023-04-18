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
            <div className="event-body-going">{props.attending}{" going"}</div><div className="event-body-notgoing">{props.notattending}{" not going"}</div>
        </div>

    </div>
)

}

const EventBanner =(props)=>{
    return (
      <div className="event-banner">
        <div className="event-banner-head">
          <SingleProfileComponent
            chatName={props.creatorname}
            eventText=" created an event"
          />
        </div>
        <EventBannerBody
          eventdate={props.date}
          eventname={props.eventname}
          attending={props.attending}
          notattending={props.notattending}
        />
      </div>
    );
}



export default EventBanner