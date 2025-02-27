import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
   Box,
   Button,
   CircularProgress,
   IconButton,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDeleteShippingDetailMutation } from "../../../../../api/siteSlice";
import { getError } from "../../../../../utils/helpers";
import customToaster from "../../../../common/CustomToasters/CustomToaster";

const ShippingDeleteModal = ({
   open,
   handleClose,
   dataStatus,
   id,
   height,
   message,
   buttonName,
   content,
}) => {
   const [
      deleteShippingDetail,
      {
         error: error,
         isLoading: isLoading,
         isSuccess: isSuccess,
         data: successData,
      },
   ] = useDeleteShippingDetailMutation();
   console.log({ isSuccess, id });
   useEffect(() => {
      if (isSuccess) {
         customToaster({
            message: successData?.message,
            type: "success",
         });
         handleClose();
      }
   }, [isSuccess]);
   useEffect(() => {
      getError(error);
   }, [error]);

   const onSubmit = () => {
      deleteShippingDetail(id);
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
   } = useForm({});
   return (
      <div className="min-h-[180px]">
         <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
               <Box
                  style={{
                     fontSize: "17px",
                     textAlign: "center",
                     margin: 0,
                     padding: 0,
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     flexDirection: "column",
                     width: "100%",
                     marginTop: "20px",
                  }}
               >
                  <IconButton
                     style={{
                        backgroundColor: "#FCE4EC",
                        width: "40px",
                        height: "40px",
                     }}
                  >
                     <CloseRoundedIcon style={{ color: "#F10056" }} />
                  </IconButton>

                  <p
                     style={{
                        fontWeight: "500",
                        margin: 0,
                        padding: 0,
                        marginTop: "10px",
                     }}
                  >
                     {message ||
                        "Do you want to delete this Shipping Address?"}
                  </p>
               </Box>
            </Box>

            <Box
               style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  gap: "10px",
                  marginTop: "30px",
               }}
            >
               <Button
                  type="submit"
                  disabled={isLoading}
                  sx={{
                     backgroundColor: "#F10056",
                     color: "white",
                     fontSize: "13px",
                     textTransform: "capitalize",
                     fontWeight: "600",

                     "&:hover": {
                        backgroundColor: "#F10056",
                     },
                  }}
               >
                  {isLoading ? (
                     <Box
                        display={"flex"}
                        alignItems={"center"}
                        gap={"10px"}
                     >
                        <CircularProgress
                           size={15}
                           sx={{ color: "#fff" }}
                        />
                        {buttonName || "Delete"}
                     </Box>
                  ) : (
                     buttonName || "Delete"
                  )}
               </Button>
               <Button
                  variant="outlined"
                  onClick={() => handleClose()}
                  sx={{
                     color: "#F10056",
                     borderColor: "#F10056",
                     fontSize: "13px",
                     textTransform: "capitalize",
                     fontWeight: "600",

                     "&:hover": {
                        borderColor: "#F10056",
                     },
                  }}
               >
                  Cancel
               </Button>
            </Box>
         </form>
      </div>
   );
};

export default ShippingDeleteModal;

// import { yupResolver } from "@hookform/resolvers/yup";
// import { Delete } from "@mui/icons-material";
// import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// import {
//    Box,
//    Button,
//    CircularProgress,
//    IconButton,
// } from "@mui/material";
// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import * as Yup from "yup";
// import { useDeleteShippingDetailMutation } from "../../../../../api/siteSlice";
// import { getError, getSuccess } from "../../../../../utils/helpers";
// import CustomModal from "../../../../common/CustomModal/CustomModal";

// const schema = Yup.object().shape({
//    review: Yup.string().required("Review field is required"),
// });
// const ShippingDeleteModal = ({
//    open,
//    handleClose,
//    dataStatus,
//    id,
//    height,
//    message,
//    buttonName,
//    content,
// }) => {
//    const [
//       deleteShippingDetail,
//       {
//          error: error,
//          isLoading: isLoading,
//          isSuccess: isSuccess,
//          data: successData,
//       },
//    ] = useDeleteShippingDetailMutation();
//    console.log({ isSuccess, id });
//    useEffect(() => {
//       if (isSuccess) {
//          getSuccess(isSuccess);
//          handleClose();
//       }
//    }, [isSuccess]);
//    useEffect(() => {
//       getError(error);
//    }, [error]);

//    const onSubmit = () => {
//       alert();
//       deleteShippingDetail(id);
//    };

//    const {
//       control,
//       formState: { errors },
//       watch,
//       setValue,
//       register,
//       handleSubmit,
//       reset,
//       clearErrors,
//    } = useForm({ resolver: yupResolver(schema) });
//    return (
//       <>
//          <CustomModal
//             open={open}
//             width={"500px"}
//             height={height || "auto"}
//             icon={<Delete />}
//             handleClose={handleClose}
//          >
//             <form onSubmit={handleSubmit(onSubmit)}>
//                <Box>
//                   <Box
//                      style={{
//                         fontSize: "17px",
//                         textAlign: "center",
//                         margin: 0,
//                         padding: 0,
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         flexDirection: "column",
//                         width: "100%",
//                         marginTop: "20px",
//                      }}
//                   >
//                      <IconButton
//                         style={{
//                            backgroundColor: "#FCE4EC",
//                            width: "40px",
//                            height: "40px",
//                         }}
//                      >
//                         <CloseRoundedIcon
//                            style={{ color: "#F10056" }}
//                         />
//                      </IconButton>

//                      <p
//                         style={{
//                            fontWeight: "500",
//                            margin: 0,
//                            padding: 0,
//                            marginTop: "10px",
//                         }}
//                      >
//                         {message ||
//                            "Do you want to delete this Shipping Address?"}
//                      </p>
//                   </Box>
//                </Box>

//                <Box
//                   style={{
//                      display: "flex",
//                      justifyContent: "center",
//                      alignItems: "flex-end",
//                      gap: "10px",
//                      marginTop: "30px",
//                   }}
//                >
//                   <Button
//                      type="submit"
//                      disabled={isLoading}
//                      sx={{
//                         backgroundColor: "#F10056",
//                         color: "white",
//                         fontSize: "13px",
//                         textTransform: "capitalize",
//                         fontWeight: "600",

//                         "&:hover": {
//                            backgroundColor: "#F10056",
//                         },
//                      }}
//                   >
//                      {isLoading ? (
//                         <Box
//                            display={"flex"}
//                            alignItems={"center"}
//                            gap={"10px"}
//                         >
//                            <CircularProgress
//                               size={15}
//                               sx={{ color: "#fff" }}
//                            />
//                            {buttonName || "Delete"}
//                         </Box>
//                      ) : (
//                         buttonName || "Delete"
//                      )}
//                   </Button>
//                   <Button
//                      variant="outlined"
//                      onClick={() => handleClose()}
//                      sx={{
//                         color: "#F10056",
//                         borderColor: "#F10056",
//                         fontSize: "13px",
//                         textTransform: "capitalize",
//                         fontWeight: "600",

//                         "&:hover": {
//                            borderColor: "#F10056",
//                         },
//                      }}
//                   >
//                      Cancel
//                   </Button>
//                </Box>
//             </form>
//             {content && content}
//          </CustomModal>
//       </>
//    );
// };

// export default ShippingDeleteModal;
