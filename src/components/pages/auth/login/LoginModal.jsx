import { yupResolver } from "@hookform/resolvers/yup";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Button, CircularProgress, Grid } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { auth, useLoginMutation } from "../../../../api/authApi";
import loginImage from "../../../../assets/login/loginBgImg.svg";
import { CustomInputDefault } from "../../../common/CustomInputs/CustomInputDefault";
import customToaster from "../../../common/CustomToasters/CustomToaster";
const validationSchema = yup.object().shape({
   email: yup.string().required("Email is required"),
   password: yup.string().required("Password is required"),
});

const LoginModal = ({ handleClose }) => {
   const {
      control,
      formState: { errors },
      handleSubmit,
      reset,
   } = useForm({ resolver: yupResolver(validationSchema) });

   const navigate = useNavigate();
   const [login, { isLoading, isSuccess, data: successData }] =
      useLoginMutation();

   useEffect(() => {
      if (successData) {
         customToaster({
            message: successData?.message,
            type: "Success",
         });
         handleClose();
      }
   }, [successData]);

   useEffect(() => {
      if (isSuccess) {
         reset({
            email: "",
            password: "",
         });
      }
   }, [isSuccess, reset]);

   const dispatch = useDispatch();

   const onSubmit = async (values) => {
      const finalValues = {
         ...values,
      };

      login(finalValues)
         ?.unwrap()
         .then((res) => {
            const auth_token = res?.data?.token;
            const refresh_token = res?.data?.refresh_token;
            const user = res?.data?.user;

            localStorage.setItem("access_token", auth_token || "");
            localStorage.setItem(
               "refresh_token",
               refresh_token || ""
            );
            localStorage.setItem("user", JSON.stringify(user) || "");

            dispatch(auth(res?.data));

            navigate("/");
         })
         .catch((rejected) => console.log({ rejected }));
   };
   return (
      <div className="relative">
         <div
            onClick={() => handleClose()}
            className="w-[30px] h-[30px] rounded-[50px] flex justify-center items-center bg-[#ccc] absolute top-[16px] right-[16px] cursor-pointer"
         >
            <CloseRoundedIcon
               sx={{ color: "#fff", fontSize: "22px" }}
            />
         </div>
         <Grid container spacing={0}>
            <Grid
               item
               sm={12}
               md={6}
               className="bg-[#E9E9E9] px-[20px] py-[40px] md:px-[50px] md:py-[100px] flex justify-center w-[100%]"
            >
               <img
                  src={loginImage}
                  alt="loginImage"
                  className="w-[80%] h-auto lg:w-[100%] lg:h-auto"
               />
            </Grid>
            <Grid
               item
               sm={12}
               md={6}
               className="bg-[#fff] flex flex-col h-[100%] justify-center items-center text-center md:text-start px-[20px] py-[40px] md:px-[50px] md:py-[100px] w-[100%]"
            >
               <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-[100%]"
                  style={{ height: "fit-content" }}
               >
                  <div className="">
                     <div className="">
                        <div className="text-[22px] font-[500] mb-[20px]">
                           Login
                        </div>
                     </div>
                     <div className="mb-[20px]">
                        <div className="py-[10px]">
                           <CustomInputDefault
                              control={control}
                              errors={errors}
                              name="email"
                              type={"email"}
                              placeholder={"Email"}
                              // title="Email Address"
                              loginInput
                           />
                        </div>

                        <div className="py-[10px]">
                           <CustomInputDefault
                              control={control}
                              errors={errors}
                              name="password"
                              type={"password"}
                              // title="Password"
                              placeholder={"Password"}
                              loginInput
                           />
                        </div>
                     </div>

                     <div
                        onClick={() => navigate("/forgot-password")}
                        className="mb-[5px] flex justify-end text-[12px] font-[500] cursor-pointer"
                     >
                        Forgot Password?
                     </div>

                     <div className="mb-[20px]">
                        <Button
                           type="submit"
                           sx={{
                              width: "100%",
                              height: "44px !important",
                              backgroundColor: "#0D74D6 !important",
                              borderRadius: "4px",
                              color: "#fff",
                              textTransform: "capitalize",
                              "&:hover": {
                                 backgroundColor:
                                    "#0D74D6 !important",
                              },
                           }}
                        >
                           {isLoading && (
                              <CircularProgress
                                 size="1rem"
                                 sx={{
                                    marginRight: "10px",
                                    color: "#fff",
                                 }}
                              />
                           )}
                           Login
                        </Button>{" "}
                     </div>
                     <div className="text-[14px] font-[400] flex justify-center">
                        Don&apos;t have an Account?{" "}
                        <span
                           className="text-[14px] ml-[5px] font-[400] text-[#0D74D6] cursor-pointer"
                           onClick={() => navigate(`/signup`)}
                        >
                           {" "}
                           Sign Up
                        </span>
                     </div>
                  </div>
               </form>
            </Grid>
         </Grid>
      </div>
   );
};

export default LoginModal;
