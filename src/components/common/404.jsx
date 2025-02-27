import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "./scrollToTop/ScrollToTop";

const NotFound = () => {
   const navigate = useNavigate();
   return (
      <>
         <ScrollToTop />
         <Box className="flex items-center justify-center h-[100dvh] flex-col">
            <Box textAlign={"center"} variant="h5">
               Sorry! The route you trying to access is not available.
            </Box>
            <Box className="text-[50px] md:text-[100px] lg:text-[200px] italic">
               404
            </Box>
            <Box sx={{ textAlign: "center", margin: "10px 0px" }}>
               <button
                  className="bg-[#0765BF] text-[#fff] hover:bg-[#0D74D6] transition py-[10px] px-[20px] rounded-[50px] duration-100 ease-in-out"
                  onClick={() => navigate("/")}
               >
                  Go to homepage
               </button>
            </Box>
         </Box>
      </>
   );
};

export default NotFound;
