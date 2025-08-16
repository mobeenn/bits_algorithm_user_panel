import React from "react";

export const UserBottomHeader = () => {
   return (
      <footer className="mx-4 mt-auto flex flex-col items-center justify-between py-6 text-white md:mx-8 md:flex-row">
         <div className="mb-4 md:mb-0">
            <p className="font-roboto text-base font-normal leading-6 text-white">
               @ 2024, Made with ❤️ by Bits & Algorithm
            </p>
         </div>
         <div className="flex flex-col flex-wrap gap-4 text-center md:flex-row md:gap-12">
            <a
               href="#"
               className="font-roboto text-s font-normal text-white hover:text-blue-500"
            >
               FAQs
            </a>
            <a
               href="#"
               className="font-roboto text-s font-normal text-white hover:text-blue-500"
            >
               Privacy Policy
            </a>
            <a
               href="#"
               className="font-roboto text-s font-normal text-white hover:text-blue-500"
            >
               Terms of Use
            </a>
         </div>
      </footer>
   );
};
