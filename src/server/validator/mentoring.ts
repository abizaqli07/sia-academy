import { z } from "zod";

export const MentoringIdSchema = z.object({
  mentoringId: z.string()
})

export const RegisterUserDataMentoringSchema = z.object({
  objective: z.string().min(1, {message: "Objective required for registering"}),
  preference: z.string(),
  positionPreference: z.string(),
  referral: z.string(),
  cv: z.string().min(1, { message: "CV required for registering" }),
  mentoringId: z.string(),
});