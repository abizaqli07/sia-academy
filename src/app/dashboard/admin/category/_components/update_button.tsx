"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useToast } from "~/hooks/use-toast";
import { UpdateCategorySchema } from "~/server/validator/category";
import { api } from "~/trpc/react";

const UpdateButton = ({
  categoryId,
  name,
}: {
  categoryId: string;
  name: string;
}) => {
  const { toast } = useToast();
  const context = api.useUtils();

  const createCategory = api.adminRoute.category.update.useMutation({
    async onSuccess() {
      toast({
        title: "Success",
        description: "Success updating category",
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

  const form = useForm<z.infer<typeof UpdateCategorySchema>>({
    resolver: zodResolver(UpdateCategorySchema),
    defaultValues: {
      id: categoryId,
      name: name,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = (values: z.infer<typeof UpdateCategorySchema>) => {
    createCategory.mutate(values);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent">
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </div>
        </DialogTrigger>
        <DialogContent className="scrollbar-hide max-h-[90vh] overflow-auto overflow-y-scroll sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update Category</DialogTitle>
            <DialogDescription>
              Updating category for course and mentoring
            </DialogDescription>
          </DialogHeader>

          {/* Forms Registration */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Message Form */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. 'Technology'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogClose asChild>
                <Button type="submit">Update</Button>
              </DialogClose>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateButton;
