import { Add, ArrowForward } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import Person1 from "../../../assets/add1.svg";
import Bill1 from "../../../assets/bill1.svg";

const AddButton = ({ value, handleButtonClick = () => {} }) => {
   const personArray = [
      "supplier",
      "customer",
      "employee",
      "delivery partner",
   ];
   const isPerson = personArray?.includes(value?.toLowerCase());
   // const isPerson = true;
   console.log({ value, isPerson });
   return (
      <Box
         sx={{
            minHeight: "60vh",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            columnGap: "4rem",
            flexDirection: isPerson && "column",
            // background: "#fff",
            // borderRadius: "10px",
         }}
      >
         <Box
            sx={{
               "& img": {
                  height: isPerson ? "350px" : "500px",
                  width: "450px",
               },
            }}
         >
            {isPerson ? <img src={Person1} /> : <img src={Bill1} />}
         </Box>
         <Box
            sx={{
               display: "flex",
               // backgroundColor: "#fff",
               // padding: "2rem",
               flexDirection: "column",
               rowGap: "1.5rem",
               width: "380px",
            }}
         >
            {/* <Box
          sx={{
            backgroundColor: "#3EC4D510",
            width: "max-content",
            padding: "4px 4px 0 4px",
            borderRadius: "4px",
          }}
        >
          <Receipt sx={{ color: "#aaa" }} />
        </Box> */}
            <Box>
               <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
                  Create a new{" "}
                  <span
                     style={{
                        textTransform: "capitalize",
                        color: "#6259CA",
                     }}
                  >
                     {value}
                  </span>
               </Typography>
               <Typography
                  sx={{ fontSize: "14px", color: "#6C6B80" }}
               >
                  Send a customizable {value} to add details of the
                  record. This feature provides users with a
                  convenient way to keep track of their expenditures
                  and manage their finances effectively.
               </Typography>
               <Button
                  endIcon={<ArrowForward />}
                  sx={{
                     width: "max-content",
                     paddingInline: "0 !important",
                     color: "#746be3 !important",
                     background: "none !important",
                  }}
               >
                  Learn More
               </Button>
            </Box>
            <Button
               sx={{
                  backgroundColor: "#746be3",
                  color: "#fff",
                  borderRadius: "8px",
                  "&:hover": {
                     backgroundColor: "#746be3",
                  },
               }}
               startIcon={<Add />}
               onClick={() => handleButtonClick()}
            >
               Create a new {value}
            </Button>
         </Box>
      </Box>
   );
};

export default AddButton;
