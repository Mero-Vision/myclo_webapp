import React from "react";
import MenuBox from "./MenuBox/MenuBox";

const Category = () => {
   return (
      <div className="containerWrap mt-[40px]">
         <div className="containerBody">
            <div className="commonContainerBodySec">
               <div className="titleOne mb-[52px] capitalize  text-center">
                  Popular Categories
               </div>
               <MenuBox />
            </div>
         </div>
      </div>
   );
};

export default Category;
