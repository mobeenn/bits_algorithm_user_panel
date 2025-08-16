import axios from "axios";
const backendUrl = import.meta.env.VITE_LOCAL_BACKEND_URL;

// ~ assign Asset to child
export const assignChildAssets = async (data) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/auth/assign-child-asset`,
      data
    );
    return response.data;
  } catch (error) {
    console.log("🐱‍👤✨ ~ assignChildAssets ~ error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An error occurred while processing the request.",
    };
  }
};

// ~ assign Asset to child
export const deleteChildAssets = async (data) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/auth/delete-child-asset`,
      data
    );
    return response.data;
  } catch (error) {
    console.log("🐱‍👤✨ ~ assignChildAssets ~ error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An error occurred while processing the request.",
    };
  }
};
