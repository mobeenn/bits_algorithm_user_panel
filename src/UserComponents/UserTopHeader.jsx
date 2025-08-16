// UserTopHeader.jsx
import { Wallet } from "@/GemWallet/Wallet";
import { IoMenu } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import "../App.css";
import { useStore } from "../store";
import Dropdown from "./dropdown";

export default function UserTopHeader() {
   const { pathname } = useLocation();

   const setIsNavOpen = useStore((state) => state.setIsNavOpen);

   const pathNamesMap = {
      details: "Personal Details",
      user_details: "User Details",
      my_asset: "My Asset",
      trust_details: "Trust Details",
      executer_details: "Executer Details",
      your_wishes: "Your Wishes",
      user_will: "User Will",
      new_child: "New Child",
      new_asset: "New Asset",
      "edit-child": "Edit Child",
      "edit-asset": "Edit Asset",
      "update-password": "Update Password",
      "update-profile": "Update Profile",

      "forgot-password": "Forgot Password",
      "reset-password": "Reset Password",
      contact: "Contact",
      will_summary: "Will summary",
   };

   // Function to format the pathname
   const formatPathname = (path) => {
      if (path === "/user-dashboard") {
         return "/Dashboard";
      }

      return path
         .split("/")
         .filter((segment) => segment !== "user-dashboard")
         .map((segment) => pathNamesMap[segment] || segment)
         .join(" / ");
   };

   const formattedPathname = formatPathname(pathname);

   console.log("Formatted Pathname:", formattedPathname); // Debugging line

   // Get the last segment for the main title
   const mainTitle = formattedPathname.split(" / ").pop();

   return (
      <header className="flex items-center justify-between mx-8 my-4">
         <div className="flex gap-3">
            <div
               className="text-white text-[18px] xl:hidden"
               onClick={() => setIsNavOpen(true)}
            >
               <IoMenu />
            </div>
            <div className="text-xs font-normal leading-3 font-roboto">
               <p className="text-[#A0AEC0] text-[13px] font-[400]">
                  Pages
                  <span className="text-white">{formattedPathname}</span>
               </p>
               <h4 className="text-base font-medium leading-[1.4] tracking-tightest text-white my-2">
                  {mainTitle}
               </h4>
            </div>
         </div>
         <div className="relative left-[260px]">
            <Wallet />
         </div>
         <Dropdown />
      </header>
   );
}
