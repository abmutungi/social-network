import { createContext, useState } from "react";


export const LowerHeaderContext = createContext();



export function LowerHeaderProvider({children}){

    const [userID, setUserID]=useState(0);
    const [initialDBData, setinitialDBData]=useState([]);

    const updateUserID =(id)=>{
        setUserID(()=> id )
    }

    const updateinitialDB =(data)=>{
        setinitialDBData(()=> data)
    }


    
    console.log('User id from context', userID);
    
    //value={{item:{name:"Tolu Lawal", userid:1}}}

    return(
        <LowerHeaderContext.Provider value={{userID, initialDBData, updateUserID, updateinitialDB}}>
            {children}
            </LowerHeaderContext.Provider>
    );
}









