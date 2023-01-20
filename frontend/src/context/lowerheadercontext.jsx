import { createContext, useState } from "react";


export const LowerHeaderContext = createContext();



export function LowerHeaderProvider({children}){

    const [userID, setUserID]=useState([]);

    //value={{item:{name:"Tolu Lawal", userid:1}}}

    return(
        <LowerHeaderContext.Provider value={{item:{name: "1"}}}>
            {children}
            </LowerHeaderContext.Provider>
    );
}









