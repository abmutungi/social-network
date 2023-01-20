import SingleProfileComponent from "./SingleProfileComponent";

const MultipleProfilesComponent = ({ users, type }) => {
 // console.log('checking props in MPC', users, type);
  
  return users.map((user, index) => {
    return (
      <SingleProfileComponent
        chatName={`${user.Firstname}`}
        id={user.UserID}
        key={index}
        type ={type}
      />
    );
  });
};

export { MultipleProfilesComponent}