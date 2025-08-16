import { Link, useLocation } from "react-router-dom";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { useStore } from "../store";
import { navLinks } from "../lib/data";

export default function UserSideNav() {
   const isNavOpen = useStore((state) => state.isNavOpen);
   const setIsNavOpen = useStore((state) => state.setIsNavOpen);

   return (
      <>
         <div>
            <nav
               className={`max-w-[274px] h-screen text-white bg-[#060B26] rounded-lg fixed top-2 xl:left-2 transition-all duration-300 ${
                  isNavOpen
                     ? "left-2 shadow-[0px_0px_0px_10000px_rgba(0,0,0,0.6)]"
                     : "-left-[264px]"
               }`}
            >
               <div className="flex items-start py-7 px-2 ">
                  <img src="/Logo.svg" className=" max-w-[220px]" />
                  <i
                     className="text-[18px] xl:hidden "
                     onClick={() => setIsNavOpen(false)}
                  >
                     <IoMdClose />
                  </i>
               </div>
               <div className="h-[calc(100svh-304px)] scroll-container overflow-hidden hover:overflow-auto ">
                  <ul>
                     {navLinks.map((item) => (
                        <NavLink
                           key={item.href}
                           name={item.name}
                           href={item.href}
                           icon={item.icon}
                        />
                     ))}
                  </ul>
               </div>
               <div
                  className="h-[170px] p-4 mx-4 mt-5 rounded-[10px] bg-no-repeat bg-cover bg-center"
                  style={{ backgroundImage: `url("/dashboard.svg")` }}
               >
                  <button className="p-[8.5px] bg-white rounded-[10px]">
                     {" "}
                     <BsFillQuestionCircleFill className="text-[#0075FF]" />
                  </button>
                  <div className="mt-5 text-white font-roboto font-[500] text-[16px] leading-5">
                     <h3>Need help?</h3>
                     <p>Let us clear your all queries</p>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                     <button className="btn px-4  rounded-[3px] text-[13px] font-roboto font-[400] leading-7">
                        FAQs
                     </button>

                     <p className="text-white font-roboto font-[500] text-[16px] leading-5">
                        OR
                     </p>
                     <Link to="/contact">
                        <button className="btn px-4  rounded-[3px] text-[13px] font-roboto font-[400] leading-7">
                           Contact Us
                        </button>
                     </Link>
                  </div>
               </div>
            </nav>
         </div>
      </>
   );
}

function NavLink({ href, name, icon: Icon }) {
   const { pathname } = useLocation();
   const isActive = pathname === href;
   console.log(href, pathname);

   return (
      <li>
         <Link
            to={href}
            className={`flex items-center w-[80%] py-3 my-2 mx-6 hover:bg-[#1A1F37] rounded-[10px] group ${
               isActive && "bg-[#1A1F37]"
            }`}
         >
            <div
               className={`mx-3  py-3 px-3 rounded-lg group-hover:bg-blue-500 group-hover:text-white ${
                  isActive ? "bg-blue-500 text-white" : "bg-[#1A1F37]"
               } `}
            >
               {Icon && <Icon />}
            </div>
            {name}
         </Link>
      </li>
   );
}
