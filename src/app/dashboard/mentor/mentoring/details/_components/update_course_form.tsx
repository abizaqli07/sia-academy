/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { useToast } from "~/hooks/use-toast";
import { UpdateCourseSchema } from "~/server/validator/course";
import { api, type RouterOutputs } from "~/trpc/react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Checkbox } from "~/components/ui/checkbox";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Textarea } from "~/components/ui/textarea";
import { format } from "date-fns";
import { Calendar } from "~/components/ui/calendar";
import { UpdateMentoringSchema } from "~/server/validator/mentoring";
import { Editor } from "~/components/editor";

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
          <h1 className="text-2xl">Update Course</h1>
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
                    <FormLabel>Course title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. 'Advanced web development'"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What will you teach in this course?
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
                    <FormLabel>Description</FormLabel>
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
                        placeholder="Materi you want to teach"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
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
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={isSubmitting}
                        placeholder="Price"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Price for this course</FormDescription>
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
                    <FormLabel>Category</FormLabel>
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
                            <CommandEmpty>No categories found.</CommandEmpty>
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
                      This is the category that will be used in the course.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value!}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>This is Featured</FormLabel>
                      <FormDescription>
                        Check this if you want to see this course on main page
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-x-2">
                <Button
                  onClick={() => router.back()}
                  type="button"
                  variant="ghost"
                >
                  Back
                </Button>

                <Button type="submit" disabled={isSubmitting}>
                  Update
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
