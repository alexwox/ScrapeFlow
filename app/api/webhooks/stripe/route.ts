import { HandleCheckoutSessionCompleted } from "@/lib/stripe/handleCheckoutSessionCompleted";
import { stripe } from "@/lib/stripe/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("stripe-signature") as string;

  try {
    const secret = process.env.STRIPE_WEBHOOK_SECRET!;
    const event = stripe.webhooks.constructEvent(body, signature, secret);
    console.log("@@Event Type", event.type);
    switch (event.type) {
      case "checkout.session.completed":
        console.log("@@Event Data Object", event.data.object);
        console.log("Calling HandleChckoutSessionCompleted");
        HandleCheckoutSessionCompleted(event.data.object);
        break;
      default:
        break;
    }
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Stripe Webhook failed", error);

    return new NextResponse("webhook error", { status: 400 });
  }
}
