"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

import { useToast } from "~/hooks/use-toast";
import { api, type RouterOutputs } from "~/trpc/react";
import { ChaptersList } from "./chapters-list";

interface ChaptersFormProps {
  initialData: RouterOutputs["adminRoute"]["course"]["getOne"];
  courseId: string;
};

const formSchema = z.object({
  title: z.string().min(1),
});

export const ChaptersForm = ({
  initialData,
  courseId
}: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { toast } = useToast();

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  }

  const context = api.useUtils()

  const chapter = api.adminRoute.chapter.create.useMutation({
    async onSuccess() {
      toast({
        title: "Success",
        description: "Chapter created",
      });
      toggleCreating();
      await context.adminRoute.course.getOne.refetch({
        courseId: courseId
      })
    },
    onError(error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    },
  })

  const reorder = api.adminRoute.chapter.reorder.useMutation({
    async onSuccess() {
      toast({
        title: "Success",
        description: "Chapter reordered",
      });
      await context.adminRoute.course.getOne.refetch({
        courseId: courseId
      })
      setIsUpdating(false);
    },
    onError(error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
      setIsUpdating(false);
    }
  })

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    chapter.mutate({
      ...values,
      courseId: courseId
    })
  }

  const onReorder = (updateData: { id: string; position: number }[]) => {
    setIsUpdating(true);

    reorder.mutate({
      courseId: courseId,
      list: updateData
    })

  }

  const onEdit = (id: string) => {
    router.push(`/dashboard/admin/courses/${courseId}/chapters/${id}`);
  }

  return (
    <div className="relative mt-6 border bg-slate-100 dark:bg-primary-dark rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-primary" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course chapters
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the course'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={!isValid || isSubmitting}
              type="submit"
            >
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div className={cn(
          "text-sm mt-2",
          !initialData.chapters.length && "text-slate-500 italic"
        )}>
          {!initialData.chapters.length && "No chapters"}
          <ChaptersList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.chapters || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  )
}