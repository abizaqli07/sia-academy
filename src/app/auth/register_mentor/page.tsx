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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useToast } from "~/hooks/use-toast";
import { RegisterSchema } from "~/server/validator/auth";
import { api } from "~/trpc/react";

const Register = () => {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const search = searchParams.get("redirect");

  const register = api.authRoute.register.useMutation({
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

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    register.mutate(values);
  }

  return (
    <div className="flex min-h-screen w-full">
      <div className="relative hidden flex-1 bg-primary md:flex">
        <Image
          src={"/images/auth/auth_bg.png"}
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
            <div className="text-center text-3xl font-bold">Techmodule.AI</div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create your account
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
                        <FormLabel>Fullname</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
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
                        <FormLabel>Email address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your email"
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
                        <FormLabel>Confirm Password</FormLabel>
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
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Sign up
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
