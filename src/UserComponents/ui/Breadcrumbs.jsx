// Breadcrumbs.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
   const location = useLocation();

   const paths = [
      { name: "Pages", url: "/" },
      {
         name:
            location.pathname === "/personal-details"
               ? "Personal Details"
               : "Dashboard",
      },
   ];

   return (
      <nav className="text-xs font-normal leading-3">
         {paths.map((path, index) => (
            <span key={index} className="text-[#A0AEC0]">
               {path.url ? (
                  <Link to={path.url} className="hover:underline">
                     {path.name}
                  </Link>
               ) : (
                  <span>{path.name}</span>
               )}
               {index < paths.length - 1 && <span> / </span>}
            </span>
         ))}
      </nav>
   );
};

export default Breadcrumbs;
