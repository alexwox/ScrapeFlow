import { getCreditsPack, PackId } from "@/types/billing";
import { writeFile } from "fs";
import "server-only";
import Stripe from "stripe";
import { prisma } from "../prisma";

export async function HandleCheckoutSessionCompleted(
  event: Stripe.Checkout.Session
) {
  console.log("@@ (in checkout handler) EVENT", event);
  if (!event.metadata) {
    throw new Error("missing metadata");
  }
  const { userId, packId } = event.metadata;
  if (!userId) {
    throw new Error("Missing user id");
  }
  if (!packId) {
    throw new Error("Missing pack id");
  }
  const purchasedPack = getCreditsPack(packId as PackId);
  if (!purchasedPack) {
    throw new Error("Purchased pack not defined");
  }

  await prisma.userBalance.upsert({
    where: {
      userId,
    },
    create: {
      userId,
      credits: purchasedPack.credits,
    },
    update: {
      credits: {
        increment: purchasedPack.credits,
      },
    },
  });

  await prisma.userPurchase.create({
    data: {
      userId,
      stripeId: event.id,
      description: `${purchasedPack.name} - ${purchasedPack.credits} - credits`,
      amount: event.amount_total!,
      currency: event.currency!,
    },
  });
}
