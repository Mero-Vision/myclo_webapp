import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { mainApi } from "./mainApi";

const localArray = ["access_token", "refresh_token", "user"];
export const authSlice = createSlice({
   name: "auth",
   initialState: {},
   reducers: {
      auth: (state, action) => action.payload,
      logout: (state, action) => {
         localArray?.map((item) => localStorage.removeItem(item));
      },
   },
});

export const { auth, logout } = authSlice.actions;
export const authApi = mainApi.injectEndpoints({
   tagTypes: ["Login", "Signup"],
   endpoints: (builder) => ({
      login: builder.mutation({
         query: (data) => ({
            url: `/api/login`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: ["Login"],
         onSuccess: (response, variables, context) => {
            context.dispatch(auth(response));
            console.log({ context });
         },
      }),
      signup: builder.mutation({
         query: (data) => ({
            url: `/api/signup`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: ["Signup"],
         onSuccess: (response, variables, context) => {
            context.dispatch(auth(response));
            console.log({ context });
         },
      }),
   }),
});

export const { useLoginMutation, useSignupMutation } = authApi;

export const refreshAccessToken = async () => {
   const refresh_token = localStorage.getItem("refresh_token");

   try {
      const response = await axios.post(
         `${
            import.meta.env.VITE_BASE_URL
         }/api/refresh-token/${refresh_token}`
      );

      if (response?.data) {
         localStorage.setItem(
            "access_token",
            response?.data?.data?.token
         );

         localStorage.setItem(
            "refresh_token",
            response?.data?.data?.refresh_token
         );
      }
   } catch (err) {
      console.log({ err });
   }
};
