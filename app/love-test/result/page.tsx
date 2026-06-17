"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowLeft, Copy, LockKeyhole, RotateCcw, Sparkles } from "lucide-react";
import { calculateLoveResult, type LoveAnswerMap, type LoveResult } from "@/lib/love-test/rules";
import { reportPlans, type ReportPlanId } from "@/lib/payments/plans";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

const storageKey = "love-test-answers";
const guestIdKey = "love-test-guest-id";
const sessionIdKey = "love-test-session-id";

const upgradeBenefits = [
  "為什麼你總是被某種類型的人吸引",
  "你最容易在什麼情況下受傷",
  "你在感情中的盲點",
  "什麼樣的人最適合你",
  "如何建立更穩定的關係"
];

export default function LoveTestResultPage() {
  const [answers, setAnswers] = useState<LoveAnswerMap | null>(null);
  const [hasLoadedAnswers, setHasLoadedAnswers] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saved" | "skipped" | "error">("idle");
  const [guestId, setGuestId] = useState<string | null>(null);
  const [testSessionId, setTestSessionId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [shareState, setShareState] = useState<"idle" | "copied" | "error">("idle");
  const [checkoutState, setCheckoutState] = useState<{
    planId: ReportPlanId | null;
    message: string | null;
    isLoading: boolean;
  }>({
    planId: null,
    message: null,
    isLoading: false
  });

  useEffect(() => {
    queueMicrotask(() => {
      const raw = window.localStorage.getItem(storageKey);
      const existingGuestId = window.localStorage.getItem(guestIdKey) ?? crypto.randomUUID();
      const existingSessionId = window.localStorage.getItem(sessionIdKey) ?? crypto.randomUUID();

      window.localStorage.setItem(guestIdKey, existingGuestId);
      window.localStorage.setItem(sessionIdKey, existingSessionId);
      setGuestId(existingGuestId);
      setTestSessionId(existingSessionId);

      if (!raw) {
        setHasLoadedAnswers(true);
        return;
      }

      try {
        setAnswers(JSON.parse(raw) as LoveAnswerMap);
      } catch {
        setSaveState("error");
      } finally {
        setHasLoadedAnswers(true);
      }
    });
  }, []);

  const result = useMemo<LoveResult | null>(() => {
    if (!answers) {
      return null;
    }

    return calculateLoveResult(answers);
  }, [answers]);

  const spectrumProfiles = useMemo(() => {
    if (!result) {
      return [];
    }

    return Object.values(result.dimensionProfiles).sort((a, b) => b.index - a.index);
  }, [result]);

  useEffect(() => {
    if (!result || !answers || !testSessionId || !isSupabaseConfigured || !supabase) {
      return;
    }

    let isMounted = true;

    async function saveResult() {
      const { error } = await supabase!.from("love_test_results").insert({
        locale: "zh-TW",
        session_id: testSessionId,
        answers,
        scores: result!.scores,
        primary_archetype: result!.primaryArchetype,
        secondary_archetype: result!.secondaryArchetype,
        result_title: result!.title,
        result_summary: result!.aboutYou
      });

      if (!isMounted) {
        return;
      }

      setSaveState(error ? "error" : "saved");
    }

    saveResult();

    return () => {
      isMounted = false;
    };
  }, [answers, result, testSessionId]);

  useEffect(() => {
    if (!checkoutUrl) {
      return;
    }

    window.location.assign(checkoutUrl);
  }, [checkoutUrl]);

  async function copyResultLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareState("copied");
      window.setTimeout(() => setShareState("idle"), 2400);
    } catch {
      setShareState("error");
      window.setTimeout(() => setShareState("idle"), 2400);
    }
  }

  async function startCheckout(planId: ReportPlanId) {
    if (!guestId || !testSessionId) {
      setCheckoutState({
        planId,
        message: "目前還在建立你的分析紀錄，請稍等幾秒後再試一次。",
        isLoading: false
      });
      return;
    }

    setCheckoutState({ planId, message: null, isLoading: true });

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          planId,
          guestId,
          testSessionId
        })
      });

      const data = (await response.json()) as {
        checkoutUrl?: string;
        message?: string;
        error?: string;
      };

      if (!response.ok || !data.checkoutUrl) {
        setCheckoutState({
          planId,
          message: data.error ?? "付款頁目前無法建立，請稍後再試。",
          isLoading: false
        });
        return;
      }

      if (data.message) {
        window.localStorage.setItem("checkout-placeholder-message", data.message);
      }

      setCheckoutUrl(data.checkoutUrl);
    } catch {
      setCheckoutState({
        planId,
        message: "付款連線暫時沒有成功，請稍後再試。",
        isLoading: false
      });
    }
  }

  if (!hasLoadedAnswers) {
    return (
      <main>
        <div className="test-wrap">
          <section className="result-panel">
            <p className="result-kicker">正在整理你的檔案</p>
            <h1 className="result-title">正在建立你的感情人格分析...</h1>
          </section>
        </div>
      </main>
    );
  }

  if (!result) {
    return (
      <main>
        <div className="test-wrap">
          <nav className="top-nav" aria-label="主要導覽">
            <Link className="brand" href="/">
              <span className="brand-mark">
                <Sparkles size={18} aria-hidden="true" />
              </span>
              <span>Relationship Blueprint</span>
            </Link>
          </nav>

          <section className="result-panel">
            <p className="result-kicker">還沒有分析紀錄</p>
            <h1 className="result-title">先完成一次感情人格分析，才能看見你的專屬檔案。</h1>
            <p className="result-summary">
              這份分析會依照你在不同關係情境裡的反應，整理出你最常重複的感情模式。
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/love-test">
                開始分析
              </Link>
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

  const visibleSaveState = saveState === "idle" && !isSupabaseConfigured ? "skipped" : saveState;

  return (
    <main>
      <div className="test-wrap">
        <nav className="top-nav" aria-label="主要導覽">
          <Link className="brand" href="/">
            <span className="brand-mark">
              <Sparkles size={18} aria-hidden="true" />
            </span>
            <span>Relationship Blueprint</span>
          </Link>
        </nav>

        <section className="result-panel" aria-labelledby="result-title">
          <p className="result-kicker">你的感情人格檔案</p>
          <h1 id="result-title" className="result-title">
            {result.title}
          </h1>

          <div className="result-reader-path" aria-label="閱讀順序">
            <span>先看人格卡</span>
            <span>再看關係光譜</span>
            <span>最後決定要不要解鎖完整檔案</span>
          </div>

          <div className="share-card share-card-premium" aria-label="人格分享卡">
            <span className="share-card-stamp">OFFICIAL PROFILE</span>
            <div>
              <span className="share-card-brand">Relationship Blueprint</span>
              <h2>{result.archetypeLabel}</h2>
            </div>
            <p>「{result.signatureQuote}」</p>
            <span className="share-card-mark">專屬感情人格檔案</span>
          </div>

          <div className="share-actions">
            <button className="button button-secondary" type="button" onClick={copyResultLink}>
              <Copy size={18} aria-hidden="true" />
              複製結果連結
            </button>
            <span>也可以直接截圖上方人格卡，傳給朋友看。</span>
          </div>
          {shareState === "copied" && <p className="share-feedback">已複製連結，可以傳給朋友一起看。</p>}
          {shareState === "error" && <p className="share-feedback">目前無法複製連結，你可以直接截圖分享。</p>}

          <a className="scroll-cue result-cue" href="#spectrum">
            <span>往下看，你會看到這份檔案如何把你的反應變成可理解的模式</span>
            <ArrowDown size={16} aria-hidden="true" />
          </a>

          <section id="spectrum" className="spectrum-section" aria-labelledby="spectrum-title">
            <p className="result-kicker">關係光譜</p>
            <h2 id="spectrum-title">你的感情模式分佈</h2>
            <p>
              這不是考試分數，而是用數據感幫你看見：你在不同關係情境裡，哪些反應最常被觸發。
            </p>
            <div className="spectrum-list">
              {spectrumProfiles.map((profile) => (
                <div className="spectrum-row" key={profile.label}>
                  <div className="spectrum-meta">
                    <span>{profile.label}</span>
                    <strong>{profile.index}%</strong>
                  </div>
                  <div className="spectrum-track">
                    <div className="spectrum-fill" style={{ width: `${profile.index}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="report-section" aria-labelledby="about-you-title">
            <p className="result-kicker">關於你</p>
            <h2 id="about-you-title">你在關係裡最常被誤解的地方</h2>
            <p className="result-summary">{result.aboutYou}</p>
          </section>

          <section id="heart-check" className="heart-check" aria-labelledby="heart-check-title">
            <p className="result-kicker">最戳心的地方</p>
            <h2 id="heart-check-title">也許你真正想知道的是這些</h2>
            <div className="heart-check-grid">
              <article className="heart-check-card">
                <span>你真正害怕的是什麼？</span>
                <p>{result.heartCheck.fear}</p>
              </article>
              <article className="heart-check-card">
                <span>你最渴望的是什麼？</span>
                <p>{result.heartCheck.desire}</p>
              </article>
              <article className="heart-check-card">
                <span>你最容易忽略的是什麼？</span>
                <p>{result.heartCheck.overlooked}</p>
              </article>
            </div>
          </section>

          <div className="profile-summary">
            <div>
              <span>感情原型</span>
              <strong>{result.archetypeLabel}</strong>
            </div>
            <div>
              <span>分析重點</span>
              <strong>關係模式</strong>
            </div>
            <div>
              <span>回顧情境</span>
              <strong>42 題</strong>
            </div>
          </div>

          <div className="result-grid">
            <article className="result-card">
              <h3>你的核心優勢</h3>
              <ul>
                {result.coreStrengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="result-card">
              <h3>你可能遇到的挑戰</h3>
              <ul>
                {result.challenges.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="result-card">
              <h3>你在關係中的需求</h3>
              <p>{result.relationshipNeeds}</p>
            </article>
            <article className="result-card">
              <h3>成長方向</h3>
              <p>{result.growthDirection}</p>
            </article>
          </div>

          <div className="transition-band result-transition">
            <p>如果你看到這裡，有一段覺得被說中。</p>
            <h2>完整檔案會繼續回答：為什麼你會這樣，以及下一次可以怎麼不再重演。</h2>
          </div>

          <div className="pricing-section pricing-premium" aria-labelledby="paid-report-title">
            <p className="result-kicker">完整人格檔案</p>
            <h2 id="paid-report-title">感情的解法，藏在對模式的覺察裡。</h2>
            <p>
              免費結果會先讓你看見自己的主要模式；完整檔案會把那些「我為什麼又這樣」的反覆情境，
              轉成更清楚的答案與下一步。
            </p>
            <h3>完整人格檔案將告訴你：</h3>
            <div className="upgrade-list">
              {upgradeBenefits.map((benefit) => (
                <span key={benefit}>✓ {benefit}</span>
              ))}
            </div>

            <div className="pricing-grid">
              {Object.values(reportPlans).map((plan) => (
                <article className="pricing-card" key={plan.id}>
                  <div>
                    <h3>{plan.name}</h3>
                    <p>{plan.description}</p>
                  </div>
                  <strong>NT${plan.amount}</strong>
                  <button
                    className="button button-primary"
                    type="button"
                    onClick={() => startCheckout(plan.id)}
                    disabled={checkoutState.isLoading}
                  >
                    <LockKeyhole size={18} aria-hidden="true" />
                    {checkoutState.isLoading && checkoutState.planId === plan.id ? "準備中" : "解鎖完整檔案"}
                  </button>
                </article>
              ))}
            </div>
            {checkoutState.message && <p className="notice">{checkoutState.message}</p>}
          </div>

          <p className="notice">
            {visibleSaveState === "saved" && "分析紀錄已保存。"}
            {visibleSaveState === "skipped" && "目前尚未設定 Supabase 環境變數，因此只在本機顯示結果。"}
            {visibleSaveState === "error" && "分析結果顯示成功，但資料保存時發生問題。"}
            {visibleSaveState === "idle" && "正在保存分析紀錄..."}
          </p>

          <div className="hero-actions">
            <Link className="button button-secondary" href="/love-test">
              <RotateCcw size={18} aria-hidden="true" />
              重新分析
            </Link>
            <Link className="button button-secondary" href="/">
              <ArrowLeft size={18} aria-hidden="true" />
              回首頁
            </Link>
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
