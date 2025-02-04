import { desc } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { mentoring } from "~/server/db/schema";

export const mentoringRouter = createTRPCRouter({
  getAllMentoring: protectedProcedure.query(async ({ ctx }) => {
    const allMentoring = await ctx.db.query.mentoring.findMany({
      with: {
        category: true,
        mentor: true,
      },
      orderBy: [desc(mentoring.createdAt)],
    });

    return allMentoring;
  }),
  getAllMyMentoring: protectedProcedure.query(async ({ ctx }) => {
    const purchases = await ctx.db.query.purchase
      .findMany({
        where: (purchase, { eq, and, isNotNull }) =>
          and(
            eq(purchase.userId, ctx.session?.user.id),
            isNotNull(purchase.mentoringId),
          ),
        with: {
          mentoring: {
            with: {
              mentoring: {
                with: {
                  mentor: true,
                },
              },
            },
          },
        },
      })
      .execute();

    return purchases;
  }),
});
