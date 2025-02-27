import {
   Add,
   DeleteOutline,
   EditOutlined,
} from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Grid, Radio, useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import {
   useGetShippingDetailsQuery,
   usePostShippingDetailsStatusUpdateMutation,
} from "../../../../../api/siteSlice";
import noWishlistImg from "../../../../../assets/wishlist/noWishlist.webp";
import useModal from "../../../../../hooks/useModal";
import CustomModal from "../../../../common/CustomModal/CustomModal";
import LazyLoadPage from "../../../../common/lazyLoadPage/LazyLoadPage";
import ShippingDeleteModal from "./ShippingDeleteModal";
import ShippingForm from "./ShippingForm";

const ShippingDetail = () => {
   const isMobile = useMediaQuery("(max-width: 1048px)");
   const { modals, handleOpen, handleClose } = useModal();
   const [selectedEditAddress, setSelectedEditAddress] =
      useState(null);
   const [selectedAddressId, setSelectedAddressId] = useState(null);

   const {
      data: shippingDetailData,
      isLoading: isShippingDetailDataLoading,
      isFetching: isShippingDetailDataFetching,
   } = useGetShippingDetailsQuery();

   const [
      postShippingDetailsStatusUpdate,
      {
         // error: shipError,
         isLoading: isShipLoading,
         isSuccess: isShipSuccess,
      },
   ] = usePostShippingDetailsStatusUpdateMutation();

   const handleRadioButtonClick = (item) => {
      const payload = {
         status: item?.is_default === "true" ? "false" : "true",
         _method: "PUT",
      };

      postShippingDetailsStatusUpdate({
         data: payload,
         id: item?.id,
      });
   };

   return (
      <>
         {isShippingDetailDataFetching ? (
            <LazyLoadPage />
         ) : (
            <div className="flex flex-col">
               <div className="flex flex-row justify-between">
                  <div className="text-[24px] font-[600] border-b-[1px] pb-[14px] w-fit mb-[36px] border-[#0D74D6]">
                     Shipping Details
                  </div>
                  <button
                     onClick={() =>
                        handleOpen("shipping_address_add")
                     }
                     className="text-[12px] h-fit md:text-[15px] flex flex-row gap-[10px] text-[#0D74D6] items-center duration-200 hover:border-[#f0f8ff]  border-[#0D74D6] hover:bg-[#f0f8ff] border px-[10px] py-[5px] rounded-[5px]"
                  >
                     <Add
                        className="text-[#0D74D6]"
                        sx={{ fontSize: "18px" }}
                     />
                     Add Address
                  </button>
               </div>
               <Grid container spacing={3}>
                  {shippingDetailData?.data?.length !== 0 ? (
                     shippingDetailData?.data?.map((item, index) => (
                        <ShippingCard
                           key={index}
                           item={item}
                           handleOpen={handleOpen}
                           handleClose={handleClose}
                           modals={modals}
                           setSelectedAddressId={setSelectedAddressId}
                           selectedAddressId={selectedAddressId}
                           handleRadioButtonClick={
                              handleRadioButtonClick
                           }
                           setSelectedEditAddress={
                              setSelectedEditAddress
                           }
                        />
                     ))
                  ) : (
                     <div className="bg-[#fff] rounded-[8px] py-[40px] w-[100%] flex flex-col gap-[20px] items-center justify-center text-[#343434]">
                        <img
                           src={noWishlistImg}
                           alt="Empty cart"
                           className="w-[200px] h-auto"
                        />
                        <div className="text-[18px] font-[500] italic">
                           Oops! Looks like you don&apos;t have a
                           shipping address.
                        </div>
                     </div>
                  )}
               </Grid>
            </div>
         )}

         {/* Add Address Modal */}
         <CustomModal
            open={modals?.shipping_address_add}
            width={isMobile ? "90%" : "550px"}
            handleClose={() => handleClose("shipping_address_add")}
            modalTitle={"Add Shipping Address"}
         >
            <ShippingForm
               handleClose={() => handleClose("shipping_address_add")}
            />
         </CustomModal>

         {/* Edit Address Modal */}
         <CustomModal
            open={modals?.shipping_address_edit}
            width={isMobile ? "90%" : "550px"}
            handleClose={() => handleClose("shipping_address_edit")}
            modalTitle={"Edit Shipping Address"}
         >
            <ShippingForm
               handleClose={() =>
                  handleClose("shipping_address_edit")
               }
               row={selectedEditAddress}
            />
         </CustomModal>
      </>
   );
};

const ShippingCard = ({
   item,
   handleOpen,
   handleClose,
   modals,
   setSelectedAddressId,
   selectedAddressId,
   handleRadioButtonClick,
   setSelectedEditAddress,
}) => {
   const isMobile = useMediaQuery("(max-width: 1048px)");

   const handleDeleteClick = (id) => {
      setSelectedAddressId(id);
      handleOpen("shipping_address_delete");
   };

   const handleEditClick = () => {
      setSelectedEditAddress(item);
      handleOpen("shipping_address_edit");
   };

   return (
      <Grid item md={12} lg={6} sx={{ width: "100%" }}>
         <div className="flex flex-col gap-[5px] w-[100%] border-[#aaa] border-[1px] mb-[20px] py-[20px] px-[30px] rounded-[4px]">
            <div className="flex flex-col justify-between w-[100%] items-start">
               <div className="flex flex-row gap-[10px] w-[100%]">
                  <div className="flex flex-col w-[100%]">
                     <div className="flex flex-row justify-between items-start w-[100%]">
                        <div className="flex flex-col">
                           {item?.is_default === "true" && (
                              <div className="text-[13px] font-[500] text-[green] flex items-center">
                                 (Default Address)
                                 <CheckCircleIcon
                                    sx={{
                                       fontSize: "16px",
                                       marginLeft: "6px",
                                    }}
                                 />
                              </div>
                           )}
                           <div className="text-[20px] font-[500] mb-[6px]">
                              {item?.address}
                           </div>
                        </div>
                        <Radio
                           checked={item?.is_default === "true"}
                           onChange={() =>
                              handleRadioButtonClick(item)
                           }
                        />
                     </div>

                     <div className="text-[15px] font-[400] text-[]">
                        Landmark:{" "}
                        <span className="font-[500]">
                           {item?.landmark}{" "}
                        </span>
                     </div>
                     <div className="text-[15px] font-[400]">
                        Address: {item?.district_city}, {item?.region}
                     </div>
                     <div className="text-[15px] font-[400]">
                        Phone Number: {item?.contact_no}
                     </div>
                     <div className="text-[15px] font-[400]">
                        Recipient Name: {item?.recipient_name}
                     </div>
                     <div className="text-[15px] font-[400]">
                        Email: {item?.email}
                     </div>
                  </div>
               </div>
               <div className="flex mt-[20px] flex-row justify-between gap-2">
                  <button
                     onClick={handleEditClick}
                     className="text-[12px] w-[120px] md:text-[15px] flex justify-center flex-row gap-[10px] text-[#0964BF] items-center duration-200 border-[#f0f8ff] hover:border-[#0964BF] bg-[#f0f8ff] hover:bg-transparent border px-[10px] py-[5px] rounded-[5px]"
                  >
                     <EditOutlined
                        className="text-[#0964BF]"
                        sx={{ fontSize: "18px" }}
                     />
                     Edit
                  </button>
                  <button
                     onClick={() => handleDeleteClick(item.id)}
                     className="text-[12px] w-[120px] md:text-[15px] flex justify-center flex-row gap-[10px] text-[#eb4034] items-center duration-200 border-[#fff8f7] hover:border-[#eb4034] bg-[#fff8f7] hover:bg-transparent border px-[10px] py-[5px] rounded-[5px]"
                  >
                     <DeleteOutline
                        className="text-[#eb4034]"
                        sx={{ fontSize: "18px" }}
                     />
                     Delete
                  </button>
               </div>
            </div>
         </div>
         <CustomModal
            noPadding
            open={
               modals?.shipping_address_delete &&
               selectedAddressId === item.id
            }
            width={isMobile ? "90%" : "500px"}
            handleClose={() => handleClose("shipping_address_delete")}
         >
            <ShippingDeleteModal
               id={selectedAddressId}
               handleClose={() =>
                  handleClose("shipping_address_delete")
               }
            />
         </CustomModal>
      </Grid>
   );
};

ShippingCard.propTypes = {
   item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired,
      landmark: PropTypes.string,
      district_city: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired,
      contact_no: PropTypes.string.isRequired,
      recipient_name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      is_default: PropTypes.string.isRequired,
   }).isRequired,
   handleOpen: PropTypes.func.isRequired,
   handleClose: PropTypes.func.isRequired,
   modals: PropTypes.object.isRequired,
   setSelectedAddressId: PropTypes.func.isRequired,
   handleRadioButtonClick: PropTypes.func.isRequired,
   selectedAddressId: PropTypes,
   selectedEditAddress: PropTypes,
   isEditModalOpen: PropTypes.number,
   setEditModalOpen: PropTypes.func.isRequired,
   setSelectedEditAddress: PropTypes.func.isRequired,
};

export default ShippingDetail;
