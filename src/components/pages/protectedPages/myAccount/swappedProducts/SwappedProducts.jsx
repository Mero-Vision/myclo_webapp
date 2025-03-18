import { Delete, Edit } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// import { returnNepaliNumberWithCommas } from "../../../../../utils/helpers";
import {
   useDeleteProductsMutation,
   useGetMyProductsQuery,
} from "../../../../../api/productsApi";
import { useGetOwnerSwapsQuery } from "../../../../../api/siteSlice";
import useModal from "../../../../../hooks/useModal";
import useTabs from "../../../../../hooks/useTabs";
import { returnNepaliNumberWithCommas } from "../../../../../utils/helpers";
import CustomDataGrid from "../../../../common/CustomDataGrid/CustomDataGrid";
import CustomDeleteModal from "../../../../common/CustomModal/CustomDeleteModal";
import CustomMoreOptionButton from "../../../../common/CustomMoreOptionButton/CustomMoreOptionButton";
import CustomLoaderLin from "../../../../common/CustomSpinLoader/CustomLoaderLin";

const items = [
   {
      icon: <Edit fontSize="small" />,
      text: "Edit",
      modalType: "edit_products",
      permission: "department-edit",
   },
   {
      icon: <Delete fontSize="small" />,
      text: "Delete",
      modalType: "delete_products",
      permission: "department-delete",
   },
];

const data = [
   {
      label: "My Products",
      value: "my_products",
   },
   {
      label: "Swap Product Request",
      value: "owner_products",
   },
];

const SwappedProducts = () => {
   const { modals, handleOpen, handleClose, row } = useModal();
   const [rowId, setRowId] = useState();
   const [tableStatus, setTableStatus] = useState();
   console.log({ row, rowId });
   const { search_keyword = "" } = useSelector(
      (state) => state?.utils
   );

   const [page, setPage] = useState(1);
   const [paginationModel, setPaginationModel] = useState({
      page: 0,
      pageSize: 10,
   });

   const params = {
      page: paginationModel?.page + 1,
      pagination_limit: paginationModel?.pageSize,
      search_keyword,
   };
   const {
      data: productsData,
      isFetching,
      isSuccess,
   } = useGetMyProductsQuery(params);

   const [
      deleteProducts,
      {
         isSuccess: isDeleteSuccess,
         isLoading,
         error,
         data: successData,
      },
   ] = useDeleteProductsMutation();

   const handleDelete = () => {
      console.log({ row });

      deleteProducts(row?.id);
   };

   useEffect(() => {
      if (isDeleteSuccess) {
         handleClose("delete_products");
      }
   }, [isDeleteSuccess]);
   const { value, Tabs } = useTabs({
      data,
      hideSearch: true,
   });

   const switchTabs = () => {
      switch (value) {
         case "my_products":
            return <OwnerSwapProducts />;
         case "owner_products":
            return <OwnerSwapProducts />;
      }
   };

   const columns = [
      {
         flex: 0.6,
         field: "product_images",
         headerName: "Image",
         renderCell: (params) => {
            console.log({ params });
            return (
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center ",
                     height: "100%",
                  }}
               >
                  <Box sx={{ width: "40px", height: "80%" }}>
                     <img
                        style={{
                           width: "100%",
                           height: "100%",
                           objectFit: "cover",
                        }}
                        src={
                           params?.row?.product_images?.[0]
                              ?.product_image &&
                           params?.row?.product_images?.[0]
                              ?.product_image
                        }
                        alt={"blog image"}
                     />
                  </Box>
               </Box>
            );
         },
      },
      {
         flex: 1,
         field: "name",
         headerName: "Name",
      },
      {
         flex: 1,
         field: "selling_price",
         headerName: "Price",
         renderCell: (params) => {
            return (
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     height: "100%",
                  }}
               >
                  {params?.row?.selling_price &&
                     returnNepaliNumberWithCommas(
                        params?.row?.selling_price
                     )}
               </Box>
            );
         },
      },
      {
         flex: 1,
         field: "status",
         headerName: "Status",
      },
      {
         flex: 0.6,
         field: "created_at",
         headerName: "Created At",
         renderCell: (params) => {
            return (
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     height: "100%",
                  }}
               >
                  {params?.row?.created_at
                     ? moment(params.row.created_at).format(
                          "MMM D, YYYY h:mm A"
                       )
                     : "N/A"}
               </Box>
            );
         },
      },

      {
         flex: 0.4,
         field: "action",
         headerName: "Actions",
         //  renderCell: ActionComponent,
         renderCell: (params) => (
            <>
               {console.log({ params })}
               <CustomMoreOptionButton
                  items={items}
                  handleOpenModal={handleOpen}
                  row={params?.row}
               />
            </>
         ),
      },
   ];

   return (
      <div>
         <Grid container spacing={0} sx={{ paddingBottom: " 20px" }}>
            {Tabs}
         </Grid>
         <Grid container spacing={0}>
            {value && switchTabs()}
         </Grid>

         <CustomDeleteModal
            handleClose={() => handleClose("delete_products")}
            open={modals?.delete_products}
            isLoading={isLoading}
            handleConfirm={handleDelete}
            success={isDeleteSuccess}
            error={error}
            successData={successData}
         />
      </div>
   );
};

const OwnerSwapProducts = () => {
   const [page, setPage] = useState(1);
   const [paginationModel, setPaginationModel] = useState({
      page: 0,
      pageSize: 10,
   });

   const params = {
      page: paginationModel?.page + 1,
      pagination_limit: paginationModel?.pageSize,
   };
   const {
      data: productsData,
      isFetching,
      isSuccess,
   } = useGetOwnerSwapsQuery(params);

   const columns = [
      {
         flex: 0.6,
         field: "product_images",
         headerName: "Image",
         renderCell: (params) => {
            console.log({ params });
            return (
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center ",
                     height: "100%",
                  }}
               >
                  <Box sx={{ width: "40px", height: "80%" }}>
                     <img
                        style={{
                           width: "100%",
                           height: "100%",
                           objectFit: "cover",
                        }}
                        src={
                           params?.row?.product_images?.[0]
                              ?.product_image &&
                           params?.row?.product_images?.[0]
                              ?.product_image
                        }
                        alt={"blog image"}
                     />
                  </Box>
               </Box>
            );
         },
      },
      {
         flex: 1,
         field: "name",
         headerName: "Name",
      },
      {
         flex: 1,
         field: "selling_price",
         headerName: "Price",
         renderCell: (params) => {
            return (
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     height: "100%",
                  }}
               >
                  {params?.row?.selling_price &&
                     returnNepaliNumberWithCommas(
                        params?.row?.selling_price
                     )}
               </Box>
            );
         },
      },
      {
         flex: 1,
         field: "status",
         headerName: "Status",
      },
      {
         flex: 0.6,
         field: "created_at",
         headerName: "Created At",
         renderCell: (params) => {
            return (
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     height: "100%",
                  }}
               >
                  {params?.row?.created_at
                     ? moment(params.row.created_at).format(
                          "MMM D, YYYY h:mm A"
                       )
                     : "N/A"}
               </Box>
            );
         },
      },
   ];

   return (
      <>
         {isFetching && <CustomLoaderLin />}

         {!isFetching && isSuccess && (
            <CustomDataGrid
               rows={productsData?.data}
               columns={columns}
               rowCount={10}
               setPage={setPage}
               paginationModel={paginationModel}
               setPaginationModel={setPaginationModel}
               pageInfo={productsData?.meta}
               settings
            />
         )}
      </>
   );
};

export default SwappedProducts;
