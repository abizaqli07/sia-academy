import { desc } from "drizzle-orm";
import { course } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { createCourseSchema } from "~/server/validator/course";
import { TRPCError } from "@trpc/server";

export const courseAdminRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createCourseSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const createCourse = await ctx.db
          .insert(course)
          .values(input)
          .returning();
        return createCourse;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Insert failed, something wrong on the server",
          cause: error,
        });
      }
    }),
  getAllCourse: protectedProcedure.query(async ({ ctx }) => {
    const courses = await ctx.db.query.course.findMany({
      with: {
        category: true,
        purchases: true,
      },
      orderBy: [desc(course.createdAt)],
    });

    return courses;
  }),
});
