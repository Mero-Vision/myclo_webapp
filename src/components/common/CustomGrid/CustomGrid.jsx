import { Box, Grid } from "@mui/material";
import React from "react";

const CustomGrid = ({ info, details, left, right }) => {
   return (
      <Box>
         <Grid container spacing={0}>
            <Grid item sm={12} xs={12} md={3}>
               {info}
            </Grid>
            <Grid
               item
               sm={12}
               xs={12}
               md={9}
               className="pl-[0px] lg:pl-[20px] pt-[20px] lg:pt-[0px]  "
            >
               <div className="bg-[#fff] p-[20px] rounded-[12px] overflow-hidden">
                  {details}{" "}
               </div>
            </Grid>
         </Grid>
      </Box>
   );
};

export default CustomGrid;
