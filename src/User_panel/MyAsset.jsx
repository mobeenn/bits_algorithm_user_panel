import { deleteAsset, getAllAssets } from "@/api/auth";
import { useEffect, useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
export const MyAsset = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [assets, setAssets] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState("");

  let userId = localStorage.getItem("userId") || "";

  // ~ getting all the user assets
  const handleGetAllAssets = async () => {
    await getAllAssets(userId).then((res) => {
      setIsLoading(true);
      if (res.success) {
        setAssets(res.allAssets);
      } else {
        setAssets([]);
        console.log(res.message || "something went wrong");
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    handleGetAllAssets();
  }, []);

  const handleDeleteClick = (asset) => {
    console.log("🐱‍👤✨ ~ handleDeleteClick ~ asset:", asset._id);
    setSelectedTitle(asset?.name || "unknown");
    setSelectedAsset(asset._id);
    setIsPopupVisible(true);
  };

  const handleConfirmDelete = async () => {
    // Logic to handle deletion here
    //~ deleting the selected asset
    await deleteAsset(selectedAsset).then((res) => {
      console.log("🐱‍👤✨ ~ awaitdeleteAsset ~ selectedAsset:", selectedAsset);
      if (res.success) {
        console.log("Deleted successfully");
        toast.success(res.message || "Asset deleted successfully");
        handleGetAllAssets();
      } else {
        toast.error(res.message || "Failed to delete asset");
        console.log("Failed to delete asset");
      }
      console.log("🐱‍👤✨ ~ awaitdeleteAsset ~ res:", res);
    });
    setIsPopupVisible(false);
  };

  const handleCancelDelete = () => {
    setIsPopupVisible(false);
  };

  return (
    <>
      <div className="my-8">
        <div className="flex flex-col sm:flex-row gap-y-4 justify-between items-center sm:mx-8 text-[#FFFFFF] font-roboto font-[700]">
          <h3>My Assets</h3>
          <Link to="/user-dashboard/new_asset">
            <button className="px-4 py-3 bg-[#0075FF] leading-5 tracking-[4%] text-center text-[14px] rounded-[4px]">
              ADD NEW ASSET
            </button>
          </Link>
        </div>

        {/* mapping assets */}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {!assets || assets.length === 0 ? (
              <div className="text-[#262020] font-roboto font-[400] text-[14px] leading-[18px]">
                No assets found.
              </div>
            ) : (
              <>
                {assets?.map((asset, idx) => {
                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-center w-auto h-auto over-liam my-6 px-4 py-4 mx-2 sm:mx-7 rounded-[20px]"
                    >
                      <div className="flex items-center justify-between w-full h-auto">
                        <div>
                          <div className="flex flex-col items-center justify-between h-auto sm:flex-row gap-y-4">
                            <div>
                              <h3 className="mx-8 text-white font-roboto text-[16px] font-medium leading-[22.4px]">
                                {asset.name || asset.assetType}
                              </h3>
                              <hr className="mt-1 hr_line" />
                            </div>
                          </div>
                          <div className="mx-8 mt-8 ">
                            {/* for asset type land */}
                            {asset.assetType === "Land" && (
                              <>
                                <DataRow
                                  title="Vehicle Number:"
                                  value={asset.vehicleNumber || "unknown"}
                                />
                                <DataRow
                                  title="Current Worth: "
                                  value={asset.currentWorth || "unknown"}
                                />
                                <p className="mt-2 text-white font-roboto font-[400] text-[12px] leading-[18px]">
                                  DOCUMENTS:
                                </p>
                                {asset.documents && asset.documents !== "" ? (
                                  <>
                                    <Link
                                      target="_blank"
                                      to={asset.documents}
                                      className="flex gap-3 my-2 text-[22px] text-[#D8A353]"
                                    >
                                      <IoDocumentTextOutline />
                                    </Link>
                                  </>
                                ) : (
                                  <p className="text-white font-roboto font-[400] text-[12px] leading-[18px]">
                                    No documents available.
                                  </p>
                                )}
                              </>
                            )}

                            {/* for asset type Movable */}
                            {asset.assetType === "Movable" && (
                              <>
                                <DataRow
                                  title="Name:"
                                  value={asset.name || "unknown"}
                                />
                                <DataRow
                                  title="Vehicle Number: "
                                  value={asset.vehicleNumber || "unknown"}
                                />
                                <DataRow
                                  title="Current Worth: "
                                  value={asset.currentWorth || "unknown"}
                                />
                                <p className="mt-2 text-white font-roboto font-[400] text-[12px] leading-[18px]">
                                  DOCUMENTS:
                                </p>
                                {asset.documents && asset.documents !== "" ? (
                                  <>
                                    <Link
                                      target="_blank"
                                      to={asset.documents}
                                      className="flex gap-3 my-2 text-[22px] text-[#D8A353]"
                                    >
                                      <IoDocumentTextOutline />
                                    </Link>
                                  </>
                                ) : (
                                  <p className="text-white font-roboto font-[400] text-[12px] leading-[18px]">
                                    No documents available.
                                  </p>
                                )}
                              </>
                            )}

                            {/* for asset type non Movable */}
                            {asset.assetType === "Non_Movable" && (
                              <>
                                <DataRow
                                  title="Name:"
                                  value={asset.name || "unknown"}
                                />
                                <DataRow
                                  title="Quantity: "
                                  value={asset.quantity || "unknown"}
                                />
                                <DataRow
                                  title="Current Worth: "
                                  value={asset.currentWorth || "unknown"}
                                />
                                <p className="mt-2 text-white font-roboto font-[400] text-[12px] leading-[18px]">
                                  DOCUMENTS:
                                </p>
                                {asset.documents && asset.documents !== "" ? (
                                  <>
                                    <Link
                                      target="_blank"
                                      to={asset.documents}
                                      className="flex gap-3 my-2 text-[22px] text-[#D8A353]"
                                    >
                                      <IoDocumentTextOutline />
                                    </Link>
                                  </>
                                ) : (
                                  <p className="text-white font-roboto font-[400] text-[12px] leading-[18px]">
                                    No documents available.
                                  </p>
                                )}
                              </>
                            )}

                            {/* for asset type Crypto */}
                            {asset.assetType === "Crypto" && (
                              <>
                                <DataRow
                                  title="Network:"
                                  value={asset.network || "unknown"}
                                />
                                <DataRow
                                  title="Wallet Address: "
                                  value={asset.walletAddress || "unknown"}
                                />
                                <DataRow
                                  title="Current Worth: "
                                  value={asset.currentWorth || "unknown"}
                                />
                                <DataRow
                                  title="Amount: "
                                  value={asset.amount || "unknown"}
                                />
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-center justify-center h-auto space-y-2">
                          <button
                            className={`text-[#262020] font-roboto font-[600] mx-9 text-[14px] text-center leading-5 py-1 px-3 bg-[#BDBDBD] rounded-[3px] min-w-[12vw] w-auto ${
                              asset.assetStatus === "Under Verification"
                                ? "bg-[#F2994A]"
                                : asset.assetStatus === "Draft"
                                ? "bg-[#BDBDBD]"
                                : asset.assetStatus === "Verified"
                                ? "bg-[#01B574]"
                                : asset.assetStatus === "Rejected"
                                ? "bg-[#EB5757]"
                                : "bg-[#F2994A]"
                            }`}
                          >
                            {asset.assetStatus || "Under Verification"}
                          </button>
                          {asset.assetStatus === "Draft" && (
                            <div className="flex gap-7">
                              <span
                                onClick={() => handleDeleteClick(asset)}
                                className="flex items-center gap-1 text-[#F53C2B] text-[15px] cursor-pointer"
                              >
                                <MdDelete /> <p>DELETE</p>
                              </span>
                              <Link
                                to={`/user-dashboard/edit-asset?assetId=${asset._id}`}
                              >
                                <span className="flex items-center gap-1 cursor-pointer">
                                  <MdEdit className="text-white" />
                                  <p className="text-[#B66214] font-[500] text-[15px]">
                                    EDIT
                                  </p>
                                </span>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* for the delete option */}
                      {isPopupVisible && (
                        <div className="fixed inset-0 flex items-center justify-center duration-200 bg-black bg-opacity-10">
                          <div className="p-6 text-center bg-white rounded-lg pop-up">
                            <div className="flex items-center justify-between">
                              <h3 className="font-roboto font-[600] text-[14px] leading-4 tracking-[2%] text-[#B1AFCD] text-left">
                                Delete Asset
                              </h3>
                              <i
                                className="text-[#D8A353] text-[20px] cursor-pointer"
                                onClick={handleCancelDelete}
                              >
                                <RxCrossCircled />
                              </i>
                            </div>
                            <p className="mt-[60px] px-[48px] text-[#FFFFFF] font-roboto font-[500] text-[16px] text-center leading-3 tracking-[2%]">
                              {` Are you sure you want to remove "${selectedTitle}"?`}
                            </p>
                            <div className="flex justify-center gap-3 mt-[25px] pb-[60px]">
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

                      {/* rejected reasons */}
                      {asset.assetStatus === "Rejected" && (
                        <div className="flex flex-col items-center justify-center mt-4 md:mt-0">
                          <h3 className="text-white font-roboto text-[16px] font-medium leading-[22.4px]">
                            Reason
                          </h3>
                          <hr className="mt-1 -mx-6 hr_line" />
                          <div className="my-8 text-[#A1A1A1] text-[14px] font-roboto font-[400] leading-5">
                            <p>
                              Here will go rejection reason. Here will go
                              rejection reason.
                            </p>
                            <p>
                              Here will go rejection reason. Here will go
                              rejection reason.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

function DataRow({ title, value }) {
  return (
    <div className="flex items-center gap-4  font-roboto font-[400] text-[14px] leading-[21px]">
      <h3 className="w-[110px] text-[#A1A1A1]">{title}</h3>
      <p className="text-[white]">{value}</p>
    </div>
  );
}
