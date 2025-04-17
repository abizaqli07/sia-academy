/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { useToast } from "~/hooks/use-toast";
import { api, type RouterOutputs } from "~/trpc/react";

import { Check, ChevronsUpDown } from "lucide-react";
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
import { UpdateMentoringSchema } from "~/server/validator/mentoring";

interface UpdateCourseInterface {
  mentoringData: RouterOutputs["mentorRoute"]["mentoring"]["getData"];
  categories: RouterOutputs["adminRoute"]["course"]["getCategory"];
}

const UpdateCourseForm = ({
  mentoringData,
  categories,
}: UpdateCourseInterface) => {
  const router = useRouter();
  const { toast } = useToast();

  const course = api.mentorRoute.mentoring.update.useMutation({
    onSuccess(data) {
      toast({
        title: "Success",
        description: "Mentoring data successfully updated",
      });
    },
    onError(error) {
      toast({
        title: "Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const initialData = mentoringData?.mentoring;

  const form = useForm<z.infer<typeof UpdateMentoringSchema>>({
    resolver: zodResolver(UpdateMentoringSchema),
    defaultValues: {
      id: initialData?.id,
      categoryId: initialData?.categoryId,
      title: initialData?.title,
      materi: initialData?.materi ?? "",
      price: initialData?.price ?? "0",
      desc: initialData?.desc ?? "",
      isFeatured: initialData?.isFeatured,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = (values: z.infer<typeof UpdateMentoringSchema>) => {
    course.mutate(values);
  };

  return (
    <ScrollArea className="h-full w-full">
      <div className="mx-auto flex h-full max-w-5xl p-6 md:items-center md:justify-center">
        <div>
          <h1 className="text-2xl">Perbarui Data Mentoring</h1>
          <p className="text-sm text-slate-600">
            Update your couses with fine detail to engage your student :3
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 space-y-8"
            >
              {/* ============= Title ============ */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul Mentoring</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. 'Mentoring Karir Website Developer'"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Tentang apa mentoring yang akan anda buat?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ============ Desc =============  */}
              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Editor {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ============ Materi =============  */}
              <FormField
                control={form.control}
                name="materi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Materi</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g. Pembuatan CV,Perusahaan Terbaik di Jenjang Karir"
                        className="resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Materi yang ingin anda ajarkan di sesi mentoring anda.
                      Pisahkan dengan tanda koma (,).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ============= Price ============ */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={isSubmitting}
                        placeholder="Price"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Harga untuk sesi mentoring anda.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* =========== Category ============ */}
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Kategori</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? categories.find(
                                  (category) => category.id === field.value,
                                )?.name
                              : "Select category"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search category..." />
                          <CommandList>
                            <CommandEmpty>
                              Tidak ada kategori yang ditemukan.
                            </CommandEmpty>
                            <CommandGroup>
                              {categories.map((category) => (
                                <CommandItem
                                  value={category.name ?? ""}
                                  key={category.id}
                                  onSelect={() => {
                                    form.setValue("categoryId", category.id);
                                  }}
                                >
                                  {category.name}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      category.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Kategori untuk mentoring anda
                    </FormDescription>
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

export default UpdateCourseForm;
