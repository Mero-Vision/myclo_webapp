import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, Grid, Modal } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";

// import { returnNepaliNumberWithCommas } from "../../../../../utils/helpers";
import {
   useGetOwnerSwapsQuery,
   useGetRequesterSwapsQuery,
   usePostAcceptSwapMutation,
   usePostRejectSwapMutation,
} from "../../../../../api/siteSlice";
import useTabs from "../../../../../hooks/useTabs";
import { returnNepaliNumberWithCommas } from "../../../../../utils/helpers";
import CustomDataGrid from "../../../../common/CustomDataGrid/CustomDataGrid";
import CustomLoaderLin from "../../../../common/CustomSpinLoader/CustomLoaderLin";
import customToaster from "../../../../common/CustomToasters/CustomToaster";

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
   const { value, Tabs } = useTabs({
      data,
      hideSearch: true,
   });

   const switchTabs = () => {
      switch (value) {
         case "my_products":
            return <MySwapProducts />;
         case "owner_products":
            return <OwnerSwapProducts />;
      }
   };

   return (
      <div>
         <Grid container spacing={0} sx={{ paddingBottom: " 20px" }}>
            {Tabs}
         </Grid>
         <Grid container spacing={0}>
            {value && switchTabs()}
         </Grid>
      </div>
   );
};

const MySwapProducts = () => {
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
      isFetching: mySwapFetching,
      isSuccess,
   } = useGetRequesterSwapsQuery(params);

   const columns = [
      {
         flex: 1,
         field: "requesters_product",
         headerName: "Requesters Product",
         renderCell: (params) => {
            return (
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     height: "100%",
                  }}
               >
                  {params?.row?.requester_product &&
                     params?.row?.requester_product?.name}
               </Box>
            );
         },
      },
      {
         flex: 1,
         field: "ownwer_product",
         headerName: "Owners Product",
         renderCell: (params) => {
            return (
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     height: "100%",
                  }}
               >
                  {params?.row?.owner_product &&
                     params?.row?.owner_product?.name}
               </Box>
            );
         },
      },
      {
         flex: 1,
         field: "ownwer_product_price",
         headerName: "Owners Product Price",
         renderCell: (params) => {
            return (
               <Box
                  sx={{
                     display: "flex",
                     justifyContent: "end",
                     height: "100%",
                  }}
               >
                  Rs.{" "}
                  {params?.row?.owner_product &&
                     returnNepaliNumberWithCommas(
                        params?.row?.owner_product?.selling_price
                     )}
               </Box>
            );
         },
      },

      {
         flex: 1,
         field: "swap_status",
         headerName: "Swap Status",
         renderCell: (params) => {
            return (
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     height: "100%",
                     textTransform: "capitalize",
                     fontWeight: "500",
                     color: "#3185D4",
                  }}
               >
                  {params?.row?.swap_status &&
                     params?.row?.swap_status}
               </Box>
            );
         },
      },
      {
         flex: 0.8,
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
         {mySwapFetching && <CustomLoaderLin />}

         {!mySwapFetching && (
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

// Separate component for Swap Status Cell
const SwapStatusCell = ({ row }) => {
   const [openAcceptModal, setOpenAcceptModal] = useState(false);
   const [openRejectModal, setOpenRejectModal] = useState(false);

   // API hooks
   const [postAcceptSwap, { isLoading: isAcceptLoading }] =
      usePostAcceptSwapMutation();
   const [postRejectSwap, { isLoading: isRejectLoading }] =
      usePostRejectSwapMutation();

   const handleOpenAcceptModal = () => setOpenAcceptModal(true);
   const handleCloseAcceptModal = () => setOpenAcceptModal(false);

   const handleOpenRejectModal = () => setOpenRejectModal(true);
   const handleCloseRejectModal = () => setOpenRejectModal(false);

   const handleAccept = async () => {
      try {
         // Call the accept API with the row ID
         await postAcceptSwap(row.id)
            .unwrap()
            .then(() => {
               customToaster({
                  message: "Accepted Swap",
                  type: "success",
               });
            });
         console.log("Swap accepted successfully!");
         handleCloseAcceptModal();
      } catch (error) {
         console.error("Failed to accept swap:", error);
      }
   };

   const handleReject = async () => {
      try {
         // Call the reject API with the row ID
         await postRejectSwap(row.id)
            .unwrap()
            .then(() => {
               customToaster({
                  message: "Rejected Swap",
                  type: "success",
               });
            });
         console.log("Swap rejected successfully!");
         handleCloseRejectModal();
      } catch (error) {
         console.error("Failed to reject swap:", error);
      }
   };

   // Helper function to get status color
   const getStatusColor = (status) => {
      switch (status?.toLowerCase()) {
         case "accepted":
            return "#24a328";
         case "rejected":
            return "#d9626e";
         case "pending":
            return "#3185D4";
         default:
            return "black"; // Default color for unknown status
      }
   };

   return (
      <Box
         sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            textTransform: "capitalize",
            gap: 1,
         }}
      >
         {row?.swap_status !== "pending" && (
            <Box
               sx={{
                  color: getStatusColor(row.swap_status),
                  fontWeight: "bold",
               }}
            >
               {row.swap_status}
            </Box>
         )}
         {row?.swap_status === "pending" && (
            <>
               <Button
                  variant="contained"
                  color="success"
                  onClick={handleOpenAcceptModal}
                  disabled={isAcceptLoading || isRejectLoading}
               >
                  Accept
               </Button>
               <Button
                  variant="contained"
                  color="error"
                  onClick={handleOpenRejectModal}
                  disabled={isAcceptLoading || isRejectLoading}
               >
                  Reject
               </Button>
            </>
         )}

         {/* Accept Modal */}
         <Modal
            sx={{ borderRadius: "16px !important" }}
            open={openAcceptModal}
            onClose={handleCloseAcceptModal}
            aria-labelledby="accept-modal-title"
            aria-describedby="accept-modal-description"
         >
            <Box
               sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 450,
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  borderRadius: "16px",
               }}
            >
               <div className=" font-[500] text-[20px] mb-[8px]">
                  Accept Swap?
               </div>
               <div className=" font-[400] text-[16px] mb-[40px]">
                  Are you sure you want to accept this swap?
               </div>
               <Button
                  variant="contained"
                  color="success"
                  onClick={handleAccept}
                  disabled={isAcceptLoading}
               >
                  {isAcceptLoading ? "Accepting..." : "Accept"}
               </Button>
               <Button
                  variant="outlined"
                  color="error"
                  onClick={handleCloseAcceptModal}
                  sx={{ ml: 2 }}
                  disabled={isAcceptLoading}
               >
                  Cancel
               </Button>
            </Box>
         </Modal>

         {/* Reject Modal */}
         <Modal
            open={openRejectModal}
            onClose={handleCloseRejectModal}
            aria-labelledby="reject-modal-title"
            aria-describedby="reject-modal-description"
         >
            <Box
               sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 450,
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  borderRadius: "16px",
               }}
            >
               <div className=" font-[500] text-[20px] mb-[8px]">
                  Reject Swap?
               </div>
               <div className=" font-[400] text-[16px] mb-[40px]">
                  Are you sure you want to reject this swap?
               </div>

               <Button
                  variant="contained"
                  color="error"
                  onClick={handleReject}
                  disabled={isRejectLoading}
               >
                  {isRejectLoading ? "Rejecting..." : "Reject"}
               </Button>
               <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleCloseRejectModal}
                  sx={{ ml: 2 }}
                  disabled={isRejectLoading}
               >
                  Cancel
               </Button>
            </Box>
         </Modal>
      </Box>
   );
};

const OwnerSwapProducts = () => {
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
      isFetching: ownerFetching,
      isSuccess,
   } = useGetOwnerSwapsQuery(params);

   const columns = [
      {
         flex: 1,
         field: "requesters_product",
         headerName: "Requesters Product",
         renderCell: (params) => {
            return (
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     height: "100%",
                  }}
               >
                  {params?.row?.requester_product &&
                     params?.row?.requester_product?.name}
               </Box>
            );
         },
      },
      {
         flex: 1,
         field: "ownwer_product",
         headerName: "Owners Product",
         renderCell: (params) => {
            return (
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     height: "100%",
                  }}
               >
                  {params?.row?.owner_product &&
                     params?.row?.owner_product?.name}
               </Box>
            );
         },
      },
      {
         flex: 1,
         field: "ownwer_product_price",
         headerName: "Owners Product Price",
         type: "number",
         renderCell: (params) => {
            return (
               <Box
                  sx={{
                     display: "flex",
                     justifyContent: "end",

                     height: "100%",
                  }}
               >
                  Rs.{" "}
                  {params?.row?.owner_product &&
                     returnNepaliNumberWithCommas(
                        params?.row?.owner_product?.selling_price
                     )}
               </Box>
            );
         },
      },
      {
         flex: 1.4,
         field: "swap_status",
         headerName: "Swap Status",
         renderCell: (params) => <SwapStatusCell row={params.row} />,
      },
      {
         flex: 0.8,
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
         {ownerFetching && <CustomLoaderLin />}

         {!ownerFetching && isSuccess && (
            <CustomDataGrid
               rows={productsData?.data}
               columns={columns}
               rowCount={10}
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
