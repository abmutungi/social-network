import SingleProfileComponent from "./SingleProfileComponent";

const MultipleProfilesComponent = ({ users }) => {
  return users.map((user, index) => {
    return (
      <SingleProfileComponent
        chatName={`${user}`}
        key={index}
      />
    );
  });
};

export { MultipleProfilesComponent}