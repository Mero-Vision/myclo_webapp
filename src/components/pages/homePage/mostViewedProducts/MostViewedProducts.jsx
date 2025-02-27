import { Grid } from "@mui/material";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import CommonProductCard from "../../../common/commonProductCard/CommonProductCard";

const MostViewedProducts = () => {
   const sliderRef = useRef();
   const { products } = useSelector((state) => state?.utils);

   const sliderSettings = {
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      infinite: true,
      swipe: false,

      responsive: [
         {
            breakpoint: 1200,
            settings: {
               slidesToShow: 4,
               swipe: true,
               dots: true,
            },
         },
         {
            breakpoint: 1050,
            settings: {
               slidesToShow: 3,
               swipe: true,
               dots: true,
            },
         },
         {
            breakpoint: 880,
            settings: {
               swipe: true,
               dots: true,
               slidesToShow: 2,
            },
         },
         {
            breakpoint: 695,
            settings: {
               swipe: true,
               dots: true,
               slidesToShow: 2,
            },
         },
      ],
   };

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
                        Most-viewed Products
                     </div>
                     <div className="cursor-pointer text-[14px] md:text-[16px] font-[400] text-[#181818] border-b-[1px] border-[#181818] hover:border-b-[2px] hover:mb-[-1px] transition  duration-300 ease-in-out">
                        See All Products
                     </div>
                  </div>
                  <Grid container spacing={0}>
                     <Slider
                        ref={sliderRef}
                        {...sliderSettings}
                        className="w-full dealsPage"
                     >
                        {products?.data?.map((item, index) => (
                           <CommonProductCard
                              data={item}
                              key={index}
                              showCards={6}
                           />
                        ))}
                     </Slider>
                  </Grid>
               </div>
            </div>
         </div>
      </div>
   );
};

export default MostViewedProducts;
