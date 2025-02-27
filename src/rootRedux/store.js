import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../api/authApi";
import { mainApi } from "../api/mainApi";
import utilsSlice from "./utilsSlice";

export const store = configureStore({
   reducer: {
      // Add the API reducer to the store
      utils: utilsSlice,
      auth: authSlice.reducer,

      [mainApi.reducerPath]: mainApi.reducer,
   },
   // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
         mainApi.middleware
      ),
});
