import "./tbr.css";
import ProfileBar from "../Profile/ProfileBar";
import AllChats from "../AllChats/AllChats";
import Post from "../Posts/Post";
import NavBar from "../NavBar/NavBar";

function LowerHeader() {
  return (
    <div className="LowerHeader">
      <ProfileBar />
    </div>
  );
}

const LeftBodyDivs = ({ className = "" }) => {
  return (
    <div className={`${className}`}>
      <div className="AllUsers">
        <AllUsersHeader />
        <AllUsersBody name="tb38r" />
        <AllUsersBody name="eternal17" />
        <AllUsersBody name="abmutungi" />
        <AllUsersBody name="nsymcoding" />
      </div>
      <div className="Groups">
        <GroupsHeader />
        <GroupNameAndPic group="Black & White Army" />
        <GroupNameAndPic group="2011 Rashford Fan Club" />
        <GroupNameAndPic group="Sanchnoooo Support Club:(" />
        <GroupNameAndPic group="AirBnB crew" />
      </div>
    </div>
  );
};

function MainBody() {
  return (
    <div className="MainBody">
      <LeftBodyDivs className="bd-side" />
      <div className="nav-and-post">
        <NavBar />
        <Post />
      </div>
      <AllChats />
    </div>
  );
}

///////USERS////////////////////////////////////////////

function AllUsersHeader() {
  return (
    <div className="AllUsersHead">
      <div className="LeftSideTitle">Users</div>
      <input
        type="search"
        className="LeftSearch"
        placeholder="&#128270; Search users"
      ></input>
    </div>
  );
}

const AllUsersBody = (props) => {
  return <NameAndPic name={props.name} />;
};

const NameAndPic = (props) => {
  return (
    <div className="NamePic">
      <div className="AllUsersPic"></div>
      <div className="AllUsersName">{props.name}</div>
    </div>
  );
};

///////GROUPS////////////////////////////////////////////

function GroupsHeader() {
  return (
    <div className="GroupsHead">
      <div className="LeftSideTitle">Groups</div>
      <input
        type="search"
        className="LeftSearch"
        placeholder="&#128270; Search groups"
      ></input>
    </div>
  );
}

const GroupNameAndPic = (props) => {
  return (
    <div className="NamePic">
      <div className="GroupName">{props.group}</div>
    </div>
  );
};

export { LowerHeader, MainBody, LeftBodyDivs };
