import axios from "axios";
const backendUrl = import.meta.env.VITE_LOCAL_BACKEND_URL;

export async function signup(data) {
   console.log("🚀 ~ signup ~ data:", data);
   try {
      const res = await axios.post(`${backendUrl}/api/auth/signup`, data, {
         headers: {
            "Content-Type": "application/json; charset=utf-8",
         },
      });
      console.log("sign up response", res);
      return res.data;
   } catch (error) {
      console.log("Error in Sign Up API", error);
      console.log(error?.response?.data?.message);
      return error?.response?.data;
   }
}

export async function verifyEmail(data) {
   try {
      const res = await axios.post(
         `${backendUrl}/api/auth/verify-email`,
         data,
         {
            headers: {
               "Content-Type": "application/json; charset=utf-8",
            },
         }
      );
      return res.data;
   } catch (error) {
      console.log("Error in Email Verification API", error);
      return error?.response?.data;
   }
}
export async function resendOtp(data) {
   try {
      const res = await axios.post(`${backendUrl}/api/auth/resend-otp`, data, {
         headers: {
            "Content-Type": "application/json; charset=utf-8",
         },
      });
      return res.data;
   } catch (error) {
      console.log("Error in Resend OTP API", error);
      return error?.response?.data;
   }
}

export async function signin(data) {
   console.log("🚀 ~ signin ~ data:", data);
   try {
      const res = await axios.post(`${backendUrl}/api/auth/signin`, data, {
         headers: {
            "Content-Type": "application/json; charset=utf-8",
         },
      });
      console.log("Signin response", res);
      return res.data;
   } catch (error) {
      console.log("Error in Signin API", error);
      console.log(error?.response?.data?.message);
      return (
         error?.response?.data || {
            success: false,
            message: "Unknown error occurred",
         }
      );
   }
}

export const forgotPassword = async (data) => {
   // Replace with your backend URL
   try {
      const response = await axios.post(
         `${backendUrl}/api/auth/forgot-password`,
         data,
         {
            headers: {
               "Content-Type": "application/json; charset=utf-8",
            },
         }
      );
      console.log("Forgot Password Response:", response);
      return response.data;
   } catch (error) {
      console.log("Error in Forgot Password API", error);
      console.log(error?.response?.data?.message);
      return error?.response?.data;
   }
};

export const resetPassword = async (data) => {
   try {
      console.log("🚀 ~ resetPassword ~ data:", data);
      const response = await axios.post(
         `${backendUrl}/api/auth/reset-password`,
         data,
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
      return response.data;
   } catch (error) {
      console.error("Error resetting password:", error);
      return {
         success: false,
         message: error.response?.data?.message || "Something went wrong",
      };
   }
};

export const personal_details = async (data) => {
   try {
      const response = await axios.post(
         `${backendUrl}/api/auth/personal-details`,
         data
         // {
         //    headers: {
         //       "Content-Type": "application/json",
         //    },
         // }
      );
      console.log("🚀 ~ constpersonal_details= ~ response:", response);

      return {
         success: true,
         message: "Personal details updated successfully",
      };
   } catch (error) {
      console.error("Error updating personal details:", error);
      return {
         success: false,
         message:
            error.response?.data?.message || "Error updating personal details",
      };
   }
};

export const trustDetails = async (data) => {
   try {
      console.log("🚀 ~ trustDetails ~ data:", data);
      const response = await axios.post(
         `${backendUrl}/api/auth/trust-details`,
         data,
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
      return response.data;
   } catch (error) {
      console.error("Error updating trust details:", error);
      return {
         success: false,
         message:
            error.response?.data?.message || "Error updating trust details",
      };
   }
};
export const executorDetails = async (data) => {
   try {
      console.log("🚀 ~ executorDetails ~ data:", data);

      const response = await axios.post(
         `${backendUrl}/api/auth/executor-details`,
         data,
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
      return response.data;
   } catch (error) {
      console.error("Error updating Executor details:", error);
      return {
         success: false,
         message:
            error.response?.data?.message || "Error updating Executor details",
      };
   }
};

export const getUserdata = async () => {
   const access_token = localStorage.getItem("token");
   console.log("🚀 ~ getUserdata ~ access_token:", access_token);
   try {
      const response = await axios.post(
         `${backendUrl}/api/auth/get-personal-details`,
         {
            access_token,
         },
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
      return {
         success: true,
         user: response.data,
      };
   } catch (error) {
      console.error("Error fetching user data:", error);
      return {
         success: false,
         message: error.response?.data?.message || "Error fetching user data",
      };
   }
};

export const refreshToken = async () => {
   const access_token = localStorage.getItem("token");
   console.log("🚀 ~ getUserdata ~ access_token:", access_token);
   try {
      const response = await axios.post(
         `${backendUrl}/api/auth/refresh-token`,
         {
            access_token,
         },
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
      return {
         success: true,
         user: response.data,
      };
   } catch (error) {
      console.error("Error fetching user data:", error);
      return {
         success: false,
         message: error.response?.data?.message || "Error fetching user data",
      };
   }
};
export async function update_profile(data) {
   try {
      const res = await axios.post(
         `${backendUrl}/api/auth/update-profile`,
         data,
         {
            headers: {
               "Content-Type": "application/json; charset=utf-8",
            },
         }
      );
      // console.log("🚀 ~ update details ~ res:", res);
      return res.data;
   } catch (error) {
      console.error("Error in personal_details API call:", error);
      console.log(error?.response?.data?.message);
      return error?.response?.data;
   }
}
// add wish
export const addWish = async (data) => {
   try {
      console.log("��� ~ addWish ~ data:", data);
      const response = await axios.post(
         `${backendUrl}/api/auth/add-wish`,
         data,
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
      return response.data;
   } catch (error) {
      console.error("Error adding wish:", error);
      return {
         success: false,
         message: error.response?.data?.message || "Error adding wish",
      };
   }
};
// get wish data
export const getWishData = async () => {
   const userId = localStorage.getItem("userId");
   console.log("🚀 ~ getWishData ~ userId:", userId);
   const cleanedUserId = userId.replace(/^"|"$/g, "");
   console.log("🚀 ~ getWishData ~ cleanedUserId:", cleanedUserId);
   try {
      const response = await axios.post(
         `${backendUrl}/api/auth/get-wish/${cleanedUserId}`,
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
      console.log("🚀 ~ getWishData ~ response:", response);
      return response.data;
   } catch (error) {
      console.log("🚀 ~ getWishData ~ error:", error);
      return {
         success: false,
         message: error.response?.data?.message || "Error getting child data",
      };
   }
};
// Delete Wish
export const deleteWish = async (wishId) => {
   try {
      const response = await axios.delete(
         `${backendUrl}/api/auth/delete/${wishId}`,
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
      return response.data;
   } catch (error) {
      console.error("Error deleting wish:", error);
      return {
         success: false,
         message: error.response?.data?.message || "Error deleting wish",
      };
   }
};
// update password
export const updatePassword = async (data) => {
   try {
      console.log("��� ~ updatePassword ~ data:", data);
      const response = await axios.post(
         `${backendUrl}/api/auth/update-password`,
         data,
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
      return response.data;
   } catch (error) {
      console.error("Error updating password:", error);
      return {
         success: false,
         message: error.response?.data?.message || "Error updating password",
      };
   }
};
// update the profile
export const updateProfile = async (data) => {
   try {
      console.log("��� ~ updateProfile ~ data:", data);
      const response = await axios.post(
         `${backendUrl}/api/auth/update-profile`,
         data
         // {
         //    headers: {
         //       "Content-Type": "application/json",
         //    },
         // }
      );
      return response.data;
   } catch (error) {
      console.error("Error updating profile:", error);
      return {
         success: false,
         message: error.response?.data?.message || "Error updating profile",
      };
   }
};

// ~ getting the dashboard data
export const getDashboardData = async () => {
   const userId = localStorage.getItem("userId");

   try {
      const response = await axios.get(
         `${backendUrl}/api/auth/get-dashboard-data/${userId}`
      );

      return response.data;
   } catch (error) {
      console.log("🐱‍👤✨ ~ getDashboardData ~ error:", error);
      return error.response.data ? error.response.data : error.message;
   }
};

//get child data
export const getChildData = async (childId) => {
   const userId = localStorage.getItem("userId");
   const cleanedUserId = userId.replace(/^"|"$/g, ""); // Removes surrounding quotes
   console.log("🚀 ~ getChildData ~ cleanedUserId:", cleanedUserId);
   console.log("🚀 ~ getChildData ~ userId:", userId);
   try {
      console.log("��� ~ getChildData ~ data:");
      const response = await axios.get(
         `${backendUrl}/api/auth/get-child-data/${
            cleanedUserId ? cleanedUserId : childId
         }`
         // {
         //   headers: {
         //     "Content-Type": "application/json",
         //   },
         // }
      );
      return response.data;
   } catch (error) {
      console.error("Error getting child data:", error);
      return {
         success: false,
         message: error.response?.data?.message || "Error getting child data",
      };
   }
};

// ~ update children
export const updateChildren = async (childId, data) => {
   const userId = localStorage.getItem("userId");
   const cleanedUserId = userId.replace(/^"|"$/g, ""); // Removes surrounding quotes
   console.log("🚀 ~ getChildData ~ cleanedUserId:", cleanedUserId);
   console.log("🚀 ~ getChildData ~ userId:", userId);
   try {
      const response = await axios.put(
         `${backendUrl}/api/auth/children/${childId}`,
         data
      );

      return response.data;
   } catch (error) {
      console.log("🐱‍👤✨ ~ updateChildren ~ error:", error);
      return error.response.data ? error.response.data : error.response.message;
   }
};

//~ delete child
export const deleteChild = async (childId) => {
   try {
      const response = await axios.delete(
         `${backendUrl}/api/auth/delete-child/${childId}`
      );
      console.log("🐱‍👤✨ ~ deleteChild ~ response:", response);

      return response.data;
   } catch (error) {
      console.log("🐱‍👤✨ ~ deleteChild ~ error:", error);
      return error.response.data ? error.response.data : error.response.message;
   }
};

// ~ get children data by id
export const getChildrenDataById = async (childId) => {
   try {
      const response = await axios.get(
         `${backendUrl}/api/auth/child/${childId}`
      );
      return response.data;
   } catch (error) {
      console.log("🐱‍👤✨ ~ getChildrenDataById ~ error:", error);
      return error.response.data ? error.response.data : error.response.message;
   }
};
// get child data by id
export const getChildDataId = async (childId) => {
   try {
      const response = await axios.get(
         `${backendUrl}/api/auth/child/${childId}`
      );
      return response.data;
   } catch (error) {
      console.error("Error getting child data:", error);
      return {
         success: false,
         message: error.response?.data?.message || "Error getting child data",
      };
   }
};
// update child data
export const updateChildData = async (id, data) => {
   try {
      const res = await axios.put(`/api/auth/children/${id}`, data);
      return res.data;
   } catch (error) {
      console.error("Error updating child data:", error);
      return { success: false, message: "Failed to update child data" };
   }
};
// create chil detail api call
export const childDetails = async (data) => {
   try {
      console.log("🚀 ~ childDetails ~ childDetails:", childDetails);
      const response = await axios.post(
         `${backendUrl}/api/auth/create-child`,
         data,
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
      console.log("🚀 ~ childDetails ~ response.data:", response.data);
      return response.data;
   } catch (error) {
      console.error("Error updating Child details:", error);
      return {
         success: false,
         message:
            error.response?.data?.message || "Error updating child details",
      };
   }
};

// contact Us Email
export const contactUsEmail = async (data) => {
   try {
      const response = await axios.post(
         `${backendUrl}/api/auth/contact-us-email`,
         data
      );
      return response.data;
   } catch (error) {
      console.log("🐱‍👤✨ ~ contactUsEmail ~ error:", error);
      return {
         success: false,
         message:
            error.response?.data?.message || "Error updating child details",
      };
   }
};
// will summary
export const willSummary = async (data) => {
   try {
      console.log("Sending data to will summary endpoint:", data);
      const response = await axios.post(
         `${backendUrl}/api/auth/will-summary`,
         data,
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
      console.log("Received response from will summary:", response.data);
      return response.data;
   } catch (error) {
      console.error("Error in will summary:", error.message);
      return {
         success: false,
         message:
            error.response?.data?.message ||
            "An error occurred while processing the request.",
      };
   }
};

// ~ post the will signature
export const willSignature = async (formData) => {
   const userId = localStorage.getItem("userId");
   console.log("🚀 ~ getUserdata ~ userId:", userId);
   try {
      // console.log("🐱‍👤✨ ~ willSignature ~ formData:", formData);
      const response = await axios.post(
         `${backendUrl}/api/auth/upload-signature/${userId}`,
         formData
      );
      return response.data;
   } catch (error) {
      // console.log("🐱‍👤✨ ~ willSignature ~ error:", error);
      return error.response.data ? error.response.data : error.response.message;
   }
};

// get will summary
export const getWillSummary = async () => {
   try {
      const userId = localStorage.getItem("userId");
      // const cleanedUserId = userId.replace(/^"|"$/g, ""); // Removes surrounding quotes
      // console.log("��� ~ getWillSummary ~ cleanedUserId:", cleanedUserId);
      console.log("��� ~ getWillSummary ~ userId:", userId);
      const response = await axios.get(
         `${backendUrl}/api/auth/get-will-summary/${userId}`,
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
      return response.data;
   } catch (error) {
      console.error("Error getting will summary:", error.message);
      return {
         success: false,
         message:
            error.response?.data?.message ||
            "An error occurred while processing the request.",
      };
   }
};
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
// call assets post api
export const assetsData = async (data) => {
   try {
      const response = await axios.post(`${backendUrl}/api/auth/assets`, data, {
         headers: {
            "Content-Type": "application/json",
         },
      });
      return response.data;
   } catch (error) {
      console.error("Error in assetsData:", error.message);
      return {
         success: false,
         message:
            error.response?.data?.message ||
            "An error occurred while processing the request.",
      };
   }
};
