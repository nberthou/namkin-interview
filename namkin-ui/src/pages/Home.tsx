import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import { useGetProductsQuery } from "../slices/apiSlice";
import { ProductCard } from "../components/Cards/ProductCard";
import { UpsertProductDialog } from "../components/Dialogs/UpsertProductDialog";

export const Home = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const currentUser = useGetCurrentUser();
  const { data: products, error, isLoading } = useGetProductsQuery();

  const canCreateProduct = currentUser?.roles.find(
    (role) =>
      role.name === "Admin" ||
      role.permissions.find(
        (permission) =>
          permission.name === "MANAGE_PRODUCT" ||
          permission.name === "CREATE_PRODUCT"
      )
  );

  useEffect(() => {
    if (!token) {
      navigate({ to: "/login" });
    }
  }, [token]);

  return (
    <div className="w-full h-[calc(100vh-5.25em)] flex justify-center items-center flex-col">
      <h1 className="font-extrabold text-4xl">
        Bienvenue, {currentUser?.name}
      </h1>

      {canCreateProduct && <UpsertProductDialog />}
      {isLoading ? (
        <p>Content loading...</p>
      ) : (
        <div className="grid grid-cols-4 gap-12 mt-12">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
