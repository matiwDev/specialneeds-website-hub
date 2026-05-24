import { useState } from "react";
import { Star, RefreshCw, Trophy, ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react";

interface FirstThenBoardProps {
  language?: "en" | "he";
}

const TASK_PRESETS_EN = [
  { id: "wash-hands", label: "Wash Hands", emoji: "🧼" },
  { id: "read-book", label: "Quiet Reading", emoji: "📚" },
  { id: "math", label: "Math Practice", emoji: "✏️" },
  { id: "cleanup", label: "Clean Up Room", emoji: "🧸" },
];

const TASK_PRESETS_HE = [
  { id: "wash-hands", label: "שטיפת ידיים", emoji: "🧼" },
  { id: "read-book", label: "קריאה שקטה", emoji: "📚" },
  { id: "math", label: "תרגולי חשבון", emoji: "✏️" },
  { id: "cleanup", label: "סידור המשחקים", emoji: "🧸" },
];

const REWARD_PRESETS_EN = [
  { id: "ipad", label: "10m iPad Time", emoji: "📱" },
  { id: "playdough", label: "Play Dough Fun", emoji: "🎨" },
  { id: "swing", label: "Sensory Swing", emoji: "🪵" },
  { id: "bubbles", label: "Bubble Play", emoji: "🫧" },
];

const REWARD_PRESETS_HE = [
  { id: "ipad", label: "10 דק' באייפד", emoji: "📱" },
  { id: "playdough", label: "משחק פלסטלינה", emoji: "🎨" },
  { id: "swing", label: "ערסל תחושתי", emoji: "🪵" },
  { id: "bubbles", label: "פרח בועות סבון", emoji: "🫧" },
];

export default function FirstThenBoard({ language = "en" }: FirstThenBoardProps) {
  const isRtl = language === "he";
  const tasks = isRtl ? TASK_PRESETS_HE : TASK_PRESETS_EN;
  const rewards = isRtl ? REWARD_PRESETS_HE : REWARD_PRESETS_EN;

  const [currentTask, setCurrentTask] = useState(tasks[0]);
  const [currentReward, setCurrentReward] = useState(rewards[0]);
  const [earnedTokens, setEarnedTokens] = useState<boolean[]>([false, false, false, false, false]);
  const [boardComplete, setBoardComplete] = useState(false);

  // Sync state if presets list changes via language updates
  const activeTask = tasks.find(t => t.id === currentTask.id) || tasks[0];
  const activeReward = rewards.find(r => r.id === currentReward.id) || rewards[0];

  const toggleToken = (index: number) => {
    const updated = [...earnedTokens];
    updated[index] = !updated[index];
    setEarnedTokens(updated);

    const allEarned = updated.every((v) => v === true);
    setBoardComplete(allEarned);
  };

  const handleReset = () => {
    setEarnedTokens([false, false, false, false, false]);
    setBoardComplete(false);
  };

  return (
    <div className={`rounded-3xl border-2 border-[#EAD3C8] bg-[#FDFBF7] p-6 shadow-sm max-w-4xl mx-auto my-4 text-left ${isRtl ? "text-right" : ""}`}>
      
      {/* Scroll Washi-Tape Sticker */}
      <div className="absolute top-1 left-12 w-20 h-4 bg-amber-50/60 border-x border-b border-amber-200/50 rotate-[-1deg] rounded-b pointer-events-none" />

      {/* Header and explanation */}
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-dashed border-[#EAD3C8]/50 pb-5 mb-6 gap-4 ${isRtl ? "md:flex-row-reverse" : ""}`}>
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3B5B43] bg-[#EFF4F0] px-2.5 py-1 rounded-lg border border-[#C9D9CC]">
            {isRtl ? "עזר דיגיטלי אינטראקטיבי" : "Interactive Digital Assist Tool"}
          </span>
          <h2 className="text-lg font-black text-[#4A3E3D] mt-2.5">
            {isRtl ? "לוח סדר יום תומך: קודם-ואז" : "First-Then Visual Token Economy Board"}
          </h2>
          <p className="text-xs text-stone-550 max-w-xl mt-1 leading-relaxed">
            {isRtl 
              ? "צרו מעברים חלקים ללא חרדה: קבעו את הפעילות הראשונה לביצוע ואת הפרס התומך שיתקבל מיד אחריה, ואז סמנו את הכוכבים ברציפות בהתקדמות המשימה!"
              : "Build smooth transitions: Configure the target action and desired incentive, then check off the stars sequentially as they accomplish steps."}
          </p>
        </div>
        
        <button
          onClick={handleReset}
          className={`flex items-center space-x-1.5 rounded-xl border-2 border-[#EAD3C8] bg-white px-3.5 py-2 text-xs font-bold text-[#9B4D36] hover:bg-[#FBF2EE] active:scale-95 transition-all shrink-0 cursor-pointer ${isRtl ? "space-x-reverse self-start md:self-auto" : "self-end md:self-auto"}`}
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>{isRtl ? "אפס כוכבי הצלחה" : "Reset Tokens"}</span>
        </button>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-12 gap-6 ${isRtl ? "md:grid-cols-12" : ""}`}>
        
        {/* Step List Left - Picker panels */}
        <div className={`md:col-span-5 space-y-5 ${isRtl ? "order-last md:order-last" : ""}`}>
          
          {/* Target Task Picker */}
          <div>
            <span className="block text-xs font-bold text-stone-550 mb-2 font-sans">
              {isRtl ? "1. קבעו משימה ראשונה (קודם):" : "1. Assign First Task:"}
            </span>
            <div className="grid grid-cols-2 gap-2">
              {tasks.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setCurrentTask(t);
                    setBoardComplete(false);
                  }}
                  className={`flex items-center space-x-2 rounded-xl border-2 p-3 text-left transition-all cursor-pointer ${
                    activeTask.id === t.id
                      ? "bg-white border-[#3B5B43] text-[#4A3E3D] ring-2 ring-[#EFF4F0]"
                      : "bg-white border-stone-200 text-stone-600 hover:bg-[#FAF8F5]/80"
                  } ${isRtl ? "space-x-reverse text-right" : ""}`}
                >
                  <span className="text-xl shrink-0">{t.emoji}</span>
                  <span className="text-xs font-bold truncate">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Target Reward Picker */}
          <div>
            <span className="block text-xs font-bold text-stone-550 mb-2 font-sans">
              {isRtl ? "2. קבעו פרס מתווך (ואז):" : "2. Assign Then Reward:"}
            </span>
            <div className="grid grid-cols-2 gap-2">
              {rewards.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setCurrentReward(r);
                    setBoardComplete(false);
                  }}
                  className={`flex items-center space-x-2 rounded-xl border-2 p-3 text-left transition-all cursor-pointer ${
                    activeReward.id === r.id
                      ? "bg-[#352524] border-[#352524] text-white shadow-sm"
                      : "bg-white border-stone-200 text-stone-600 hover:bg-[#FAF8F5]/80"
                  } ${isRtl ? "space-x-reverse text-right" : ""}`}
                >
                  <span className="text-xl shrink-0">{r.emoji}</span>
                  <span className="text-xs font-bold truncate">{r.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Display Frame Right - Interactive Display */}
        <div className="md:col-span-7 flex flex-col justify-between rounded-2xl border-2 border-[#EAD3C8] bg-white p-6 shadow-inner">
          <div className={`grid grid-cols-11 items-center gap-2 ${isRtl ? "direction-rtl" : ""}`}>
            
            {/* FIRST FRAME */}
            <div className="col-span-4 text-center p-3.5 rounded-xl border-2 border-dashed border-[#C9D9CC] bg-[#EFF4F0]/40">
              <span className="block font-sans text-[9px] font-black uppercase text-stone-400 tracking-wider">
                {isRtl ? "קודם" : "First"}
              </span>
              <div className="text-3xl my-2.5 filter drop-shadow-xs">{activeTask.emoji}</div>
              <div className="text-xs font-bold text-[#4A3E3D] truncate">{activeTask.label}</div>
            </div>

            {/* FLOW INDICATOR */}
            <div className="col-span-3 flex justify-center text-stone-400">
              {isRtl ? (
                <ArrowLeft className="h-6 w-6 stroke-[2] bg-[#FBF2EE] text-[#9B4D36] p-1.5 rounded-full border border-[#EAD3C8]" />
              ) : (
                <ArrowRight className="h-6 w-6 stroke-[2] bg-[#FBF2EE] text-[#9B4D36] p-1.5 rounded-full border border-[#EAD3C8]" />
              )}
            </div>

            {/* THEN FRAME */}
            <div className="col-span-4 text-center p-3.5 rounded-xl border-2 border-double border-[#EAD3C8] bg-[#FBF2EE]/30">
              <span className="block font-sans text-[9px] font-black uppercase text-stone-400 tracking-wider">
                {isRtl ? "ואז" : "Then"}
              </span>
              <div className="text-3xl my-2.5 filter drop-shadow-xs">{activeReward.emoji}</div>
              <div className="text-xs font-bold text-[#4A3E3D] truncate">{activeReward.label}</div>
            </div>
          </div>

          {/* Tokens economy stars bar */}
          <div className="mt-8 pt-4 border-t border-stone-100">
            <span className="block text-center text-[10px] font-mono font-bold uppercase text-stone-400 mb-3">
              {isRtl ? "כוכבי התקדמות (לחצו לחיזוק חיובי מלווה)" : "Task progress stars (Click to reinforce)"}
            </span>
            
            <div className={`flex justify-center items-center space-x-3.5 py-1.5 ${isRtl ? "space-x-reverse" : ""}`}>
              {earnedTokens.map((filled, idx) => (
                <button
                  key={idx}
                  id={`token-star-${idx}`}
                  onClick={() => toggleToken(idx)}
                  className={`group relative flex h-11 w-11 items-center justify-center rounded-full transition-all focus:outline-none focus:ring-4 focus:ring-amber-200 cursor-pointer ${
                    filled
                      ? "bg-amber-100 border-2 border-amber-400 scale-110 shadow-sm"
                      : "bg-stone-50 border-2 border-stone-200 hover:border-amber-400"
                  }`}
                  aria-label={`Token star ${idx + 1}`}
                >
                  <Star
                    className={`h-5 w-5 transition-all ${
                      filled
                        ? "fill-amber-400 text-amber-500 scale-100"
                        : "text-stone-300 group-hover:text-amber-300 scale-90"
                    }`}
                  />
                  {/* Star count marker */}
                  <span className={`absolute bottom-0 text-[8px] font-mono leading-none ${filled ? "text-amber-700 font-extrabold" : "text-stone-400 font-medium"}`}>
                    {idx + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* SUCCESS MESSAGE */}
          <div className="mt-5 text-center min-h-[44px]">
            {boardComplete ? (
              <div className="inline-flex items-center space-x-2 bg-[#EFF4F0] border-2 border-[#C9D9CC] rounded-xl px-4 py-2 text-[#3B5B43] animate-bounce">
                <Trophy className="h-5 w-5 text-[#3B5B43] shrink-0" />
                <span className="text-xs font-bold">
                  {isRtl 
                    ? "מאמץ מדהים! השלמתם את כל 5 הכוכבים! מגיע לכם הפרס!" 
                    : "Incredible effort! You earned all 5 stars! Let's get the reward!"}
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center space-x-1.5 text-stone-400 text-xs font-mono justify-center">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>
                  {isRtl 
                    ? "עודדו את התלמידים לצבור כוכבים עבור השלמת מטלות שגרתיות" 
                    : "Encourage your student to earn stars for compliance"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
