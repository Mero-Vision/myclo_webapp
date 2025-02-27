import { mainApi } from "./mainApi";

export const siteApi = mainApi.injectEndpoints({
   tagTypes: [
      "site-settings",
      "Category",
      "ProductCategory",
      "Brand",
      "Products",
      "ProductSingle",
      "Carts",
      "Wishlist",
      "Order",
      "ShippingDetails",
      "Orders",
      // -------------------------
      "influencer-categories",
      "contact",
      "blogs",
      "BlogsSingle",
      "faq",
      "featured-influencers",
      "single-gallery",
      "featured-brands",
      "custom-package-order",
      "our-team",
      "menuItems",
      "MenuItemsByCat",
      "events",
      "BlogsSingle",
      "Booking",
      "Subscription",
      "favouriteMenuItems",
   ],
   endpoints: (builder) => ({
      getCategory: builder.query({
         query: (params) => ({
            url: `/api/category`,
            params,
         }),
         providesTags: ["Category"],
      }),
      getCategorySingle: builder.query({
         query: ({ params, slug }) => ({
            url: `/api/category/${slug}`,
            params,
         }),
         providesTags: ["ProductCategory"],
      }),
      getBrand: builder.query({
         query: (params) => ({
            url: `/api/brand`,
            params,
         }),
         providesTags: ["Brand"],
      }),
      getBrandSingle: builder.query({
         query: ({ params, slug }) => ({
            url: `/api/brand/${slug}`,
            params,
         }),
         providesTags: ["Brand"],
      }),
      getSiteSettings: builder.query({
         query: (params) => ({
            url: `/api/site-settings`,
            params,
         }),
         providesTags: ["site-settings"],
      }),
      getProducts: builder.query({
         query: (params) => ({
            url: `/api/products`,
            params,
         }),
         providesTags: ["Products"],
      }),
      getProductSingle: builder.query({
         query: (slug) => ({
            url: `/api/products/${slug}`,
         }),
         providesTags: ["ProductSingle"],
      }),
      getCarts: builder.query({
         query: (params) => ({
            url: `/api/carts`,
            params,
         }),
         providesTags: ["Carts"],
      }),
      postCarts: builder.mutation({
         query: (data) => ({
            url: `/api/carts`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) => (error ? [] : ["Carts"]),
      }),
      deleteCart: builder.mutation({
         query: ({ id }) => ({
            url: `/api/carts/${id}`,
            method: "DELETE",
         }),
         invalidatesTags: (result, error) => (error ? [] : ["Cart"]),
      }),
      getWishlist: builder.query({
         query: (params) => ({
            url: `/api/wishlists`,
            params,
         }),
         providesTags: ["Wishlist"],
      }),
      postWishlist: builder.mutation({
         query: (data) => ({
            url: `/api/wishlists`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Wishlist"],
      }),
      deleteWishlist: builder.mutation({
         query: ({ id }) => ({
            url: `/api/wishlists/${id}`,
            method: "DELETE",
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Wishlist"],
      }),
      postOrder: builder.mutation({
         query: (data) => ({
            url: `/api/orders`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) => (error ? [] : ["Order"]),
      }),
      getShippingDetails: builder.query({
         query: (params) => ({
            url: `/api/shipping-details`,
            params,
         }),
         providesTags: ["ShippingDetails"],
      }),
      postShippingDetails: builder.mutation({
         query: (data) => ({
            url: `/api/shipping-details`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["ShippingDetails"],
      }),
      postShippingDetailsUpdate: builder.mutation({
         query: ({ data, id }) => ({
            url: `/api/shipping-details/${id}`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["ShippingDetails"],
      }),
      postShippingDetailsStatusUpdate: builder.mutation({
         query: ({ id, data }) => ({
            url: `/api/shipping-details/update-status/${id}`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["ShippingDetails"],
      }),
      deleteShippingDetail: builder.mutation({
         query: (id) => ({
            url: `/api/shipping-details/${id}`,
            method: "DELETE",
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["ShippingDetails"],
      }),
      getOrders: builder.query({
         query: (params) => ({
            url: `/api/orders`,
            params,
         }),
         providesTags: ["Orders"],
      }),
      getUserSingle: builder.query({
         query: (id) => ({
            url: `/api/customer/${id}`,
         }),
         providesTags: ["User"],
      }),
      postProfileImageUpdate: builder.mutation({
         query: ({ data, id }) => ({
            url: `/api/customer/update-profile-image/${id}`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) => (error ? [] : ["User"]),
      }),
      // ---------------------------------------------
   }),
});

export const {
   useGetCategoryQuery,
   useGetCategorySingleQuery,
   useGetBrandQuery,
   useGetBrandSingleQuery,
   useGetSiteSettingsQuery,
   useGetProductsQuery,
   useGetProductSingleQuery,
   useGetCartsQuery,
   usePostCartsMutation,
   useGetWishlistQuery,
   usePostWishlistMutation,
   useDeleteWishlistMutation,
   useDeleteCartMutation,
   usePostOrderMutation,
   usePostShippingDetailsMutation,
   useGetOrdersQuery,
   useGetShippingDetailsQuery,
   useDeleteShippingDetailMutation,
   usePostShippingDetailsUpdateMutation,
   usePostShippingDetailsStatusUpdateMutation,
   useGetUserSingleQuery,
   usePostProfileImageUpdateMutation,
   // -------------------
} = siteApi;
