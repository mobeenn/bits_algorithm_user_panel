import React, { useContext, useEffect, useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/UserComponents/ui/menubar";
import { BiSolidUser } from "react-icons/bi";
import { TbLogin } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa";
import { PiKeyReturn } from "react-icons/pi";
import { IoIosNotifications } from "react-icons/io";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CiCircleCheck } from "react-icons/ci";
import { getUserdata } from "@/api/auth";
import { UserContext } from "@/context/ContextProvider";
import { toast } from "react-toastify";

const menuLinks = [
  {
    name: "Update Profile",
    href: "/user-dashboard/update-profile",
  },
];

const notificationLinks = [
  {
    name: "Project Approved",
    href: "/notifications",
    title: "“project title”",
    time: "3 hours ago",
  },
];

export default function Dropdown() {
  const [formData, setFormData] = useState("full_name");
  const auth = localStorage.getItem("auth");
  const navigate = useNavigate();
  const { userName, profilePicture } = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getUserdata();

        if (res.success) {
          // console.log("🚀 ~ fetchData ~ res:", res?.user?.user);
          setFormData({ full_name: res.user.user.full_name || "" });
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
        toast.error("Failed to fetch user data");
      }
    };
    getData();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/user-signin");
  };
  return (
    <Menubar>
      {/* New Dropdown Menu for Notifications */}
      <MenubarMenu>
        <MenubarTrigger>
          <div className="cursor-pointer text-[#4cb2ec] mr-3">
            <IoIosNotifications className="text-[1.625rem]" />
          </div>
        </MenubarTrigger>
        <MenubarContent className="rounded-lg border-none bg-black w-[380px] p-1 font-[300] text-white">
          <h3 className="font-roboto font-[500] text-[12px] text-[#B1AFCD] pt-[24px] pb-[17px] px-[23px] leading-3 tracking-[2%]">
            NOTIFICATIONS
          </h3>
          {notificationLinks?.map(({ name, href, title, time }) => (
            <React.Fragment key={href}>
              <MenubarItem
                asChild
                className="cursor-pointer rounded-md px-3 py-2.5 text-sm transition-all focus:text-white"
              >
                <Link to={href} className="flex items-center gap-3">
                  <button className="p-3 rounded-full check">
                    <CiCircleCheck className="text-white text-[25px] " />
                  </button>
                  <div className="my-[12px]">
                    <p className="font-roboto font-[700] text-[13px] leading-4 text-[#B1AFCD]">
                      {name}
                    </p>
                    <p className="font-roboto font-[400] text-[12px] leading-3 text-[#7D7CAF] mt-[7px]">
                      Your project {title} approved.
                    </p>
                    <p className="font-roboto font-[400] text-[10px] leading-3 text-[#59588D] mt-[7px]">
                      {time}
                    </p>
                  </div>
                </Link>
              </MenubarItem>
              <MenubarItem
                asChild
                className="cursor-pointer rounded-md px-3 py-2.5 text-sm transition-all focus:text-white"
              >
                <Link to={href} className="flex items-center gap-3">
                  <button className="p-3 rounded-full check">
                    <CiCircleCheck className="text-white text-[25px] " />
                  </button>
                  <div className="my-[12px]">
                    <p className="font-roboto font-[700] text-[13px] leading-4 text-[#B1AFCD]">
                      {name}
                    </p>
                    <p className="font-roboto font-[400] text-[12px] leading-3 text-[#7D7CAF] mt-[7px]">
                      Your project {title} approved.
                    </p>
                    <p className="font-roboto font-[400] text-[10px] leading-3 text-[#59588D] mt-[7px]">
                      {time}
                    </p>
                  </div>
                </Link>
              </MenubarItem>
            </React.Fragment>
          ))}
        </MenubarContent>
      </MenubarMenu>
      {/* menu */}
      <MenubarMenu>
        <MenubarTrigger>
          <div className="flex cursor-pointer items-center gap-1.5 text-white">
            <img
              src={profilePicture || `/Face.svg`}
              alt="user"
              className="aspect-square size-[1.625rem] rounded object-cover"
            />
            <p className="hidden text-sm font-medium font-roboto sm:block">
              {userName || formData.full_name}
            </p>
            <FaChevronDown className="text-xs" />
          </div>
        </MenubarTrigger>
        <MenubarContent className="w-[200px] rounded-lg border-none bg-black p-1 font-[300] text-white">
          {menuLinks?.map(({ name, href }) => (
            <React.Fragment key={href}>
              <MenubarItem
                asChild
                className="cursor-pointer rounded-md px-3 py-2.5 text-sm transition-all focus:bg-stone-500 focus:text-white"
              >
                <Link to={href} className="flex items-center gap-1">
                  <BiSolidUser className="text-[#D8A353] text-[18px]" />
                  {name}
                </Link>
              </MenubarItem>
            </React.Fragment>
          ))}
          <hr className="mx-4 hr_line" />
          <MenubarItem
            asChild
            className="cursor-pointer rounded-md px-3 py-2.5 text-sm transition-all focus:text-white"
          >
            <Link to="/user-dashboard/update-password">
              <button className="flex items-center w-full gap-1">
                <PiKeyReturn className="text-[#D8A353] text-[18px]" />
                Update Password
              </button>
            </Link>
          </MenubarItem>
          <hr className="mx-4 hr_line" />

          <MenubarItem
            asChild
            className="cursor-pointer rounded-md px-3 py-2.5 text-sm transition-all focus:text-white"
          >
            {
              <Link to="/" onClick={logout}>
                <button className="flex items-center w-full gap-1">
                  <TbLogin className="text-[#D8A353] text-[18px]" />
                  Logout
                </button>
              </Link>
            }
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
