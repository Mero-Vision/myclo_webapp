import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { usePostUserPasswordUpdateMutation } from "../../../../../api/siteSlice";
import { CustomInputDefault } from "../../../../common/CustomInputs/CustomInputDefault";
import customToaster from "../../../../common/CustomToasters/CustomToaster";

const validationSchema = yup.object().shape({
   password: yup.string().required("name is required"),
   password_confirmation: yup
      .string()
      .oneOf(
         [yup.ref("password"), null],
         "Password and Confirm Password must match"
      )
      .required("Confirm password is required"),
});

const PasswordForm = ({ handleClose, row }) => {
   const {
      control,
      formState: { errors },
      handleSubmit,
      reset,
   } = useForm({ resolver: yupResolver(validationSchema) });

   const [
      postUserPasswordUpdate,
      {
         // error: shipError,
         isLoading: isShipLoading,
         isSuccess: isShipSuccess,
      },
   ] = usePostUserPasswordUpdateMutation();

   useEffect(() => {
      if (isShipSuccess) {
         reset();
         handleClose();
      }
   }, [isShipSuccess, reset, handleClose]);

   const onSubmit = (data) => {
      const payload = {
         current_password: data?.current_password,
         password: data?.password,
         password_confirmation: data?.password_confirmation,
      };

      postUserPasswordUpdate(payload)
         .unwrap()
         .then(() => {
            customToaster({
               type: "success",
               message: "Password Updated Successfully!",
            });
         });
   };

   return (
      <div>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[100%]"
            style={{ height: "fit-content" }}
         >
            <div className="">
               <div className="mb-[20px]">
                  <div className="py-[8px]">
                     <CustomInputDefault
                        control={control}
                        errors={errors}
                        name="current_password"
                        placeholder={"Enter Current Password"}
                        title={"Current Password"}
                        type="password"
                        required
                     />
                  </div>
                  <div className="py-[8px]">
                     <CustomInputDefault
                        control={control}
                        errors={errors}
                        name="password"
                        placeholder={"Enter New Password"}
                        title={"Password"}
                        type="password"
                        required
                     />
                  </div>
                  <div className="py-[8px]">
                     <CustomInputDefault
                        control={control}
                        errors={errors}
                        name="password_confirmation"
                        placeholder={"Enter Password again"}
                        title={"Confirm Password"}
                        type="password"
                        required
                     />
                  </div>
               </div>

               <div className="mb-[20px]">
                  <Button
                     disabled={isShipLoading}
                     type="submit"
                     sx={{
                        width: "100%",
                        height: "44px !important",
                        backgroundColor: "#0D74D6 !important",
                        borderRadius: "4px",
                        color: "#fff",
                        textTransform: "capitalize",
                        "&:hover": {
                           backgroundColor: "#0D74D6 !important",
                        },
                     }}
                  >
                     {isShipLoading && (
                        <CircularProgress
                           size="1rem"
                           sx={{
                              marginRight: "10px",
                              color: "#fff",
                           }}
                        />
                     )}
                     Update
                  </Button>{" "}
               </div>
            </div>
         </form>
      </div>
   );
};

// Add PropTypes
PasswordForm.propTypes = {
   row: PropTypes.object,
};

export default PasswordForm;
