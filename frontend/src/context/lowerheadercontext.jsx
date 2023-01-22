import { createContext, useState } from "react";


export const LowerHeaderContext = createContext();



export function LowerHeaderProvider({children}){

    const [userID, setUserID]=useState(0);
    const [DBAllUsers, setDBAllUsers]=useState([]);

    const [GroupID, setGroupID]=useState(0);
    const [AllGroupsData, setAllGroupsData]=useState([]);


    const updateUserID =(id)=>{
        setUserID(()=> id )
    }

    const updateinitialDB =(data)=>{
        setDBAllUsers(()=> data)
    }


    const updateGroupID =(id)=>{
        setGroupID(()=> id )
    }

    const updateAllGroupsData =(data)=>{
        setAllGroupsData(()=> data)
    }


    
    console.log('User id from context', userID);
    console.log('Groupid from context', GroupID);

    
    //value={{item:{name:"Tolu Lawal", userid:1}}}

    return(
        <LowerHeaderContext.Provider value={{userID, DBAllUsers, updateUserID, updateinitialDB,GroupID,updateGroupID, AllGroupsData, updateAllGroupsData}}>
            {children}
            </LowerHeaderContext.Provider>
    );
}









