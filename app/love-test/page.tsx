"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { loveQuestions } from "@/lib/love-test/questions";
import { isCompleteLoveTest, type LoveAnswerMap } from "@/lib/love-test/rules";

const storageKey = "love-test-answers";

export default function LoveTestPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<LoveAnswerMap>({});
  const currentQuestion = loveQuestions[currentIndex];
  const selectedOptionId = answers[currentQuestion.id];
  const progress = ((currentIndex + 1) / loveQuestions.length) * 100;
  const canGoNext = Boolean(selectedOptionId);
  const isLastQuestion = currentIndex === loveQuestions.length - 1;

  const answeredCount = useMemo(
    () => loveQuestions.filter((question) => Boolean(answers[question.id])).length,
    [answers]
  );

  function selectOption(optionId: string) {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: optionId
    }));
  }

  function goBack() {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }

  function goNext() {
    if (!canGoNext) {
      return;
    }

    if (!isLastQuestion) {
      setCurrentIndex((index) => index + 1);
      return;
    }

    const finalAnswers = {
      ...answers,
      [currentQuestion.id]: selectedOptionId
    };

    if (isCompleteLoveTest(finalAnswers)) {
      window.localStorage.setItem(storageKey, JSON.stringify(finalAnswers));
      router.push("/love-test/result");
    }
  }

  return (
    <main>
      <div className="test-wrap">
        <nav className="top-nav" aria-label="分析導覽">
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
              建立你的感情人格檔案
            </h1>
            <p>
              請依照第一直覺選擇最接近你的反應。題目沒有標準答案，重點是捕捉你在關係情境中的自然模式。
            </p>
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

          <h2 className="scenario-title">{currentQuestion.prompt}</h2>

          <div className="option-list" role="radiogroup" aria-label={currentQuestion.prompt}>
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOptionId === option.id;

              return (
                <button
                  key={option.id}
                  className={`option-button${isSelected ? " is-selected" : ""}`}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => selectOption(option.id)}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <div className="test-actions">
            <button
              className="button button-secondary"
              type="button"
              onClick={goBack}
              disabled={currentIndex === 0}
            >
              <ArrowLeft size={18} aria-hidden="true" />
              上一題
            </button>
            <button className="button button-primary" type="button" onClick={goNext} disabled={!canGoNext}>
              {isLastQuestion ? (
                <>
                  查看分析結果
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
