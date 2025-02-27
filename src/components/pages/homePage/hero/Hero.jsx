import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./Hero.css"; // Importing the CSS file

// Importing local images
import { useSelector } from "react-redux";

const Hero = () => {
   const { siteSettings } = useSelector((state) => state?.utils);
   console.log({ siteSettings });

   // Array with image objects
   const images = [
      { id: 1, image: siteSettings?.data?.home_page_banner_1 },
      { id: 2, image: siteSettings?.data?.home_page_banner_2 },
      { id: 3, image: siteSettings?.data?.home_page_banner_3 },
   ];

   // Slick slider settings
   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: false,
      customPaging: () => <div className="custom-dot"></div>,
      dotsClass: "slick-dots custom-dots",
      responsive: [
         {
            breakpoint: 1024, // For medium screens (tablet, desktop)
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               dots: true,
            },
         },
         {
            breakpoint: 720, // For small screens
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               dots: true,
            },
         },
      ],
   };

   return (
      <div className="containerWrap">
         <div className="containerBodyHero">
            <div className="hero-container">
               <Slider {...settings}>
                  {images.map((imageObj) => (
                     <div key={imageObj?.id} className="slide">
                        <img
                           src={imageObj?.image}
                           alt={`Hero Image ${imageObj?.id}`}
                           className="slide-image"
                        />
                     </div>
                  ))}
               </Slider>
            </div>
         </div>
      </div>
   );
};

export default Hero;
