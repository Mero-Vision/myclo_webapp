import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
   root: {
      "& .MuiDataGrid-root": {
         border: "none !important",
         background: "#fcfcfc ",
      },
      "& .MuiTablePagination-selectLabel": {
         fontSize: "12px !important",
      },
      "& .MuiTablePagination-input": {
         fontSize: "12px !important",
      },
      "& .MuiTablePagination-displayedRows": {
         fontSize: "12px !important",
      },
      "& .MuiDataGrid-columnHeaders": {
         borderBlock: "1px solid #9D9CAF !important",
         borderRadius: "0px",
      },
      "& .MuiDataGrid-columnHeader": {
         outline: "none !important",
      },
      "& .MuiDataGrid-columnSeparator": {
         display: "none !important",
      },
      "& .MuiDataGrid-columnHeaderTitleContainer": {
         textTransform: "uppercase",
         fontSize: "12px",
         paddingBlock: "0px !important",
      },
      "& .MuiDataGrid-columnHeaderTitle": {
         fontWeight: "600",
      },
      "& .MuiDataGrid-cell, & .MuiDataGrid-footerContainer, & .MuiButtonBase-root ":
         {
            fontSize: "12px",
         },
   },
}));

export default styles;
