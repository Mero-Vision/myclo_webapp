import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";

const RedirectLayout = () => {
   return (
      <>
         <Box className="m-0 p-0 box-border relative z-[100]">
            <Box>
               <Navbar />
               <Box className="w-[100%] pt-[65px] lg:pt-[125px]">
                  <Outlet />
               </Box>
               <Footer />
            </Box>
         </Box>
      </>
   );
};

export default RedirectLayout;
