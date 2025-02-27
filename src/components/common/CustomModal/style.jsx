import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
   paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      borderRadius: "3px",
      overflow: "hidden",
      boxShadow: theme.shadows[5],
      "&:focus-visible": {
         outline: "none",
      },
   },
   modalHeader: {
      position: "sticky",
      top: 0,
      zIndex: 1000,
      backgroundColor: "#fff",
      padding: "11px 20px",
      color: "#496AD0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #ddd",

      "& svg": {
         color: "#496AD0 ",
         fontSize: "16px",
      },
      "& .MuiTypography-root": {
         fontSize: "14px",
         fontWeight: "700",
      },
   },
   modalHeaderNoTitle: {
      position: "sticky",
      top: 0,
      zIndex: 1000,
      backgroundColor: "#fff",
      padding: "11px 20px",
      color: "#496AD0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
   },
   modalTitle: {
      display: "flex",
      alignItems: "center",
      columnGap: "1rem",
   },
   icon: {
      background: theme.palette.background.dark,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      padding: "5px",
   },
   rotate: {
      // transition: "all 0.3s ease",
      // transform: "rotate(0deg)", // Initial rotation value
      // "&:hover": {
      //   transform: "rotate(90deg)", // Rotation value on hover
      // },
   },
}));

export default styles;
