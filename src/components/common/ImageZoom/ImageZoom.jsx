// import ImageZoom from "react-image-zoom";
// const ZoomableImage = ({ image }) => {
//    // Replace 'imageUrl' with the actual URL of the image you want to display
//    const imageUrl = image;
//    const zoomProps = {
//       width: 400, // The width of the zoomed image
//       height: 450, // The height of the zoomed image
//       zoomWidth: 200, // The width of the zoom window
//       img: imageUrl, // The URL of the image to display
//       scale: 1, // The scale factor for the zoomed image
//       objectFit: "cover",
//       marginLeft: "10px",
//       paddingLeft: "10px",
//    };

//    return (
//       <div
//          className="helo"
//          style={{
//             border: "0.5px solid #aaa",
//          }}
//       >
//          {/* The ImageZoom component wraps the image and adds the zoom effect */}
//          <ImageZoom {...zoomProps} />
//       </div>
//    );
// };

// export default ZoomableImage;

// import React, { useState } from "react";
// import Zoom from "react-medium-image-zoom";
// import "react-medium-image-zoom/dist/styles.css";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";
// import "./ImageZoom.css";

// const ProductImageZoom = ({ images }) => {
//    const [selectedImage, setSelectedImage] = useState(
//       images?.[0]?.product_image
//    );

//    const settings = {
//       infinite: true,
//       slidesToShow: images?.length > 4 ? 4 : images?.length,
//       slidesToScroll: 1,
//       arrows: true,
//       speed: 500,
//       adaptiveHeight: true,
//       lazyLoad: "ondemand", // Fix lazy loading issue
//       prevArrow: <div className="custom-slick-prev">{"<"}</div>, // Custom prev arrow
//       nextArrow: <div className="custom-slick-next">{">"}</div>, // Custom next arrow
//    };

//    return (
//       <div className="flex flex-col items-center max-w-[275] sm:max-w-[350px] md:w-[full] md:max-w-[500px] mx-auto">
//          {/* Main Image with Zoom */}
//          <Zoom>
//             <img
//                src={selectedImage}
//                alt="Product"
//                className="w-[275px] h-[275px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] object-cover border border-gray-200 rounded-lg"
//             />
//          </Zoom>

//          {/* Thumbnail Slider */}
//          <div className="w-full mt-4">
//             <Slider
//                {...settings}
//                key={images.length}
//                className="overflow-hidden"
//             >
//                {images.map((img, index) => (
//                   <div
//                      key={index}
//                      className="p-2 flex justify-center "
//                      style={{ width: "fit-content" }}
//                   >
//                      <img
//                         src={img?.product_image}
//                         alt={`Thumbnail ${index + 1}`}
//                         className={`w-[80px] h-[80px] object-cover cursor-pointer border-2 transition-all duration-300 ${
//                            selectedImage === img?.product_image
//                               ? "border-red-500 scale-110"
//                               : "border-gray-300"
//                         } rounded-md`}
//                         onClick={() =>
//                            setSelectedImage(img?.product_image)
//                         }
//                      />
//                   </div>
//                ))}
//             </Slider>
//          </div>
//       </div>
//    );
// };

// export default ProductImageZoom;

// ------------------------------------------------

import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

const ProductImageZoom = ({ images, selectedVarient }) => {
   const allImages =
      images?.map((item) => ({
         image: item?.product_image,
      })) || [];

   const varientImage = selectedVarient?.product_varient_images?.[0]
      ?.product_image
      ? [
           {
              image: selectedVarient.product_varient_images[0]
                 .product_image,
           },
        ]
      : [];

   const allImagesWithVarient = [...varientImage, ...allImages];

   const [selectedImage, setSelectedImage] = useState(
      allImagesWithVarient.length > 0
         ? allImagesWithVarient[0].image
         : null
   );

   useEffect(() => {
      // When selectedVarient changes, update selectedImage to varientImage (if available) or fallback to first image
      if (varientImage.length > 0) {
         setSelectedImage(varientImage[0].image);
      } else if (allImages.length > 0) {
         setSelectedImage(allImages[0].image);
      }
   }, [selectedVarient, images]); // Depend on selectedVarient to trigger updates

   const [zoom, setZoom] = useState(false);
   const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
   const scrollRef = useRef(null);
   const [canScrollLeft, setCanScrollLeft] = useState(false);
   const [canScrollRight, setCanScrollRight] = useState(false);

   const handleMouseMove = (e) => {
      const { left, top, width, height } =
         e.target.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setCursorPos({ x, y });
   };

   const scrollThumbnails = (direction) => {
      if (scrollRef.current) {
         const scrollAmount = 100;
         scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
         });
      }
   };

   const checkScrollButtonsVisibility = () => {
      if (scrollRef.current) {
         const scrollLeft = scrollRef.current.scrollLeft;
         const scrollWidth = scrollRef.current.scrollWidth;
         const clientWidth = scrollRef.current.clientWidth;

         setCanScrollLeft(scrollLeft > 0);
         setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
      }
   };

   useEffect(() => {
      checkScrollButtonsVisibility();

      if (scrollRef.current) {
         scrollRef.current.addEventListener(
            "scroll",
            checkScrollButtonsVisibility
         );
      }

      return () => {
         if (scrollRef.current) {
            scrollRef.current.removeEventListener(
               "scroll",
               checkScrollButtonsVisibility
            );
         }
      };
   }, [images]);

   return (
      <div className="flex flex-col gap-4 w-full">
         {/* Image Preview with Cursor Zoom */}
         <div
            className="relative w-[100%] h-[350px] sm:h-[450px] md:w-[100%] md:h-[550px] lg:h-[600px] xl:h-[630px] 2xl:h-[680px] lg:w-full overflow-hidden border rounded-lg"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
            onMouseMove={handleMouseMove}
         >
            <img
               src={selectedImage}
               alt="Product"
               className={`w-[100%] h-[100%] object-contain transition-transform duration-300 ${
                  zoom ? "scale-[3]" : "scale-100"
               }`}
               style={{
                  transformOrigin: `${cursorPos.x}% ${cursorPos.y}%`,
               }}
            />
         </div>

         {/* Thumbnail Slider with Scroll Buttons */}
         <div className="relative w-full max-w-[100%] flex items-center">
            {/* Left Scroll Button */}
            {canScrollLeft && (
               <button
                  className="absolute left-[-10px] z-10 bg-white p-2 rounded-full shadow-md hidden md:flex"
                  onClick={() => scrollThumbnails("left")}
               >
                  <KeyboardArrowLeftOutlinedIcon
                     size={24}
                     sx={{ color: " #5FA5FC" }}
                  />
               </button>
            )}

            {/* Scrollable Thumbnails */}
            <div
               ref={scrollRef}
               className="flex gap-2 overflow-x-auto pl-[0px] py-2 pr-2 scrollbar-hide scroll-smooth"
               style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
               }}
            >
               {allImagesWithVarient?.map((img, index) => (
                  <img
                     key={index}
                     src={img?.image}
                     alt="Thumbnail"
                     className={`min-w-20 max-w-20 h-[100px] object-contain border-[1px] rounded-lg cursor-pointer transition-all duration-300 ${
                        selectedImage === img?.image
                           ? "border-[#5FA5FC]"
                           : "border-[#eee]"
                     } hover:scale-105`}
                     onClick={() => setSelectedImage(img?.image)}
                  />
               ))}
            </div>

            {/* Right Scroll Button */}
            {canScrollRight && (
               <button
                  className="absolute right-0 z-10 bg-white p-2 rounded-full shadow-md hidden md:flex"
                  onClick={() => scrollThumbnails("right")}
               >
                  <KeyboardArrowRightOutlinedIcon
                     size={24}
                     sx={{ color: " #5FA5FC" }}
                  />
               </button>
            )}
         </div>
      </div>
   );
};

ProductImageZoom.propTypes = {
   images: PropTypes.arrayOf(
      PropTypes.shape({
         product_image: PropTypes.string.isRequired,
      })
   ),
   selectedVarient: PropTypes.shape({
      product_varient_images: PropTypes.arrayOf(
         PropTypes.shape({
            product_image: PropTypes.string.isRequired,
         })
      ),
   }),
};

export default ProductImageZoom;

// ------------------------------------------------

// import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
// import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
// import { useEffect, useRef, useState } from "react";

// const ProductImageZoom = ({ images }) => {
//    const [selectedImage, setSelectedImage] = useState(
//       images?.[0]?.product_image
//    );
//    const [zoom, setZoom] = useState(false);
//    const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
//    const scrollRef = useRef(null);
//    const [canScrollLeft, setCanScrollLeft] = useState(false);
//    const [canScrollRight, setCanScrollRight] = useState(false);
//    const isDragging = useRef(false);
//    const startX = useRef(0);
//    const scrollLeftStart = useRef(0);

//    const handleMouseMove = (e) => {
//       const { left, top, width, height } =
//          e.target.getBoundingClientRect();
//       const x = ((e.clientX - left) / width) * 100;
//       const y = ((e.clientY - top) / height) * 100;
//       setCursorPos({ x, y });
//    };

//    const scrollThumbnails = (direction) => {
//       if (scrollRef.current) {
//          const scrollAmount = 100;
//          scrollRef.current.scrollBy({
//             left: direction === "left" ? -scrollAmount : scrollAmount,
//             behavior: "smooth",
//          });
//       }
//    };

//    const checkScrollButtonsVisibility = () => {
//       if (scrollRef.current) {
//          const scrollLeft = scrollRef.current.scrollLeft;
//          const scrollWidth = scrollRef.current.scrollWidth;
//          const clientWidth = scrollRef.current.clientWidth;

//          setCanScrollLeft(scrollLeft > 0);
//          setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
//       }
//    };

//    // Handle Drag Scroll
//    const handleDragStart = (e) => {
//       isDragging.current = true;
//       startX.current = e.pageX || e.touches[0].pageX;
//       scrollLeftStart.current = scrollRef.current.scrollLeft;
//    };

//    const handleDragMove = (e) => {
//       if (!isDragging.current) return;
//       e.preventDefault();
//       const x = e.pageX || e.touches[0].pageX;
//       const walk = (startX.current - x) * 1.5; // Adjust sensitivity
//       scrollRef.current.scrollLeft = scrollLeftStart.current + walk;
//    };

//    const handleDragEnd = () => {
//       isDragging.current = false;
//    };

//    useEffect(() => {
//       checkScrollButtonsVisibility();
//       if (scrollRef.current) {
//          scrollRef.current.addEventListener(
//             "scroll",
//             checkScrollButtonsVisibility
//          );
//       }
//       return () => {
//          if (scrollRef.current) {
//             scrollRef.current.removeEventListener(
//                "scroll",
//                checkScrollButtonsVisibility
//             );
//          }
//       };
//    }, [images]);

//    return (
//       <div className="flex flex-col gap-4 w-full">
//          {/* Image Preview with Cursor Zoom */}
//          <div
//             className="relative w-full sm:h-[450px] md:w-[100%] md:h-[350px] lg:w-full lg:h-[480px] overflow-hidden border rounded-lg"
//             onMouseEnter={() => setZoom(true)}
//             onMouseLeave={() => setZoom(false)}
//             onMouseMove={handleMouseMove}
//          >
//             <img
//                src={selectedImage}
//                alt="Product"
//                className={`w-full h-full object-cover transition-transform duration-300 ${
//                   zoom ? "scale-[3]" : "scale-100"
//                }`}
//                style={{
//                   transformOrigin: `${cursorPos.x}% ${cursorPos.y}%`,
//                }}
//             />
//          </div>

//          {/* Thumbnail Slider with Scroll Buttons & Dragging */}
//          <div className="relative w-full max-w-[100%] flex items-center">
//             {/* Left Scroll Button */}
//             {canScrollLeft && (
//                <button
//                   className="absolute left-[-10px] z-10 bg-white p-2 rounded-full shadow-md hidden md:flex"
//                   onClick={() => scrollThumbnails("left")}
//                >
//                   <KeyboardArrowLeftOutlinedIcon
//                      size={24}
//                      sx={{ color: " #5FA5FC" }}
//                   />
//                </button>
//             )}

//             {/* Scrollable Thumbnails with Dragging */}
//             <div
//                ref={scrollRef}
//                className="flex gap-2 overflow-x-auto pl-[0px] py-2 pr-2 scrollbar-hide scroll-smooth cursor-pointer"
//                style={{
//                   scrollbarWidth: "none",
//                   msOverflowStyle: "none",
//                }}
//                onMouseDown={handleDragStart}
//                onMouseMove={handleDragMove}
//                onMouseUp={handleDragEnd}
//                onMouseLeave={handleDragEnd}
//                onTouchStart={handleDragStart}
//                onTouchMove={handleDragMove}
//                onTouchEnd={handleDragEnd}
//             >
//                {images?.map((img, index) => (
//                   <img
//                      key={index}
//                      src={img?.product_image}
//                      alt="Thumbnail"
//                      className={`w-20 h-20 object-cover border-2 rounded-lg cursor-pointer transition-all duration-300 ${
//                         selectedImage === img?.product_image
//                            ? "border-blue-500"
//                            : "border-gray-300"
//                      } hover:scale-110`}
//                      onClick={() =>
//                         setSelectedImage(img?.product_image)
//                      }
//                   />
//                ))}
//             </div>

//             {/* Right Scroll Button */}
//             {canScrollRight && (
//                <button
//                   className="absolute right-0 z-10 bg-white p-2 rounded-full shadow-md hidden md:flex"
//                   onClick={() => scrollThumbnails("right")}
//                >
//                   <KeyboardArrowRightOutlinedIcon
//                      size={24}
//                      sx={{ color: " #5FA5FC" }}
//                   />
//                </button>
//             )}
//          </div>
//       </div>
//    );
// };

// export default ProductImageZoom;
