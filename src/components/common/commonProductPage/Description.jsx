import React from "react";

const Description = ({ desc }) => {
   return (
      <p className="text-[14px] lg:text-[18px] font-[400] text-textColor mb-2 lg:mb-5 pr-0 lg:pr-16">
         <p className="text-[20px] text-[#343434] font-[500] mb-[30px]">
            Product Details
         </p>
         <div
            dangerouslySetInnerHTML={{
               __html: desc || "",
            }}
         />
      </p>
   );
};

export default Description;
