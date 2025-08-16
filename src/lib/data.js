import { FaHome } from "react-icons/fa";
import { MdPersonalInjury } from "react-icons/md";
import { FaChildren } from "react-icons/fa6";
import { GiDogHouse } from "react-icons/gi";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { FaFile } from "react-icons/fa6";
import { FaRegFileLines } from "react-icons/fa6";
//user dashoard
export const navLinks = [
   {
      name: "Dashboard",
      href: "/user-dashboard",
      icon: FaHome,
   },
   {
      name: "Personal Details",
      href: "/user-dashboard/details",
      icon: MdPersonalInjury,
   },
   {
      name: "Child Details",
      href: "/user-dashboard/user_details",
      icon: FaChildren,
   },
   {
      name: "Assets",
      href: "/user-dashboard/my_asset",
      icon: GiDogHouse,
   },
   {
      name: "Trust Details",
      href: "/user-dashboard/trust_details",
      icon: IoShieldCheckmarkSharp,
   },
   {
      name: "Executor",
      href: "/user-dashboard/executer_details",
      icon: MdPersonalInjury,
   },
   {
      name: "Personal Wishes",
      href: "/user-dashboard/your_wishes",
      icon: FaFile,
   },
   {
      name: " Will Summary",
      href: "/user-dashboard/will_summary",
      icon: FaRegFileLines,
   },
   {
      name: "User Will",
      href: "/user-dashboard/user_will",
      icon: FaRegFileLines,
   },
];
//notification
export const notifications = [
   {
      title: "Asset Verified",
      message: "Your asset “asset title” verified successfully.",
      time: "2 hours ago",
      isRejected: false,
   },
   {
      title: "Asset Verified",
      message: "Your asset “asset title” verified successfully.",
      time: "2 hours ago",
      isRejected: false,
   },
   {
      title: "Asset Rejected",
      message: "Your asset “asset title” rejected. Please resubmit it.",
      time: "2 hours ago",
      isRejected: true,
   },
   {
      title: "Asset Rejected",
      message: "Your asset “asset title” rejected. Please resubmit it.",
      time: "2 hours ago",
      isRejected: true,
   },
];
