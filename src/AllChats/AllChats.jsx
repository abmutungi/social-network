import React from "react";
import ChatProfile from "./ChatProfile";
import "./AllChats.css";

const AllChats = () => {
    return (
        <div className="AllChats">
            <div className="UserChats">
                <div className="ChatTitle">Chats</div>
                <ChatProfile chatName={"Arnold Mutungi"} />
                <ChatProfile chatName={"Sarmad Khatri"} />
                <ChatProfile chatName={"Tolu Lawal"} />
                <ChatProfile chatName={"Yonas Million"} />
            </div>
            <div className="ChatTitle">Group Chats</div>
            <ChatProfile chatName={"test1"} />
            <ChatProfile chatName={"test2"} />
            <ChatProfile chatName={"test3"} />
            <ChatProfile chatName={"test4"} />
        </div>
    );
};

export default AllChats;
