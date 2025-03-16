import {
   Box,
   FormHelperText,
   Switch,
   Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { Controller } from "react-hook-form";

// Custom iOS-style Switch
const IOSSwitch = styled(Switch)(({ theme }) => ({
   width: 42,
   height: 26,
   padding: 0,
   "& .MuiSwitch-switchBase": {
      padding: 1,
      "&.Mui-checked": {
         transform: "translateX(16px)",
         color: "#fff",
         "& + .MuiSwitch-track": {
            backgroundColor: "#6158CA", // iOS green color
            opacity: 1,
         },
      },
   },
   "& .MuiSwitch-thumb": {
      width: 24,
      height: 24,
      boxShadow: "0px 0px 3px rgba(0,0,0,0.3)",
   },
   "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: "#E9E9EA",
      opacity: 1,
   },
}));

export const CustomSwitch = ({
   name,
   control,
   errors,
   label,
   right,
   rule = { required: false },
   nonNestedSelect = true,
   disabled,
}) => {
   return (
      <div>
         <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
               <Box
                  alignItems="center"
                  display="flex"
                  columnGap="8px"
                  sx={{
                     fontSize: "12px",
                     textTransform: "uppercase",
                     "& > *": { fontWeight: "500 !important" },
                  }}
               >
                  {!right && (
                     <div style={{ textTransform: "capitalize" }}>
                        {label}
                     </div>
                  )}
                  <IOSSwitch
                     checked={value}
                     onChange={onChange}
                     disabled={disabled}
                  />
                  {right && <Typography>{label}</Typography>}
               </Box>
            )}
            rules={rule}
         />
         {nonNestedSelect &&
            errors[name] &&
            errors[name].type === "required" && (
               <FormHelperText style={{ color: "red" }}>
                  This field is required
               </FormHelperText>
            )}
      </div>
   );
};
