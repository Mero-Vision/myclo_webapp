import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { Grid } from "@mui/material";
import React, { useRef } from "react";
import Slider from "react-slick";
const Policies = () => {
   const sliderRef = useRef();

   const sliderSettings = {
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      infinite: true,
      swipe: false,
      responsive: [
         {
            breakpoint: 1200,
            settings: {
               slidesToShow: 4,
               swipe: true,
               dots: true,
            },
         },
         {
            breakpoint: 1050,
            settings: {
               slidesToShow: 3,
               swipe: true,
               dots: true,
            },
         },
         {
            breakpoint: 880,
            settings: {
               swipe: true,
               dots: true,
               slidesToShow: 2,
            },
         },
         {
            breakpoint: 695,
            settings: {
               swipe: true,
               dots: true,
               slidesToShow: 1,
            },
         },
      ],
   };
   // products fake data
   const productData = [
      {
         title: "14-Day Returns",
         desc: "Risk-free shopping with easy returns.",
         icon: <UndoOutlinedIcon sx={{ fontSize: "40px" }} />,
      },
      {
         title: "Free Shipping",
         desc: "No extra cost, just the price you see.",
         icon: (
            <LocalShippingOutlinedIcon sx={{ fontSize: "40px" }} />
         ),
      },
      {
         title: "24/7 Support",
         desc: "24/7 support, always here just for you.",
         icon: <SupportAgentOutlinedIcon sx={{ fontSize: "40px" }} />,
      },
      {
         title: "Member Discounts",
         desc: "Special prices for our loyal customers.",
         icon: <VerifiedOutlinedIcon sx={{ fontSize: "40px" }} />,
      },
   ];
   return (
      <div className="border-[#eee] border-t-[1px] border-b-[1px] w-[100%] py-[50px] md:py-[20px]">
         <div className="containerWrap">
            <div className="containerBody">
               <div className="commonContainerBodySec">
                  <Grid container spacing={0}>
                     <Slider
                        ref={sliderRef}
                        {...sliderSettings}
                        className="w-full dealsPage"
                     >
                        {productData.map((item, index) => (
                           <PolicieCard data={item} key={index} />
                        ))}
                     </Slider>
                  </Grid>
               </div>
            </div>
         </div>
      </div>
   );
};

const PolicieCard = ({ data }) => {
   return (
      <Grid
         item
         xs={6}
         sm={4}
         lg={3}
         sx={{
            maxWidth: "100% !important",
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
         }}
      >
         <div className="mb-[20px]">{data?.icon}</div>
         <div className="text-[20px] text-[#181818] font-[500] mb-[8px]">
            {data?.title}
         </div>
         <div className="text-[#4d4e4f] text-[16px] font-[400] flex text-center">
            {data?.desc}
         </div>
      </Grid>
   );
};

export default Policies;
