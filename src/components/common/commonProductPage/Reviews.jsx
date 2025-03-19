import { yupResolver } from "@hookform/resolvers/yup";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { Divider } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import {
   useGetProductSingleQuery,
   usePostReviewMutation,
} from "../../../api/siteSlice";
import noUserIcon from "../../../assets/noUser.jpg";
import { isLoggedIn } from "../../../utils/IsLoggedIn";
import { CustomInputDefault } from "../CustomInputs/CustomInputDefault";
import CustomButton from "../customButton/CustomButton";
const schema = Yup.object().shape({
   review: Yup.string().required("Review is required"),
});
const Reviews = ({ product }) => {
   const { slug } = useParams();
   const { refetch: productSingleRefetch } =
      useGetProductSingleQuery(slug);
   const {
      control,
      formState: { errors },
      reset,
      handleSubmit,
   } = useForm({ resolver: yupResolver(schema) });
   const [review, setReview] = useState("");
   const [hoverRating, setHoverRating] = useState(0); // Track hover state

   const [rating, setRating] = useState(0);
   const [
      postReview,
      {
         error: reviewError,
         isLoading: isReviewLoading,
         isSuccess: isReviewSuccess,
         data: successData,
      },
   ] = usePostReviewMutation();

   const handleRatingChange = (newRating) => {
      setRating(newRating);
   };

   const onSubmit = (data) => {
      const payload = {
         review: data?.review,
         rating,
         product_id: product?.id,
      };
      postReview(payload);
   };

   // Reset form fields on successful post
   useEffect(() => {
      if (isReviewSuccess) {
         reset({ review: "" });
         setRating(0);
         setHoverRating(0);
         productSingleRefetch();
      }
   }, [isReviewSuccess, reset]);

   return (
      <div>
         <h1 className="mb-[40px] text-[20px] font-[500] text-[#434343]">
            Product Reviews
         </h1>

         {product?.review_count && (
            <div className="flex flex-col gap-[10px]">
               <div className="flex flex-row items-center gap-[20px]">
                  <div className="text-[68px] font-[400]">
                     {Number(product?.average_rating)?.toFixed(1)}
                  </div>
                  <StarOutlinedIcon sx={{ color: " gold" }} />
               </div>
               <div className="flex flex-row text-[14px] gap-[4px]">
                  {" "}
                  <span>{product?.review_count}</span> Count
               </div>
            </div>
         )}
         <Divider sx={{ margin: "20px 0px" }} />
         {isLoggedIn() && (
            <form
               onSubmit={handleSubmit(onSubmit)}
               className="md:w-[80%] w-[100%]"
            >
               <div className="mb-[20px]">
                  <label className="pr-[10px] text-[16px]">
                     Rating:
                  </label>
                  {[1, 2, 3, 4, 5].map((star) => (
                     <StarOutlinedIcon
                        key={star}
                        onClick={() => handleRatingChange(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        sx={{
                           cursor: "pointer",
                           color:
                              star <= (hoverRating || rating)
                                 ? "gold"
                                 : "gray",
                           fontSize: "32px",
                           transition: "color 0.2s",
                           "&:hover": {
                              color: "gold",
                           },
                        }}
                     />
                  ))}
               </div>
               <div>
                  <CustomInputDefault
                     control={control}
                     errors={errors}
                     name="review"
                     placeholder={
                        "Write your review about the product..."
                     }
                     // title={"Review"}
                     rows={"2"}
                     required
                  />
               </div>

               <CustomButton
                  loading={isReviewLoading}
                  error={reviewError}
                  success={isReviewSuccess}
                  successData={successData}
                  buttonName={"Submit"}
               />
            </form>
         )}

         <div>
            <div className="text-[20px] font-[500] mt-[30px] mb-[20px]">
               Customer Reviews
            </div>
            {product?.review?.length !== 0 ? (
               product?.review?.map((item, index) => {
                  const parsedDate = moment(
                     item?.created_at,
                     "YYYY-MM-DD hh:mm a"
                  );

                  const formattedDate =
                     parsedDate.format(" MMMM D, YYYY");
                  return (
                     <div
                        key={index}
                        className="flex flex-row  justify-between py-[20px] px-[10px] bg-[#eee] mb-[20px] rounded-[8px]"
                     >
                        <div className="flex flex-row">
                           <div className="min-w-[70px] ">
                              <img
                                 src={
                                    item?.user?.profile_image
                                       ? item?.user?.profile_image
                                       : noUserIcon
                                 }
                                 alt=""
                                 className="w-[50px] h-[50px] rounded-[50%] object-cover"
                              />
                           </div>
                           <div>
                              <div className="flex flex-row gap-[10px] mb-[10px]">
                                 <div className="text-[18px] font-[500] mb-[8px]">
                                    {item?.user?.name}
                                 </div>
                                 <div className="bg-[#5FA5FC] rounded-[50px] py-[2px] px-[10px] text-[14px] text-[#fff] w-fit flex items-center gap-[6px]">
                                    <StarOutlinedIcon
                                       sx={{
                                          fontSize: "20px",
                                          color: "gold",
                                       }}
                                    />
                                    {item?.rating}
                                 </div>
                              </div>
                              <div className="text-[15px] font-[400] mb-[8px] pr-[20px]">
                                 {item?.review}
                              </div>
                           </div>
                        </div>
                        <div className="min-w-[120px]">
                           {formattedDate}
                        </div>
                     </div>
                  );
               })
            ) : (
               <div className="text-[14px] font-[400] text-[#aaa] flex justify-center">
                  No reviews available
               </div>
            )}
         </div>
      </div>
   );
};

export default Reviews;
