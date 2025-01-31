import { z } from "zod";

// const phoneRegex = new RegExp(
//   /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
// );

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email invalid",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 character",
  }),
});

export const RegisterSchema = z
  .object({
    email: z.string().email({
      message: "Email invalid",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 character",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 character",
    }),
    name: z.string().min(1, {
      message: "Username required",
    }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password != confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Password doesnt match",
        path: ["confirmPassword"],
      });
    }
  });

export const UpdateDataSchema = z
  .object({
    email: z.string().email({
      message: "Email invalid",
    }),
    name: z.string().min(1, {
      message: "Username required",
    }),
  })

export const ForgotPasswordSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email required",
  }),
});

export const ResetPasswordSchema = z
  .object({
    token: z.string(),
    identifier: z.string(),
    password: z.string().min(8, {
      message: "Password must be at least 8 character",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 character",
    }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password != confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Password doesnt match",
        path: ["confirmPassword"],
      });
    }
  });

export const ChangePasswordSchema = z
  .object({
    oldPassword: z.string().min(8, {
      message: "Password must be at least 8 character",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 character",
    }),
  })
