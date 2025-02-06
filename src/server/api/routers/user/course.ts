import { desc } from "drizzle-orm";
import { course } from "~/server/db/schema";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import { CourseIdSchema } from "~/server/validator/course";

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
  getOneCourse: publicProcedure
    .input(CourseIdSchema)
    .query(async ({ input, ctx }) => {
      const bootcamps = await ctx.db.query.course.findFirst({
        where: (course, { eq }) => eq(course.id, input.courseId),
        with: {
          category: true,
          mentors: {
            with: {
              mentor: true,
            },
          },
        },
      });

      return bootcamps;
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
