import SingleProfileComponent from "./SingleProfileComponent";

const MultipleProfilesComponent = ({ users, type }) => {
 

  if (type === "AllGroups") {
    return users.map((user, index) => {
      return (
        <SingleProfileComponent
          chatName={`${user.GroupName}`}
          id={user.GroupID}
          key={index}
          type={type}
          members= {user.Members}
          creator = {users.CreatorID}
        />
      );
    });
  }

  if (type === "AllUsers") {
    return users.map((user, index) => {
      return (
        <SingleProfileComponent
          chatName={`${user.Firstname}`}
          id={user.UserID}
          key={index}
          type={type}
        />
      );
    });
  }
};

export { MultipleProfilesComponent };
