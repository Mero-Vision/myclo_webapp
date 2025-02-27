import {
   Autocomplete,
   Box,
   FormControl,
   InputLabel,
   TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
   root: {
      "& .MuiFormControl-root": {
         width: "100%",
      },

      "& .title": {
         fontSize: "12px",
         fontWeight: "500 !important",
         color: "#222136 !important",
         marginBottom: "8px",
      },
      "& svg": {
         marginRight: "9px",
         height: "19px",
         width: "19px",
      },

      "& .MuiOutlinedInput-root": {
         padding: "0px !important",
         // height: "auto",
      },
      "& .MuiInputBase-root": {
         height: "auto !important",
         minHeight: "42px",
      },
   },
}));
export const CustomMultipleSelect = ({
   name,
   control,
   errors,
   label,
   data = [],
   title = "",
   disabled,
   defaultValue,
   placeholder,
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

   return (
      <>
         <div className={classes.root}>
            {title && (
               <InputLabel
                  className="title"
                  sx={{
                     marginLeft: "0px",
                     fontSize: "12px",
                     fontWeight: "500",
                     color: "#121127",
                     textTransform: "capitalize !important",
                  }}
               >
                  {title}
               </InputLabel>
            )}
            <FormControl variant="outlined">
               {/* <InputLabel>{label}</InputLabel> */}
               <Controller
                  name={name}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                     <>
                        <Autocomplete
                           multiple
                           limitTags={2}
                           id="multiple-limit-tags"
                           options={data}
                           defaultValue={defaultValue || []}
                           onChange={(e, data) =>
                              onChange(
                                 data?.map((item) => item?.value)
                              )
                           }
                           getOptionLabel={(option) => option.label}
                           renderInput={(params) => (
                              <TextField {...params} label={label} />
                           )}
                        />

                        {error && (
                           <Box
                              style={{
                                 color: "red",
                                 fontSize: "10px",
                              }}
                           >
                              {!value && error}
                           </Box>
                        )}
                     </>
                  )}
               />
            </FormControl>
            {/* {errors[name] && errors[name].type === "required" && (
          <FormHelperText style={{ color: "red" }}>
            This field is required
          </FormHelperText>
        )} */}
         </div>
      </>
   );
};

// import {
//    Autocomplete,
//    Box,
//    FormControl,
//    FormHelperText,
//    InputLabel,
//    TextField,
// } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import { Controller } from "react-hook-form";

// const useStyles = makeStyles((theme) => ({
//    root: {
//       "& .MuiFormControl-root": {
//          width: "100%",
//       },
//       "& .MuiAutocomplete-root .MuiOutlinedInput-root": {
//          padding: "2px 0",
//       },
//       "& .MuiAutocomplete-input": {
//          minWidth: "initial !important",
//       },

//       "& .MuiAutocomplete-inputRoot": {
//          padding: "0px 10px !important",
//       },

//       "& .MuiInputLabel-root": {
//          fontSize: "12px !important",
//          textTransform: "uppercase",

//          fontWeight: "500 !important",
//          color: "#121127 !important",
//          marginBottom: "8px",
//       },
//    },
// }));

// export const CustomMultipleSelect = ({
//    name,
//    control,
//    errors,
//    label,
//    data = [],
//    title = "",
//    disabled,
//    defaultValue,
//    placeholder,
//    required,
// }) => {
//    const classes = useStyles();

//    return (
//       <>
//          <Box className={`${classes.root} custom-select`}>
//             {title && (
//                <Box
//                   sx={{
//                      display: "flex",
//                      columnGap: "0.1rem",
//                      mb: "3px",
//                   }}
//                >
//                   <InputLabel className="title">{title} </InputLabel>
//                   {required && (
//                      <InputLabel style={{ color: "red" }}>
//                         {" *"}
//                      </InputLabel>
//                   )}
//                </Box>
//             )}

//             <FormControl variant="outlined">
//                <Controller
//                   name={name}
//                   control={control}
//                   render={({ field: { onChange, value } }) => (
//                      <>
//                         <Autocomplete
//                            multiple
//                            limitTags={2}
//                            id="multiple-limit-tags"
//                            disableClearable
//                            filterSelectedOptions
//                            options={data}
//                            defaultValue={defaultValue || []}
//                            onChange={(e, data) => {
//                               return onChange(
//                                  data?.map(
//                                     (item) => item?.value || item
//                                  )
//                               );
//                            }}
//                            value={value || []}
//                            getOptionLabel={(option) => {
//                               if (option?.label) {
//                                  return option.label;
//                               } else {
//                                  const requiredOption = data.find(
//                                     (item) => item.value === option
//                                  );

//                                  return requiredOption?.label;
//                               }
//                            }}
//                            renderInput={(params) => {
//                               return (
//                                  <TextField
//                                     {...params}
//                                     label={label}
//                                     placeholder={placeholder}
//                                  />
//                               );
//                            }}
//                         />
//                      </>
//                   )}
//                />
//             </FormControl>
//             {errors[name] && (
//                <FormHelperText
//                   style={{ color: "red", fontSize: "10px" }}
//                >
//                   {errors[name]?.message}
//                </FormHelperText>
//             )}
//          </Box>
//       </>
//    );
// };
