import SingleProfileComponent from "./SingleProfileComponent";

const MultipleProfilesComponent = ({ users, type }) => {
  if (type === "AllGroups") {
    return users?.map((user, index) => {
      let userPicPath =
      user.Avatar === ""
        ? "../assets/img/ext/babyblue-placeholder.jpeg"
        : `../assets/img/ext/${user.Avatar}`;      
        
        return (
        <SingleProfileComponent
          chatName={`${user.GroupName}`}
          id={user.GroupID}
          key={index}
          type={type}
          members={user.Members}
          creator={user.CreatorID}
          avatar= {userPicPath}
        />
      );
    });
  }

  if (type === "AllUsers") {
    return users?.map((user, index) => {
      let userPicPath =
        user.Avatar === ""
          ? "../assets/img/ext/babyblue-placeholder.jpeg"
          : `../assets/img/ext/${user.Avatar}`;

      return (
        <SingleProfileComponent
          chatName={`${user.Firstname}`}
          id={user.UserID}
          key={index}
          type={type}
          avatar={userPicPath}
        />
      );
    });
  }

  if (type === "Chats") {
    return users?.map((user, index) => {
      let userPicPath =
        user.avatar === ""
          ? "../assets/img/ext/babyblue-placeholder.jpeg"
          : `../assets/img/ext/${user.avatar}`;
      return (
        <SingleProfileComponent
          chatName={`${user.FName}`}
          id={user.userID}
          key={index}
          type={type}
          avatar={userPicPath}
          onClick={() => {
            console.log("chatbox clicked");
          }}
        />
      );
    });
  }
};

export { MultipleProfilesComponent };
