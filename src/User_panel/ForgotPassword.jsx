import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { forgotPassword } from "@/api/auth";
import { toast, ToastContainer } from "react-toastify"; // Import toast and container
import "react-toastify/dist/ReactToastify.css"; // Import CSS for react-toastify

export const ForgotPassword = () => {
   const [email, setEmail] = useState("");
   const [error, setError] = useState("");

   // Handle email input change
   const handleEmailChange = (e) => {
      setEmail(e.target.value);
      setError("");
   };

   // Handle form submission
   const handleForgotPassword = async () => {
      if (!email) {
         setError("Email field is required");
         return;
      }

      // let resetURL = `http://localhost:5173/reset-password`

      const data = { email };
      const response = await forgotPassword(data);
      if (response.success) {
         localStorage.setItem("resetToken", response.resetToken);
         toast.success(response.message);
         setEmail("");
      } else {
         toast.error(response.message || "Something went wrong");
      }
   };

   return (
      <div className="min-h-svh bg-[#060B26] flex flex-col justify-between">
         <Navbar />

         <section className="flex flex-row flex-wrap-reverse justify-evenly items-center w-full">
            <div className="bg-[#0E132D] text-white py-4 px-12 w-full max-w-[450px] border border-solid border-gray-600 rounded-[24px]">
               <h2 className="font-roboto text-[18px] font-bold leading-[23.4px] text-center my-9">
                  RECOVER PASSWORD
               </h2>
               <p className="text-center font-roboto font-[400] text-[14px] tracking-[2%]">
                  Enter your email to set a new password
               </p>

               <div className="my-9">
                  <label
                     htmlFor="email"
                     className="font-roboto ml-1 uppercase text-[14px] w-[95%] self-center font-medium leading-[19.6px]"
                  >
                     Email
                  </label>
                  <input
                     type="email"
                     name="e-mail"
                     id="email"
                     placeholder="Enter your email address"
                     className="bg-[#151933] mt-1 mb-1 px-3 py-3 w-full rounded-[8px] border border-transparent focus:border-[#0075FF]"
                     value={email}
                     onChange={handleEmailChange}
                     required
                  />
                  {error && (
                     <span className="text-red-500 text-sm mt-1 block">
                        {error}
                     </span>
                  )}
               </div>
               <button
                  className="bg-[#0075FF] flex justify-center font-roboto text-[15px] font-bold leading-[22.5px] tracking-[0.08em] text-center w-full py-3 rounded-[12px] my-12 hover:bg-[#005bbd] transition duration-300"
                  onClick={handleForgotPassword}
               >
                  SEND
                  <img
                     src="/signin.svg"
                     className="mx-2 my-1 max-w-[17px]"
                     alt=""
                  />
               </button>
            </div>
            <div className="flex flex-col">
               <img
                  src="/Algorithm Logo 22 1.svg"
                  className="mx-auto max-w-[280px] object-cover"
                  alt="BITS&ALGORITHM"
               />
               <h1 className="py-9 text-white font-roboto text-[50px] font-semibold leading-[68px] tracking-[0.1em] text-center">
                  Crafting Legacies, One <br /> Will at a Time
               </h1>
            </div>
         </section>

         {/* Footer Section */}
         <Footer />

         <ToastContainer
            position="top-right"
            ition
            autoClose={2000} // Time to close the toast (in milliseconds)
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
         />
      </div>
   );
};
