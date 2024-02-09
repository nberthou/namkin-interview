import { FC, useState } from "react";
import { Button } from "../Button/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./dialog";
import { Input } from "../Input/input";
import { Label } from "../Label/label";
import type { Product } from "../../types";
import {
  useCreateProductMutation,
  useUpdateProductMutation
} from "../../slices/apiSlice";

type UpsertProductDialogProps = {
  product?: Product;
};

export const UpsertProductDialog: FC<UpsertProductDialogProps> = ({
  product
}) => {
  const [name, setName] = useState<string>(product?.name ?? "");
  const [description, setDescription] = useState<string>(
    product?.description ?? ""
  );
  const [price, setPrice] = useState<number>(product?.price ?? 0);

  const [updateProduct] = useUpdateProductMutation();
  const [createProduct] = useCreateProductMutation();

  const handleSubmit = () => {
    if (product) {
      updateProduct({ ...product, name, description, price });
    } else {
      createProduct({ name, description, price });
      setName("");
      setDescription("");
      setPrice(0);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={product ? "ghost" : "default"}
          className={`${product ? "" : "bg-emerald-500 mt-6"}`}
        >
          {product ? "Edit" : "Create"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product ? "Edit" : "Create"} a product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              className="col-span-3"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              value={price}
              className="col-span-3"
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              type="number"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="bg-emerald-400" onClick={handleSubmit}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
