import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
   container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "#F9F9FB",
   },
   paper: {
      backgroundColor: "white",
      boxShadow: "0px 4px 5px 0px rgba(88, 144, 255, 0.07)",
      width: "500px",
      height: "400px",
      borderRadius: "2px",
   },
}));

export default styles;
