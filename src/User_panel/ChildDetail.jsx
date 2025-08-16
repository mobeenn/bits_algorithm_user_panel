import { getAllAssetsList } from "@/api/assetApi";
import { deleteChild, getChildData } from "@/api/auth";
import { assignChildAssets, deleteChildAssets } from "@/api/childApi";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
export const ChildDetail = () => {
   const [isPopupVisible, setIsPopupVisible] = useState(false);
   const [showPopup, setShowPopup] = useState(false);
   const [selectedTitle, setSelectedTitle] = useState("");
   const [showAsset, setAssetPopup] = useState(false);

   const [child, setChild] = useState(null);
   const [assetsList, setAssetsList] = useState(null);
   const [loading, setLoading] = useState(true);
   const [selectedChild, setSelectedChild] = useState(null);
   const [selectedAsset, setSelectedAsset] = useState(null);
   const [assetToDelete, setAssetToDelete] = useState(null);

   let userId = localStorage.getItem("userId") || "";
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

   // ~ getting the user assets details
   useEffect(() => {
      const handleGetAssetsList = async () => {
         setLoading(true);
         await getAllAssetsList(userId).then((res) => {
            if (res.success) {
               setAssetsList(res.allAssetsList);
               setSelectedAsset(res.allAssetsList[0] || null);
            } else {
               console.log(res.message || "something went wrong");
               setAssetsList(null);
            }
            setLoading(false);
         });
      };

      handleGetAssetsList();
   }, [userId]);

   const handleDeleteClick = (data) => {
      setSelectedChild(data);
      setSelectedTitle(data?.child_full_name);
      setIsPopupVisible(true);
   };

   const handleConfirmDelete = async () => {
      // ~ deleting the selected child
      await deleteChild(selectedChild._id).then((res) => {
         if (res.success) {
            toast.success(res.message || "Child deleted successfully");
            handleGetChildData();
         } else {
            toast.error(res.message || "Error deleting child");
         }
      });

      setIsPopupVisible(false);
   };
   const handleCancelDelete = () => {
      setIsPopupVisible(false);
   };
   const handleAssignAssetClick = (data) => {
      setSelectedChild(data);
      setShowPopup(true);
   };

   // ~ assigning the asset to the child
   const handleAssignChildAsset = async () => {
      const data = {
         childId: selectedChild._id,
         assetId: selectedAsset._id,
      };
      await assignChildAssets(data).then((res) => {
         if (res.success) {
            toast.success(res.message || "Assets assigned successfully");
            handleGetChildData();
         } else {
            toast.error(res.message || "Error assigning assets");
         }
      });
      setShowPopup(false);
   };
   const handleClosePopup = async () => {
      setShowPopup(false);
   };
   // delete asset pop up
   const handleConfirmDeleteAsset = (data, asset) => {
      setSelectedChild(data);
      setSelectedTitle(asset.name || asset.assetType);
      setAssetToDelete(asset || null);
      setAssetPopup(true);
   };

   const handleCloseAsset = () => {
      setAssetPopup(false);
   };

   // ~ handle delete asset for child
   const handleDeleteAsset = async () => {
      const data = {
         childId: selectedChild._id,
         assetId: assetToDelete._id,
      };
      await deleteChildAssets(data).then((res) => {
         if (res.success) {
            toast.success(res.message || "Asset deleted successfully");
            handleGetChildData();
         } else {
            toast.error(res.message || "Error deleting asset");
         }
      });
      setAssetPopup(false);
   };
   return (
      <>
         <div className="notification rounded-[8px] mx-7">
            <div className="flex flex-col items-center justify-between px-8 text-white md:flex-row py-9">
               <h2 className="font-roboto font-[700] text-[18px] leading-6 mb-4 md:mb-0">
                  {`Child's Detail`}
               </h2>
               <Link to="/user-dashboard/new_child">
                  <button className="font-roboto font-[700] text-[14px] leading-5 tracking-[4%] text-center py-[12.5px] px-[30px] bg-[#0075FF] rounded-[5px]">
                     ADD CHILD
                  </button>
               </Link>
            </div>
            {/* child start here  */}
            {loading ? (
               <div>Loading...</div>
            ) : (
               <div>
                  {child && child.length !== 0 ? (
                     <>
                        {child?.map((data, idx) => {
                           // Calculate the child's age based on the DOB
                           const dob = new Date(data.child_dob);
                           const today = new Date();
                           const age = today.getFullYear() - dob.getFullYear();
                           const isBirthdayPassed =
                              today.getMonth() < dob.getMonth() ||
                              (today.getMonth() === dob.getMonth() &&
                                 today.getDate() < dob.getDate());
                           const childAge = isBirthdayPassed ? age - 1 : age;

                           return (
                              <div
                                 key={idx}
                                 className="over-liam my-6 px-9 py-4 flex flex-wrap justify-between mx-5 rounded-[20px]"
                              >
                                 <div className="w-full mb-6 md:w-1/2 lg:w-auto md:mb-0">
                                    <h3 className="mx-1 text-white font-roboto text-[16px] font-medium leading-[22.4px]">
                                       {data?.child_full_name || "unknown"}
                                    </h3>
                                    <hr className="mt-1 hr_line" />
                                    <div className="flex items-center my-9">
                                       <div>
                                          <DataRow
                                             title="Identity Number:"
                                             value={
                                                data?.child_identity_number ||
                                                "unknown"
                                             }
                                          />
                                          <DataRow
                                             title="Phone #: "
                                             value={
                                                data?.child_phone_number ||
                                                "unknown"
                                             }
                                          />
                                          <DataRow
                                             title="DOB:"
                                             value={
                                                data?.child_dob
                                                   ? new Date(data.child_dob)
                                                        .toISOString()
                                                        .substring(0, 10)
                                                   : "" || "unknown"
                                             }
                                          />
                                          <DataRow
                                             title="Gender:"
                                             value={
                                                data.child_gender || "unknown"
                                             }
                                          />
                                       </div>
                                    </div>
                                 </div>

                                 {/* Show Guardian Details only if child is 18 years old or younger */}
                                 {childAge <= 18 && (
                                    <div className="w-full mb-6 md:w-1/2 lg:w-auto md:mb-0">
                                       <h3 className="mx-1 text-white font-roboto text-[16px] font-medium leading-[22.4px]">
                                          Guardian Details
                                       </h3>
                                       <hr className="mt-1 hr_line" />
                                       <div className="flex items-center my-9">
                                          <div>
                                             <DataRow
                                                title="Full Name:"
                                                value={
                                                   data.guardian
                                                      .guardian_name ||
                                                   "unknown"
                                                }
                                             />
                                             <DataRow
                                                title="Identity Number:"
                                                value={
                                                   data.guardian.guardian_id ||
                                                   "unknown"
                                                }
                                             />
                                             <DataRow
                                                title="Email Address:"
                                                value={
                                                   data.guardian
                                                      .guardian_email ||
                                                   "unknown"
                                                }
                                             />
                                             <DataRow
                                                title="Phone #:"
                                                value={
                                                   data.guardian
                                                      .guardian_phone ||
                                                   "unknown"
                                                }
                                             />
                                          </div>
                                       </div>
                                    </div>
                                 )}

                                 {/* ~ assigned asset list */}
                                 {data.assignedAssetId &&
                                    data.assignedAssetId.length !== 0 && (
                                       <div className="w-full mb-6 md:w-1/2 lg:w-auto md:mb-0">
                                          <h3 className="mr-20 text-white font-roboto text-[16px] font-medium leading-[22.4px]">
                                             Assigned Assets
                                          </h3>
                                          <hr className="mt-1 hr_line" />
                                          <ul className="text-[white] list-disc font-roboto font-[400] text-[14px] leading-[30px] mt-9 mx-3">
                                             {data?.assignedAssetId.map(
                                                (asset, idx) => (
                                                   <p
                                                      key={idx}
                                                      className="max-w-24 flex items-center justify-between gap-[31px]"
                                                   >
                                                      <li>
                                                         {" "}
                                                         {asset.name ||
                                                            asset.assetType}
                                                      </li>
                                                      <MdDelete
                                                         onClick={() =>
                                                            handleConfirmDeleteAsset(
                                                               data,
                                                               asset
                                                            )
                                                         }
                                                         className="text-[red] text-[18px] cursor-pointer"
                                                      />
                                                   </p>
                                                )
                                             )}
                                          </ul>
                                       </div>
                                    )}

                                 {/* add assign for child */}
                                 <div className="flex flex-col items-center w-full md:w-1/2 lg:w-auto">
                                    <button
                                       onClick={() =>
                                          handleAssignAssetClick(data)
                                       }
                                       className="font-roboto font-[700] text-[14px] text-[white] leading-5 tracking-[4%] text-center px-4 py-1 rounded-[4px] border-[1px] border-[#08BF72]"
                                    >
                                       Assign Asset
                                    </button>
                                    <div className="flex gap-[22px] mt-[131px]">
                                       <button
                                          onClick={() =>
                                             handleDeleteClick(data)
                                          }
                                          className="flex items-center gap-[2px] text-[#F53C2B] text-[15px] cursor-pointer"
                                       >
                                          <MdDelete />
                                          <p>DELETE</p>
                                       </button>
                                       {/* link to edit page */}
                                       <Link
                                          to={`/user-dashboard/edit-child?childId=${data._id}`}
                                       >
                                          <span className="flex items-center gap-[6px] cursor-pointer">
                                             <MdEdit className="text-white" />
                                             <p className="text-[#B66214] font-[500] text-[15px]">
                                                EDIT
                                             </p>
                                          </span>
                                       </Link>
                                    </div>
                                 </div>
                              </div>
                           );
                        })}
                     </>
                  ) : (
                     <div>Not Data Found</div>
                  )}
               </div>
            )}
         </div>
         {/* child delete pop up */}
         {isPopupVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pop-input">
               <div className="p-6 text-center rounded-lg pop-up">
                  <div className="flex items-center justify-between">
                     <h3 className="uppercase font-roboto font-[600] text-[14px] leading-4 tracking-[2%] text-[#B1AFCD] text-left">
                        Delete child
                     </h3>
                     <i
                        className="text-[#D8A353] text-[20px] cursor-pointer"
                        onClick={handleCancelDelete}
                     >
                        <RxCrossCircled />
                     </i>
                  </div>
                  <p className="mt-[60px] px-[48px] uppercase text-white font-roboto font-[400] text-[14px] text-center leading-3 tracking-[2%]">
                     {` Are you sure you want to remove "${selectedTitle}"?`}
                  </p>
                  <div className="flex justify-center gap-3 mt-[25px] pb-[60px] ">
                     <button
                        onClick={handleConfirmDelete}
                        className="font-roboto font-[700] text-[14px] leading-5 tracking-[4%] text-center py-2 px-12 bg-[#0075FF] text-white rounded-[5px]"
                     >
                        Yes
                     </button>
                     <button
                        onClick={handleCancelDelete}
                        className="font-roboto font-[700] text-[14px] leading-5 tracking-[4%] text-center py-2 px-12 bg-[#334C68] text-white rounded-[5px]"
                     >
                        No
                     </button>
                  </div>
               </div>
            </div>
         )}
         {/* assigned pop up */}
         {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center pop-input ">
               <div className="pop-up px-8 py-6 rounded-[9px]  w-full max-w-[500px]">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="font-roboto font-[600] text-[14px] leading-4 tracking-[2%] text-[#B1AFCD] text-left">
                        ASSIGN ASSET
                     </h3>
                     <i
                        className="text-[#D8A353] text-[20px] cursor-pointer"
                        onClick={handleClosePopup}
                     >
                        <RxCrossCircled />
                     </i>
                  </div>
                  <label className="font-roboto font-[500] text-[13px] text-white leading-5 text-left block mt-5 mx-3 mb-3">
                     Select Asset
                  </label>
                  <select
                     value={selectedAsset.name || selectedAsset.assetType}
                     onChange={(e) => setSelectedAsset(e.target.value)}
                     className="w-full mx-3 pop-up px-4 py-4 mb-4 border rounded text-white text-[14px] font-[400] font-roboto leading-5"
                  >
                     {assetsList ? (
                        assetsList.map((asset, idx) => {
                           return (
                              <option
                                 key={idx}
                                 className="bg-[#1b497e]"
                                 value={asset.name || asset.assetType}
                                 onClick={() => setSelectedAsset(asset)}
                              >
                                 {asset.name || asset.assetType}
                              </option>
                           );
                        })
                     ) : (
                        <option className="bg-transparent">Select Asset</option>
                     )}
                  </select>
                  <button
                     className="font-roboto font-[700] text-[14px] leading-5 tracking-[4%] text-center py-[16px] px-[28px] bg-[#0075FF] text-white rounded-[5px] mx-3 my-7 "
                     onClick={handleAssignChildAsset}
                  >
                     ASSIGN
                  </button>
               </div>
            </div>
         )}
         {/* asset delete popup */}
         {showAsset && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pop-input">
               <div className="p-6 text-center rounded-lg pop-up">
                  <div className="flex items-center justify-between">
                     <h3 className="uppercase font-roboto font-[500] text-[15px] leading-4 tracking-[2%] text-[#B1AFCD] text-left">
                        Delete Asset
                     </h3>
                     <i
                        className="text-[#D8A353] text-[20px] cursor-pointer"
                        onClick={handleCloseAsset}
                     >
                        <RxCrossCircled />
                     </i>
                  </div>
                  <p className="mt-[70px] uppercase px-[48px] text-white font-roboto font-[400] text-[14px] text-center leading-3 tracking-[2%]">
                     {`Are you sure you want to remove "${selectedTitle}"?`}
                  </p>
                  <div className="flex justify-center gap-3 mt-9 pb-[60px] ">
                     <button
                        // onClick={handleCloseAsset}
                        onClick={handleDeleteAsset}
                        className="font-roboto font-[700] text-[14px] leading-5 tracking-[4%] text-center py-2 px-12 bg-[#0075FF] text-white rounded-[5px]"
                     >
                        Yes
                     </button>
                     <button
                        onClick={handleCloseAsset}
                        className="font-roboto font-[700] text-[14px] leading-5 tracking-[4%] text-center py-2 px-12 bg-[#334C68] text-white rounded-[5px]"
                     >
                        No
                     </button>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};
function DataRow({ title, value }) {
   return (
      <div className="flex flex-wrap items-center gap-2 font-roboto font-[400] text-[14px] leading-[21px]">
         <h3 className="w-[110px] text-[#A1A1A1]">{title}</h3>
         <p className="text-[white]">{value}</p>
      </div>
   );
}
