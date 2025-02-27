import { Grid, useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
   useGetCartsQuery,
   usePostCartsMutation,
} from "../../../api/siteSlice";
import {
   getError,
   returnNepaliNumberWithCommas,
} from "../../../utils/helpers";
import { isLoggedIn } from "../../../utils/IsLoggedIn";
import LoginModal from "../../pages/auth/login/LoginModal";
import CustomModal from "../CustomModal/CustomModal";
import customToaster from "../CustomToasters/CustomToaster";
import "./CommonProductCard.css";

const CommonProductCard = ({ data, showCards }) => {
   const navigate = useNavigate();
   const isMobile = useMediaQuery("(max-width: 1048px)");

   const [loginModal, setLoginModal] = useState(false);

   const { refetch: cartRefetch } = useGetCartsQuery(
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

   useEffect(() => {
      getError(cartsError);
   }, [cartsError]);

   useEffect(() => {
      if (isCartsSuccess) {
         cartRefetch();
         customToaster({
            message: "Product addded to cart.",
            type: "success",
         });
      }
   }, [isCartsSuccess, cartRefetch]);

   const sellingPrice = data?.selling_price;
   const crossPrice = data?.cross_price;

   const discountPercentage =
      ((crossPrice - sellingPrice) / crossPrice) * 100;

   const handleNavigate = (slug) => {
      navigate(`/products/${slug}`);
   };

   const handleAddToCart = (e) => {
      e.stopPropagation();

      if (isLoggedIn()) {
         const payload = {
            quantity: 1,
            product_id: data?.id,
            price: data?.selling_price,
         };
         postCarts(payload);
      } else {
         setLoginModal(true);
      }
   };

   return (
      <>
         {isMobile ? (
            <Grid
               sx={{
                  maxWidth: "100% !important",
                  // flex: "0 0 auto",
               }}
               className="w-[100%] px-[6px] sm:px-[8px] md:px-[10px] lg:px-[15px]"
               item
               xs={6}
               sm={4}
               md={3}
               lg={showCards ? 2 : 2.4}
               onClick={() => handleNavigate(data?.slug)}
               // onTouchEnd={() => handleNavigate(data?.slug)}
            >
               <div
                  className="flex flex-col cursor-pointer product-card"
                  style={{ width: "100% !important" }}
               >
                  <div
                     className="product-card aspect-[1/1.33]
                  rounded-[8px] relative overflow-hidden group mb-[16px]"
                  >
                     {discountPercentage > 0 && (
                        <div className="bg-[#f03e3e] rounded-[50px] px-[6px] py-[2px] text-[#fff] min-w-[50px] z-10 absolute top-[12px] left-[12px] text-[12px] font-[600] flex text-center justify-center">
                           -{discountPercentage?.toFixed()}%
                        </div>
                     )}
                     <img
                        className="product-image-mobile product-image1-mobile"
                        src={data?.product_images?.[0]?.product_image}
                     />

                     {isLoggedIn() && (
                        <button
                           disabled={isCartsLoading}
                           className={`add-to-cart-btn-mobile ${
                              isCartsLoading
                                 ? "cursor-not-allowed opacity-60"
                                 : ""
                           }`}
                           onClick={handleAddToCart}
                        >
                           Add to Cart
                        </button>
                     )}
                  </div>

                  <div
                     className="flex gap-[4px] flex-col "
                     style={{ minHeight: "85px" }}
                  >
                     <div className="titleFive">{data?.name}</div>

                     <div className="flex flex-row items-center">
                        {crossPrice > sellingPrice && crossPrice && (
                           <div className="text-[10px] md:text-[14px] font-[400] text-[#a0a0a0] mr-[8px] line-through">
                              Rs.{" "}
                              {returnNepaliNumberWithCommas(
                                 crossPrice
                              )}
                           </div>
                        )}
                        <div className="titleFive font-[600]">
                           Rs.{" "}
                           {returnNepaliNumberWithCommas(
                              sellingPrice
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </Grid>
         ) : (
            <Grid
               sx={{
                  maxWidth: "100% !important",
                  // flex: "0 0 auto",
               }}
               className="w-[100%] px-[6px] sm:px-[8px] md:px-[10px] lg:px-[15px]"
               item
               xs={6}
               sm={4}
               md={3}
               lg={showCards ? 2 : 2.4}
               onClick={() => handleNavigate(data?.slug)}
               // onTouchEnd={() => handleNavigate(data?.slug)}
            >
               <div
                  className="flex flex-col cursor-pointer product-card"
                  style={{ width: "100% !important" }}
               >
                  <div className="product-card aspect-[1/1.33] rounded-[8px] relative overflow-hidden group mb-[16px]">
                     {discountPercentage > 0 && (
                        <div className="bg-[#f03e3e] rounded-[50px] px-[6px] py-[2px] text-[#fff] min-w-[50px] z-10 absolute top-[12px] left-[12px] text-[12px] font-[600] flex text-center justify-center">
                           -{discountPercentage?.toFixed()}%
                        </div>
                     )}
                     <img
                        className="product-image product-image1"
                        src={data?.product_images?.[0]?.product_image}
                     />
                     {data?.product_images?.[1]?.product_image && (
                        <img
                           className="product-image product-image2 absolute top-0 left-0 opacity-0 scale-110 transition-all duration-[700ms] ease-in-out lg:group-hover:opacity-100 lg:group-hover:scale-100"
                           src={
                              data?.product_images?.[1]?.product_image
                           }
                        />
                     )}
                     {isLoggedIn() && (
                        <button
                           disabled={isCartsLoading}
                           className={`add-to-cart-btn ${
                              isCartsLoading
                                 ? "cursor-not-allowed opacity-60"
                                 : ""
                           }`}
                           onClick={handleAddToCart}
                        >
                           Add to Cart
                        </button>
                     )}
                  </div>

                  <div className="flex gap-[4px] flex-col">
                     <div className="titleFive">{data?.name}</div>

                     <div className="flex flex-row items-center">
                        {crossPrice > sellingPrice && crossPrice && (
                           <div className="text-[10px] sm:text-[12px] md:text-[14px] font-[400] text-[#a0a0a0] mr-[8px] line-through">
                              Rs.{" "}
                              {returnNepaliNumberWithCommas(
                                 crossPrice
                              )}
                           </div>
                        )}
                        <div className="titleFive font-[600]">
                           Rs.{" "}
                           {returnNepaliNumberWithCommas(
                              sellingPrice
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </Grid>
         )}

         <CustomModal
            noPadding
            open={loginModal}
            width={isMobile ? "90%" : "1000px"}
            handleClose={() => setLoginModal(false)}
         >
            <LoginModal handleClose={() => setLoginModal(false)} />
         </CustomModal>
      </>
   );
};

CommonProductCard.propTypes = {
   data: PropTypes.shape({
      rating: PropTypes.number,
      productName: PropTypes.string.isRequired,
      image1: PropTypes.string.isRequired,
      image2: PropTypes.string,
      selling_price: PropTypes.number.isRequired,
      originalPrice: PropTypes.number,
      cross_price: PropTypes.number,
      slug: PropTypes.string,
      discount: PropTypes.number,
      product_image: PropTypes.string,
      name: PropTypes.string,
      id: PropTypes.string,
      product_images: PropTypes.arrayOf(
         PropTypes.shape({
            product_image: PropTypes.string.isRequired,
         })
      ),
   }).isRequired,
   showCards: PropTypes.number,
};

export default CommonProductCard;
//  max-h-[400px] lg:max-h-[400px] xl:max-h-[400px] 2xl:max-h-[300px]
