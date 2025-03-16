import { Search } from "@mui/icons-material";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import { Avatar, Box, Tab, Tabs, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomUniInput } from "../components/common/CustomInputs/CustomUniInput";
import { setSearch } from "../rootRedux/utilsSlice";
import styles from "./styles";

const useTabs = ({
   data,
   button,
   cashInOut,
   isAccount,
   hideSearch,
   searchTitle,
}) => {
   const classes = styles();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [value, setValue] = useState();

   useEffect(() => {
      setValue(data?.[0]?.value);
   }, [data?.[0]?.value]);

   const {
      control,
      formState: { errors },
      watch,
      reset,
   } = useForm({
      defaultValues: {
         search_keyword: "",
      },
   });
   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   useEffect(() => {
      const timeout = setTimeout(() => {
         dispatch(setSearch(watch("search_keyword")));
      }, [1000]);
      return () => clearTimeout(timeout);
   }, [watch("search_keyword")]);

   const tabsComponent = () => {
      return (
         <Box className={classes.root}>
            <Box>
               {cashInOut && <Box>{cashInOut}</Box>}

               <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  variant="scrollable"
                  scrollButtons="auto"
                  allowScrollButtonsMobile
                  sx={{
                     "& .MuiTab-root": {
                        color: "#6C6B80 !important",
                        textTransform: "capitalize !important",
                     },

                     "& .Mui-selected": {
                        color: "#6259CA !important",
                     },
                     "& .MuiTabs-indicator": {
                        background: "#6259CA !important",
                     },
                     "& .MuiSvgIcon-root": {
                        fontSize: "17px !important",
                     },
                  }}
               >
                  {data?.map((item, index) => (
                     <Tab
                        key={index}
                        value={item?.value}
                        // icon={item?.icon}
                        icon={
                           item?.src ? (
                              <Avatar
                                 variant="square"
                                 alt="test avatar"
                                 src={item?.src}
                              />
                           ) : (
                              item?.icon
                           )
                        }
                        iconPosition={item?.position || "start"}
                        label={item?.label}
                     />
                  ))}
               </Tabs>
            </Box>

            <Box className={classes.rightSide}>
               {!hideSearch && (
                  <>
                     <Box sx={{ width: "250px" }}>
                        {/* <CustomInput
                           productSearch={productSearch}
                           control={control}
                           errors={errors}
                           name="search_keyword"
                           placeholder={
                              searchTitle ? searchTitle : "Search"
                           }
                           startIcon={<Search />}
                        /> */}
                        <CustomUniInput
                           control={control}
                           errors={errors}
                           name="search_keyword"
                           placeholder={
                              searchTitle ? searchTitle : "Search"
                           }
                           startIcon={
                              <Search
                                 sx={{
                                    fontSize: "18px",
                                 }}
                              />
                           }
                        />
                     </Box>
                  </>
               )}
               {isAccount && (
                  <Tooltip title="Tree View">
                     <Box
                        className={classes.treeViewContainer}
                        onClick={() => navigate("tree-view")}
                     >
                        <AccountTreeOutlinedIcon />
                     </Box>
                  </Tooltip>
               )}
               {button && <Box>{button}</Box>}
            </Box>
         </Box>
      );
   };

   return {
      value,
      Tabs: tabsComponent(),
      setTab: setValue,
   };
};

export default useTabs;

// import { Search } from "@mui/icons-material";
// import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
// import { Avatar, Box, Tab, Tabs, Tooltip } from "@mui/material";
// import { useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { CustomInput } from "../components/common/CustomInputs/CustomInput";
// import { setSearch } from "../rootRedux/utilsSlice";
// import styles from "./styles";

// const useTabs = ({
//    data,
//    button,
//    cashInOut,
//    isAccount,
//    hideSearch,
//    searchTitle,
//    productSearch,
//    pos,
// }) => {
//    const classes = styles();
//    const dispatch = useDispatch();
//    const navigate = useNavigate();
//    const [value, setValue] = useState();
//    const [scrollPos, setScrollPos] = useState(0);
//    const tabsRef = useRef(null);

//    useEffect(() => {
//       setValue(data?.[0]?.value);
//    }, [data?.[0]?.value]);

//    const {
//       control,
//       formState: { errors },
//       watch,
//       reset,
//    } = useForm({
//       defaultValues: {
//          search_keyword: "",
//       },
//    });

//    const handleScroll = () => {
//       setScrollPos(tabsRef.current.scrollLeft);
//    };

//    const handleChange = (event, newValue) => {
//       setValue(newValue);
//    };

//    useEffect(() => {
//       const timeout = setTimeout(() => {
//          dispatch(setSearch(watch("search_keyword")));
//       }, 1000);
//       return () => clearTimeout(timeout);
//    }, [watch("search_keyword")]);

//    const tabsComponent = () => {
//       return (
//          <Box className={classes.root}>
//             <Box>
//                {cashInOut && <Box>{cashInOut}</Box>}

//                <Tabs
//                   ref={tabsRef}
//                   value={value}
//                   onChange={handleChange}
//                   textColor="secondary"
//                   indicatorColor="secondary"
//                   variant="scrollable"
//                   scrollButtons="auto"
//                   allowScrollButtonsMobile
//                   onScroll={handleScroll}
//                   sx={{
//                      "& .MuiTab-root": {
//                         color: "#6C6B80 !important",
//                         textTransform: "capitalize !important",
//                      },
//                      "& .Mui-selected": {
//                         color: "#6259CA !important",
//                      },
//                      "& .MuiTabs-indicator": {
//                         background: "#6259CA !important",
//                      },
//                      "& .MuiSvgIcon-root": {
//                         fontSize: "17px !important",
//                      },
//                      "& .MuiTabs-scrollButtons.Mui-disabled": {
//                         display: scrollPos === 0 ? "none" : "flex",
//                      },
//                   }}
//                >
//                   {data?.map((item, index) => (
//                      <Tab
//                         key={index}
//                         value={item?.value}
//                         icon={
//                            item?.src ? (
//                               <Avatar
//                                  variant="square"
//                                  alt="test avatar"
//                                  src={item?.src}
//                               />
//                            ) : (
//                               item?.icon
//                            )
//                         }
//                         iconPosition={item?.position || "start"}
//                         label={item?.label}
//                      />
//                   ))}
//                </Tabs>
//             </Box>

//             <Box className={classes.rightSide}>
//                {!hideSearch && (
//                   <>
//                      <Box>
//                         <CustomInput
//                            productSearch={productSearch}
//                            control={control}
//                            errors={errors}
//                            name="search_keyword"
//                            placeholder={
//                               searchTitle ? searchTitle : "Search"
//                            }
//                            startIcon={<Search />}
//                         />
//                      </Box>
//                   </>
//                )}
//                {isAccount && (
//                   <Tooltip title="Tree View">
//                      <Box
//                         className={classes.treeViewContainer}
//                         onClick={() => navigate("tree-view")}
//                      >
//                         <AccountTreeOutlinedIcon />
//                      </Box>
//                   </Tooltip>
//                )}
//                {button && <Box>{button}</Box>}
//             </Box>
//          </Box>
//       );
//    };

//    return {
//       value,
//       Tabs: tabsComponent(),
//       setTab: setValue,
//    };
// };

// export default useTabs;
