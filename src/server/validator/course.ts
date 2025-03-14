import { z } from "zod";
import { createInsertSchema, createSchemaFactory } from "drizzle-zod";
import { course } from "../db/schema";

const { createUpdateSchema } = createSchemaFactory({
  coerce: {
    date: true
  }
})

export const CourseIdSchema = z.object({
  courseId: z.string(),
});

export const CreateCourseTitleSchema = z.object({
  title: z.string().min(1, {
    message: "Title required"
  }),
  categoryId: z.string(),
  isWebinar: z.boolean()
})

export const CreateCourseSchema = createInsertSchema(course, {
  title: z.string().min(1, {
    message: "Required",
  }),
  titleDesc: z.string().min(1, {
    message: "Required",
  }),
  desc: z.string().min(1, {
    message: "Required",
  }),
  image: z.string().min(1, {
    message: "Required",
  }),
  bannerImage: z.string().min(1, {
    message: "Required",
  }),
  materi: z.string().min(1, {
    message: "Required",
  }),
  place: z.string().min(1, {
    message: "Required",
  }),
  placeUrl: z.string().url(),
  price: z.number(),
  salePrice: z.number(),
  date: z.string().min(1, {
    message: "Required",
  }),
  isFeatured: z.boolean(),
  isFree: z.boolean(),
  isHidden: z.boolean(),
  isSale: z.boolean(),
  isWebinar: z.boolean(),
  requireProofment: z.boolean(),
});

export const UpdateCourseSchema = createUpdateSchema(course)

export const idCourse = z.object({
  id: z.string().uuid(),
});

export const reorderChapter = z.object({
  courseId: z.string().uuid(),
  list: z.array(
    z.object({
      id: z.string().uuid(),
      position: z.number(),
    }),
  ),
});
