
import ProfileBar from '../../home/components/ProfileBar';
import "../../../index.css";
import { LowerHeaderContext } from '../../../context/lowerheadercontext';
import { useContext } from 'react';



function LowerHeader() {

  const {item}=useContext(LowerHeaderContext)
  console.log('from lowerheader', item);

    return (
      <div className="LowerHeader">
        <ProfileBar />
      </div>
    );
  }

  export {LowerHeader}
