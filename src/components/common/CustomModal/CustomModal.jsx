import { Clear } from "@mui/icons-material";
import { Box, Fade, IconButton, Modal } from "@mui/material";
import { keyframes } from "@mui/system";
import { memo, useEffect, useState } from "react";

function CustomModal({
   children,
   open,
   handleClose,
   width,
   height,
   modalTitle,
   icon,
   noTitle,
   noPadding,
}) {
   const slideAnimation = keyframes`
      from {
         transform: translate(-50%, calc(-50% - 30px));
      }
      to {
         transform: translate(-50%, calc(-50%));
      }
   `;

   const getModalStyle = (height, width) => ({
      top: "50%",
      left: "50%",
      width: width || "800px",
      // padding: "20px",
      height: height || "auto",
      maxHeight: height || "80vh",
      transform: "translate(-50%, -50%)",
      overflowY: "auto",
      position: "absolute",
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      outline: "none",
      animation: `${slideAnimation} 0.3s ease-out`,
   });

   const [modalStyle, setModalStyle] = useState(
      getModalStyle(height, width)
   );

   useEffect(() => {
      setModalStyle(getModalStyle(height, width));
   }, [height, width, open]);

   return (
      <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="simple-modal-title"
         aria-describedby="simple-modal-description"
         closeAfterTransition
      >
         <Fade in={open}>
            <Box sx={modalStyle}>
               {(modalTitle || noTitle) && (
                  <Box
                     sx={{
                        position: "sticky",
                        top: 0,
                        zIndex: 1000,
                        backgroundColor: "#fff",
                        padding: noPadding ? "" : "11px 20px",
                        color: "#0D74D6 !important",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid #ddd",
                     }}
                  >
                     <Box
                        sx={{
                           display: "flex",
                           alignItems: "center",
                           columnGap: "1rem",
                        }}
                     >
                        {icon && (
                           <Box
                              sx={{
                                 background: "#ddd",
                                 borderRadius: "50%",
                                 display: "flex",
                                 alignItems: "center",
                                 padding: "5px",
                              }}
                           >
                              {icon}
                           </Box>
                        )}
                        {modalTitle && (
                           <div
                              fontSize="medium"
                              style={{
                                 color: "#0D74D6 !important",
                                 fontWeight: "400",
                                 fontSize: "16px !important",
                                 textTransform: "capitalize",
                              }}
                           >
                              {modalTitle}
                           </div>
                        )}
                     </Box>
                     <IconButton
                        onClick={handleClose}
                        sx={{ borderRadius: "12px !important" }}
                     >
                        <Clear
                           sx={{
                              color: "#0D74D6 !important",
                              fontWeight: "500",
                              fontSize: "18px",
                           }}
                        />
                     </IconButton>
                  </Box>
               )}
               <Box p={noPadding ? "" : "11px 20px 20px 20px"}>
                  {children}
               </Box>
            </Box>
         </Fade>
      </Modal>
   );
}

export default memo(CustomModal);
