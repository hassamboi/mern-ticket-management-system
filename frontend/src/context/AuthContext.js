import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {
  
  return <AuthContext.Provider >{children}</AuthContext.Provider>;
};
