import Link from "next/link";
import { headers } from "next/headers";
import { ArrowLeft, CheckCircle2, ExternalLink, Sparkles } from "lucide-react";
import { getReportPlan } from "@/lib/payments/plans";
import { isStripeConfigured, stripe } from "@/lib/payments/stripe";
import { getAIReportMode, getOrCreateAIReport } from "@/lib/reports/report-service";
import { isSupabaseAdminConfigured, supabaseAdmin } from "@/lib/supabase/server";

type SuccessPageProps = {
  searchParams: Promise<{
    mode?: string;
    plan?: string;
    session_id?: string;
    test_session_id?: string;
  }>;
};

type SyncedPayment = {
  status: string | null;
  guestId: string | null;
  testSessionId: string | null;
  planId: string | null;
};

function getOriginFromRequest(host: string | null, protocol: string | null) {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (!host) {
    return "http://127.0.0.1:3000";
  }

  return `${protocol ?? "http"}://${host}`;
}

async function syncPaymentStatus(sessionId: string | undefined): Promise<SyncedPayment> {
  if (!sessionId || sessionId.startsWith("placeholder_") || !isStripeConfigured || !stripe) {
    return {
      status: sessionId?.startsWith("placeholder_") ? "placeholder" : null,
      guestId: null,
      testSessionId: null,
      planId: null
    };
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const status = session.payment_status === "paid" ? "paid" : session.status ?? "unknown";

  if (isSupabaseAdminConfigured && supabaseAdmin) {
    await supabaseAdmin
      .from("payments")
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq("stripe_session_id", session.id);
  }

  return {
    status,
    guestId: session.metadata?.guest_id ?? null,
    testSessionId: session.metadata?.test_session_id ?? null,
    planId: session.metadata?.plan_id ?? null
  };
}

export default async function PaymentSuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const requestHeaders = await headers();
  const origin = getOriginFromRequest(requestHeaders.get("host"), requestHeaders.get("x-forwarded-proto"));
  const payment = await syncPaymentStatus(params.session_id);
  const plan = getReportPlan(payment.planId ?? params.plan);
  const isPlaceholder = params.mode === "placeholder" || params.session_id?.startsWith("placeholder_");
  const testSessionId = payment.testSessionId ?? params.test_session_id;
  const aiMode = getAIReportMode();

  const report =
    plan && testSessionId
      ? await getOrCreateAIReport({
          guestId: payment.guestId,
          testSessionId,
          planId: plan.id,
          stripeSessionId: params.session_id,
          paymentStatus: payment.status,
          origin
        })
      : null;

  return (
    <main>
      <div className="test-wrap">
        <nav className="top-nav" aria-label="Payment navigation">
          <Link className="brand" href="/">
            <span className="brand-mark">
              <Sparkles size={18} aria-hidden="true" />
            </span>
            <span>AI Self Discovery</span>
          </Link>
        </nav>

        <section className="result-panel" aria-labelledby="payment-success-title">
          <p className="result-kicker">付款完成</p>
          <h1 id="payment-success-title" className="result-title">
            {report ? "完整感情人格檔案已解鎖" : "正在建立完整感情人格檔案"}
          </h1>
          <p className="result-summary">
            {aiMode === "mock"
              ? "目前為預覽模式，系統會顯示一份示範完整檔案，不會消耗 API 額度。"
              : "你的完整檔案正在透過報告服務建立。"}
          </p>

          <div className="result-grid">
            <article className="result-card">
              <h3>{plan?.name ?? "完整感情人格檔案"}</h3>
              <p>
                {plan
                  ? `已解鎖方案：${plan.name}，NT$${plan.amount}。`
                  : "目前缺少方案資訊，暫時無法建立完整檔案。"}
              </p>
            </article>
            <article className="result-card">
              <h3>狀態</h3>
              <p>
                {isPlaceholder
                  ? "目前使用付款預覽流程。設定 Stripe 環境變數後即可啟用測試付款。"
                  : `付款狀態：${payment.status ?? "確認中"}。`}
              </p>
            </article>
          </div>

          {report ? (
            <div className="mock-report">
              <p className="result-kicker">{report.mode === "mock" ? "示範完整檔案" : "完整檔案"}</p>
              <h2>{report.content.title}</h2>
              <p>{report.content.summary}</p>

              <div className="report-sections">
                {report.content.sections.map((section) => (
                  <article className="result-card" key={section.heading}>
                    <h3>{section.heading}</h3>
                    <p>{section.body}</p>
                  </article>
                ))}
              </div>

              <h3>下一步建議</h3>
              <ul>
                {report.content.nextSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>

              <div className="hero-actions">
                <Link className="button button-primary" href={`/report/${report.accessToken}`}>
                  開啟專屬檔案連結
                  <ExternalLink size={18} aria-hidden="true" />
                </Link>
              </div>

              <p className="notice">
                專屬檔案連結：<Link href={`/report/${report.accessToken}`}>{report.reportUrl}</Link>
              </p>
              {!report.persisted && (
                <p className="notice">
                  目前尚未設定 Supabase service role，因此此檔案只會在本頁顯示，尚未寫入 ai_reports。
                </p>
              )}
            </div>
          ) : (
            <div className="mock-report">
              <p className="result-kicker">檔案建立中</p>
              <h2>正在建立完整感情人格檔案</h2>
              <p>目前缺少方案或分析識別資料。請回到免費結果頁重新解鎖。</p>
            </div>
          )}

          <div className="hero-actions">
            <Link className="button button-secondary" href="/love-test/result">
              回到免費結果
            </Link>
            <Link className="button button-secondary" href="/">
              <ArrowLeft size={18} aria-hidden="true" />
              回首頁
            </Link>
          </div>

          <p className="notice">
            <CheckCircle2 size={14} aria-hidden="true" /> test_session_id: {testSessionId ?? "not provided"}
          </p>
        </section>
      </div>
    </main>
  );
}
