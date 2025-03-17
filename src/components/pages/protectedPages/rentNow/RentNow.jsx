import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Divider, Grid } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
   useGetCartsQuery,
   useGetPaymentOptionsQuery,
   useGetShippingDetailsQuery,
   usePostOrderMutation,
} from "../../../../api/siteSlice";
import codVanImg from "../../../../assets/checkout/codVan.png";
import qrImg from "../../../../assets/checkout/qr.png";
import { returnNepaliNumberWithCommas } from "../../../../utils/helpers";
import CustomBreadCrumbs from "../../../common/CustomBreadcrumbs/CustomBreadcrumbs";
import CustomSpinLoader from "../../../common/CustomSpinLoader/CustomSpinLoader";
import customToaster from "../../../common/CustomToasters/CustomToaster";
import LazyLoadPage from "../../../common/lazyLoadPage/LazyLoadPage";
import ScrollToTop from "../../../common/scrollToTop/ScrollToTop";

const RentNow = () => {
   const {
      data: cartData,
      isFetching: isCartDataFetching,
      refetch: cartRefetch,
   } = useGetCartsQuery();

   const location = useLocation();
   const { product, quantity } = location.state || {};

   console.log({ product, quantity });

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
                                                   cursor: "pointer",
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
                                                      src={item.image}
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
                           </Grid>

                           {cartData?.data?.length !== 0 && (
                              <Grid
                                 item
                                 xs={12}
                                 sm={12}
                                 md={4}
                                 lg={4}
                              >
                                 <OrderSummaryCheckout
                                    getCartMessage={getCartMessage}
                                    cartData={product || {}}
                                    localQuantities={localQuantities}
                                    checkedItems={checkedItems}
                                    isCheckoutMode={isCheckoutMode}
                                    onCheckout={handleCheckout}
                                    cartRefetch={cartRefetch}
                                    paymentId={paymentId}
                                    qty={quantity}
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

const OrderSummaryCheckout = ({
   getCartMessage,
   cartData,
   localQuantities,
   isCheckoutMode,
   onCheckout,
   paymentId,
   qty,
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

   const totalDiscount =
      (cartData?.cross_price - cartData?.selling_price) * qty;

   const total = cartData?.cross_price * qty;

   const shippingCharge = 100; // Example shipping charge
   const grandTotal = total - totalDiscount + shippingCharge;

   // Handle place order button click
   const handlePlaceOrder = async () => {
      // Construct the order items array
      const orderItems = [
         {
            product_id: cartData?.id,
            product_varient_id: null,
            quantity: qty,
            price: cartData?.selling_price,
            subtotal: cartData?.cross_price * qty, // Use cross_price if exists, otherwise selling_price
         },
      ];

      // Construct the payload
      const payload = {
         shipping_detail_id: "1", // Replace with actual shipping detail ID if available
         subtotal: total, // Subtotal before discount
         delivery_charge: shippingCharge,
         discount: totalDiscount,
         tax: 0, // Add tax if applicable
         total_amount: grandTotal,
         note: "Order placed from cart", // Add a note if needed
         order_items: orderItems,
         payment_method_id: paymentId, // Pass the selected payment method ID
      };

      console.log({ payload }); // For debugging

      // Call the API to post the order
      postOrder(payload);
   };

   return (
      <div className="flex ml-[10px] rounded-[8px] bg-[#fff] flex-col py-[20px] px-[30px] mb-[20px]">
         <div className="flex justify-between">
            <div className="text-[16px] font-[500]">
               Order Summary
            </div>
         </div>
         <Divider sx={{ margin: "14px 0px" }} />

         <CartCardCheckout
            item={cartData}
            localQuantity={qty}
            isCheckoutMode={true}
            isChecked={true}
         />

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
            {/* {isCheckoutMode ? ( */}
            <>
               <button
                  onClick={handlePlaceOrder}
                  disabled={isPostOrderLoading}
                  className="bg-[#5598ea] hover:bg-[#7cb3f6] text-[#fff] rounded-[4px] py-[10px] text-[16px] duration-200"
               >
                  {isPostOrderLoading && <CustomSpinLoader />} Place
                  Order
               </button>
            </>
            {/* ) : (
               <button
                  disabled={isPostOrderLoading}
                  onClick={onCheckout}
                  className="bg-[#5598ea] hover:bg-[#7cb3f6] text-[#fff] rounded-[4px] py-[10px] text-[16px] duration-200"
               >
                  {" "}
                  Checkout
               </button>
            )} */}
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
   const sellingPrice = Number(item?.selling_price);

   console.log("dklsaflkjaskfas", { item });

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
                     src={item?.product_images?.[0]?.product_image}
                     alt="image"
                     className="w-[40px] h-[40px] border-[#ddd] border-[1px] object-cover rounded-[2px] mb-[10px] md:mb-[0px] mr-[6px]"
                  />

                  {/* Product Details */}
                  <div className="flex flex-col w-[100%]">
                     <div className="flex flex-row justify-between items-start w-[100%] mb-[6px]">
                        <div className="text-[14px] font-[400] pr-[20px]">
                           {item?.name}
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

export default RentNow;
