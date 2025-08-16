import React, { useEffect, useState } from "react";
import "../App.css";
import { getUserdata, personal_details } from "@/api/auth";
import { toast } from "react-toastify";

export const PersonalDetails = () => {
   const [isLoading, setIsLoading] = useState(true);
   const [updateLoading, setUpdateLoading] = useState(false);
   const [file, setFile] = useState(null);
   // State to store form data
   const [formData, setFormData] = useState({
      full_name: "",
      identity_number: "",
      email: "",
      father_name: "",
      dob: "",
      mother_name: "",
      phone_number: "",
      gender: "male",
      //  profile_picture: null,
   });
   useEffect(() => {
      const fetchData = async () => {
         try {
            await getUserdata().then((res) => {
               setIsLoading(true);
               if (res.success) {
                  setFormData({
                     full_name: res.user.user.full_name || "",
                     email: res.user.user.email || "",
                     identity_number: res.user.user.identity_number || "",
                     phone_number: res.user.user.phone_number || "",
                     dob: res.user.user.dob || "",
                     gender: res.user.user.gender || "male",
                     father_name: res.user.user.father_name || "",
                     mother_name: res.user.user.mother_name || "",

                     //   profile_picture: null,
                  });
               } else {
                  toast.error(res.message || "Error in fetching data");
               }
               setIsLoading(false);
            });
         } catch (error) {
            console.error("Error fetching user data", error);
            toast.error("Failed to fetch user data");
         }
      };
      fetchData();
   }, []);

   const handleChange = (e) => {
      const { id, value, files } = e.target;
      // If the input is for file upload
      if (id === "picture" && files) {
         setFormData((prev) => ({
            ...prev,
            profile_picture: files[0],
         }));
      } else {
         setFormData((prev) => ({
            ...prev,
            [id]: value, // For all other input fields
         }));
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      //  const payload = { ...formData };

      const data = new FormData();
      data.append("full_name", formData.full_name);
      data.append("email", formData.email);
      data.append("identity_number", formData.identity_number);
      data.append("phone_number", formData.phone_number);
      data.append("dob", formData.dob);
      data.append("gender", formData.gender);
      data.append("father_name", formData.father_name);
      data.append("mother_name", formData.mother_name);
      data.append("file", file);

      try {
         // const response = await personal_details(payload);
         await personal_details(data).then((response) => {
            setUpdateLoading(true);
            if (response.success) {
               toast.success(response.message);
            } else {
               toast.error(response.message || "Something went wrong");
            }
            setUpdateLoading(false);
            // console.log("Payload sent to API:", payload);
            // console.log("Response:", response);
         });
      } catch (error) {
         console.error("Error in API:", error);
         toast.error("Failed to update personal details");
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <div className="update rounded-[8px] mx-7 min-h-[60vh]">
            {isLoading ? (
               <div className="flex items-center justify-center w-full h-full text-center">
                  Loading ...
               </div>
            ) : (
               <>
                  <h2 className="mx-6 py-6 text-white font-roboto font-[700] text-[18px]">
                     Personal Details
                  </h2>
                  <div className="grid grid-cols-1 mx-7 sm:grid-cols-2 gap-y-2 gap-x-6">
                     <InputField
                        type="text"
                        id="full_name"
                        label="FULL NAME"
                        placeholder="Enter member full name"
                        value={formData.full_name}
                        onChange={handleChange}
                     />
                     <InputField
                        type="number"
                        id="identity_number"
                        label="IDENTITY NUMBER"
                        placeholder="Enter your identity number"
                        value={formData.identity_number}
                        onChange={handleChange}
                     />
                     <InputField
                        type="email"
                        id="email"
                        label="EMAIL ADDRESS"
                        placeholder="Enter member email address"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={true}
                     />
                     <InputField
                        type="text"
                        id="father_name"
                        label="FATHER NAME"
                        placeholder="Enter your father name"
                        value={formData.father_name}
                        onChange={handleChange}
                     />
                     <InputField
                        type="date"
                        id="dob"
                        label="DATE OF BIRTH"
                        // If formData.dob is not null or undefined, convert it to a valid date string
                        value={
                           formData.dob
                              ? new Date(formData.dob)
                                   .toISOString()
                                   .substring(0, 10)
                              : ""
                        }
                        onChange={handleChange}
                     />
                     <InputField
                        type="text"
                        id="mother_name"
                        label="MOTHER NAME"
                        placeholder="Enter your mother name"
                        value={formData.mother_name}
                        onChange={handleChange}
                     />
                     <InputField
                        type="number"
                        id="phone_number"
                        label="PHONE#"
                        placeholder="Enter phone #"
                        value={formData.phone_number}
                        onChange={handleChange}
                     />
                     <div>
                        <label
                           htmlFor="gender"
                           className="font-roboto text-[14px] font-[500] leading-[19.5px] text-white"
                        >
                           Gender
                        </label>
                        <br />
                        <select
                           id="gender"
                           className="w-full my-5 font-roboto text-[#B1B1B1] font-[400] text-[14px] leading-[19.5px] px-5 py-4 bg-[#0E1E39] rounded-[8PX] border-[1px] border-[#B4B3B3]"
                           value={formData.gender}
                           onChange={handleChange}
                        >
                           <option value="male">Male</option>
                           <option value="female">Female</option>
                        </select>
                     </div>
                     <div>
                        <label
                           htmlFor="picture"
                           className="font-roboto text-[14px] font-[500] leading-[19.5px] text-white"
                        >
                           PICTURE
                        </label>
                        <br />
                        <input
                           type="file"
                           name="picture"
                           id="picture"
                           className="hidden"
                           accept="image/*"
                           // onChange={handleChange}
                           onChange={(e) => setFile(e.target.files[0])}
                        />
                        <label
                           htmlFor="picture"
                           className="w-full inline-block my-4 text-[#B1B1B1] font-roboto font-[400] text-[14px] leading-[19.5px] px-5 py-4 bg-[#0E1E39] text-left rounded-[8px] border-[1px] border-[#B4B3B3] cursor-pointer"
                        >
                           {file ? file.name : "Upload profile picture"}
                        </label>
                     </div>
                  </div>
                  <div className="px-7 py-9">
                     <button
                        disabled={updateLoading}
                        type="submit"
                        className={`py-[14px] px-6 bg-[#0075FF] text-white font-roboto font-[700] text-[13px] leading-[19.5px] text-center rounded-[4px] ${
                           updateLoading && "cursor-auto"
                        }`}
                     >
                        {updateLoading ? "Loading ..." : "UPDATE"}
                     </button>
                  </div>
               </>
            )}
         </div>
      </form>
   );
};

// Updated InputField Component
function InputField({
   label,
   id,
   placeholder,
   type,
   value,
   onChange,
   disabled = false,
}) {
   return (
      <div>
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
            disabled={disabled}
            className={`w-full my-4 font-roboto text-[#B1B1B1] font-[400] text-[14px] leading-[19.5px] px-5 py-4 bg-[#0E1E39] rounded-[8PX] border-[1px] border-[#B4B3B3] ${
               disabled ? "cursor-not-allowed" : ""
            }`}
         />
      </div>
   );
}
