import { getChildrenDataById, updateChildren } from "@/api/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const EditChild = () => {
   // ~ getting the child id
   const url = window.location.href;
   const urlObj = new URL(url);
   const childId = urlObj.searchParams.get("childId");

   const [isLoading, setIsLoading] = useState(true);
   const [updateLoading, setUpdateLoading] = useState(false);

   const [child, setChild] = useState({
      child_full_name: "",
      child_identity_number: "",
      child_phone_number: "",
      child_gender: "",
      child_dob: "",
      guardian_email: "",
      guardian_id: "",
      guardian_name: "",
      guardian_phone: "",
   });
   const [isGuardian, setIsGuardian] = useState(false);
   // const [loading, setLoading] = useState(true);
   // get child data
   useEffect(() => {
      const handleGetChildData = async () => {
         await getChildrenDataById(childId).then((res) => {
            console.log("🐱‍👤✨ ~ awaitgetChildrenDataById ~ res:", res);
            setIsLoading(true);
            if (res.success) {
               setChild({
                  child_full_name: res?.child?.child_full_name || "",
                  child_identity_number:
                     res?.child?.child_identity_number || "",
                  child_phone_number: res?.child?.child_phone_number || "",
                  child_gender: res?.child?.child_gender || "",
                  child_dob: res?.child?.child_dob || "",
                  guardian_email: res?.child?.guardian?.guardian_email || "",
                  guardian_id: res?.child?.guardian?.guardian_id || "",
                  guardian_name: res?.child?.guardian?.guardian_name || "",
                  guardian_phone: res?.child?.guardian?.guardian_phone || "",
               });

               //  setChild(res.children);
            } else {
               console.log(res.message || "something went wrong");
            }
            setIsLoading(false);
         });
      };
      handleGetChildData();
   }, []);

   //   ~ setting the guardian true/false
   useEffect(() => {
      const dob = new Date(child?.child_dob);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const isBirthdayPassed =
         today.getMonth() < dob.getMonth() ||
         (today.getMonth() === dob.getMonth() &&
            today.getDate() < dob.getDate());
      const childAge = isBirthdayPassed ? age - 1 : age;
      setIsGuardian(childAge < 18 ? true : false);
   }, [child.child_dob]);

   const handleInputChange = (event) => {
      const { id, value } = event.target;
      setChild((prevState) => ({ ...prevState, [id]: value }));
   };

   //   ~ handling update children
   const handleUpdateCHildren = async () => {
      const data = {
         child_full_name: child.child_full_name || "",
         child_identity_number: child.child_identity_number || "",
         child_phone_number: child.child_phone_number || "",
         child_gender: child.child_gender || "",
         child_dob: child.child_dob || "",
         guardian_email: child.guardian_email || "",
         guardian_id: child.guardian_id || "",
         guardian_name: child.guardian_name || "",
         guardian_phone: child.guardian_phone || "",
      };
      await updateChildren(childId, data).then((res) => {
         setUpdateLoading(true);
         if (res.success) {
            toast.success(res.message || "Updated Successfully!");
         } else {
            toast.error(res.message || "Failed to update children");
         }
         setUpdateLoading(false);
      });
   };

   return (
      <>
         <div className="update rounded-[8px] mx-2 sm:mx-7 px-7">
            {isLoading ? (
               <div className="flex items-center justify-center h-screen">
                  Loading ...
               </div>
            ) : (
               <>
                  <h2 className="py-6 text-white font-roboto font-[700] text-[18px]">
                     Update Child Details
                  </h2>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                     <Inputfield
                        type="text"
                        onChange={handleInputChange}
                        value={child.child_full_name}
                        id="child_full_name"
                        label={"FULL NAME"}
                        placeholder="Enter member full name"
                     />

                     <Inputfield
                        type="number"
                        onChange={handleInputChange}
                        id="child_identity_number"
                        value={child.child_identity_number}
                        label={"IDENTITY NUMBER"}
                        placeholder="Enter identity number"
                     />

                     <Inputfield
                        type="number"
                        onChange={handleInputChange}
                        id="child_phone_number"
                        value={child.child_phone_number}
                        label={"PHONE #"}
                        placeholder="Enter phone number"
                     />

                     <div>
                        <label
                           htmlFor="gender"
                           className="font-roboto text-[14px] font-[500] leading-[19.5px] text-white"
                        >
                           GENDER
                        </label>{" "}
                        <br />
                        <select
                           className="bg-[#0E1E39] text-[#B1B1B1]  w-[92%] px-5 py-[14px] mt-3 rounded-[8px] border-[1px] border-[#B4B3B3]"
                           id="child_gender"
                           onChange={handleInputChange}
                           value={child.child_gender}
                        >
                           <option value="Male">Male</option>
                           <option value="Female">Female</option>
                        </select>
                     </div>

                     <Inputfield
                        type="date"
                        id="child_dob"
                        onChange={handleInputChange}
                        value={
                           child.child_dob
                              ? new Date(child.child_dob)
                                   .toISOString()
                                   .substring(0, 10)
                              : ""
                        }
                        label={"DATE OF BIRTH"}
                        placeholder="Choose DOB"
                     />
                  </div>

                  {isGuardian && (
                     <div>
                        <h2 className="pt-6 text-white font-roboto font-[700] text-[18px] leading-6">
                           Guardian Details
                        </h2>
                        <hr className="mt-1 mb-8 hr_line" />
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                           <Inputfield
                              type="text"
                              id="guardian_name"
                              onChange={handleInputChange}
                              value={child.guardian_name}
                              label={"FULL NAME"}
                              placeholder="Enter guardian full name"
                           />
                           <Inputfield
                              type="number"
                              id="guardian_phone"
                              onChange={handleInputChange}
                              value={child.guardian_phone}
                              label={"PHONE #"}
                              placeholder="Enter guardian phone number"
                           />
                           <Inputfield
                              type="number"
                              id="guardian_id"
                              value={child.guardian_id}
                              onChange={handleInputChange}
                              label={"IDENTITY NUMBER"}
                              placeholder="Enter guardian identity number"
                           />
                           <Inputfield
                              type="email"
                              id="guardian_email"
                              onChange={handleInputChange}
                              value={child.guardian_email}
                              label={"EMAIL ADDRESS"}
                              placeholder="Enter guardian email address"
                           />
                        </div>
                     </div>
                  )}
                  <button
                     onClick={handleUpdateCHildren}
                     disabled={updateLoading}
                     className={`py-[14px] my-5 px-6 bg-[#0075FF] text-white font-roboto font-[700] text-[13px] leading-[19.5px] text-center rounded-[4px] ${
                        updateLoading && "cursor-not-allowed"
                     }`}
                  >
                     {updateLoading ? "Loading ..." : "UPDATE"}
                  </button>
               </>
            )}
         </div>
      </>
   );
};

function Inputfield({ onChange, label, value, id, placeholder, type }) {
   return (
      <div className="flex flex-col">
         <label
            htmlFor={id}
            className="font-roboto text-[14px] font-[500] leading-[19.5px] text-white"
         >
            {label}
         </label>

         <input
            type={type}
            id={id}
            onChange={onChange}
            value={value && value}
            placeholder={placeholder}
            className="max-w-[510px] w-full my-4 font-roboto text-[#B1B1B1] font-[400] text-[14px] leading-[19.5px] px-5 py-4 bg-[#0E1E39] rounded-[8px] border-[1px] border-[#B4B3B3]"
         />
      </div>
   );
}
