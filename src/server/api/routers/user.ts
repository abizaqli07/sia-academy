import { createTRPCRouter } from "../trpc";
import { courseRouter } from "./user/course";
import { mentoringRouter } from "./user/mentoring";

export const userRouter = createTRPCRouter({
  course: courseRouter,
  mentoring: mentoringRouter
});