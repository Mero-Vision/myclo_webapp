import React from "react";
import { useSelector } from "react-redux";
import CustomBreadCrumbs from "../../common/CustomBreadcrumbs/CustomBreadcrumbs";
import ScrollToTop from "../../common/scrollToTop/ScrollToTop";

const TermsAndConditions = () => {
   const { siteSettings } = useSelector((state) => state?.utils);

   return (
      <>
         <ScrollToTop />
         <CustomBreadCrumbs />
         <div className="containerWrap">
            <div className="containerBody">
               {" "}
               <div className="my-[60px]">
                  <div className="text-[40px] font-[700] mb-[30px]">
                     Terms And Conditions{" "}
                  </div>
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
