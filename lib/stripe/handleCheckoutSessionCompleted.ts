import { getCreditsPack, PackId } from "@/types/billing";
import { writeFile } from "fs";
import "server-only";
import Stripe from "stripe";
import { prisma } from "../prisma";

export async function HandleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  try {
    console.log("@@@SESSION", session);
    if (!session.metadata) {
      throw new Error("missing metadata");
    }

    const { userId, packId } = session.metadata;
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

    console.log("@@@UPSERTING DB with:", {
      userId,
      packId,
      credits: purchasedPack.credits,
    });

    const balanceResult = await prisma.userBalance.upsert({
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

    console.log("@@@BALANCE UPDATED:", balanceResult);

    console.log("@@@CREATING PURCHASE RECORD");
    const purchaseResult = await prisma.userPurchase.create({
      data: {
        userId,
        stripeId: session.id,
        description: `${purchasedPack.name} - ${purchasedPack.credits} - credits`,
        amount: session.amount_total!,
        currency: session.currency!,
      },
    });

    console.log("@@@PURCHASE RECORD CREATED:", purchaseResult);

    return { success: true };
  } catch (error) {
    console.error("Error in HandleCheckoutSessionCompleted:", error);
    throw error; // Re-throw to be caught by the webhook handler
  }
}
