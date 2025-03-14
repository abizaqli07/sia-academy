"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { useToast } from "~/hooks/use-toast";
import { RegisterMentoringSchema } from "~/server/validator/mentoring";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "~/lib/utils";
import { Textarea } from "~/components/ui/textarea";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Input } from "~/components/ui/input";

interface RegisterMentoringInterface {
  categories: RouterOutputs["mentorRoute"]["mentoring"]["getCategory"];
}

const RegisterMentoringForm = ({ categories }: RegisterMentoringInterface) => {
  const router = useRouter();
  const { toast } = useToast();

  const registerMentoring =
    api.mentorRoute.mentoring.registerMentoring.useMutation({
      onSuccess(data) {
        toast({
          title: "Success",
          description: "Mentoring Register Succesfully",
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

  const form = useForm<z.infer<typeof RegisterMentoringSchema>>({
    resolver: zodResolver(RegisterMentoringSchema),
    defaultValues: {
      categoryId: "",
      title: "",
      materi: "",
      price: "0",
      desc: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = (values: z.infer<typeof RegisterMentoringSchema>) => {
    registerMentoring.mutate(values);
  };

  return (
    <ScrollArea className="h-full w-full">
      <div className="mx-auto flex h-full max-w-5xl p-6 md:items-center md:justify-center">
        <div>
          <h1 className="text-2xl">Register Your Mentoring</h1>
          <p className="text-sm text-slate-600">
            Register to start your mentoring and get in touch with thausands of mentee
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
                    <FormLabel>Mentoring title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. 'Programming career mentoring'"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What this mentoring about?
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
                      <Textarea
                        placeholder="Describe this mentoring in detail"
                        className="resize-none"
                        {...field}
                      />
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
                        placeholder="Materi you want to teach your menteee about"
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
                    <FormDescription>Price for this mentoring</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                      This is the category that will be used in the mentoring.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-x-2">
                <Button
                  onClick={() => router.push("/dashboard/mentor/")}
                  type="button"
                  variant="ghost"
                >
                  Cancel
                </Button>

                <Button type="submit" disabled={!isValid || isSubmitting}>
                  Register
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </ScrollArea>
  );
};

export default RegisterMentoringForm;
