import React from "react";
import { ArrowLeft } from "lucide-react";
import { SHAPES_LIST, WORD_ASSOCIATION_LIST } from "../data";

// Static records needed for games
const EMOTIONS_LIST = [
  { key: "feelHappy", icon: "😊", feel: "happy" },
  { key: "feelCalm", icon: "😌", feel: "calm" },
  { key: "feelProud", icon: "😎", feel: "proud" },
  { key: "feelExcited", icon: "🤩", feel: "excited" }
];

interface Orb {
  id: number;
  x: number;
  y: number;
  color: string;
  scale: number;
  opacity: number;
}

interface LearningBoardProps {
  lang: "en" | "he";
  t: any;
  mockResources: any[];
  unlockedResources: string[];
  progress: Record<string, number>;
  totalXP: number;
  totalCompletedModules: number;
  learningTab: "pdf" | "interactive";
  setLearningTab: (tab: "pdf" | "interactive") => void;
  pulsingId: string | null;
  handlePdfDownload: (id: string) => void;
  setDownloadModalFile: (file: string | null) => void;
  setCurrentTab: (tab: string) => void;
  setShopTab: (tab: "pdf" | "interactive") => void;
  activeInteractiveId: string | null;
  setActiveInteractiveId: (id: string | null) => void;
  playTone: (freq: number, type?: "sine" | "triangle", duration?: number) => void;
  exitActiveInteractiveSession: () => void;

  // Game 1: Balloon & Sound sandbox
  balloonScale: number;
  isBreathedIn: boolean;
  handleBreatheToggle: () => void;
  orbs: Orb[];
  spawnOrb: (clientX: number, clientY: number, container: HTMLDivElement) => void;
  clearOrbs: () => void;

  // Game 2: Emotion Matcher
  activeEmotionIndex: number;
  emotionFeedback: string | null;
  handleEmotionGuess: (feel: string) => void;
  handleNextEmotion: () => void;

  // Game 3: Tracing star
  currentPathIndex: number;
  isDraggingPathPoint: boolean;
  setIsDraggingPathPoint: (drag: boolean) => void;
  hasCompletedTracing: boolean;
  driftMessageActive: boolean;
  setDriftMessageActive: (active: boolean) => void;
  handleRestartTracing: () => void;
  handleDragMove: (clientX: number, clientY: number) => void;
  svgRef: React.RefObject<SVGSVGElement | null>;
  currentWindingPathStr: string;
  PATH_POINTS: any[];

  // Game 4: Planner
  plannerChecked: { wash: boolean; teeth: boolean; water: boolean; shoes: boolean; jacket: boolean };
  plannerFeedback: string;
  handlePlannerToggle: (key: "wash" | "teeth" | "water" | "shoes" | "jacket") => void;
  handleResetPlanner: () => void;

  // Game 5: Shape Sorter
  activeShapeIndex: number;
  shapeFeedback: string | null;
  handleShapeSort: (colorKey: string) => void;
  handleNextShape: () => void;

  // Game 6: Word Association
  activeAssocIndex: number;
  assocFeedback: string | null;
  handleAssocGuess: (key: string) => void;
  handleNextAssoc: () => void;
}

export default function LearningBoard({
  lang,
  t,
  mockResources,
  unlockedResources,
  progress,
  totalXP,
  totalCompletedModules,
  learningTab,
  setLearningTab,
  pulsingId,
  handlePdfDownload,
  setDownloadModalFile,
  setCurrentTab,
  setShopTab,
  activeInteractiveId,
  setActiveInteractiveId,
  playTone,
  exitActiveInteractiveSession,

  balloonScale,
  isBreathedIn,
  handleBreatheToggle,
  orbs,
  spawnOrb,
  clearOrbs,

  activeEmotionIndex,
  emotionFeedback,
  handleEmotionGuess,
  handleNextEmotion,

  currentPathIndex,
  isDraggingPathPoint,
  setIsDraggingPathPoint,
  hasCompletedTracing,
  driftMessageActive,
  setDriftMessageActive,
  handleRestartTracing,
  handleDragMove,
  svgRef,
  currentWindingPathStr,
  PATH_POINTS,

  plannerChecked,
  plannerFeedback,
  handlePlannerToggle,
  handleResetPlanner,

  activeShapeIndex,
  shapeFeedback,
  handleShapeSort,
  handleNextShape,

  activeAssocIndex,
  assocFeedback,
  handleAssocGuess,
  handleNextAssoc,
}: LearningBoardProps) {
  return (
    <div className="space-y-10 animate-fadeIn text-start">
      {activeInteractiveId === null ? (
        <>
          {/* Top Summary Dashboard: Lavender & Mint Gradient Calm Progress Card */}
          <div className="bg-gradient-to-r from-[#ECE6F5]/90 to-[#E3F2EE]/90 border border-[#DACCE5]/30 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs select-none">
            <div className="text-start space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏆</span>
                <h3 className="text-md font-bold text-slate-800">
                  {lang === "en" ? "Learning Board Dashboard" : "לוח הלמידה וההתקדמות"}
                </h3>
              </div>
              <p className="text-slate-500 text-xs max-w-md leading-relaxed">
                {lang === "en"
                  ? "Track your child's developmental path quietly. Points of progress reflect printable sheets downloaded and interactive sensory play completed."
                  : "עקבו אחר מסלול ההתפתחות של הילד ברוגע ובקצב איטי. נקודות ההתקדמות נספרות עבור דפי עבודה שהורדו ומשחקים שהושלמו."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0 select-none">
              {/* Progress Points Block - Dusty Lavender Style */}
              <div className="bg-[#E7E2FA] rounded-2xl p-4 border border-[#D5CBEF] flex items-center gap-4.5 shadow-xs w-full sm:w-48">
                <div className="w-11 h-11 bg-[#D1C6F8] rounded-2xl flex items-center justify-center text-[#55409E] text-2xl font-bold">
                  🌟
                </div>
                <div className="text-start">
                  <span className="text-[10px] text-[#55409E] font-extrabold uppercase tracking-wider block">
                    {lang === "en" ? "Progress Points" : "נקודות התקדמות"}
                  </span>
                  <span className="text-lg font-black text-[#362770]">
                    {totalXP} XP
                  </span>
                </div>
              </div>

              {/* Completed Modules Block - Soft Mint Style */}
              <div className="bg-[#E2F5EE] rounded-2xl p-4 border border-[#C5ECD9] flex items-center gap-4.5 shadow-xs w-full sm:w-48">
                <div className="w-11 h-11 bg-[#B7EBD0] rounded-2xl flex items-center justify-center text-[#23704C] text-2xl font-bold">
                  🌿
                </div>
                <div className="text-start">
                  <span className="text-[10px] text-[#23704C] font-extrabold uppercase tracking-wider block">
                    {lang === "en" ? "Completed Modules" : "פעילויות שהושלמו"}
                  </span>
                  <span className="text-lg font-black text-[#134930]">
                    {totalCompletedModules} / {mockResources.filter((r) => unlockedResources.includes(r.id)).length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* High level tabs for printable / interactive */}
          <div className="flex bg-slate-200/70 p-1.5 rounded-2xl max-w-sm w-full border border-slate-200">
            <button
              onClick={() => setLearningTab("pdf")}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                learningTab === "pdf" ? "bg-white text-sky-600 shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-white/40"
              }`}
              id="learning-tab-btn-pdf"
            >
              📥 {t.tabPrintable}
            </button>
            <button
              onClick={() => setLearningTab("interactive")}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                learningTab === "interactive" ? "bg-white text-purple-600 shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-white/40"
              }`}
              id="learning-tab-btn-interactive"
            >
              🎮 {t.tabInteractive}
            </button>
          </div>

          {/* Access Gating logic */}
          {unlockedResources.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-6 shadow-xs">
              <span className="inline-block p-4 rounded-full bg-slate-50 text-slate-300 text-3xl select-none">🔒</span>
              <p className="text-slate-450 text-base leading-relaxed max-w-sm mx-auto text-center">
                {t.noResources}
              </p>
              <div className="flex gap-4.5 justify-center">
                <button
                  onClick={() => {
                    setCurrentTab("shop");
                    setShopTab("pdf");
                  }}
                  className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-5 rounded-xl transition text-xs cursor-pointer"
                >
                  {t.shop}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Academic Structured Syllabus Progress path */}
              <div className="space-y-4">
                {(() => {
                  const filteredUnlocked = mockResources.filter((res) => {
                    return unlockedResources.includes(res.id) && res.type === learningTab;
                  });

                  const getStatusRank = (percent: number) => {
                    if (percent > 0 && percent < 100) return 1; // In Progress first
                    if (percent === 0) return 2; // Not Started second
                    return 3; // Completed third
                  };

                  const sortedUnlocked = [...filteredUnlocked].sort((a, b) => {
                    const pctA = progress[a.id] || 0;
                    const pctB = progress[b.id] || 0;
                    const rA = getStatusRank(pctA);
                    const rB = getStatusRank(pctB);

                    if (rA !== rB) return rA - rB;
                    return a.id.localeCompare(b.id);
                  });

                  if (sortedUnlocked.length === 0) {
                    return (
                      <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-12 text-center text-slate-400 text-sm">
                        {lang === "en"
                          ? `You have unlocked no ${learningTab === "pdf" ? "PDF printable workbooks" : "playable interactive games"} in this category yet.`
                          : `לא פתחתם עדיין ${learningTab === "pdf" ? "חוברות עבודה PDF להורדה" : "משחקי מיון וויסות דיגיטליים"} בקטגוריה זו.`}
                      </div>
                    );
                  }

                  // Subject category icon lookup
                  const subjectIcons: Record<string, string> = {
                    sensory: "🌬️",
                    emotional: "🎭",
                    motor: "✍️",
                    routines: "📅",
                    cognitive: "🧩",
                    language: "🗣️"
                  };

                  return sortedUnlocked.map((res) => {
                    const itemData = lang === "en" ? res.en : res.he;
                    const pct = progress[res.id] || 0;
                    const isPulsing = pulsingId === res.id;

                    // Status label & styles configuration
                    let statusText = "";
                    let statusClass = "";
                    if (pct === 100) {
                      statusText = lang === "en" ? "✓ Completed" : "✓ הושלם";
                      statusClass = "bg-[#E2F5EE] text-[#134930] border border-[#C2EAD6] font-black";
                    } else if (pct > 0) {
                      statusText = lang === "en" ? "⚡ In Progress" : "⚡ בתהליך";
                      statusClass = "bg-amber-50 text-amber-700 border border-amber-200 font-bold";
                    } else {
                      statusText = lang === "en" ? "⊙ Not Started" : "⊙ טרם התחיל";
                      statusClass = "bg-slate-100/80 text-slate-500 border border-slate-200/60";
                    }

                    const matchingIcon = subjectIcons[res.category] || "📘";

                    return (
                      <div
                        key={res.id}
                        id={`resource-card-${res.id}`}
                        className={`bg-white border rounded-3xl p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 hover:shadow-xs transition duration-150 ${
                          isPulsing ? "border-sky-400 ring-4 ring-sky-100 scale-101" : "border-slate-100"
                        }`}
                      >
                        {/* 1. Subject Badge & Title Section (Full w-full, desktop md:w-5/12) */}
                        <div className="flex items-center gap-4 w-full md:w-5/12 text-start">
                          <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-2xl shrink-0 select-none">
                            {matchingIcon}
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-sans">
                              {itemData.subject}
                            </span>
                            <h4 className="text-sm font-black text-slate-800 tracking-tight leading-tight truncate">
                              {itemData.title}
                            </h4>
                            <span className="text-[11px] text-slate-400 font-medium block mt-0.5 truncate">
                              {itemData.partnerLabel}
                            </span>
                          </div>
                        </div>

                        {/* 2. Responsive Progress Bar Section (Full w-full, desktop md:w-4/12) */}
                        <div className="w-full md:w-4/12 flex flex-col gap-1.5 group select-none">
                          <div className="flex justify-between text-[11px] font-mono font-bold text-slate-400 px-1">
                            <span>{pct}%</span>
                            <span>{lang === "en" ? "Progress" : "התקדמות"}</span>
                          </div>
                          <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-205">
                            <div
                              className="h-full bg-[#A1B59F] rounded-full transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>

                        {/* 3. Responsive Status tag and Action trigger (Full w-full, desktop md:w-3/12) */}
                        <div className="flex items-center justify-between md:justify-end gap-3.5 w-full md:w-3/12 shrink-0">
                          <span className={`text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider select-none shrink-0 ${statusClass}`}>
                            {statusText}
                          </span>

                          {res.type === "pdf" ? (
                            <button
                              onClick={() => {
                                handlePdfDownload(res.id);
                                setDownloadModalFile(itemData.title);
                              }}
                              className="bg-sky-500 hover:bg-sky-600 text-white font-black text-xs py-2.5 px-4 rounded-xl shadow-xs transition transform hover:-translate-y-0.5 shrink-0 font-sans cursor-pointer"
                            >
                              📥 {lang === "en" ? "Download PDF" : "הורדת קובץ"}
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setActiveInteractiveId(res.id);
                                playTone(392.00, "sine", 0.6);
                              }}
                              className="bg-purple-600 hover:bg-purple-700 text-white font-black text-xs py-2.5 px-4 rounded-xl shadow-xs transition transform hover:-translate-y-0.5 shrink-0 cursor-pointer"
                            >
                              ⚡ {lang === "en" ? "Launch Activity" : "הפעלת משחק"}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          )}
        </>
      ) : (
        /* =============== ACTIVE INTERACTIVE GAMES COMPONENT OVERLAYS =============== */
        <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden animate-fadeIn">
          {/* Common Game Header */}
          <div className="bg-slate-800 text-white px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-sky-400 inline-block animate-ping"></span>
              <div className="text-start">
                <h3 className="text-lg font-black tracking-tight leading-none">
                  {mockResources.find((r) => r.id === activeInteractiveId)?.category === "motor"
                    ? t.subjMotor
                    : mockResources.find((r) => r.id === activeInteractiveId)?.id === "res-2"
                    ? t.subjSensory
                    : mockResources.find((r) => r.id === activeInteractiveId)?.id === "res-4"
                    ? t.subjEmotional
                    : mockResources.find((r) => r.id === activeInteractiveId)?.id === "res-8"
                    ? t.subjRoutines
                    : mockResources.find((r) => r.id === activeInteractiveId)?.id === "res-10"
                    ? t.subjCognitive
                    : t.subjLanguage}
                </h3>
                <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest block pl-0.5 mt-1">
                  {lang === "en" ? "Interactive Special Needs Playroom" : "מרחב משחק אינטראקטיבי מותאם"}
                </span>
              </div>
            </div>

            {/* Back to dashboard exit button */}
            <button
              onClick={exitActiveInteractiveSession}
              className="bg-slate-700 hover:bg-slate-650 text-xs font-black py-2 px-3.5 rounded-xl flex items-center gap-1.5 transition text-white border border-slate-600 cursor-pointer"
            >
              <ArrowLeft className="h-4.5 w-4.5" />
              {t.lessonBack}
            </button>
          </div>

          {/* Game Canvas container area */}
          <div className="p-8 md:p-12 min-h-[420px] bg-slate-50/40 relative flex flex-col justify-center">
            {/* GAME 1: "Calm Balloon Breathing & Sound Flow" (res-2) */}
            {activeInteractiveId === "res-2" && (
              <div className="space-y-12 select-none animate-fadeIn">
                {/* Balloon Breathe Box */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 text-center space-y-6 shadow-xs max-w-md mx-auto">
                  <div className="space-y-2">
                    <h4 className="text-xl font-black text-slate-800">{t.breatheTitle}</h4>
                    <p className="text-slate-400 text-xs">{t.breatheHeading}</p>
                  </div>

                  <div className="flex justify-center items-center h-44">
                    <button
                      onClick={handleBreatheToggle}
                      style={{ transform: `scale(${balloonScale})` }}
                      className="w-24 h-24 rounded-full bg-gradient-to-tr from-sky-300 to-purple-400 flex flex-col items-center justify-center text-white font-extrabold text-xs shadow-md transition-all duration-1000 ease-out outline-none ring-4 ring-sky-100/50 cursor-pointer"
                    >
                      <span className="text-xl select-none block mb-1">🎈</span>
                      {isBreathedIn ? t.breatheOut : t.breatheIn}
                    </button>
                  </div>

                  {isBreathedIn && (
                    <div className="text-xs text-sky-500 font-bold animate-pulse">
                      ✨ {lang === "en" ? "Hold... feel the calm energy inside." : "החזיקו את האוויר... הרגישו את השלווה והמיקוד."}
                    </div>
                  )}
                </div>

                {/* Sandbox sound flow zone */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 space-y-4 shadow-xs">
                  <div className="flex justify-between items-center flex-wrap gap-4 text-start">
                    <div>
                      <h4 className="text-base font-black text-slate-800">{t.breatheSandboxTitle}</h4>
                      <p className="text-slate-400 text-xxs">{t.breatheSandboxDesc}</p>
                    </div>
                    <button
                      onClick={clearOrbs}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-extrabold text-xxs py-2 px-4 rounded-lg transition overflow-hidden cursor-pointer"
                    >
                      🧹 {t.clearOrbsBtn}
                    </button>
                  </div>

                  <div
                    onMouseDown={(e) => spawnOrb(e.clientX, e.clientY, e.currentTarget)}
                    onTouchStart={(e) => {
                      if (e.touches[0]) spawnOrb(e.touches[0].clientX, e.touches[0].clientY, e.currentTarget);
                    }}
                    className="h-44 bg-slate-900 rounded-2xl relative overflow-hidden cursor-crosshair shadow-inner border border-slate-800"
                  >
                    <div className="absolute inset-x-0 bottom-3 text-center text-slate-600 text-xxs font-mono pointer-events-none tracking-widest select-none">
                      {lang === "en" ? "SOOTHING TACTILE SOUND FIELD" : "זירת וויסות אקוסטית מרגיעה"}
                    </div>

                    {/* Render particles watercolor chimes list */}
                    {orbs.map((orb) => (
                      <div
                        key={orb.id}
                        className="absolute rounded-full pointer-events-none flex items-center justify-center"
                        style={{
                          left: orb.x,
                          top: orb.y,
                          width: orb.scale,
                          height: orb.scale,
                          backgroundColor: orb.color,
                          opacity: orb.opacity,
                          transform: "translate(-50%, -50%)",
                          transition: "width 30ms linear, height 30ms linear, opacity 30ms linear"
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* GAME 2: "Emotion Matcher" (res-4) */}
            {activeInteractiveId === "res-4" && (
              <div className="space-y-6 text-center select-none animate-fadeIn max-w-lg mx-auto">
                <div className="space-y-2 bg-yellow-50/50 p-6 rounded-2xl border border-yellow-100">
                  <h4 className="text-lg font-black text-slate-800">{t.emotionTitle}</h4>
                  <p className="text-slate-500 text-xs">{t.emotionPrompt}</p>

                  {/* Display target emotive face avatar */}
                  <div className="w-28 h-28 mx-auto bg-white rounded-full flex items-center justify-center border-4 border-yellow-200 shadow-xs text-6xl my-4">
                    {EMOTIONS_LIST[activeEmotionIndex].icon}
                  </div>

                  <div className="text-base font-extrabold text-slate-700 font-sans tracking-wide">
                    {lang === "en"
                      ? EMOTIONS_LIST[activeEmotionIndex].feel.toUpperCase()
                      : EMOTIONS_LIST[activeEmotionIndex].feel === "happy"
                      ? "שמח 😊"
                      : EMOTIONS_LIST[activeEmotionIndex].feel === "calm"
                      ? "רגוע 😌"
                      : EMOTIONS_LIST[activeEmotionIndex].feel === "proud"
                      ? "גאה 😎"
                      : "נרגש 🤩"}
                  </div>
                </div>

                <p className="text-slate-400 text-xs">{t.emotionHelp}</p>

                <div className="grid grid-cols-2 gap-4">
                  {EMOTIONS_LIST.map((em) => (
                    <button
                      key={em.feel}
                      onClick={() => handleEmotionGuess(em.feel)}
                      className="bg-white hover:bg-slate-50 border-2 border-slate-100 hover:border-slate-350 active:ring-4 active:ring-sky-100 py-4.5 px-3 rounded-2xl font-black text-sm tracking-tight text-slate-800 transition cursor-pointer"
                    >
                      {lang === "en"
                        ? t[em.key as keyof typeof t]
                        : em.feel === "happy"
                        ? "שמח"
                        : em.feel === "calm"
                        ? "רגוע"
                        : em.feel === "proud"
                        ? "גאה"
                        : "נרגש"}
                    </button>
                  ))}
                </div>

                {/* Feedback modal banner */}
                {emotionFeedback !== null && (
                  <div
                    className={`p-4 rounded-2xl font-bold animate-bounce text-xs ${
                      emotionFeedback === "correct"
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        : "bg-red-50 text-red-600 border border-red-150"
                    }`}
                  >
                    {emotionFeedback === "correct" ? (
                      <div className="space-y-3">
                        <span>🎉 {t.emotionalScoreMsg} (+15 pts)</span>
                        <button
                          onClick={handleNextEmotion}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2 px-5 rounded-lg block mx-auto mt-2 shadow-xs transition cursor-pointer"
                        >
                          {lang === "en" ? "Next Emotion Card" : "קלף הרגש הבא ➔"}
                        </button>
                      </div>
                    ) : (
                      <span>❌ {t.tryAgain}</span>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* GAME 3: "Gentle Path Tracing" (res-6) */}
            {activeInteractiveId === "res-6" && (
              <div className="space-y-6 select-none animate-fadeIn text-start">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <h4 className="text-base font-black text-slate-800">
                      {lang === "en" ? "Pencil Control Line Tracing" : "אימון מעקב קווים מוטורי"}
                    </h4>
                    <p className="text-slate-400 text-xxs">
                      {lang === "en" ? "Trace along the dotted guide path carefully." : "הובילו את הכוכב בזהירות לאורך שביל המעקב החלק."}
                    </p>
                  </div>

                  <button
                    onClick={handleRestartTracing}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-extrabold text-xxs py-2 px-4 rounded-lg transition cursor-pointer"
                  >
                    🔄 {t.startOver}
                  </button>
                </div>

                {/* Responsive SVG river path arena container */}
                <div className="relative bg-teal-50/20 border border-teal-100 rounded-3xl p-4 overflow-hidden shadow-xs">
                  {driftMessageActive && (
                    <div className="absolute top-3 inset-x-0 mx-auto w-3/4 text-center bg-amber-500/90 text-white py-2 px-4 rounded-xl text-xxs font-bold shadow-md z-30 animate-bounce">
                      ⚠️ {t.driftWarning}
                    </div>
                  )}

                  {hasCompletedTracing && (
                    <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-30 space-y-4">
                      <span className="text-5xl animate-bounce">🏆</span>
                      <h5 className="text-white text-lg font-black">{t.finishCelebration}</h5>
                      <p className="text-teal-200 text-xs">Granted +50 Success Points!</p>
                      <button
                        onClick={handleRestartTracing}
                        className="bg-sky-500 hover:bg-sky-600 text-white text-xs font-black py-3 px-6 rounded-xl transition shadow-md cursor-pointer"
                      >
                        🔄 {t.startOver}
                      </button>
                    </div>
                  )}

                  <div className="relative w-full overflow-x-auto">
                    <svg
                      ref={svgRef}
                      viewBox="0 0 1000 300"
                      className="w-full h-auto min-w-[650px] select-none block"
                      onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
                      onMouseUp={() => setIsDraggingPathPoint(false)}
                      onTouchMove={(e) => {
                        if (e.touches[0]) handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
                      }}
                      onTouchEnd={() => setIsDraggingPathPoint(false)}
                    >
                      {/* Shaded guidance safety band underneath path */}
                      <path
                        d={currentWindingPathStr}
                        fill="none"
                        stroke="#E2E8F0"
                        strokeWidth="50"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Winding guide dots line */}
                      <path
                        d={currentWindingPathStr}
                        fill="none"
                        stroke="#0EA5E9"
                        strokeWidth="6"
                        strokeDasharray="12,12"
                        strokeLinecap="round"
                        className="opacity-70"
                      />

                      {/* Locked trace milestones */}
                      {PATH_POINTS.map((pt, index) => {
                        const isVisited = index <= currentPathIndex;
                        return (
                          <circle
                            key={index}
                            cx={pt.x}
                            cy={pt.y}
                            r={index === PATH_POINTS.length - 1 ? "18" : index === 0 ? "14" : "9"}
                            fill={index === PATH_POINTS.length - 1 ? "#EF4444" : isVisited ? "#10B981" : "#D1D5DB"}
                            className="transition-colors duration-200"
                          />
                        );
                      })}

                      {/* Final Cozy Starlight Finish House Vector label */}
                      <text
                        x={PATH_POINTS[PATH_POINTS.length - 1].x - 16}
                        y={PATH_POINTS[PATH_POINTS.length - 1].y + 36}
                        className="font-black text-[12px] fill-slate-700"
                      >
                        {lang === "en" ? "Home 🏠" : "הבית שלי 🏠"}
                      </text>

                      {/* Gentle Dragging golden star marker control target */}
                      <g
                        transform={`translate(${PATH_POINTS[currentPathIndex].x}, ${PATH_POINTS[currentPathIndex].y})`}
                        onMouseDown={() => {
                          setIsDraggingPathPoint(true);
                          setDriftMessageActive(false);
                          playTone(440, "sine", 0.3);
                        }}
                        onTouchStart={() => {
                          setIsDraggingPathPoint(true);
                          setDriftMessageActive(false);
                          playTone(440, "sine", 0.3);
                        }}
                        className="cursor-pointer"
                      >
                        <circle r="26" fill="rgba(245, 158, 11, 0.25)" className="animate-ping" />
                        <polygon
                          points="0,-18 5,-5 18,-3 8,6 11,19 0,11 -11,19 -8,6 -18,-3 -5,-5"
                          fill="#F59E0B"
                          stroke="#D97706"
                          strokeWidth="2"
                        />
                      </g>
                    </svg>
                  </div>

                  {/* Simple sensory guidelines */}
                  <div className="text-center text-slate-500 font-bold text-xxs tracking-wider pt-2 mt-2 select-none">
                    ⭐ {lang === "en" ? "Drag the yellow star slowly along the dotted line and help it reach home safely." : "גררו את הכוכב הצהוב באטיות לאורך הקו המקווקו וסייעו לו להגיע הביתה בשלום."}
                  </div>
                </div>
              </div>
            )}

            {/* GAME 4: "Interactive Daily Planner" (res-8) */}
            {activeInteractiveId === "res-8" && (
              <div className="space-y-6 text-center select-none animate-fadeIn max-w-lg mx-auto">
                <div className="space-y-2">
                  <h4 className="text-lg font-black text-slate-800">{t.plannerTitle}</h4>
                  <p className="text-slate-400 text-xs">{t.plannerDesc}</p>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => handlePlannerToggle("wash")}
                    className={`p-4.5 rounded-2xl border text-start flex items-center justify-between transition-all cursor-pointer ${
                      plannerChecked.wash
                        ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                        : "bg-white border-slate-150 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="font-bold flex items-center gap-3 text-sm">
                      <span>1.</span> {t.taskWash}
                    </span>
                    <span className={`text-md ${plannerChecked.wash ? "text-emerald-600 font-bold" : "text-slate-205"}`}>
                      ✓
                    </span>
                  </button>

                  <button
                    onClick={() => handlePlannerToggle("teeth")}
                    className={`p-4.5 rounded-2xl border text-start flex items-center justify-between transition-all cursor-pointer ${
                      plannerChecked.teeth
                        ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                        : "bg-white border-slate-150 text-slate-705 hover:bg-slate-50"
                    }`}
                  >
                    <span className="font-bold flex items-center gap-3 text-sm">
                      <span>2.</span> {t.taskTeeth}
                    </span>
                    <span className={`text-md ${plannerChecked.teeth ? "text-emerald-600 font-bold" : "text-slate-205"}`}>
                      ✓
                    </span>
                  </button>

                  <button
                    onClick={() => handlePlannerToggle("water")}
                    className={`p-4.5 rounded-2xl border text-start flex items-center justify-between transition-all cursor-pointer ${
                      plannerChecked.water
                        ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                        : "bg-white border-slate-150 text-slate-705 hover:bg-slate-50"
                    }`}
                  >
                    <span className="font-bold flex items-center gap-3 text-sm">
                      <span>3.</span> {t.taskWater}
                    </span>
                    <span className={`text-md ${plannerChecked.water ? "text-emerald-600 font-bold" : "text-slate-205"}`}>
                      ✓
                    </span>
                  </button>

                  <button
                    onClick={() => handlePlannerToggle("shoes")}
                    className={`p-4.5 rounded-2xl border text-start flex items-center justify-between transition-all cursor-pointer ${
                      plannerChecked.shoes
                        ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                        : "bg-white border-slate-160 text-slate-710 hover:bg-slate-50"
                    }`}
                  >
                    <span className="font-bold flex items-center gap-3 text-sm">
                      <span>4.</span> {t.taskShoes}
                    </span>
                    <span className={`text-md ${plannerChecked.shoes ? "text-emerald-600 font-bold" : "text-slate-205"}`}>
                      ✓
                    </span>
                  </button>

                  <button
                    onClick={() => handlePlannerToggle("jacket")}
                    className={`p-4.5 rounded-2xl border text-start flex items-center justify-between transition-all cursor-pointer ${
                      plannerChecked.jacket
                        ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                        : "bg-white border-slate-160 text-slate-710 hover:bg-slate-50"
                    }`}
                  >
                    <span className="font-bold flex items-center gap-3 text-sm">
                      <span>5.</span> {t.taskJacket}
                    </span>
                    <span className={`text-md ${plannerChecked.jacket ? "text-emerald-600 font-bold" : "text-slate-205"}`}>
                      ✓
                    </span>
                  </button>
                </div>

                {plannerFeedback === "finished" && (
                  <div className="p-5 rounded-2xl font-black text-xs space-y-3 bg-emerald-600 text-white shadow-md">
                    <span className="block text-2xl animate-bounce">🦋</span>
                    <p>{t.completedAll}</p>
                    <button
                      onClick={handleResetPlanner}
                      className="bg-white text-emerald-600 hover:bg-slate-50 font-black text-xxs py-2 px-6 rounded-lg block mx-auto mt-2 cursor-pointer"
                    >
                      🔄 {lang === "en" ? "Reset Planner Tracker" : "התחל משימות מחדש"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* GAME 5: "Shape Sorter & Pattern Maker" (res-10) */}
            {activeInteractiveId === "res-10" && (
              <div className="space-y-6 text-center select-none animate-fadeIn max-w-lg mx-auto">
                <div className="space-y-2 bg-purple-50/40 p-6 rounded-3xl border border-purple-100">
                  <h4 className="text-lg font-black text-slate-800">{t.sorterTitle}</h4>
                  <p className="text-slate-400 text-xs">{t.sorterDesc}</p>

                  {/* Rendering the targeting shape */}
                  <div className="space-y-1 my-4">
                    <span className="text-xxs font-extrabold text-slate-400 block">{t.targetLabel}</span>
                    <div
                      className="w-24 h-24 mx-auto rounded-3xl flex items-center justify-center text-6xl font-black shadow-xs select-none"
                      style={{
                        backgroundColor: "#FFFFFF",
                        color: SHAPES_LIST[activeShapeIndex].colorCode,
                        border: `4px dashed ${SHAPES_LIST[activeShapeIndex].colorCode}`
                      }}
                    >
                      {SHAPES_LIST[activeShapeIndex].display}
                    </div>

                    <span className="inline-block text-xs font-bold text-slate-600 mt-2">
                      {lang === "en"
                        ? t[SHAPES_LIST[activeShapeIndex].color as keyof typeof t]
                        : SHAPES_LIST[activeShapeIndex].color === "colorRed"
                        ? "מסגרת אדומה 🟥"
                        : SHAPES_LIST[activeShapeIndex].color === "colorBlue"
                        ? "מסגרת כחולה 🟦"
                        : "מסגרת צהובה 🟨"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {/* Baskets list buttons */}
                  <button
                    onClick={() => handleShapeSort("colorRed")}
                    className="bg-red-50 hover:bg-red-100 border-2 border-red-200 py-4 rounded-xl text-xxs text-red-700 font-extrabold transition cursor-pointer"
                  >
                    {lang === "en" ? "Red Basket 🟥" : "סל אדום 🟥"}
                  </button>
                  <button
                    onClick={() => handleShapeSort("colorBlue")}
                    className="bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 py-4 rounded-xl text-xxs text-blue-700 font-extrabold transition cursor-pointer"
                  >
                    {lang === "en" ? "Blue Basket 🟦" : "סל כחול 🟦"}
                  </button>
                  <button
                    onClick={() => handleShapeSort("colorYellow")}
                    className="bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 py-4 rounded-xl text-xxs text-amber-700 font-extrabold transition cursor-pointer"
                  >
                    {lang === "en" ? "Yellow Basket 🟨" : "סל צהוב 🟨"}
                  </button>
                </div>

                {shapeFeedback !== null && (
                  <div
                    className={`p-4 rounded-2xl font-bold animate-bounce text-xs ${
                      shapeFeedback === "correct"
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        : "bg-red-50 text-red-600 border border-red-150"
                    }`}
                  >
                    {shapeFeedback === "correct" ? (
                      <div className="space-y-2">
                        <span>🎉 {t.successTitle} (+15 pts)</span>
                        <button
                          onClick={handleNextShape}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2 px-5 rounded-lg block mx-auto mt-2 transition cursor-pointer"
                        >
                          {lang === "en" ? "Next Shape Puzzle" : "מיון הצורה הבאה ➔"}
                        </button>
                      </div>
                    ) : (
                      <span>❌ {t.tryAgain}</span>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* GAME 6: "Sound & Word Association" (res-12) */}
            {activeInteractiveId === "res-12" && (
              <div className="space-y-6 text-center select-none animate-fadeIn max-w-lg mx-auto">
                <div className="space-y-2 bg-emerald-50/20 p-6 rounded-3xl border border-emerald-100">
                  <h4 className="text-lg font-black text-slate-800">{t.assocTitle}</h4>
                  <p className="text-slate-400 text-xs">{t.assocDesc}</p>

                  <div className="my-4 bg-white py-4.5 px-6 rounded-2xl border border-slate-100 inline-block">
                    <span className="text-xxs font-extrabold text-[#55409E] block mb-1">{t.findWordLabel}</span>
                    <span className="text-2xl font-black text-emerald-600 underline font-sans">
                      {lang === "en"
                        ? WORD_ASSOCIATION_LIST[activeAssocIndex].val
                        : WORD_ASSOCIATION_LIST[activeAssocIndex].key === "apple"
                        ? "תפוח 🍎"
                        : WORD_ASSOCIATION_LIST[activeAssocIndex].key === "sun"
                        ? "שמש ☀️"
                        : WORD_ASSOCIATION_LIST[activeAssocIndex].key === "house"
                        ? "בית 🏠"
                        : WORD_ASSOCIATION_LIST[activeAssocIndex].key === "tree"
                        ? "עץ 🌳"
                        : WORD_ASSOCIATION_LIST[activeAssocIndex].key === "car"
                        ? "مכונית 🚗"
                        : "עוגייה 🍪"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {/* Word triggers matching buttons */}
                  {WORD_ASSOCIATION_LIST[activeAssocIndex].options.map((optKey) => {
                    const label =
                      optKey === "apple"
                        ? "🍎"
                        : optKey === "sun"
                        ? "☀️"
                        : optKey === "house"
                        ? "🏠"
                        : optKey === "tree"
                        ? "🌳"
                        : optKey === "car"
                        ? "🚗"
                        : "🍪";
                    return (
                      <button
                        key={optKey}
                        onClick={() => handleAssocGuess(optKey)}
                        className="bg-white hover:bg-slate-50 border border-slate-200 py-6 rounded-2xl flex flex-col items-center justify-center gap-2 transform active:scale-95 transition cursor-pointer"
                      >
                        <span className="text-3xl">{label}</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          {lang === "en"
                            ? optKey.toUpperCase()
                            : optKey === "apple"
                            ? "תפוח"
                            : optKey === "sun"
                            ? "שמש"
                            : optKey === "house"
                            ? "בית"
                            : optKey === "tree"
                            ? "עץ"
                            : optKey === "car"
                            ? "מכונית"
                            : "עוגייה"}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {assocFeedback !== null && (
                  <div
                    className={`p-4 rounded-2xl font-bold animate-bounce text-xs ${
                      assocFeedback === "correct"
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        : "bg-red-50 text-red-600 border border-red-150"
                    }`}
                  >
                    {assocFeedback === "correct" ? (
                      <div className="space-y-2">
                        <span>🎉 {t.successTitle} (+15 pts)</span>
                        <button
                          onClick={handleNextAssoc}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2 px-5 rounded-lg block mx-auto mt-2 transition cursor-pointer"
                        >
                          {lang === "en" ? "Next Association word" : "המילה הבאה ➔"}
                        </button>
                      </div>
                    ) : (
                      <span>❌ {t.tryAgain}</span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
