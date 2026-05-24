import { useState } from "react";
import { Smile, RefreshCw, Trophy, ShieldCheck } from "lucide-react";

interface EmotionsGameProps {
  language?: "en" | "he";
}

interface EmojiCard {
  id: string;
  emoji: string;
  labelEn: string;
  labelHe: string;
  descEn: string;
  descHe: string;
}

const EMOJI_POOL: EmojiCard[] = [
  { 
    id: "joy", 
    emoji: "😊", 
    labelEn: "Joy / Happy", 
    labelHe: "שמחה / אושר",
    descEn: "Soft smile, bright open eyes, relaxed forehead. Represents feeling calm and cozy.",
    descHe: "חיוך רך, עיניים פקוחות ומאירות, מצח רגוע. מסמל הרגשת ביטחון ונעימות."
  },
  { 
    id: "overstimulated", 
    emoji: "🤯", 
    labelEn: "Overwhelmed", 
    labelHe: "הצפה תחושתית",
    descEn: "Hands covering ears, wide eyes, red face. Represents sensory overload from loud spaces.",
    descHe: "ידיים מכסות אוזניים, עיניים פקוחות לרווחה. מסמל עוררות יתר וקושי מרעשים או אורות חזקים."
  },
  { 
    id: "calm", 
    emoji: "😌", 
    labelEn: "Peaceful / Calm", 
    labelHe: "רוגע / שלווה",
    descEn: "Soft closed eyes, gentle steady breathing. Suggests deep regulated states.",
    descHe: "עיניים עצומות ברכות, נשימות איטיות וקבועות. מעיד על מוכנות ללמידה ונינוחות."
  },
  { 
    id: "sad", 
    emoji: "😢", 
    labelEn: "Sad / Blue", 
    labelHe: "עצב / קושי",
    descEn: "Tear dropping, turned down lips. Suggests a need to ask a trusted friend or teacher for helper comfort.",
    descHe: "דמעה בעיניים, שפתיים נפולות. מרמז על צורך לפנות למלווה, הורה או מורה מוסמך לקבלת תמיכה וחיבוק."
  },
];

export default function EmotionsGame({ language = "en" }: EmotionsGameProps) {
  const isRtl = language === "he";

  const [selectedEmoji, setSelectedEmoji] = useState<EmojiCard | null>(null);
  const [guessLabelId, setGuessLabelId] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, boolean>>({});
  const [complete, setComplete] = useState(false);

  // Synchronize selection reference if language switches live
  const activeSelected = selectedEmoji ? EMOJI_POOL.find(e => e.id === selectedEmoji.id) || selectedEmoji : null;

  const handleEmojiSelect = (emoji: EmojiCard) => {
    setSelectedEmoji(emoji);
    setGuessLabelId(null);
  };

  const handleLabelGuess = (labelId: string) => {
    if (!activeSelected) return;

    if (activeSelected.id === labelId) {
      const updated = { ...matches, [labelId]: true };
      setMatches(updated);
      setSelectedEmoji(null);
      setGuessLabelId(null);

      if (Object.keys(updated).length === EMOJI_POOL.length) {
        setComplete(true);
      }
    } else {
      setGuessLabelId(labelId);
    }
  };

  const resetGame = () => {
    setMatches({});
    setSelectedEmoji(null);
    setGuessLabelId(null);
    setComplete(false);
  };

  return (
    <div className={`rounded-3xl border-2 border-[#EAD3C8] bg-[#FDFBF7] p-6 shadow-sm max-w-4xl mx-auto my-4 text-left ${isRtl ? "text-right" : ""}`}>
      
      {/* Decorative handcrafted corner stickers */}
      <div className="absolute top-1 right-12 w-20 h-4 bg-amber-50/65 border-x border-b border-amber-200/50 rotate-[2deg] rounded-b pointer-events-none" />

      {/* Header and explanation */}
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-dashed border-[#EAD3C8]/50 pb-5 mb-6 gap-4 ${isRtl ? "md:flex-row-reverse" : ""}`}>
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3B5B43] bg-[#EFF4F0] px-2.5 py-1 rounded-lg border border-[#C9D9CC]">
            {isRtl ? "כלי תואם תקשורת חברתית" : "Interactive Social Literacy Tool"}
          </span>
          <h2 className="text-lg font-black text-[#4A3E3D] mt-2.5">
            {isRtl ? "משחק התאמת רגשות ותקשורת חברתית" : "Emotions Recognition Matching Cards"}
          </h2>
          <p className="text-xs text-stone-550 max-w-xl mt-1 leading-relaxed">
            {isRtl 
              ? "שפרו הבנה רגשית ותקשורתית: התאימו כל כרטיס הבעת פנים עם תגית הרגש הנכונה שלו למטה!"
              : "Build emotional comprehension. Match the facial expression card with its corresponding name tag below."}
          </p>
        </div>
        
        <button
          onClick={resetGame}
          className={`flex items-center space-x-1.5 rounded-xl border-2 border-[#EAD3C8] bg-white px-3.5 py-2 text-xs font-bold text-[#9B4D36] hover:bg-[#FBF2EE] active:scale-95 transition-all shrink-0 cursor-pointer ${isRtl ? "space-x-reverse self-start md:self-auto" : "self-end md:self-auto"}`}
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>{isRtl ? "אפס לוחות משחק" : "Reset Game"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Side: Emojis Grid */}
        <div className={`md:col-span-6 space-y-3.5 ${isRtl ? "order-last md:order-last" : ""}`}>
          <span className="block text-xs font-bold text-stone-550">
            {isRtl ? "1. בחרו כרטיס פנים אחד:" : "1. Select a face card:"}
          </span>

          <div className="grid grid-cols-2 gap-3">
            {EMOJI_POOL.map((item) => {
              const matched = matches[item.id];
              const isSelected = activeSelected?.id === item.id;
              
              return (
                <button
                  key={item.id}
                  id={`emoji-btn-${item.id}`}
                  disabled={matched}
                  onClick={() => handleEmojiSelect(item)}
                  className={`flex flex-col items-center justify-center border-2 p-6 rounded-2xl transition-all relative cursor-pointer ${
                    matched
                      ? "bg-[#EFF4F0] border-[#C9D9CC] text-[#3B5B43] opacity-60"
                      : isSelected
                      ? "bg-white border-[#3B5B43] ring-4 ring-[#EFF4F0] scale-102"
                      : "bg-white border-stone-200 hover:border-[#D98A72]/40 hover:scale-102"
                  }`}
                >
                  <span className="text-4xl select-none mb-2.5 filter drop-shadow-xs">{item.emoji}</span>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-stone-400">
                    {matched 
                      ? (isRtl ? "הותאם בהצלחה ✅" : "MATCHED ✅") 
                      : (isRtl ? "לחצו להתאמה" : "TAP TO MATCH")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Descriptions and Match triggers */}
        <div className="md:col-span-6 flex flex-col justify-between">
          <div className="rounded-2xl border-2 border-[#EAD3C8] bg-white p-5 shadow-xs h-full flex flex-col justify-between min-h-[220px]">
            {complete ? (
              <div className="flex flex-col items-center justify-center text-center py-6 h-full space-y-4">
                <div className="h-14 w-14 rounded-full bg-[#EFF4F0] border border-[#C9D9CC] flex items-center justify-center text-[#3B5B43] animate-bounce">
                  <Trophy className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#4A3E3D]">
                    {isRtl ? "התאמתם הכל בהצלחה!" : "You matched them all!"}
                  </h3>
                  <p className="text-xs text-stone-500 max-w-sm mt-1.5 leading-relaxed">
                    {isRtl 
                      ? "זיהוי ושיקוף מצבי גוף ורגש מסייעים לתלמידים לתקשר את הצרכים החושיים שלהם ולפתח חוסן רגשי עמוק בעולם הלמידה. עבודה נפלאה!"
                      : "Identifying body states helps students communicate their sensory needs and build high emotional resilience. Great job!"}
                  </p>
                </div>
              </div>
            ) : activeSelected ? (
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-[#3B5B43] font-bold bg-[#EFF4F0] px-2 py-0.5 rounded border border-[#C9D9CC]">
                    {isRtl ? "בחירה פעילה:" : "Active Selection:"}
                  </span>
                  <div className={`flex items-center space-x-3.5 mt-3 ${isRtl ? "space-x-reverse" : ""}`}>
                    <span className="text-4xl filter drop-shadow-xs">{activeSelected.emoji}</span>
                    <div className={isRtl ? "text-right" : "text-left"}>
                      <h4 className="text-xs font-bold text-stone-800">
                        {isRtl ? "התבוננו בסימני הפנים המאפיינים:" : "Review facial signals:"}
                      </h4>
                      <p className="text-xs text-stone-550 leading-relaxed mt-1">
                        {isRtl ? activeSelected.descHe : activeSelected.descEn}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3.5 border-t-2 border-dashed border-stone-100">
                  <span className="block text-xs font-bold text-stone-550 mb-2 font-sans">
                    {isRtl ? "2. בחרו את מילת הרגש המתאימה:" : "2. Choose correct matching word:"}
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {EMOJI_POOL.map((p) => (
                      <button
                        key={p.id}
                        id={`guess-btn-${p.id}`}
                        onClick={() => handleLabelGuess(p.id)}
                        className={`py-2 px-3 border-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                          guessLabelId === p.id && p.id !== activeSelected.id
                            ? "bg-red-50 border-red-350 text-red-700 animate-pulse"
                            : "bg-[#FAF8F5] border-stone-200 text-stone-700 hover:bg-stone-100 active:scale-95"
                        }`}
                      >
                        {isRtl ? p.labelHe : p.labelEn}
                      </button>
                    ))}
                  </div>

                  {guessLabelId && (
                    <p className="text-[9px] text-red-500 font-bold font-mono text-center mt-2.5 animate-pulse">
                      {isRtl 
                        ? "לא בדיוק. התבוננו בסימני הבעת הפנים ונסו שוב!" 
                        : "Not quite. Review the facial hints and try again!"}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-stone-400 py-10 h-full">
                <Smile className="h-10 w-10 text-stone-300 stroke-1 mb-2.5" />
                <p className="text-xs font-medium font-sans max-w-xs">
                  {isRtl 
                    ? "בחרו כרטיס פנים משמאל כדי להתחיל במשחק והרכבת הזוגות" 
                    : "Select a face card on the left to activate matching rules"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
