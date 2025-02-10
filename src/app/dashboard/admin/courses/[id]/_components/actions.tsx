"use client";

import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ConfirmModal } from "~/components/modals/confirm-modal";
import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export const Actions = ({ disabled, courseId, isPublished }: ActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const context = api.useUtils();

  const pub = api.adminRoute.course.publish.useMutation({
    onSuccess() {
      toast({
        title: "Success",
        description: "Course Published"
      })
      setIsLoading(false);
    },
    onError(error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
      setIsLoading(false);
    },
  });

  const unPub = api.adminRoute.course.unpublish.useMutation({
    onSuccess() {
      toast({
        title: "Success",
        description: "Course Unpublished"
      })
      setIsLoading(false);
    },
    onError(error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
      setIsLoading(false);
    },
  });

  const deleteCourse = api.adminRoute.course.delete.useMutation({
    async onSuccess() {
      toast({
        title: "Success",
        description: "Course Deleted"
      })
      await context.adminRoute.course.invalidate();
      setIsLoading(false);
      router.push("/course");
    },
    onError(error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
      setIsLoading(false);
    },
  });

  const onClick = async () => {
    setIsLoading(true);

    if (isPublished) {
      unPub.mutate({
        courseId: courseId,
      });
    } else {
      pub.mutate({
        courseId: courseId,
      });
    }

    // await context.adminRoute.chapter.invalidate();
  };

  const onDelete = () => {
    setIsLoading(true);

    deleteCourse.mutate({
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
