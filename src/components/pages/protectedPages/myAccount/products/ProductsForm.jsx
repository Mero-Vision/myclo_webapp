import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import {
   usePostProductsMutation,
   usePostProductsUpdateMutation,
} from "../../../../../api/productsApi";
import {
   useGetBrandQuery,
   useGetCategoryQuery,
} from "../../../../../api/siteSlice";
import CustomButton from "../../../../common/customButton/CustomButton";
import MultiImageUpload from "../../../../common/CustomFileUpload/MultiImageUpload";
import { CustomInputDefault } from "../../../../common/CustomInputs/CustomInputDefault";
import { CustomSearchSelectMain } from "../../../../common/CustomSelects/CustomSearchSelectMain";
import { CustomSwitch } from "../../../../common/CustomSwitch/CustomSwitch";
import TextEditor from "../../../../common/TextEditor/TextEditor";

const schema = Yup.object().shape({
   // name: Yup.string().required("Name is required"),
   // description: Yup.string().required("Description is required"),
   // our_team_image: Yup.string().required("Image is required"),
});

const ProductsForm = ({ row, handleClose, uuid, inputValue }) => {
   const userData = JSON.parse(localStorage?.getItem("user"));

   console.log({ userData, row });

   const [
      postProducts,
      {
         error,
         isLoading: isPostLoading,
         isSuccess: isPostSuccess,
         data: successData,
      },
   ] = usePostProductsMutation();
   const [
      postProductsUpdate,
      {
         error: editError,
         isLoading: isEditLoading,
         isSuccess: isEditSuccess,
         data: editSuccessData,
      },
   ] = usePostProductsUpdateMutation();
   console.log({ successData, editSuccessData });

   const defaultValues = {
      has_varient: false, // Ensure it's explicitly set
   };

   const {
      control,
      formState: { errors },
      watch,
      setValue,
      register,
      handleSubmit,
      reset,
      clearErrors,
   } = useForm({ resolver: yupResolver(schema), defaultValues });

   console.log("watch", watch());
   const onSubmit = (data) => {
      console.log("Form Data:", data);

      const formData = new FormData();

      // Remove rental-related fields if allowRental is false
      if (data?.allow_rental === false) {
         delete data.rental_price;
         delete data.rental_duration;
         delete data.rental_type;
      } else {
         // Set default values if allowRental is true or undefined
         data.rental_price = data.rental_price || "";
         data.rental_duration = data.rental_duration || "";
         data.rental_type = data.rental_type || "";
      }

      // Append non-file fields to FormData
      Object.keys(data).forEach((key) => {
         if (key !== "product_image" && key !== "varients") {
            formData.append(key, data[key]);
         }
      });

      // Append each file in the main product_image array
      if (data.product_image && Array.isArray(data.product_image)) {
         data.product_image.forEach((imageObj, index) => {
            if (imageObj.file) {
               formData.append(
                  `product_image[${index}]`,
                  imageObj.file
               );
            }
         });
      }

      // Add _method for updates if updating an existing row
      if (row) {
         formData.append("_method", "PATCH");
      }

      // Log FormData for debugging
      for (let [key, value] of formData.entries()) {
         console.log(key, value);
      }

      // Submit the form data
      if (row) {
         postProductsUpdate({ slug: row?.id, data: formData });
      } else {
         postProducts(formData);
      }
   };

   useEffect(() => {
      if (isPostSuccess || isEditSuccess) {
         handleClose();
      }
   }, [isPostSuccess, isEditSuccess, handleClose]);

   useEffect(() => {
      if (row) {
         reset({
            name: row?.name || "",
            description: row?.description || "",
            category_id: row?.category_id || "",
            brand_id: row?.brand_id || "",
            selling_price: row?.selling_price || "",
            cross_price: row?.cross_price || "",
            unit_price: row?.unit_price || "",
            stock_quantity: row?.stock_quantity || "",
            sku: row?.sku || "",

            product_image: row?.product_image || "",
            status: row?.status || "",
            rental_price: row?.rental_price,
            rental_duration: row?.rental_duration,
            rental_type: row?.rental_type,
            slug: row?.slug,
            id: row?.id,
         });
      }
   }, [reset, row]);

   const { data: categoryData, isFetching: categoryFetching } =
      useGetCategoryQuery();

   const CATEGORY_LIST = categoryData?.data?.map((item) => ({
      label: item?.name,
      value: item?.id,
   }));

   const { data: brandData, isFetching: brandFetching } =
      useGetBrandQuery();

   const BRAND_LIST = brandData?.data?.map((item) => ({
      label: item?.name,
      value: item?.id,
   }));

   const statusData = [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
   ];

   console.log("watchValues", watch());

   const allowRental = watch("allow_rental");

   console.log({ allowRental });

   const rentalType = [
      { label: "Hour", value: "hour" },
      { label: "Day", value: "day" },
      { label: "Week", value: "week" },
      { label: "Month", value: "month" },
   ];

   return (
      <Box>
         <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
               <Grid container spacing={2}>
                  <Grid item md={12} lg={12}>
                     <CustomInputDefault
                        control={control}
                        errors={errors}
                        name="name"
                        title={"Product Name"}
                        required
                     />
                  </Grid>
                  <Grid item md={12} lg={6}>
                     <CustomSearchSelectMain
                        control={control}
                        errors={errors}
                        title="Category"
                        name="category_id"
                        placeholder="Select Categroy"
                        data={CATEGORY_LIST || []}
                        key={CATEGORY_LIST || []}
                        required
                     />
                  </Grid>
                  <Grid item md={12} lg={6}>
                     <CustomSearchSelectMain
                        control={control}
                        errors={errors}
                        title="Brand"
                        name="brand_id"
                        placeholder="Select Brand"
                        data={BRAND_LIST || []}
                        key={BRAND_LIST || []}
                        required
                     />
                  </Grid>
                  <Grid
                     item
                     md={12}
                     lg={12}
                     sx={{ marginBottom: "16px" }}
                  >
                     <TextEditor
                        label="Description"
                        error={error}
                        control={control}
                        name={"description"}
                     />
                  </Grid>
                  <Grid item md={12} lg={6}>
                     <CustomInputDefault
                        control={control}
                        errors={errors}
                        name="selling_price"
                        title={"Selling Price"}
                        type="number"
                        required
                     />
                  </Grid>
                  <Grid item md={12} lg={6}>
                     <CustomInputDefault
                        control={control}
                        errors={errors}
                        name="cross_price"
                        title={"Cross Price"}
                        type="number"
                        required
                     />
                  </Grid>
                  <Grid item md={12} lg={6}>
                     <CustomInputDefault
                        control={control}
                        errors={errors}
                        name="unit_price"
                        title={"Unit Price"}
                        type="number"
                        required
                     />
                  </Grid>
                  <Grid item md={12} lg={6}>
                     <CustomInputDefault
                        control={control}
                        errors={errors}
                        name="stock_quantity"
                        title={"Stock Quantity"}
                        type="number"
                        required
                     />
                  </Grid>
                  <Grid item md={12} lg={6}>
                     <CustomInputDefault
                        control={control}
                        errors={errors}
                        name="sku"
                        title={"SKU"}
                        required
                     />
                  </Grid>
                  <Grid item md={12} lg={6}>
                     <CustomSearchSelectMain
                        control={control}
                        errors={errors}
                        title="Status"
                        name="status"
                        placeholder="Status"
                        data={statusData || []}
                        key={statusData || []}
                        required
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <Box
                        className="form-container"
                        sx={{
                           flexGrow: 1,
                           marginBottom: "10px",
                           "& .file-input": {
                              width: "100%",
                           },
                        }}
                     >
                        <MultiImageUpload
                           control={control}
                           name="product_image"
                           title="Product Image"
                           setValue={setValue}
                           errors={errors}
                           clearErrors={clearErrors}
                           imageLink={watch("product_image") || ""}
                           required
                        />
                        <Grid container spacing={0}>
                           {row?.product_images?.length &&
                              row?.product_images?.map(
                                 (image, index) => (
                                    <Grid
                                       key={index}
                                       item
                                       xs={2}
                                       sx={{
                                          width: "100%",
                                          marginBottom: "20px",
                                       }}
                                    >
                                       <div
                                          className="image-item"
                                          style={{
                                             width: "100%",
                                             height: "100%",
                                             padding: "0px 6px",
                                             position: "relative",
                                          }}
                                       >
                                          <img
                                             src={image.product_image}
                                             alt=""
                                             style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                             }}
                                          />
                                       </div>
                                    </Grid>
                                 )
                              )}
                        </Grid>
                     </Box>
                  </Grid>
                  <Grid item xs={12}>
                     <CustomSwitch
                        control={control}
                        errors={errors}
                        name={"allow_rental"}
                        label={"Allow Rental"}
                     />
                  </Grid>
                  {allowRental && (
                     <>
                        <Grid item md={12} lg={4}>
                           <CustomInputDefault
                              control={control}
                              errors={errors}
                              name="rental_price"
                              title={"Rental Price"}
                              required
                           />
                        </Grid>
                        <Grid item md={12} lg={4}>
                           <CustomInputDefault
                              control={control}
                              errors={errors}
                              name="rental_duration"
                              title={"Rental Duration(Hours)"}
                              required
                              helperText="Input value in numebr(Eg: 4)"
                           />
                        </Grid>
                        <Grid item md={12} lg={4}>
                           <CustomSearchSelectMain
                              control={control}
                              errors={errors}
                              title="Rental Type"
                              name="rental_type"
                              placeholder="Select Rental Type"
                              data={rentalType || []}
                              key={rentalType || []}
                              required
                           />
                        </Grid>
                     </>
                  )}
               </Grid>
               <CustomButton
                  loading={isPostLoading || isEditLoading}
                  error={error || editError}
                  success={isPostSuccess || isEditSuccess}
                  successData={successData || editSuccessData}
                  buttonName={row?.id && "Edit"}
               />
            </form>
         </Box>
      </Box>
   );
};

export default ProductsForm;
