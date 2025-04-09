"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { Editor } from "~/components/editor";
import { Button } from "~/components/ui/button";
import {
  Dialog,
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
import { useToast } from "~/hooks/use-toast";
import { ResponseSessionSchema } from "~/server/validator/mentoring";
import { api } from "~/trpc/react";

const AcceptButton = ({
  mentoringDataId,
  message,
}: {
  mentoringDataId: string;
  message: string;
}) => {
  const { toast } = useToast();

  const requestSession = api.mentorRoute.mentee.responseSession.useMutation({
    onSuccess() {
      toast({
        title: "Success",
        description: "Success accepting session",
      });
    },
    onError(error) {
      if (error.data?.code === "FORBIDDEN") {
        signIn().catch((err) => {
          console.log(err);
        });
      } else {
        toast({
          title: error.data?.code,
          description: error.message,
          variant: "destructive",
        });
      }
    },
  });

  const form = useForm<z.infer<typeof ResponseSessionSchema>>({
    resolver: zodResolver(ResponseSessionSchema),
    defaultValues: {
      userMentoringDataId: mentoringDataId,
      message: message,
      status: "ACCEPTED",
    },
  });

  const onSubmit = (values: z.infer<typeof ResponseSessionSchema>) => {
    requestSession.mutate(values);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">Accept Session</Button>
        </DialogTrigger>
        <DialogContent className="scrollbar-hide max-h-[90vh] overflow-auto overflow-y-scroll sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Response Session</DialogTitle>
            <DialogDescription>
              Response sesi mentoring dari user
            </DialogDescription>
          </DialogHeader>
          {/* Banner */}
          <div className="aspect-[3/1] w-full rounded-xl bg-gray-200"></div>

          {/* Forms Registration */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Message Form */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Editor {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Accept</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AcceptButton;
