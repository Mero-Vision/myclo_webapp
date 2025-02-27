import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
   root: {
      marginBottom: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "start",
      "& .MuiTabs-flexContainer": {
         columnGap: "24px",
      },
      "& .MuiTabs-root": {
         minHeight: "0 !important",
      },
      "& .MuiTab-root": {
         // color: "#6C6B80 !important",
         minHeight: "0 !important",
         fontWeight: 600,
         padding: "10px",
      },
      "& .Mui-selected": {
         // color: "#6259CA !important",
         minHeight: "0 !important",
         fontWeight: 600,
      },
      "& .MuiTabs-indicator": {
         // background: "#6259CA !important",
         margin: 0,
         height: "3px",
      },

      "& .MuiAvatar-img": {
         width: "22px !important",
         height: "22px",
      },
      "& .MuiAvatar-root": {
         width: "22px !important",
      },
   },
   rightSide: {
      display: "flex",
      columnGap: "18px",
      "& button": {
         padding: "9px 11px",
         height: "34px",
      },
      "& .MuiInputBase-root": {
         borderColor: "#D1D1DB !important",
         "&:hover": {
            borderColor: "#9D9CAF !important",
         },
      },
      "& input": {
         paddingLeft: "0 !important",
         padding: "7px 11px !important",
      },
   },
   treeViewContainer: {
      border: "2px solid #d1d1db",
      borderRadius: "4px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "5px",
      transition: "250ms all ease-in-out",
      cursor: "pointer",
      "&:hover": {
         borderColor: "#9D9CAF !important",
      },
   },
   tree: {
      display: "flex",
      alignItems: "center",
      transition: "100ms all ease-in-out",
      columnGap: "5px",
   },
}));

export default useStyles;
