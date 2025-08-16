import { executorDetails } from "@/api/auth";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const ExecuterDetail = () => {
   const [fullName, setfullName] = useState("");
   const [email, setEmail] = useState("");
   const [phoneNumber, setPhoneNumber] = useState("");
   const [identityNumber, setIdentityNumber] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState({
      fullName: "",
      email: "",
      phoneNumber: "",
      identityNumber: "",
   });

   const handleExecutorDetails = async () => {
      const userId = JSON.parse(localStorage.getItem("authUser"));
      const payload = {
         fullName,
         email,
         phoneNumber,
         identityNumber,
         userId: userId._id,
      };
      const newErrors = {};

      if (!fullName) {
         newErrors.fullName = "Full name is required";
      }
      if (!email) {
         newErrors.email = "Email is required";
      } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
         newErrors.email = "Please enter a valid email address";
      }
      if (!phoneNumber) {
         newErrors.phoneNumber = "Phone number is required";
      }
      if (!identityNumber) {
         newErrors.identityNumber = "Identity number is required";
      }
      setError(newErrors);
      if (Object.keys(newErrors).length > 0) return;
      setIsLoading(true);
      try {
         const response = await executorDetails(payload);
         if (response.success) {
            toast.success(
               response?.message || "Executor details filled successfully"
            );

            // Clear input fields after successful submission
            setfullName("");
            setEmail("");
            setPhoneNumber("");
            setIdentityNumber("");
            setError({}); // Clear any error messages
         } else {
            toast.error(response?.message || "Failed to fill executor details");
         }
      } catch (error) {
         toast.error(error.response?.data?.message || "Executor Details Error");
      } finally {
         setIsLoading(false);
      }
   };

   // Clear errors when the user types
   const clearError = (field) => {
      setError((prev) => ({
         ...prev,
         [field]: "",
      }));
   };

   return (
      <>
         <div className="update mx-2 sm:mx-7 rounded-[8px]">
            <h2 className="text-white font-roboto font-[700] text-[18px] leading-6 py-8 px-7">
               Executor Details
            </h2>
            <div className="px-6">
               <Inputfield
                  type="text"
                  id="full_name"
                  label={"FULL NAME"}
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => {
                     setfullName(e.target.value);
                     clearError("fullName");
                  }}
                  error={error.fullName}
               />
               <Inputfield
                  type="email"
                  id="e-mail"
                  label={"EMAIL ADDRESS"}
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => {
                     setEmail(e.target.value);
                     clearError("email");
                  }}
                  error={error.email}
               />
               <Inputfield
                  type="number"
                  id="phone_number"
                  label={"PHONE #"}
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => {
                     setPhoneNumber(e.target.value);
                     clearError("phoneNumber");
                  }}
                  error={error.phoneNumber}
               />
               <Inputfield
                  type="number"
                  id="id_number"
                  label={"IDENTITY NUMBER"}
                  placeholder="Enter identity number"
                  value={identityNumber}
                  onChange={(e) => {
                     setIdentityNumber(e.target.value);
                     clearError("identityNumber");
                  }}
                  error={error.identityNumber}
               />

               <button
                  className="py-[14px] mb-9 px-6 bg-[#0075FF] text-white font-roboto font-[700] text-[13px] leading-[19.5px] text-center rounded-[4px]"
                  onClick={handleExecutorDetails}
                  disabled={isLoading}
               >
                  {isLoading ? "Loading..." : "Submit"}
               </button>
               <br />
            </div>
         </div>
      </>
   );
};

function Inputfield({ label, id, placeholder, type, value, onChange, error }) {
   return (
      <div className="flex flex-col my-2">
         <label
            htmlFor={id}
            className="font-roboto text-[14px] font-[500] leading-[19.5px] text-white"
         >
            {label}
         </label>
         <input
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="max-w-[510px] w-full mt-3 mb-7 font-roboto text-[#B1B1B1] font-[400] text-[14px] leading-[19.5px] px-5 py-4 bg-[#0E1E39] rounded-[8px] border-[1px] border-[#B4B3B3]"
         />
         {error && (
            <span className="text-red-500 text-[12px] -mt-6">{error}</span>
         )}
      </div>
   );
}
