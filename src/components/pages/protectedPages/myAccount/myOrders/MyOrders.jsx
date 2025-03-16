import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import NotInterestedOutlinedIcon from "@mui/icons-material/NotInterestedOutlined";
import React, { useEffect, useState } from "react";
import { useGetOrdersQuery } from "../../../../../api/siteSlice";
import LazyLoadPage from "../../../../common/lazyLoadPage/LazyLoadPage";
import CancelledOrders from "./CancelledOrders";
import CompletedOrders from "./CompletedOrders";
import ProcessingOrders from "./ProcessingOrders";

const MyOrders = () => {
   const [activeTab, setActiveTab] = useState("processing");

   const {
      data: orderDetailData,
      isFetching: isOrderDetailDataFetching,
      refetch,
   } = useGetOrdersQuery();

   useEffect(() => {
      refetch();
   }, [refetch]);

   const pendingOrders =
      orderDetailData?.data &&
      orderDetailData?.data?.filter(
         (item) => item?.order_status === "processing"
      );
   const completedOrders =
      orderDetailData?.data &&
      orderDetailData?.data?.filter(
         (item) => item?.order_status === "delivered"
      );
   const cancelledOrders =
      orderDetailData?.data &&
      orderDetailData?.data?.filter(
         (item) => item?.order_status === "cancelled"
      );

   const renderOrders = () => {
      switch (activeTab) {
         case "processing":
            return <ProcessingOrders data={pendingOrders} />;
         case "completed":
            return <CompletedOrders data={completedOrders} />;
         case "cancelled":
            return <CancelledOrders data={cancelledOrders} />;
         default:
            return <div>No Orders Found</div>;
      }
   };

   return (
      <div className="flex flex-col">
         <div className="text-[24px] font-[600] border-b-[1px] pb-[14px] w-fit mb-[36px] border-[#0D74D6]">
            My Orders History
         </div>
         {isOrderDetailDataFetching ? (
            <LazyLoadPage />
         ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
               <div className="flex mb-4">
                  <button
                     onClick={() => setActiveTab("processing")}
                     className={`px-4 py-2 ${
                        activeTab === "processing"
                           ? "bg-[#0D74D6] text-white"
                           : "bg-[#eee] text-[#0D74D6]"
                     }`}
                  >
                     <ChangeCircleOutlinedIcon
                        sx={{ marginRight: "6px" }}
                     />{" "}
                     Processing Orders
                  </button>
                  <button
                     onClick={() => setActiveTab("completed")}
                     className={`px-4 py-2 border-l-[#0D74D6] border-l-[1px] ${
                        activeTab === "completed"
                           ? "bg-[#0D74D6] text-white"
                           : "bg-[#eee] text-[#0D74D6]"
                     }`}
                  >
                     <DoneAllOutlinedIcon
                        sx={{ marginRight: "6px" }}
                     />{" "}
                     Completed Orders
                  </button>
                  <button
                     onClick={() => setActiveTab("cancelled")}
                     className={`px-4 py-2 border-l-[#0D74D6] border-l-[1px] ${
                        activeTab === "cancelled"
                           ? "bg-[#0D74D6] text-white"
                           : "bg-[#eee] text-[#0D74D6]"
                     }`}
                  >
                     <NotInterestedOutlinedIcon
                        sx={{ marginRight: "6px" }}
                     />{" "}
                     Cancelled Orders
                  </button>
               </div>
               <div>{renderOrders()}</div>
            </div>
         )}
      </div>
   );
};

export default MyOrders;
