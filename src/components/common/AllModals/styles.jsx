import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
   totalBoxContainer: {
      padding: "15px 25px",
      background: "#E4FAFC",
      height: "100%",
      borderRadius: "4px",
      "& .MuiTypography-root": { fontSize: "13px" },
   },
   totalItems: {
      display: "flex",
      flexDirection: "column",
      rowGap: "10px",
   },
   singleItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& .MuiOutlinedInput-root": {
         background: "none !important",
         borderColor: "#339AA2 !important",
         width: "5rem",
      },
      "& input": {
         paddingBlock: "2px !important",
         textAlign: "end",
      },
   },
   grandTotal: {
      color: "#589797",
      "& .MuiTypography-root": {
         fontWeight: 600,
      },
   },
}));

export default styles;
