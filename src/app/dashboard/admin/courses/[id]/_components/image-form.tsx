"use client";

import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import * as z from "zod";
import { FileUpload } from "~/components/file-upload";

import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";
import { api, type RouterOutputs } from "~/trpc/react";

interface ImageFormProps {
  initialData: RouterOutputs["adminRoute"]["course"]["getOne"];
  courseId: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z.object({
  image: z.string().min(1),
});

export const ImageForm = ({
  initialData,
  courseId
}: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const toggleEdit = () => setIsEditing((current) => !current);

  const context = api.useUtils();

  const course = api.adminRoute.course.update.useMutation({
    async onSuccess() {
      toast({
        title: "Success",
        description: "Image updated",
      });
      toggleEdit();
      await context.adminRoute.course.invalidate()
    },
    onError(error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    course.mutate({
      ...values,
      id: courseId
    })
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && !initialData.image && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initialData.image && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.image ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.image}
            />
          </div>
        )
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ image: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  )
}