import { willSummary } from "@/api/auth";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const WillSummary = () => {
   const [summary, setSummary] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState({
      summary: "",
   });

   const handleWillSummary = async () => {
      const userId = JSON.parse(localStorage.getItem("authUser"));
      console.log("🚀 ~ handleWillSummary ~ userId:", userId);
      const payload = {
         will_summary: summary, // Update this field name to 'will_summary'
         userId: userId._id,
      };

      const newErrors = {};
      if (!summary) {
         // Check if summary is empty
         newErrors.summary = "Summary is required";
      }
      setError(newErrors);

      if (Object.keys(newErrors).length > 0) return;

      setIsLoading(true);
      try {
         const response = await willSummary(payload);
         if (response.success) {
            toast.success(response?.message || "Summary Will Be Added");
            setSummary(""); // Clear input on success
         } else {
            toast.error(response?.message || "Failed to Fill Summary");
         }
      } catch (error) {
         toast.error(error.response?.message || "Failed to Fill Summary");
      } finally {
         setIsLoading(false);
      }
   };

   // Clear errors when the user types
   const clearError = (field) => {
      setError((prev) => ({
         ...prev,
         [field]: "",
      }));
   };

   return (
      <div className="update mx-2 sm:mx-7 rounded-[8px] px-9 ">
         <h2 className="text-white font-roboto font-[700] text-[18px] leading-6 py-8">
            Will Summary
         </h2>
         <label
            htmlFor="summary"
            className="font-roboto font-[500] text-[13px] leading-5 text-white"
         >
            Summary
         </label>
         <br />
         <textarea
            id="summary"
            rows={10}
            placeholder="Write your will summary here...."
            className="max-w-[670px] w-full my-4 p-6 rounded-[8px] border-[1px] border-[#B4B3B3] bg-[#0E1E39] text-[14px] text-[#B1B1B1] font-roboto leading-[19.5px]"
            style={{ resize: "vertical" }}
            value={summary}
            onChange={(e) => {
               setSummary(e.target.value);
               clearError("summary");
            }}
         ></textarea>
         <br />
         {error.summary && <p className="text-red-500">{error.summary}</p>}
         <button
            onClick={handleWillSummary}
            className="py-2 my-4 px-6 bg-[#0075FF] text-white font-roboto font-[700] text-[13px] leading-[19.5px] text-center rounded-[4px]"
            disabled={isLoading}
         >
            {isLoading ? "Submitting..." : "SUBMIT"}
         </button>
      </div>
   );
};
