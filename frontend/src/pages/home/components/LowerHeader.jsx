
import ProfileBar from '../../home/components/ProfileBar';
import "../../../index.css";
import { LowerHeaderContext } from '../../../context/lowerheadercontext';
import { useContext } from 'react';



function LowerHeader() {

  const { userID } = useContext(LowerHeaderContext);
  console.log('from lowerheader', userID);

    return (
      <div className="LowerHeader">
        <ProfileBar />
      </div>
    );
  }

  export {LowerHeader}
