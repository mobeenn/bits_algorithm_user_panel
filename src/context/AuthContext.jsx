// context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

// Create a context for Auth
const AuthContext = createContext();

// Auth Provider to wrap the entire App
export const AuthProvider = ({ children }) => {
   const [authUser, setAuthUser] = useState(null); // You can also use a token here

   React.useEffect(() => {
      const user = localStorage.getItem("authUser"); // Check user from local storage
      if (user) {
         console.log("🚀 ~ React.useEffect ~ user:", user);
         setAuthUser(JSON.parse(user));
      } else {
         console.log("No user found from local storage");
      }
   }, []);

   return (
      <AuthContext.Provider value={{ authUser, setAuthUser }}>
         {children}
      </AuthContext.Provider>
   );
};

// Custom hook to access AuthContext
export const useAuthContext = () => useContext(AuthContext);
