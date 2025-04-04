import { createSchemaFactory } from "drizzle-zod";
import { z } from "zod";
import { mentoring, mentoringSchedule } from "../db/schema";

const { createUpdateSchema } = createSchemaFactory({
  coerce: {
    date: true,
  },
});

export const MentoringIdSchema = z.object({
  mentoringId: z.string(),
});

export const UserMentoringDataIdSchema = z.object({
  mentoringDataId: z.string(),
});

export const RegisterUserDataMentoringSchema = z.object({
  objective: z
    .string()
    .min(1, { message: "Objective required for registering" }),
  preference: z.string(),
  positionPreference: z.string(),
  referral: z.string(),
  cv: z.string().min(1, { message: "CV required for registering" }),
  mentoringId: z.string(),
});

export const RegisterMentoringSchema = z.object({
  title: z.string().min(1, {
    message: "Required",
  }),
  desc: z.string().min(1, {
    message: "Required",
  }),
  materi: z.string().min(1, {
    message: "Required",
  }),
  categoryId: z.string(),
  price: z.string(),
});

export const UpdateMentoringSchema = createUpdateSchema(mentoring);

export const RequestSessionSchema = z.object({
  mentoringDataId: z.string().min(1, {
    message: "Required",
  }),
  date: z.date()
});

export const ResponseSessionSchema = createUpdateSchema(mentoringSchedule, {
  userMentoringDataId: z.string()
})
