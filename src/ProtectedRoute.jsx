// ProtectedRoute.jsx
import { useAuthContext } from "./context/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";

// ProtectedRoute component to guard protected routes
const ProtectedRoute = ({ children }) => {
   // const { authUser } = useAuthContext(); // Access authUser from context
   const authUser = localStorage.getItem("authUser");
   console.log("🚀 ~ ProtectedRoute ~ authUser:", authUser);

   if (!authUser) {
      // If user is not authenticated, redirect to SignIn
      return <Navigate to="/user-signin" replace />;
   }

   // If authenticated, render the child components
   return children;
};

export default ProtectedRoute;
