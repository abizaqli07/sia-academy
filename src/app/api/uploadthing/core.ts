/* eslint-disable @typescript-eslint/no-empty-function */
import type { FileRouter } from "uploadthing/next";
import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  userMentoringCv: f({
    pdf: { maxFileCount: 1, maxFileSize: "1MB" },
  }).onUploadComplete(async ({ }) => {}),
  courseRegisterProof: f({
    "image/jpeg": { maxFileCount: 1, maxFileSize: "2MB" },
    "image/png": { maxFileCount: 1, maxFileSize: "2MB" },
  }).onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
