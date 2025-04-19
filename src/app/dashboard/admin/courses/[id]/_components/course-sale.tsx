"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useToast } from "~/hooks/use-toast";
import { currencyFormatter } from "~/lib/utils";
import { api } from "~/trpc/react";

interface CourseSaleProps {
  initialData: {
    price: string | null;
    isSale: boolean;
    salePrice: string;
  };
  courseId: string;
}

const formSchema = z.object({
  isSale: z.boolean(),
  salePrice: z.string(),
});

export const CourseSale = ({ initialData, courseId }: CourseSaleProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const context = api.useUtils();

  const chapter = api.adminRoute.course.update.useMutation({
    async onSuccess() {
      toast({
        title: "Success",
        description: "Course updated",
      });
      toggleEdit();
      await context.adminRoute.course.getOne.invalidate();
    },
    onError(error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    chapter.mutate({
      ...values,
      id: courseId,
    });
  };

  return (
    <div className="mt-6 rounded-md border bg-slate-100 dark:bg-primary-dark p-4">
      <div className="flex items-center justify-between font-medium">
        Course Sale (optional)
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit discount
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={`mt-4 w-full rounded-sm p-2 text-center ${initialData.isSale ? "bg-slate-200 dark:bg-primary " : "border border-slate-300 font-semibold"}`}
        >
          <p className="text-base">
            {initialData.isSale
              ? `Sale Price : ${currencyFormatter.format(Number(initialData.salePrice))}`
              : "Not on Sale"}
          </p>
        </div>
      )}
      {isEditing &&
        (initialData.price === null || initialData.price === "0") && (
          <div className="font-semibold text-red-500">
            Price Has not been Set
          </div>
        )}
      {isEditing && initialData.price !== null && initialData.price !== "0" && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <div className="flex justify-between text-sm font-medium">
              <div>Original Price :</div>
              <div>{currencyFormatter.format(Number(initialData.price))}</div>
            </div>
            <FormField
              control={form.control}
              name="isSale"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>On Sale?</FormLabel>
                    <FormDescription>
                      Check this if you want make discount for this course
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salePrice"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className={form.getValues("isSale") ? "" : "hidden"}
                      type="number"
                      min={0}
                      disabled={isSubmitting}
                      placeholder="New price for course sale"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
