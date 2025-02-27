import { Box } from "@mui/material";
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import app1 from "../../../../../assets/categ/app1.jpg";
import app2 from "../../../../../assets/categ/app2.jpg";
import app3 from "../../../../../assets/categ/app3.jpg";
import app4 from "../../../../../assets/categ/app4.jpg";
import "./FeaturedOffersList.css";

const FeaturedOffersList = () => {
   const sliderRef = useRef();

   const imageData = [
      {
         id: 1,
         imageName: " Shop top deals on Samsung Fold and more.",
         categoryName: "Nature",
         imageUrl: app1,
      },
      {
         id: 2,
         imageName: " Shop top deals on Apple ipad and more.",
         categoryName: "Cityscape",
         imageUrl: app2,
      },
      {
         id: 3,
         imageName: " Shop top deals on Samsung Fold and more.",
         categoryName: "Adventure",
         imageUrl: app3,
      },
      {
         id: 4,
         imageName: " Shop top deals on Apple ipad and more.",
         categoryName: "Nature",
         imageUrl: app4,
      },
   ];

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
            breakpoint: 1100,
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
               slidesToShow: 2,
            },
         },
      ],
   };

   return (
      <Box className="sliderBoxContainer">
         <Box className="sliderBox">
            <div className="menuPageBoxMenuWrap">
               <Box className="menuPageBoxMenuItemsBox">
                  <Slider
                     ref={sliderRef}
                     {...sliderSettings}
                     className="menuPageBoxMenuItems offersPage"
                  >
                     {imageData.map((item) => (
                        <div
                           key={item.id}
                           className="offerDiv menuItem flex justify-center "
                        >
                           <div className="overflow-hidden w-[100%] h-[100%] rounded-[50%]">
                              <img
                                 src={item?.imageUrl}
                                 alt="img"
                                 className="rounded-[50%] transition-transform duration-1000 ease-in-out hover:scale-105"
                                 style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    width: "100%",
                                 }}
                              />
                           </div>
                           <div className="menuItemText flex flex-col gap-[12px] items-center justify-center leading-[30px]">
                              <div className="titleThree mt-[16px] hover:text-[#E43131] transition duration-300 ease-in-out">
                                 {item?.imageName}
                              </div>
                              <button className="text-[#181818] text-[16px] font-[600] pb-[1px] border-b-[2px] border-[#181818] hover:border-[#e43131] hover:text-[#e43131] transition duration-300 ease-in-out">
                                 Shop Now
                              </button>
                           </div>
                        </div>
                     ))}
                  </Slider>
               </Box>
            </div>
         </Box>
      </Box>
   );
};

export default FeaturedOffersList;
