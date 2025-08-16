import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { addWish, deleteWish, getWishData } from "@/api/auth";
import { toast } from "react-toastify";

export const YourWishes = () => {
   const [showAddWishDialog, setShowAddWishDialog] = useState(false);
   const [wishTitle, setWishTitle] = useState("");
   const [wishSummary, setWishSummary] = useState("");
   const [wishes, setWishes] = useState([]);
   const [errors, setErrors] = useState({
      wishTitle: "",
      wishSummary: "",
   });
   const [loading, setLoading] = useState(true);
   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
   const [wishToDelete, setWishToDelete] = useState(null);

   // Get wishes
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

   // Delete wish
   const handleDeleteWish = async () => {
      if (!wishToDelete) return;
      try {
         const response = await deleteWish(wishToDelete);
         if (response.success) {
            toast.success(response.message || "Wish deleted successfully!");
            setWishes((prevWishes) =>
               prevWishes.filter((wish) => wish._id !== wishToDelete)
            );
         } else {
            console.error(response.message || "Failed to delete wish");
         }
      } catch (error) {
         toast.error(error.response?.data?.message || "Error deleting wish");
      } finally {
         setShowDeleteConfirmation(false); // Close the confirmation dialog
         setWishToDelete(null); // Clear the wish ID
      }
   };

   const confirmDeleteWish = (wishId) => {
      setWishToDelete(wishId);
      setShowDeleteConfirmation(true);
   };

   const handleUserWish = async (e) => {
      e.preventDefault();
      const userId = JSON.parse(localStorage.getItem("authUser"));

      const payload = {
         title: wishTitle,
         summary: wishSummary,
         userId: userId._id,
      };

      const newErrors = {};
      if (!wishTitle) {
         newErrors.wishTitle = "Title is required";
      }
      if (!wishSummary) {
         newErrors.wishSummary = "Summary is required";
      }
      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) return;

      try {
         const response = await addWish(payload);
         if (response.success) {
            toast.success(response.message || "Wish added successfully!");
            setWishTitle("");
            setWishSummary("");
            setErrors({});
            setShowAddWishDialog(false);
            setWishes((prevWishes) => [...prevWishes, response.wish]);
         } else {
            toast.error(response.message || "Failed to add wish");
         }
      } catch (error) {
         toast.error(error.response?.data?.message || "Error adding wish");
      }
   };

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      if (name === "wishTitle") setWishTitle(value);
      if (name === "wishSummary") setWishSummary(value);
   };

   const handleAddWishClick = () => {
      setShowAddWishDialog(true);
   };

   const handleAddWishCancel = () => {
      setShowAddWishDialog(false);
      setWishTitle("");
      setWishSummary("");
      setErrors({});
   };

   return (
      <div className="notification rounded-[8px] mx-2 sm:mx-7 py-9">
         <div className="flex flex-col sm:flex-row gap-y-4 items-center justify-between px-8 text-white">
            <h2 className="font-roboto text-center font-[700] text-[18px] leading-6">
               Your Wishes
            </h2>
            <button
               onClick={handleAddWishClick}
               className="text-nowrap max-w-fit font-roboto font-[700] text-[14px] leading-5 tracking-[4%] text-center py-[10.5px] px-[20px] bg-[#0075FF] rounded-[5px]"
            >
               ADD NEW WISH
            </button>
         </div>

         {loading ? (
            <div>Loading...</div>
         ) : (
            <div>
               {wishes.length !== 0 ? (
                  wishes.map((data, idx) => (
                     <div
                        key={idx}
                        className="over-liam my-6 px-3 sm:px-9 py-4 mx-2 sm:mx-5 rounded-[20px]"
                     >
                        <div className="flex flex-row gap-y-3 justify-between">
                           <div>
                              <h3 className="mx-1 text-white font-roboto text-[16px] font-medium leading-[22.4px]">
                                 {data.title}
                              </h3>
                              <hr className="hr_line my-2" />
                           </div>
                           <div
                              className="flex items-center gap-1 text-[#F53C2B] text-center cursor-pointer"
                              onClick={() => confirmDeleteWish(data._id)}
                           >
                              <MdDelete className="text-[16px]" />
                              <p className="font-roboto font-[500] text-[13px] leading truncate">
                                 DELETE
                              </p>
                           </div>
                        </div>
                        <p className="text-balance text-[#D0D0D0] font-roboto text-[14px] leading-6 my-5 truncate">
                           {data.summary}
                        </p>
                     </div>
                  ))
               ) : (
                  <p className="text-center text-white pt-[100px]">
                     No wishes found for this user!
                  </p>
               )}
            </div>
         )}

         {showAddWishDialog && (
            <div className="fixed inset-0 pop-up flex items-center justify-center mx-auto">
               <div className="pop-up p-6 rounded-[9px] bg-white w-full max-w-[580px]">
                  <div className="flex justify-between items-center mb-4 mx-[20px]">
                     <h3 className="font-roboto font-[600] text-[14px] leading-4 tracking-[2%] text-[#B1AFCD] text-left">
                        Add New Wish
                     </h3>
                     <i
                        className="text-[#D8A353] text-[20px] cursor-pointer"
                        onClick={handleAddWishCancel}
                     >
                        <RxCrossCircled />
                     </i>
                  </div>
                  <form onSubmit={handleUserWish} className="mx-[20px]">
                     <label className="font-roboto font-[600] text-[13px] leading-4 tracking-[2%] text-[#B66214] text-left mb-2">
                        TITLE
                     </label>
                     <input
                        name="wishTitle"
                        className="w-full mt-3 mb-4 py-[22px] text-white px-[20px] text-[14px] font-roboto font-[400] leading-5 border border-gray-300 rounded-[9px] pop-input"
                        placeholder="Give a title to your wish"
                        value={wishTitle}
                        onChange={handleInputChange}
                     />
                     {errors.wishTitle && (
                        <p className="text-red-500 text-sm">
                           {errors.wishTitle}
                        </p>
                     )}

                     <label className="font-roboto font-[600] text-[13px] leading-4 tracking-[2%] text-[#B66214] text-left mt-[25px]">
                        Wish Summary
                     </label>
                     <textarea
                        name="wishSummary"
                        className="w-full text-white mt-[10px] py-[22px] px-[20px] text-[14px] font-roboto font-[400] leading-5 border border-gray-300 rounded-[9px] pop-input"
                        placeholder="Write your wish here...."
                        value={wishSummary}
                        onChange={handleInputChange}
                     />
                     {errors.wishSummary && (
                        <p className="text-red-500 text-sm">
                           {errors.wishSummary}
                        </p>
                     )}

                     <div className=" mt-[20px]">
                        <button
                           type="submit"
                           className="text-white font-roboto font-[700] text-[14px] leading-5 tracking-[4%] text-center py-[10.5px] px-[20px] bg-[#0075FF] rounded-[5px]"
                        >
                           ADD WISH
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}

         {showDeleteConfirmation && (
            <div className="fixed inset-0 pop-up flex items-center justify-center mx-auto">
               <div className="pop-up p-6 rounded-[9px] bg-white w-full  max-w-[400px]">
                  <h3 className="font-roboto pt-10 font-[600] text-[14px] leading-4 tracking-[2%] text-white text-center mb-4">
                     Are you sure you want to delete this wish?
                  </h3>
                  <div className="flex justify-center items-center gap-8 pb-9 pt-3">
                     <button
                        className="font-roboto font-[700] text-[14px] leading-5 tracking-[4%] text-center py-2 px-6 bg-[#0075FF] text-white rounded-[5px]"
                        onClick={handleDeleteWish}
                     >
                        Yes
                     </button>
                     <button
                        className="font-roboto font-[700] text-[14px] leading-5 tracking-[4%] text-center py-2 px-6 bg-[#334C68] text-white rounded-[5px]"
                        onClick={() => setShowDeleteConfirmation(false)}
                     >
                        No
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};
