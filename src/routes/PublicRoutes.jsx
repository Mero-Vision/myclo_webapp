import { Route, Routes } from "react-router-dom";
// import LandingPage from "../components/landingPage/LandingPage";
import { lazy, Suspense } from "react";
import NotFound from "../components/common/404";
import LazyLoadPage from "../components/common/lazyLoadPage/LazyLoadPage";
import Login from "../components/pages/auth/login";
import Signup from "../components/pages/auth/signup";
import MainSiteLayout from "../layout/MainSiteLayout";
import RedirectLayout from "../layout/RedirectLayout";

const HomePage = lazy(() =>
   import("../components/pages/homePage/HomePage")
);
const ProductPage = lazy(() =>
   import("../components/pages/productPage/ProductPage")
);

const PublicRoutes = () => {
   return (
      <Routes>
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
         </Route>

         <Route element={<RedirectLayout />}>
            <Route path="*" element={<NotFound />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
         </Route>
      </Routes>
   );
};

export default PublicRoutes;
