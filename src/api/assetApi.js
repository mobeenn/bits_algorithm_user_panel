import axios from "axios";
const backendUrl = import.meta.env.VITE_LOCAL_BACKEND_URL;

// ~ add assets for the user
export const addAssets = async (data) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/auth/add-assets`,
      data
    );
    return response.data;
  } catch (error) {
    console.log("🐱‍👤✨ ~ addAssets ~ error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An error occurred while processing the request.",
    };
  }
};

// ~ add assets for the user
export const editAssets = async (data) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/auth/edit-assets`,
      data
    );
    return response.data;
  } catch (error) {
    console.log("🐱‍👤✨ ~ editAssets ~ error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An error occurred while processing the request.",
    };
  }
};

// ~ get all user assets
export const getAllAssets = async (userId) => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/auth/get-all-assets/${userId}`
    );
    return response.data;
  } catch (error) {
    console.log("🐱‍👤✨ ~ getAllAssets ~ error:", error);
    return error.response.data ? error.response.data : error.response.message;
  }
};

// ~ get all user assets
export const getAllAssetsList = async (userId) => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/auth/get-all-assets-list/${userId}`
    );
    return response.data;
  } catch (error) {
    console.log("🐱‍👤✨ ~ getAllAssetsList ~ error:", error);
    return error.response.data ? error.response.data : error.response.message;
  }
};

// ~ delete asset
export const deleteAsset = async (selectedAsset) => {
  try {
    const response = await axios.delete(
      `${backendUrl}/api/auth/delete-asset/${selectedAsset}`
    );
    return response.data;
  } catch (error) {
    console.log("🐱‍👤✨ ~ deleteAsset ~ error:", error);
    return error.response.data ? error.response.data : error.response.message;
  }
};

// ~ get single asset
export const getSingleAsset = async (assetId) => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/auth/get-asset/${assetId}`
    );
    return response.data;
  } catch (error) {
    console.log("🐱‍👤✨ ~ getSingleAsset ~ error:", error);
    return error.response.data ? error.response.data : error.response.message;
  }
};
