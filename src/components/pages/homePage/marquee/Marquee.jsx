import React from "react";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MarqueeComp = () => {
   const navigate = useNavigate();
   const { brand } = useSelector((state) => state?.utils);

   return (
      <Marquee autoFill>
         <div
            style={{
               padding: "40px",
               display: "flex",
               gap: "80px", // Optional, for spacing between <h1> elements
            }}
         >
            {brand?.data?.map((item, index) => (
               <div
                  key={index}
                  className="flex items-center cursor-pointer"
                  onClick={() => navigate(`/brand/${item?.slug}`)}
               >
                  <img
                     src={item?.brand_image}
                     alt="img"
                     className="h-auto w-[100px] lg:h-fit"
                  />
               </div>
            ))}
         </div>
      </Marquee>
   );
};

export default MarqueeComp;
