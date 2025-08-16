import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { resetPassword } from "@/api/auth";

export const ResetPassword = () => {
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const { token } = useParams();
   const navigate = useNavigate();

   //getting the reset token
   const url = window.location.href;

   const url_object = new URL(url);

   const resetTokenFromUrl = url_object.searchParams.get("resetToken");
   console.log("🚀 ~ ResetPassword ~ resetTokenFromUrl:", resetTokenFromUrl);
   const handlePasswordChange = (e) => setPassword(e.target.value);
   const handleConfirmPasswordChange = (e) =>
      setConfirmPassword(e.target.value);

   // Handle reset password submission
   const handleResetPassword = async () => {
      if (password === "" || confirmPassword === "") {
         toast.error("Both fields are required.");
         return;
      }
      if (password !== confirmPassword) {
         toast.error("Passwords do not match.");
         return;
      }

      const token = localStorage.getItem("token");
      const resetToken =
         localStorage.getItem("resetToken") || resetTokenFromUrl;

      const data = { password, confirmPassword, token, resetToken };

      try {
         // console.log("🚀 ~ handleResetPassword ~ data:", data);

         const response = await resetPassword(data);
         if (response.success) {
            toast.success(response.message);
            setTimeout(() => {
               navigate("/user-signin");
            }, 3000);
         } else {
            toast.error(response.message || "Something went wrong.");
         }
      } catch (error) {
         toast.error("Error: ", error.message);
      }
   };

   return (
      <div className="min-h-svh bg-[#060B26] flex flex-col justify-between">
         {/* Navbar Section */}
         <Navbar />

         {/* HeroSection */}
         <section className="flex flex-row flex-wrap-reverse justify-evenly items-center w-full">
            <div className="bg-[#0E132D] text-white py-4 px-12 w-full max-w-[450px] border border-solid border-gray-600 rounded-[24px]">
               <h2 className="font-roboto text-[18px] font-bold leading-[23.4px] text-center my-4">
                  RESET PASSWORD
               </h2>
               <p className="text-[11px] font-roboto text-[#F2994A] text-center">
                  The password must contain a minimum of 8 characters, with
                  upper & lower case characters, a number and a symbol.
               </p>
               <div className="my-4">
                  <div className="flex flex-col space-y-1 w-[100%]">
                     <label
                        htmlFor="password"
                        className="font-roboto text-[14px] w-[95%] ml-1 font-medium leading-[19.6px] mb-2"
                     >
                        PASSWORD
                     </label>
                     <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter the password"
                        className="bg-[#151933] px-3 py-3 w-full rounded-[8px]"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                     />
                  </div>
                  <div className="flex flex-col my-12 w-[100%]">
                     <label
                        htmlFor="confirmPassword"
                        className="font-roboto text-[14px] w-[95%] ml-1 font-medium leading-[19.6px] mb-2"
                     >
                        CONFIRM PASSWORD
                     </label>

                     <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Re-Enter the password"
                        className="bg-[#151933] px-3 py-3 w-full rounded-[8px]"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                     />
                  </div>
               </div>

               <button
                  className="bg-[#0075FF] flex justify-center font-roboto text-[15px] font-bold leading-[22.5px] tracking-[0.08em] text-center w-full py-3 rounded-[12px] my-8"
                  onClick={handleResetPassword}
               >
                  UPDATE
                  <img
                     src="/signin.svg"
                     className="mx-2 my-1 max-w-[17px]"
                     alt=""
                  />
               </button>
            </div>
            <div className="flex flex-col ">
               <img
                  src="/Algorithm Logo 22 1.svg"
                  className="mx-auto max-w-[280px]  object-cover "
                  alt="BITS&ALGORITHM"
               />
               <h1 className="py-9 text-white font-roboto text-[50px] font-semibold leading-[68px] tracking-[0.1em] text-center">
                  Crafting Legacies, One <br /> Will at a Time
               </h1>
            </div>
         </section>

         <Footer />

         <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
         />
      </div>
   );
};
