import { updatePassword as apiUpdatePassword } from "@/api/auth";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export const UpdatePassword = () => {
   const [oldPassword, setOldPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [reEnterPassword, setReEnterPassword] = useState("");
   const [errors, setErrors] = useState({
      oldPassword: false,
      newPassword: false,
      reEnterPassword: false,
   });

   const handleUpdatePassword = async (e) => {
      e.preventDefault();
      const newErrors = {
         oldPassword: !oldPassword,
         newPassword: !newPassword,
         reEnterPassword: !reEnterPassword,
      };

      setErrors(newErrors);

      if (Object.values(newErrors).some((error) => error)) {
         return;
      }

      if (newPassword !== reEnterPassword) {
         toast.error("New passwords do not match");
         return;
      }

      const user = JSON.parse(localStorage.getItem("authUser"));
      const payload = {
         oldPassword,
         newPassword,
         reEnterPassword,
         userId: user._id,
      };

      try {
         const response = await apiUpdatePassword(payload);
         if (response.success) {
            toast.success(
               response?.message || "Password updated successfully!"
            );
         } else {
            toast.error(response.message || "Failed to update password");
         }
      } catch (error) {
         toast.error(error.message || "Failed to update password");
      }
   };

   return (
      <form onSubmit={handleUpdatePassword}>
         <div className="update mx-7 rounded-[8px] px-7">
            <h2 className="font-roboto py-6 text-[18px] font-[700] text-white">
               Update Password
            </h2>
            <div className="my-2 grid grid-cols-1 gap-6">
               <Inputfield
                  type="password"
                  id="old_password"
                  label={"OLD PASSWORD"}
                  placeholder="Enter old password"
                  value={oldPassword}
                  onChange={(e) => {
                     setOldPassword(e.target.value);
                     if (e.target.value) {
                        setErrors((prev) => ({ ...prev, oldPassword: false }));
                     }
                  }}
                  error={errors.oldPassword}
                  errorMessage="Old password is required"
               />
               <Inputfield
                  type="password"
                  id="new_password"
                  label={"NEW PASSWORD"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => {
                     setNewPassword(e.target.value);
                     if (e.target.value) {
                        setErrors((prev) => ({ ...prev, newPassword: false }));
                     }
                  }}
                  error={errors.newPassword}
                  errorMessage="New password is required"
               />
               <Inputfield
                  type="password"
                  id="renter_password"
                  label={"RE-ENTER PASSWORD"}
                  placeholder="Re-enter the password"
                  value={reEnterPassword}
                  onChange={(e) => {
                     setReEnterPassword(e.target.value);
                     if (e.target.value) {
                        setErrors((prev) => ({
                           ...prev,
                           reEnterPassword: false,
                        }));
                     }
                  }}
                  error={errors.reEnterPassword}
                  errorMessage="Please re-enter the new password"
               />
            </div>
            <div className="py-9">
               <button
                  type="submit"
                  className="font-roboto mb-2 rounded-[4px] bg-[#0075FF] px-6 py-4 text-center text-[14px] font-[500] leading-5 text-white md:mb-0"
               >
                  UPDATE
               </button>
            </div>
         </div>
      </form>
   );
};

// Inputfield Component
function Inputfield({
   label,
   id,
   placeholder,
   type,
   value,
   onChange,
   error,
   errorMessage,
}) {
   const [showPassword, setShowPassword] = useState(false);

   const togglePasswordVisibility = () => {
      setShowPassword((prevState) => !prevState);
   };

   return (
      <div className="relative flex flex-col">
         <label
            htmlFor={id}
            className="font-roboto my-2 text-[14px] font-[500] leading-[19.5px] text-[#B66214]"
         >
            {label}
         </label>

         <div className="relative w-full max-w-[510px]">
            <input
               type={showPassword ? "text" : type} // Toggle between 'text' and 'password'
               id={id}
               placeholder={placeholder}
               value={value}
               onChange={onChange}
               className={`font-roboto my-1 w-full rounded-[8px] border-[1px] px-5 py-4 text-[14px] font-[400] leading-[19.5px] text-[#B1B1B1] 
               ${
                  error
                     ? "border-red-500 bg-[#0E1E39]"
                     : "border-[#B4B3B3] bg-[#0E1E39]"
               }`}
            />

            {/* Eye Icon to toggle password visibility */}
            {type === "password" && (
               <span
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-400 cursor-pointer"
               >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
               </span>
            )}
         </div>
         {error && <p className="text-red-500 text-[12px]">{errorMessage}</p>}
      </div>
   );
}
