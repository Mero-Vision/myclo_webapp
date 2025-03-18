import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import {
   Box,
   Divider,
   List,
   ListItem,
   ListItemButton,
   ListItemIcon,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../../../api/authApi";
import {
   useGetUserSingleQuery,
   usePostProfileImageUpdateMutation,
} from "../../../../api/siteSlice";
import noImg from "../../../../assets/account/noImg.png";
import { getSiteDetail } from "../../../../utils/helpers";
import customToaster from "../../../common/CustomToasters/CustomToaster";
import styles from "./styles";

const settingsArray = [
   {
      label: "Dashboard",
      url: "/my-account/dashboard",
      icon: <DashboardOutlinedIcon />,
   },
   {
      label: "My Profile",
      url: "/my-account/my-profile",
      icon: <AccountBoxOutlinedIcon />,
   },

   {
      label: "My Orders",
      url: "/my-account/my-orders",
      icon: <ShoppingBagOutlinedIcon />,
   },
   {
      label: "My Products",
      url: "/my-account/my-products",
      icon: <WidgetsOutlinedIcon />,
   },
   {
      label: "Swapped Products",
      url: "/my-account/swapped-products",
      icon: <CategoryOutlinedIcon />,
   },
   {
      label: "Shipping Details",
      url: "/my-account/shipping-details",
      icon: <LocalShippingOutlinedIcon />,
   },
];
const MyAccountRoutes = () => {
   const classes = styles();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const userData = getSiteDetail()?.userData;

   const { data: userDetailData } = useGetUserSingleQuery(
      userData?.id,
      { skip: !userData?.id }
   );

   const handleLogout = () => {
      dispatch(logout());
      navigate(`/`);
      customToaster({
         message: "You have been successfully logged out.",
         type: "success",
      });
   };

   const handleImageUpload = (image) => {
      console.log("Uploaded Image:", image);
   };

   return (
      <Box>
         {/* <div className="pb-[16px] pl-[4px] pt-[8px] text-[18px] w-fit">
            My Account
         </div> */}

         <ImageProfileUpload
            userId={userData?.id}
            userDetailData={userDetailData}
            onImageUpload={handleImageUpload}
            noImg={noImg}
         />
         <div className="bg-[#fff] rounded-bl-[12px] rounded-br-[12px]">
            <div className="w-[100%]  mb-[20px] flex justify-center flex-col items-center">
               <div className="text-[24px] font-[500] mb-[4px]">
                  {userDetailData?.data?.name || "-"}
               </div>
               <div className="text-[16px] font-[400]">
                  {userDetailData?.data?.email || "-"}
               </div>
            </div>
            <Divider sx={{ margin: "30px 15px" }} />

            <List disablePadding>
               {settingsArray?.map((item, index) => {
                  return (
                     <ListItem
                        key={item?.label}
                        disablePadding
                        sx={{
                           display: "block",
                           paddingBottom: "5px",
                        }}
                     >
                        <NavLink
                           to={item?.url}
                           className={({ isActive }) =>
                              isActive
                                 ? classes.activeClass
                                 : classes?.inactiveClass
                           }
                        >
                           <ListItemButton
                              className={classes.listItemButton}
                              sx={{
                                 padding: "10px 24px !important",
                              }}
                           >
                              <ListItemIcon
                                 sx={{
                                    minWidth: 0,
                                    marginRight: "12px",
                                    justifyContent: "center",

                                    "& .MuiSvgIcon-root": {
                                       fontSize: "22px",
                                       fontWeight: "200",
                                    },
                                 }}
                              >
                                 {item?.icon}
                              </ListItemIcon>
                              <div
                                 style={{
                                    fontSize: "16px",
                                    fontWeight: "500 !important",
                                 }}
                              >
                                 {item?.label}
                              </div>
                           </ListItemButton>
                        </NavLink>
                     </ListItem>
                  );
               })}
               <ListItem
                  disablePadding
                  sx={{
                     display: "block",
                     paddingBottom: "5px",
                  }}
               >
                  <div
                     // className={({ isActive }) =>
                     //    isActive && classes.activeClass
                     // }
                     style={{ color: " red" }}
                  >
                     <ListItemButton
                        onClick={handleLogout}
                        className={classes.listItemButton}
                        sx={{
                           padding: "5px 26px !important",
                        }}
                     >
                        <ListItemIcon
                           sx={{
                              minWidth: 0,
                              mr: 2,
                              justifyContent: "center",

                              "& .MuiSvgIcon-root": {
                                 fontSize: "24px",
                                 fontWeight: "200",
                                 color: "red",
                              },
                           }}
                        >
                           <ExitToAppOutlinedIcon />
                        </ListItemIcon>

                        <div className="text-[16px] font-[500]">
                           Logout
                        </div>
                     </ListItemButton>
                  </div>
               </ListItem>
            </List>
         </div>
      </Box>
   );
};

const ImageProfileUpload = ({
   userDetailData,
   onImageUpload,
   noImg,
   userId,
}) => {
   const [image, setImage] = useState(null);

   const [
      postProfileImageUpdate,
      {
         // error: shipError,
         isLoading: isProfileImageLoading,
      },
   ] = usePostProfileImageUpdateMutation();

   // Handle image upload
   const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            const imageData = reader.result;
            setImage(imageData);
            onImageUpload(imageData);

            const formData = new FormData();
            formData.append("profile_image", file);
            formData.append("_method", "PUT");

            postProfileImageUpdate({
               data: formData,
               id: userId,
            })
               .unwrap()
               .then((response) => {
                  console.log(
                     "Profile image updated successfully:",
                     response
                  );
               })
               .catch((error) => {
                  console.error(
                     "Failed to update profile image:",
                     error
                  );
               });
         };
         reader.readAsDataURL(file);
      }
   };

   return (
      <div className="flex flex-col items-center relative bg-[#fff] pt-[40px] pb-[20px] rounded-tl-[12px] rounded-tr-[12px]">
         {/* Image Preview */}
         <div
            className={`w-32 h-32 rounded-[50%] border-[#ddd] border-[1px] relative ${
               isProfileImageLoading
                  ? "opacity-40 cursor-not-allowed"
                  : ""
            }`}
         >
            {userDetailData?.data?.profile_image || image ? (
               <img
                  src={userDetailData?.data?.profile_image || image}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-[50%] p-[4px]"
               />
            ) : (
               <img
                  src={noImg}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-[50%] p-[4px]"
               />
            )}

            {/* Edit Icon */}
            <label
               className={`absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-40 ${
                  isProfileImageLoading
                     ? "cursor-not-allowed"
                     : "cursor-pointer"
               }`}
            >
               {/* Pencil Icon SVG */}
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
               >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
               </svg>
               <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isProfileImageLoading} // Disable input while loading
               />
            </label>
         </div>
      </div>
   );
};

export default MyAccountRoutes;
