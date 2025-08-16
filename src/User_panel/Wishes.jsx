import React from "react";

const Wishes = ({ data }) => {
   return (
      <div className="py-4">
         <h3 className="text-white font-roboto font-[500] text-[16px] leading-[22.4px]">
            {data.title || "Wish title"}
         </h3>
         <hr className="hr_line max-w-[35%] my-4" />
         <p className="text-[#A1A1A1] font-roboto font-[400] text-[16px] leading-[21px] py-2">
            {data.summary || "You"}
         </p>
      </div>
   );
};

export default Wishes;
