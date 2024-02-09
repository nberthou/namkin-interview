import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./dialog";
import { Button } from "../Button/button";
import { useDeleteProductMutation } from "../../slices/apiSlice";

type DeleteProductDialogProps = {
  productId: string;
};
export const DeleteProductDialog: FC<DeleteProductDialogProps> = ({
  productId
}) => {
  const [deleteProduct] = useDeleteProductMutation();

  const handleSubmit = () => {
    deleteProduct(productId);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this product?</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive" onClick={handleSubmit}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
