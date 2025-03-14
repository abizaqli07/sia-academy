import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt";
import { mentor, users } from "~/server/db/schema";
import { RegisterMentorSchema, RegisterSchema } from "~/server/validator/auth";
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
  registerMentor: publicProcedure
    .input(RegisterMentorSchema)
    .mutation(async ({ ctx, input }) => {
      const haveUser = await ctx.db.query.users
        .findFirst({
          where: (users, { eq }) => eq(users.email, input.email),
        })
        .execute();

      if (haveUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User with this email already exist",
        });
      }

      const hashed = await hash(input.password, 10);

      try {
        const user = await ctx.db
          .insert(users)
          .values({
            email: input.email,
            password: hashed,
            name: input.name,
            role: "MENTOR"
          })
          .returning();

        const mentorData = await ctx.db
          .insert(mentor)
          .values({
            name: input.name,
            desc: input.desc,
            expertise: input.expertise,
            title: input.title,
            company: input.company,
            industry: input.industry,
            userId: user[0]?.id,
          })
          .returning();

        return mentorData;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something wrong happened on the server",
          cause: error,
        });
      }
    }),
});
