"use client";

import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import * as z from "zod";
import { FileUpload } from "~/components/file-upload";

import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";
import { api, type RouterOutputs } from "~/trpc/react";

interface ImageBannerFormProps {
  initialData: RouterOutputs["adminRoute"]["course"]["getOne"];
  courseId: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z.object({
  bannerImage: z.string().min(1),
});

export const ImageBannerForm = ({
  initialData,
  courseId,
}: ImageBannerFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const toggleEdit = () => setIsEditing((current) => !current);

  const context = api.useUtils();

  const course = api.adminRoute.course.update.useMutation({
    async onSuccess() {
      toast({
        title: "Success",
        description: "Banner image updated",
      });
      toggleEdit();
      await context.adminRoute.course.invalidate();
    },
    onError(error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    course.mutate({
      ...values,
      id: courseId,
    });
  };

  return (
    <div className="mt-6 rounded-md border bg-slate-100 dark:bg-primary-dark p-4">
      <div className="flex items-center justify-between font-medium">
        Course banner
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.bannerImage && (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add an image
            </>
          )}
          {!isEditing && initialData.bannerImage && (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.bannerImage ? (
          <div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2 aspect-video">
            <Image
              alt="Upload"
              fill
              className="rounded-md object-cover"
              src={initialData.bannerImage}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ bannerImage: url });
              }
            }}
          />
          <div className="mt-4 text-xs text-muted-foreground">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};
