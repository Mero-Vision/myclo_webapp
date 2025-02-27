import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import Slider from "react-slick";
import if1 from "../../../../assets/info/if1.jpg";
import if2 from "../../../../assets/info/if2.jpg";
import if3 from "../../../../assets/info/if3.jpg";

const InfoCards = () => {
   const sliderRef = useRef();

   const sliderSettings = {
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      infinite: true,
      swipe: false,
      responsive: [
         {
            breakpoint: 1200,
            settings: {
               slidesToShow: 2,
               swipe: true,
               dots: true,
            },
         },
         {
            breakpoint: 1050,
            settings: {
               slidesToShow: 2,
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
               slidesToShow: 1.5,
            },
         },
         {
            breakpoint: 524,
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
         productName: "New Apple Watch",
         desc1: "Stay connected and stylish with ",
         desc2: " the latest Apple Watch.",
         img: if1,
         bg: "#f7f6f4",
      },
      {
         productName: "Discover Galaxy",
         desc1: "Experience the cutting-edge  ",
         desc2: " Samsung S24",
         img: if2,
         bg: "#ecedfc",
      },
      {
         productName: "Smart Sepeaker",
         desc1: "Google home smart speaker with  ",
         desc2: " google assistant",
         img: if3,
         bg: "#f3e7f2",
      },
   ];

   return (
      <div className="containerWrap">
         <div className="containerBody">
            <div className="commonContainerBodySec">
               <div className="flex flex-col">
                  <Grid container spacing={0}>
                     <Slider
                        ref={sliderRef}
                        {...sliderSettings}
                        className="w-full infoPage"
                     >
                        {productData.map((item, index) => (
                           <SingleInfoCard data={item} key={index} />
                        ))}
                     </Slider>
                  </Grid>
               </div>
            </div>
         </div>
      </div>
   );
};

const SingleInfoCard = ({ data }) => {
   return (
      <div
         style={{ backgroundColor: data?.bg }}
         className="group rounded-[20px] mx-[18px] h-[270px] relative overflow-hidden"
      >
         <img
            src={data?.img}
            alt=""
            className="h-[100%] w-[100%] object-cover rounded-[20px] transition-transform duration-1000 ease-in-out group-hover:scale-105"
         />

         <div className="absolute z-10 top-[30px] left-[30px]">
            <div className="titleThree mb-[10px]">
               {data?.productName}
            </div>
            <div className="titleFive mb-[10px]">{data?.desc1}</div>
            <div className="titleFive mb-[16px]">{data?.desc2}</div>
            <button className="text-[#181818] text-[16px] font-[600] pb-[2px]  border-b-[2px] border-[#181818] hover:border-[#e43131] hover:text-[#e43131] transition duration-300 ease-in-out">
               Shop Now
            </button>
         </div>
      </div>
   );
};

// PropTypes for validation
SingleInfoCard.propTypes = {
   data: PropTypes.shape({
      bg: PropTypes.string, // Background color (optional)
      productName: PropTypes.string, // Product name (required)
      desc1: PropTypes.string, // First line of description (optional)
      desc2: PropTypes.string, // Second line of description (optional)
      img: PropTypes.string, // Image URL (required)
   }).isRequired,
};

export default InfoCards;
