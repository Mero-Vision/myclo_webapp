import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Grid, Tooltip, useMediaQuery } from "@mui/material";
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
import "./CommonFeaturedProductCard.css";
const CommonFeaturedProductCard = ({ data, showCards }) => {
   const navigate = useNavigate();
   const isMobile = useMediaQuery("(max-width: 1048px)");

   const [loginModal, setLoginModal] = useState(false);

   const {
      refetch: cartRefetch, // Use this to manually refetch the cart data
   } = useGetCartsQuery(
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

   console.log({ discountPercentage });

   const handleNavigate = (slug) => {
      navigate(`/products/${slug}`);
   };

   const handleAddToCart = (e) => {
      e.stopPropagation(); // Prevents event from bubbling to the parent div

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
         <Grid
            sx={{
               maxWidth: "100% !important",
            }}
            className="w-[100%] px-[6px] sm:px-[8px] md:px-[8px] lg:px-[8px] py-[10px] "
            item
            xs={12}
            md={6}
            lg={4}
            onClick={() => handleNavigate(data?.slug)}
         >
            <div className="flex flex-row cursor-pointer w-full">
               <div className="w-[100px] min-w-[100px] h-[135px] aspect-[1/1.33] rounded-[8px] relative overflow-hidden group mr-[22px] ">
                  {discountPercentage > 0 && (
                     <div className="bg-[#f03e3e] rounded-[50px] px-[4px] py-[2px] text-[#fff] min-w-[48px] z-10 absolute top-[8px] left-[8px] text-[11px] font-[500] flex text-center justify-center">
                        -{discountPercentage?.toFixed()}%
                     </div>
                  )}
                  <img
                     className="product-image block w-[100%]  h-[100%] object-cover object-center transition-all duration-[700ms] ease-in-out lg:group-hover:opacity-0 lg:group-hover:scale-110"
                     src={data?.product_images?.[0]?.product_image}
                  />
                  {data?.product_images?.[1]?.product_image && (
                     <img
                        className="product-image absolute top-0 left-0 block w-[100%] h-[100%] object-cover object-center opacity-0 scale-110 transition-all duration-[700ms] ease-in-out lg:group-hover:opacity-100 lg:group-hover:scale-100"
                        src={data?.product_images?.[1]?.product_image}
                     />
                  )}
               </div>

               <div className="flex flex-col w-[100%] pr-[14px]">
                  <div className="titleSix font-[500] min-h-[70px]">
                     {data?.name}
                  </div>
                  <div className="flex justify-between items-center">
                     <div className="flex flex-col items-center">
                        <div className="titleSix font-[600] ">
                           Rs.{" "}
                           {returnNepaliNumberWithCommas(
                              sellingPrice
                           )}
                        </div>
                        {crossPrice > sellingPrice && crossPrice && (
                           <div className="text-[10px] md:text-[14px] font-[400] text-[#a0a0a0] mr-[8px] line-through">
                              Rs.{" "}
                              {returnNepaliNumberWithCommas(
                                 crossPrice
                              )}
                           </div>
                        )}
                     </div>
                     <Tooltip
                        title="Add to cart"
                        placement="left"
                        arrow
                     >
                        <button
                           disabled={isCartsLoading}
                           onClick={handleAddToCart}
                           className={`flex items-center justify-center w-12 h-12 rounded-[50px] transition-all duration-300 
                           ${
                              isCartsLoading
                                 ? "bg-gray-400 text-white cursor-not-allowed"
                                 : "bg-[#fff] text-[#343434] hover:bg-[#343434] hover:text-[#fff]"
                           }`}
                        >
                           <ShoppingBagOutlinedIcon className="text-xl" />
                        </button>
                     </Tooltip>
                  </div>
               </div>
            </div>
         </Grid>
         <CustomModal
            noPadding
            open={loginModal}
            width={isMobile ? "90%" : "1000px"} // Adjust width based on screen size
            handleClose={() => setLoginModal(false)}
            // height={"84vh"}
         >
            <LoginModal handleClose={() => setLoginModal(false)} />
         </CustomModal>
      </>
   );
};

// PropTypes for validation
CommonFeaturedProductCard.propTypes = {
   data: PropTypes.shape({
      rating: PropTypes.number,
      productName: PropTypes.string.isRequired, // Validate productName
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

export default CommonFeaturedProductCard;
