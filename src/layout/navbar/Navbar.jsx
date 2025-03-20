import { Clear } from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../api/authApi";
import {
   useGetCartsQuery,
   useGetProductsQuery,
   useGetWishlistQuery,
} from "../../api/siteSlice";
import CustomDrawer from "../../components/common/CustomDrawer/CustomDrawer";
import CustomModal from "../../components/common/CustomModal/CustomModal";
import customToaster from "../../components/common/CustomToasters/CustomToaster";
import LoginModal from "../../components/pages/auth/login/LoginModal";
import { getSiteDetail } from "../../utils/helpers";
import { isLoggedIn } from "../../utils/IsLoggedIn";
import NavModalBox from "./modalBox/NavModalBox";
import WishlistDrawer from "./Wishlist";

const Navbar = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const location = useLocation();
   const { category } = useSelector((state) => state?.utils);
   const { products } = useSelector((state) => state?.utils);
   const { siteSettings } = useSelector((state) => state?.utils);
   const [loginModal, setLoginModal] = useState(false);
   const [showLeftArrow, setShowLeftArrow] = useState(false);
   const [showRightArrow, setShowRightArrow] = useState(true);
   const [isAtEnd, setIsAtEnd] = useState(false);
   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
   const [showDropdown, setShowDropdown] = useState(false);

   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const [dropdownProducts, setDropdownProducts] = useState([]);

   const isMobile = useMediaQuery("(max-width: 1048px)");
   const isTab = useMediaQuery("(max-width: 1275px)");
   const userData = getSiteDetail()?.userData;
   const isSearchPage = location.pathname.includes("search");

   const { data: cartsData } = useGetCartsQuery(
      {},
      {
         skip: !isLoggedIn(),
      }
   );
   const { data: wishlistData } = useGetWishlistQuery(
      {},
      {
         skip: !isLoggedIn(),
      }
   );

   const totalCartQuantity = cartsData?.length
      ? 0
      : cartsData?.data?.reduce(
           (sum, item) => sum + item.quantity,
           0
        );

   const handleWishlist = () => {
      if (isLoggedIn()) {
         setIsDrawerOpen(true); // Open the drawer when the icon is clicked
      } else {
         setLoginModal(true);
      }
   };

   const handleCart = () => {
      if (isLoggedIn()) {
         navigate(`/cart`);
      } else {
         setLoginModal(true);
      }
   };

   const categoryListRef = useRef(null);

   const isOverflowing = () => {
      const container = categoryListRef.current;
      return container
         ? container.scrollWidth > container.clientWidth
         : false;
   };

   const handleScroll = (direction) => {
      const container = categoryListRef.current;
      const scrollAmount = 200;

      if (container) {
         if (direction === "left") {
            container.scrollBy({
               left: -scrollAmount,
               behavior: "smooth",
            });
         } else {
            container.scrollBy({
               left: scrollAmount,
               behavior: "smooth",
            });
         }
         updateArrowVisibility();
      }
   };

   const updateArrowVisibility = () => {
      const container = categoryListRef.current;
      if (container) {
         const isAtStart = container.scrollLeft <= 0;
         const isAtEnd =
            container.scrollLeft + container.clientWidth >=
            container.scrollWidth - 1;

         setShowLeftArrow(!isAtStart);
         setShowRightArrow(!isAtEnd);
         setIsAtEnd(isAtEnd);
      }
   };

   useEffect(() => {
      const container = categoryListRef.current;
      if (container) {
         container.addEventListener("scroll", updateArrowVisibility);
         updateArrowVisibility();
         return () => {
            container.removeEventListener(
               "scroll",
               updateArrowVisibility
            );
         };
      }
   }, [category]);

   useEffect(() => {
      if (!isOverflowing()) {
         setShowLeftArrow(false);
         setShowRightArrow(false);
      }
   }, [category]);

   useEffect(() => {
      if (!isMobile && isSidebarOpen) {
         setIsSidebarOpen(false);
      }
   }, [isMobile, isSidebarOpen]);

   const toggleSidebar = (newOpen) => () => {
      setIsSidebarOpen(newOpen);
   };

   const handleNavigation = (path) => {
      setIsSidebarOpen(false);
      navigate(path);
   };

   const handleLogout = () => {
      dispatch(logout());
      navigate("/");
      setIsSidebarOpen(false);
      customToaster({
         message: "You have been successfully logged out.",
         type: "success",
      });
   };

   const DrawerList = (
      <Box
         sx={{
            width: 300,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
         }}
         role="presentation"
      >
         <div className="w-[100%]">
            <div className="p-[14px] border-b-[#ddd] border-b-[1px] flex justify-between items-center">
               <img
                  src={siteSettings?.data?.logo}
                  alt=""
                  className="w-[80px]  h-auto cursor-pointer "
                  onClick={() => handleNavigation(`/`)}
               />{" "}
               <div
                  onClick={toggleSidebar(false)}
                  className="p-[6px] bg-[#e9e9e9] rounded-[50%] duration-200 cursor-pointer flex text-center"
               >
                  <Clear sx={{ fontSize: "14px" }} />
               </div>
            </div>
            {isLoggedIn() && (
               <div className="p-[15px]  border-b-[#ddd] border-b-[1px] ">
                  <div className="mb-[8px]">
                     {" "}
                     <div className="text-[14px]">
                        Hello, {userData?.name?.split(" ")?.[0] || ""}
                     </div>
                  </div>
                  <button
                     onClick={() =>
                        handleNavigation("/my-account/dashboard")
                     }
                     className="flex flex-row gap-[8px] items-center"
                  >
                     <AccountCircleOutlinedIcon
                        style={{
                           fontSize: "20px",
                           cursor: "pointer",
                           color: "#000",
                        }}
                     />{" "}
                     My Account
                  </button>
               </div>
            )}
            <List>
               <div className="text-[14px] font-[500] px-[15px] pt-[6] pb-[8px]">
                  Shop by Categories
               </div>
               <div
                  style={{
                     height: "calc(100dvh - 240px)",
                     overflowY: "auto",
                  }}
                  className="flex flex-col "
               >
                  {category?.data?.map((item, index) => (
                     <div
                        onClick={() => {
                           navigate(`/categories/${item?.slug}`);
                           setIsSidebarOpen(false);
                        }}
                        key={index}
                        className="text-[12px] font-[400] py-[12px] px-[15px] border-b-[#ccc] border-b-[0.5px]"
                     >
                        {item?.name}
                     </div>
                  ))}
               </div>
            </List>
         </div>
         {isLoggedIn() ? (
            <button
               onClick={handleLogout}
               className="flex flex-row gap-[8px] items-center p-[15px]"
            >
               <ExitToAppOutlinedIcon
                  style={{
                     fontSize: "20px",
                     cursor: "pointer",
                     color: "#000",
                  }}
               />{" "}
               Logout
            </button>
         ) : (
            <button
               onClick={() => {
                  setLoginModal(true);
                  setIsSidebarOpen(false);
               }}
               className="flex flex-row gap-[8px] items-center p-[15px]"
            >
               <ExitToAppOutlinedIcon
                  style={{
                     fontSize: "20px",
                     cursor: "pointer",
                     color: "#000",
                  }}
               />{" "}
               Login
            </button>
         )}
      </Box>
   );

   const [width, setWidth] = useState(
      isTab ? "calc(100vw - 30px)" : "40vw"
   );

   useEffect(() => {
      const handleResize = () => {
         const screenWidth = window.innerWidth;

         if (screenWidth < 400) {
            setWidth("calc(100vw - 30px)");
         } else if (screenWidth < 500) {
            setWidth("calc(100vw - 100px)");
         } else if (screenWidth < 700) {
            setWidth("calc(100vw - 180px)");
         } else if (screenWidth < 1275) {
            setWidth("65vw");
         } else {
            setWidth(isTab ? "calc(100vw - 30px)" : "40vw");
         }
      };

      // Initial call to set width
      handleResize();

      // Add event listener for window resize
      window.addEventListener("resize", handleResize);

      // Cleanup event listener on unmount
      return () => window.removeEventListener("resize", handleResize);
   }, [isTab]);

   const [query, setQuery] = useState("");

   const [debouncedQuery, setDebouncedQuery] = useState(query);

   useEffect(() => {
      const timeoutId = setTimeout(() => {
         setDebouncedQuery(query);
      }, 500);

      return () => clearTimeout(timeoutId);
   }, [query]);

   const handleSearch = (e) => {
      e.preventDefault();
      if (query.trim()) {
         navigate(
            `/products/search?query=${encodeURIComponent(query)}`
         );
      }
      setShowDropdown(false);
   };

   console.log({ query });

   const params = {
      search_keyword: debouncedQuery,
   };

   const {
      data: productsData,
      isFetching: productsFetching,
      isLoading: productsLoading,
   } = useGetProductsQuery(params);

   useEffect(() => {
      if (debouncedQuery) {
         setDropdownProducts(productsData?.data?.slice(0, 4) || []);
      } else {
         setDropdownProducts(products?.data?.slice(0, 4) || []);
      }
   }, [debouncedQuery, productsData, products]);

   useEffect(() => {
      if (!isSearchPage) {
         setQuery("");
      }
   }, [isSearchPage]);

   const handleProductClick = (slug) => {
      navigate(`/products/${slug}`);
      setShowDropdown(false);
   };
   const inputRef = useRef(null);

   const [selectedIndex, setSelectedIndex] = useState(-1);

   useEffect(() => {
      if (inputRef.current) {
         inputRef.current.addEventListener("keydown", handleKeyDown);
      }
      return () => {
         if (inputRef.current) {
            inputRef.current.removeEventListener(
               "keydown",
               handleKeyDown
            );
         }
      };
   }, [showDropdown, dropdownProducts, selectedIndex]);
   const handleKeyDown = (e) => {
      if (showDropdown && dropdownProducts.length) {
         if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prevIndex) =>
               prevIndex < dropdownProducts.length - 1
                  ? prevIndex + 1
                  : prevIndex
            );
         } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prevIndex) =>
               prevIndex > 0 ? prevIndex - 1 : 0
            );
         } else if (e.key === "Enter" && selectedIndex !== -1) {
            e.preventDefault();
            handleProductClick(dropdownProducts[selectedIndex].slug);
            setSelectedIndex(-1);
         }
      }
   };

   console.log({ dropdownProducts });

   return (
      <div className="fixed w-[100%] z-50">
         <div
            style={{
               backgroundColor:
                  siteSettings?.data?.primary_nav_background_color ||
                  "#000",
               color:
                  siteSettings?.data?.primary_nav_text_color ||
                  "#fff",
               boxShadow: "0px 4px 4px -2px rgba(0, 0, 0, 0.16)",
            }}
            className={` py-[18px] lg:py-[20px] containerWrap`}
         >
            <div className="containerBody ">
               <div className="flex justify-between items-center relative">
                  <div className="block lg:hidden">
                     <MenuOutlinedIcon
                        style={{
                           fontSize: "28px",
                           cursor: "pointer",
                        }}
                        onClick={toggleSidebar(true)}
                     />
                  </div>
                  <div className="flex lg:gap-[40px] items-center justify-center">
                     <div className="text-[26px] cursor-pointer md:text-[32px] font-[600] flex lg:hidden items-center  lg:relative absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <img
                           src={siteSettings?.data?.logo}
                           alt=""
                           className="w-[70px] sm:w-[120px] h-auto cursor-pointer"
                           onClick={() => navigate(`/`)}
                        />{" "}
                     </div>
                     <div className="text-[32px] cursor-pointer font-[600]  items-center hidden lg:flex">
                        <img
                           src={siteSettings?.data?.logo}
                           alt=""
                           className="w-[120px] h-auto cursor-pointer"
                           onClick={() => navigate(`/`)}
                        />{" "}
                     </div>
                     <form
                        onSubmit={handleSearch}
                        className="flex relative"
                     >
                        <input
                           ref={inputRef}
                           style={{ border: "1px solid #ccc" }}
                           className="bg-[#fff] text-[#363636] px-5 py-3 rounded-l-md hidden lg:block lg:w-[300px] xl:w-[400px] outline-none border-none h-[43px]"
                           placeholder="What are you looking for today?"
                           type="text"
                           value={query}
                           onChange={(e) => setQuery(e.target.value)}
                           onFocus={() => setShowDropdown(true)}
                           onBlur={() =>
                              setTimeout(
                                 () => setShowDropdown(false),
                                 100
                              )
                           }
                        />
                        {query && (
                           <button
                              type="button"
                              onClick={() => setQuery("")}
                              className="hidden lg:block absolute right-[110px] top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                           >
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="h-5 w-5"
                                 viewBox="0 0 20 20"
                                 fill="currentColor"
                              >
                                 <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                 />
                              </svg>
                           </button>
                        )}

                        <button
                           type="submit"
                           className="submitBtn bg-black hidden lg:flex text-white rounded-r-md px-7 items-center cursor-pointer border-transparent h-[43px] hover:bg-[#333] transition duration-200 ease-in-out"
                        >
                           Search
                        </button>
                        {showDropdown && (
                           <>
                              {productsFetching ? (
                                 <div className="absolute flex justify-center text-center top-full left-0 w-full bg-white border border-gray-300 rounded-[4px] shadow-lg z-50 min-h-[168px]">
                                    <CircularProgress
                                       sx={{
                                          marginTop: "65px",
                                          width: "24px !important",
                                          height: "24px !important",
                                       }}
                                    />
                                 </div>
                              ) : (
                                 <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-[4px] shadow-lg z-50">
                                    {dropdownProducts?.length !==
                                    0 ? (
                                       dropdownProducts.map(
                                          (product, index) => (
                                             <div
                                                key={product.id}
                                                className={`px-[20px] py-[10px] hover:bg-gray-100 cursor-pointer text-[#000] w-[100%] text-[14px] border-b-[#ccc] border-b-[0.5px] ${
                                                   index ===
                                                   selectedIndex
                                                      ? "bg-gray-200"
                                                      : ""
                                                }`}
                                                onClick={() =>
                                                   handleProductClick(
                                                      product.slug
                                                   )
                                                }
                                             >
                                                {product.name}
                                             </div>
                                          )
                                       )
                                    ) : (
                                       <div className="flex justify-center items-center gap-[6px] min-h-[100px] text-[#000]">
                                          <WarningAmberOutlinedIcon
                                             sx={{ fontSize: "34px" }}
                                          />
                                          <div className="text-[16px] font-[400]">
                                             No match found
                                          </div>
                                       </div>
                                    )}
                                 </div>
                              )}
                           </>
                        )}
                     </form>
                  </div>
                  <div className="flex gap-[16px] items-center ">
                     {isLoggedIn() && (
                        <div className="text-[14px] hidden lg:block">
                           Hello,{" "}
                           {userData?.name?.split(" ")?.[0] || ""}
                        </div>
                     )}

                     <div className="hidden lg:block">
                        <NavModalBox
                           account
                           icon={
                              <AccountCircleOutlinedIcon
                                 style={{
                                    fontSize: "28px",
                                    cursor: "pointer",
                                    color: siteSettings?.data
                                       ?.primary_nav_text_color,
                                 }}
                              />
                           }
                           cat
                        />
                     </div>

                     {isLoggedIn() && (
                        <CustomDrawer
                           padding={" 0px 15px 15px 15px"}
                           width={
                              width
                              // isTab ? "calc(100vw - 30px)" : "40vw"
                           }
                           // width={"100%"}
                           // open={isLoggedIn() && isDrawerOpen} // Control drawer open/close
                           onClose={() => setIsDrawerOpen(false)} // Close drawer
                           component={
                              <Box
                                 sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    height: "100%",
                                 }}
                              >
                                 <div className="relative">
                                    <FavoriteBorderOutlinedIcon
                                       style={{
                                          fontSize: "28px",
                                          cursor: "pointer",
                                          color: siteSettings?.data
                                             ?.primary_nav_text_color,
                                       }}
                                    />
                                    {isLoggedIn() && (
                                       <div className="bg-[#343434] text-[#fff] w-[20px] h-[20px] rounded-[50px] top-[-8px] right-[-8px] absolute flex justify-center items-center text-[10px] lg:w-[26px] lg:h-[26px] lg:top-[-12px] lg:right-[-12px] lg:text-[12px]">
                                          {wishlistData?.data
                                             ?.length || "0"}
                                       </div>
                                    )}
                                    {/* {isLoggedIn() && (
                                       <div className="bg-[#343434] w-[26px] h-[26px] rounded-[50px] top-[-12px] right-[-12px] absolute flex justify-center items-center text-[12px]">
                                          {wishlistData?.data
                                             ?.length || "0"}
                                       </div>
                                    )} */}
                                 </div>
                              </Box>
                           }
                           drawer={<WishlistDrawer />} // Pass Wishlist component directly
                        />
                     )}
                     <div onClick={handleCart} className="pr-[5px]">
                        <div className="relative">
                           <ShoppingBagOutlinedIcon
                              style={{
                                 fontSize: "28px",
                                 cursor: "pointer",
                                 color: siteSettings?.data
                                    ?.primary_nav_text_color,
                              }}
                           />
                           {isLoggedIn() && (
                              <div className="bg-[#343434] text-[#fff] w-[20px] h-[20px] rounded-[50px] top-[-8px] right-[-8px] absolute flex justify-center items-center text-[10px] lg:w-[26px] lg:h-[26px] lg:top-[-12px] lg:right-[-12px] lg:text-[12px]">
                                 {totalCartQuantity || "0"}
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
               <style>
                  {`
               input::placeholder {
                 font-family: "Kumbh Sans", serif;
                  color: #aaa;
                  font-style: italic;
                  font-size: 14px;
               },
            `}
               </style>
            </div>
         </div>
         <div
            className="hidden lg:block"
            style={{
               boxShadow: "0px 4px 4px -2px rgba(0, 0, 0, 0.16)",
            }}
         >
            <div
               style={{
                  backgroundColor:
                     siteSettings?.data
                        ?.secondary_nav_background_color || "#000",
                  color:
                     siteSettings?.data?.secondary_nav_text_color ||
                     "#fff",
               }}
               className={` py-[10px] containerWrap border-t-[#ccc] border-[0.5px]`}
            >
               <div className="containerBody relative">
                  {showLeftArrow && (
                     <div
                        aria-label="Scroll left"
                        style={{
                           boxShadow:
                              "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                        }}
                        className="absolute left-[6px] top-1/2 transform -translate-y-1/2  bg-[#fff] pt-[0px] px-[6px] pb-[4px] cursor-pointer z-10 rounded-[50%]"
                        onClick={() => handleScroll("left")}
                     >
                        <ArrowBackIosNewOutlinedIcon
                           sx={{ color: "#343434", fontSize: "17px" }}
                        />
                     </div>
                  )}
                  <div
                     ref={categoryListRef}
                     className={`flex flex-row gap-[40px] overflow-x-auto scrollbar-hide  ${
                        showLeftArrow ? "ml-[30px]" : ""
                     }`}
                     style={{ scrollBehavior: "smooth" }}
                  >
                     {category?.data?.map((cat) => (
                        <div
                           key={cat.id}
                           className="cursor-pointer hover:underline whitespace-nowrap"
                           onClick={() =>
                              navigate(`/categories/${cat?.slug}`)
                           }
                        >
                           {cat.name}
                        </div>
                     ))}
                  </div>
                  {showRightArrow && (
                     <div
                        style={{
                           boxShadow:
                              "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                        }}
                        className={`absolute right-[6px] top-1/2 transform -translate-y-1/2 bg-[#fff] pt-[0px] px-[6px] pb-[4px] rounded-[50%] cursor-pointer z-10 ${
                           isAtEnd
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                        }`}
                        onClick={() =>
                           !isAtEnd && handleScroll("right")
                        }
                     >
                        <ArrowForwardIosOutlinedIcon
                           sx={{
                              color: "#343434",
                              fontSize: "18px",
                              height: "fit-content !important",
                           }}
                        />
                     </div>
                  )}
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
         <Drawer open={isSidebarOpen} onClose={toggleSidebar(false)}>
            {DrawerList}
         </Drawer>
      </div>
   );
};

export default Navbar;
