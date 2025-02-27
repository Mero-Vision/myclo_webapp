import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import { Grid } from "@mui/material";
import React from "react";
import { getSiteDetail } from "../../../../../utils/helpers";
const Dashboard = () => {
   const userData = getSiteDetail()?.userData;

   console.log({ userData });

   return (
      <div className="flex flex-col">
         <div className="text-[24px] font-[600] border-b-[1px] pb-[14px] w-fit mb-[36px] border-[#0D74D6]">
            My Dashboard
         </div>
         <div>
            <div className="text-[16px] font-[400] mb-[12px]">
               Hello,{" "}
               <span className="font-[600]">{userData?.name}</span>
            </div>
            <div className="text-[16px] font-[400] mb-[32px]">
               From your My Account Dashboard you have the ability to
               view a snapshot of your recent account activity and
               update your account information.{" "}
            </div>
            <Grid container spacing={3} sx={{ marginBottom: "34px" }}>
               <Grid item xs={12} sm={6} md={4}>
                  <div
                     style={{
                        boxShadow:
                           "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                     }}
                     className=" rounded-[8px] px-[18px] py-[20px]  flex items-center flex-row"
                  >
                     <div>
                        <LocalMallOutlinedIcon
                           sx={{
                              fontSize: "54px",
                              color: "#0D74D6 ",
                              marginRight: "10px",
                           }}
                        />{" "}
                     </div>
                     <div>
                        <div className="mb-[3px] text-[16px] font-[500] text-[#343434]">
                           Total Order
                        </div>
                        <div className="text-[20px] font-[600] text-[#000]">
                           334
                        </div>
                     </div>
                  </div>
               </Grid>
               <Grid item xs={12} sm={6} md={4}>
                  <div
                     style={{
                        boxShadow:
                           "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                     }}
                     className=" rounded-[8px] p-[20px] flex items-center flex-row"
                  >
                     <div>
                        <FactCheckOutlinedIcon
                           sx={{
                              fontSize: "54px",
                              color: "#0D74D6 ",
                              marginRight: "10px",
                           }}
                        />{" "}
                     </div>
                     <div>
                        <div className="mb-[3px] text-[16px] font-[500] text-[#343434]">
                           Total Pending Orders
                        </div>
                        <div className="text-[20px] font-[600] text-[#000]">
                           334
                        </div>
                     </div>
                  </div>
               </Grid>
               <Grid item xs={12} sm={6} md={4}>
                  <div
                     style={{
                        boxShadow:
                           "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                     }}
                     className=" rounded-[8px] p-[20px]  flex items-center flex-row"
                  >
                     <div>
                        <ReceiptLongOutlinedIcon
                           sx={{
                              fontSize: "54px",
                              color: "#0D74D6 ",
                              marginRight: "10px",
                           }}
                        />{" "}
                     </div>
                     <div>
                        <div className="mb-[3px] text-[16px] font-[500] text-[#343434]">
                           Total Wishlist
                        </div>
                        <div className="text-[20px] font-[600] text-[#000]">
                           334
                        </div>
                     </div>
                  </div>
               </Grid>
            </Grid>
            <div className="flex flex-col">
               <div className="text-[20px] font-[500] w-fit mb-[20px] ">
                  Account Information
               </div>
               <div className="felx flex-col mb-[24px]">
                  <div className="text-[18px] font-[400] w-[100%] mb-[12px] border-b-[1px] pb-[8px] border-[#ddd]">
                     Contact Information
                  </div>
                  <div className="text-[15px] font-[300] mb-[4px]">
                     {userData?.name}
                  </div>
                  <div className="text-[15px] font-[300] mb-[4px]">
                     {userData?.email}
                  </div>
               </div>
               <div className="felx flex-col">
                  <div className="text-[18px] font-[400] w-[100%] mb-[12px] border-b-[1px] pb-[8px] border-[#ddd]">
                     Address Book
                  </div>

                  <div className="text-[15px] font-[300] mb-[4px]">
                     Apex College, Babarmahal, Kathmandu, Nepal
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
