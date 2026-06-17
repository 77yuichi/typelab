"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { loveQuestions } from "@/lib/love-test/questions";
import { isCompleteLoveTest, type LoveAnswerMap } from "@/lib/love-test/rules";

const storageKey = "love-test-answers";

export default function LoveTestPage() {
  const router = useRouter();
  const timersRef = useRef<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<LoveAnswerMap>({});
  const [transitionState, setTransitionState] = useState<"idle" | "selected" | "exiting">("idle");
  const currentQuestion = loveQuestions[currentIndex];
  const selectedOptionId = answers[currentQuestion.id];
  const progress = ((currentIndex + 1) / loveQuestions.length) * 100;
  const canGoNext = Boolean(selectedOptionId);
  const isLastQuestion = currentIndex === loveQuestions.length - 1;
  const isTransitioning = transitionState !== "idle";

  const answeredCount = useMemo(
    () => loveQuestions.filter((question) => Boolean(answers[question.id])).length,
    [answers]
  );

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  function clearTransitionTimers() {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }

  function completeOrMoveForward(finalAnswers: LoveAnswerMap) {
    if (!isLastQuestion) {
      setCurrentIndex((index) => index + 1);
      setTransitionState("idle");
      return;
    }

    if (isCompleteLoveTest(finalAnswers)) {
      window.localStorage.setItem(storageKey, JSON.stringify(finalAnswers));
      router.push("/love-test/result");
    }
  }

  function scheduleAdvance(finalAnswers: LoveAnswerMap) {
    const exitTimer = window.setTimeout(() => {
      setTransitionState("exiting");
    }, 150);

    const advanceTimer = window.setTimeout(() => {
      completeOrMoveForward(finalAnswers);
    }, 340);

    timersRef.current = [exitTimer, advanceTimer];
  }

  function selectOption(optionId: string) {
    if (isTransitioning) {
      return;
    }

    clearTransitionTimers();

    const finalAnswers = {
      ...answers,
      [currentQuestion.id]: optionId
    };

    setAnswers(finalAnswers);
    setTransitionState("selected");
    scheduleAdvance(finalAnswers);
  }

  function goBack() {
    clearTransitionTimers();
    setTransitionState("idle");
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }

  function goNext() {
    if (!canGoNext || isTransitioning) {
      return;
    }

    const finalAnswers = {
      ...answers,
      [currentQuestion.id]: selectedOptionId
    };

    setTransitionState("exiting");
    const advanceTimer = window.setTimeout(() => {
      completeOrMoveForward(finalAnswers);
    }, 220);
    timersRef.current = [advanceTimer];
  }

  return (
    <main>
      <div className="test-wrap">
        <nav className="top-nav" aria-label="分析頁導覽">
          <Link className="brand" href="/">
            <span className="brand-mark">
              <Sparkles size={18} aria-hidden="true" />
            </span>
            <span>Relationship Blueprint</span>
          </Link>
        </nav>

        <section className="test-panel" aria-labelledby="assessment-title">
          <div className="assessment-intro">
            <p className="eyebrow">感情人格分析</p>
            <h1 id="assessment-title" className="question-title">
              先不要想標準答案，只要選最像你的反應。
            </h1>
            <p>
              這不是考試，也不是要判斷你是哪種人。每一題都來自常見的關係情境，
              你只需要回到當下，選出最接近自己會做的選擇。
            </p>
          </div>

          <div className="assessment-guide" aria-label="分析流程提示">
            <span>1. 回到情境</span>
            <span>2. 選最接近的反應</span>
            <span>3. 生成你的個人檔案</span>
          </div>

          <div className="progress" aria-label="分析進度">
            <div className="progress-meta">
              <span>
                第 {currentIndex + 1} 題 / 共 {loveQuestions.length} 題
              </span>
              <span>{answeredCount} 題已完成</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className={`question-stage ${transitionState === "exiting" ? "is-exiting" : ""}`}>
            <div className="question-block">
              <p className="question-context">想像這是最近真的發生在你身上的情境。</p>
              <h2 className="scenario-title">{currentQuestion.prompt}</h2>
            </div>

            <div className="option-list" role="radiogroup" aria-label={currentQuestion.prompt}>
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptionId === option.id;

                return (
                  <button
                    key={option.id}
                    className={`option-button${isSelected ? " is-selected" : ""}${
                      isTransitioning && !isSelected ? " is-muted" : ""
                    }`}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => selectOption(option.id)}
                    disabled={isTransitioning}
                  >
                    <span>{option.label}</span>
                    {isSelected && <Check size={17} aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="soft-hint">
            {isTransitioning
              ? "已記錄你的反應，正在前往下一個情境。"
              : "如果兩個選項都像你，選那個「你比較不想承認，但更常發生」的反應。"}
          </p>

          <div className="test-actions">
            <button
              className="button button-secondary"
              type="button"
              onClick={goBack}
              disabled={currentIndex === 0 || isTransitioning}
            >
              <ArrowLeft size={18} aria-hidden="true" />
              上一題
            </button>
            <button className="button button-primary" type="button" onClick={goNext} disabled={!canGoNext || isTransitioning}>
              {isTransitioning ? (
                <>
                  已選擇
                  <Check size={18} aria-hidden="true" />
                </>
              ) : isLastQuestion ? (
                <>
                  查看我的檔案
                  <Check size={18} aria-hidden="true" />
                </>
              ) : (
                <>
                  下一題
                  <ArrowRight size={18} aria-hidden="true" />
                </>
              )}
            </button>
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
