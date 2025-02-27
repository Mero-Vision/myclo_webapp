import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
import { getToken } from "../utils/helpers";
const baseQuery = fetchBaseQuery({
   baseUrl: import.meta.env.VITE_BASE_URL,
   prepareHeaders: (headers) => {
      const token = getToken()?.access_token;
      if (token) {
         headers?.set("Authorization", `Bearer ${token}`);

         headers?.set("Accept", "application/json");

         return headers;
      } else {
         headers?.set("Accept", "application/json");
      }
   },
});

export const customBaseQuery = () => {
   const baseQueryWithReauth = async (args, api, extraOptions) => {
      let result = await baseQuery(args, api, extraOptions);

      console.log({ apiiiiiiiiiiiiiiii: api, result, args });
      if (
         result?.error ||
         result?.error?.status === 401 ||
         result?.error?.status === 400
      ) {
         toast.error(result?.error?.data?.message);
      }
      return result;
   };
   return baseQueryWithReauth;
};
