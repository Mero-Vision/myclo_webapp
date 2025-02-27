import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { auth } from "./api/authApi";
import {
   useGetBrandQuery,
   useGetCategoryQuery,
   useGetProductsQuery,
   useGetSiteSettingsQuery,
} from "./api/siteSlice";
import LazyLoadPage from "./components/common/lazyLoadPage/LazyLoadPage";
import { setDynamicArrayData } from "./rootRedux/utilsSlice";
import RouteList from "./routes/RouteList";
import ErrorBoundary from "./utils/ErrorBoundary";
import { getToken } from "./utils/helpers";

const App = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(auth(getToken()));
   }, [dispatch]);
   const {
      data: category,
      isFetching: categoryFetching,
      isLoading: categoryLoading,
   } = useGetCategoryQuery();

   const {
      data: brand,
      isFetching: brandFetching,
      isLoading: brandLoading,
   } = useGetBrandQuery();
   const {
      data: siteSettings,
      isFetching: siteSettingsFetching,
      isLoading: siteSettingsLoading,
   } = useGetSiteSettingsQuery();
   const {
      data: products,
      isFetching: productsFetching,
      isLoading: productsLoading,
   } = useGetProductsQuery();
   // ---------------------storing in redux---------------
   useEffect(() => {
      category?.data &&
         dispatch(
            setDynamicArrayData({
               data: category?.data,
               loading: categoryLoading,
               fetching: categoryFetching,
               type: "category",
            })
         );
   }, [category?.data]);

   useEffect(() => {
      brand?.data &&
         dispatch(
            setDynamicArrayData({
               data: brand?.data,
               loading: brandLoading,
               fetching: brandFetching,
               type: "brand",
            })
         );
   }, [brand?.data]);
   useEffect(() => {
      siteSettings &&
         dispatch(
            setDynamicArrayData({
               data: siteSettings,
               loading: siteSettingsLoading,
               fetching: siteSettingsFetching,
               type: "siteSettings",
            })
         );
   }, [siteSettings]);
   useEffect(() => {
      products?.data &&
         dispatch(
            setDynamicArrayData({
               data: products?.data,
               loading: productsLoading,
               fetching: productsFetching,
               type: "products",
            })
         );
   }, [products?.data]);

   const loading =
      categoryLoading || brandLoading || siteSettingsLoading;
   return (
      <ErrorBoundary>
         {loading ? <LazyLoadPage /> : <RouteList />}
         <ToastContainer position="bottom-right" />
      </ErrorBoundary>
   );
};

export default App;
