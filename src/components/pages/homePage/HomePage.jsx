import React from "react";
import { useGetCategoryQuery } from "../../../api/siteSlice";
import LazyLoadPage from "../../common/lazyLoadPage/LazyLoadPage";

import ScrollToTop from "../../common/scrollToTop/ScrollToTop";
import Category from "./category/Category";
import CategoryProductsFirst from "./categoryProductsFirst/CategoryProductFirst";
import Deals from "./deals/Deals";
import FeaturedProducts from "./featuredProducts/FeaturedProducts";
import Hero from "./hero/Hero";
import MarqueeComp from "./marquee/Marquee";
import Policies from "./policies/Policies";
import RecommendedProducts from "./RecommendedProducts/RecommendedProducts";

const HomePage = () => {
   const {
      data: categorySingleData,
      isLoading: isProductSingleDataLoading,
   } = useGetCategoryQuery();

   return (
      <div className="containerWrap">
         <ScrollToTop />
         <Hero />
         <Category />
         <Deals />
         <RecommendedProducts />
         <FeaturedProducts />
         {/* <InfoCards /> */}
         {/* ---------------------- */}
         {isProductSingleDataLoading ? (
            <LazyLoadPage />
         ) : (
            <>
               {categorySingleData &&
                  categorySingleData?.data
                     ?.slice(0, 2)
                     ?.map((item, index) => (
                        <CategoryProductsFirst
                           item={item}
                           key={index}
                        />
                     ))}
            </>
         )}
         {/* ---------------------- */}
         {/* <TodaysPick /> */}
         {/* <SaleBanner /> */}
         {isProductSingleDataLoading ? (
            <LazyLoadPage />
         ) : (
            <>
               {categorySingleData &&
                  categorySingleData?.data
                     ?.slice(2)
                     ?.map((item, index) => (
                        <CategoryProductsFirst
                           item={item}
                           key={index}
                        />
                     ))}
            </>
         )}
         {/* <MostViewedProducts /> */}
         {/* <FeaturedOffers /> */}

         <Policies />
         <MarqueeComp />
      </div>
   );
};

export default HomePage;
