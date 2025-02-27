import React from "react";
import { Outlet } from "react-router-dom";
import CustomGrid from "../../../common/CustomGrid/CustomGrid";
import ScrollToTop from "../../../common/scrollToTop/ScrollToTop";
import MyAccountRoutes from "./MyAccountRoutes";

const MyAccount = () => {
   return (
      <>
         <ScrollToTop />

         <div className="containerWrap">
            <div className="containerBody">
               <div className="commonContainerBodySec">
                  <div className="text-[22px] font-[500] mb-[20px]">
                     My Account{" "}
                  </div>
                  <CustomGrid
                     info={<MyAccountRoutes />}
                     details={<Outlet />}
                  />
               </div>
            </div>
         </div>
      </>
   );
};

export default MyAccount;
