import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail, resendOtp } from "@/api/auth";
import { useAuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const VerifyEmail = () => {
   const { setAuthUser } = useAuthContext();
   const location = useLocation();
   const navigate = useNavigate();
   const email = location.state?.email || "";

   useEffect(() => {
      if (!email) {
         navigate("/user-signup");
      }
   }, [email, navigate]);

   const [otp, setOtp] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const handleVerify = async () => {
      if (!otp) {
         toast.error("Please enter the OTP");
         return;
      }

      // Check if email is available before proceeding
      if (!email) {
         toast.error("No email provided. Redirecting to signup...");
         navigate("/user-signup");
         return;
      }

      setIsLoading(true);
      try {
         const response = await verifyEmail({ email, otp });
         console.log("Verify Email response:", response); // Debugging

         if (response.success) {
            toast.success(response.message);
            setAuthUser(response.user); // Update AuthContext
            localStorage.setItem("user", JSON.stringify(response.user)); // Persist user
            navigate("/user-signin");
         } else {
            toast.error(response.message || "Verification failed");
         }
      } catch (error) {
         console.error("Verification failed", error);
         // Enhanced error handling
         if (
            error.response &&
            error.response.data &&
            error.response.data.message
         ) {
            toast.error(error.response.data.message);
         } else {
            toast.error("An error occurred while verifying. Please try again.");
         }
      } finally {
         setIsLoading(false);
      }
   };

   const handleResend = async () => {
      setIsLoading(true);
      try {
         const response = await resendOtp({ email });
         console.log("Resend OTP response:", response); // Debugging

         if (response.success) {
            toast.success("OTP resent successfully!");
         } else {
            toast.error(response.message || "Failed to resend OTP");
         }
      } catch (error) {
         console.error("Resend OTP failed", error);
         // Enhanced error handling
         if (
            error.response &&
            error.response.data &&
            error.response.data.message
         ) {
            toast.error(error.response.data.message);
         } else {
            toast.error(
               "An error occurred while resending the OTP. Please try again."
            );
         }
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="min-h-screen bg-[#060B26] flex flex-col justify-between">
         <Navbar />
         <section className="flex flex-col items-center justify-center my-10">
            <div className="bg-[#0E132D] text-white py-8 px-12 w-full max-w-[450px] border border-solid border-gray-600 rounded-[24px]">
               <h2 className="text-2xl font-semibold text-center mb-6">
                  Verify Your Email
               </h2>
               <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full mb-6 py-3 px-4 rounded-lg text-black"
               />
               <button
                  onClick={handleVerify}
                  className={`bg-[#0075FF] flex justify-center font-roboto text-[15px] font-bold leading-[22.5px] tracking-[0.08em] text-center w-full py-3 rounded-[12px] ${
                     isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
               >
                  {isLoading ? (
                     <div className="w-5 h-5 border-4 border-t-transparent border-white border-solid rounded-full animate-spin"></div>
                  ) : (
                     "VERIFY"
                  )}
               </button>
               <button
                  onClick={handleResend}
                  className="flex items-center justify-center my-4 gap-1 font-roboto text-[14px] leading-5 m-auto cursor-pointer text-[#F2994A] font-[500]"
                  disabled={isLoading}
               >
                  <p>Didn't receive the OTP?</p>
                  <p className="font-[700] text-white">Resend</p>
               </button>
            </div>
         </section>
         <Footer />
      </div>
   );
};
