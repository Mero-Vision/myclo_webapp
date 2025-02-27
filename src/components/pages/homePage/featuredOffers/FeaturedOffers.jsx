import React from "react";
import FeaturedOffersList from "./FeaturedOffersList/FeaturedOffersList";

const FeaturedOffers = () => {
   return (
      <div className="containerWrap mt-[40px]">
         <div className="containerBody">
            <div className="commonContainerBodySec">
               <div className="flex flex-col lg:flex-row lg:justify-between items-center mb-[44px]">
                  <div
                     className="titleTwo mb-[8px] lg:mb-[0px] whitespace-nowrap
"
                  >
                     Featured Offers
                  </div>
                  <div className="cursor-pointer text-[14px] md:text-[16px] font-[400] text-[#181818] border-b-[1px] border-[#181818] hover:border-b-[2px] hover:mb-[-1px] transition  duration-300 ease-in-out">
                     See All Products
                  </div>
               </div>

               <FeaturedOffersList />
            </div>
         </div>
      </div>
   );
};

export default FeaturedOffers;
