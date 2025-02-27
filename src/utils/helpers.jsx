import moment from "moment";
import customToaster from "../components/common/CustomToasters/CustomToaster";
// import customToaster from "../components/common/CustomToasters/CustomToaster";

export const getToken = () => {
   const access_token = localStorage.getItem("access_token");
   const refresh_token = localStorage.getItem("refresh_token");
   const user = JSON.parse(localStorage.getItem("user"));

   console.log({ access_token, refresh_token, user });

   return {
      access_token,
      refresh_token,
      user,
   };
};

export const generateGreetings = () => {
   const currentHour = moment().format("HH");

   if (currentHour >= 3 && currentHour < 12) {
      return "Morning";
   } else if (currentHour >= 12 && currentHour < 15) {
      return "Afternoon";
   } else {
      return "Evening";
   }
};

export const findInArray = (array = [], key, value) => {
   const data = array?.find(
      (item) => item?.[key]?.toString() === value?.toString()
   );
   return data;
};

export const returnFixedValue = (value, number = 2) => {
   return Number(value ? value : 0)?.toFixed(number);
};

//Return commas (Eg: 1,256,00.00)
export const returnNumberWithCommas = (data) => {
   return returnFixedValue(data)
      ?.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Function to format number with commas and no .00 at the end
export const returnNumberWithCommasNoDecimals = (data) => {
   let fixedValue = returnFixedValue(data);

   if (fixedValue % 1 === 0) {
      // If the number is an integer, remove the decimal part
      return fixedValue
         ?.toString()
         .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   } else {
      // If the number has decimal part, return with commas and decimals
      return fixedValue
         ?.toString()
         .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   }
};

export const returnEnglishNumberWithCommas = (data) => {
   return Number(data)?.toLocaleString("en-US", {
      maximumFractionDigits: 2,
   });
};

export const returnNepaliNumberWithCommas = (data) => {
   return Number(data)?.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
   });
};

export const getCharacterValidationError = (str) => {
   return `Your password must contain at least 1 ${str} character`;
};

export const getError = (error) => {
   let err;

   if (error?.data?.errors) {
      err = customToaster({
         type: "error",
         message:
            error?.data?.errors &&
            Object?.values(error?.data?.errors)
               ?.map((item) => item)
               ?.join("\n"),
      });
   } else if (error?.data?.message) {
      err = customToaster({
         type: "error",
         message: error?.data?.message,
      });
   }
   return err;
};

export const getSuccess = (success) => {
   return (
      success &&
      customToaster({
         type: "success",
      })
   );
};

export const isPwa = () => {
   return ["fullscreen", "standalone", "minimal-ui"].some(
      (displayMode) =>
         window?.matchMedia("(display-mode: " + displayMode + ")")
            .matches
   );
};

export const replaceFunction = (
   string,
   valueToReplace = " ",
   newValue = "-"
) => {
   const data = string?.replaceAll(valueToReplace, newValue);
   return data;
};

export const changeDateFormat = (date, format = "DD/MMM/YYYY") => {
   const changedDate = moment(date).format(format);
   return changedDate;
};

export const getSiteDetail = () => {
   const access_token = localStorage.getItem("admin_access_token");
   const user = JSON.parse(localStorage.getItem("user"));

   return {
      token: access_token,
      userData: user,
   };
};
