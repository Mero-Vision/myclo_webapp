import React from "react";
import { useSelector } from "react-redux";
import ScrollToTop from "../../common/scrollToTop/ScrollToTop";

const TermsAndConditions = () => {
   const { siteSettings } = useSelector((state) => state?.utils);
   return (
      <>
         <ScrollToTop />
         <div className="containerWrap">
            <div className="containerBody">
               {" "}
               <div className="mb-[60px]">
                  <div className="h-[180px] md:h-[250px] mb-[30px] relative overflow-hidden">
                     <div className="absolute inset-0 bg-[#24639e] transform -skew-y-6 origin-top-left"></div>
                     <div className="relative flex items-center h-[100%] z-10 pl-[15px] md:pl-[30px] text-[18px] md:text-[28px] font-[600] text-[#fff]">
                        Terms & Conditions
                     </div>
                  </div>{" "}
                  <div
                     className="text-[18px]"
                     dangerouslySetInnerHTML={{
                        __html:
                           siteSettings?.data?.terms_conditions || "",
                     }}
                  />
               </div>
            </div>
         </div>
      </>
   );
};

export default TermsAndConditions;
