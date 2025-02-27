import { Delete, DeleteOutline } from "@mui/icons-material";
import {
   Box,
   Button,
   CircularProgress,
   IconButton,
} from "@mui/material";
import { useEffect } from "react";
import { getError, getSuccess } from "../../../utils/helpers";
import CustomModal from "./CustomModal";

const CustomDeleteModal = ({
   open,
   handleClose,
   handleConfirm,
   isLoading,
   success,
   error,
   content,
   message,
   buttonName,
   height,
}) => {
   console.log({ success });
   useEffect(() => {
      if (success) {
         getSuccess(success);
         handleClose();
      }
   }, [success]);
   useEffect(() => {
      getError(error);
   }, [error]);
   return (
      <>
         <CustomModal
            open={open}
            width={"500px"}
            height={height || "230px"}
            icon={<Delete />}
            handleClose={handleClose}
         >
            <Box>
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
                        <DeleteOutline style={{ color: "#F10056" }} />
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
                           "Do you want to delete this record?"}
                     </p>

                     <p
                        style={{
                           margin: 0,
                           padding: 0,
                           fontSize: "14px",
                           marginTop: "5px",
                           color: "#43434390",
                        }}
                     >
                        This action is permanent and cannot be undone.
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
                     onClick={() => handleConfirm()}
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
            </Box>
            {content && content}
         </CustomModal>
      </>
   );
};

export default CustomDeleteModal;
