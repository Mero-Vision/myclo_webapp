import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import React, { useState } from "react";
import CompletedOrders from "./CompletedOrders";
import ProcessingOrders from "./ProcessingOrders";

const MyOrders = () => {
   const [activeTab, setActiveTab] = useState("processing");

   return (
      <div className="flex flex-col">
         <div className="text-[24px] font-[600] border-b-[1px] pb-[14px] w-fit mb-[36px] border-[#0D74D6]">
            My Orders History
         </div>
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
               className={`px-4 py-2 ${
                  activeTab === "completed"
                     ? "bg-[#0D74D6] text-white"
                     : "bg-[#eee] text-[#0D74D6]"
               }`}
            >
               <DoneAllOutlinedIcon sx={{ marginRight: "6px" }} />{" "}
               Completed Orders
            </button>
         </div>
         <div>
            <div>
               {activeTab === "processing" ? (
                  <ProcessingOrders />
               ) : (
                  <CompletedOrders />
               )}
            </div>
         </div>
      </div>
   );
};

export default MyOrders;
