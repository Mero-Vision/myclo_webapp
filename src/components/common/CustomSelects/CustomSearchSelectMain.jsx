import {
   Autocomplete,
   Box,
   FormControl,
   Grow,
   Paper,
   TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { forwardRef } from "react";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
   root: {
      "& .MuiFormControl-root": {
         width: "100%",
      },
   },
}));
export const CustomSearchSelectMain = ({
   name,
   control,
   errors,
   label,
   data = [],
   title = "",
   disabled,
   startIcon,
   placeholder,
   required,
   dayBook,
}) => {
   const classes = useStyles();
   let error;
   const splitName = name.split(".");
   if (errors) {
      if (splitName?.length > 1) {
         let loopError = errors;
         splitName?.map((item, index) => {
            loopError = loopError?.[item];
         });
         error = loopError?.message;
      } else {
         error = errors?.[name]?.message;
      }
   }

   function PaperComponent(paperProps, ref) {
      return (
         <Grow in unmountOnExit>
            <Paper {...paperProps} ref={ref} />
         </Grow>
      );
   }
   const PaperComponentForward = forwardRef(PaperComponent);

   return (
      <div className="inputs">
         <div className={classes.root}>
            {title && (
               <div
                  className="inputTitle"
                  style={{
                     fontSize: "14px",
                     fontWeight: "500",
                     color: "#525252",
                     marginBottom: "3px",
                  }}
               >
                  {title}{" "}
                  <span style={{ color: "red" }}>
                     {required && "*"}{" "}
                  </span>
               </div>
            )}
            <FormControl variant="outlined">
               {/* <InputLabel>{label}</InputLabel> */}
               <Controller
                  name={name}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                     <Autocomplete
                        sx={
                           dayBook && {
                              borderRadius: "6px",
                              border: "1px solid #F9F9FB !important",
                              padding: "0px !important",
                              "& .MuiInputBase-root": {
                                 backgroundColor: "#fff !important",
                                 padding: "0px !important",
                              },
                              "& .MuiAutocomplete-input": {
                                 padding: "0px !important",
                              },
                              "& .MuiAutocomplete-root": {
                                 padding: "0px !important",
                              },
                              "& .MuiOutlinedInput-root": {
                                 padding: "0px !important",
                              },
                           }
                        }
                        key={value}
                        id="combo-box-demo"
                        options={data}
                        getOptionLabel={(option) => option?.label}
                        onChange={(e, data) =>
                           onChange(data?.value ?? "")
                        }
                        defaultValue={data?.find(
                           (item) => item?.value == value
                        )}
                        isOptionEqualToValue={(option) =>
                           option?.value
                        }
                        disabled={disabled}
                        PaperComponent={PaperComponentForward}
                        renderInput={(params) => {
                           console.log("aldalsjdk", {
                              params,
                              value,
                              data,
                           });
                           return (
                              <TextField
                                 {...params}
                                 variant="outlined"
                                 label={label}
                                 placeholder={placeholder}
                                 sx={{
                                    "& svg": {
                                       marginLeft: "2px",
                                       marginRight: "20px",
                                       height: "19px",
                                       width: "19px",
                                    },

                                    "& .MuiAutocomplete-endAdornment":
                                       {
                                          "& svg": {
                                             margin: "0",
                                          },
                                       },

                                    "& .MuiOutlinedInput-root": {
                                       padding: "4px !important",
                                    },
                                    "& .MuiAutocomplete-input": {
                                       fontSize: "12px !important",
                                    },
                                 }}
                                 InputProps={{
                                    ...params?.InputProps,
                                    startAdornment: startIcon,
                                 }}
                              />
                           );
                        }}
                     />
                  )}
               />
            </FormControl>
            {error && (
               <Box style={{ color: "red", fontSize: "10px" }}>
                  {error}
               </Box>
            )}
         </div>
      </div>
   );
};
