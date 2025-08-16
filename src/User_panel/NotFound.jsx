import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
   return (
      <section className="flex justify-center  items-center bg-white  min-h-svh ">
         <div className=" flex items-center justify-center  px-5 mx-auto my-8">
            <div className="max-w-md text-center">
               <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
                  <span>Error </span>404
               </h2>
               <p className="my-9 text-black text-2xl font-semibold">
                  Sorry, we couldn't find this page.
               </p>

               <Link
                  to="/"
                  className="text-white  px-8 py-3 font-semibold rounded bg-blue-700"
               >
                  Back to homepage
               </Link>
            </div>
         </div>
      </section>
   );
};
