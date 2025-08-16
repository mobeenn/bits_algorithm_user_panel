import { editAssets, getSingleAsset } from "@/api/assetApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
export const EditAsset = () => {
  const url = window.location.href;
  const urlObj = new URL(url);
  const assetId = urlObj.searchParams.get("assetId");

  //   const [asset, setAsset] = useState(null);
  const [assetType, setAssetType] = useState("Movable");
  const [asset, setAsset] = useState({
    landType: "",
    area: "",
    location: "",
    currentWorth: "",
    name: "",
    vehicleNumber: "",
    quantity: "",
    network: "",
    walletAddress: "",
    amount: "",
  });
  const [file, setFile] = useState(null);
  console.log("🐱‍👤✨ ~ EditAsset ~ asset:", asset);

  // ~ handle get asset
  const handleGetAsset = async () => {
    await getSingleAsset(assetId).then((res) => {
      if (res.success) {
        setAsset({
          landType: res.asset.landType || "",
          area: res.asset.area || "",
          location: res.asset.location || "",
          currentWorth: res.asset.currentWorth || "",
          name: res.asset.name || "",
          vehicleNumber: res.asset.vehicleNumber || "",
          quantity: res.asset.quantity || "",
          network: res.asset.network || "",
          walletAddress: res.asset.walletAddress || "",
          amount: res.asset.amount || "",
        });
        setAssetType(res.asset.assetType);
        setFile(res.asset.document || null);
      } else {
        toast.error(res.message || "asset get failed");
        setAsset(null);
      }
    });
  };
  useEffect(() => {
    if (assetId) {
      handleGetAsset();
    }
  }, [assetId]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setAsset((prevState) => ({ ...prevState, [id]: value }));
  };

  //   ~ handling on edit asset
  const handleEditAsset = async ({ assetStatus }) => {
    if (assetStatus !== "Draft") {
      // Check required fields based on assetType
      let missingFields = [];

      switch (assetType) {
        case "Movable":
          if (!asset.name) missingFields.push("name");
          if (!asset.vehicleNumber) missingFields.push("vehicleNumber");
          if (!asset.currentWorth) missingFields.push("currentWorth");
          if (!file) missingFields.push("file");
          break;
        case "Non_Movable":
          if (!asset.name) missingFields.push("name");
          if (!asset.quantity) missingFields.push("quantity");
          if (!asset.currentWorth) missingFields.push("currentWorth");
          if (!file) missingFields.push("file");
          break;
        case "Crypto":
          if (!asset.network) missingFields.push("network");
          if (!asset.walletAddress) missingFields.push("walletAddress");
          if (!asset.amount) missingFields.push("amount");
          if (!asset.currentWorth) missingFields.push("currentWorth");
          break;
        case "Land":
          if (!asset.landType) missingFields.push("landType");
          if (!asset.area) missingFields.push("area");
          if (!asset.location) missingFields.push("location");
          if (!asset.currentWorth) missingFields.push("currentWorth");
          if (!file) missingFields.push("file");
          break;
        default:
          toast.error("Invalid asset type selected.");
          return;
      }

      // If there are missing fields, show a toast notification
      if (missingFields.length > 0) {
        toast.error(
          `Please fill in the following fields: ${missingFields.join(", ")}`
        );
        return; // Exit the function early
      }
    }

    // Prepare FormData for submission
    const data = new FormData();
    data.append("assetType", assetType);
    data.append("landType", asset.landType);
    data.append("area", asset.area);
    data.append("location", asset.location);
    data.append("currentWorth", asset.currentWorth);
    data.append("name", asset.name);
    data.append("vehicleNumber", asset.vehicleNumber);
    data.append("quantity", asset.quantity);
    data.append("network", asset.network);
    data.append("walletAddress", asset.walletAddress);
    data.append("amount", asset.amount);
    data.append("assetStatus", assetStatus);
    data.append("assetId", assetId);
    data.append("file", file);

    // Submit the asset data
    await editAssets(data).then((res) => {
      if (res.success) {
        toast.success(res.message || "Asset successfully added");
        handleGetAsset();
      } else {
        toast.error(res.message || "Failed to add asset");
      }
    });
  };
  return (
    <>
      <div className="update rounded-[8px] mx-7 px-7">
        <h2 className="py-6 text-white font-roboto font-[700] text-[18px]">
          Update Asset Details
        </h2>
        <div className="grid grid-cols-1 gap-6 my-2">
          <label
            htmlFor="asset_type"
            className="font-roboto text-[14px] font-[500] leading-[19.5px] text-white"
          >
            ASSET TYPE
          </label>
          <select
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
            className="max-w-[510px] w-full bg-[#0E1E39] text-[#B1B1B1]  px-5 py-4 rounded-[8px] border-[1px] border-[#B4B3B3]"
          >
            <option value="Movable">Movable</option>
            <option value="Non_Movable">Non Movable</option>
            <option value="Crypto">Crypto</option>
            <option value="Land">Land</option>
          </select>
          {/* Movable */}
          {assetType === "Movable" && (
            <>
              <Inputfield
                type="text"
                id="name"
                value={asset.name}
                onChange={handleInputChange}
                label={"NAME"}
                placeholder="Enter the name of the vehicle"
              />
              <Inputfield
                type="number"
                value={asset.vehicleNumber}
                id="vehicleNumber"
                onChange={handleInputChange}
                label={"VEHICLE NUMBER"}
                placeholder="Enter the vehicle unique number"
              />
              <Inputfield
                type="number"
                id="currentWorth"
                value={asset.currentWorth}
                onChange={handleInputChange}
                label={"CURRENT WORTH"}
                placeholder="Enter the current worth of this property"
              />
              <label
                htmlFor="documents"
                className="font-roboto text-[14px] font-[500] leading-[19.5px] text-white"
              >
                DOCUMENTS
              </label>
              <input
                type="file"
                name="documents"
                id="documents"
                className="hidden"
                //  value={file && file.name}
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label
                htmlFor="documents"
                className="max-w-[510px] w-full inline-block text-[#B1B1B1] font-roboto font-[400] text-[14px] leading-[19.5px] px-5 py-4 bg-[#0E1E39] text-left rounded-[8px] border-[1px] border-[#B4B3B3] cursor-pointer"
              >
                {file ? file.name : "Upload all supporting documents"}
              </label>
            </>
          )}
          {/* Non movable */}
          {assetType === "Non_Movable" && (
            <>
              <Inputfield
                type="text"
                id="name"
                value={asset.name}
                onChange={handleInputChange}
                label={"NAME"}
                placeholder="Enter the name"
              />
              <Inputfield
                type="number"
                id="quantity"
                label={"QUANTITY"}
                value={asset.quantity}
                onChange={handleInputChange}
                placeholder="Enter the quantity"
              />
              <label
                htmlFor="documents"
                className="font-roboto text-[14px] font-[500] leading-[19.5px] text-white"
              >
                DOCUMENTS
              </label>
              <input
                type="file"
                name="documents"
                //  value={file && file.name}
                id="documents"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label
                htmlFor="documents"
                className="max-w-[510px] w-full inline-block text-[#B1B1B1] font-roboto font-[400] text-[14px] leading-[19.5px] px-5 py-4 bg-[#0E1E39] text-left rounded-[8px] border-[1px] border-[#B4B3B3] cursor-pointer"
              >
                {file ? file.name : "Upload all supporting documents"}
              </label>
              <Inputfield
                type="number"
                id="currentWorth"
                value={asset.currentWorth}
                onChange={handleInputChange}
                label={"CURRENT WORTH"}
                placeholder="Enter the current worth of this property"
              />
            </>
          )}
          {/* land */}
          {assetType === "Land" && (
            <>
              <Inputfield
                type="text"
                id="landType"
                value={asset.landType}
                onChange={handleInputChange}
                label={"TYPE"}
                placeholder="Enter the type (residential, commercial)"
              />
              <Inputfield
                type="number"
                id="area"
                value={asset.area}
                onChange={handleInputChange}
                label={"AREA (in square feet)"}
                placeholder="Enter the area in square feet"
              />
              <Inputfield
                type="text"
                id="location"
                value={asset.location}
                onChange={handleInputChange}
                label={"LOCATION"}
                placeholder="Enter the location"
              />
              <label
                htmlFor="documents"
                className="font-roboto text-[14px] font-[500] leading-[19.5px] text-white"
              >
                DOCUMENTS
              </label>
              <input
                type="file"
                name="documents"
                id="documents"
                //  value={file && file.name}
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
              <label
                htmlFor="documents"
                className="max-w-[510px] w-full inline-block my-1 text-[#B1B1B1] font-roboto font-[400] text-[14px] leading-[19.5px] px-5 py-4 bg-[#0E1E39] text-left rounded-[8px] border-[1px] border-[#B4B3B3] cursor-pointer"
              >
                {file ? file.name : "Upload all supporting documents"}
              </label>
              <Inputfield
                type="number"
                id="currentWorth"
                value={asset.currentWorth}
                onChange={handleInputChange}
                label={"CURRENT WORTH"}
                placeholder="Enter the current worth of this property"
              />
            </>
          )}
          {/* crypto */}
          {assetType === "Crypto" && (
            <>
              <Inputfield
                type="text"
                id="network"
                value={asset.network}
                onChange={handleInputChange}
                label={"NETWORK"}
                placeholder="Enter the network"
              />
              <Inputfield
                type="text"
                id="walletAddress"
                onChange={handleInputChange}
                value={asset.walletAddress}
                label={"WALLET ADDRESS"}
                placeholder="Enter the wallet address"
              />
              <Inputfield
                type="number"
                id="amount"
                value={asset.amount}
                onChange={handleInputChange}
                label={"AMOUNT"}
                placeholder="Enter the amount"
              />
              <Inputfield
                type="number"
                id="currentWorth"
                value={asset.currentWorth}
                onChange={handleInputChange}
                label={"CURRENT WORTH"}
                placeholder="Enter the current worth of this property"
              />
            </>
          )}
        </div>
        <div className="flex flex-col gap-4 py-4 md:flex-row">
          <button
            onClick={() =>
              handleEditAsset({ assetStatus: "Under Verification" })
            }
            className="bg-[#0075FF] rounded-[4px] py-2 px-5 text-white font-roboto font-[500] text-[14px] leading-5 text-center mb-2 md:mb-0"
          >
            SUBMIT FOR APPROVAL
          </button>
          <button
            onClick={() => handleEditAsset({ assetStatus: "Draft" })}
            className="rounded-[4px] py-2 px-5 bg-[#334C68] text-white font-roboto font-[500] text-[14px] leading-5 text-center"
          >
            SAVE AS DRAFT
          </button>
        </div>
      </div>
    </>
  );
};
function Inputfield({ label, value, onChange, id, placeholder, type }) {
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
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="max-w-[510px] w-full my-1 font-roboto text-[#B1B1B1] font-[400] text-[14px] leading-[19.5px] px-5 py-4 bg-[#0E1E39] rounded-[8px] border-[1px] border-[#B4B3B3]"
      />
    </div>
  );
}
