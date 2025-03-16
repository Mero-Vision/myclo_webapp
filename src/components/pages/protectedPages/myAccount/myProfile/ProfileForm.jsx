import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
   useGetUserSingleQuery,
   usePostUserNameUpdateMutation,
} from "../../../../../api/siteSlice";
import { getSiteDetail } from "../../../../../utils/helpers";
import { CustomInputDefault } from "../../../../common/CustomInputs/CustomInputDefault";
import customToaster from "../../../../common/CustomToasters/CustomToaster";

const validationSchema = yup.object().shape({
   name: yup.string().required("name is required"),
});

const ProfileForm = ({ handleClose, row }) => {
   const userData = getSiteDetail()?.userData;

   const { refetch } = useGetUserSingleQuery(userData?.id, {
      skip: !userData?.id,
   });
   const {
      control,
      formState: { errors },
      handleSubmit,
      reset,
   } = useForm({ resolver: yupResolver(validationSchema) });

   useEffect(() => {
      if (row) {
         reset({
            ...row,
         });
      }
   }, [row, reset]);

   const [
      postUserNameUpdate,
      {
         // error: shipError,
         isLoading: isShipLoading,
         isSuccess: isShipSuccess,
      },
   ] = usePostUserNameUpdateMutation();

   useEffect(() => {
      if (isShipSuccess) {
         reset();
         handleClose();
         refetch();
      }
   }, [isShipSuccess, reset, handleClose, refetch]);

   const onSubmit = (values) => {
      const payload = {
         name: values?.name,
         id: values?.id,
         _method: "PUT",
      };

      postUserNameUpdate(payload)
         .unwrap()
         .then(() => {
            customToaster({
               type: "success",
               message: "Detail Updated Successfully!",
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
                        name="name"
                        placeholder={"Profile Name"}
                        title={"Profile Name"}
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
ProfileForm.propTypes = {
   row: PropTypes.object,
};

export default ProfileForm;
