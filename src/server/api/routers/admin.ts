import { createTRPCRouter } from "../trpc";
import { chapterAdminRouter } from "./admin/chapter";
import { courseAdminRouter } from "./admin/course";
import { mentorAdminRouter } from "./admin/mentor";

export const adminRouter = createTRPCRouter({
  course: courseAdminRouter,
  chapter: chapterAdminRouter,
  mentor: mentorAdminRouter
});