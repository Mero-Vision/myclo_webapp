import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
   styledMenuItem: {
      "& .MuiTypography-body1": {
         fontSize: 12,
      },
      "& .MuiListItemIcon-root": {
         fontSize: ".5rem",
      },
      "& .MuiSvgIcon-fontSizeSmall": {
         fontSize: "1rem",
      },
   },
   menu: {
      "& .MuiList-padding": {
         padding: "0 !important",
      },
   },
   listItemText: {
      fontSize: "14px",
   },
}));
export default styles;
