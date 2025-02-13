import { z } from "zod";

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