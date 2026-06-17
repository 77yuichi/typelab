# AI Self Discovery MVP

Implemented scope:

- Next.js app shell
- Supabase client connection and schema
- Home page
- Relationship Blueprint assessment page
- Assessment flow
- Free result page
- Rule-based result calculation
- Paid report CTA
- Stripe checkout flow with placeholder fallback
- Payment success page with mock AI report
- AI report service with mock/live mode switch
- Access-token report URL

Not included yet:

- OpenAI API
- Email
- Profile dashboard
- Sharing

Sprint 2 keeps OpenAI disabled. Paid checkout unlocks a mock AI report only.
Sprint 3 keeps `AI_REPORT_MODE=mock` by default, so no OpenAI API credits are used unless you manually set `AI_REPORT_MODE=live`.

## Local setup

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and fill Supabase values when you want result persistence.

For Stripe test checkout, set:

```bash
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3000
```

If `STRIPE_SECRET_KEY` is missing, checkout uses a local placeholder success flow with a clear setup message.

For report generation:

```bash
AI_REPORT_MODE=mock
OPENAI_MODEL=gpt-5-mini
OPENAI_API_KEY=
```

Only set `AI_REPORT_MODE=live` when you want the report service to call OpenAI.

## Supabase

Run `supabase/schema.sql` in the Supabase SQL editor.
