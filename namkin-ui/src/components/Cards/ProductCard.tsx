import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from "./card";
import { Button } from "../Button/button";
import type { Product } from "../../types";
import { FC } from "react";
import { useGetCurrentUser } from "../../hooks/useGetCurrentUser";
import { UpsertProductDialog } from "../Dialogs/UpsertProductDialog";
import { DeleteProductDialog } from "../Dialogs/DeleteProductDialog";

type ProductCardProps = {
  product: Product;
};

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const currentUser = useGetCurrentUser();
  const canEditProduct = currentUser?.roles.find(
    (role) =>
      role.name === "Admin" ||
      role.permissions.find(
        (permission) =>
          permission.name === "MANAGE_PRODUCT" ||
          permission.name === "EDIT_PRODUCT"
      )
  );

  const canCreateProduct = currentUser?.roles.find(
    (role) =>
      role.name === "Admin" ||
      role.permissions.find(
        (permission) =>
          permission.name === "MANAGE_PRODUCT" ||
          permission.name === "CREATE_PRODUCT"
      )
  );

  const canDeleteProduct = currentUser?.roles.find(
    (role) =>
      role.name === "Admin" ||
      role.permissions.find(
        (permission) =>
          permission.name === "MANAGE_PRODUCT" ||
          permission.name === "DELETE_PRODUCT"
      )
  );
  return (
    <Card key={product.id} className="p-6">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p>{product.description}</p>
        <CardDescription>{product.price}€</CardDescription>
      </CardContent>
      <div className="flex justify-around mt-6">
        {canEditProduct && <UpsertProductDialog product={product} />}
        {canDeleteProduct && <DeleteProductDialog productId={product.id} />}
      </div>
    </Card>
  );
};
