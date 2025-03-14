import { createTRPCRouter } from "../trpc";
import { mentoringRouter } from "./mentor/mentoring";

export const mentorRouter = createTRPCRouter({
  mentoring: mentoringRouter
});