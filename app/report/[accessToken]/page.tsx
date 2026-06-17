import Link from "next/link";
import { headers } from "next/headers";
import { ArrowLeft, Sparkles } from "lucide-react";
import { getReportByAccessToken } from "@/lib/reports/report-service";

type ReportPageProps = {
  params: Promise<{
    accessToken: string;
  }>;
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

export default async function ReportPage({ params }: ReportPageProps) {
  const { accessToken } = await params;
  const requestHeaders = await headers();
  const origin = getOriginFromRequest(requestHeaders.get("host"), requestHeaders.get("x-forwarded-proto"));
  const report = await getReportByAccessToken(accessToken, origin);

  return (
    <main>
      <div className="test-wrap">
        <nav className="top-nav" aria-label="Report navigation">
          <Link className="brand" href="/">
            <span className="brand-mark">
              <Sparkles size={18} aria-hidden="true" />
            </span>
            <span>AI Self Discovery</span>
          </Link>
        </nav>

        <section className="result-panel" aria-labelledby="report-title">
          {report ? (
            <>
              <p className="result-kicker">{report.mode === "mock" ? "示範完整檔案" : "完整感情人格檔案"}</p>
              <h1 id="report-title" className="result-title">
                {report.content.title}
              </h1>
              <p className="result-summary">{report.content.summary}</p>

              <div className="report-sections">
                {report.content.sections.map((section) => (
                  <article className="result-card" key={section.heading}>
                    <h3>{section.heading}</h3>
                    <p>{section.body}</p>
                  </article>
                ))}
              </div>

              <div className="mock-report">
                <h2>下一步建議</h2>
                <ul>
                  {report.content.nextSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
                <p className="notice">
                  檔案模式：{report.mode === "mock" ? "預覽模式" : "正式模式"}。
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="result-kicker">找不到檔案</p>
              <h1 id="report-title" className="result-title">
                這個專屬檔案連結目前無法使用。
              </h1>
              <p className="result-summary">
                連結可能已失效，或 Supabase service role 尚未設定完成。
              </p>
            </>
          )}

          <div className="hero-actions">
            <Link className="button button-secondary" href="/">
              <ArrowLeft size={18} aria-hidden="true" />
              回首頁
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
