import { z } from "zod";
import { createInsertSchema } from 'drizzle-zod';
import { course } from "../db/schema";

export const CourseIdSchema = z.object({
  courseId: z.string(),
});

export const createCourseSchema = createInsertSchema(course)

export const updateCourse = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).nullish(),
  description: z.string().nullish(),
  imageUrl: z.string().url().nullish(),
  categoryId: z.string().uuid().nullish(),
});

export const idCourse = z.object({
  id: z.string().uuid(),
});

export const createChapter = z.object({
  courseId: z.string().uuid(),
  title: z.string().min(1),
});

export const updateChapter = z.object({
  id: z.string().uuid(),
  title: z.string().nullish(),
  description: z.string().nullish(),
  videoUrl: z.string().url().nullish(),
});

export const idChapter = z.object({
  id: z.string().uuid(),
  courseId: z.string().uuid(),
});

export const progressChapter = z.object({
  userId: z.string(),
  chapterId: z.string().uuid(),
  isCompleted: z.boolean(),
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
