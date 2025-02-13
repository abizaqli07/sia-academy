import { createTRPCRouter } from "../trpc";
import { chapterAdminRouter } from "./admin/chapter";
import { courseAdminRouter } from "./admin/course";

export const adminRouter = createTRPCRouter({
  course: courseAdminRouter,
  chapter: chapterAdminRouter
});