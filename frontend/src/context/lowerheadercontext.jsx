import { createContext, useState } from "react";


export const LowerHeaderContext = createContext();



export function LowerHeaderProvider({children}){
    return(
        <LowerHeaderContext.Provider value={{item:999}}>
            {children}
            </LowerHeaderContext.Provider>
    );
}









