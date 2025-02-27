import { useRef } from "react";
import Slider from "react-slick";

const CustomSlider = ({ children, data }) => {
   const sliderRef = useRef();

   // const settings = {
   //    dots: false,
   //    infinite: false,
   //    slidesToShow: 1,
   //    slidesToScroll: 1,
   //    variableWidth: true,
   //    arrows: false,
   // };
   const settings = {
      speed: 500,
      // slidesToShow: 3,
      slidesToShow: data?.length >= 4 ? 4 : data?.length,
      slidesToScroll: 1,
      arrows: true,
      autoplay: false,
      pauseOnHover: true,
      autoplaySpeed: 2000,
      infinite: true,
      dots: true,
      responsive: [
         {
            breakpoint: 1111,
            settings: {
               slidesToShow: data?.length >= 3 ? 3 : data?.length,
            },
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: data?.length >= 2 ? 2 : data?.length,
            },
         },
         // {
         //    breakpoint: 768,
         //    settings: {
         //       slidesToShow: data?.length >= 2 ? 2 : data?.length,
         //    },
         // },
      ],
   };
   return (
      <div>
         {" "}
         <Slider {...settings} ref={sliderRef}>
            {children}
         </Slider>{" "}
      </div>
   );
};

export default CustomSlider;
