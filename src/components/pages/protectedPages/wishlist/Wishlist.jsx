import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Grid, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
   useDeleteWishlistMutation,
   useGetCartsQuery,
   useGetWishlistQuery,
   usePostCartsMutation,
} from "../../../../api/siteSlice";
import noWishlistImg from "../../../../assets/wishlist/noWishlist.webp";
import { returnNepaliNumberWithCommas } from "../../../../utils/helpers";
import CustomSpinLoader from "../../../common/CustomSpinLoader/CustomSpinLoader";
import customToaster from "../../../common/CustomToasters/CustomToaster";
import LazyLoadPage from "../../../common/lazyLoadPage/LazyLoadPage";
import ScrollToTop from "../../../common/scrollToTop/ScrollToTop";
const Wishlist = () => {
   const {
      data: wishlistData,
      isFetching: isWishlistDataFetching,
      isLoading: isWishlistDataLoadiin,
      refetch: wishlistRefetch, // Use this to manually refetch the cart data
   } = useGetWishlistQuery();

   return (
      <div>
         <ScrollToTop />

         {isWishlistDataLoadiin ? (
            <div className="min-w-[320px] md:min-w-[450px]">
               <LazyLoadPage />
            </div>
         ) : (
            <>
               {/* <CustomBreadCrumbs /> */}
               <div className="containerWrap">
                  <div className="containerBody">
                     <div className="text-[18px] md:text-[24px] font-[500] mb-[16px]">
                        My Wishlist
                     </div>
                     <Grid container spacing={0}>
                        {wishlistData?.data?.length ? (
                           wishlistData?.data?.map((item, index) => (
                              <WishlistCard
                                 key={index}
                                 item={item}
                                 wishlistRefetch={wishlistRefetch}
                              />
                           ))
                        ) : (
                           <div className="bg-[#fff] py-[40px] w-[100%] flex flex-col gap-[20px] items-center justify-center text-[#343434]">
                              <img
                                 src={noWishlistImg}
                                 alt=""
                                 className="w-[200px] h-auto"
                              />{" "}
                              <div className="text-[18px] font-[500] italic">
                                 Oops! Looks like your wishlist empty.
                              </div>
                           </div>
                        )}
                     </Grid>
                  </div>
               </div>
            </>
         )}
      </div>
   );
};

const WishlistCard = ({ item, wishlistRefetch }) => {
   const navigate = useNavigate();
   const sellingPrice = Number(item?.product?.selling_price);
   const crossPrice = Number(item?.product?.cross_price);
   const discountTrue = sellingPrice < crossPrice;

   const discountPercentage =
      ((crossPrice - sellingPrice) / crossPrice) * 100;
   const {
      refetch: cartRefetch, // Use this to manually refetch the cart data
   } = useGetCartsQuery({});

   const [
      postCarts,
      { isLoading: isCartsLoading, isSuccess: isCartsSuccess },
   ] = usePostCartsMutation();
   const [
      deleteWishlist,
      {
         isLoading: isWishlistDeleteLoading,
         isSuccess: isWishlistDeleteSuccess,
      },
   ] = useDeleteWishlistMutation();

   const handleDeleteWishlist = (e) => {
      e.stopPropagation(); // Prevent event from bubbling up

      deleteWishlist({ id: item?.id });
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

   useEffect(() => {
      if (isWishlistDeleteSuccess) {
         wishlistRefetch();
         customToaster({
            message: "Product removed from wishlist.",
            type: "success",
         });
      }
   }, [isWishlistDeleteSuccess, wishlistRefetch]);

   const handleAddToCart = (e) => {
      e.stopPropagation(); // Prevent event from bubbling up

      const payload = {
         quantity: 1,
         product_id: item?.product?.id,
         price: item?.product?.selling_price,
      };

      postCarts(payload);
   };

   const navigateProduct = () => {
      navigate(`/products/${item?.product?.slug}`);
   };
   return (
      <Grid
         item
         xs={12}
         sm={12}
         md={12}
         lg={12}
         onClick={navigateProduct}
      >
         <div className="flex cursor-pointer rounded-[8px] bg-[#fff] flex-col md:flex-row p-[15px] mb-[20px]">
            <img
               src={item?.product?.product_images?.[0]?.product_image}
               alt="image"
               className="w-[120px] h-[140px] border-[#eee] border-[1px] object-cover rounded-[8px] mb-[10px] md:mb-[0px] mr-[15px]"
            />
            <div className="flex flex-col w-[100%]">
               <div className="flex flex-row justify-between items-center w-[100%]  mb-[10px]">
                  <div className="text-[18px] font-[500] pr-[20px]">
                     {item?.product?.name}
                  </div>
                  <Tooltip title="Remove from wishlist" arrow>
                     <button
                        onClick={
                           !isWishlistDeleteLoading
                              ? handleDeleteWishlist
                              : undefined
                        }
                        disabled={isWishlistDeleteLoading}
                        className={`bg-transparent hover:bg-[#fcedef] p-[5px] rounded-[4px] transition-colors duration-300 ${
                           isWishlistDeleteLoading
                              ? "cursor-not-allowed opacity-60"
                              : "cursor-pointer"
                        }`}
                     >
                        <DeleteForeverOutlinedIcon className="text-[#f50a1d]" />
                     </button>
                  </Tooltip>
               </div>
               <div></div>
               <div className="flex flex-col mb-5">
                  <div className="flex flex-row gap-[12px] justify-start items-end w-[100%]">
                     {discountTrue && (
                        <p className="text-[14px] lg:text-[16px] text-[#343434] font-[300] text-textColor line-through">
                           Rs.{" "}
                           {returnNepaliNumberWithCommas(crossPrice)}
                        </p>
                     )}
                     <p className="text-[14px] lg:text-[16px] text-[#5FA5FC] font-[500] text-textColor flex justify-end">
                        Rs.{" "}
                        {returnNepaliNumberWithCommas(sellingPrice)}
                     </p>
                     {discountTrue && (
                        <div className="flex justify-end items-center gap-[10px]">
                           <p className="text-[14px] lg:text-[16px] text-[#343434] font-[400] text-textColor px-[6px]">
                              |
                           </p>
                           <p className="text-[14px] lg:text-[16px] text-[#5FA5FC] font-[600] text-textColor ">
                              -{discountPercentage?.toFixed(2)}%
                           </p>
                        </div>
                     )}
                  </div>
                  <div className="text-[12px] flex justify-start text-[#343434]">
                     (Inclusive of all Taxes)
                  </div>
               </div>
               <button
                  disabled={isCartsLoading}
                  onClick={handleAddToCart}
                  className={`flex justify-center gap-[10px] border-[1px] bg-[#ffffff] border-[#5FA5FC] hover:bg-[#5FA5FC] text-[#5FA5FC] hover:text-[#ffffff] duration-300 py-[6px] md:py-[6px] px-[6px] sm:px-[20px] rounded-[4px] w-[100%] sm:w-fit text-[12px] md:text-[14px] font-[500] ${
                     isCartsLoading
                        ? "cursor-not-allowed opacity-60"
                        : ""
                  }`}
               >
                  {isCartsLoading && <CustomSpinLoader />} Add to Cart
               </button>
            </div>
         </div>
      </Grid>
   );
};

WishlistCard.propTypes = {
   item: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
         .isRequired,
      quantity: PropTypes.oneOfType([
         PropTypes.string,
         PropTypes.number,
      ]),
      product: PropTypes.shape({
         slug: PropTypes.string,
         name: PropTypes.string.isRequired,
         id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
         selling_price: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
         ]).isRequired,
         cross_price: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
         ]),
         product_images: PropTypes.arrayOf(
            PropTypes.shape({
               product_image: PropTypes.string.isRequired,
            })
         ),
      }).isRequired,
   }).isRequired,
   wishlistRefetch: PropTypes.func.isRequired, // Fixed prop name
};

export default Wishlist;
