import { desc } from "drizzle-orm";
import { course } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const courseRouter = createTRPCRouter({
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
  getAllMyCourse: protectedProcedure.query(async ({ ctx }) => {
    const courses = await ctx.db.query.purchase
      .findMany({
        where: (purchase, { eq, and, isNotNull }) =>
          and(
            eq(purchase.userId, ctx.session.user.id),
            isNotNull(purchase.courseId),
          ),
        with: {
          course: {
            with: {
              category: true,
            },
          },
        },
      })
      .execute();

    return courses;
  }),
});
