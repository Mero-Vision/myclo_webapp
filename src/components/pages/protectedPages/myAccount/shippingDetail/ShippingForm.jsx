import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress } from "@mui/material";
import PropTypes from "prop-types"; // Import PropTypes
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
   usePostShippingDetailsMutation,
   usePostShippingDetailsUpdateMutation,
} from "../../../../../api/siteSlice";
import { CustomInputDefault } from "../../../../common/CustomInputs/CustomInputDefault";
import { CustomSearchSelect } from "../../../../common/CustomSelects/CustomSearchSelect";
import {
   PROVINCE_BAGMATI,
   PROVINCE_GANDAKI,
   PROVINCE_KARNALI,
   PROVINCE_KOSHI,
   PROVINCE_LUMBINI,
   PROVINCE_MADHESH,
   PROVINCE_SUDURPASHCHIM,
   PROVINCES,
} from "../../../../common/data";

const validationSchema = yup.object().shape({
   recipient_name: yup.string().required("name is required"),
   contact_no: yup.string().required("Contact Number is required"),
   email: yup.string().required("Email is required"),
   region: yup.string().required("Region is required"),
   district_city: yup.string().required("District is required"),
   address: yup.string().required("Address is required"),
   landmark: yup.string().required("Landmark is required"),
});

const ShippingForm = ({ handleClose, row }) => {
   const {
      control,
      formState: { errors },
      handleSubmit,
      reset,
      watch,
   } = useForm({ resolver: yupResolver(validationSchema) });

   useEffect(() => {
      if (row) {
         // Map the region name to its corresponding id
         const regionId = PROVINCES.find(
            (province) => province.name === row.region
         )?.id;
         // Map the district name to its corresponding value
         const districtValue = DISTRICTS_BY_PROVINCE[regionId]?.find(
            (district) => district.name === row.district_city
         )?.name;

         reset({
            ...row,
            region: regionId,
            district_city: districtValue,
         });
      }
   }, [row, reset]);

   const [
      getShippingDetails,
      {
         // error: shipError,
         isLoading: isShipLoading,
         isSuccess: isShipSuccess,
      },
   ] = usePostShippingDetailsMutation();

   const [
      postShippingDetailsUpdate,
      {
         // error: updateError,
         isLoading: isUpdateLoading,
         isSuccess: isUpdateSuccess,
      },
   ] = usePostShippingDetailsUpdateMutation();

   useEffect(() => {
      if (isShipSuccess || isUpdateSuccess) {
         reset();
         handleClose();
      }
   }, [isShipSuccess, isUpdateSuccess, reset, handleClose]);

   const PROVINCES_DATA = PROVINCES?.map((item) => ({
      label: item.name,
      value: item.id,
   }));

   const DISTRICTS_BY_PROVINCE = {
      1: PROVINCE_KOSHI,
      2: PROVINCE_MADHESH,
      3: PROVINCE_BAGMATI,
      4: PROVINCE_GANDAKI,
      5: PROVINCE_LUMBINI,
      6: PROVINCE_KARNALI,
      7: PROVINCE_SUDURPASHCHIM,
   };

   // Watch the selected province
   const selectedProvinceId = watch("region");

   const selectedProvinceName =
      PROVINCES.find((province) => province.id === selectedProvinceId)
         ?.name || "";

   // Get the corresponding districts dynamically
   const DISTRICTS_DATA =
      DISTRICTS_BY_PROVINCE[selectedProvinceId]?.map((item) => ({
         label: item.name,
         value: item.name,
      })) || [];

   const onSubmit = (data) => {
      const payload = {
         ...data,
         region: selectedProvinceName,
      };

      if (row) {
         postShippingDetailsUpdate({
            data: { ...payload, _method: "PUT" },
            id: row.id,
         });
      } else {
         getShippingDetails(payload);
      }
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
                        name="recipient_name"
                        placeholder={"Recipient Name"}
                        title={"Recipient Name"}
                        required
                     />
                  </div>
                  <div className="py-[8px]">
                     <CustomInputDefault
                        control={control}
                        errors={errors}
                        name="contact_no"
                        placeholder={"Contact Number"}
                        title="Contact Number"
                        type="number"
                        required
                     />
                  </div>
                  <div className="py-[8px]">
                     <CustomInputDefault
                        control={control}
                        errors={errors}
                        name="email"
                        type={"email"}
                        placeholder={"Email"}
                        title="Email Address"
                        required
                     />
                  </div>
                  <div className="py-[8px]">
                     <CustomSearchSelect
                        control={control}
                        errors={errors}
                        name="region"
                        placeholder={"Province/Region"}
                        title="Province/Region"
                        data={PROVINCES_DATA || []}
                        key={PROVINCES_DATA || []}
                        required
                        daybook
                     />
                  </div>
                  <div className="py-[8px]">
                     <CustomSearchSelect
                        control={control}
                        errors={errors}
                        name="district_city"
                        placeholder={"District City"}
                        title="District City"
                        data={DISTRICTS_DATA || []}
                        key={DISTRICTS_DATA || []}
                        required
                     />
                  </div>
                  <div className="py-[8px]">
                     <CustomInputDefault
                        control={control}
                        errors={errors}
                        name="address"
                        placeholder={"Address"}
                        title="Address"
                        required
                     />
                  </div>
                  <div className="py-[8px]">
                     <CustomInputDefault
                        control={control}
                        errors={errors}
                        name="landmark"
                        placeholder={"Landmark"}
                        title="Landmark"
                        required
                     />
                  </div>
               </div>

               <div className="mb-[20px]">
                  <Button
                     disabled={isShipLoading || isUpdateLoading}
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
                     {(isShipLoading || isUpdateLoading) && (
                        <CircularProgress
                           size="1rem"
                           sx={{
                              marginRight: "10px",
                              color: "#fff",
                           }}
                        />
                     )}
                     {row ? "Update Address" : "Add Address"}
                  </Button>{" "}
               </div>
            </div>
         </form>
      </div>
   );
};

// Add PropTypes
ShippingForm.propTypes = {
   handleClose: PropTypes.func.isRequired, // handleClose is required
   row: PropTypes.object, // row is optional
};

export default ShippingForm;
