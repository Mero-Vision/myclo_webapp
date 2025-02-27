import { Clear } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import * as React from "react";

export default function CustomDrawer({
   component,
   anchor = "right",
   drawer,
   close = false,
   width,
   padding,
   session,
}) {
   const [state, setState] = React.useState(false);

   const toggleDrawer = (open) => (event) => {
      if (
         event.type === "keydown" &&
         (event.key === "Tab" || event.key === "Shift")
      ) {
         return;
      }

      setState(open);
   };

   return (
      <div>
         <React.Fragment>
            <Box onClick={toggleDrawer(true)}>{component}</Box>
            <Drawer
               anchor={anchor}
               open={state}
               onClose={toggleDrawer(false)}
            >
               <Box
                  sx={{
                     height: "100%",
                     width: width ? width : "60vw",
                     padding: padding ? padding : "20px  40px",
                     background: "#f9f9fb",
                  }}
                  role="presentation"
                  onClick={close && toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
               >
                  <Box
                     sx={{
                        position: "sticky",
                        top: 0,
                        zIndex: 1000,
                        backgroundColor: "#F9F9FB",
                        // padding: "1px 20px",
                        padding: "10px 10px 10px 0px",
                        color: "#0D74D6",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                     }}
                  >
                     <div
                        className="p-[8px] hover:bg-[#e9e9e9] rounded-[50%] duration-200 cursor-pointer"
                        onClick={toggleDrawer(false)}
                     >
                        <Clear />
                     </div>
                  </Box>
                  {drawer}
               </Box>{" "}
            </Drawer>
         </React.Fragment>
      </div>
   );
}
