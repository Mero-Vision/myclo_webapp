import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CommonFeaturedProductCard from "../../../common/commonFeaturedProductCard/CommonFeaturedProductCard";

const FeaturedProducts = () => {
   const { products } = useSelector((state) => state?.utils);
   console.log({ products });

   return (
      <div className="containerWrap">
         <div className="containerBody">
            <div className="commonContainerBodySec">
               <div className="flex flex-col">
                  <div className="flex flex-col lg:flex-row lg:justify-between items-center mb-[44px]">
                     <div
                        className="titleTwo mb-[8px] lg:mb-[0px] whitespace-nowrap
"
                     >
                        Featured Products
                     </div>
                  </div>
                  <Grid
                     container
                     spacing={0}
                     className="w-full dealsPage"
                  >
                     {products?.data?.map((item, index) => (
                        <CommonFeaturedProductCard
                           data={item}
                           key={index}
                        />
                     ))}
                  </Grid>
               </div>
            </div>
         </div>
      </div>
   );
};

export default FeaturedProducts;
