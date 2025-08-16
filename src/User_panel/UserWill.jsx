import {
   getChildData,
   getUserdata,
   getWillSummary,
   getWishData,
} from "@/api/auth";
import React, { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
import { UserContext } from "@/context/ContextProvider";

export const UserWill = () => {
   const [userData, setUserData] = useState({
      identity_number: "",
      father_name: "",
      mother_name: "",
      phone_number: "",
      dob: "",
      gender: "",
      full_name: "",
      email: "",
   });
   const [summary, setSummary] = useState(null);
   const [loading, setLoading] = useState(true);
   const [wishes, setWishes] = useState([]);
   const [child, setChild] = useState([]);
   const { profilePicture } = useContext(UserContext);
   const willRef = useRef(); //for download
   // Get wish data
   useEffect(() => {
      const handleGetWishData = async () => {
         setLoading(true);
         try {
            const response = await getWishData();
            if (response.success) {
               setWishes(response.wishes);
            } else {
               toast.error(response.message);
            }
         } catch (error) {
            toast.error("Failed to fetch wishes");
         } finally {
            setLoading(false);
         }
      };
      handleGetWishData();
   }, []);
   // get will summary
   useEffect(() => {
      const fetchSummary = async () => {
         setLoading(true);
         const result = await getWillSummary();
         if (result.success) {
            setSummary(result.summaries || []);
         } else {
            setSummary(result.message || []);
         }
         setLoading(false);
      };

      fetchSummary();
   }, []);

   useEffect(() => {
      const userData = async () => {
         try {
            const res = await getUserdata();
            if (res.success) {
               setUserData({
                  full_name: res.user.user.full_name || "",
                  email: res.user.user.email || "",
                  identity_number: res.user.user.identity_number || "",
                  father_name: res.user.user.father_name || "",
                  mother_name: res.user.user.mother_name || "",
                  phone_number: res.user.user.phone_number || "",
                  gender: res.user.user.gender || "",
                  dob: res.user.user.dob || "",
               });
            } else {
               toast.error(res.message);
            }
         } catch (error) {
            console.error("Error fetching user data", error);
            toast.error("Failed to fetch user data");
         }
      };
      userData();
   }, []);
   //~ get child data
   const handleGetChildData = async () => {
      setLoading(true);
      await getChildData().then((res) => {
         if (res.success) {
            setChild(res.children);
         } else {
            console.log(res.message || "something went wrong");
         }
         setLoading(false);
      });
   };
   useEffect(() => {
      handleGetChildData();
   }, []);

   const downloadWill = () => {
      try {
         const pdf = new jsPDF("p", "mm", "a4");
         let y = 10;

         // Add user details
         pdf.setFontSize(16);
         pdf.text("Personal Details", 105, y, { align: "center" });
         y += 10;
         pdf.setFontSize(12);
         pdf.text(`Full Name: ${userData.full_name}`, 10, y);
         y += 7;
         pdf.text(`Email: ${userData.email}`, 10, y);
         y += 7;
         pdf.text(`Identity Number: ${userData.identity_number}`, 10, y);
         y += 7;
         pdf.text(`Father's Name: ${userData.father_name}`, 10, y);
         y += 7;
         pdf.text(`Mother's Name: ${userData.mother_name}`, 10, y);
         y += 7;
         pdf.text(`Phone Number: ${userData.phone_number}`, 10, y);
         y += 7;
         pdf.text(`Date of Birth: ${userData.dob}`, 10, y);
         y += 7;
         pdf.text(`Gender: ${userData.gender}`, 10, y);
         // Add a space between sections
         y += 10;
         // Add wishes
         pdf.setFontSize(16);
         pdf.text("My Wishes", 105, y, { align: "center" });
         y += 10;
         pdf.setFontSize(12);
         wishes.forEach((wish, index) => {
            pdf.text(`${index + 1}. ${wish.title}`, 10, y);
            y += 7;
            pdf.text(`   Summary: ${wish.summary}`, 10, y);
            y += 10;
         });
         // Add child details
         y += 10;
         pdf.setFontSize(16);
         pdf.text("Child Details", 105, y, { align: "center" });
         y += 10;
         pdf.setFontSize(12);
         child.forEach((item, index) => {
            pdf.text(`${index + 1}. ${item.child_full_name}`, 10, y);
            y += 7;
            pdf.text(
               `   Assets: ${item.assignedAssetId
                  .map((asset) => asset.name || asset.assetType)
                  .join(", ")}`,
               10,
               y
            );
            y += 10;
         });
         // Add ending notes
         y += 10;
         pdf.setFontSize(16);
         pdf.text("My Ending Notes", 105, y, { align: "center" });
         y += 10;
         pdf.setFontSize(12);
         pdf.text(summary[0]?.will_summary || "No ending notes found.", 10, y, {
            maxWidth: 190,
         });

         // Save the PDF
         pdf.save("Will_Details.pdf");
      } catch (error) {
         console.error("Error generating PDF: ", error);
      }
   };

   return (
      <>
         <div ref={willRef} className=" container px-2 sm:px-4">
            <div className="user_details my-8 flex flex-col items-center justify-between rounded-[20px] bg-gray-800 px-4 py-6 md:flex-row">
               <div className="flex items-center">
                  <img
                     src={profilePicture || "/Person.svg"}
                     alt="User"
                     className=" max-w-[65px]  object-cover w-full rounded-[12px]"
                  />
                  <div className="ml-4">
                     <h3 className="font-roboto text-[18px] font-[600] leading-[25.2px] text-white">
                        {userData?.full_name}
                     </h3>
                     <p className="font-roboto text-[14px] font-normal leading-6 text-[#B66214]">
                        {userData?.email}
                     </p>
                  </div>
               </div>
               <button
                  onClick={downloadWill}
                  className="font-roboto mt-4 rounded-[4px] bg-[#0075FF] px-4 py-3 text-xs font-bold leading-4 tracking-wide text-white md:mt-0"
               >
                  DOWNLOAD WILL
               </button>
            </div>
            <div className="flex flex-col justify-between space-y-4 sm:mx-7 lg:flex-row lg:space-x-4 lg:space-y-0">
               <div className="w-full lg:w-1/2">
                  <div className="personal_details rounded-[20px] ">
                     <h1 className="font-roboto py-6 text-center text-[18px] font-bold leading-[25.2px] text-white">
                        Personal Details
                        <hr className="hr_line mx-auto my-4 max-w-[35%]" />
                     </h1>
                     <div className="divide-y divide-[#56577A]">
                        <Detail title="IDENTITY NUMBER" value="2357-362-788" />
                        <Detail
                           title="FATHER NAME"
                           value={userData?.father_name}
                        />
                        <Detail
                           title="MOTHER NAME"
                           value={userData?.mother_name}
                        />
                        <Detail title="PHONE #" value="+91 27788736" />
                        <Detail title="DATE OF BIRTH" value={userData?.dob} />
                        <Detail
                           title="GENDER"
                           value={userData?.gender.toUpperCase()}
                        />
                     </div>
                  </div>
                  {/* Wishes Section */}
                  <div className="personal_details my-4 rounded-[20px]  px-9 py-12">
                     <h2 className="font-roboto text-center text-[18px] font-bold leading-[25.2px] text-white">
                        My Wishes
                     </h2>
                     <hr className="hr_line mx-auto my-4 max-w-[35%]" />
                     {loading ? (
                        <p className="text-[#A1A1A1] font-roboto font-[400] text-[16px] leading-[21px]">
                           Loading wishes...
                        </p>
                     ) : (
                        <>
                           {wishes &&
                              wishes.slice(0, 2).map((wish, idx) => (
                                 <div key={idx}>
                                    <MyWishes data={wish} />
                                 </div>
                              ))}
                        </>
                     )}
                     <Link to="/user-dashboard/your_wishes">
                        <p className="text-center text-blue-800 cursor-pointer underline text-[14px] font-roboto">
                           Read More
                        </p>
                     </Link>
                  </div>
               </div>

               <div className="user-will w-full rounded-[20px] bg-gray-800 px-9 py-3 lg:w-1/2 lg:max-w-[572px]">
                  <h3 className="font-roboto text-center text-[18px] font-bold leading-[25.2px] text-white">
                     Child Details
                  </h3>
                  <hr className="hr_line mx-auto my-[15px] mb-9 max-w-[35%]" />
                  {child && child.length > 0 ? (
                     <>
                        {child?.map((item, idx) => {
                           return (
                              <ChildDetails
                                 key={idx}
                                 asset={
                                    item?.child_full_name +
                                    " " +
                                    item?.child_identity_number
                                 }
                                 info={`${item?.child_full_name} has been assigned with the following assets.`}
                                 list={item?.assignedAssetId}
                              />
                           );
                        })}
                     </>
                  ) : (
                     <div className="flex items-center justify-center w-full h-auto text-base font-semibold text-white">
                        No Child Data
                     </div>
                  )}
               </div>
            </div>
            {/* ending notes */}
            <div className="user_details my-5 text-balance text-[#FFFFFF] mx-9 rounded-[20px] px-[47px]">
               <h1 className="text-center font-roboto font-[700] text-[18px] leading-6 pt-[30px]">
                  My Ending Notes
               </h1>
               <hr className="hr_line mx-auto my-4 max-w-[220px]" />
               <p className="text-balance text-[#A1A1A1] text-[14px] font-[400] font-roboto py-6">
                  {loading ? (
                     "Loading..."
                  ) : (
                     <>
                        {summary && summary !== null
                           ? summary[0]?.will_summary
                           : "no summary found"}
                     </>
                  )}
               </p>
            </div>
         </div>
      </>
   );
};

// Reusable function for personal details
function Detail({ title, value }) {
   return (
      <div className="flex justify-between p-5 mx-3">
         <h3 className="text-[#B66214] font-roboto text-[14px] font-normal leading-[21px]">
            {title}
         </h3>
         <p className="text-white font-roboto text-base font-medium leading-[21px]">
            {value}
         </p>
      </div>
   );
}

// Reusable function for child details
function ChildDetails({ asset, info, list }) {
   return (
      <div className="my-6">
         <h3 className="text-white font-roboto text-[16px] font-[500] leading-[22.4px]">
            {asset}
         </h3>
         <hr className="hr_line max-w-[70%] my-4" />
         <p className="font-roboto text-[14px] text-[#A1A1A1] font-normal leading-[21px]">
            {info}
         </p>
         {list &&
            list.map((item, idx) => {
               return (
                  <ul className="py-1 list-disc px-7" key={idx}>
                     <li
                        key={idx}
                        className="font-roboto text-[14px] text-[#A1A1A1] font-normal leading-[21px]"
                     >
                        {item.name || item.assetType}
                     </li>
                  </ul>
               );
            })}
      </div>
   );
}
// Reusable function for wishes
function MyWishes({ data }) {
   return (
      <div className="py-4">
         <h3 className="text-white font-roboto font-[500] text-[16px] leading-[22.4px]">
            {data?.title || "Wish title"}
         </h3>
         <hr className="hr_line max-w-[35%] my-4" />
         <p className="text-[#A1A1A1] font-roboto font-[400] text-[16px] leading-[21px] py-2">
            {data?.summary || "You"}
         </p>
      </div>
   );
}
