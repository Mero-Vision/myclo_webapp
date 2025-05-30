import CachedIcon from "@mui/icons-material/Cached";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { Divider, Grid, Slider } from "@mui/material"; // Import Slider from MUI
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetCategorySingleQuery } from "../../../api/siteSlice";
import {
   setPriceRange,
   setSelectedBrands,
   setSelectedCategories,
} from "../../../rootRedux/utilsSlice"; // Import Redux actions
import CommonSearchProductCard from "../commonSearchProductCard/CommonSearchProductCard";
import CustomBreadCrumbs from "../CustomBreadcrumbs/CustomBreadcrumbs";
import LazyLoadPage from "../lazyLoadPage/LazyLoadPage";
import ScrollToTop from "../scrollToTop/ScrollToTop";

const CommonCategoryProductsPage = () => {
   const { slug } = useParams();
   const dispatch = useDispatch();
   const {
      category,
      brand,
      selectedCategories,
      selectedBrands,
      priceRange,
   } = useSelector((state) => state?.utils);

   // State for debounce
   const [sliderValue, setSliderValue] = useState(priceRange);
   const [debounceTimeout, setDebounceTimeout] = useState(null);

   // Fetch category products
   const {
      data: categoryProducts,
      isFetching: categoryProductsFetching,
      isLoading: categoryProductsLoading,
      refetch: refetchCategoryProducts, // Add refetch function
   } = useGetCategorySingleQuery(
      {
         slug: slug,
         category: selectedCategories.join(","), // Include selected categories in API params
         brand: selectedBrands.join(","), // Include selected brands in API params
         min_price: priceRange[0], // Include min price in API params
         max_price: priceRange[1], // Include max price in API params
      },
      {
         skip: !slug,
      }
   );

   // Refetch data when selectedCategories, selectedBrands, or priceRange changes
   useEffect(() => {
      refetchCategoryProducts();
   }, [
      selectedCategories,
      selectedBrands,
      priceRange,
      refetchCategoryProducts,
   ]);

   const displayedProducts = categoryProducts?.data?.products;
   const isFetching = categoryProductsFetching;
   const isLoading = categoryProductsLoading;

   const handleCategoryChange = (category) => {
      const updatedCategories = selectedCategories.includes(category)
         ? selectedCategories.filter((c) => c !== category)
         : [...selectedCategories, category];
      dispatch(setSelectedCategories(updatedCategories)); // Update Redux state
   };

   const handleBrandChange = (brand) => {
      const updatedBrands = selectedBrands.includes(brand)
         ? selectedBrands.filter((b) => b !== brand)
         : [...selectedBrands, brand];
      dispatch(setSelectedBrands(updatedBrands)); // Update Redux state
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
      }, 1000);

      // Save the timeout ID
      setDebounceTimeout(timeout);
   };

   return (
      <>
         <ScrollToTop />

         <CustomBreadCrumbs query={slug} />
         <div className="containerWrap">
            <div className="containerBody">
               <div className="commonContainerBodySec">
                  <div className="flex flex-row items-end mb-[4px]">
                     <div className="text-[16px] font-[400] mr-[4px] text-[#343434]">
                        Category:
                     </div>
                     <div className="capitalize text-[18px] font-[500] mb-[-1px]">
                        {" "}
                        {slug}
                     </div>
                  </div>

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
                                          ); // Reset selected categories
                                          dispatch(
                                             setSelectedBrands([])
                                          ); // Reset selected brands
                                          dispatch(
                                             setPriceRange([
                                                1, 100000,
                                             ])
                                          ); // Reset price range
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
                                 <div>
                                    <div className="mb-[50px]">
                                       <div className="text-[15px] font-[500] mb-[20px]">
                                          Category
                                       </div>
                                       {category?.data?.map(
                                          (cat, index) => (
                                             <div
                                                key={index}
                                                className="flex items-center mb-[10px]"
                                             >
                                                <input
                                                   type="checkbox"
                                                   id={`cat-${cat?.id}`}
                                                   checked={selectedCategories.includes(
                                                      cat?.name
                                                   )}
                                                   onChange={() =>
                                                      handleCategoryChange(
                                                         cat?.name
                                                      )
                                                   }
                                                   className="mr-[8px] w-[16px] h-[16px] accent-[#fe5874]"
                                                />
                                                <label
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
                                    <div className="mb-[50px]">
                                       <div className="text-[15px] font-[500] mb-[20px]">
                                          Brand
                                       </div>
                                       {brand?.data?.map(
                                          (br, index) => (
                                             <div
                                                key={index}
                                                className="flex items-center mb-[10px]"
                                             >
                                                <input
                                                   type="checkbox"
                                                   id={`brand-${br?.id}`}
                                                   checked={selectedBrands.includes(
                                                      br?.name
                                                   )}
                                                   onChange={() =>
                                                      handleBrandChange(
                                                         br?.name
                                                      )
                                                   }
                                                   className="mr-[8px] w-[16px] h-[16px] accent-[#fe5874]"
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
                                    <div className="mb-[50px]">
                                       <div className="text-[15px] font-[500] mb-[20px]">
                                          Price Range
                                       </div>
                                       <Slider
                                          value={sliderValue} // Use local state for smooth UI
                                          onChange={
                                             handleSliderChange
                                          }
                                          valueLabelDisplay="auto"
                                          min={1}
                                          max={100000}
                                          step={1000}
                                          valueLabelFormat={(value) =>
                                             `Rs. ${value}`
                                          }
                                          sx={{
                                             color: "#fe5874", // Customize slider color
                                          }}
                                       />
                                       <div className="flex justify-between mt-[10px]">
                                          <div className="text-[14px] font-[400]">
                                             Rs. {sliderValue[0]}
                                          </div>
                                          <div className="text-[14px] font-[400]">
                                             Rs. {sliderValue[1]}
                                          </div>
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

export default CommonCategoryProductsPage;
