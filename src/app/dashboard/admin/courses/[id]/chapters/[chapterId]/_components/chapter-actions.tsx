"use client";

import { Trash } from "lucide-react";
import { useState } from "react";

import { ConfirmModal } from "~/components/modals/confirm-modal";
import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

export const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const context = api.useUtils();

  const pub = api.adminRoute.chapter.publish.useMutation({
    onSuccess() {
      toast({
        title: "Success",
        description: "Chapter published",
      });
      setIsLoading(false);
    },
    onError(error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
    },
  });

  const unPub = api.adminRoute.chapter.unpublish.useMutation({
    onSuccess() {
      toast({
        title: "Success",
        description: "Chapter unpublished",
      });
      setIsLoading(false);
    },
    onError(error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
    },
  });

  const deleteChapter = api.adminRoute.chapter.delete.useMutation({
    async onSuccess() {
      toast({
        title: "Success",
        description: "Chapter deleted",
      });
      await context.adminRoute.chapter.invalidate();
      setIsLoading(false);
    },
    onError(error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
    },
  });

  const onClick = async () => {
    setIsLoading(true);

    if (isPublished) {
      unPub.mutate({
        id: chapterId,
        courseId: courseId,
      });
    } else {
      pub.mutate({
        id: chapterId,
        courseId: courseId,
      });
    }

    await context.adminRoute.chapter.invalidate();
  };

  const onDelete = () => {
    setIsLoading(true);

    deleteChapter.mutate({
      id: chapterId,
      courseId: courseId,
    });
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
