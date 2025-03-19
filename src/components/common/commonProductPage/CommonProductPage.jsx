import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// -----------------
import { Add, Remove } from "@mui/icons-material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import {
   Box,
   Divider,
   Grid,
   LinearProgress,
   Tooltip,
   useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useGetMyProductsQuery } from "../../../api/productsApi";
import {
   useDeleteWishlistMutation,
   useGetCartsQuery,
   useGetCategorySingleQuery,
   useGetProductSingleQuery,
   useGetWishlistQuery,
   usePostCartsMutation,
   usePostRequestSwapMutation,
   usePostWishlistMutation,
} from "../../../api/siteSlice";
import {
   getError,
   returnNepaliNumberWithCommas,
} from "../../../utils/helpers";
import { isLoggedIn } from "../../../utils/IsLoggedIn";
import LoginModal from "../../pages/auth/login/LoginModal";
import CommonSimilarProductCard from "../commonSimilarProducts/CommonSimilarProductCard";
import CustomBreadCrumbs from "../CustomBreadcrumbs/CustomBreadcrumbs";
import CustomModal from "../CustomModal/CustomModal";
import CustomSpinLoader from "../CustomSpinLoader/CustomSpinLoader";
import customToaster from "../CustomToasters/CustomToaster";
import ProductImageZoom from "../ImageZoom/ImageZoom";
import LazyLoadPage from "../lazyLoadPage/LazyLoadPage";
import ScrollToTop from "../scrollToTop/ScrollToTop";
import Description from "./Description";
import FAQS from "./FAQS";
import Reviews from "./Reviews";

const CommonProductPage = () => {
   const pathname = window.location.pathname;
   useEffect(() => {
      window.scrollTo(0, 0);
   }, [pathname]);
   console.log({ pathname });
   const isMobile = useMediaQuery("(max-width: 1048px)");

   const { slug } = useParams();
   const { products } = useSelector((state) => state?.utils);
   const {
      data: productSingleData,
      isLoading: isProductSingleDataLoading,
      refetch: productSingleRefetch,
   } = useGetProductSingleQuery(slug);
   const { refetch: cartRefetch } = useGetCartsQuery(
      {},
      {
         skip: !isLoggedIn(),
      }
   );
   const { refetch: wishlistRefetch } = useGetWishlistQuery(
      {},
      {
         skip: !isLoggedIn(),
      }
   );
   const [
      postCarts,
      {
         error: cartsError,
         isLoading: isCartsLoading,
         isSuccess: isCartsSuccess,
      },
   ] = usePostCartsMutation();
   const [
      deleteWishlist,
      {
         error: deleteWishlistError,
         isLoading: isDeleteWishlistLoading,
         isSuccess: isDeleteWishlistSuccess,
      },
   ] = useDeleteWishlistMutation();

   const [
      postWishlist,
      {
         error: wishlistError,
         isLoading: isWishlistLoading,
         isSuccess: isWishlistSuccess,
      },
   ] = usePostWishlistMutation();
   console.log({ slug, products });
   const navigate = useNavigate();
   const [quantity, setQuantity] = useState(1);
   const [loginModal, setLoginModal] = useState(false);
   const [swapModal, setSwapModal] = useState(false);
   const [img, setImg] = useState();
   const [selectedVarient, setSelectedVarient] = useState(null);

   useEffect(() => {
      getError(cartsError);
   }, [cartsError]);
   useEffect(() => {
      getError(wishlistError);
   }, [wishlistError]);

   useEffect(() => {
      if (productSingleData?.data?.product_images?.length) {
         setImg(
            productSingleData?.data?.product_images?.[0]
               ?.product_image
         );
      }
   }, [productSingleData?.data?.product_images]);

   console.log({ img });
   console.log("ddsdsdssdsd", { img, productSingleData });

   const handleAdd = () => {
      setQuantity(quantity + 1);
   };
   const handleRemove = () => {
      quantity >= 2 && setQuantity(quantity - 1);
   };

   console.log({ selectedVarient });

   const sellingPrice = selectedVarient?.selling_price
      ? Number(selectedVarient?.selling_price)
      : Number(productSingleData?.data?.selling_price);
   const crossPrice = selectedVarient
      ? Number(selectedVarient?.cross_price)
      : Number(productSingleData?.data?.cross_price);
   const discountTrue = sellingPrice < crossPrice;

   const discountPercentage =
      ((crossPrice - sellingPrice) / crossPrice) * 100;

   console.log({
      sellingPrice,
      crossPrice,
      discountPercentage,
      discountTrue,
   });

   const tabData = [
      { label: "Description", value: "description" },
      { label: "Ratings and Reviews", value: "ratings_and_reviews" },
      // { label: "FAQs", value: "faqs" },
   ];

   const [activeTab, setActiveTab] = useState(tabData?.[0]?.value);

   const renderContent = () => {
      switch (activeTab) {
         case "description":
            return (
               <Description
                  desc={productSingleData?.data?.description}
               />
            );
         case "ratings_and_reviews":
            return <Reviews product={productSingleData?.data} />;
         case "faqs":
            return <FAQS />;
         default:
            return null;
      }
   };

   const handleAddToCart = () => {
      if (isLoggedIn()) {
         const payload = {
            quantity: quantity,
            product_id: productSingleData?.data?.id,
            price: productSingleData?.data?.selling_price,
         };
         const payloadVarient = {
            quantity: quantity,
            product_varient_id: selectedVarient?.id || "",
            product_id: productSingleData?.data?.id,
            price: productSingleData?.data?.selling_price,
         };
         postCarts(selectedVarient ? payloadVarient : payload);
      } else {
         setLoginModal(true);
      }
   };
   useEffect(() => {
      if (isCartsSuccess) {
         cartRefetch();
         customToaster({
            message: "Product addded to cart.",
            type: "success",
         });
      }
   }, [isCartsSuccess, cartRefetch]);
   const handleAddToWishlist = () => {
      if (isLoggedIn()) {
         const payload = {
            product_id: productSingleData?.data?.id,
         };
         postWishlist(payload);
      } else {
         setLoginModal(true);
      }
   };
   const handleDeleteWishlist = () => {
      deleteWishlist({ id: productSingleData?.data?.wishlist?.id });
   };
   useEffect(() => {
      if (isWishlistSuccess) {
         wishlistRefetch();
         productSingleRefetch();
         customToaster({
            message: "Product addded to wishlist.",
            type: "success",
         });
      }
   }, [isWishlistSuccess, wishlistRefetch, productSingleRefetch]);
   useEffect(() => {
      if (isDeleteWishlistSuccess) {
         wishlistRefetch();
         productSingleRefetch();
         customToaster({
            message: "Product removed from wishlist.",
            type: "success",
         });
      }
   }, [
      isDeleteWishlistSuccess,
      wishlistRefetch,
      productSingleRefetch,
   ]);

   const handleRentNow = () => {
      if (isLoggedIn()) {
         navigate("/rent-now", {
            state: {
               product: productSingleData?.data,
               quantity,
            },
         });
      } else {
         setLoginModal(true);
      }
   };
   return (
      <>
         <ScrollToTop />
         <div>
            {isProductSingleDataLoading ? (
               <LazyLoadPage />
            ) : (
               <>
                  <CustomBreadCrumbs products />
                  <div className="containerWrap">
                     <div className="containerBody">
                        <div className="commonContainerBodySec">
                           <Grid
                              container
                              spacing={0}
                              className="bg-[#fff] p-[10px] md:p-[20px] mb-[30px]"
                           >
                              <Grid
                                 item
                                 xs={12}
                                 md={5}
                                 className="flex flex-col lg:pb-[0px] pb-[30px]"
                              >
                                 <div className="w-full h-auto flex justify-center mr-[0px] md:pr-[40px]">
                                    <ProductImageZoom
                                       selectedVarient={
                                          selectedVarient
                                       }
                                       images={
                                          productSingleData?.data
                                             ?.product_images
                                             ?.length !== 0
                                             ? productSingleData?.data
                                                  ?.product_images
                                             : []
                                       }
                                    />
                                 </div>
                              </Grid>
                              <Grid
                                 item
                                 xs={12}
                                 md={7}
                                 className="h-auto pt-[30px] lg:pt-0 border-[#eee] border-t-[1px] lg:border-none"
                              >
                                 {productSingleData?.data?.brand
                                    ?.name && (
                                    <div className="flex text-center gap-[10px] mb-3">
                                       <div
                                          onClick={() =>
                                             navigate(
                                                `/brands/${productSingleData?.data?.brand?.slug}`
                                             )
                                          }
                                          className="py-[2px] px-[6px] cursor-pointer rounded-[4px] bg-[#5FA5FC] text-[#fff] w-fit text-[12px]"
                                       >
                                          {
                                             productSingleData?.data
                                                ?.brand?.name
                                          }
                                       </div>
                                    </div>
                                 )}
                                 <div className="mb-2 lg:mb-1 flex items-start justify-between">
                                    <p className="text-[20px] lg:text-[30px] font-[500] text-textColor ">
                                       {productSingleData?.data
                                          ?.name || ""}
                                    </p>
                                    {/* <button
                                       disabled={
                                          isWishlistLoading ||
                                          isDeleteWishlistLoading
                                       }
                                       onClick={
                                          productSingleData?.data
                                             ?.wishlist?.id
                                             ? handleDeleteWishlist
                                             : handleAddToWishlist
                                       }
                                       className={`flex justify-center gap-[10px] border-[1px] bg-[#5FA5FC] border-[#5FA5FC] hover:bg-[#ffffff] text-[#ffffff] hover:text-[#5FA5FC] duration-300 py-[14px] md:py-[10px] px-[10px] md:px-[40px] rounded-[4px] w-[100%] md:w-fit text-[16px] font-[500] ${
                                          isWishlistLoading ||
                                          isDeleteWishlistLoading
                                             ? "cursor-not-allowed opacity-60"
                                             : ""
                                       }`}
                                    >
                                       {(isWishlistLoading ||
                                          isDeleteWishlistLoading) && (
                                          <CustomSpinLoader />
                                       )}{" "}
                                       {productSingleData?.data
                                          ?.wishlist?.id
                                          ? " Remove from Wishlist"
                                          : " Add to Wishlist"}
                                    </button> */}
                                    <button
                                       className={`${
                                          isWishlistLoading ||
                                          isDeleteWishlistLoading
                                             ? "cursor-not-allowed opacity-60"
                                             : ""
                                       }`}
                                       disabled={
                                          isWishlistLoading ||
                                          isDeleteWishlistLoading
                                       }
                                       onClick={
                                          productSingleData?.data
                                             ?.wishlist?.id
                                             ? handleDeleteWishlist
                                             : handleAddToWishlist
                                       }
                                    >
                                       {productSingleData?.data
                                          ?.wishlist?.id ? (
                                          <Tooltip
                                             title="Remove from wishlist"
                                             arrow
                                          >
                                             <FavoriteOutlinedIcon
                                                sx={{
                                                   fontSize: "34px",
                                                }}
                                             />
                                          </Tooltip>
                                       ) : (
                                          <Tooltip
                                             title="Add to wishlist"
                                             arrow
                                          >
                                             <FavoriteBorderOutlinedIcon
                                                sx={{
                                                   fontSize: "34px",
                                                }}
                                             />
                                          </Tooltip>
                                       )}
                                    </button>
                                 </div>
                                 <Divider
                                    sx={{
                                       margin: "14px 0px",
                                       borderColor: "#eee",
                                    }}
                                 />
                                 <div className="mb-8 flex flex-row items-center">
                                    <div className="mb-1 mr-[33px] text-[16px] text-[#979797] capitalize">
                                       Rating:
                                    </div>
                                    <div className="flex flex-row items-center gap-[10px]">
                                       <div className="text-[38px] font-[400]">
                                          {Number(
                                             productSingleData?.data
                                                ?.average_rating
                                          )?.toFixed(1)}
                                       </div>
                                       <StarOutlinedIcon
                                          sx={{ color: " gold" }}
                                       />
                                    </div>
                                 </div>
                                 <div className="mb-10 flex flex-row items-center">
                                    <div className="mb-1 mr-[20px] text-[16px] text-[#979797] capitalize">
                                       Quantity:
                                    </div>
                                    <div className="border-[1px] rounded-[4px] border-[rgb(13,13,13)] py-[6px] px-[8px] w-fit flex flex-row items-center gap-5">
                                       <div
                                          onClick={handleRemove}
                                          className={`cursor-pointer ${
                                             quantity === 1
                                                ? "text-[#b1b1b1]"
                                                : "text-[#0D0D0D]"
                                          } duration-300 ease-in-out `}
                                       >
                                          {" "}
                                          <Remove />{" "}
                                       </div>
                                       <div
                                          className="w-[11px] select-none
"
                                       >
                                          {quantity}
                                       </div>
                                       <div
                                          onClick={handleAdd}
                                          className="cursor-pointer text-[#0D0D0D] "
                                       >
                                          {" "}
                                          <Add />{" "}
                                       </div>
                                    </div>
                                 </div>
                                 <div className="mb-10 flex flex-row items-center">
                                    <div className=" mr-[20px] text-[16px] text-[#979797] capitalize">
                                       Category:
                                    </div>
                                    <div
                                       className="text-[14px] pt-[2px] text-[#5FA5FC] border-transparent border-b-[1px] leading-[18px] cursor-pointer hover:border-[#5FA5FC] hover:border-b-[1px]"
                                       onClick={() =>
                                          navigate(
                                             `/categories/${productSingleData?.data?.category?.slug}`
                                          )
                                       }
                                    >
                                       {
                                          productSingleData?.data
                                             ?.category?.name
                                       }
                                    </div>
                                 </div>

                                 <Divider
                                    sx={{
                                       margin: "14px 0px",
                                       borderColor: "#eee",
                                    }}
                                 />

                                 <div className="flex flex-col mb-2 lg:mb-5">
                                    <div className=" flex flex-row gap-[12px] justify-end items-end w-[100%]">
                                       {discountTrue && (
                                          <p
                                             className="text-[20px] lg:text-[28px] text-[#343434] font-[300] text-textColor line-through
                                          "
                                          >
                                             Rs.{" "}
                                             {returnNepaliNumberWithCommas(
                                                crossPrice || 0
                                             )}
                                          </p>
                                       )}
                                       <p className="text-[20px] lg:text-[28px] text-[#5FA5FC] font-[500] text-textColor flex justify-end">
                                          Rs.{" "}
                                          {returnNepaliNumberWithCommas(
                                             sellingPrice || 0
                                          )}
                                       </p>
                                       {discountTrue && (
                                          <div className="flex justify-end items-center gap-[10px]">
                                             <p className="text-[20px] lg:text-[28px] text-[#343434] font-[400] text-textColor px-[6px]">
                                                |
                                             </p>
                                             <p className="text-[20px] lg:text-[28px] text-[#5FA5FC] font-[600] text-textColor ">
                                                -
                                                {discountPercentage?.toFixed(
                                                   2
                                                )}
                                                %
                                             </p>
                                          </div>
                                       )}
                                    </div>
                                    <div className="text-[12px] md:text-[14px] flex justify-end text-[#343434]">
                                       (Inclusive of all Taxes)
                                    </div>
                                 </div>

                                 <div className="mb-8">
                                    {productSingleData?.data?.productInfoList?.map(
                                       (item, index) => {
                                          return (
                                             <div
                                                className="flex"
                                                key={index}
                                             >
                                                <p className="min-w-[100px] text-[15px] lg:text-[17px] text-textColor mb-3">
                                                   {item?.title}
                                                </p>
                                                <p className="text-[15px] lg:text-[17px]">
                                                   : {item?.info}
                                                </p>
                                             </div>
                                          );
                                       }
                                    )}
                                 </div>
                                 <div className="mb-5"></div>

                                 <div className="mb-8 flex flex-row justify-end gap-2">
                                    {!productSingleData?.data
                                       ?.stock ? (
                                       <>
                                          <button
                                             disabled={isCartsLoading}
                                             onClick={() =>
                                                setSwapModal(true)
                                             }
                                             className={`flex justify-center items-center gap-[10px] border-[1px] bg-[#5FA5FC] border-[#5FA5FC] hover:bg-[#ffffff] text-[#ffffff] hover:text-[#5FA5FC] duration-300 py-[12px] md:py-[10px] px-[6px] md:px-[40px] rounded-[4px] w-[100%] md:w-fit text-[14px] md:text-[16px] font-[500] `}
                                          >
                                             {isCartsLoading && (
                                                <CustomSpinLoader />
                                             )}{" "}
                                             Swap
                                          </button>
                                          <button
                                             disabled={isCartsLoading}
                                             onClick={handleAddToCart}
                                             className={`flex justify-center items-center gap-[10px] border-[1px] bg-[#ffffff] border-[#5FA5FC] hover:bg-[#5FA5FC] text-[#5FA5FC] hover:text-[#ffffff] duration-300 py-[12px] md:py-[10px] px-[6px] md:px-[40px] rounded-[4px] w-[100%] md:w-fit text-[14px] md:text-[16px] font-[500] ${
                                                isCartsLoading
                                                   ? "cursor-not-allowed opacity-60"
                                                   : ""
                                             }`}
                                          >
                                             {isCartsLoading && (
                                                <CustomSpinLoader />
                                             )}{" "}
                                             Add to Cart
                                          </button>
                                          {productSingleData?.data
                                             ?.rental_product
                                             ?.length !== 0 && (
                                             <button
                                                onClick={
                                                   handleRentNow
                                                }
                                                className={`flex justify-center items-center gap-[10px] border-[1px] bg-[#5FA5FC] border-[#5FA5FC] hover:bg-[#ffffff] text-[#ffffff] hover:text-[#5FA5FC] duration-300 py-[12px] md:py-[10px] px-[6px] md:px-[40px] rounded-[4px] w-[100%] md:w-fit text-[14px] md:text-[16px] font-[500] `}
                                             >
                                                Rent Now
                                             </button>
                                          )}
                                       </>
                                    ) : (
                                       <button
                                          disabled
                                          className="border-[1px] bg-[#ffffff] border-[#f23372] text-[#f23372]  py-2 w-[100%] md:w-[50%] text-[16px] cursor-not-allowed"
                                       >
                                          Out of stock
                                       </button>
                                    )}
                                 </div>
                              </Grid>
                           </Grid>
                           <div className="flex ">
                              {tabData.map((tab) => (
                                 <button
                                    key={tab.value}
                                    className={`px-6 py-3 text-[16px] font-[500] mx-[1px] focus:outline-none transition-all
                                          ${
                                             activeTab === tab.value
                                                ? " text-[#fff] bg-[#5FA5FC]"
                                                : "text-[#343434] hover:text-[#fff] hover:bg-[#5FA5FC]"
                                          }`}
                                    onClick={() =>
                                       setActiveTab(tab.value)
                                    }
                                 >
                                    {tab.label}
                                 </button>
                              ))}
                           </div>
                           <Grid
                              container
                              spacing={0}
                              className="  mt-[0px]"
                           >
                              <Grid
                                 item
                                 xs={12}
                                 md={9}
                                 className="bg-[#fff] p-[20px]"
                              >
                                 <div className="flex flex-col">
                                    <>{renderContent()}</>
                                 </div>
                              </Grid>
                           </Grid>
                        </div>
                     </div>
                  </div>
                  <CustomModal
                     noPadding
                     open={loginModal}
                     width={isMobile ? "90%" : "1000px"} // Adjust width based on screen size
                     handleClose={() => setLoginModal(false)}
                     // height={"84vh"}
                  >
                     <LoginModal
                        handleClose={() => setLoginModal(false)}
                     />
                  </CustomModal>
                  <CustomModal
                     noPadding
                     open={swapModal}
                     width={isMobile ? "90%" : "1000px"} // Adjust width based on screen size
                     handleClose={() => setSwapModal(false)}
                     // height={"84vh"}
                  >
                     <SwapModal
                        handleClose={() => setSwapModal(false)}
                        singleProduct={productSingleData?.data}
                     />
                  </CustomModal>
               </>
            )}
         </div>
         <SingleCategoryComponent
            singleProductData={productSingleData?.data}
         />
      </>
   );
};
const SwapModal = ({ singleProduct, handleClose }) => {
   const [selectedProduct, setSelectedProduct] = useState("");
   const [error, setError] = useState(""); // State to handle error message
   const { data: productsData, isFetching } = useGetMyProductsQuery();
   const [
      postRequestSwap,
      { isLoading: isLoadingSwap, isSuccess, error: postError },
   ] = usePostRequestSwapMutation();

   const handleSwap = () => {
      if (!selectedProduct) {
         setError("Please select a product to swap."); // Set error message if no product is selected
         return;
      }

      const payload = {
         requester_product_id: selectedProduct,
         owner_product_id: singleProduct?.id,
      };
      postRequestSwap(payload)
         .unwrap()
         .then(() => {
            customToaster({
               message: "Product swapped successfully.",
               type: "success",
            });
         });
   };

   useEffect(() => {
      if (isSuccess) {
         handleClose();
      }
   }, [isSuccess, handleClose]);

   const handleCloseModal = () => {
      handleClose();
   };

   return (
      <>
         {isFetching ? (
            <Box className="py-[40px] px-[30px] bg-[#fff]">
               <LinearProgress />
            </Box>
         ) : (
            <Box className="py-[40px] px-[30px]">
               <Box className="text-[22px] font-[500] mb-[20px]">
                  Swap Products
               </Box>
               {productsData?.data?.length !== 0 ? (
                  <>
                     <Grid
                        container
                        spacing={0}
                        className="mb-[20px]"
                     >
                        {productsData?.data?.map((item, index) => (
                           <Grid
                              item
                              xs={12}
                              sm={12}
                              md={6}
                              lg={4}
                              key={index}
                              className="py-[6px] px-[8px]"
                           >
                              <Box
                                 onClick={() => {
                                    setSelectedProduct(item?.id);
                                    setError(""); // Clear error when a product is selected
                                 }}
                                 className={`${
                                    selectedProduct === item?.id
                                       ? "border-[2px] border-[#5FA5FC]"
                                       : "border-[2px] border-[#eee]"
                                 } flex flex-row bg-[#fcfcfc] py-[10px] px-[8px] rounded-[4px] cursor-pointer`}
                              >
                                 <Box className="min-w-[60px]">
                                    <img
                                       src={
                                          item?.product_images?.[0]
                                             ?.product_image
                                       }
                                       alt="image"
                                       className="w-[50px] h-[55px] rounded-[3px]"
                                    />
                                 </Box>
                                 <Box className="flex justify-between flex-col">
                                    <Box className="text-[16px] font-[500] text-[#343434]">
                                       {item?.name}
                                    </Box>
                                    <Box className="text-[16px] font-[600] text-[#5FA5FC]">
                                       Rs.{" "}
                                       {returnNepaliNumberWithCommas(
                                          item?.selling_price
                                       )}
                                    </Box>
                                 </Box>
                              </Box>
                           </Grid>
                        ))}
                     </Grid>
                     {error && ( // Display error message if present
                        <Box className="text-red-400 mb-[20px] text-[14px] flex justify-end">
                           {error}
                        </Box>
                     )}
                     <div className=" flex flex-row justify-end gap-2">
                        <button
                           onClick={handleCloseModal}
                           className={`flex justify-center items-center gap-[10px] border-[1px] bg-[#5FA5FC] border-[#5FA5FC] hover:bg-[#ffffff] text-[#ffffff] hover:text-[#5FA5FC] duration-300 py-[12px] md:py-[10px] px-[6px] md:px-[40px] rounded-[4px] w-[100%] md:w-fit text-[14px] md:text-[16px] font-[500] `}
                        >
                           Close
                        </button>
                        <button
                           onClick={handleSwap}
                           className={`flex justify-center items-center gap-[10px] border-[1px] bg-[#ffffff] border-[#5FA5FC] hover:bg-[#5FA5FC] text-[#5FA5FC] hover:text-[#ffffff] duration-300 py-[12px] md:py-[10px] px-[6px] md:px-[40px] rounded-[4px] w-[100%] md:w-fit text-[14px] md:text-[16px] font-[500]
                 ${isLoadingSwap ? "cursor-not-allowed" : ""}
               `}
                        >
                           {isLoadingSwap && <CustomSpinLoader />}
                           Swap
                        </button>
                     </div>
                  </>
               ) : (
                  <Box className="flex justify-center text-[16px] font-[500] text-[#aaa]">
                     You have no products for swap.
                  </Box>
               )}
            </Box>
         )}
      </>
   );
};

const SingleCategoryComponent = ({ singleProductData }) => {
   const navigate = useNavigate();
   const params = {
      limit: "6",
   };
   const {
      data: productSingleData,
      isLoading: isProductSingleDataLoading,
      refetch: productSingleRefetch,
   } = useGetCategorySingleQuery(
      {
         params,
         slug: singleProductData?.category?.slug,
      },
      { skip: !singleProductData?.category?.slug }
   );

   const filteredCurrentProductList =
      productSingleData?.data &&
      productSingleData?.data?.products?.filter(
         (item) => item?.id !== singleProductData?.id
      );

   return (
      <>
         {filteredCurrentProductList?.length !== 0 && (
            <div className="containerWrap">
               <div className="containerBody">
                  <div className="commonContainerBodySec">
                     <div className="flex flex-col h-[100%] pb-[30px]">
                        <div className="flex flex-col lg:flex-row lg:justify-between items-center mb-[44px]">
                           <div
                              className="titleTwo mb-[8px] lg:mb-[0px] whitespace-nowrap
"
                           >
                              Related Items
                           </div>
                           <div
                              onClick={() =>
                                 navigate(
                                    `/categories/${singleProductData?.category?.slug}`
                                 )
                              }
                              className="cursor-pointer text-[14px] md:text-[16px] font-[400] text-[#181818] border-b-[1px] border-[#181818] hover:border-b-[2px] hover:mb-[-1px] transition  duration-300 ease-in-out"
                           >
                              See All Products
                           </div>
                        </div>

                        <Grid
                           container
                           spacing={0}
                           className="w-full dealsPage"
                        >
                           {filteredCurrentProductList
                              ?.slice(0, 5)
                              ?.map((item, index) => (
                                 <CommonSimilarProductCard
                                    data={item}
                                    key={index}
                                 />
                              ))}
                        </Grid>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

// Define propTypes for type-checking
SingleCategoryComponent.propTypes = {
   singleProductData: PropTypes.shape({
      id: PropTypes.string.isRequired,
      category: PropTypes.shape({
         slug: PropTypes.string.isRequired,
      }).isRequired,
   }).isRequired,
};

export default CommonProductPage;
