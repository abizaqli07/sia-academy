import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt";
import { users } from "~/server/db/schema";
import { RegisterSchema } from "~/server/validator/auth";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(RegisterSchema)
    .mutation(async ({ input, ctx }) => {
      const haveUser = await ctx.db.query.users
        .findFirst({
          where: (users, { eq }) => eq(users.email, input.email),
        })
        .execute();

      if (haveUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exist",
        });
      }

      const hashed = await hash(input.password, 10);

      const user = await ctx.db
        .insert(users)
        .values({
          email: input.email,
          password: hashed,
          name: input.name,
        })
        .returning();

      return user;
    }),
})