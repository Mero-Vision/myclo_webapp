import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavModalDetails = ({ row }) => {
   const navigate = useNavigate();
   const [searchTerm, setSearchTerm] = useState("");
   const [debouncedTerm, setDebouncedTerm] = useState("");
   const [filteredData, setFilteredData] = useState([]);

   // Debounce logic
   useEffect(() => {
      const handler = setTimeout(() => {
         setDebouncedTerm(searchTerm);
      }, 300); // 300ms debounce delay

      return () => {
         clearTimeout(handler);
      };
   }, [searchTerm]);

   // Filter data based on debounced search term
   useEffect(() => {
      if (row?.data) {
         const sortedData = [...row.data].sort((a, b) =>
            a.name.localeCompare(b.name)
         ); // Sort alphabetically before filtering

         const results = sortedData.filter((item) =>
            item?.name
               ?.toLowerCase()
               .includes(debouncedTerm.toLowerCase())
         );

         setFilteredData(results);
      }
   }, [debouncedTerm, row?.data]);

   return (
      <Box
         sx={{
            width: "315px",
            // padding: "10px",
         }}
      >
         {/* Search Input */}
         {row?.data && (
            <div
               style={{ position: "relative", marginBottom: "10px" }}
            >
               <input
                  type="text"
                  placeholder="Search Brands"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                     width: "100%",
                     padding: "6px 35px 6px 40px",
                     fontSize: "13px",
                     border: "1px solid #508bc7",
                     borderRadius: "50px",
                     outline: "none",
                  }}
               />
               <SearchRoundedIcon
                  size={18}
                  style={{
                     position: "absolute",
                     left: "10px",
                     top: "50%",
                     transform: "translateY(-50%)",
                     cursor: "pointer",
                     color: "#343434",
                     fontSize: "16px",
                  }}
                  onClick={() => setSearchTerm("")}
               />
               {searchTerm && (
                  <div>
                     <CloseRoundedIcon
                        size={18}
                        style={{
                           position: "absolute",
                           right: "10px",
                           top: "50%",
                           transform: "translateY(-50%)",
                           cursor: "pointer",
                           color: "#fff",
                           backgroundColor: "#ccc",
                           fontSize: "18px",
                           padding: "2px",
                           borderRadius: "50px",
                        }}
                        onClick={() => setSearchTerm("")}
                     />
                  </div>
               )}
            </div>
         )}

         <Box
            sx={{
               minHeight: "400px",
               maxHeight: "400px",
               overflowY: "auto",
               marginTop: "20px",
            }}
         >
            {/* Filtered Results */}
            {row?.data ? (
               filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                     <Box
                        onClick={() => navigate(item?.url || "")}
                        key={index}
                        sx={{
                           display: "flex",
                           alignItems: "start",
                           flexDirection: "column",
                           padding: "6px 14px",
                           cursor: "pointer",
                           transition: "0.1s ease-in-out",
                           borderRadius: "4px",
                           width: "fit-content",
                           "& .line": {
                              width: "0%",
                              height: "1px",
                              backgroundColor: "#343434",
                              transition: "width 0.3s ease-in-out",
                              transformOrigin: "left",
                           },
                           "&:hover .line": {
                              width: "100%",
                           },
                        }}
                     >
                        <div
                           style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                              paddingBottom: "8px",
                           }}
                        >
                           <img
                              src={item?.brand_image}
                              alt="img"
                              style={{
                                 width: "30px",
                                 height: "30px",
                                 objectFit: "cover",
                                 border: "0.5px solid #eee",
                                 borderRadius: "3px",
                              }}
                           />
                           <div
                              style={{
                                 width: "100%",
                                 fontWeight: 400,
                                 fontSize: "16px",
                                 color: "#343434",
                                 lineHeight: 1,
                                 marginBottom: "4px",
                              }}
                           >
                              {item?.name}
                           </div>
                        </div>
                        <div className="line"></div>
                     </Box>
                  ))
               ) : (
                  <Box
                     sx={{
                        fontSize: "12px",
                        color: "#343434",
                        paddingTop: "100px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                     }}
                  >
                     <SearchRoundedIcon sx={{ fontSize: "16px" }} />
                     <div>
                        Result for {`"${searchTerm}"`} not found.
                     </div>
                  </Box>
               )
            ) : (
               <Box
                  sx={{
                     fontSize: "12px",
                     color: "#343434",
                     // paddingTop: "100px",
                     width: "100%",
                     height: "100%",
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     gap: "4px",
                  }}
               >
                  <SearchRoundedIcon sx={{ fontSize: "16px" }} />
                  <div>Opps! no Brands found.</div>
               </Box>
            )}
         </Box>
      </Box>
   );
};

export default NavModalDetails;
