"use client";

import { useState } from "react";

import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";

interface ActionsProps {
  disabled: boolean;
  mentoringId: string;
  isPublished: boolean;
}

export const Actions = ({ disabled, mentoringId, isPublished }: ActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const context = api.useUtils();

  const pub = api.mentorRoute.mentoring.publish.useMutation({
    onSuccess() {
      toast({
        title: "Success",
        description: "Mentoring Published"
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

  const unPub = api.mentorRoute.mentoring.unpublish.useMutation({
    onSuccess() {
      toast({
        title: "Success",
        description: "Mentoring Unpublished"
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

  const onClick = async () => {
    setIsLoading(true);

    if (isPublished) {
      unPub.mutate({
        mentoringId: mentoringId,
      });
    } else {
      pub.mutate({
        mentoringId: mentoringId,
      });
    }

    await context.mentorRoute.mentoring.getData.invalidate();
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
    </div>
  );
};
