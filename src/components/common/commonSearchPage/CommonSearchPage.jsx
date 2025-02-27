import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { Divider, Grid, Slider } from "@mui/material";
import React, { useEffect, useState } from "react"; // Add useState for debounce
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import {
   useGetCategorySingleQuery,
   useGetProductsQuery,
} from "../../../api/siteSlice";

import CachedIcon from "@mui/icons-material/Cached";
import {
   setPriceRange,
   setSelectedBrands,
   setSelectedCategories,
} from "../../../rootRedux/utilsSlice";
import { returnEnglishNumberWithCommas } from "../../../utils/helpers";
import CommonSearchProductCard from "../commonSearchProductCard/CommonSearchProductCard";
import CustomBreadCrumbs from "../CustomBreadcrumbs/CustomBreadcrumbs";
import LazyLoadPage from "../lazyLoadPage/LazyLoadPage";
import ScrollToTop from "../scrollToTop/ScrollToTop";

const CommonSearchPage = () => {
   const location = useLocation();
   const [searchParams] = useSearchParams();
   const query = searchParams.get("query");
   const {
      category,
      brand,
      selectedCategories,
      selectedBrands,
      priceRange,
   } = useSelector((state) => state?.utils);
   const dispatch = useDispatch();

   // State for debounce
   const [sliderValue, setSliderValue] = useState(priceRange);
   const [debounceTimeout, setDebounceTimeout] = useState(null);

   // Update params to include selected categories, brands, and price range
   const params = {
      search_keyword: query,
      category: selectedCategories.join(","),
      brand: selectedBrands.join(","),
      min_price: priceRange[0],
      max_price: priceRange[1],
   };

   const categoryParams = {
      search_keyword: query,
      category: selectedCategories.join(","),
      brand: selectedBrands.join(","),
      min_price: priceRange[0],
      max_price: priceRange[1],
   };

   const isCategoryPage = location.pathname.includes("categories");

   const {
      data: products,
      isFetching: productsFetching,
      isLoading: productsLoading,
      refetch: refetchProducts,
   } = useGetProductsQuery(params, { skip: isCategoryPage });

   const {
      data: categoryProducts,
      isFetching: categoryProductsFetching,
      isLoading: categoryProductsLoading,
      refetch: refetchCategoryProducts,
   } = useGetCategorySingleQuery(
      { params: categoryParams, slug: query },
      {
         skip: !isCategoryPage,
      }
   );

   // Refetch data when selectedCategories, selectedBrands, or priceRange changes
   useEffect(() => {
      if (isCategoryPage) {
         refetchCategoryProducts();
      } else {
         refetchProducts();
      }
   }, [
      selectedCategories,
      selectedBrands,
      priceRange,
      isCategoryPage,
      refetchProducts,
      refetchCategoryProducts,
   ]);

   const displayedProducts = isCategoryPage
      ? categoryProducts?.data?.products
      : products?.data;
   const isFetching = isCategoryPage
      ? categoryProductsFetching
      : productsFetching;
   const isLoading = isCategoryPage
      ? categoryProductsLoading
      : productsLoading;

   const handleCategoryChange = (category) => {
      const updatedCategories = selectedCategories.includes(category)
         ? selectedCategories.filter((c) => c !== category)
         : [...selectedCategories, category];
      dispatch(setSelectedCategories(updatedCategories));
   };

   const handleBrandChange = (brand) => {
      const updatedBrands = selectedBrands.includes(brand)
         ? selectedBrands.filter((b) => b !== brand)
         : [...selectedBrands, brand];
      dispatch(setSelectedBrands(updatedBrands));
   };

   const handleSliderChange = (event, newValue) => {
      // Update local state immediately for smooth UI response
      setSliderValue(newValue);

      // Clear previous timeout
      if (debounceTimeout) {
         clearTimeout(debounceTimeout);
      }

      // Set a new timeout to dispatch the action after 1 second
      const timeout = setTimeout(() => {
         dispatch(setPriceRange(newValue));
      }, 500);

      // Save the timeout ID
      setDebounceTimeout(timeout);
   };

   return (
      <>
         <ScrollToTop />

         {isCategoryPage && <CustomBreadCrumbs query={query} />}
         <div className="containerWrap">
            <div className="containerBody">
               <div className="commonContainerBodySec">
                  {isCategoryPage ? (
                     <div className="flex flex-row items-end mb-[4px]">
                        <div className="text-[16px] font-[400] mr-[4px] text-[#343434]">
                           Categories:
                        </div>
                        <div className="capitalize text-[18px] font-[500] mb-[-1px]">
                           {" "}
                           {query}
                        </div>
                     </div>
                  ) : (
                     <div className="text-[16px] font-[500] mb-[4px]">
                        Search results for &quot;{query}&quot;
                     </div>
                  )}
                  {isFetching || isLoading ? (
                     <LazyLoadPage />
                  ) : (
                     <Grid
                        container
                        spacing={0}
                        className="bg-[#fff]"
                     >
                        <Grid
                           item
                           xs={12}
                           md={2.4}
                           className="flex flex-col p-[15px] border-r-[#ccc] border-r-[0.5px] w-[100%]"
                        >
                           <div className="w-[100%]">
                              <div className="flex justify-between items-center mb-[20px]">
                                 <div className="text-[18px] font-[500]">
                                    Filter
                                 </div>
                                 {displayedProducts?.length !== 0 && (
                                    <div
                                       className="text-[14px] font-[400] text-[#fe5874] cursor-pointer flex items-center gap-[4px]"
                                       onClick={() => {
                                          dispatch(
                                             setSelectedCategories([])
                                          );
                                          dispatch(
                                             setSelectedBrands([])
                                          );
                                          dispatch(
                                             setPriceRange([
                                                1, 100000,
                                             ])
                                          );
                                          setSliderValue([1, 100000]); // Reset local slider state
                                       }}
                                    >
                                       Reset
                                       <CachedIcon
                                          sx={{ fontSize: "18px" }}
                                       />{" "}
                                    </div>
                                 )}
                              </div>
                              {displayedProducts?.length !== 0 && (
                                 <div className="flex flex-col">
                                    <div className="mb-[20px]">
                                       <div className="text-[15px] font-[500] mb-[26px]">
                                          Category
                                       </div>
                                       {category?.data?.map(
                                          (cat, index) => (
                                             <div
                                                onClick={() =>
                                                   handleCategoryChange(
                                                      cat?.name
                                                   )
                                                }
                                                key={index}
                                                className="flex items-center mb-[10px] w-full cursor-pointer"
                                             >
                                                <input
                                                   type="checkbox"
                                                   id={`cat-${cat?.id}`}
                                                   checked={selectedCategories.includes(
                                                      cat?.name
                                                   )}
                                                   // onChange={() =>
                                                   //    handleCategoryChange(
                                                   //       cat?.name
                                                   //    )
                                                   // }
                                                   className="mr-[8px] w-[16px] h-[16px] accent-[#fe5874] cursor-pointer"
                                                />
                                                <label
                                                   // onClick={() =>
                                                   //    handleCategoryChange(
                                                   //       cat?.name
                                                   //    )
                                                   // }
                                                   htmlFor={`cat-${cat?.name}`}
                                                   className="text-[14px] font-[400] cursor-pointer"
                                                >
                                                   {cat?.name}
                                                </label>
                                             </div>
                                          )
                                       )}
                                    </div>
                                    <Divider
                                       sx={{ borderColor: "#eee" }}
                                    />
                                    <div className="my-[20px]">
                                       <div className="text-[15px] font-[500] mb-[20px]">
                                          Brand
                                       </div>
                                       {brand?.data?.map(
                                          (br, index) => (
                                             <div
                                                onClick={() =>
                                                   handleBrandChange(
                                                      br?.name
                                                   )
                                                }
                                                key={index}
                                                className="flex items-center mb-[10px] w-full cursor-pointer"
                                             >
                                                <input
                                                   type="checkbox"
                                                   id={`brand-${br?.id}`}
                                                   checked={selectedBrands.includes(
                                                      br?.name
                                                   )}
                                                   // onChange={() =>
                                                   //    handleBrandChange(
                                                   //       br?.name
                                                   //    )
                                                   // }
                                                   className="mr-[8px] w-[16px] h-[16px] accent-[#fe5874] cursor-pointer"
                                                />
                                                <label
                                                   htmlFor={`brand-${br?.name}`}
                                                   className="text-[14px] font-[400] cursor-pointer"
                                                >
                                                   {br?.name}
                                                </label>
                                             </div>
                                          )
                                       )}
                                    </div>
                                    <Divider
                                       sx={{ borderColor: "#eee" }}
                                    />

                                    <div className="my-[20px]">
                                       <div className="text-[15px] font-[500] mb-[6px]">
                                          Price
                                       </div>
                                       <div className="text-[10px] font-[500] mb-[6px]">
                                          Select Price Range
                                       </div>
                                       <div className="flex gap-2 items-center mt-[10px]">
                                          <div className="text-[14px] font-[400]">
                                             Rs.{" "}
                                             {returnEnglishNumberWithCommas(
                                                sliderValue[0]
                                             )}
                                          </div>
                                          <div>-</div>
                                          <div className="text-[14px] font-[400]">
                                             Rs.{" "}
                                             {returnEnglishNumberWithCommas(
                                                sliderValue[1]
                                             )}
                                          </div>
                                       </div>
                                       <div className="px-[14px]">
                                          <Slider
                                             value={sliderValue} // Use local state for smooth UI
                                             onChange={
                                                handleSliderChange
                                             }
                                             valueLabelDisplay="auto"
                                             min={1}
                                             max={100000}
                                             step={1}
                                             valueLabelFormat={(
                                                value
                                             ) => `Rs. ${value}`}
                                             sx={{
                                                color: "#fe5874",
                                             }}
                                          />
                                       </div>
                                    </div>
                                 </div>
                              )}

                              {displayedProducts?.length === 0 && (
                                 <div>
                                    <Divider
                                       sx={{
                                          borderColor: "#eee",
                                          margin: "20px 0px 25px 0px",
                                       }}
                                    />
                                    <div className="bg-[#eee] flex justify-center text-center items-center gap-[6px] w-[100%] min-h-[100px]">
                                       <div className="">
                                          <ErrorOutlineIcon
                                             sx={{
                                                fontSize: "24px",
                                             }}
                                          />
                                          <div className="text-[16px] font-[300]">
                                             Filters Not Available
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              )}
                           </div>
                        </Grid>
                        <Grid
                           item
                           xs={12}
                           md={9.6}
                           className="flex flex-col p-[6px] lg:p-[15px]"
                        >
                           <Grid container spacing={0}>
                              {displayedProducts?.length ? (
                                 displayedProducts?.map(
                                    (item, index) => (
                                       <CommonSearchProductCard
                                          data={item}
                                          key={index}
                                          showCards={4}
                                       />
                                    )
                                 )
                              ) : (
                                 <div className="flex justify-center text-center items-center gap-[6px] w-[100%] min-h-[100px]">
                                    <WarningAmberOutlinedIcon
                                       sx={{ fontSize: "54px" }}
                                    />
                                    <div className="flex flex-col justify-start">
                                       <div className="text-[14px] font-[400] flex justify-start">
                                          Sorry!
                                       </div>
                                       <div className="text-[16px] font-[400]">
                                          No match found
                                       </div>
                                    </div>
                                 </div>
                              )}
                           </Grid>
                        </Grid>
                     </Grid>
                  )}
               </div>
            </div>
         </div>
      </>
   );
};

export default CommonSearchPage;
