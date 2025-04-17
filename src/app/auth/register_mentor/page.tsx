"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { type z } from "zod";
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
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import { useToast } from "~/hooks/use-toast";
import { RegisterMentorSchema } from "~/server/validator/auth";
import { api } from "~/trpc/react";

const Register = () => {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const search = searchParams.get("redirect");

  const register = api.authRoute.registerMentor.useMutation({
    async onSuccess(data, variables) {
      await signIn("credentials", {
        email: variables.email,
        password: variables.password,
        redirect: false,
      }).then((callback) => {
        if (callback?.error) {
          toast({
            title: "Something went wrong",
            description: callback.error,
            variant: "destructive",
          });
        }

        if (callback?.ok && !callback.error) {
          router.push(`${search ?? "/redirect"}`);
        }
      });
    },
    onError(error) {
      toast({
        title: error.data?.code,
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<z.infer<typeof RegisterMentorSchema>>({
    resolver: zodResolver(RegisterMentorSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      title: "",
      company: "",
      desc: "",
      expertise: "",
      industry: "",
    },
  });

  async function onSubmit(values: z.infer<typeof RegisterMentorSchema>) {
    register.mutate(values);
  }

  return (
    <div className="flex min-h-screen w-full">
      <div className="relative hidden flex-1 bg-primary md:flex">
        <Image
          src={"/images/auth/auth_bg_2.jpg"}
          alt="Background"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <Image
              className="mx-auto"
              src="/logo.png"
              alt="Linkup"
              width={150}
              height={20}
            /> */}
            <div className="text-center text-3xl font-bold">SIA Academy</div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Bergabung menjadi mentor
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
              >
                <div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Lengkap</FormLabel>
                        <FormControl>
                          <Input placeholder="Nama anda" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alamat Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Email anda"
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Konfirmasi Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Konfirmasi password"
                            autoComplete="current-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator className="h-0.5" />

                <div>
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
                </div>
                <div>
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
                          Bisa diisi lebih dari satu, gunakan tanda koma (,)
                          untuk memisahkan.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
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
                </div>
                <div>
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
                </div>

                <div>
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
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Register
                  </button>
                </div>
              </form>
            </Form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have account?{" "}
              <Link
                href={`/auth/signin${search !== null ? "?redirect=" + search : ""}`}
                className="font-semibold leading-6 text-primary hover:text-primary/80"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
