import { useState, useEffect } from "react";
import React from "react";



export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({  });

 
  return (
    <AuthContext.Provider
      value={{
       user,
        setUser
      
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
