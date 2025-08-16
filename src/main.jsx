// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <BrowserRouter>
         <ToastContainer />
         <AuthProvider>
            <UserProvider>
               <GoogleOAuthProvider clientId="421493603152-bmtg41m4o2473rrhb9f44qugq8regqhc.apps.googleusercontent.com">
                  <App />
               </GoogleOAuthProvider>
            </UserProvider>
         </AuthProvider>
      </BrowserRouter>
   </React.StrictMode>
);
