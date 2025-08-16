import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { childDetails } from "@/api/auth";

export const NewChild = () => {
   const [child_full_name, setChild_full_name] = useState("");
   const [child_identity_number, setChild_identity_number] = useState("");
   const [child_phone_number, setChild_phone_number] = useState("");
   const [child_gender, setChild_gender] = useState("");
   const [child_dob, setChild_dob] = useState("");
   const [isUnder18, setIsUnder18] = useState(false);

   // Guardian details state
   const [guardian_name, setGuardian_name] = useState("");
   const [guardian_phone, setGuardian_phone] = useState("");
   const [guardian_id, setGuardian_id] = useState("");
   const [guardian_email, setGuardian_email] = useState("");

   const [error, setError] = useState({
      child_full_name: "",
      child_identity_number: "",
      child_phone_number: "",
      child_gender: "",
      child_dob: "",
   });

   // Function to calculate age based on DOB
   const calculateAge = (dob) => {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      if (
         monthDifference < 0 ||
         (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
         age--;
      }
      return age;
   };

   // Check age and update guardian requirement
   useEffect(() => {
      if (child_dob) {
         const age = calculateAge(child_dob);
         setIsUnder18(age < 18);
      }
   }, [child_dob]);

   const handleChildDetails = async () => {
      const userId = JSON.parse(localStorage.getItem("authUser"))?._id;

      // Validate inputs
      const newErrors = {};
      if (!child_full_name)
         newErrors.child_full_name = "Full Name is required!";
      if (!child_identity_number)
         newErrors.child_identity_number = "Identity Number is required!";
      if (!child_phone_number)
         newErrors.child_phone_number = "Phone Number is required!";
      if (!child_gender) newErrors.child_gender = "Gender is required!";
      if (!child_dob) newErrors.child_dob = "Date of Birth is required!";
      setError(newErrors);

      // Stop if there are errors
      if (Object.keys(newErrors).length > 0) return;

      const payload = {
         child_full_name,
         child_identity_number,
         child_phone_number,
         child_gender,
         child_dob,
         userId,
         ...(isUnder18 && {
            guardian_name,
            guardian_phone,
            guardian_id,
            guardian_email,
         }),
      };

      try {
         const response = await childDetails(payload);
         if (response.success) {
            toast.success(
               response.message || "Child details submitted successfully!"
            );
         } else {
            toast.error(response.message || "Failed to submit child details.");
         }
      } catch (error) {
         toast.error(
            "Child Details Error: " +
               (error.response?.data?.message || error.message)
         );
      }
   };

   const clearError = (field) => {
      setError((prev) => ({
         ...prev,
         [field]: "",
      }));
   };

   return (
      <div className="update rounded-[8px] mx-7 px-7">
         <h2 className="py-6 text-white font-roboto font-[700] text-[18px]">
            Child Details
         </h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
               type="text"
               id="full_name"
               label="FULL NAME"
               placeholder="Enter child's full name"
               value={child_full_name}
               onChange={(e) => {
                  setChild_full_name(e.target.value);
                  clearError("child_full_name");
               }}
               error={error.child_full_name}
            />
            <InputField
               type="number"
               id="identity_number"
               label="IDENTITY NUMBER"
               placeholder="Enter identity number"
               value={child_identity_number}
               onChange={(e) => {
                  setChild_identity_number(e.target.value);
                  clearError("child_identity_number");
               }}
               error={error.child_identity_number}
            />
            <InputField
               type="number"
               id="phone_number"
               label="PHONE #"
               placeholder="Enter phone number"
               value={child_phone_number}
               onChange={(e) => {
                  setChild_phone_number(e.target.value);
                  clearError("child_phone_number");
               }}
               error={error.child_phone_number}
            />
            <div className="mr-9 w-full max-w-[515px]">
               <label
                  htmlFor="gender"
                  className="font-roboto text-[14px] font-[500] text-white"
               >
                  GENDER
               </label>
               <select
                  value={child_gender}
                  onChange={(e) => {
                     setChild_gender(e.target.value);
                     clearError("child_gender");
                  }}
                  className="bg-[#0E1E39] text-[#B1B1B1] mt-3 w-full px-5 py-4 rounded-[8px] border-[1px] border-[#B4B3B3]"
               >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
               </select>
               {error.child_gender && (
                  <span className="text-red-500 text-sm">
                     {error.child_gender}
                  </span>
               )}
            </div>
            <InputField
               type="date"
               id="dob"
               label="DATE OF BIRTH"
               value={child_dob}
               onChange={(e) => {
                  setChild_dob(e.target.value);
                  clearError("child_dob");
               }}
               error={error.child_dob}
            />
         </div>
         {isUnder18 && (
            <div>
               <h2 className="pt-6 text-white font-roboto font-[700] text-[18px]">
                  Guardian Details
               </h2>
               <hr className="hr_line mt-1 mb-8" />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                     type="text"
                     id="guardian_name"
                     label="FULL NAME"
                     placeholder="Enter guardian's full name"
                     value={guardian_name}
                     onChange={(e) => setGuardian_name(e.target.value)}
                  />
                  <InputField
                     type="number"
                     id="guardian_phone"
                     label="PHONE #"
                     placeholder="Enter guardian's phone number"
                     value={guardian_phone}
                     onChange={(e) => setGuardian_phone(e.target.value)}
                  />
                  <InputField
                     type="number"
                     id="guardian_id"
                     label="IDENTITY NUMBER"
                     placeholder="Enter guardian's identity number"
                     value={guardian_id}
                     onChange={(e) => setGuardian_id(e.target.value)}
                  />
                  <InputField
                     type="email"
                     id="guardian_email"
                     label="EMAIL ADDRESS"
                     placeholder="Enter guardian's email address"
                     value={guardian_email}
                     onChange={(e) => setGuardian_email(e.target.value)}
                  />
               </div>
            </div>
         )}
         <button
            onClick={handleChildDetails}
            className="py-[14px] my-5 px-6 bg-[#0075FF] text-white font-roboto font-[700] text-[13px] rounded-[4px]"
         >
            Submit
         </button>
      </div>
   );
};

// Reusable InputField Component
function InputField({ label, id, placeholder, type, value, onChange, error }) {
   return (
      <div className="flex flex-col">
         <label
            htmlFor={id}
            className="font-roboto text-[14px] font-[500] text-white"
         >
            {label}
         </label>
         <input
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="max-w-[510px] w-full my-4 font-roboto text-[#B1B1B1] px-5 py-4 bg-[#0E1E39] rounded-[8px] border-[1px] border-[#B4B3B3]"
         />
         {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
   );
}
