import React from "react";

const SaleBanner = () => {
   return (
      <div className="containerWrap">
         <div className="containerBody">
            <div className="commonContainerBodySec">
               <div className="bg-[#FDEBEA] flex  items-center gap-[10px] lg:gap-[20px] flex-col lg:flex-row w-[100%] justify-center px-[15px] py-[21px]">
                  <div className="text-[20px] text-[#181818] font-[600]">
                     Super Sale:
                  </div>
                  <div className="text-[#e43131] border-[#e43131] border-2 border-dashed text-[20px] font-[700] py-[4px] px-[10px] rounded-[4px]">
                     K82FS8
                  </div>
                  <div className="text-[20px] text-[#181818] font-[500]">
                     -20% Discount for first purchse
                  </div>
                  <div className="bg-[#181818] text-[#fff] px-[16px] py-[8px] rounded-[50px] cursor-pointer">
                     Discover More
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SaleBanner;
