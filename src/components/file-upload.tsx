"use client";

import { UploadDropzone } from "~/lib/uploadthing";
import type { ourFileRouter } from "~/app/api/uploadthing/core";
import { useToast } from "~/hooks/use-toast";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  const { toast } = useToast();
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0]?.url);
      }}
      onUploadError={(error: Error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      }}
    />
  );
};
