import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
   fileUploadContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem .5rem",
      cursor: "pointer",
      transition: "all .5s ease",
      borderRadius: "4px",
      border: "1px dotted #ddd",
   },
   filesContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingBlock: "0 1rem",
      cursor: "pointer",
      transition: "all .5s ease",
   },
   selectFile: {
      "& .MuiTypography-subtitle2": {
         color: "#496AD0 !important",
         textDecoration: "underline",
         "&:hover": {
            color: "#303f9f !important",
         },
      },
   },
   uploadIcon: {
      color: "#496AD0",
      fontSize: "2rem",
   },
   fileContainer: {
      maxHeight: "195px",
      overflowY: "auto",
   },
   fileSection: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingInline: ".5rem",
      "& .icon1, .icon2": {
         fontSize: "1rem",
         color: "#496AD0",
         marginTop: ".3rem",
      },
      "& .icon2": {
         cursor: "pointer",
      },
   },
   inputFileWrap: {
      border: "1px dashed #cacaca",
      padding: "25px",
      // width: "350px",
      width: "100%",
      height: "200px",
      background: "#fff",
      borderRadius: "4px",
      textAlign: "center",
      marginTop: "5px",
      "&.image-preview": {
         padding: "0",
      },
      "& svg": {
         fontSize: "36px",
         color: "#b9b8b8",
      },
      // "&.drag-active, &:focus, &:active": {
      //   borderColor: `${theme.palette.blue.active}`,
      // },
      "& .title": {
         fontSize: "14px",
         color: "#aaa",
         fontWeight: "500",
      },
      "& .or": {
         fontSize: "13px",
         color: "#aaa",
         marginBottom: "2px",
      },
      "& button": {
         background: "#665DD1",
         fontSize: "12px",
         fontWeight: "600",
         padding: "4px 10px",
         textTransform: "none",
         "&:hover, &:active": {
            background: "#665DD1",
            // color: "#ab003c",
         },
         // "&:active": {
         //   border: "1px solid #ab003c",
         // },
      },
      "& .image-container": {
         position: "relative",
         // width: "100px",
         top: "50%",
         left: "50%",
         transform: "translate(-50%, -50%)",
         cursor: "pointer",
         "& svg": {
            position: "absolute",
            top: "-1rem",
            right: "-3rem",
            fontSize: "20px",
            color: "grey",
            cursor: "pointer",
         },
         "& img": {
            width: "100%",
            // height: "120px",
            borderRadius: "4px",
            height: "192px",
            objectFit: "cover",
            // aspectRatio: "4/3",
         },
      },
   },
   inputFileWrapHeight: {
      border: "1px dashed #cacaca",
      padding: "25px",
      // width: "350px",
      width: "100%",
      height: "221px",
      background: "#fff",
      borderRadius: "4px",
      textAlign: "center",
      // marginTop: "5px",
      "&.image-preview": {
         padding: "0",
      },
      "& svg": {
         fontSize: "36px",
         color: "#b9b8b8",
      },
      // "&.drag-active, &:focus, &:active": {
      //   borderColor: `${theme.palette.blue.active}`,
      // },
      "& .title": {
         fontSize: "14px",
         color: "#2b6df8",
         fontWeight: "500",
      },
      "& .or": {
         fontSize: "13px",
         marginBottom: "2px",
      },
      "& button": {
         background: "#2b6df8",
         fontSize: "12px",
         fontWeight: "600",
         padding: "4px 10px",
         textTransform: "none",
         "&:hover, &:active": {
            background: "#2b6df8",
            // color: "#ab003c",
         },
         // "&:active": {
         //   border: "1px solid #ab003c",
         // },
      },
      "& .image-container": {
         position: "relative",
         // width: "100px",
         top: "50%",
         left: "50%",
         transform: "translate(-50%, -50%)",
         cursor: "pointer",
         "& svg": {
            position: "absolute",
            top: "-1rem",
            right: "-3rem",
            fontSize: "20px",
            color: "grey",
            cursor: "pointer",
         },
         "& img": {
            width: "100%",
            // height: "120px",
            height: "200px",
            objectFit: "cover",
            // aspectRatio: "4/3",
         },
      },
   },
}));

export default styles;
