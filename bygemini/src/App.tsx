/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Lock, 
  Eye, 
  Share2, 
  ArrowRight, 
  ArrowDown, 
  Sparkles, 
  ShieldCheck, 
  Smile, 
  RefreshCw, 
  Fingerprint, 
  ChevronLeft, 
  BadgeCheck,
  LockKeyhole,
  Bookmark
} from 'lucide-react';
import { questions, personalities, Question, Option } from './data/questions';

export default function App() {
  // Navigation states
  const [step, setStep] = useState<'home' | 'quiz' | 'result'>('home');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, 'a' | 'b' | 'c' | 'd'>>({});
  
  // Custom interactive mechanics
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isPaying, setIsPaying] = useState<boolean>(false);
  const [payStep, setPayStep] = useState<number>(0);
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'deep' | null>(null);
  const [showShareNotification, setShowShareNotification] = useState<boolean>(false);
  const [recentAnswersHistory, setRecentAnswersHistory] = useState<number[]>([]);

  // Automatically scroll to the top of the viewport on state/step transitions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step, currentQuestionIndex, isUnlocked]);

  // Handle option selection during the quiz
  const handleSelectOption = (qId: number, type: 'a' | 'b' | 'c' | 'd') => {
    setAnswers(prev => ({
      ...prev,
      [qId]: type
    }));

    // Save history for back navigation
    if (!recentAnswersHistory.includes(currentQuestionIndex)) {
      setRecentAnswersHistory(prev => [...prev, currentQuestionIndex]);
    }

    // Dynamic tiny delay for smooth animation feedback before shifting focus
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setStep('result');
      }
    }, 280);
  };

  // Back-tracking helper
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Replay & Reset logic
  const handleReset = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setRecentAnswersHistory([]);
    setIsUnlocked(false);
    setSelectedPlan(null);
    setStep('home');
  };

  // Math to derive the user's primary personality profile
  const countDistribution = () => {
    const counts = { a: 0, b: 0, c: 0, d: 0 };
    Object.values(answers).forEach(val => {
      if (val === 'a' || val === 'b' || val === 'c' || val === 'd') {
        counts[val] = counts[val] + 1;
      }
    });
    return counts;
  };

  const getPrimaryPersonalityType = (): 'a' | 'b' | 'c' | 'd' => {
    const dist = countDistribution();
    let maxType: 'a' | 'b' | 'c' | 'd' = 'a';
    let maxVal = -1;
    
    // Evaluate majority with fallbacks
    const keys: Array<'a' | 'b' | 'c' | 'd'> = ['a', 'b', 'c', 'd'];
    keys.forEach(k => {
      if (dist[k] > maxVal) {
        maxVal = dist[k];
        maxType = k;
      }
    });
    return maxType;
  };

  const currentProfile = step === 'result' ? personalities[getPrimaryPersonalityType()] : personalities.a;
  const currentProfileType = step === 'result' ? getPrimaryPersonalityType() : 'a';

  // Format statistics
  const totalQuestionsAnswered = Object.keys(answers).length || 1;
  const distributionPercent = () => {
    const dist = countDistribution();
    return {
      a: Math.round((dist.a / totalQuestionsAnswered) * 100),
      b: Math.round((dist.b / totalQuestionsAnswered) * 100),
      c: Math.round((dist.c / totalQuestionsAnswered) * 100),
      d: Math.round((dist.d / totalQuestionsAnswered) * 100),
    };
  };

  // Custom step-by-step gold flow payment processing simulation
  const handleStartPayment = (plan: 'basic' | 'deep') => {
    setSelectedPlan(plan);
    setIsPaying(true);
    setPayStep(1);

    // Dynamic processing sequence
    setTimeout(() => {
      setPayStep(2); // Connecting secure gold gateway
      setTimeout(() => {
        setPayStep(3); // Validating and updating Supabase encrypted table
        setTimeout(() => {
          setIsPaying(false);
          setIsUnlocked(true);
        }, 1200);
      }, 1000);
    }, 1000);
  };

  const triggerMockShare = () => {
    // Standard web share or copy feedback
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setShowShareNotification(true);
      setTimeout(() => setShowShareNotification(false), 2500);
    });
  };

  return (
    <div className="min-h-screen bg-sand-100 flex flex-col justify-between selection:bg-sand-300 selection:text-navy-900 font-sans text-navy-900 transition-colors duration-300">
      
      {/* Visual Header Grid */}
      <header className="border-b border-sand-200/60 bg-sand-50/50 backdrop-blur-md sticky top-0 z-40 px-6 py-4 transition-all duration-200">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div 
            onClick={handleReset} 
            className="flex items-center space-x-2.5 cursor-pointer group"
            id="brand_headline"
          >
            <div className="w-8 h-8 rounded-full bg-navy-800 flex items-center justify-center text-sand-50 group-hover:bg-wine-700 transition-colors">
              <Heart className="w-4.5 h-4.5 fill-current" />
            </div>
            <div>
              <h1 className="text-sm font-serif font-bold tracking-wider text-navy-800 group-hover:text-wine-700 transition-colors">
                關係依附研究所
              </h1>
              <p className="text-[10px] text-navy-200 uppercase tracking-widest leading-none font-mono">
                Core Attachment Profile
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            {step === 'quiz' && (
              <span className="bg-sand-200 text-navy-800 px-2.5 py-1 rounded-full font-mono font-medium">
                分析進度 {currentQuestionIndex + 1} / {questions.length}
              </span>
            )}
            {step === 'result' && (
              <button 
                onClick={handleReset}
                className="text-navy-700 hover:text-wine-700 transition-colors font-medium flex items-center space-x-1 py-1"
                id="btn_restart_top"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>重新分析</span>
              </button>
            )}
            {step === 'home' && (
              <button 
                onClick={() => setStep('quiz')}
                className="bg-navy-800 text-sand-50 hover:bg-wine-700 transition-colors px-3 py-1.5 rounded-md font-medium text-xs tracking-wide"
                id="cta_nav_start"
              >
                開始分析
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center w-full">
        
        {/* HOMEPAGE VIEW */}
        {step === 'home' && (
          <div className="w-full max-w-4xl mx-auto px-6 py-8 md:py-16 animate-fade-in-up" id="container_home">
            
            {/* Core Hero Headline */}
            <div className="text-center space-y-8 max-w-2xl mx-auto pt-4 pb-12">
              <span className="inline-flex items-center gap-1.5 text-xs text-wine-700 font-medium tracking-widest uppercase bg-wine-100 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" /> 繁體中文感情關係分析
              </span>
              
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-[44px] font-serif font-bold text-navy-900 leading-snug tracking-tight">
                  你以為自己遇錯人，
                  <span className="block mt-2 text-wine-700">其實你只是一直重複同樣的感情模式。</span>
                </h2>
                
                {/* Poetic multi-line paragraph focusing on generous spacing */}
                <div className="pt-4 flex flex-col space-y-2 text-navy-700 text-base md:text-lg tracking-wide leading-relaxed font-sans max-w-xl mx-auto">
                  <p>透過 42 題細緻的情境分析，</p>
                  <p>深層看見你在關係中的投入方式、</p>
                  <p>核心安全感需求與不可忽視的情緒盲點。</p>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => setStep('quiz')}
                  className="group bg-navy-800 hover:bg-wine-700 text-sand-50 hover:text-white px-8 py-4.5 rounded-full text-base font-medium tracking-wider shadow-premium hover:shadow-soft transition-all duration-300 transform active:scale-95 flex items-center justify-center space-x-3.5 mx-auto"
                  id="btn_start_analysis"
                >
                  <span>開始 3 分鐘分析</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </button>
                <p className="text-xs text-navy-200 mt-3 font-mono">
                  42 SCENARIOS · NO REGISTRATION REQUIRED
                </p>
              </div>

              {/* Scroll cues */}
              <div className="pt-10 flex flex-col items-center space-y-2.5">
                <span className="text-[11px] text-navy-200 tracking-widest font-mono uppercase">
                  向下探索更多細節
                </span>
                <ArrowDown className="w-4 h-4 text-navy-200 animate-bounce" />
              </div>
            </div>

            {/* Content Segment 1: What does this report analyze? */}
            <div className="mt-16 md:mt-24 border-t border-sand-200/80 pt-16" id="section_about">
              <div className="text-center space-y-3 mb-12">
                <h3 className="text-xs text-wine-700 font-mono tracking-widest font-bold uppercase">
                  DIAGNOSTIC SCOPE
                </h3>
                <h4 className="text-2xl font-serif font-bold text-navy-900">
                  這份分析，會溫柔地告訴你什麼？
                </h4>
                <p className="text-sm text-navy-200 max-w-md mx-auto">
                  我們不給予冰冷的數字與制式排名，而是協助你直面情感的核心。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="bg-white/60 p-6 sm:p-8 rounded-2xl border border-sand-200 shadow-soft space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-wine-100 flex items-center justify-center text-wine-700">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <h5 className="text-base font-serif font-bold text-navy-900">
                    1. 你的真實感情角色與特質解析
                  </h5>
                  <p className="text-sm text-navy-700 leading-relaxed">
                    剖析你是沉穩可靠的守護人、自足自由的孤島探索者、細緻熱切的潮汐追求者、或是令人心疼的迷霧漫遊者。
                  </p>
                </div>

                <div className="bg-white/60 p-6 sm:p-8 rounded-2xl border border-sand-200 shadow-soft space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-navy-100 flex items-center justify-center text-navy-700">
                    <Fingerprint className="w-5 h-5" />
                  </div>
                  <h5 className="text-base font-serif font-bold text-navy-900">
                    2. 看見內心深沉的安全感需求
                  </h5>
                  <p className="text-sm text-navy-700 leading-relaxed">
                    真正解構你在親密對局中痛苦生氣的由來。為什麼一則慢回的訊息、一次不經意的眼神，會在你心中引起滔天巨浪？
                  </p>
                </div>

                <div className="bg-white/60 p-6 sm:p-8 rounded-2xl border border-sand-200 shadow-soft space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-sand-300/40 flex items-center justify-center text-navy-800">
                    <Eye className="w-5 h-5" />
                  </div>
                  <h5 className="text-base font-serif font-bold text-navy-900">
                    3. 在深淵中照亮情緒死角與盲點
                  </h5>
                  <p className="text-sm text-navy-700 leading-relaxed">
                    在衝突與吵架關頭，你的大腦是如何下意識起用防衛機制，親手將想要靠近的人推開？
                  </p>
                </div>

                <div className="bg-white/60 p-6 sm:p-8 rounded-2xl border border-sand-200 shadow-soft space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-navy-800 flex items-center justify-center text-sand-100">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h5 className="text-base font-serif font-bold text-navy-900">
                    4. 給你專屬的關係本質轉化解藥
                  </h5>
                  <p className="text-sm text-navy-700 leading-relaxed">
                    針對你的特定人格檔案，設計溫厚且可具體實踐的生活相處對策，找到與各色人群和諧相伴的鑰匙。
                  </p>
                </div>
              </div>
            </div>

            {/* Content Segment 2: Elegant Personality Card Preview */}
            <div className="mt-20 md:mt-28 bg-navy-800 text-sand-50 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-premium" id="section_preview">
              <div className="absolute top-0 right-0 w-80 h-80 bg-navy-700/10 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-navy-700/20 rounded-full blur-3xl -z-10" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-6">
                  <span className="text-xs bg-navy-700 text-sand-100 px-3 py-1 rounded-full uppercase tracking-widest font-mono">
                    DESIGN LOOK
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-serif font-bold text-sand-50 leading-tight">
                    專為截圖設計的，<br />
                    極簡高質感「關係人格卡」
                  </h4>
                  <p className="text-sm text-navy-50/80 leading-relaxed">
                    白底深灰字的大留白古典設計。
                    拿掉一切花俏複雜的裝飾，它能精準提煉你的愛人靈魂。這是一張適合長按儲存，在 Threads 與 Instagram 上與挚友深度對話的精緻卡片。
                  </p>
                  <ul className="text-xs text-navy-50/70 space-y-2 pt-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1 rounded-full h-1 bg-wine-600" />
                      <span>傳統鉛字印刷排版感</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 rounded-full h-1 bg-wine-600" />
                      <span>高情感共鳴的一席金句</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 rounded-full h-1 bg-wine-600" />
                      <span>大方、乾淨、溫暖、有呼吸</span>
                    </li>
                  </ul>
                </div>

                {/* Simulated Beautiful Card mockup */}
                <div className="lg:col-span-6 flex justify-center">
                  <div className="bg-white text-navy-900 w-full max-w-[280px] sm:max-w-[320px] rounded-xl p-8 shadow-2xl border border-sand-300 relative transform rotate-1 hover:rotate-0 transition-transform duration-300">
                    <div className="border-b border-sand-200 pb-4 mb-6">
                      <p className="text-[10px] uppercase tracking-widest text-navy-200 font-mono">
                        RELATIONSHIP ARCHETYPE
                      </p>
                      <h5 className="text-2xl font-serif font-bold mt-1 text-navy-850">
                        孤島探索者
                      </h5>
                      <span className="text-[10px] text-wine-600 font-medium block mt-1 tracking-wider bg-wine-100/50 px-2 py-0.5 rounded-sm inline-block">
                        獨立的風中旅人 · 逃避型依附
                      </span>
                    </div>

                    {/* Resonant Quote Paragraph with line changes */}
                    <div className="py-6 border-b border-sand-200 font-serif text-sm tracking-widest leading-relaxed text-navy-900 text-center flex flex-col space-y-2">
                      <p>你其實不是慢熱。</p>
                      <p>你只是知道，</p>
                      <p>心動很容易，</p>
                      <p>但信任很難。</p>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <span className="text-[9px] text-navy-700/70 font-serif">
                        © 關係依附研究所
                      </span>
                      <span className="text-[9px] uppercase tracking-widest text-navy-200/90 font-mono">
                        ID: #042B
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA with clean layout */}
            <div className="mt-16 md:mt-24 text-center max-w-xl mx-auto space-y-6">
              <h4 className="text-lg font-serif italic text-navy-700">
                「只有看清自己跌落的泥淖，才能在下一場大雨裡優雅避開。」
              </h4>
              <p className="text-sm text-navy-200">
                花費 3 分鐘，與內在的情感真相對談。了解你的愛中盲區。
              </p>
              <div>
                <button
                  onClick={() => setStep('quiz')}
                  className="bg-navy-800 hover:bg-wine-700 text-sand-50 transition-colors px-10 py-4 rounded-xl text-sm font-semibold tracking-wider shadow-soft hover:shadow-premium"
                  id="btn_start_bottom"
                >
                  即刻開始 42 題分析
                </button>
              </div>
            </div>

          </div>
        )}


        {/* QUIZ VIEW */}
        {step === 'quiz' && (
          <div className="w-full max-w-2xl mx-auto px-6 py-6 md:py-12 animate-fade-in-up" id="container_quiz">
            
            {/* Top Minimal Progress Indicator */}
            <div className="mb-8 space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-wine-700 font-mono font-medium tracking-widest uppercase">
                  分類：{questions[currentQuestionIndex].category}
                </span>
                <span className="text-navy-200 font-mono">
                  {currentQuestionIndex + 1} / {questions.length}
                </span>
              </div>
              
              <div className="h-1 w-full bg-sand-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-wine-600 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Main Scenario Box */}
            <div className="bg-white border border-sand-200 shadow-soft rounded-2xl p-6 sm:p-10 mb-6 relative">
              <span className="absolute top-4 left-6 text-2xl sm:text-3xl font-serif text-sand-300 font-bold select-none">
                Q{questions[currentQuestionIndex].id}
              </span>
              
              <div className="pt-6 pb-2">
                <h3 className="text-lg sm:text-xl font-serif font-semibold text-navy-900 leading-relaxed tracking-wide">
                  {questions[currentQuestionIndex].text}
                </h3>
              </div>
            </div>

            {/* Answer Options list */}
            <div className="space-y-3.5 mb-8">
              {questions[currentQuestionIndex].options.map((opt, i) => {
                const isSelected = answers[questions[currentQuestionIndex].id] === opt.type;
                return (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(questions[currentQuestionIndex].id, opt.type)}
                    className={`w-full text-left p-5 rounded-xl border text-sm sm:text-base leading-relaxed transition-all duration-200 flex items-center justify-between group active:scale-[0.99] cursor-pointer ${
                      isSelected 
                        ? 'bg-navy-800 border-navy-800 text-sand-100 shadow-soft' 
                        : 'bg-white hover:bg-sand-50 border-sand-200 hover:border-sand-300 text-navy-800 shadow-sm'
                    }`}
                    id={`opt_${currentQuestionIndex}_${i}`}
                  >
                    <span className="flex-grow pr-4">{opt.text}</span>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected 
                        ? 'border-sand-50 bg-wine-600 text-sand-50' 
                        : 'border-sand-300 group-hover:border-sand-300 bg-sand-50'
                    }`}>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-sand-50" />}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Previous Navigation Bar */}
            <div className="flex items-center justify-between text-xs text-navy-200">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`flex items-center space-x-1.5 py-2 px-3 rounded-md transition-colors ${
                  currentQuestionIndex === 0 
                    ? 'opacity-30 cursor-not-allowed' 
                    : 'hover:bg-sand-200 hover:text-navy-900 cursor-pointer'
                }`}
                id="btn_prev_question"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>上一題</span>
              </button>

              <span className="hidden sm:inline font-mono">
                您的作答將自動儲存，可隨時返回修正
              </span>
            </div>

          </div>
        )}


        {/* RESULTS & PREMIUM VIEW */}
        {step === 'result' && (
          <div className="w-full max-w-3xl mx-auto px-6 py-8 md:py-16 animate-fade-in-up" id="container_result">
            
            {/* Core Header Card */}
            <div className="text-center space-y-4 mb-10 pb-8 border-b border-sand-200/60">
              <span className="bg-wine-100 text-wine-700 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                感情關係人格診斷報告
              </span>
              <p className="text-xs text-navy-200 font-mono">CONFIDENTIAL RELATIONSHIP DOSSIER</p>
            </div>

            {/* Character Title Zone */}
            <div className="text-center space-y-4 mb-10">
              <div className="h-0.5 w-12 bg-wine-700 mx-auto" />
              <h2 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-navy-900 mt-2">
                {currentProfile.name}
              </h2>
              <p className="text-sm text-wine-700 font-medium tracking-widest bg-wine-100/50 inline-block px-3 py-1 rounded-md">
                {currentProfile.badge}
              </p>
            </div>

            {/* Highly Empathetic Resonance Quotes with breathy spacing */}
            <div className="my-12 px-6 py-12 md:py-16 bg-white border border-sand-200/80 rounded-2xl shadow-soft text-center text-navy-800">
              <div className="max-w-md mx-auto flex flex-col space-y-4 font-serif text-lg md:text-xl leading-loose tracking-widest text-navy-950">
                {currentProfile.quoteParagraphs.map((para, pIdx) => (
                  <p key={pIdx} className="font-semibold last:text-wine-700">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* SHAREABLE CARD BLOCK */}
            <div className="my-14" id="section_share_card">
              <div className="text-center mb-6 space-y-2">
                <h3 className="text-xs font-mono text-navy-200 tracking-wider">SHAREABLE PROFILE CARD</h3>
                <h4 className="text-lg font-serif font-bold text-navy-900">
                  你的專屬情感人格卡
                </h4>
                <p className="text-xs text-navy-200 max-w-sm mx-auto leading-relaxed">
                  大留白極簡經典排版。長按儲存本區塊或擷取螢幕畫面，即可完美貼合 Threads、Instagram 等社交分享。
                </p>
              </div>

              {/* Physical White Card Markup for Screenshots */}
              <div className="bg-white border-2 border-sand-300 rounded-3xl p-8 sm:p-14 max-w-md mx-auto shadow-premium text-navy-900 relative">
                {/* Stamp */}
                <div className="absolute top-6 right-6 border-2 border-wine-700/80 rounded px-2.5 py-1 text-[9px] font-mono tracking-widest font-bold text-wine-700 uppercase rotate-6">
                  OFFICIAL ARCHIVE
                </div>

                <div className="border-b border-sand-200/80 pb-6 mb-8">
                  <span className="text-[10px] text-[#2C4360] font-mono uppercase tracking-widest">
                    RELATIONSHIP PERSONALITY ANALYSIS
                  </span>
                  <h3 className="text-3xl font-serif font-extrabold mt-2 text-[#1D2D42]">
                    {currentProfile.name}
                  </h3>
                  <p className="text-xs text-wine-700 mt-1.5 tracking-wider font-medium">
                    {currentProfile.badge}
                  </p>
                </div>

                <div className="py-8 text-center border-b border-sand-200/80">
                  <p className="text-xs text-navy-200 font-mono mb-4">GOLDEN QUOTE</p>
                  <div className="font-serif text-base sm:text-lg tracking-widest leading-loose font-semibold text-[#1F2E43] flex flex-col space-y-3">
                    {currentProfile.quoteParagraphs.map((para, pi) => (
                      <p key={pi}>{para}</p>
                    ))}
                  </div>
                </div>

                <div className="pt-6 flex justify-between items-center text-[10px] text-navy-200">
                  <div>
                    <span className="font-serif block">專屬感情人格鑑定</span>
                    <span className="font-mono mt-0.5 block text-navy-200/75">© 關係依附研究所</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono block">DATE: 2026.06</span>
                    <span className="font-mono block uppercase text-wine-600 font-semibold mt-0.5">TYPE: {currentProfileType.toUpperCase()}-STATUS</span>
                  </div>
                </div>
              </div>

              {/* Share Interaction Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-6">
                <button
                  onClick={triggerMockShare}
                  className="w-full sm:w-auto bg-white hover:bg-sand-50 text-navy-950 border border-sand-300 font-medium px-6 py-3 rounded-xl text-sm transition-all flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                  id="btn_trigger_mock_share"
                >
                  <Share2 className="w-4 h-4 text-navy-700" />
                  <span>複製測驗連結分享</span>
                </button>
                <span className="text-xs text-navy-200 hidden sm:inline">|</span>
                <span className="text-xs text-navy-200 p-2 text-center pointer-events-none">
                  💡 手機用戶建議「直接螢幕截圖」分享，效果最清晰。
                </span>
              </div>

              {showShareNotification && (
                <div className="mt-3 text-center animate-fade-in-up text-xs font-serif text-wine-700 font-medium bg-wine-100/70 inline-block px-4 py-2 rounded-full mx-auto block w-max">
                  ✓ 連結已成功複製至剪貼簿！可以去跟朋友深度交流了。
                </div>
              )}
            </div>

            {/* Dynamic Calculated Metrics */}
            <div className="bg-white/60 p-6 sm:p-8 rounded-2xl border border-sand-200/80 shadow-soft my-10 space-y-6">
              <h4 className="text-base font-serif font-bold text-navy-950 pb-2 border-b border-sand-100 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-wine-600 fill-current" /> 你的依附型態光譜分佈
              </h4>
              
              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <div className="flex justify-between font-medium mb-1.5">
                    <span>穩健依附（溫柔守護者傾向）</span>
                    <span className="font-mono text-wine-700 font-bold">{distributionPercent().a}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-sand-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full transition-all duration-500" style={{ width: `${distributionPercent().a}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-medium mb-1.5">
                    <span>逃避依附（孤島探索者傾向）</span>
                    <span className="font-mono text-wine-700 font-bold">{distributionPercent().b}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-sand-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${distributionPercent().b}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-medium mb-1.5">
                    <span>焦慮依附（潮汐追隨者傾向）</span>
                    <span className="font-mono text-wine-700 font-bold">{distributionPercent().c}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-sand-200 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-600 rounded-full transition-all duration-500" style={{ width: `${distributionPercent().c}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-medium mb-1.5">
                    <span>恐懼混亂依附（迷霧漫遊者傾向）</span>
                    <span className="font-mono text-wine-700 font-bold">{distributionPercent().d}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-sand-200 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-600 rounded-full transition-all duration-500" style={{ width: `${distributionPercent().d}%` }} />
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-navy-200 leading-relaxed font-mono">
                依附人格是非絕對的流動狀態，本百分比由您 42 題中對各維度情境（衝突、邊界、希望、渴望）下意識的安全偏好與防禦抉擇動態精算而得。
              </p>
            </div>

            {/* Core In-depth Chapters */}
            <div className="space-y-12 my-14" id="section_free_analysis">
              {/* About You Header */}
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-navy-950 border-l-4 border-navy-800 pl-3">
                  關於你在感情中的真實狀態
                </h3>
                <div className="space-y-4 text-sm sm:text-base text-navy-800 leading-relaxed">
                  {currentProfile.description.map((desc, dIdx) => (
                    <p key={dIdx}>{desc}</p>
                  ))}
                </div>
              </div>

              {/* Fears & Desires Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-sand-200 shadow-soft space-y-4">
                  <h4 className="font-serif font-bold text-navy-950 text-base border-b border-sand-200 pb-2.5 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-wine-600" />
                    你內心真正害怕的是什麼？
                  </h4>
                  <ul className="space-y-3 text-sm text-navy-800">
                    {currentProfile.fear.map((fStr, fIdx) => (
                      <li key={fIdx} className="leading-relaxed pl-5 relative before:content-['•'] before:absolute before:left-1 before:text-wine-600 before:font-bold">
                        {fStr}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-sand-200 shadow-soft space-y-4">
                  <h4 className="font-serif font-bold text-navy-950 text-base border-b border-sand-200 pb-2.5 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-600" />
                    你靈魂最深處渴望的是什麼？
                  </h4>
                  <ul className="space-y-3 text-sm text-navy-800">
                    {currentProfile.desire.map((dStr, dIdx) => (
                      <li key={dIdx} className="leading-relaxed pl-5 relative before:content-['•'] before:absolute before:left-1 before:text-emerald-600 before:font-bold">
                        {dStr}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Core Overlooked Blindspot */}
              <div className="bg-wine-100/50 p-6 sm:p-8 rounded-2xl border border-wine-600/10 space-y-4">
                <h4 className="font-serif font-bold text-wine-800 text-base flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-wine-700 rounded-sm" />
                  你在關係中，最容易「忽略」的是什麼？
                </h4>
                <ul className="space-y-3 text-sm text-navy-800">
                  {currentProfile.neglect.map((nStr, nIdx) => (
                    <li key={nIdx} className="leading-relaxed pl-5 relative before:content-['•'] before:absolute before:left-1 before:text-wine-700 before:font-bold">
                      {nStr}
                    </li>
                  ))}
                </ul>
              </div>
            </div>


            {/* PAYWALL ZONE (UNLOCK PREMIUM CONVERSION) */}
            {!isUnlocked ? (
              <div className="my-16 border-t-2 border-dashed border-sand-300 pt-16" id="paywall_box">
                
                {/* Paywall Container */}
                <div className="bg-gradient-to-b from-white to-sand-50 border border-sand-300 rounded-3xl p-6 sm:p-12 text-center text-navy-900 shadow-premium relative overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-0.5 bg-gradient-to-r from-transparent via-wine-600 to-transparent" />
                  
                  <div className="max-w-xl mx-auto space-y-6">
                    <div className="w-12 h-12 rounded-full bg-wine-100 flex items-center justify-center text-wine-700 mx-auto">
                      <LockKeyhole className="w-5 h-5" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-navy-950">
                      感情的解藥，藏在對模式的覺察裡。
                    </h3>

                    {/* Highly relatable warm copywriting avoiding tech/AI terms */}
                    <p className="text-sm text-navy-700 leading-relaxed">
                      了解自身的弱點，只是關係治癒的起點。
                      為了讓你走入更穩定、自在的親密日常，我們的專業臨床研究員為你編寫了完整的人格檔案。
                      它將協助你解答那些心碎的循環，並給予最為溫厚的修復指南。
                    </p>

                    {/* Unlocked Benefits Checklist */}
                    <div className="bg-sand-100/50 rounded-2xl p-5 border border-sand-200 text-left max-w-md mx-auto space-y-3 text-xs sm:text-sm text-navy-800 mt-2">
                      <p className="font-serif font-bold text-navy-950 mb-1 flex items-center gap-1.5 text-xs text-wine-700">
                        <Sparkles className="w-3.5 h-3.5" /> 完整人格檔案將告訴你：
                      </p>
                      <div className="flex items-start gap-2.5">
                        <BadgeCheck className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span><strong>深度盲點與宿命反思</strong>：為什麼你總是被特定類型（如迴避型、焦慮型）的人吸引？</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <BadgeCheck className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span><strong>內在受傷點剖析</strong>：在特定感情爭執情節中，你靈魂最容易一觸即發受傷的原因。</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <BadgeCheck className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span><strong>靈魂最契合的人格類型</strong>：在依附光譜中，哪一種人格能用他獨有的節奏與你幸福偕老？</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <BadgeCheck className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span><strong>具體的情感自我救贖對策</strong>：三個不費力、可於日常與對方相處中真正實踐的心得配方。</span>
                      </div>
                    </div>

                    {/* Scheme Plans Cards Block */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto pt-4">
                      {/* Plan Basic */}
                      <div className="bg-white border border-sand-300 rounded-2xl p-5 text-left flex flex-col justify-between hover:border-sand-400 transition-colors shadow-sm">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-navy-200 tracking-wider">基礎解鎖檔案</span>
                            <span className="bg-sand-200 text-navy-800 text-[10px] px-2 py-0.5 rounded-sm font-medium">BASIC</span>
                          </div>
                          <h4 className="text-sm font-serif font-bold text-navy-900">關係宿命盲點剖析</h4>
                          <p className="text-[11px] text-navy-200 mt-1 lines-clamp-2">
                            剖析深層關係受傷根源、感情盲點、特定吸引宿命。
                          </p>
                        </div>
                        <div className="pt-6">
                          <div className="flex items-baseline gap-1.5 mb-3.5">
                            <span className="text-2xl font-serif font-bold text-navy-950 font-mono">NT$49</span>
                            <span className="text-[10px] text-navy-200">單次付費永久儲存</span>
                          </div>
                          <button
                            onClick={() => handleStartPayment('basic')}
                            className="w-full bg-navy-800 hover:bg-wine-700 text-sand-50 hover:text-white py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-colors shadow-sm cursor-pointer"
                            id="btn_pay_basic"
                          >
                            解鎖基礎人格檔案
                          </button>
                        </div>
                      </div>

                      {/* Plan Deep */}
                      <div className="bg-white border-2 border-wine-700 rounded-2xl p-5 text-left flex flex-col justify-between relative shadow-soft">
                        <span className="absolute -top-3 right-4 bg-wine-700 text-sand-50 text-[9px] px-2.5 py-0.5 rounded-full font-bold tracking-widest uppercase">
                          推薦 · 完整指南
                        </span>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-wine-750 tracking-wider">深層全面診斷藍圖</span>
                            <span className="bg-wine-100 text-wine-800 text-[10px] px-2 py-0.5 rounded-sm font-semibold">DEEP</span>
                          </div>
                          <h4 className="text-sm font-serif font-bold text-navy-900">核心依附轉化與心靈對策</h4>
                          <p className="text-[11px] text-navy-200 mt-1 lines-clamp-2">
                            包含最合人格推薦、三行親密處方箋、與核心依附風格轉化行動清單。
                          </p>
                        </div>
                        <div className="pt-6">
                          <div className="flex items-baseline gap-1.5 mb-3.5">
                            <span className="text-2xl font-serif font-bold text-wine-700 font-mono">NT$99</span>
                            <span className="text-[10px] text-navy-200">單次付費永久儲存</span>
                          </div>
                          <button
                            onClick={() => handleStartPayment('deep')}
                            className="w-full bg-wine-700 hover:bg-wine-800 text-sand-50 hover:text-white py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-colors shadow-soft cursor-pointer"
                            id="btn_pay_deep"
                          >
                            解鎖深層全面診斷
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-navy-200 pt-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>綠界科技/Stripe 金流加密防護 · 安全儲存不洩漏隱私</span>
                    </div>

                  </div>
                </div>

              </div>
            ) : (
              /* PREMIUM UNLOCKED SECTION (DYNAMIC RENDER AFTER SUCCESS PAYMENT) */
              <div className="my-16 border-t-2 border-wine-700/60 pt-16 space-y-12 animate-fade-in-up" id="premium_reports_container">
                
                {/* Premium Golden Title badge */}
                <div className="bg-wine-100 border border-wine-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-wine-700 text-sand-50 flex items-center justify-center flex-shrink-0">
                      <BadgeCheck className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <h4 className="text-base font-serif font-bold text-wine-900">
                        為你解鎖的：完整感情人格檔案 已順利生成
                      </h4>
                      <p className="text-xs text-navy-800 mt-0.5">
                        方案級別：{selectedPlan === 'deep' ? '深度全面診斷藍圖 (Deep NT$99)' : '基礎解鎖檔案 (Basic NT$49)'}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-wine-700 bg-sand-100 border border-wine-200 px-3 py-1 rounded-full text-center self-start sm:self-auto uppercase tracking-wide">
                    ✓ SECURE_DB_SYNCHRONIZED
                  </span>
                </div>

                {/* PREMIUM CHAPTER 1: Relationships Traps (Both Basic & Deep gets this) */}
                <div className="space-y-4 pt-4">
                  <span className="text-[10px] text-wine-700 font-mono tracking-widest font-bold uppercase block">
                    CHAPTER 1 · RELATIONSHIP ATTRACTIVE TRAPS & BLINDSPOTS
                  </span>
                  <h3 className="text-xl font-serif font-bold text-navy-950">
                    一、 為什麼你總是被特定型態（如迴避型、焦慮型）的人吸引？
                  </h3>
                  
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-sand-200 shadow-soft space-y-4 text-sm sm:text-base text-navy-800 leading-relaxed">
                    <p>
                      在潛意識的重力場中，人類會下意識地去尋找「讓自己感受到童年熟悉氛圍」的愛人。
                      這正是所謂的『強迫性重複』。
                    </p>
                    {currentProfileType === 'a' && (
                      <p>
                        身為<strong>「溫柔守護者」</strong>，你容易吸引來那些內心傷痕累累、情感極度不穩定的伴侶。
                        因為你天然的承載力與包容，給了他們宛如風平浪靜的安全港灣。
                        然而你需要特別警惕：<strong>不要讓自己不知不覺中成為了唯一的「情感救生員」</strong>，你是在與靈魂談戀愛，而不是在經營一個情感療養院。
                      </p>
                    )}
                    {currentProfileType === 'b' && (
                      <p>
                        身為<strong>「孤島探索者」</strong>，你對邊界的執著，最容易磁吸般的勾引出<strong>「潮汐追隨者」</strong>的死掐與焦慮。
                        這是一組在心理學上最經典、也最痛苦的「逃避-焦慮追逃循環」：
                        他追得越緊，你躲得越深；你躲得越深，他越發狂。
                        真正能解開這宿命枷鎖的，是你在每次退隱之前，能伸手給他一顆明確的定心丸，告訴他「我只是需要一小時讀書，我並不是不要你。」
                      </p>
                    )}
                    {currentProfileType === 'c' && (
                      <p>
                        身為<strong>「潮汐追隨者」</strong>，你最容易被渾身散發神秘感、神秘獨立的<strong>「孤島探索者」</strong>虐得體無完膚。
                        你熱烈地想要融化他的冰山，而他的冷靜自持、不輕易表白卻恰好契合了你潛意識裡那種「需要透過翻山越嶺、低聲下氣才能換到真愛」的受虐情節。
                        請明白：<strong>真正的愛，不需要你每次都哭濕枕頭、卑微地守著訊息提示聲去乞求。</strong>
                      </p>
                    )}
                    {currentProfileType === 'd' && (
                      <p>
                        身為<strong>「迷霧漫遊者」</strong>，你容易在感情中經歷一場又一場「極速狂飆、又極速燃燒怠盡」的悲劇。
                        你總是被那些一眼看穿你內在孤寂、狂熱而暴烈的靈魂吸引。
                        兩人一開始就像烈火般交織，隨後一旦觸及生活實錄，對被看穿缺陷的恐懼便會驅使你發起毀滅式的猜忌。
                        你需要做的是先在安全環境中，與人累積低頻率、溫厚無聊的長久陪伴，學會忍受平淡的安定。
                      </p>
                    )}
                  </div>
                </div>

                {/* PREMIUM CHAPTER 2: Intimate Prescriptions and Soul Partner (Deep Premium Feature) */}
                {selectedPlan === 'deep' ? (
                  <div className="space-y-12 pt-6">
                    
                    {/* Soul Match Personality Type */}
                    <div className="space-y-4">
                      <span className="text-[10px] text-wine-700 font-mono tracking-widest font-bold uppercase block">
                        CHAPTER 2 · THE SOUL-MATCH COMPRESSED MATRIX
                      </span>
                      <h3 className="text-xl font-serif font-bold text-navy-950">
                        二、 哪一種人格，能陪你平靜而幸福地偕老？
                      </h3>
                      
                      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-sand-200 shadow-soft text-sm sm:text-base text-navy-800 leading-relaxed space-y-4">
                        <div className="flex items-center gap-2.5 text-wine-700 font-serif font-bold text-base">
                          <Heart className="w-4 h-4 fill-current" />
                          <span>你的靈魂完美伴侶座標：【溫柔守護者】</span>
                        </div>
                        <p>
                          這是在愛情格局中最能化解你內在死結的搭配。
                          他是個心靈邊界清晰、自我狀態極其安定的成年人。
                          當你鬧情緒、故意推開人（如逃避型或恐懼型機制）時，他不會感到面子受損而發起冷暴力，也絕不會因過度受驚而嚎啕大哭；
                          他只會溫和地守在那裡，甚至笑著拆穿你的防線，遞上一杯熱巧克力，用他的「不為所動」為你注入前所未有的安全體驗。
                        </p>
                        <p className="text-xs text-navy-200 mt-2 font-mono">
                          🔍 注意：兩座孤島的結合往往會走向冰冷的荒原；兩起潮汐的碰撞則會撕碎彼此的生活。在不成熟的階段，人往往會追求與自己同樣病態的镜像，而在成熟時，你才會轉身迎入最能提供安定力量的那個靈魂。
                        </p>
                      </div>
                    </div>

                    {/* Three intimacy prescription advice */}
                    <div className="space-y-4">
                      <span className="text-[10px] text-wine-700 font-mono tracking-widest font-bold uppercase block">
                        CHAPTER 3 · CORE TRANSLATION CLINICAL PRESCRIPTION
                      </span>
                      <h3 className="text-xl font-serif font-bold text-navy-950">
                        三、 給你的三行親密解藥
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-[#121B27] text-sand-50 p-6 rounded-2xl space-y-3 relative overflow-hidden">
                          <span className="text-[10px] font-mono text-wine-600 block">PRESCRIPTION · 01</span>
                          <h5 className="font-serif font-bold text-sm leading-snug">
                            在焦慮升空時，<br />拉長回應的物理沙漏。
                          </h5>
                          <p className="text-xs text-navy-250 leading-relaxed">
                            當你下一次心中拉起「他是不是不愛我了」的紅線，在發起指責或冷戰前，強制自己關掉螢幕，深呼吸 10 分鐘，不寫任何字句。
                          </p>
                        </div>

                        <div className="bg-[#121B27] text-sand-50 p-6 rounded-2xl space-y-3 relative overflow-hidden">
                          <span className="text-[10px] font-mono text-wine-600 block">PRESCRIPTION · 02</span>
                          <h5 className="font-serif font-bold text-sm leading-snug">
                            練習用「我的軟弱」<br />代替「我的堅硬刺刀」。
                          </h5>
                          <p className="text-xs text-navy-250 leading-relaxed">
                            吵架時用「你這樣冷淡我感到空虚與害怕」代替「你這人真的沒救了、總在逃避」。展現真實的受傷，才能換來真心疼惜。
                          </p>
                        </div>

                        <div className="bg-[#121B27] text-sand-50 p-6 rounded-2xl space-y-3 relative overflow-hidden">
                          <span className="text-[10px] font-mono text-wine-600 block">PRESCRIPTION · 03</span>
                          <h5 className="font-serif font-bold text-sm leading-snug">
                            為彼此的生活<br />保留 15% 的神秘留白。
                          </h5>
                          <p className="text-xs text-navy-250 leading-relaxed">
                            親密不是沒有靈魂間隙的窒息。各自擁有一片各自耕耘卻互不干涉的秘密星空，反而能讓再次相聚時點燃更亮的星光。
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                ) : (
                  /* If Basic Plan chosen, offer a visual prompt to upgrade to deep if desired, keeping user intent robust */
                  <div className="border border-sand-300 rounded-2xl p-6 text-center space-y-4 bg-white shadow-soft">
                    <p className="text-xs text-navy-200">
                      解鎖完整指南：
                      若您渴望知曉您的「靈魂伴侶人格對接座標」與「具體三行親密處方針」，歡迎隨時升級。
                    </p>
                    <button
                      onClick={() => handleStartPayment('deep')}
                      className="bg-wine-700 hover:bg-wine-800 text-sand-50 py-2 px-4 rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      升級至深度全面診斷 (NT$99)
                    </button>
                  </div>
                )}

              </div>
            )}

            {/* Bottom Utilities Area */}
            <div className="mt-14 pb-12 pt-8 border-t border-sand-200/60 flex flex-col items-center justify-between gap-6">
              <div className="text-center space-y-1.5">
                <p className="text-xs text-navy-200">
                  © 關係依附研究所 · 傳統繁體文化傳承版
                </p>
                <p className="text-[10px] text-navy-200/70 max-w-sm">
                  本測驗旨在協助個體探索親密互動之自覺。依附風格在科學研究中並非一成不變的精神診斷，能在更健康的相處中走向和鳴。
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleReset}
                  className="bg-navy-800 hover:bg-navy-900 text-sand-50 px-6 py-3 rounded-xl text-xs font-semibold transition-colors tracking-wider shadow-sm flex items-center space-x-2 cursor-pointer"
                  id="btn_reset_bottom"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>重新進入分析門戶</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* SECURE PAYMENT PORTAL (MODAL SIMULATOR FOR CONVERSION EXCLUSIVITY) */}
      {isPaying && (
        <div className="fixed inset-0 bg-navy-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-6" id="modal_payment">
          <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-md w-full shadow-premium text-center space-y-6 relative overflow-hidden animate-fade-in-up">
            
            {/* Animating glow circles */}
            <div className="w-16 h-16 rounded-full bg-sand-100 flex items-center justify-center mx-auto text-navy-800 relative">
              <span className="absolute inset-0 rounded-full border-2 border-wine-750/30 animate-ping" />
              <Fingerprint className="w-8 h-8 text-wine-700" />
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-serif font-bold text-navy-900">
                安全加密金流處理中...
              </h4>
              <p className="text-xs text-navy-200">
                為您架設極私密的情感加密連線通道
              </p>
            </div>

            {/* Simulated gold processing checkpoints */}
            <div className="space-y-3.5 text-left text-xs bg-sand-50 p-4.5 rounded-xl border border-sand-200 max-w-xs mx-auto">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${payStep >= 1 ? 'bg-emerald-500' : 'bg-sand-300'}`} />
                <span className={payStep >= 1 ? 'text-navy-900 font-medium' : 'text-navy-200'}>
                  Connecting to SSL Encrypted Gateway...
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${payStep >= 2 ? 'bg-emerald-500' : 'bg-sand-300'}`} />
                <span className={payStep >= 2 ? 'text-navy-900 font-medium' : 'text-navy-200'}>
                  Synchronizing Supabase Auth token...
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${payStep >= 3 ? 'bg-emerald-500 animate-pulse' : 'bg-sand-300'}`} />
                <span className={payStep >= 3 ? 'text-navy-900 font-medium' : 'text-navy-200'}>
                  Composing premium personality dossier...
                </span>
              </div>
            </div>

            <p className="text-[10px] text-navy-250 italic">
              ✦ 本系統採用一客一簽安全通道，您的感情答卷資料不會被任何人側錄或用於AI通用大模型二次訓練，百分之百保護您的親密隱私。
            </p>

          </div>
        </div>
      )}

      {/* Shared Footer with literary style */}
      <footer className="bg-[#111B28] text-sand-50/50 text-center py-8 px-6 border-t border-navy-800">
        <div className="max-w-4xl mx-auto space-y-3">
          <p className="text-xs tracking-wider">
            深度感情分析 · 傳統繁體文化守護研究所
          </p>
          <p className="text-[10px] text-navy-200/50 max-w-md mx-auto leading-relaxed">
            這不是一份冷冰冰的診斷。我們希望在無比浮躁的世界中，透過一次誠實的自我詰問，重新給予你握住溫暖、承接幸福的能力。
          </p>
        </div>
      </footer>

    </div>
  );
}
