import Link from "next/link";
import { ArrowRight, Brain, ShieldCheck, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <main>
      <div className="page-shell">
        <nav className="top-nav" aria-label="主要導覽">
          <Link className="brand" href="/">
            <span className="brand-mark">
              <Sparkles size={18} aria-hidden="true" />
            </span>
            <span>Relationship Blueprint</span>
          </Link>
          <div className="nav-links">
            <Link href="/love-test">感情人格分析</Link>
          </div>
        </nav>

        <section className="hero premium-hero">
          <div>
            <p className="eyebrow">感情人格分析</p>
            <h1>
              你以為自己遇錯人
              <br />
              其實你只是一直重複同樣的選擇
            </h1>
            <p className="lead">
              有些關係不是突然變壞，而是你很早就感覺到了，只是不知道該怎麼解讀。
              用 3 分鐘回顧你在感情裡最常出現的反應，整理出你的關係模式與真正需求。
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/love-test">
                開始分析
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a className="button button-secondary" href="#framework">
                看看這份檔案在說什麼
              </a>
            </div>
          </div>

          <div className="insight-panel" aria-label="人格分析預覽">
            <div className="insight-header">
              <span>Relationship Blueprint</span>
              <strong>3 min</strong>
            </div>
            <div className="insight-note">
              <p>你真正想確認的，也許不是「對方適不適合」。</p>
              <p>而是為什麼每一次靠近，你都會在相似的地方開始不安、忍耐，或退後。</p>
            </div>
            <div className="insight-list">
              <span>你容易被什麼吸引</span>
              <span>你在哪裡最容易受傷</span>
              <span>你真正需要的安全感</span>
              <span>你反覆重演的關係選擇</span>
            </div>
          </div>
        </section>

        <section id="framework" className="section">
          <div className="section-header">
            <div>
              <p className="eyebrow">Relationship Blueprint</p>
              <h2 className="section-title">這不是要替你貼標籤，而是幫你看懂自己為什麼會這樣。</h2>
            </div>
            <Link className="button button-secondary" href="/love-test" aria-label="開始感情人格分析">
              開始分析
            </Link>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <Brain size={22} aria-hidden="true" />
              <h3>把反覆出現的關係情境整理出來</h3>
              <p>你可能不是第一次遇到忽冷忽熱、過度猜測、想靠近又想退後。分析會從情境反應裡找出你重複的模式。</p>
            </article>
            <article className="feature-card">
              <ShieldCheck size={22} aria-hidden="true" />
              <h3>看見你真正需要的安全感</h3>
              <p>有些需求不是太敏感，也不是太黏人，而是你在關係裡一直沒有被好好接住的地方。</p>
            </article>
            <article className="feature-card">
              <Sparkles size={22} aria-hidden="true" />
              <h3>得到一份可以截圖分享的個人檔案</h3>
              <p>不是空泛的性格描述，而是把那些你很難說出口的內心反應，整理成更清楚的語言。</p>
            </article>
          </div>
        </section>

        <footer className="site-disclaimer">
          本分析內容僅供自我探索、個人成長與一般資訊參考。本服務不提供醫療、心理治療、精神疾病診斷、法律或專業諮詢建議。
          若您有心理健康或醫療相關需求，請尋求合格專業人士協助。
        </footer>
      </div>
    </main>
  );
}
