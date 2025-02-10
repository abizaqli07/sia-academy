import { asc, desc, eq } from "drizzle-orm";
import { category, chapter, course } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import {
  CourseIdSchema,
  CreateCourseTitleSchema,
  UpdateCourseSchema,
} from "~/server/validator/course";

export const courseAdminRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CreateCourseTitleSchema)
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
    update: protectedProcedure
    .input(UpdateCourseSchema)
    .mutation(async ({ ctx, input }) => {

      const existed = await ctx.db.query.course.findFirst({
        where: ((course, { eq }) => eq(course.id, input.id??""))
      }).execute()

      if (!existed) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course Not Found"
        })
      }

      const {id, ...res} = input;

      const courses = await ctx.db.update(course)
        .set({
          ...res,
        })
        .where(eq(course.id, id??""))
        .returning()

      return courses
    }),
  unpublish: protectedProcedure
    .input(CourseIdSchema)
    .mutation(async ({ ctx, input }) => {
      const existed = await ctx.db.query.course
        .findFirst({
          where: (course, { eq }) => eq(course.id, input.courseId),
        })
        .execute();

      if (!existed) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course Not Found",
        });
      }

      const courses = await ctx.db
        .update(course)
        .set({
          isHidden: true,
        })
        .where(eq(course.id, input.courseId))
        .returning();

      return courses;
    }),
  publish: protectedProcedure
    .input(CourseIdSchema)
    .mutation(async ({ ctx, input }) => {
      const existed = await ctx.db.query.course
        .findFirst({
          where: (course, { eq }) => eq(course.id, input.courseId),
        })
        .execute();

      if (!existed) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course Not Found",
        });
      }

      const courses = await ctx.db
        .update(course)
        .set({
          isHidden: false,
        })
        .where(eq(course.id, input.courseId))
        .returning();

      return courses;
    }),
  delete: protectedProcedure
    .input(CourseIdSchema)
    .mutation(async ({ ctx, input }) => {
      const existed = await ctx.db.query.course
        .findFirst({
          where: (course, { eq }) => eq(course.id, input.courseId),
        })
        .execute();

      if (!existed) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course Not Found",
        });
      }

      const courses = await ctx.db
        .delete(course)
        .where(eq(course.id, input.courseId))
        .returning();

      return courses;
    }),
  getOne: protectedProcedure
    .input(CourseIdSchema)
    .query(async ({ ctx, input }) => {
      const courses = await ctx.db.query.course.findFirst({
        where: ((course, { eq }) => eq(course.id, input.courseId)),
        with: {
          chapters: {
            orderBy: [asc(chapter.id)]
          },
        }
      }).execute()

      if (!courses) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course Not Found"
        })
      }

      return courses
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
  getCategory: protectedProcedure.query(async ({ ctx }) => {
    try {
      const categories = await ctx.db.query.category.findMany({
        orderBy: [desc(category.name)],
      });

      return categories;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something wrong on the server",
        cause: error,
      });
    }
  }),
});
