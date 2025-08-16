import React, { useEffect } from "react";
import { refreshToken } from "./api/auth";
import { useLocation, useNavigate } from "react-router-dom";

const RefreshTokenProvider = ({ children }) => {
   const location = useLocation();
   const navigate = useNavigate();
   const publocRoutes = [
      "/user-signin",
      "/signup",
      "/forgot-password",
      "/reset-password",
      "/verify-password",
   ];
   useEffect(() => {
      const hanndleRefreshToken = async () => {
         if (!publocRoutes.includes(location.pathname)) {
            await refreshToken().then((res) => {
               console.log("token refreshed", res?.user?.access_token);

               if (res.success === false) {
                  navigate("user-signin");
                  localStorage.setItem("token", res?.user?.access_token);
               } else {
                  console.log("refresh token error : ", res.message);
                  navigate("/user-signin");
               }
            });
         }
      };
      hanndleRefreshToken();
   }, []);
   return <>{children}</>;
};

export default RefreshTokenProvider;
