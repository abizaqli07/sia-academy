import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { type InvoiceCallback } from "xendit-node/invoice/models";
import { db } from "~/server/db";
import { purchase } from "~/server/db/schema";

async function handler(req: Request) {
  const webhookSecret = process.env.XENDIT_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Xendit Dashboard to .env or .env.local",
    );
  }

  const headerPayload = headers();
  const x_callback_token = (await headerPayload).get("x-callback-token");

  if (!x_callback_token) {
    return new Response("Error occured -- no token headers", {
      status: 400,
    });
  }

  if (x_callback_token === webhookSecret) {
    // Get body data
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: InvoiceCallback = await req.json();

    try {
      await db
        .update(purchase)
        .set({
          status: "PURCHASED",
        })
        .where(eq(purchase.invoiceId, data.id));
    } catch (error) {
      console.error(error);
      return new Response("Internal server error", { status: 500 });
    }
  } else {
    return new Response("Forbidden request", {
      status: 403,
    });
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
