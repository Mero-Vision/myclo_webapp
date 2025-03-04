import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { Divider, Grid, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import tiktokImg from "../../assets/footer/tiktok.png";
import whatsappImg from "../../assets/footer/whatsapp.png";
import CustomModal from "../../components/common/CustomModal/CustomModal";
import LoginModal from "../../components/pages/auth/login/LoginModal";
import { isLoggedIn } from "../../utils/IsLoggedIn";

const Footer = () => {
   const { siteSettings } = useSelector((state) => state?.utils);
   const navigate = useNavigate();
   const isMobile = useMediaQuery("(max-width: 1048px)");

   const [loginModal, setLoginModal] = useState(false);

   const handleAccount = () => {
      if (isLoggedIn()) {
         navigate("/my-account/dashboard");
      } else {
         setLoginModal(true);
      }
   };
   const handleShipping = () => {
      if (isLoggedIn()) {
         navigate("/my-account/shipping-details");
      } else {
         setLoginModal(true);
      }
   };
   const handleCart = () => {
      if (isLoggedIn()) {
         navigate("/cart");
      } else {
         setLoginModal(true);
      }
   };

   const infoData = [
      { url: "/about-us", name: "About Us" },
      { url: "/contact-us", name: "Contact Us" },
      {
         action: () => {
            handleAccount();
         },
         name: "My Account",
      },
   ];
   const customerServiceData = [
      {
         action: () => {
            handleShipping();
         },
         name: "Shipping",
      },
      { url: "/privacy-policy", name: "Privacy Policy" },
      { url: "/terms-and-conditions", name: "Terms & Conditions" },
      { url: "/faq", name: "FAQs" },
      {
         action: () => {
            handleCart();
         },
         name: "My Cart",
      },
   ];

   const whatsappUrl = `https://wa.me/${siteSettings?.data?.whatsapp_number}`;

   return (
      <>
         <div
            style={{
               backgroundColor:
                  siteSettings?.data?.footer_background_color ||
                  "#000",
               color: siteSettings?.data?.footer_text_color || "#fff",
            }}
         >
            <div className="containerWrap">
               <div className="containerBody">
                  <div className="pt-[100px] pb-[0px]">
                     <Grid
                        container
                        spacing={2}
                        className="mb-[100px]"
                     >
                        <Grid item lg={4} md={12} xs={12}>
                           <div className="flex flex-col gap-[16px]">
                              <img
                                 src={siteSettings?.data?.logo}
                                 alt=""
                                 className="w-[120px] h-auto cursor-pointer"
                                 onClick={() => navigate(`/`)}
                              />
                              {/* <div className="text-[32px] font-[600]">
                              MyClo
                           </div> */}
                              <div className="text-[14px] font-[400] ">
                                 {siteSettings?.data?.address}
                              </div>
                              <div className="flex flex-col gap-[8px]">
                                 <div className="flex felx-row items-center gap-[12px] text-[16px] font-[400] ">
                                    <EmailOutlinedIcon />{" "}
                                    themesflat@gmail.com
                                 </div>
                                 <div className="flex felx-row items-center gap-[12px] text-[16px] font-[400] ">
                                    <LocalPhoneOutlinedIcon />{" "}
                                    {siteSettings?.data?.contact_no}
                                 </div>
                              </div>
                              <div className="flex gap-[8px] items-center">
                                 <FacebookOutlinedIcon
                                    onClick={() =>
                                       window.open(
                                          siteSettings?.data
                                             ?.facebook_link,
                                          "_blank"
                                       )
                                    }
                                    sx={{
                                       borderRadius: "50%",
                                       height: "fit-height",
                                       border: "1px solid #eee",
                                       padding: "8px",
                                       fontSize: "48px",
                                       transition: "0.2s ease-in-out",
                                       cursor: "pointer",
                                       "&:hover": {
                                          backgroundColor: "#555555",
                                          border: "1px solid #555555",
                                       },
                                    }}
                                 />

                                 <InstagramIcon
                                    onClick={() =>
                                       window.open(
                                          siteSettings?.data
                                             ?.instagram_link,
                                          "_blank"
                                       )
                                    }
                                    sx={{
                                       borderRadius: "50%",
                                       height: "fit-height",
                                       border: "1px solid #eee",
                                       padding: "8px",
                                       fontSize: "48px",
                                       transition: "0.2s ease-in-out",
                                       cursor: "pointer",
                                       "&:hover": {
                                          backgroundColor: "#555555",
                                          border: "1px solid #555555",
                                       },
                                    }}
                                 />

                                 <div
                                    onClick={() =>
                                       window.open(
                                          siteSettings?.data
                                             ?.tiktok_link,
                                          "_blank"
                                       )
                                    }
                                    style={{
                                       borderRadius: "50%",
                                       border: "1px solid #eee",
                                       padding: "10px",
                                       // fontSize: "48px",
                                       transition: "0.2s ease-in-out",
                                       cursor: "pointer",
                                       display: "inline-flex",
                                       alignItems: "center",
                                       justifyContent: "center",
                                    }}
                                    onMouseEnter={(e) => {
                                       e.currentTarget.style.backgroundColor =
                                          "#555555";
                                       e.currentTarget.style.border =
                                          "1px solid #555555";
                                    }}
                                    onMouseLeave={(e) => {
                                       e.currentTarget.style.backgroundColor =
                                          "";
                                       e.currentTarget.style.border =
                                          "1px solid #eee";
                                    }}
                                 >
                                    <img
                                       src={tiktokImg}
                                       alt=""
                                       style={{
                                          width: "27px",
                                          height: "27px",
                                       }}
                                    />
                                 </div>
                                 <div
                                    onClick={() =>
                                       window.open(
                                          whatsappUrl,
                                          "_blank",
                                          "noopener,noreferrer"
                                       )
                                    }
                                    style={{
                                       borderRadius: "50%",
                                       border: "1px solid #eee",
                                       padding: "10px",
                                       // fontSize: "48px",
                                       transition: "0.2s ease-in-out",
                                       cursor: "pointer",
                                       display: "inline-flex",
                                       alignItems: "center",
                                       justifyContent: "center",
                                    }}
                                    onMouseEnter={(e) => {
                                       e.currentTarget.style.backgroundColor =
                                          "#555555";
                                       e.currentTarget.style.border =
                                          "1px solid #555555";
                                    }}
                                    onMouseLeave={(e) => {
                                       e.currentTarget.style.backgroundColor =
                                          "";
                                       e.currentTarget.style.border =
                                          "1px solid #eee";
                                    }}
                                 >
                                    <img
                                       src={whatsappImg}
                                       alt=""
                                       style={{
                                          width: "27px",
                                          height: "27px",
                                       }}
                                    />
                                 </div>
                              </div>
                           </div>
                        </Grid>
                        <Grid item lg={2} md={6} xs={12}>
                           <div className="flex flex-col mt-[12px]">
                              <div className="text-[16px] font-[600] mb-[12px]">
                                 Information
                              </div>
                              <div className="flex flex-col gap-[8px]">
                                 {infoData?.map((item, index) => (
                                    <div
                                       onClick={() =>
                                          item.action
                                             ? item.action()
                                             : navigate(item.url)
                                       }
                                       key={index}
                                       className=" text-[14px] font-[400] hover:text-[#E43131] transition duration-200 ease-in-out cursor-pointer"
                                    >
                                       {item?.name}
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </Grid>
                        <Grid item lg={2.5} md={6} xs={12}>
                           <div className="flex flex-col mt-[12px]">
                              <div className="text-[16px] font-[600] mb-[12px]">
                                 Customer Services
                              </div>
                              <div className="flex flex-col gap-[8px]">
                                 {customerServiceData?.map(
                                    (item, index) => (
                                       <div
                                          onClick={() =>
                                             item.action
                                                ? item.action()
                                                : navigate(item.url)
                                          }
                                          key={index}
                                          className=" text-[14px] font-[400] hover:text-[#E43131] transition duration-200 ease-in-out cursor-pointer"
                                       >
                                          {item?.name}
                                       </div>
                                    )
                                 )}
                              </div>
                           </div>
                        </Grid>
                        <Grid item lg={3.5} md={12} xs={12}>
                           <div className="flex flex-col mt-[12px]">
                              <div className="text-[16px] font-[600] mb-[12px]">
                                 Newsletter
                              </div>

                              <div className=" text-[14px] font-[400] mb-[12px]">
                                 Sign up for our newsletter and get
                                 10% off your first purchase
                              </div>
                              <form className="flex items-center">
                                 <div
                                    style={{
                                       position: "relative",
                                       width: "100%",
                                    }}
                                 >
                                    <input
                                       style={{
                                          backgroundColor:
                                             siteSettings?.data
                                                ?.footer_background_color ||
                                             "#000",
                                          color:
                                             siteSettings?.data
                                                ?.footer_text_color ||
                                             "#fff",
                                          "&::placeholder": {
                                             color:
                                                siteSettings?.data
                                                   ?.footer_text_color ||
                                                "#fff",
                                          },
                                       }}
                                       type="email"
                                       placeholder="Enter your email..."
                                       className="w-full py-[14px] px-[20px] text-[#000]  border-[#fff] border-[1px] rounded-[50px] focus:outline-none focus:ring-2"
                                       required
                                    />
                                    <ArrowOutwardIcon
                                       className="text-[#fff] rounded-[50%] p-[8px] text-[40px] absolute right-[5px] z-50"
                                       style={{
                                          color: "#000 !important",
                                          border: "1px solid #000",
                                          backgroundColor: "#000",
                                          top: "50%",
                                          transform:
                                             "translateY(-50%)",
                                          zIndex: "10",
                                          fontSize: "45px",
                                          cursor: "pointer",
                                       }}
                                    />
                                 </div>
                              </form>
                           </div>
                        </Grid>
                     </Grid>
                     <Divider sx={{ borderColor: "#a0a0a0" }} />
                     <div className="text-[12px]  font-[400] flex justify-center py-[20px]">
                        ©2025 MyClo. All Rights Reserved.
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <CustomModal
            noPadding
            open={loginModal}
            width={isMobile ? "90%" : "1000px"}
            handleClose={() => setLoginModal(false)}
         >
            <LoginModal handleClose={() => setLoginModal(false)} />
         </CustomModal>
      </>
   );
};

export default Footer;
