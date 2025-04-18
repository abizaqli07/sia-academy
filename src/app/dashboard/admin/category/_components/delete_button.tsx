"use client";

import { Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/dialog";
import { useToast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";

const DeleteButton = ({ categoryId }: { categoryId: string }) => {
  const { toast } = useToast();
  const context = api.useUtils();

  const deleteCategory = api.adminRoute.category.delete.useMutation({
    async onSuccess() {
      toast({
        title: "Success",
        description: "Success deleting category",
      });
      await context.adminRoute.category.getAll.invalidate();
    },
    onError(error) {
      toast({
        title: error.data?.code,
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: { id: string }) => {
    deleteCategory.mutate(values);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-destructive outline-none transition-colors hover:bg-accent">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </div>
        </DialogTrigger>
        <DialogContent className="scrollbar-hide max-h-[90vh] overflow-auto overflow-y-scroll sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure want to delete this category?
            </DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
            <Button
              type="button"
              variant="destructive"
              className=" w-fit justify-self-end"
              onClick={() => onSubmit({ id: categoryId })}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteButton;
