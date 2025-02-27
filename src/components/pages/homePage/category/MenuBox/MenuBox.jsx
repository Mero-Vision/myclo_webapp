import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { Box } from "@mui/material";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./MenuBox.css";

const MenuBox = () => {
   const sliderRef = useRef();
   const navigate = useNavigate();
   const { category } = useSelector((state) => state?.utils);
   console.log("ooaodasdjadjnas", { category });

   const slideCount = category?.data?.length || 0; // Get the length of category data or 0 if undefined

   const sliderSettings = {
      speed: 500,
      slidesToShow: Math.min(slideCount, 7), // Use the length of category data or 7, whichever is smaller
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      infinite: true,
      swipe: false,

      responsive: [
         {
            breakpoint: 1100,
            settings: {
               slidesToShow: Math.min(slideCount, 4),
            },
         },
         {
            breakpoint: 880,
            settings: {
               dots: true,
               slidesToShow: Math.min(slideCount, 3),
            },
         },
         {
            breakpoint: 695,
            settings: {
               dots: true,
               slidesToShow: Math.min(slideCount, 2),
            },
         },
         {
            breakpoint: 566,
            settings: {
               dots: true,
               slidesToShow: Math.min(slideCount, 2),
            },
         },
      ],
   };
   return (
      <Box className="sliderBoxContainer">
         <Box className="sliderBox">
            {category?.data?.length > 4 && (
               <div className=" ">
                  {/* <div className="arrowsMenuContainerCatParent"> */}
                  <div
                     onClick={() => sliderRef.current.slickPrev()}
                     className="arrowMenuButtonBoxCatL"
                  >
                     <KeyboardArrowLeftRoundedIcon className="arrowMenuButton" />
                  </div>
                  <div
                     onClick={() => sliderRef.current.slickNext()}
                     className="arrowMenuButtonBoxCatR"
                  >
                     <KeyboardArrowRightRoundedIcon className="arrowMenuButton" />
                  </div>
                  {/* </div> */}
               </div>
            )}
            <div className="menuPageBoxMenuWrap">
               <Box className="menuPageBoxMenuItemsBox">
                  <Slider
                     ref={sliderRef}
                     {...sliderSettings}
                     className="menuPageBoxMenuItems "
                  >
                     {category?.data?.map((item) => (
                        <div
                           onClick={() =>
                              navigate(`/categories/${item?.slug}`)
                           }
                           key={item.id}
                           className="menuItem"
                           style={{
                              display: "flex !important",
                              justifyContent: " center !important",
                              width: "100% !important",
                              alignItems: "center !important",
                           }}
                        >
                           <div
                              style={{
                                 display: "flex",
                                 justifyContent: "center",
                                 width: "100%",
                              }}
                           >
                              <img
                                 src={item?.category_image}
                                 alt="img"
                                 className="rounded-[8px]"
                                 style={{
                                    aspectRatio: "1 / 1",
                                    // height: "230px",
                                    // width: "230px",
                                    objectFit: "cover",
                                    textAlign: "center !important",
                                 }}
                              />
                           </div>
                           <div className="menuItemText">
                              <div className="titleFour mt-[16px] hover:text-[#E43131] transition duration-300 ease-in-out">
                                 {item?.name}
                              </div>
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

export default MenuBox;
