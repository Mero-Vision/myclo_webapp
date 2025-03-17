import { Add, Remove } from "@mui/icons-material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Checkbox, Divider, Grid, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
   useDeleteCartMutation,
   useGetCartsQuery,
   useGetPaymentOptionsQuery,
   useGetShippingDetailsQuery,
   usePostCartQuantityUpdateMutation,
   usePostOrderMutation,
} from "../../../../api/siteSlice";
import codVanImg from "../../../../assets/checkout/codVan.png";
import qrImg from "../../../../assets/checkout/qr.png";
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
      refetch: cartRefetch,
   } = useGetCartsQuery();

   useEffect(() => {
      cartRefetch();
   }, [cartRefetch]);
   const { data: shippingDetailData } = useGetShippingDetailsQuery();

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

   const defaultAddress = shippingDetailData?.data?.find(
      (item) => item?.is_default === "true"
   );

   const [paymentState, setPaymentState] = useState("cod");
   const [paymentId, setPaymentID] = useState();

   console.log({ paymentState, paymentId });

   const { data: paymentOptionsData } = useGetPaymentOptionsQuery();

   const paymentOptionData = [
      {
         id: paymentOptionsData?.data?.[0]?.id,
         name: paymentOptionsData?.data?.[0]?.name,
         image: codVanImg,
         value: "cod",
      },
      {
         id: paymentOptionsData?.data?.[1]?.id,
         name: paymentOptionsData?.data?.[1]?.name,
         image: qrImg,
         value: "qr",
      },
   ];

   useEffect(() => {
      if (paymentOptionsData?.data) {
         setPaymentID(paymentOptionsData?.data?.[0]?.id);
      }
   }, [paymentOptionsData]);

   return (
      <div>
         <ScrollToTop />

         {isCartDataFetching ? (
            <LazyLoadPage />
         ) : (
            <>
               <CustomBreadCrumbs />
               <div className="containerWrap">
                  <div className="containerBody">
                     <div className="commonContainerBodySec">
                        <Grid container spacing={0}>
                           <Grid
                              item
                              xs={12}
                              sm={12}
                              md={cartData?.data?.length ? 8 : 12}
                              lg={cartData?.data?.length ? 8 : 12}
                           >
                              {isCheckoutMode && (
                                 <div className="flex flex-col mb-[26px]">
                                    <div className="flex flex-col mb-[20px]">
                                       <div className="text-[18px] font-[500] mb-[10px]">
                                          1. Shipping Detail
                                       </div>
                                       <div className="flex flex-col mb-[8px] border-[1px] border-[#ddd] p-[12px] w-fit rounded-[8px] bg-[#fff]">
                                          <div className="text-[14px] font-[500]">
                                             {defaultAddress?.address}
                                          </div>
                                          <div className="text-[14px] font-[400] text-[#343434]">
                                             {`${defaultAddress?.landmark}, ${defaultAddress?.district_city}, ${defaultAddress?.region}`}
                                          </div>
                                          <div className="text-[14px] font-[400] text-[#343434]">
                                             Phone No.:{" "}
                                             {`${defaultAddress?.contact_no}`}
                                          </div>
                                          <div className="text-[14px] font-[400] text-[#343434]">
                                             Recipient Name:{" "}
                                             {`${defaultAddress?.recipient_name}`}
                                          </div>
                                       </div>
                                    </div>
                                    <div className="flex flex-col">
                                       <div className="text-[18px] font-[500] mb-[10px]">
                                          2. Payment Methods
                                       </div>
                                       <div className="flex flex-row gap-[10px]">
                                          {paymentOptionData.map(
                                             (item, index) => (
                                                <div
                                                   key={index}
                                                   className={`relative flex flex-col mb-[8px] border-[2px] py-[12px] px-[24px] w-fit rounded-[8px] bg-[#fff] ${
                                                      paymentState ===
                                                      item.value
                                                         ? "border-[#343434]"
                                                         : "border-[#ddd]"
                                                   }`}
                                                   onClick={() => {
                                                      setPaymentState(
                                                         item.value
                                                      );
                                                      setPaymentID(
                                                         item.id
                                                      );
                                                   }}
                                                   style={{
                                                      cursor:
                                                         "pointer",
                                                   }}
                                                >
                                                   {paymentState ===
                                                      item.value && (
                                                      <CheckCircleOutlineOutlinedIcon
                                                         className="absolute top-[4px] right-[4px] #343434"
                                                         style={{
                                                            fontSize:
                                                               "20px",
                                                         }}
                                                      />
                                                   )}
                                                   <div className="min-h-[50px] flex justify-center">
                                                      <img
                                                         src={
                                                            item.image
                                                         }
                                                         alt="codVanImg"
                                                         className="h-[40px] w-[40px]"
                                                      />
                                                   </div>
                                                   <div className="text-[14px] font-[500]">
                                                      {item.name}
                                                   </div>
                                                </div>
                                             )
                                          )}

                                          {/* <div
                                             className={`relative flex flex-col mb-[8px] border-[2px] py-[12px] px-[24px] w-fit rounded-[8px] bg-[#fff] ${
                                                paymentState === "cod"
                                                   ? "border-[#343434]"
                                                   : "border-[#ddd]"
                                             }`}
                                             onClick={() =>
                                                setPaymentState("cod")
                                             } // Set payment state to "cod"
                                             style={{
                                                cursor: "pointer",
                                             }} // Add pointer cursor
                                          >
                                             {paymentState ===
                                                "cod" && (
                                                <CheckCircleOutlineOutlinedIcon
                                                   className="absolute top-[4px] right-[4px] #343434"
                                                   style={{
                                                      fontSize:
                                                         "20px",
                                                   }} // Adjust icon size
                                                />
                                             )}
                                             <div className="min-h-[50px] flex justify-center">
                                                <img
                                                   src={codVanImg}
                                                   alt="codVanImg"
                                                   className="h-[40px] w-[40px]"
                                                />
                                             </div>
                                             <div className="text-[14px] font-[500]">
                                                Cash on delivery
                                             </div>
                                          </div> */}
                                          {/* <div
                                             className={`relative flex flex-col mb-[8px] border-[2px] py-[12px] px-[24px] w-fit rounded-[8px] bg-[#fff] ${
                                                paymentState === "qr"
                                                   ? "border-[#343434]"
                                                   : "border-[#ddd]"
                                             }`}
                                             onClick={() =>
                                                setPaymentState("qr")
                                             } // Set payment state to "qr"
                                             style={{
                                                cursor: "pointer",
                                             }} // Add pointer cursor
                                          >
                                             {paymentState ===
                                                "qr" && (
                                                <CheckCircleOutlineOutlinedIcon
                                                   className="absolute top-[4px] right-[4px] #343434"
                                                   style={{
                                                      fontSize:
                                                         "20px",
                                                   }} // Adjust icon size
                                                />
                                             )}
                                             <div className="min-h-[50px] flex justify-center">
                                                <img
                                                   src={qrImg}
                                                   alt="qrImg"
                                                   className="h-[35px] w-[35px]"
                                                />
                                             </div>
                                             <div className="text-[14px] font-[500]">
                                                QR Payment
                                             </div>
                                          </div> */}
                                       </div>
                                    </div>
                                 </div>
                              )}
                              {!isCheckoutMode && (
                                 <div className="flex flex-col">
                                    <div className="text-[24px] font-[500] mb-[16px]">
                                       My Cart
                                    </div>
                                    {cartData?.data &&
                                    cartData?.data?.length ? (
                                       cartData?.data?.map(
                                          (item, index) => (
                                             <CartCard
                                                key={index}
                                                item={item}
                                                cartRefetch={
                                                   cartRefetch
                                                }
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
                                                   checkedItems[
                                                      item?.id
                                                   ] ?? true
                                                }
                                                onCheckboxChange={(
                                                   e
                                                ) => {
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
                                             Oops! Looks like your
                                             cart is empty.
                                          </div>
                                       </div>
                                    )}
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
                                 {!isCheckoutMode ? (
                                    <OrderSummary
                                       getCartMessage={getCartMessage}
                                       cartData={cartData?.data || []}
                                       localQuantities={
                                          localQuantities
                                       }
                                       checkedItems={checkedItems}
                                       isCheckoutMode={isCheckoutMode}
                                       onCheckout={handleCheckout}
                                       onBackToCart={handleBackToCart}
                                       cartRefetch={cartRefetch}
                                    />
                                 ) : (
                                    <OrderSummaryCheckout
                                       getCartMessage={getCartMessage}
                                       cartData={cartData?.data || []}
                                       localQuantities={
                                          localQuantities
                                       }
                                       checkedItems={checkedItems}
                                       isCheckoutMode={isCheckoutMode}
                                       onCheckout={handleCheckout}
                                       onBackToCart={handleBackToCart}
                                       cartRefetch={cartRefetch}
                                       paymentId={paymentId}
                                    />
                                 )}
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
   const [
      postCartQuantityUpdate,
      {
         isLoading: isPostCartQuantityLoading,
         isSuccess: isPostCartQuantitySuccess,
         data: successData,
      },
   ] = usePostCartQuantityUpdateMutation();

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
      const newQuantity = localQuantity + 1;
      onQuantityChange(item.id, newQuantity);

      const payload = {
         id: item.id,
         quantity: newQuantity,
         _method: "PUT",
      };

      postCartQuantityUpdate({ data: payload, id: item.id });
   };

   const handleRemove = () => {
      if (localQuantity >= 2) {
         const newQuantity = localQuantity - 1;
         onQuantityChange(item.id, newQuantity);

         const payload = {
            id: item.id,
            quantity: newQuantity,
            _method: "PUT",
         };

         postCartQuantityUpdate({ data: payload, id: item.id });
      }
   };

   const handleQuantityBox = (e) => {
      e.stopPropagation(); // Prevent event from bubbling up
   };

   const navigateProduct = () => {
      navigate(`/products/${item?.product?.slug}`);
   };

   useEffect(() => {
      if (isPostCartQuantitySuccess && successData) {
         customToaster({
            message: "Quantity updated successfully.",
            type: "success",
         });
         // cartRefetch();
         cartRefetchAgain();
      }
   }, [isPostCartQuantitySuccess, successData]);

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
                                    <button
                                       onClick={handleRemove}
                                       className={`${
                                          localQuantity === 1 ||
                                          isPostCartQuantityLoading
                                             ? "text-[#b1b1b1] cursor-not-allowed"
                                             : "text-[#0D0D0D] cursor-pointer"
                                       } duration-300 ease-in-out`}
                                       disabled={
                                          isPostCartQuantityLoading
                                       }
                                    >
                                       <Remove />
                                    </button>
                                    <div className="w-[11px] select-none">
                                       {isPostCartQuantityLoading ? (
                                          <CustomSpinLoader size="small" />
                                       ) : (
                                          localQuantity
                                       )}
                                    </div>
                                    <button
                                       onClick={handleAdd}
                                       className={`${
                                          isPostCartQuantityLoading
                                             ? "text-[#b1b1b1] cursor-not-allowed"
                                             : "text-[#0D0D0D] cursor-pointer"
                                       }`}
                                       disabled={
                                          isPostCartQuantityLoading
                                       }
                                    >
                                       <Add />
                                    </button>
                                 </div>
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
const OrderSummaryCheckout = ({
   getCartMessage,
   cartData,
   localQuantities,
   checkedItems,
   isCheckoutMode,
   onCheckout,
   onBackToCart,
   paymentId,
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
         payment_method_id: paymentId,
      };

      console.log({ payload });

      postOrder(payload);
   };

   return (
      <div className="flex ml-[10px] rounded-[8px] bg-[#fff] flex-col py-[20px] px-[30px] mb-[20px]">
         <div className="flex justify-between">
            <div className="text-[16px] font-[500]">
               Order Summary
            </div>
            <div
               className="text-[14px] font-[400] text-[#5FA5FC] cursor-pointer"
               onClick={onBackToCart}
            >
               Edit your order
            </div>
         </div>
         <Divider sx={{ margin: "14px 0px" }} />
         {cartData && cartData?.length ? (
            cartData?.map((item, index) => (
               <CartCardCheckout
                  key={index}
                  item={item}
                  localQuantity={
                     localQuantities[item.id] || item.quantity
                  }
                  isCheckoutMode={isCheckoutMode}
                  isChecked={checkedItems[item?.id] ?? true}
               />
            ))
         ) : (
            <div className="bg-[#fff] rounded-[8px] py-[40px] w-[100%] flex flex-col gap-[20px] items-center justify-center text-[#343434]">
               <img
                  src={noWishlistImg}
                  alt="Empty cart"
                  className="w-[200px] h-auto"
               />
               <div className="text-[18px] font-[500] italic">
                  Oops! Looks like your cart is empty.
               </div>
            </div>
         )}
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
const CartCardCheckout = ({
   item,
   isCheckoutMode,
   isChecked,
   localQuantity,
}) => {
   const sellingPrice = Number(item?.product?.selling_price);

   return (
      <>
         {(isCheckoutMode && isChecked) || !isCheckoutMode ? (
            <div className={`bg-[#fff] `}>
               <div
                  className={`flex mr-[10px] rounded-[2px] flex-col md:flex-row py-[2px] px-[2px] mb-[20px] `}
                  style={{
                     pointerEvents: "auto", // Disables click on everything
                  }}
               >
                  {/* Image */}
                  <img
                     src={
                        item?.product?.product_images?.[0]
                           ?.product_image
                     }
                     alt="image"
                     className="w-[40px] h-[40px] border-[#ddd] border-[1px] object-cover rounded-[2px] mb-[10px] md:mb-[0px] mr-[6px]"
                  />

                  {/* Product Details */}
                  <div className="flex flex-col w-[100%]">
                     <div className="flex flex-row justify-between items-start w-[100%] mb-[6px]">
                        <div className="text-[14px] font-[400] pr-[20px]">
                           {item?.product?.name}
                        </div>
                     </div>

                     {/* Quantity & Price */}
                     <div className="flex flex-row items-center justify-between w-[100%]">
                        {/* Price */}
                        <div className="flex flex-col items-center justify-end w-[100%]">
                           <div className="flex flex-row justify-between w-[100%]">
                              <p className="text-[14px] lg:text-[14px] text-[#000] font-[400] text-textColor flex justify-end">
                                 Qty: {localQuantity}
                              </p>
                              <p className="text-[14px] lg:text-[14px] text-[#343434] font-[500] text-textColor flex justify-end">
                                 Rs.{" "}
                                 {returnNepaliNumberWithCommas(
                                    sellingPrice
                                 )}
                              </p>
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

OrderSummaryCheckout.propTypes = {
   getCartMessage: PropTypes.func.isRequired,
   cartData: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.string.isRequired,
         product: PropTypes.shape({
            id: PropTypes.string.isRequired,
            selling_price: PropTypes.string.isRequired,
            cross_price: PropTypes.string,
            name: PropTypes.string.isRequired,
            product_images: PropTypes.arrayOf(
               PropTypes.shape({
                  product_image: PropTypes.string.isRequired,
               })
            ).isRequired,
         }).isRequired,
         quantity: PropTypes.number.isRequired,
         product_varient: PropTypes.string,
      })
   ).isRequired,
   localQuantities: PropTypes.objectOf(PropTypes.number).isRequired,
   checkedItems: PropTypes.objectOf(PropTypes.bool).isRequired,
   isCheckoutMode: PropTypes.bool.isRequired,
   onCheckout: PropTypes.func.isRequired,
   onBackToCart: PropTypes.func.isRequired,
};

CartCardCheckout.propTypes = {
   item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      product: PropTypes.shape({
         id: PropTypes.string.isRequired,
         selling_price: PropTypes.string.isRequired,
         cross_price: PropTypes.string,
         name: PropTypes.string.isRequired,
         product_images: PropTypes.arrayOf(
            PropTypes.shape({
               product_image: PropTypes.string.isRequired,
            })
         ).isRequired,
      }).isRequired,
      quantity: PropTypes.number.isRequired,
      product_varient: PropTypes.string,
   }).isRequired,
   localQuantity: PropTypes.number.isRequired,
   isCheckoutMode: PropTypes.bool.isRequired,
   isChecked: PropTypes.bool.isRequired,
};

export default Cart;
