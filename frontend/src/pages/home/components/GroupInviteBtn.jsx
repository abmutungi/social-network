import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faUserPlus);

const GroupInviteBtn = () => {
  return (
    <button className={"group-request-btn"}>
      <FontAwesomeIcon icon={faUserPlus} />
      <span className="icon-text">{"Invite"}</span>
    </button>
  );
};

export { GroupInviteBtn };
