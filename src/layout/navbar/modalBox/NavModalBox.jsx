import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Fade, Popper } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import "./Navbar.css";
import NavModalAccount from "./NavModalAccount";
import NavModalDetails from "./NavModalDetails";
import NavModalDetailsCat from "./NavModalDetailsCat";

const NavModalBox = ({
   props,
   menuData,
   hosting,
   icon,
   cat,
   account,
}) => {
   const [anchorEl, setAnchorEl] = useState(null);

   const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handlePopoverClose = () => {
      setAnchorEl(null);
   };

   const open = Boolean(anchorEl);

   return (
      <Box
         sx={{ textTransform: "capitalize" }}
         onMouseEnter={handlePopoverOpen}
         onMouseLeave={handlePopoverClose}
      >
         <Box
            sx={{
               display: "flex",
               alignItems: "center",
               gap: "8px",
               color: "#fff",
               cursor: "pointer",
            }}
         >
            {icon}
            {props}{" "}
            {!account && (
               <KeyboardArrowDownIcon sx={{ fontSize: "20px" }} />
            )}
         </Box>
         <Popper
            transition
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            modifiers={[
               { name: "offset", options: { offset: [0, 10] } },
            ]}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            sx={{ zIndex: "100000" }}
         >
            {({ TransitionProps }) => (
               <AnimatePresence>
                  <motion.div
                     initial={{ marginTop: 10 }}
                     animate={{ marginTop: 0 }}
                     exit={{ marginTop: 10 }}
                     transition={{ duration: 0.3 }}
                  >
                     <Fade {...TransitionProps} timeout={350}>
                        {(() => {
                           switch (true) {
                              case account:
                                 return (
                                    <Box
                                       sx={{
                                          background: "#fff",
                                          boxShadow:
                                             "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px",
                                          display: "flex",
                                          flexWrap: "wrap",
                                          borderRadius: "8px",
                                       }}
                                    >
                                       <NavModalAccount
                                          handleClose={
                                             handlePopoverClose
                                          }
                                          setAnchorEl={setAnchorEl}
                                          row={menuData}
                                       />
                                    </Box>
                                 );
                              case cat:
                                 return (
                                    <Box
                                       sx={{
                                          background: "#fff",
                                          boxShadow:
                                             "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px",
                                          display: "flex",
                                          padding: "10px",
                                          flexWrap: "wrap",
                                          borderRadius: "8px",
                                       }}
                                    >
                                       <NavModalDetailsCat
                                          row={menuData}
                                       />
                                    </Box>
                                 );
                              default:
                                 return (
                                    <Box
                                       sx={{
                                          background: "#fff",
                                          boxShadow:
                                             "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px",
                                          display: "flex",
                                          padding: "10px",
                                          flexWrap: "wrap",
                                          borderRadius: "8px",
                                       }}
                                    >
                                       <NavModalDetails
                                          row={menuData}
                                       />
                                    </Box>
                                 );
                           }
                        })()}
                     </Fade>
                  </motion.div>
               </AnimatePresence>
            )}
         </Popper>
      </Box>
   );
};

export default NavModalBox;
