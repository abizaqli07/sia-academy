"use client";

import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import * as z from "zod";
import { FileUpload } from "~/components/file-upload";

import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";

interface ImageBannerFormProps {
  initialData: string | null;
  mentoringId: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z.object({
  bannerImage: z.string().min(1),
});

export const ImageBannerForm = ({
  initialData,
  mentoringId,
}: ImageBannerFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const toggleEdit = () => setIsEditing((current) => !current);

  const context = api.useUtils();

  const course = api.mentorRoute.mentoring.update.useMutation({
    async onSuccess() {
      toast({
        title: "Success",
        description: "Banner image updated",
      });
      toggleEdit();
      await context.mentorRoute.mentoring.getData.invalidate();
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
      id: mentoringId,
    });
  };

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Mentoring banner
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Batalkan</>}
          {!isEditing && !initialData && (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Tambah
            </>
          )}
          {!isEditing && initialData && (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit gambar
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData ? (
          <div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2 aspect-video">
            <Image
              alt="Upload"
              fill
              className="rounded-md object-cover"
              src={initialData}
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
