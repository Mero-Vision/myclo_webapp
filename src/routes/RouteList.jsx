import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../components/common/404";
import LazyLoadPage from "../components/common/lazyLoadPage/LazyLoadPage";
import Protected from "../components/common/protected";
import Login from "../components/pages/auth/login";
import Signup from "../components/pages/auth/signup";
import Dashboard from "../components/pages/protectedPages/myAccount/dashboard/Dashboard";
import MyAccount from "../components/pages/protectedPages/myAccount/MyAccount";
import MyOrders from "../components/pages/protectedPages/myAccount/myOrders/MyOrders";
import MyProfile from "../components/pages/protectedPages/myAccount/myProfile/MyProfile";
import Products from "../components/pages/protectedPages/myAccount/products/Products";
import ShippingDetail from "../components/pages/protectedPages/myAccount/shippingDetail/ShippingDetail";
import MainSiteLayout from "../layout/MainSiteLayout";
import RedirectLayout from "../layout/RedirectLayout";
import ProtectedRoutes from "./ProtectedRoutes";

const RouteList = () => {
   const routeList = [...ProtectedRoutes];

   const HomePage = lazy(() =>
      import("../components/pages/homePage/HomePage")
   );
   const ProductPage = lazy(() =>
      import("../components/pages/productPage/ProductPage")
   );
   const TermsPage = lazy(() =>
      import(
         "../components/pages/termsAndConditionsPage/TermsAndConditions"
      )
   );
   const PrivacyPage = lazy(() =>
      import("../components/pages/privacyPolicyPage/PrivacyPolicy")
   );
   const SearchPage = lazy(() =>
      import("../components/pages/searchPage/SearchPage")
   );
   const CategoryProductsPage = lazy(() =>
      import(
         "../components/pages/categoryProductsPage/CategoryProductsPage"
      )
   );
   const BrandProductsPage = lazy(() =>
      import(
         "../components/pages/brandProductsPage/BrandProductsPage"
      )
   );

   return (
      <Routes>
         <Route path="/" element={<MainSiteLayout />}>
            {routeList?.map(({ path, component }) => {
               return (
                  <Route key={path} path={path} element={component} />
               );
            })}
         </Route>
         <Route path="/" element={<MainSiteLayout />}>
            <Route
               index
               element={
                  <Suspense fallback={<LazyLoadPage />}>
                     <HomePage />
                  </Suspense>
               }
            />
            <Route
               path="/products/:slug"
               element={
                  <Suspense fallback={<LazyLoadPage />}>
                     <ProductPage />
                  </Suspense>
               }
            />
            <Route
               path="/terms-and-conditions"
               element={
                  <Suspense fallback={<LazyLoadPage />}>
                     <TermsPage />
                  </Suspense>
               }
            />
            <Route
               path="/privacy-policy"
               element={
                  <Suspense fallback={<LazyLoadPage />}>
                     <PrivacyPage />
                  </Suspense>
               }
            />
            <Route
               path="/products/search"
               element={
                  <Suspense fallback={<LazyLoadPage />}>
                     <SearchPage />
                  </Suspense>
               }
            />
            <Route
               path="/categories/:slug"
               element={
                  <Suspense fallback={<LazyLoadPage />}>
                     <CategoryProductsPage />
                  </Suspense>
               }
            />
            <Route
               path="/brands/:slug"
               element={
                  <Suspense fallback={<LazyLoadPage />}>
                     <BrandProductsPage />
                  </Suspense>
               }
            />
            <Route
               path="/my-account"
               element={
                  <Protected>
                     <MyAccount />{" "}
                  </Protected>
               }
            >
               <Route index element={<Navigate to="dashboard" />} />
               <Route
                  path="dashboard"
                  element={
                     <Protected>
                        <Dashboard />{" "}
                     </Protected>
                  }
               />
               <Route
                  path="my-profile"
                  element={
                     <Protected>
                        <MyProfile />{" "}
                     </Protected>
                  }
               />
               <Route
                  path="my-orders"
                  element={
                     <Protected>
                        <MyOrders />{" "}
                     </Protected>
                  }
               />
               <Route
                  path="my-products"
                  element={
                     <Protected>
                        <Products />{" "}
                     </Protected>
                  }
               />
               <Route
                  path="shipping-details"
                  element={
                     <Protected>
                        <ShippingDetail />{" "}
                     </Protected>
                  }
               />
            </Route>
         </Route>
         <Route element={<RedirectLayout />}>
            <Route path="*" element={<NotFound />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
         </Route>{" "}
      </Routes>
   );
};

export default RouteList;
