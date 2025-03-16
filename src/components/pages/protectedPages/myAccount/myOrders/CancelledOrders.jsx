import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import { returnNepaliNumberWithCommas } from "../../../../../utils/helpers";

const CancelledOrders = ({ data }) => {
   return (
      <>
         <div
            style={{
               boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
            className="p-[16px] rounded-[6px] "
         >
            {data?.map((item, index) => (
               <Card item={item} key={index} />
            ))}
         </div>
      </>
   );
};

const Card = ({ item }) => {
   console.log({ item });

   return (
      <div className="flex flex-col mb-[30px]  border-b-[#eee] border-b-[1px] pb-[10px]">
         <div className="flex flex-row items-center justify-between gap-[8px] mb-[20px] w-[100%]">
            <div className="flex flex-row gap-[10px] items-center  w-[100%] ">
               <div className="bg-[#f0f8ff] w-fit px-[10px] pt-[8px] pb-[10px] rounded-[50%]">
                  <WidgetsOutlinedIcon
                     sx={{
                        color: "#0D74D6",
                        fontSize: "22px",
                        height: "max-content",
                     }}
                  />
               </div>
               <div className="text-[16px] font-[500] text-[#3b3b3b]">
                  Order ID:{" "}
                  <span className="text-[16px] font-[500] text-[#000]">
                     {item?.order_number}
                  </span>
               </div>
               <div
                  className={`${
                     item?.order_status === "cancelled"
                        ? "bg-[#ff5a36]"
                        : item?.order_status === "delivered"
                        ? "bg-[#3ec2a1]"
                        : ""
                  } text-white font-medium text-[12px] px-[8px] py-[2px] rounded-[4px]`}
               >
                  {item?.order_status === "delivered"
                     ? "Delivered"
                     : item?.order_status === "cancelled"
                     ? "Cancelled"
                     : ""}
               </div>
            </div>
            <div className=" ">
               <div className=" flex flex-row justify-end gap-[6px] items-center">
                  <div className="text-[16px] font-[400] whitespace-nowrap">
                     Net Total:{" "}
                  </div>
                  <span className="text-[18px] font-[500] whitespace-nowrap">
                     Rs.{" "}
                     {returnNepaliNumberWithCommas(
                        item?.total_amount || 0
                     )}
                  </span>
               </div>{" "}
               <div className="text-[10px] font-[400] text-[#aaa] whitespace-nowrap">
                  (Inclusive of all Taxes & Delivery charges)
               </div>
            </div>
         </div>
         {item?.order_items?.map((productItem, index) => (
            <ProductCardSingle item={productItem} key={index} />
         ))}{" "}
      </div>
   );
};

const ProductCardSingle = ({ item }) => {
   const navigate = useNavigate();

   return (
      <div
         onClick={() => navigate(`/products/${item?.product?.slug}`)}
         className="bg-[#F8F8F8] rounded-[6px] p-[16px] mb-[20px] cursor-pointer"
      >
         <Grid container spacing={0}>
            <Grid item sm={12} md={2} className="pr-[20px]">
               <img
                  className="rounded-[8px] aspect-[1/1] object-cover"
                  src={
                     item?.product?.product_images &&
                     item?.product?.product_images?.[0]?.product_image
                  }
                  alt={item?.product?.name}
               />
            </Grid>
            <Grid item sm={12} md={10}>
               <div className="flex flex-col">
                  <div className="text-[20px] font-[500] mb-[8px]">
                     {item?.product?.name}
                  </div>
                  <div className="text-[14px] font-[400] mb-[2px]">
                     Quantity:
                     <span className="text-[14px] font-[500] pl-[6px]">
                        {item?.quantity}
                     </span>
                  </div>
                  <div className="text-[14px] font-[400]">
                     Total:
                     <span className="text-[14px] font-[500] pl-[6px]">
                        Rs.{" "}
                        {returnNepaliNumberWithCommas(item?.subtotal)}
                     </span>
                  </div>
               </div>
            </Grid>
         </Grid>
      </div>
   );
};

// Add propTypes for the Card component
Card.propTypes = {
   item: PropTypes.shape({
      order_number: PropTypes.string.isRequired,
      total_amount: PropTypes.number.isRequired,
      order_status: PropTypes.string,
      order_items: PropTypes.arrayOf(
         PropTypes.shape({
            product: PropTypes.shape({
               name: PropTypes.string.isRequired,
               slug: PropTypes.string.isRequired,
               product_images: PropTypes.arrayOf(
                  PropTypes.shape({
                     product_image: PropTypes.string.isRequired,
                  })
               ).isRequired,
            }).isRequired,
            quantity: PropTypes.number.isRequired,
            subtotal: PropTypes.number.isRequired,
         })
      ).isRequired,
   }).isRequired,
};

// Add propTypes for the ProductCardSingle component
ProductCardSingle.propTypes = {
   item: PropTypes.shape({
      product: PropTypes.shape({
         name: PropTypes.string.isRequired,
         slug: PropTypes.string.isRequired,
         product_images: PropTypes.arrayOf(
            PropTypes.shape({
               product_image: PropTypes.string.isRequired,
            })
         ).isRequired,
      }).isRequired,
      quantity: PropTypes.number.isRequired,
      subtotal: PropTypes.number.isRequired,
   }).isRequired,
};

CancelledOrders.propTypes = {
   data: PropTypes.array.isRequired, // Assuming data is an array
};

export default CancelledOrders;
