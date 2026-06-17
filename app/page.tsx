import Link from "next/link";
import { ArrowDown, ArrowRight, Brain, Compass, ShieldCheck, Sparkles } from "lucide-react";

const archetypePreviews = [
  {
    name: "理性觀察者",
    badge: "信任建立型",
    quote: "你其實不是慢熱。你只是知道，心動很容易，但信任很難。"
  },
  {
    name: "守護型戀人",
    badge: "穩定照顧型",
    quote: "你總是先照顧別人，卻很少有人發現你也需要被照顧。"
  },
  {
    name: "獨立旅人",
    badge: "自由邊界型",
    quote: "你可以很愛一個人，但你不想為了被愛，變得不像自己。"
  },
  {
    name: "深情投入者",
    badge: "高敏投入型",
    quote: "你不是想太多，你只是把每個細節都放進心裡確認自己還重不重要。"
  }
];

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
            <Link href="/love-test">開始分析</Link>
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
              用 3 分鐘回顧你在感情裡最常出現的反應，整理出你的關係模式、情緒觸發點與真正需求。
            </p>
            <div className="hero-actions">
              <Link className="button button-primary button-large" href="/love-test">
                開始 3 分鐘分析
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a className="button button-secondary" href="#preview">
                先看結果長什麼樣
                <ArrowDown size={18} aria-hidden="true" />
              </a>
            </div>
            <a className="scroll-cue" href="#journey">
              <span>往下探索，你會先看見這份檔案如何理解你</span>
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>

          <div className="hero-dossier" aria-label="感情人格檔案預覽">
            <div className="dossier-topline">
              <span>Relationship Blueprint</span>
              <strong>42 scenarios</strong>
            </div>
            <div className="dossier-card">
              <span className="dossier-stamp">PROFILE CARD</span>
              <p className="dossier-label">你的專屬情感人格卡</p>
              <h2>理性觀察者</h2>
              <p className="dossier-quote">
                你其實不是慢熱。
                <br />
                你只是知道，
                <br />
                心動很容易，
                <br />
                但信任很難。
              </p>
              <div className="dossier-footer">
                <span>Relationship Blueprint</span>
                <span>ID #042B</span>
              </div>
            </div>
          </div>
        </section>

        <section id="journey" className="section flow-section">
          <div className="section-header">
            <div>
              <p className="eyebrow">探索路線</p>
              <h2 className="section-title">你不需要先懂自己，照著情境回答就好。</h2>
            </div>
            <Link className="button button-secondary" href="/love-test">
              直接開始
            </Link>
          </div>

          <div className="journey-grid">
            <article className="journey-step">
              <span>01</span>
              <h3>回到真實情境</h3>
              <p>不是問你是哪種人，而是問你在訊息未讀、約會取消、關係變冷時，最可能怎麼反應。</p>
            </article>
            <article className="journey-step">
              <span>02</span>
              <h3>整理反覆模式</h3>
              <p>你會看見自己常在哪些地方用力、退讓、猜測，或假裝不在意。</p>
            </article>
            <article className="journey-step">
              <span>03</span>
              <h3>得到個人檔案</h3>
              <p>最後不是一個標籤，而是一份能說出你關係需求、盲點與成長方向的分析報告。</p>
            </article>
          </div>
        </section>

        <section id="preview" className="section preview-stage" aria-labelledby="preview-title">
          <div className="preview-copy">
            <p className="eyebrow">人格卡預覽</p>
            <h2 id="preview-title">結果會像一張可以截圖的感情人格卡。</h2>
            <p>
              先讓你被一句話擊中，再慢慢展開關於你、你的需求、你的盲點與成長方向。
              這不是要你相信一個標籤，而是讓你看見自己反覆出現的關係選擇。
            </p>
          </div>
          <div className="archetype-preview-grid">
            {archetypePreviews.map((item) => (
              <article className="archetype-preview-card" key={item.name}>
                <span>Relationship Blueprint</span>
                <h3>{item.name}</h3>
                <small>{item.badge}</small>
                <p>「{item.quote}」</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section transition-band">
          <p>如果你曾經想過：「為什麼我每次都卡在同一種關係裡？」</p>
          <h2>這份分析會先替你把那個循環說清楚。</h2>
          <Link className="button button-primary" href="/love-test">
            開始看懂自己的模式
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </section>

        <section id="framework" className="section">
          <div className="section-header">
            <div>
              <p className="eyebrow">為什麼值得繼續</p>
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
              <Compass size={22} aria-hidden="true" />
              <h3>知道下一步可以怎麼做</h3>
              <p>結果會把你的核心優勢、容易受傷的位置、關係需求與成長方向整理成更容易理解的語言。</p>
            </article>
          </div>
        </section>

        <section className="section final-cta">
          <p className="eyebrow">準備好了</p>
          <h2>不用想太久，選最像你的那個反應就好。</h2>
          <p>你回答的不是題目，是你在關係裡一次又一次出現過的自己。</p>
          <Link className="button button-primary button-large" href="/love-test">
            開始分析
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </section>

        <footer className="site-disclaimer">
          本分析內容僅供自我探索、個人成長與一般資訊參考。本服務不提供醫療、心理治療、精神疾病診斷、法律或專業諮詢建議。
          若您有心理健康或醫療相關需求，請尋求合格專業人士協助。
        </footer>
      </div>
    </main>
  );
}
