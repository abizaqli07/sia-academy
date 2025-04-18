/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { useToast } from "~/hooks/use-toast";
import { api, type RouterOutputs } from "~/trpc/react";

import { ArrowLeft, Check, ChevronsUpDown } from "lucide-react";
import { Editor } from "~/components/editor";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import { UpdateMentorAltSchema } from "~/server/validator/mentoring";

interface UpdateCourseInterface {
  mentoringData: RouterOutputs["mentorRoute"]["mentoring"]["getData"];
}

const UpdateMentorForm = ({ mentoringData }: UpdateCourseInterface) => {
  const router = useRouter();
  const { toast } = useToast();
  const context = api.useUtils();

  const course = api.mentorRoute.mentoring.updateMentor.useMutation({
    async onSuccess(data) {
      toast({
        title: "Success",
        description: "Mentoring data successfully updated",
      });

      await context.mentorRoute.mentoring.getData.invalidate();
    },
    onError(error) {
      toast({
        title: "Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const initialData = mentoringData;

  const form = useForm<z.infer<typeof UpdateMentorAltSchema>>({
    resolver: zodResolver(UpdateMentorAltSchema),
    defaultValues: {
      id: initialData?.id,
      name: initialData?.name ?? "",
      company: initialData?.company ?? "",
      desc: initialData?.desc ?? "",
      expertise: initialData?.expertise ?? "",
      industry: initialData?.industry ?? "",
      title: initialData?.title ?? "",
      linkedin: initialData?.linkedin ?? "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = (values: z.infer<typeof UpdateMentorAltSchema>) => {
    course.mutate(values);
  };

  return (
    <ScrollArea className="h-full w-full">
      <div className="mx-auto flex h-full max-w-5xl p-6 md:items-center md:justify-center">
        <div>
          <div className="w-full">
            <div
              onClick={() => router.back()}
              className="mb-8 flex cursor-pointer items-center text-sm transition hover:opacity-75"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke setup mentoring
            </div>
          </div>
          <h1 className="text-2xl font-medium">Perbarui Data Mentoring</h1>
          <p className="text-sm text-slate-600">
            Perbarui data mentor anda agar menarik mentee :3
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Nama lengkap anda"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori Industri</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="e.g. Teknologi"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expertise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keahlian</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="e.g. Software Developer,Cloud Engineer"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Bisa diisi lebih dari satu, gunakan tanda koma (,) untuk
                      memisahkan.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gelar Pekerjaan</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="e.g. Senior Web Developer"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Perusahaan (optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Perusahaan bekerja"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link LinkedIn (opsional)</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Link menuju linkedIn anda"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ceritakan sedikit tentang anda kepada kami"
                        className="resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-x-2">
                <Button
                  onClick={() => router.back()}
                  type="button"
                  variant="ghost"
                >
                  Kembali
                </Button>

                <Button type="submit" disabled={isSubmitting}>
                  Perbarui
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </ScrollArea>
  );
};

export default UpdateMentorForm;
