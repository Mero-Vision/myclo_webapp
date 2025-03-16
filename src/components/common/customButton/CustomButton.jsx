import { Box, Button, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { getError } from "../../../utils/helpers";
import customToaster from "../CustomToasters/CustomToaster";

const CustomButton = ({
   pos,
   type,
   variant,
   buttonName,
   loading,
   justifyContent,
   handleClick,
   success,
   disabled,
   error,
   successData,
   handleClose = () => {},
   margin,
   fullWidth,
}) => {
   useEffect(() => {
      if (success) {
         customToaster({
            type: "success",
            message: successData?.message || "Success",
         });
         handleClose && handleClose();
      }
   }, [success]);
   useEffect(() => {
      getError(error);
   }, [error]);

   return (
      <Box
         display={"flex"}
         justifyContent={justifyContent || "end"}
         marginTop={margin || "17px"}
      >
         <Button
            sx={{
               backgroundColor: "#746be3 !important",
               borderRadius: "8px",
               color: "#fff",
               padding: "8px 30px !important",

               textTransform: "capitalize",
               "&:hover": {
                  backgroundColor: "#6259CA !important",
               },
            }}
            variant={variant || "contained"}
            type={type || "submit"}
            disabled={disabled || loading}
            onClick={handleClick}
            fullWidth={fullWidth}
         >
            {loading && (
               <CircularProgress
                  size="1rem"
                  sx={{ marginRight: "10px", color: "#fff" }}
               />
            )}
            {buttonName || "Save"}
         </Button>{" "}
      </Box>
   );
};

export default CustomButton;
