import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../api/authApi";
import customToaster from "../../../components/common/CustomToasters/CustomToaster";
import { isLoggedIn } from "../../../utils/IsLoggedIn";
const NavModalAccount = ({ setAnchorEl }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleLogout = () => {
      dispatch(logout()); // Clear Redux + LocalStorage
      navigate("/"); // Redirect to homepage
      customToaster({
         message: "You have been successfully logged out.",
         type: "success",
      });
      setAnchorEl(null);
   };

   const accountData = [
      {
         label: "Login",
         url: "/login",
         icon: <ExitToAppOutlinedIcon />,
      },
      {
         label: "Contact Us",
         url: "/contact-us",
         icon: <SupportAgentOutlinedIcon />,
      },
      {
         label: "About Us",
         url: "/about-us",
         icon: <HelpCenterOutlinedIcon />,
      },
   ];

   const accountDataLoggedIn = [
      {
         label: "My Account",
         url: "/my-account/dashboard",
         icon: <AccountBoxOutlinedIcon />,
      },
      {
         label: "My Orders",
         url: "/my-account/my-orders",
         icon: <ShoppingBagOutlinedIcon />,
      },
      {
         label: "Contact Us",
         url: "/contact-us",
         icon: <SupportAgentOutlinedIcon />,
      },
      {
         label: "About Us",
         url: "/about-us",
         icon: <HelpCenterOutlinedIcon />,
      },
      {
         label: "Logout",

         action: () => {
            handleLogout();
         },
         icon: <ExitToAppOutlinedIcon />,
      },
   ];

   const menuItems = isLoggedIn() ? accountDataLoggedIn : accountData;

   return (
      <>
         <Box sx={{ width: "275px" }}>
            {menuItems.map((item, index) => (
               <Box
                  key={index}
                  onClick={() =>
                     item.action ? item.action() : navigate(item.url)
                  }
                  sx={{
                     fontSize: "16px",
                     fontWeight: "400",
                     color: "#343434",
                     padding: "12px 24px",
                     borderTop:
                        index === 0 ? "none" : "0.5px solid #eee",
                     borderBottom:
                        index === menuItems.length - 1
                           ? "none"
                           : "0.5px solid #eee",
                     transition: "0.2s ease-in-out",
                     cursor: "pointer",
                     display: "flex",
                     alignItems: "center",
                     gap: "14px",
                     borderRadius:
                        index === 0
                           ? "8px 8px 0px 0px"
                           : index === menuItems.length - 1
                           ? "0px 0px 8px 8px"
                           : "0px",
                     "&:hover": {
                        backgroundColor: "#f5f5f5",
                     },
                  }}
               >
                  {item.icon}
                  {item.label}
               </Box>
            ))}
         </Box>
      </>
   );
};

export default NavModalAccount;
