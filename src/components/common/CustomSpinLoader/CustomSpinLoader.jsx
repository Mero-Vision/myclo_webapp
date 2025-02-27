import { CircularProgress } from "@mui/material";
import React from "react";

const CustomSpinLoader = () => {
   return (
      <>
         <CircularProgress
            sx={{
               marginTop: "2px",
               width: "18px !important",
               height: "18px !important",
            }}
         />
      </>
   );
};

export default CustomSpinLoader;
