import { Add, Delete, Edit } from "@mui/icons-material";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import { Box, Button } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// import { returnNepaliNumberWithCommas } from "../../../../../utils/helpers";
import {
   useDeleteProductsMutation,
   useGetMyProductsQuery,
} from "../../../../../api/productsApi";
import useModal from "../../../../../hooks/useModal";
import useTabs from "../../../../../hooks/useTabs";
import { returnNepaliNumberWithCommas } from "../../../../../utils/helpers";
import AllModals from "../../../../common/AllModals/AllModals";
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
      label: "Products",
      value: "products",
      icon: <WidgetsOutlinedIcon />,
   },
];

const Products = () => {
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
      button: (
         <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpen("add_products")}
            sx={{
               fontSize: "12px",
               textTransform: "capitalize",
               backgroundColor: "#746be3",
               borderRadius: "8px",
               "&:hover": {
                  backgroundColor: "#6259CA",
               },
            }}
         >
            Add New
         </Button>
      ),
      hideSearch: true,
   });

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
         {Tabs}

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

         <AllModals
            modalType={"add_products"}
            open={modals?.add_products}
            handleClose={() => handleClose("add_products")}
            value={value}
         />
         <AllModals
            modalType={"edit_products"}
            open={modals?.edit_products}
            handleClose={() => handleClose("edit_products")}
            value={value}
            modalTitle={"Edit Products"}
            row={row}
         />

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

export default Products;
