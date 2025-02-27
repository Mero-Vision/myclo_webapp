import {
  Box,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
    },
    "& label": {
      fontSize: "14px !important",
    },
    //  "& .radioButtonContainer": {
    //    display: "flex",
    //    gridColumnGap: "1rem",
    //  },
    //  "& .radioButton": {
    //    border: "1px solid red",
    //    borderRadius: "4px",
    //    marginLeft: "0 !important",
    //  },
  },
}));

export const CustomRadioButton = ({
  name,
  control,
  errors,
  data,
  rule = { required: false },
  title = "",
  nonNestedSelect = true,
  row,
  disabled,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        {title && (
          <InputLabel className="title">{title?.toUpperCase()}</InputLabel>
        )}

        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioGroup
              row={row === "false" ? false : true}
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={onChange}
              value={value}
              className="radioButtonContainer"
            >
              {data?.map((item) => (
                <Box key={item?.label} className="radioButton">
                  <FormControlLabel
                    value={item?.value}
                    control={<Radio />}
                    label={item?.label}
                    disabled={disabled}
                  />
                </Box>
              ))}
            </RadioGroup>
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
    </>
  );
};
