import { createTRPCRouter } from "../trpc";
import { courseAdminRouter } from "./admin/course";

export const adminRouter = createTRPCRouter({
  course: courseAdminRouter
});