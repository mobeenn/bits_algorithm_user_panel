import { useEffect, useState } from "react";
import { UserContext } from "./ContextProvider";

export const UserProvider = ({ children }) => {
  // Initialize user data as an empty object
  const [userData] = useState(localStorage.getItem("authUser") || null);
  const [userName, setUserName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Update user data from local storage if it exists
    if (userData) {
      const { full_name, email, profile_picture } = JSON.parse(userData);
      setUserName(full_name);
      setProfilePicture(profile_picture);
      setUserEmail(email);
    }
  }, [userData]);

  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        profilePicture,
        setProfilePicture,
        userEmail,
        setUserEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
