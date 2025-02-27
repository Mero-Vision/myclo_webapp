import { Grid } from "@mui/material";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import p3 from "../../../../assets/hero/heroImg.png";
import p33 from "../../../../assets/hero/heroImg2.png";
import p1 from "../../../../assets/products/p1.jpg";
import p11 from "../../../../assets/products/p11.jpg";
import p2 from "../../../../assets/products/p2.jpg";
import p22 from "../../../../assets/products/p22.jpg";
import CommonProductCard from "../../../common/commonProductCard/CommonProductCard";

const TodaysPick = () => {
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
               dots: true,
               slidesToShow: 2,
               swipe: true,
            },
         },
         {
            breakpoint: 695,
            settings: {
               dots: true,
               slidesToShow: 2,
               swipe: true,
            },
         },
      ],
   };
   // products fake data
   const productData = [
      {
         productName: "PlayStation DualSense Wireless Controller",
         rating: 1.234,
         originalPrice: 59.99,
         salePrice: 59.99,
         availableStock: 50,
         soldStock: 50,
         image1: p1,
         image2: p11,
         discount: 0,
      },
      {
         productName: "Apple Watch Ultra 2 - Rugged Titanium Case",
         rating: 5,
         originalPrice: 98.0,
         salePrice: 79.99,
         availableStock: 50,
         soldStock: 50,
         image: "image-productimage-product",
         discount: 25,
         image1: p2,
         image2: p22,
      },
      {
         productName: "JBL Tune 750BTNC for Android Tablet",
         rating: 4.234,
         originalPrice: 98.0,
         salePrice: 89.99,
         availableStock: 50,
         soldStock: 50,
         image: "image-productimage-product",
         discount: 8.18,
         image1: p1,
         image2: p11,
      },
      {
         productName: "JBL Live 460nc for Android IOS & Android",
         rating: 3.934,
         originalPrice: 69.99,
         salePrice: 69.99,
         availableStock: 50,
         soldStock: 50,
         image: "image-productimage-product",
         discount: 0,
         image1: p2,
         image2: p22,
      },
      {
         productName: "iPad Mini 6 8.3 inch Wi-Fi 6-5G 64GB",
         rating: 2.434,
         originalPrice: 89.99,
         salePrice: 69.99,
         availableStock: 50,
         soldStock: 50,
         image: "image-productimage-product",
         discount: 22.23,
         image1: p3,
         image2: p33,
      },
      {
         productName: "Bose Live 460nc for Android IOS & Android",
         rating: 3.934,
         originalPrice: 69.99,
         salePrice: 69.99,
         availableStock: 50,
         soldStock: 50,
         image: "image-productimage-product",
         discount: 0,
         image1: p2,
         image2: p22,
      },
   ];

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
                        Todays Popular Pick
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

export default TodaysPick;
