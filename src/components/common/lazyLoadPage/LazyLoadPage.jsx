import React from "react";
import { Triangle } from "react-loader-spinner";

const LazyLoadPage = ({ page }) => {
   return (
      <div
         className={`flex justify-center items-center w-full ${
            page ? "h-[20vh]" : "h-[90vh]"
         } pb-10`}
      >
         <Triangle
            height="80"
            width="80"
            color="#0D74D6"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
         />
      </div>
   );
};

export default LazyLoadPage;
