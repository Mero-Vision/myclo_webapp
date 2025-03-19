import { Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { useGetRecommendedProductsQuery } from "../../../../api/siteSlice";
import CommonProductCard from "../../../common/commonProductCard/CommonProductCard";

const RecommendedProducts = () => {
   const {
      data: recommendedProductsData,
      isLoading: isRecommendedProductsDataLoading,
   } = useGetRecommendedProductsQuery();
   const sliderRef = useRef();
   const { products } = useSelector((state) => state?.utils);
   const navigate = useNavigate();
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

   const params = {
      limit: "6",
   };

   const slideCount =
      (recommendedProductsData?.data &&
         recommendedProductsData?.data?.length) ||
      0;

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

   // Determine if we should use the Slider or Grid based on window width and slide count
   const shouldUseSlider = () => {
      if (windowWidth <= 695) {
         return slideCount > 2; // Use Slider only if slide count is more than 2
      } else if (windowWidth <= 880) {
         return slideCount > 2; // Use Slider only if slide count is more than 2
      } else if (windowWidth <= 1050) {
         return slideCount > 3; // Use Slider only if slide count is more than 3
      } else if (windowWidth <= 1200) {
         return slideCount > 4; // Use Slider only if slide count is more than 4
      }
      return true; // Use Slider for larger screens
   };

   // Determine the Grid layout based on window width
   const getGridLayout = () => {
      if (windowWidth <= 695) {
         return { xs: 6 }; // 2 items per row
      } else if (windowWidth <= 880) {
         return { xs: 6 }; // 2 items per row
      } else if (windowWidth <= 1050) {
         return { xs: 6, sm: 4 }; // 2 items on xs, 3 items on sm and above
      } else if (windowWidth <= 1200) {
         return { xs: 6, sm: 4, md: 3 }; // 2 items on xs, 3 items on sm, 4 items on md and above
      }
      return { xs: 6, sm: 4, md: 3, lg: 2.4 }; // Default layout for larger screens
   };

   return (
      <>
         {recommendedProductsData?.data?.products?.length !== 0 ? (
            <div className="containerWrap">
               <div className="containerBody">
                  <div className="commonContainerBodySec">
                     <div className="flex flex-col">
                        <div className="flex flex-col lg:flex-row lg:justify-between items-center mb-[44px]">
                           <div className="titleTwo mb-[8px] lg:mb-[0px] whitespace-nowrap">
                              Recommended Products
                           </div>
                           {/* <div
                              onClick={() =>
                                 navigate(`/categories/${item?.slug}`)
                              }
                              className="cursor-pointer text-[14px] md:text-[16px] font-[400] text-[#181818] border-b-[1px] border-[#181818] hover:border-b-[2px] hover:mb-[-1px] transition duration-300 ease-in-out"
                           >
                              See All Products
                           </div> */}
                        </div>
                        {shouldUseSlider() ? (
                           <Slider
                              ref={sliderRef}
                              {...sliderSettings}
                              className="w-full dealsPage"
                           >
                              {recommendedProductsData?.data?.map(
                                 (item, index) => (
                                    <CommonProductCard
                                       data={item}
                                       key={index}
                                    />
                                 )
                              )}
                           </Slider>
                        ) : (
                           <Grid container spacing={0}>
                              {recommendedProductsData?.data?.map(
                                 (item, index) => (
                                    <Grid
                                       item
                                       {...getGridLayout()}
                                       key={index}
                                    >
                                       <CommonProductCard
                                          data={item}
                                       />
                                    </Grid>
                                 )
                              )}
                           </Grid>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         ) : (
            ""
         )}
      </>
   );
};

export default RecommendedProducts;
