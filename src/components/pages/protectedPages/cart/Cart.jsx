import { Add, Remove } from "@mui/icons-material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Checkbox, Divider, Grid, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
   useDeleteCartMutation,
   useGetCartsQuery,
   usePostOrderMutation,
} from "../../../../api/siteSlice";
import noWishlistImg from "../../../../assets/wishlist/noWishlist.webp";
import { returnNepaliNumberWithCommas } from "../../../../utils/helpers";
import CustomBreadCrumbs from "../../../common/CustomBreadcrumbs/CustomBreadcrumbs";
import CustomSpinLoader from "../../../common/CustomSpinLoader/CustomSpinLoader";
import customToaster from "../../../common/CustomToasters/CustomToaster";
import LazyLoadPage from "../../../common/lazyLoadPage/LazyLoadPage";
import ScrollToTop from "../../../common/scrollToTop/ScrollToTop";

const Cart = () => {
   const {
      data: cartData,
      isFetching: isCartDataFetching,
      isLoading: isCartDataLoading,
      refetch: cartRefetch,
   } = useGetCartsQuery();

   const cartItemsCount = cartData?.data?.length || 0;

   // State to track local quantity changes
   const [localQuantities, setLocalQuantities] = useState({});

   // State to track checked items
   const [checkedItems, setCheckedItems] = useState({});

   console.log({ checkedItems, localQuantities });

   // State to track checkout mode
   const [isCheckoutMode, setIsCheckoutMode] = useState(false);

   // Update local quantity when user changes it
   const handleQuantityChange = (itemId, newQuantity) => {
      setLocalQuantities((prev) => ({
         ...prev,
         [itemId]: newQuantity,
      }));
   };

   // Handle checkbox change
   const handleCheckboxChange = (itemId) => {
      console.log({ itemId });
      if (!isCartDataFetching) {
         setCheckedItems((prev) => ({
            ...prev,
            [itemId]: !prev[itemId],
         }));
      }
   };

   // Set all items as checked by default on page load
   useEffect(() => {
      if (cartData?.data) {
         const initialCheckedState = {};
         cartData.data.forEach((item) => {
            initialCheckedState[item.id] = true;
         });
         setCheckedItems(initialCheckedState);
      }
   }, [cartData]);

   const getCartMessage = () => {
      switch (cartItemsCount) {
         case 0:
            return "No items in cart";
         case 1:
            return "(1 item)";
         default:
            return `(${cartItemsCount} items)`;
      }
   };

   // Handle checkout button click
   const handleCheckout = () => {
      setIsCheckoutMode(true);
   };

   // Handle back button click
   const handleBackToCart = () => {
      setIsCheckoutMode(false);
   };

   return (
      <div>
         <ScrollToTop />

         {isCartDataLoading ? (
            <LazyLoadPage />
         ) : (
            <>
               <CustomBreadCrumbs />
               <div className="containerWrap">
                  <div className="containerBody">
                     <div className="commonContainerBodySec">
                        <div className="text-[24px] font-[500] mb-[16px]">
                           My Cart
                        </div>
                        <Grid container spacing={0}>
                           {/* Left Side: Cart Items */}
                           <Grid
                              item
                              xs={12}
                              sm={12}
                              md={cartData?.data?.length ? 8 : 12}
                              lg={cartData?.data?.length ? 8 : 12}
                           >
                              {cartData?.data &&
                              cartData?.data?.length ? (
                                 cartData?.data?.map(
                                    (item, index) => (
                                       <CartCard
                                          key={index}
                                          item={item}
                                          cartRefetch={cartRefetch}
                                          localQuantity={
                                             localQuantities[
                                                item.id
                                             ] || item.quantity
                                          }
                                          onQuantityChange={
                                             handleQuantityChange
                                          }
                                          isCheckoutMode={
                                             isCheckoutMode
                                          }
                                          isChecked={
                                             checkedItems[item?.id] ??
                                             true
                                          }
                                          onCheckboxChange={(e) => {
                                             e.stopPropagation();
                                             handleCheckboxChange(
                                                item.id
                                             );
                                          }}
                                       />
                                    )
                                 )
                              ) : (
                                 <div className="bg-[#fff] rounded-[8px] py-[40px] w-[100%] flex flex-col gap-[20px] items-center justify-center text-[#343434]">
                                    <img
                                       src={noWishlistImg}
                                       alt="Empty cart"
                                       className="w-[200px] h-auto"
                                    />
                                    <div className="text-[18px] font-[500] italic">
                                       Oops! Looks like your cart is
                                       empty.
                                    </div>
                                 </div>
                              )}
                           </Grid>

                           {cartData?.data?.length !== 0 && (
                              <Grid
                                 item
                                 xs={12}
                                 sm={12}
                                 md={4}
                                 lg={4}
                              >
                                 <OrderSummary
                                    getCartMessage={getCartMessage}
                                    cartData={cartData?.data || []}
                                    localQuantities={localQuantities}
                                    checkedItems={checkedItems}
                                    isCheckoutMode={isCheckoutMode}
                                    onCheckout={handleCheckout}
                                    onBackToCart={handleBackToCart}
                                    cartRefetch={cartRefetch}
                                 />
                              </Grid>
                           )}
                        </Grid>
                     </div>
                  </div>
               </div>
            </>
         )}
      </div>
   );
};

const CartCard = ({
   item,
   cartRefetch,
   localQuantity,
   onQuantityChange,
   isCheckoutMode,
   isChecked,
   onCheckboxChange,
}) => {
   const navigate = useNavigate();

   console.log({ isChecked, localQuantity });

   const sellingPrice = Number(item?.product?.selling_price);
   const crossPrice = Number(item?.product?.cross_price);
   const discountTrue = sellingPrice < crossPrice;
   const discountPercentage =
      ((crossPrice - sellingPrice) / crossPrice) * 100;

   const [
      deleteCart,
      {
         isLoading: isCartDeleteLoading,
         isSuccess: isCartDeleteSuccess,
      },
   ] = useDeleteCartMutation();

   const handleDeleteCart = (e) => {
      e.stopPropagation(); // Prevent event from bubbling up
      deleteCart({ id: item?.id });
   };

   const { refetch: cartRefetchAgain } = useGetCartsQuery({});

   useEffect(() => {
      if (isCartDeleteSuccess) {
         cartRefetchAgain();
         cartRefetch()
            .then(() => {
               console.log("Cart refetched successfully.");
            })
            .catch((error) => {
               console.error("Failed to refetch cart:", error);
            });
         customToaster({
            message: "Product removed from cart.",
            type: "success",
         });
      }
   }, [isCartDeleteSuccess, cartRefetch, cartRefetchAgain]);

   const handleAdd = () => {
      onQuantityChange(item.id, localQuantity + 1);
   };

   const handleRemove = () => {
      if (localQuantity >= 2) {
         onQuantityChange(item.id, localQuantity - 1);
      }
   };

   const handleUpdateQuantity = (e) => {
      e.stopPropagation(); // Prevent event from bubbling up
   };

   const handleQuantityBox = (e) => {
      e.stopPropagation(); // Prevent event from bubbling up
   };

   const navigateProduct = () => {
      navigate(`/products/${item?.product?.slug}`);
   };

   return (
      <>
         {(isCheckoutMode && isChecked) || !isCheckoutMode ? (
            <div
               className={`bg-[#fff] ${
                  !isChecked ? "opacity-50 cursor-not-allowed" : ""
               }`}
            >
               <div
                  className={`flex mr-[10px] rounded-[8px] flex-col md:flex-row py-[20px] px-[30px] mb-[20px] ${
                     isChecked ? "" : "opacity-50"
                  }`}
                  style={{
                     pointerEvents: !isChecked ? "none" : "auto", // Disables click on everything
                  }}
               >
                  {/* Checkbox - Always Clickable */}
                  {!isCheckoutMode && (
                     <div
                        style={{
                           display: "flex",
                           height: "auto !important",
                           alignItems: "center",
                           paddingRight: "10px",
                           pointerEvents: "auto", // Enable only checkbox clicks
                        }}
                     >
                        <Checkbox
                           checked={isChecked}
                           onChange={onCheckboxChange}
                           color="primary"
                           disabled={isCheckoutMode}
                           sx={{
                              height: "fit-content",
                           }}
                        />
                     </div>
                  )}

                  {/* Image */}
                  <img
                     onClick={isChecked ? navigateProduct : undefined}
                     src={
                        item?.product?.product_images?.[0]
                           ?.product_image
                     }
                     alt="image"
                     className="w-[120px] h-[140px] border-[#eee] border-[1px] object-cover rounded-[8px] mb-[10px] md:mb-[0px] mr-[30px]"
                  />

                  {/* Product Details */}
                  <div className="flex flex-col w-[100%]">
                     <div className="flex flex-row justify-between items-start w-[100%] mb-[10px]">
                        <div className="text-[22px] font-[500] mb-[10px] pr-[20px]">
                           {item?.product?.name}
                        </div>
                        {!isCheckoutMode && (
                           <Tooltip title="Remove from cart" arrow>
                              <button
                                 onClick={
                                    !isCartDeleteLoading
                                       ? handleDeleteCart
                                       : undefined
                                 }
                                 disabled={isCartDeleteLoading}
                                 className={`bg-transparent hover:bg-[#fcedef] p-[5px] mt-[-3px] rounded-[4px] transition-colors duration-300 ${
                                    isCartDeleteLoading
                                       ? "cursor-not-allowed opacity-60"
                                       : "cursor-pointer"
                                 }`}
                              >
                                 <DeleteForeverOutlinedIcon className="text-[#f50a1d]" />
                              </button>
                           </Tooltip>
                        )}
                     </div>

                     {/* Quantity & Price */}
                     <div className="flex flex-row items-center justify-between w-[100%]">
                        <div className="flex justify-center gap-[10px]">
                           {!isCheckoutMode ? (
                              <>
                                 <div
                                    onClick={handleQuantityBox}
                                    className="border-[1px] rounded-[4px] border-[rgb(13,13,13)] py-[6px] px-[8px] h-fit w-fit flex flex-row items-center gap-5"
                                 >
                                    <div
                                       onClick={handleRemove}
                                       className={`cursor-pointer ${
                                          localQuantity === 1
                                             ? "text-[#b1b1b1]"
                                             : "text-[#0D0D0D]"
                                       } duration-300 ease-in-out `}
                                    >
                                       <Remove />
                                    </div>
                                    <div className="w-[11px] select-none">
                                       {localQuantity}
                                    </div>
                                    <div
                                       onClick={handleAdd}
                                       className="cursor-pointer text-[#0D0D0D]"
                                    >
                                       <Add />
                                    </div>
                                 </div>
                                 {localQuantity > item?.quantity && (
                                    <button
                                       onClick={handleUpdateQuantity}
                                       className={`flex justify-center gap-[10px] border-[1px] bg-[#5FA5FC] hover:bg-[#7cb3f6] text-[#fff] hover:text-[#ffffff] duration-300 py-[10px] md:py-[7px] px-[10px] sm:px-[30px] rounded-[4px] w-[100%] sm:w-fit text-[12px] md:text-[14px] font-[500]`}
                                    >
                                       Update
                                    </button>
                                 )}
                              </>
                           ) : (
                              <div className="text-[16px] font-[500]">
                                 Quantity: {localQuantity}
                              </div>
                           )}
                        </div>

                        {/* Price */}
                        <div className="flex flex-col items-center justify-end">
                           <div className="flex flex-row gap-[12px] justify-end items-end w-[100%]">
                              {discountTrue && (
                                 <p className="text-[16px] lg:text-[18px] text-[#343434] font-[300] text-textColor line-through">
                                    Rs.{" "}
                                    {returnNepaliNumberWithCommas(
                                       crossPrice
                                    )}
                                 </p>
                              )}
                              <p className="text-[16px] lg:text-[18px] text-[#5FA5FC] font-[500] text-textColor flex justify-end">
                                 Rs.{" "}
                                 {returnNepaliNumberWithCommas(
                                    sellingPrice
                                 )}
                              </p>
                              {discountTrue && (
                                 <div className="flex justify-end items-center gap-[10px]">
                                    <p className="text-[16px] lg:text-[18px] text-[#343434] font-[400] text-textColor px-[6px]">
                                       |
                                    </p>
                                    <p className="text-[16px] lg:text-[18px] text-[#5FA5FC] font-[600] text-textColor ">
                                       -
                                       {discountPercentage?.toFixed(
                                          2
                                       )}
                                       %
                                    </p>
                                 </div>
                              )}
                           </div>
                           <div className="text-[14px] flex justify-end text-[#343434] w-[100%]">
                              (Inclusive of all Taxes)
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         ) : null}
      </>
   );
};

const OrderSummary = ({
   getCartMessage,
   cartData,
   localQuantities,
   checkedItems,
   isCheckoutMode,
   onCheckout,
   onBackToCart,
}) => {
   const navigate = useNavigate();
   const { refetch: cartRefetchAgainCheckout } = useGetCartsQuery({});

   const [
      postOrder,
      {
         isLoading: isPostOrderLoading,
         isSuccess: isPostOrderSuccess,
         data: successData,
      },
   ] = usePostOrderMutation();

   useEffect(() => {
      if (isPostOrderSuccess && successData) {
         cartRefetchAgainCheckout();
         navigate(`/my-account/my-orders`);
         customToaster({
            message: successData?.message,
            type: "success",
         });
      }
   }, [
      isPostOrderSuccess,
      navigate,
      successData,
      cartRefetchAgainCheckout,
   ]);

   // // Calculate the total price and total discount of all items in the cart
   // const calculateTotalAndDiscount = () => {
   //    let total = 0;
   //    let totalDiscount = 0;

   //    cartData.forEach((item) => {
   //       if (checkedItems[item.id]) {
   //          const sellingPrice = Number(item?.product?.selling_price);
   //          const crossPrice = Number(item?.product?.cross_price);
   //          const quantity =
   //             localQuantities[item.id] || item.quantity;

   //          total += sellingPrice * quantity;
   //          if (crossPrice > sellingPrice) {
   //             totalDiscount +=
   //                (crossPrice - sellingPrice) * quantity;
   //          }
   //       }
   //    });

   //    return { total, totalDiscount };
   // };

   // Calculate the total price and total discount of all items in the cart
   const calculateTotalAndDiscount = () => {
      let total = 0;
      let totalDiscount = 0;

      cartData.forEach((item) => {
         if (checkedItems[item.id]) {
            const sellingPrice = Number(item?.product?.selling_price);
            const crossPrice =
               Number(item?.product?.cross_price) || sellingPrice;
            const quantity =
               localQuantities[item.id] || item.quantity;

            total += crossPrice * quantity;
            if (crossPrice > sellingPrice) {
               totalDiscount +=
                  (crossPrice - sellingPrice) * quantity;
            }
         }
      });

      return { total, totalDiscount };
   };

   const { total, totalDiscount } = calculateTotalAndDiscount();
   const shippingCharge = 100; // Example shipping charge
   const grandTotal = total - totalDiscount + shippingCharge;

   // Handle place order button click
   const handlePlaceOrder = async () => {
      const orderItems = cartData
         .filter((item) => checkedItems[item.id])
         .map((item) => {
            const sellingPrice = Number(item?.product?.selling_price);
            const crossPrice =
               Number(item?.product?.cross_price) || sellingPrice;
            const quantity =
               localQuantities[item.id] || item.quantity;

            return {
               product_id: item.product.id,
               product_varient_id: item.product_varient || null,
               quantity,
               price: item.product.selling_price,
               subtotal: crossPrice * quantity, // Use cross_price if exists, otherwise selling_price
            };
         });

      const payload = {
         shipping_detail_id: "1",
         subtotal: total, // Already calculated using cross_price if available
         delivery_charge: shippingCharge,
         discount: totalDiscount,
         tax: 0,
         total_amount: grandTotal,
         note: "Order placed from cart",
         order_items: orderItems,
      };

      console.log({ payload });

      postOrder(payload);
   };

   return (
      <div className="flex ml-[10px] rounded-[8px] bg-[#fff] flex-col py-[20px] px-[30px] mb-[20px]">
         <div className="text-[16px] font-[500]">Order Summary</div>
         <Divider sx={{ margin: "14px 0px" }} />
         <div className="flex flex-col">
            <div className="flex flex-row justify-between mb-[12px]">
               <div className="text-[14px]">Subtotal</div>
               <div className="text-[16px] font-[500]">
                  Rs. {returnNepaliNumberWithCommas(total)}
               </div>
            </div>
            <div className="flex flex-row justify-between mb-[12px]">
               <div className="text-[14px]">Total Discount</div>
               <div className="text-[16px] font-[500] text-[#5FA5FC]">
                  - Rs. {returnNepaliNumberWithCommas(totalDiscount)}
               </div>
            </div>
            <div className="flex flex-row justify-between mb-[16px]">
               <div className="text-[14px]">Shipping Charge</div>
               <div className="text-[16px] font-[500]">
                  Rs. {returnNepaliNumberWithCommas(shippingCharge)}
               </div>
            </div>
            <div className="flex flex-row bg-[#F8F8F8] rounded-[4px] py-[8px] px-[18px] mb-[8px]">
               <div className="min-w-[30px]">
                  <InfoOutlinedIcon
                     sx={{ fontSize: "22px", color: "#7cb3f6" }}
                  />
               </div>
               <div className="text-[14px] font-[400]">
                  Delivery charge may vary depending on the shipping
                  address of your order.
               </div>
            </div>
            <div className="text-[12px] font-[400] flex justify-end">
               (Inclusive of all Taxes)
            </div>
            <Divider sx={{ margin: "14px 0px" }} />
            <div className="flex flex-row justify-between mb-[20px]">
               <div className="text-[16px]">
                  Grand Total {getCartMessage()}
               </div>
               <div className="text-[20px] font-[600] text-[#5598ea]">
                  Rs. {returnNepaliNumberWithCommas(grandTotal)}
               </div>
            </div>
            {isCheckoutMode ? (
               <>
                  <button
                     onClick={handlePlaceOrder}
                     disabled={isPostOrderLoading}
                     className="bg-[#5598ea] hover:bg-[#7cb3f6] text-[#fff] rounded-[4px] py-[10px] text-[16px] duration-200"
                  >
                     {isPostOrderLoading && <CustomSpinLoader />}{" "}
                     Place Order
                  </button>
                  <button
                     onClick={onBackToCart}
                     className="mt-[10px] border-[#5598ea] text-[#5598ea] hover:border-[#7cb3f6] hover:text-[#7cb3f6] rounded-[4px] py-[10px] text-[16px] duration-200"
                  >
                     Back to Cart
                  </button>
               </>
            ) : (
               <button
                  disabled={isPostOrderLoading}
                  onClick={onCheckout}
                  className="bg-[#5598ea] hover:bg-[#7cb3f6] text-[#fff] rounded-[4px] py-[10px] text-[16px] duration-200"
               >
                  {" "}
                  Checkout
               </button>
            )}
         </div>
      </div>
   );
};

// PropTypes for CartCard
CartCard.propTypes = {
   item: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
         .isRequired,
      quantity: PropTypes.number.isRequired,
      product: PropTypes.shape({
         slug: PropTypes.string,
         name: PropTypes.string.isRequired,
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
         ).isRequired,
      }).isRequired,
   }).isRequired,
   cartRefetch: PropTypes.func.isRequired,
   localQuantity: PropTypes.number.isRequired,
   onQuantityChange: PropTypes.func.isRequired,
   isCheckoutMode: PropTypes.bool.isRequired,
   isChecked: PropTypes.bool.isRequired,
   onCheckboxChange: PropTypes.func.isRequired,
};

// PropTypes for OrderSummary
OrderSummary.propTypes = {
   getCartMessage: PropTypes.func.isRequired,
   cartData: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
         quantity: PropTypes.number.isRequired,
         product: PropTypes.shape({
            name: PropTypes.string.isRequired,
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
            ).isRequired,
         }).isRequired,
      })
   ).isRequired,
   localQuantities: PropTypes.objectOf(PropTypes.number).isRequired,
   checkedItems: PropTypes.objectOf(PropTypes.bool).isRequired,
   isCheckoutMode: PropTypes.bool.isRequired,
   onCheckout: PropTypes.func.isRequired,
   onBackToCart: PropTypes.func.isRequired,
};

export default Cart;
