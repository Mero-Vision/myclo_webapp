import { Delete } from "@mui/icons-material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Grid } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import ImageUploading from "react-images-uploading";

const MultiImageUpload = ({
   control,
   name,
   title,
   errors,
   setValue,
   defaultValue = [],
   classnames = "",
   clearErrors,
   required = false,
   height,
}) => {
   const maxNumber = 69;

   return (
      <div className={classnames}>
         {title && (
            <div
               style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5px",
               }}
            >
               <label style={{ fontSize: "12px", fontWeight: "500" }}>
                  {title}
               </label>
               <span style={{ color: "red", fontSize: "12px" }}>
                  {required && " *"}
               </span>
            </div>
         )}
         <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={{
               required: required ? "This field is required" : false,
            }}
            render={({ field }) => (
               <ImageUploading
                  multiple
                  value={field.value}
                  onChange={(imageList) => {
                     field.onChange(imageList);
                     setValue(name, imageList);
                     clearErrors && clearErrors(name);
                  }}
                  maxNumber={maxNumber}
                  dataURLKey="data_url"
                  acceptType={["jpg", "jpeg", "png", "webp"]} // Allow multiple formats
               >
                  {({
                     imageList,
                     onImageUpload,
                     onImageRemoveAll,
                     onImageUpdate,
                     onImageRemove,
                     isDragging,
                     dragProps,
                  }) => (
                     <div
                        className="upload__image-wrapper"
                        style={{ position: "relative" }}
                     >
                        {imageList.length > 0 && (
                           <button
                              style={{
                                 position: "absolute",
                                 zIndex: "10",
                                 top: "-28px",
                                 right: "0px",
                                 padding: "4px 6px",
                                 border: "none",
                                 backgroundColor: "#e3193a",
                                 color: "#fff",
                                 borderRadius: "4px",
                                 display: "flex",
                                 alignItems: "center",
                                 gap: "6px",
                                 cursor: "pointer",
                              }}
                              type="button"
                              onClick={onImageRemoveAll}
                           >
                              <Delete sx={{ fontSize: "14px" }} />
                              <div style={{ fontSize: "11px" }}>
                                 Remove all images
                              </div>
                           </button>
                        )}
                        <div
                           onClick={onImageUpload}
                           style={{
                              border: "1px dashed #aaa",
                              width: "100%",
                              borderRadius: "4px",
                              height: "130px",
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                           }}
                           {...dragProps}
                        >
                           <div
                              style={{
                                 display: "flex",
                                 flexDirection: "column",
                                 justifyContent: "center",
                                 width: "100%",
                                 alignItems: "center",
                              }}
                           >
                              <AddPhotoAlternateOutlinedIcon
                                 sx={{
                                    fontSize: "70px",
                                    color: "#aaa",
                                 }}
                              />
                              <div
                                 style={
                                    isDragging
                                       ? {
                                            color: "red",
                                            width: "fit-content",
                                         }
                                       : {
                                            width: "fit-content",
                                            color: "#aaa",
                                         }
                                 }
                              >
                                 Click or Drop here
                              </div>
                           </div>
                        </div>
                        <Grid
                           container
                           spacing={0}
                           sx={{ marginTop: "20px" }}
                        >
                           {imageList.map((image, index) => (
                              <Grid
                                 key={index}
                                 item
                                 xs={2}
                                 sx={{
                                    width: "100%",
                                    marginBottom: "20px",
                                 }}
                              >
                                 <div
                                    className="image-item"
                                    style={{
                                       width: "100%",
                                       height: "100%",
                                       padding: "0px 6px",
                                       position: "relative",
                                    }}
                                 >
                                    <img
                                       src={image.data_url}
                                       alt=""
                                       style={{
                                          width: "100%",
                                          height: "100%",
                                          objectFit: "cover",
                                       }}
                                    />
                                    <div className="image-item__btn-wrapper">
                                       {/* <button
                                    type="button"
                                    onClick={() =>
                                       onImageUpdate(index)
                                       }
                                       >
                                       Update
                                       </button> */}
                                       <button
                                          type="button"
                                          onClick={() =>
                                             onImageRemove(index)
                                          }
                                          style={{
                                             position: "absolute",
                                             top: "-10px",
                                             right: "-4px",
                                             backgroundColor:
                                                "#e3193a",
                                             color: "#fff",
                                             padding: "4px",
                                             borderRadius: "50px",
                                             border: "none",
                                             display: "flex",
                                             alignItems: "center",
                                             cursor: "pointer",
                                             overflow: "hidden",
                                          }}
                                       >
                                          <CloseOutlinedIcon
                                             sx={{
                                                fontSize: "12px",
                                                color: "#fff",
                                             }}
                                          />
                                       </button>
                                    </div>
                                 </div>
                              </Grid>
                           ))}
                        </Grid>
                     </div>
                  )}
               </ImageUploading>
            )}
         />
         {errors[name] && (
            <span className="error">{errors[name].message}</span>
         )}
      </div>
   );
};

export default MultiImageUpload;
