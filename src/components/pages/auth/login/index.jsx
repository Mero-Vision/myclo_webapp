import { yupResolver } from "@hookform/resolvers/yup";
import {
   Box,
   Button,
   CircularProgress,
   Grid,
   Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import loginBgImg from "../../../../assets/login/loginBgImg.svg";
import "./styles.css";

import { auth, useLoginMutation } from "../../../../api/authApi";
import { CustomInputDefault } from "../../../common/CustomInputs/CustomInputDefault";
import customToaster from "../../../common/CustomToasters/CustomToaster";
import ScrollToTop from "../../../common/scrollToTop/ScrollToTop";

const validationSchema = yup.object().shape({
   email: yup.string().required("Email is required"),
   password: yup.string().required("Password is required"),
});

const Login = ({ modal }) => {
   return (
      <>
         <ScrollToTop />
         <div className="containerWrap bg-[#fff]">
            <div className="containerBody">
               <div
                  className={`py-[50px] md:py-[0px] min-h-[100%] ${
                     modal ? "md:min-h-[100%]" : "md:min-h-[90dvh]"
                  }  flex items-center`}
               >
                  <Grid
                     container
                     spacing={0}
                     className="bg-[#E9E9E9] border-[#E9E9E9] border-[2px] h-[auto] lg:min-h-[520px]"
                  >
                     <Grid
                        item
                        sm={12}
                        md={6}
                        className={`px-[40px] ${
                           modal ? " py-[10px]" : " py-[60px]"
                        }`}
                     >
                        <div className="flex flex-col justify-between h-[100%]">
                           <img
                              src={loginBgImg}
                              alt="bgImg"
                              style={{
                                 width: "600px",
                                 height: "auto",
                              }}
                           />
                        </div>
                     </Grid>
                     <Grid
                        item
                        sm={12}
                        md={6}
                        className="bg-[#E9E9E9] "
                        style={{
                           width: "100%",
                           display: "flex",
                           alignItems: "center",
                        }}
                     >
                        <LoginForm />
                     </Grid>
                  </Grid>
               </div>
            </div>
         </div>
      </>
   );
};

export default Login;

const LoginForm = () => {
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
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="w-[100%]"
         style={{ height: "fit-content" }}
      >
         <Box className="mainDiv">
            <Box className="formDiv">
               <Box className="form">
                  <Box className="formTitleDiv">
                     <Box className="formTitle">Login</Box>
                  </Box>
                  <Box>
                     <Box>
                        <CustomInputDefault
                           control={control}
                           errors={errors}
                           name="email"
                           type={"email"}
                           title="Email Address"
                           loginInput
                        />
                     </Box>

                     <Box mt={"24px"} mb={"10px"}>
                        <CustomInputDefault
                           control={control}
                           errors={errors}
                           name="password"
                           type={"password"}
                           title="Password"
                           loginInput
                        />
                     </Box>
                  </Box>
                  <Box sx={{ textAlign: "end !important" }}>
                     <Typography
                        onClick={() => navigate("/forgot-password")}
                        sx={{
                           color: "#0D74D6",
                           fontSize: "12px",
                           cursor: "pointer",

                           "&:hover": {
                              textDecoration: "underline",
                              color: "#0064E1",
                           },
                        }}
                     >
                        Forgot Password?
                     </Typography>
                  </Box>
                  <Box className="buttonDiv" mt={"25px"} mb={"25px"}>
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
                              backgroundColor: "#0D74D6 !important",
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
                  </Box>
                  <div className="text-[14px] font-[400]">
                     Don&apos;t have an Account?{" "}
                     <span
                        className="text-[14px] font-[400] text-[#0D74D6] cursor-pointer"
                        onClick={() => navigate(`/signup`)}
                     >
                        {" "}
                        Sign Up
                     </span>
                  </div>
               </Box>
            </Box>
         </Box>
      </form>
   );
};
