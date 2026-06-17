import { NextResponse } from "next/server";
import { getReportPlan } from "@/lib/payments/plans";
import { isStripeConfigured, stripe } from "@/lib/payments/stripe";
import { isSupabaseAdminConfigured, supabaseAdmin } from "@/lib/supabase/server";

type CheckoutBody = {
  planId?: string;
  testSessionId?: string;
  guestId?: string;
};

function getBaseUrl(request: Request) {
  return process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;
}

export async function POST(request: Request) {
  const body = (await request.json()) as CheckoutBody;
  const plan = getReportPlan(body.planId);
  const testSessionId = body.testSessionId?.trim();
  const guestId = body.guestId?.trim();

  if (!plan) {
    return NextResponse.json({ error: "Unknown report plan." }, { status: 400 });
  }

  if (!testSessionId || !guestId) {
    return NextResponse.json(
      { error: "Missing guest_id or test_session_id. Please finish the test again." },
      { status: 400 }
    );
  }

  const baseUrl = getBaseUrl(request);

  if (!isStripeConfigured || !stripe) {
    const placeholderSessionId = `placeholder_${crypto.randomUUID()}`;

    if (isSupabaseAdminConfigured && supabaseAdmin) {
      await supabaseAdmin.from("payments").insert({
        guest_id: guestId,
        test_session_id: testSessionId,
        plan_id: plan.id,
        amount: plan.amount,
        currency: plan.currency,
        status: "placeholder",
        stripe_session_id: placeholderSessionId
      });
    }

    return NextResponse.json({
      mode: "placeholder",
      checkoutUrl: `${baseUrl}/payment/success?mode=placeholder&plan=${plan.id}&session_id=${placeholderSessionId}&test_session_id=${testSessionId}`,
      message: "Stripe is not configured. Set STRIPE_SECRET_KEY to enable test mode checkout."
    });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: plan.currency.toLowerCase(),
          unit_amount: plan.amount * 100,
          product_data: {
            name: plan.name,
            description: plan.description
          }
        }
      }
    ],
    metadata: {
      guest_id: guestId,
      test_session_id: testSessionId,
      plan_id: plan.id
    },
    success_url: `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan.id}&test_session_id=${testSessionId}`,
    cancel_url: `${baseUrl}/love-test/result?checkout=cancelled`
  });

  if (isSupabaseAdminConfigured && supabaseAdmin) {
    await supabaseAdmin.from("payments").insert({
      guest_id: guestId,
      test_session_id: testSessionId,
      plan_id: plan.id,
      amount: plan.amount,
      currency: plan.currency,
      status: "checkout_created",
      stripe_session_id: checkoutSession.id
    });
  }

  return NextResponse.json({
    mode: "stripe",
    checkoutUrl: checkoutSession.url
  });
}
