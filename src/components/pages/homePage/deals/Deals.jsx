import { Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import CommonProductCard from "../../../common/commonProductCard/CommonProductCard";
import "../featuredOffers/FeaturedOffersList/FeaturedOffersList.css";

const Deals = () => {
   const { products } = useSelector((state) => state?.utils);
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
   const [activeIndex, setActiveIndex] = useState("all"); // Default to "All Products"
   const sliderRef = useRef();

   // Get the first 10 products
   const slicedProducts = products?.data?.slice(0, 5) || [];

   // Map categories from products
   const categoryMap = slicedProducts.reduce((acc, product) => {
      if (product.category?.id && product.category?.name) {
         acc.set(product.category.id, product.category.name);
      }
      return acc;
   }, new Map());

   const categoryNames = Array.from(categoryMap, ([id, name]) => ({
      id,
      name,
   }));

   // Add "All Products" as the first category
   const combinedData = [
      { id: "all", name: "All Products" },
      ...categoryNames,
   ];

   // Filter products based on selected category
   const filteredProducts =
      activeIndex === "all"
         ? slicedProducts
         : slicedProducts.filter(
              (product) => product.category?.id === activeIndex
           );

   const slideCount = filteredProducts.length;

   const sliderSettings = {
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      infinite: false,
      swipe: false,
      initialSlide: 0,
      centerMode: false,
      responsive: [
         {
            breakpoint: 1200,
            settings: {
               slidesToShow: Math.min(4, slideCount),
               slidesToScroll: 2,
               swipe: slideCount > 4,
               dots: slideCount > 4,
               infinite: false,
            },
         },
         {
            breakpoint: 1050,
            settings: {
               slidesToShow: Math.min(3, slideCount),
               slidesToScroll: 2,
               swipe: slideCount > 3,
               dots: slideCount > 3,
               infinite: false,
            },
         },
         {
            breakpoint: 880,
            settings: {
               slidesToShow: Math.min(2, slideCount),
               slidesToScroll: 2,
               swipe: slideCount > 2,
               dots: slideCount > 2,
               infinite: false,
            },
         },
         {
            breakpoint: 695,
            settings: {
               slidesToShow: Math.min(2, slideCount),
               slidesToScroll: 2,
               swipe: slideCount > 2,
               dots: slideCount > 2,
               infinite: false,
            },
         },
      ],
   };

   useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   const shouldUseSlider = () => {
      if (windowWidth <= 695) {
         return slideCount > 2;
      } else if (windowWidth <= 880) {
         return slideCount > 2;
      } else if (windowWidth <= 1050) {
         return slideCount > 3;
      } else if (windowWidth <= 1200) {
         return slideCount > 4;
      }
      return true;
   };

   const getGridLayout = () => {
      if (windowWidth <= 695) return { xs: 6 };
      if (windowWidth <= 880) return { xs: 6 };
      if (windowWidth <= 1050) return { xs: 6, sm: 4 };
      if (windowWidth <= 1200) return { xs: 6, sm: 4, md: 3 };
      return { xs: 6, sm: 4, md: 3, lg: 2.4 };
   };

   return (
      <div className="containerWrap">
         <div className="containerBody">
            <div className="commonContainerBodySec">
               <div className="flex flex-col">
                  <div className="flex flex-col lg:flex-row lg:justify-between items-center mb-[44px]">
                     <div className="titleTwo mb-[8px] lg:mb-[0px] whitespace-nowrap">
                        Recently Added Products
                     </div>
                     <div className="flex items-center gap-[8px] flex-wrap w-[100%] justify-center lg:justify-end">
                        {combinedData?.map((item) => (
                           <button
                              key={item.id}
                              onClick={() => setActiveIndex(item.id)}
                              className={`rounded-[50px] px-[15px] py-[4px] border 
                                 ${
                                    activeIndex === item.id
                                       ? "bg-[#FDEBEA] border-[#E43131] text-[#E43131] text-[12px] md:text-[14px]"
                                       : "bg-[#fff] text-[#181818] border-[#e9e9e9] text-[12px] md:text-[14px] hover:text-[#E43131] hover:bg-[#FDEBEA] hover:border-[#E43131] transition duration-300 ease-in-out"
                                 }`}
                           >
                              {item.name}
                           </button>
                        ))}
                     </div>
                  </div>
                  {shouldUseSlider() ? (
                     <Slider
                        ref={sliderRef}
                        {...sliderSettings}
                        className="w-full dealsPage"
                     >
                        {filteredProducts.map((item) => (
                           <CommonProductCard
                              data={item}
                              key={item.id}
                           />
                        ))}
                     </Slider>
                  ) : (
                     <Grid container spacing={0}>
                        {filteredProducts.map((item) => (
                           <Grid
                              item
                              {...getGridLayout()}
                              key={item.id}
                           >
                              <CommonProductCard data={item} />
                           </Grid>
                        ))}
                     </Grid>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Deals;
