import { yupResolver } from "@hookform/resolvers/yup";
import { Add, Delete } from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as Yup from "yup";
import { useGetBrandQuery } from "../../../../../api/brandApi";
import { useGetMenuCategoryQuery } from "../../../../../api/categoryApi";
import {
   usePostProductsMutation,
   usePostProductsUpdateMutation,
} from "../../../../../api/productsApi";
import CustomButton from "../../../../common/CustomButton/CustomButton";
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

      // Ensure boolean fields are properly formatted as 1 or 0
      data.allow_negative_stock =
         data.allow_negative_stock === true ? 1 : 0;
      data.has_varient = Boolean(data.has_varient) ? 1 : 0;

      // Append non-file fields to FormData
      Object.keys(data).forEach((key) => {
         if (key !== "product_image" && key !== "varients") {
            formData.append(key, data[key]);
         }
      });

      // Ensure varients is an array before processing
      if (Array.isArray(data.varients)) {
         data.varients.forEach((item, index) => {
            formData.append(
               `varients[${index}][size]`,
               item?.size ?? ""
            );
            formData.append(
               `varients[${index}][color]`,
               item?.color ?? ""
            );
            formData.append(
               `varients[${index}][varient_selling_price]`,
               item?.varient_selling_price ?? ""
            );
            formData.append(
               `varients[${index}][varient_cross_price]`,
               item?.varient_cross_price ?? ""
            );
            formData.append(
               `varients[${index}][varient_unit_price]`,
               item?.varient_unit_price ?? ""
            );
            formData.append(
               `varients[${index}][varient_stock_quantity]`,
               item?.varient_stock_quantity ?? ""
            );
            formData.append(
               `varients[${index}][varient_sku]`,
               item?.varient_sku ?? ""
            );

            // Handle multiple product images inside varients
            // if (Array.isArray(item.images)) {
            //    item.images.forEach((imageObj, imgIndex) => {
            //       if (imageObj.file) {
            //          formData.append(
            //             `varients[${index}][images][${imgIndex}]`,
            //             imageObj.file
            //          );
            //       }
            //    });
            // }
            if (Array.isArray(item.images)) {
               item.images.forEach((imageObj, imgIndex) => {
                  if (imageObj?.file) {
                     formData.append(
                        `varients[${index}][images][${imgIndex}][url]`,
                        imageObj.file
                     );
                  }
               });
            }
         });
      }

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

   // const onSubmit = (data) => {
   //    console.log("Form Data:", data);

   //    const formData = new FormData();

   //    // Ensure boolean fields are properly formatted as 1 or 0
   //    data.allow_negative_stock =
   //       data.allow_negative_stock === true ? 1 : 0;
   //    data.has_varient = Boolean(data.has_varient) ? 1 : 0;

   //    // Append non-file fields to FormData
   //    Object.keys(data).forEach((key) => {
   //       if (key !== "product_image" && key !== "varients") {
   //          formData.append(key, data[key]);
   //       }
   //    });

   //    // Ensure varients is an array before processing
   //    if (Array.isArray(data.varients)) {
   //       data.varients.forEach((item, index) => {
   //          formData.append(
   //             `varients[${index}][size]`,
   //             item?.size ?? ""
   //          );
   //          formData.append(
   //             `varients[${index}][color]`,
   //             item?.color ?? ""
   //          );
   //          formData.append(
   //             `varients[${index}][varient_selling_price]`,
   //             item?.varient_selling_price ?? ""
   //          );
   //          formData.append(
   //             `varients[${index}][varient_cross_price]`,
   //             item?.varient_cross_price ?? ""
   //          );
   //          formData.append(
   //             `varients[${index}][varient_unit_price]`,
   //             item?.varient_unit_price ?? ""
   //          );
   //          formData.append(
   //             `varients[${index}][varient_stock_quantity]`,
   //             item?.varient_stock_quantity ?? ""
   //          );
   //          formData.append(
   //             `varients[${index}][varient_sku]`,
   //             item?.varient_sku ?? ""
   //          );
   //       });
   //    }

   //    // Append each file in the product_image array
   //    if (data.product_image && Array.isArray(data.product_image)) {
   //       data.product_image.forEach((imageObj, index) => {
   //          if (imageObj.file) {
   //             formData.append(
   //                `product_image[${index}]`,
   //                imageObj.file
   //             );
   //          }
   //       });
   //    }

   //    // Add _method for updates if updating an existing row
   //    if (row) {
   //       formData.append("_method", "PATCH");
   //    }

   //    // Log FormData for debugging
   //    for (let [key, value] of formData.entries()) {
   //       console.log(key, value);
   //    }

   //    // Submit the form data
   //    if (row) {
   //       postProductsUpdate({ slug: row?.id, data: formData });
   //    } else {
   //       postProducts(formData);
   //    }
   // };

   const { fields, append, remove } = useFieldArray({
      control,
      name: "varients",
   });

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
            allow_negative_stock:
               row?.allow_negative_stock === 1 ? true : false || "",
            has_varient: row?.has_varient === 1 ? true : false || "",
            product_image: row?.product_image || "",
            status: row?.status || "",
            slug: row?.slug,
            id: row?.id,
         });
      }
   }, [reset, row]);

   const { data: categoryData, isFetching: categoryFetching } =
      useGetMenuCategoryQuery();

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

   const hasVarient = watch("has_varient");

   console.log({ hasVarient });

   return (
      <Box>
         <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <CustomInputDefault
                        control={control}
                        errors={errors}
                        name="name"
                        title={"Categrory Name"}
                        required
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <CustomSearchSelectMain
                        control={control}
                        errors={errors}
                        title="Category"
                        name="category_id"
                        placeholder="Selec Categroy"
                        data={CATEGORY_LIST || []}
                        key={CATEGORY_LIST || []}
                        required
                     />
                  </Grid>
                  <Grid item xs={6}>
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
                  <Grid item xs={12} sx={{ marginBottom: "16px" }}>
                     <TextEditor
                        label="Description"
                        error={error}
                        control={control}
                        name={"description"}
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <CustomInputDefault
                        control={control}
                        errors={errors}
                        name="selling_price"
                        title={"Selling Price"}
                        type="number"
                        required
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <CustomInputDefault
                        control={control}
                        errors={errors}
                        name="cross_price"
                        title={"Cross Price"}
                        type="number"
                        required
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <CustomInputDefault
                        control={control}
                        errors={errors}
                        name="unit_price"
                        title={"Unit Price"}
                        type="number"
                        required
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <CustomInputDefault
                        control={control}
                        errors={errors}
                        name="stock_quantity"
                        title={"Stock Quantity"}
                        type="number"
                        required
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <CustomInputDefault
                        control={control}
                        errors={errors}
                        name="sku"
                        title={"SKU"}
                        required
                     />
                  </Grid>
                  <Grid item xs={6}>
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
                        name={"allow_negative_stock"}
                        label={"Allow Negative Stock"}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <CustomSwitch
                        control={control}
                        errors={errors}
                        name={"has_varient"}
                        label={"Has Varient"}
                     />
                  </Grid>
                  {(hasVarient === true || hasVarient === 1) && (
                     <>
                        <Grid
                           item
                           xs={10}
                           sx={{
                              fontSize: "14px",
                              display: "flex",
                              alignItems: "center",
                              fontWeight: "600",
                           }}
                        >
                           Add Varients
                        </Grid>

                        <Grid item xs={2} sx={{ textAlign: "end" }}>
                           <Button
                              sx={{
                                 backgroundColor: "#fff",
                                 border: "1px solid #6158CA",
                                 fontSize: "12px",
                                 padding: "2px",

                                 color: "#6158CA",
                                 "&:hover": {
                                    backgroundColor: "#fff",
                                    border: "1px solid #6158CA",
                                 },
                              }}
                              disableRipple={false}
                              startIcon={
                                 <Add sx={{ fontSize: "10px" }} />
                              }
                              onClick={() =>
                                 append({
                                    size: "",
                                 })
                              }
                           >
                              Add
                           </Button>
                        </Grid>
                        <Grid item xs={12}>
                           {fields.map((item, index) => {
                              return (
                                 <React.Fragment key={item?.id}>
                                    <SingleRow
                                       item={item}
                                       index={index}
                                       control={control}
                                       errors={errors}
                                       watch={watch}
                                       remove={remove}
                                       setValue={setValue}
                                       reset={reset}
                                       row={row}
                                       clearErrors={clearErrors}
                                    />
                                 </React.Fragment>
                              );
                           })}
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

const SingleRow = ({
   item,
   index,
   remove,
   control,
   errors,
   watch,
   setValue,
   clearErrors,
}) => {
   return (
      <Box
         className="form-container"
         sx={{
            // // flexWrap: "wrap",
            // alignItems: "center !important",
            // ml: "18px",
            // "& .custom-input, & .custom-select": {
            //    flexBasis: "40%",
            //    flexGrow: "initial !important",
            // },
            width: "100%",
            // backgroundColor: "#f1f0ff",
            marginBottom: "20px",
            padding: "10px",
            borderBottom: "1px solid #999",
         }}
      >
         {/* <Box sx={{ width: "100% !important", display: "flex" }}> */}
         <Grid
            container
            spacing={2}
            sx={{ display: "flex", alignItems: "center" }}
         >
            <Grid item sm={11}>
               <Grid container spacing={2}>
                  <Grid item sm={6}>
                     <CustomInputDefault
                        name={`varients.${index}.size`}
                        title={"Size"}
                        control={control}
                        errors={errors}
                        required
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <CustomInputDefault
                        control={control}
                        errors={errors}
                        name={`varients.${index}.color`}
                        title={"Color"}
                        required
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <CustomInputDefault
                        control={control}
                        errors={errors}
                        name={`varients.${index}.varient_selling_price`}
                        title={"Varient Selling Price"}
                        required
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <CustomInputDefault
                        control={control}
                        errors={errors}
                        name={`varients.${index}.varient_cross_price`}
                        title={"Varient Cross Price"}
                        required
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <CustomInputDefault
                        control={control}
                        errors={errors}
                        name={`varients.${index}.varient_unit_price`}
                        title={"Varient Unit Price"}
                        required
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <CustomInputDefault
                        control={control}
                        errors={errors}
                        name={`varients.${index}.varient_stock_quantity`}
                        title={"Varient Stock Quantity"}
                        required
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <CustomInputDefault
                        control={control}
                        errors={errors}
                        name={`varients.${index}.varient_sku`}
                        title={"Varient SKU"}
                        required
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <MultiImageUpload
                        control={control}
                        name={`varients.${index}.images`}
                        title="Product Image"
                        setValue={setValue}
                        errors={errors}
                        clearErrors={clearErrors}
                        imageLink={
                           watch(`varients.${index}.images`) || ""
                        }
                        required
                     />
                  </Grid>
               </Grid>
            </Grid>

            <Grid item sm={1}>
               <Box
                  // startIcon={<RemoveIcon />}
                  sx={{
                     backgroundColor: "#EF4444 !important",
                     padding: "12x",
                     width: "25px",
                     height: "25px",
                     borderRadius: "50%",
                     cursor: "pointer",
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     marginTop: "17px",
                  }}
                  onClick={() => remove(index)}
                  // disableRipple={false}
               >
                  <Delete
                     sx={{
                        fontSize: "18px",
                        color: "#fff",
                     }}
                  />
               </Box>
            </Grid>
         </Grid>
         {/* </Box> */}
      </Box>
   );
};

export default ProductsForm;
