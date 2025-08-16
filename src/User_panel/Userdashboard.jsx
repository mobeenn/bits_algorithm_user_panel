import { getDashboardData, getUserdata, willSignature } from "@/api/auth";
import { useContext, useEffect, useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaArrowRight, FaChildren, FaHouseChimneyUser } from "react-icons/fa6";
import { IoPersonCircleSharp } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { Link } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import { toast } from "react-toastify";
import { notifications } from "../lib/data";
import { UserContext } from "@/context/ContextProvider";

export const Userdashboard = () => {
   const [showPopup, setShowPopup] = useState(false);
   const [showSignaturePopup, setShowSignaturePopup] = useState(false);
   const [dashboardData, setDashboardData] = useState(null);
   const { userName, profilePicture, userEmail } = useContext(UserContext);
   const [signatureLoading, setSignatureLoading] = useState(false);

   const signatureRef = useRef(null);

   const [userData, setUserData] = useState({
      full_name: userName || "",
      email: userEmail || "",
   });

   useEffect(() => {
      const userData = async () => {
         try {
            const res = await getUserdata();
            if (res.success) {
               setUserData({
                  full_name: res.user.user.full_name || "",
                  email: res.user.user.email || "",
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

   const handleViewReasonClick = () => {
      setShowPopup(true);
   };

   const okPopup = () => {
      setShowPopup(false);
   };

   const handleSignaturePopupOpen = () => {
      setShowSignaturePopup(true);
   };

   const handleSignaturePopupClose = () => {
      setShowSignaturePopup(false);
   };

   // ~ get the dashboard data
   useEffect(() => {
      const handleGetDashboardData = async () => {
         await getDashboardData().then((res) => {
            if (res.success) {
               setDashboardData(res);
            } else {
               console.log("Dashboard Data:", res.message);
            }
         });
      };

      handleGetDashboardData();
   }, []);

   //   ~ saving the will signature for the user
   const handleSubmitWill = async () => {
      setSignatureLoading(true);
      const signatureCanvas = signatureRef.current;
      const signatureDataURL = signatureCanvas.toDataURL();

      // Convert data URL to Blob
      const response = await fetch(signatureDataURL);
      const blob = await response.blob();

      // Create a new FormData instance
      const formData = new FormData();
      formData.append("file", blob, "will_signature.png"); // Append the blob as a file

      // Saving the signature to the DB
      await willSignature(formData).then((res) => {
         console.log("🐱‍👤✨ ~ awaitwillSignature ~ res:", res);
         if (res.success) {
            toast.success(res.message || "Signature saved successfully");
         } else {
            toast.error(res.message || "Failed to save signature");
         }
         setSignatureLoading(false);
         setShowSignaturePopup();
      });
   };

   // ~ review signature will
   const handleReviewSignature = async () => {
      const signatureCanvas = signatureRef.current;
      const signatureDataURL = signatureCanvas.toDataURL();

      // Save the signature image (optional)
      saveAs(signatureDataURL, "will_signature.png");

      // console.log(
      //   "🐱‍👤✨ ~ handleSubmitWill ~ signatureDataURL:",
      //   signatureDataURL || "no image data"
      // );
   };

   return (
      <>
         <div className="user_details flex flex-col sm:flex-row gap-y-5 justify-between items-center my-3 mx-2 sm:mx-7 rounded-[20px] px-4 py-6">
            <div className="flex items-center justify-between">
               <img
                  src={profilePicture || "/Person.svg"}
                  alt="picture"
                  className="rounded-[12px] h-[10vh] w-[10vh] object-fit"
               />
               <h3 className="text-white mx-4 font-roboto text-[18px] font-[600] leading-[25.2px]">
                  {userData.full_name}
                  <p className="text-[#B66214] font-roboto text-[14px] font-normal leading-6 ">
                     {userData.email}
                  </p>
               </h3>
            </div>
            <div className="flex items-center gap-3 text-white font-roboto font-[500] text-[16px] leading-5 mx-4">
               <p>Will Status:</p>
               <p className="text-[#D6A04E]">
                  {dashboardData?.willStatus === true
                     ? "SUBMITTED"
                     : "DRAFTED" || "DRAFTED"}
               </p>
            </div>
         </div>

         {/* summary */}
         <div className="flex flex-col gap-y-2 xl:flex-row gap-[58px] mx-2 sm:mx-7">
            <div className="bg-[#060B26] rounded-[20px]  xl:max-w-[369px] w-full p-9">
               <h1 className="font-roboto font-[700] text-[30px] leading-8 text-white text-nowrap">
                  Welcome back!
               </h1>
               <p className="font-roboto font-[400] text-[14px] leading-8 text-white text-nowrap">
                  Nice to see you, {userData?.full_name || "User Name"}
               </p>
            </div>
            <div className="mx-auto">
               <div className="flex flex-col items-center gap-12 gap-y-3 md:flex-row ">
                  <div>
                     <div className="font-roboto text-[white] leading-6 my-2 sm:my-8">
                        <h2 className="font-[700] text-[18px]">Will Summary</h2>
                        <p className="text-[#E0B82B] text-nowrap font-[400] text-[14px]">
                           Complete your will and submit for review.
                        </p>
                        {/* progressbar */}
                        <div className="mx-auto w-[200px] mt-4 sm:mt-12 bg-[#0B0E2EBD] rounded-full">
                           <div className="mx-auto progress-container">
                              <svg width="0" height="0">
                                 <defs>
                                    <linearGradient
                                       id="gradient"
                                       gradientTransform="rotate(90)"
                                    >
                                       <stop
                                          offset="0%"
                                          stopColor="rgba(5, 205, 153, 0)"
                                       />
                                       <stop
                                          offset="92.23%"
                                          stopColor="#05CD99"
                                       />
                                    </linearGradient>
                                 </defs>
                              </svg>
                              <CircularProgressbar
                                 value={dashboardData?.percentage || 0}
                                 styles={buildStyles({
                                    rotation: 0.55,
                                    pathColor: "url(#gradient)",
                                 })}
                              />
                              <div className="progress-text">
                                 <p className="font-roboto leading-12 ml-5 my-5 text-[50px] font-[700] text-[#FFFFFF]">
                                    {dashboardData?.percentage || 0}%
                                 </p>
                                 <p className="font-roboto text-[14px] font-[500] leading-4 text-[#B66214]">
                                    Completed
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="mx-auto">
                     <div className="flex flex-col justify-center gap-2 sm:flex-row sm:gap-12">
                        <Link to="/user-dashboard/user_will">
                           <button className=" text-nowrap btn-submit-will  text-[white] font-roboto font-[700] text-[14px] leading-5 tracking-[6%]  text-center p-4 rounded-[5px]">
                              VIEW THE WILL
                           </button>
                        </Link>
                        <button
                           disabled={dashboardData?.percentage < 100}
                           onClick={handleSignaturePopupOpen}
                           className={`text-nowrap btn-submit-will  text-[white] font-roboto font-[700] text-[14px] leading-5 tracking-[6%] text-center p-4 rounded-[5px] disabled:cursor-not-allowed`}
                        >
                           SUBMIT THE WILL
                        </button>
                     </div>
                     <div className="sm:ml-[250px] mx-12 mb-4 sm:mb-9"></div>
                     <div className="flex flex-col items-center gap-6 sm:flex-row text-nowrap">
                        <div className="space-y-4">
                           <div className="text-white bg-gradient py-2 px-4 rounded-[20px] w-full max-w-[200px]">
                              <div className="flex items-center gap-10">
                                 <div>
                                    <Link to="user_details">
                                       <h4 className="font-roboto font-[500] text-[14px] leading-4">
                                          Child Details
                                       </h4>
                                       <FaArrowRight className="mt-[6px] text-[#D8A353] text-[12px]" />
                                    </Link>
                                 </div>

                                 <i className="p-3 bg-[#0075FF] rounded-[12px] text-[25px] cursor-pointer">
                                    <Link to="user_details">
                                       <FaChildren />
                                    </Link>
                                 </i>
                              </div>
                           </div>
                           <div className="text-white bg-gradient py-2 px-4 rounded-[20px] w-full max-w-[200px]">
                              <div className="flex items-center gap-10">
                                 <div>
                                    <Link to="trust_details">
                                       <h4 className="font-roboto font-[500] text-[14px] leading-4">
                                          Trust Details
                                       </h4>
                                       <FaArrowRight className="text-[#D8A353] text-[12px] mt-[6px]" />
                                    </Link>
                                 </div>

                                 <i className="p-3 bg-[#0075FF] rounded-[12px] text-[25px] cursor-pointer">
                                    <Link to="details">
                                       <VscWorkspaceTrusted />
                                    </Link>
                                 </i>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-4">
                           <div className="text-white bg-gradient py-2 px-4 rounded-[20px] w-full max-w-[220px]">
                              <div className="flex items-center justify-between gap-10">
                                 <div>
                                    <Link to="my_asset">
                                       <h4 className="font-roboto font-[500] text-[14px] leading-4">
                                          Assets
                                       </h4>
                                       <FaArrowRight className="text-[#D8A353] text-[12px] mt-[6px]" />
                                    </Link>
                                 </div>
                                 <i className="p-3 bg-[#0075FF] rounded-[12px] text-[22px] cursor-pointer">
                                    <Link to="my_asset">
                                       <FaHouseChimneyUser />
                                    </Link>
                                 </i>
                              </div>
                           </div>
                           <div className="text-white bg-gradient py-2 px-4 rounded-[20px] w-full max-w-[220px]">
                              <div className="flex items-center gap-10">
                                 <div>
                                    <Link to="executer_details">
                                       <h4 className="font-roboto font-[500] text-[14px] leading-4">
                                          Executor
                                       </h4>
                                       <FaArrowRight className="text-[#D8A353] text-[12px] mt-[6px]" />
                                    </Link>
                                 </div>
                                 <i className="p-3 bg-[#0075FF] rounded-[12px] ml-4 text-[25px] cursor-pointer">
                                    <Link to="executer_details">
                                       <IoPersonCircleSharp />
                                    </Link>
                                 </i>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* notifications */}
         <div className="notification rounded-[9.23px] mx-2 sm:mx-7 my-4 px-8 py-5">
            <h3 className="text-white font-roboto font-[500] text-[11.07px] leading-[12.97px] tracking-[2%] py-2">
               NOTIFICATIONS
            </h3>
            {notifications.map((notification, index) => (
               <NotificationItem
                  key={index}
                  title={notification.title}
                  message={notification.message}
                  time={notification.time}
                  isRejected={notification.isRejected}
                  onViewReasonClick={() =>
                     handleViewReasonClick(notification.reason)
                  }
               />
            ))}
         </div>
         {/* rejected pop reason */}
         {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center pop-up pop-input">
               <div className="pop-up p-8 text-center rounded-[9px] w-full max-w-[466px]">
                  <div className="flex items-center justify-between">
                     <h3 className="text-[#B1AFCD] text-[14px] font-roboto font-[600] leading-4 tracking-[2%]">
                        Asset rejected
                     </h3>
                     <i
                        onClick={okPopup}
                        className="text-[#D8A353] text-[20px] cursor-pointer"
                     >
                        <RxCrossCircled />
                     </i>
                  </div>
                  <h4 className="mt-[67px] font-roboto font-[400] text-[14px] leading-5 tracking-[2%] text-[#FFFFFF] mb-4">
                     Asset Rejection Reason Will Goes Here. That Will Come Admin
                     Panel.
                  </h4>

                  <button
                     onClick={okPopup}
                     className=" my-[30px] font-roboto font-[700] text-[14px] tracking-[4%] px-12 py-2 bg-[#0075FF] text-white rounded-[4px]"
                  >
                     OK
                  </button>
               </div>
            </div>
         )}
         {/* submit will signature */}
         {showSignaturePopup && (
            <div className="fixed inset-0 flex items-center justify-center pop-input sm:mx-2 ">
               <div className="pop-up p-8 text-center rounded-[9px] w-full max-w-[466px]">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="text-[#B1AFCD] text-[14px] font-roboto font-[600] leading-4 tracking-[2%]">
                        Sign the Will
                     </h3>
                     <i
                        onClick={handleSignaturePopupClose}
                        className="text-[#D8A353] text-[20px] cursor-pointer"
                     >
                        <RxCrossCircled />
                     </i>
                  </div>
                  <h4 className="my-4 font-roboto font-[400] text-[14px] leading-5 tracking-[2%] text-white text-left">
                     Signature
                  </h4>
                  <div className="mb-6 border border-gray-300 p-4 rounded-[5px]">
                     <SignatureCanvas
                        ref={signatureRef}
                        penColor="black"
                        canvasProps={{
                           width: 370,
                           height: 200,
                           className: "sigCanvas bg-white",
                        }}
                     />
                  </div>
                  <div className="flex justify-center gap-4">
                     {/* <button
                onClick={handleSignaturePopupClose}
                className="font-roboto font-[700] text-[14px] tracking-[4%] px-8 py-2 bg-[#0075FF] text-white rounded-[4px]"
              >
                SUBMIT
              </button> */}
                     <button
                        disabled={
                           dashboardData?.percentage < 100 || signatureLoading
                        }
                        onClick={handleSubmitWill}
                        className={`text-nowrap btn-submit-will  text-[white] font-roboto font-[700] text-[14px] leading-5 tracking-[6%] text-center p-4 rounded-[5px] disabled:cursor-not-allowed`}
                     >
                        {signatureLoading ? "Loading ..." : "SUBMIT THE WILL"}
                     </button>
                     <button
                        onClick={handleReviewSignature}
                        className="font-roboto font-[700] text-[14px] tracking-[4%] px-8 py-2 bg-[#D8A353] text-white rounded-[4px]"
                     >
                        REVIEW
                     </button>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

function NotificationItem({
   title,
   message,
   time,
   isRejected,
   onViewReasonClick,
}) {
   return (
      <div className="border-t-[1px] border-[#56577A] my-3">
         <h4 className="text-[#d0cdcd] font-roboto font-[700] text-[14px] leading-[16.41px] pt-5">
            {title}
         </h4>
         <p className="flex text-[#59588D] font-roboto font-[400] text-[14px] leading-[16.41px] pt-2">
            {message}
            {isRejected && (
               <span
                  onClick={onViewReasonClick}
                  className="text-[#D8A353] cursor-pointer ml-2"
               >
                  View Reason
               </span>
            )}
         </p>
         <p className="text-[#59588D] font-roboto font-[400] text-[12px] leading-[14.06px] py-2">
            {time}
         </p>
      </div>
   );
}
