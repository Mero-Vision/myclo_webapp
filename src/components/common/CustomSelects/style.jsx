import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  creatableSelectAdd: {
    color: "#fff",
    background: "#4E8AF4",
    position: "sticky",
    bottom: 0,
    zIndex: 100,
    fontWeight: 600,
    display: "flex",
    justifyContent: "center",
    transition: "150ms all ease-in-out",
    cursor: "pointer",
    padding: "5px",
    "&:hover": {
      background: "#4C7CE5",
    },
  },
}));
export default styles;
