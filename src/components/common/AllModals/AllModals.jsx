import { Person } from "@mui/icons-material";
import PeopleIcon from "@mui/icons-material/People";
import React from "react";
import CustomDeleteModal from "../../common/CustomModal/CustomDeleteModal";
import ProductsForm from "../../pages/protectedPages/myAccount/products/ProductsForm";
import CustomModal from "../CustomModal/CustomModal";
const AllModals = ({
   modalType,
   open,
   value,
   handleClose,
   row,
   handleConfirm,
   isLoading,
   isService,
   id,
   inputValue = "",
   uuid,
   account_type,
   modalTitle,
   parentCategory,
   rosterTime,
   initialRow,
   employees,
   isEditMode,
   selectedDate,
   closeModal,
   pos,
   deliveryForm,
}) => {
   const returnModal = () => {
      console.log("llcllcllvlllll", { initialRow });

      switch (modalType) {
         case "edit_products":
         case "add_products":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${modalTitle ?? "New Product"}`}
                  icon={<Person />}
                  width={"900px"}
                  // deliveryForm={deliveryForm}
               >
                  {
                     <ProductsForm
                        type={value}
                        handleClose={handleClose}
                        row={row}
                        inputValue={inputValue}
                     />
                  }
               </CustomModal>
            );
         case "delete_products":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );

         default:
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={`New Account`}
                  icon={<PeopleIcon />}
               >
                  NICE{" "}
               </CustomModal>
            );
      }
   };
   return <div>{returnModal()}</div>;
};

export default AllModals;
