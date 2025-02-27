import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
   drawer: {
      paddingInline: "12px",
   },
   drawerHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      columnGap: "7px",
      width: "100%",
      "& img": {
         height: "35px",
         width: "35px",
         objectFit: "contain",
      },
   },
   drawerContent: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      paddingBlock: "1rem",
   },
   nav: {
      "& > a": {
         color: "#000",
         textDecoration: "none",
      },
   },
   activeClass: {
      color: "#3185d4 !important",
      fontWeight: "600",
      // backgroundColor: "#f2f9ff !important",
      "& > *": {
         borderLeft: "3px solid #3185d4 !important", // Red border for active class
         // borderBottom: "2px solid #3185d4 !important",
         backgroundColor: "#f2f9ff !important",
      },
      "& .MuiTypography-root": {
         fontWeight: "600 !important",
         // backgroundColor: "#f2f9ff !important",
      },
      "& svg": {
         color: "#3185d4 !important",
      },
   },
   inactiveClass: {
      color: "#000 !important",
      fontWeight: "600",
      "& > *": {
         borderLeft: "3px solid transparent !important", // Red border for active class
         // borderBottom: "2px solid #3185d4 !important",
      },
      "& .MuiTypography-root": {
         fontWeight: "600 !important",
      },
      "& svg": {
         color: "#000 !important",
      },
   },

   activeChildClass: {
      color: "#000 !important",
      background: "#F9F9FB !important",
      borderRadius: "5px !important",
      fontWeight: "bolder !important",
      position: "relative",
      "&::before": {
         content: '""',
         position: "absolute",
         top: "50%",
         left: "-8px",
         width: "9px",
         height: "1px",
         background: "#E5E5EB",
         zIndex: -1,
      },

      "& .MuiTypography-root": {
         fontWeight: "600",
      },
   },

   listItemButton: {
      justifyContent: "initial",
      paddingInline: "22px !important",
      paddingBlock: "8px !important",
      fontSize: "12px",
      // borderRadius: "4px !important",
   },
   listItemButtonChild: {
      justifyContent: "initial",
      paddingInline: "6px !important",
      paddingBlock: "2px !important",
      display: "flex",
      columnGap: "1rem",
      borderRadius: "5px !important",
      fontSize: "12px",
      "& svg": {
         fontSize: "small",
      },
   },

   childContainer: {
      width: "max-content",
      paddingTop: "12px",
      borderLeft: "1px solid #E5E5EB",
      marginInline: "20px",
      paddingInline: "8px",
   },
   iconButton: {
      borderRadius: "0 !important",
      "&:hover": {
         color: `#000 !important`,
         background: `gray !important`,
      },
   },

   addAllContainer: {
      display: "flex",
      columnGap: "3rem",
      padding: "1rem",
      justifyContent: "center",

      "& button": {
         color: "gray",
         "&:hover": {
            "& svg": {
               transition: "200ms all ease-in-out",
               color: "#000",
            },
         },
      },
   },
   title: {
      textTransform: "uppercase",
      marginBottom: "1rem",
      marginLeft: ".5rem",
   },
}));

export default useStyles;
