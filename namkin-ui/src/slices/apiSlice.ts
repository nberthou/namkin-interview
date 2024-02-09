import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product, User } from "../types";
import { sign } from "crypto";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getCurrentUser: builder.query<Omit<User, "password">, void>({
      query: () => "currentUser",
      transformResponse: (response: User) => {
        const { password, ...result } = response;
        return result;
      }
    }),
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: "auth/login",
        method: "POST",
        body: { username: email, password }
      })
    }),
    getProducts: builder.query<Product[], void>({
      query: () => "products"
    }),
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: "product",
        method: "POST",
        body: product
      }),
      async onQueryStarted(product, { dispatch, queryFulfilled }) {
        try {
          const { data: newProduct } = await queryFulfilled;
          const patchResult = dispatch(
            apiSlice.util.updateQueryData("getProducts", undefined, (draft) => {
              draft.push(newProduct);
            })
          );
        } catch {}
      }
    }),
    updateProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => {
        const { id: productId, ...rest } = product;
        return {
          url: `product/${productId}`,
          method: "PATCH",
          body: rest
        };
      },
      async onQueryStarted(
        { id, name, description, price },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getProducts", undefined, (draft) => {
            const product = draft.find((p) => p.id === id);
            if (product) {
              product.name = name ?? "";
              product.description = description ?? "";
              product.price = price ?? 0;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      }
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (productId) => ({
        url: `product/${productId}`,
        method: "DELETE"
      }),
      async onQueryStarted(productId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getProducts", undefined, (draft) => {
            const index = draft.findIndex((p) => p.id === productId);
            if (index !== -1) {
              draft.splice(index, 1);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      }
    }),
    signUpUser: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: "auth/register",
        method: "POST",
        body: user
      })
    })
  })
});

export const {
  useGetCurrentUserQuery,
  useLoginUserMutation,
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useSignUpUserMutation
} = apiSlice;
