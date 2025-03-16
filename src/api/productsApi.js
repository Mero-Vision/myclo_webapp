import { mainApi } from "./mainApi";

export const productsApi = mainApi.injectEndpoints({
   tagTypes: ["Products"],
   endpoints: (builder) => ({
      getMyProducts: builder.query({
         query: (params) => ({
            url: `/api/my-products`,
            params,
         }),
         providesTags: ["Products"],
      }),
      getProductsSingle: builder.query({
         query: (slug) => ({
            url: `/api/my-products/${slug}`,
         }),
         providesTags: ["Products"],
      }),

      postProducts: builder.mutation({
         query: (data) => ({
            url: `/api/products`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Products"],
      }),
      postProductsUpdate: builder.mutation({
         query: ({ data, slug }) => ({
            url: `/api/products/${slug}`,
            method: "POST",
            body: data,
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Products"],
      }),
      deleteProducts: builder.mutation({
         query: (slug) => ({
            url: `/api/products/${slug}`,
            method: "DELETE",
         }),
         invalidatesTags: (result, error) =>
            error ? [] : ["Products"],
      }),
   }),
});

export const {
   useGetMyProductsQuery,
   useGetProductsSingleQuery,
   usePostProductsMutation,
   usePostProductsUpdateMutation,
   useDeleteProductsMutation,
} = productsApi;
