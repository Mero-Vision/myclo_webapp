import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link, useLocation } from "react-router-dom";

// Function to format breadcrumb text
const formatBreadcrumb = (text) => {
   return text
      .replace(/-/g, " ") // Replace hyphens with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
};

const CustomBreadCrumbs = ({ query, products }) => {
   const location = useLocation();
   const pathnames = location.pathname.split("/").filter((x) => x);

   // Extract query parameter if `query` prop is true
   const searchParams = new URLSearchParams(location.search);
   const queryValue = query ? searchParams.get("query") : null;

   // Filter out "products" and "search" from pathnames if `query` is true
   const filteredPathnames = query
      ? pathnames.filter(
           (path) => !["products", "search"].includes(path)
        )
      : pathnames;

   return (
      <div className="containerWrap border-[#eee] border-b-[1px] hidden md:flex">
         <div className="containerBody">
            <div role="presentation" className="py-[16px]">
               <Breadcrumbs aria-label="breadcrumb">
                  {/* Home link */}
                  <Link
                     to="/"
                     style={{
                        textDecoration: "none",
                        color: "#5FA5FC",
                        fontSize: "14px",
                     }}
                  >
                     Home
                  </Link>

                  {/* Render filtered pathnames */}
                  {filteredPathnames.map((path, index) => {
                     const href = `/${filteredPathnames
                        .slice(0, index + 1)
                        .join("/")}`;
                     const isLast =
                        index === filteredPathnames.length - 1;
                     const formattedText = formatBreadcrumb(path); // Format text

                     return isLast ? (
                        <Typography
                           key={href}
                           style={{
                              color: "#343434",
                              fontSize: "14px",
                           }}
                        >
                           {formattedText}
                        </Typography>
                     ) : (
                        <>
                           {query || products ? (
                              <div
                                 style={{
                                    textDecoration: "none",
                                    color: "#343434",
                                    fontSize: "14px",
                                 }}
                              >
                                 {formattedText}
                              </div>
                           ) : (
                              <Link
                                 key={href}
                                 to={href}
                                 style={{
                                    textDecoration: "none",
                                    color: "#5FA5FC",
                                    fontSize: "14px",
                                 }}
                              >
                                 {formattedText}
                              </Link>
                           )}
                        </>
                     );
                  })}

                  {/* Conditionally render query value if `query` prop is true */}
                  {query && queryValue && (
                     <Typography
                        style={{
                           color: "#343434",
                           fontSize: "14px",
                        }}
                     >
                        {formatBreadcrumb(queryValue)}
                     </Typography>
                  )}
               </Breadcrumbs>
            </div>
         </div>
      </div>
   );
};

export default CustomBreadCrumbs;
