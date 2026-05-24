import { Lock, Unlock, Download, Play, ShoppingCart } from "lucide-react";
import { Resource } from "../types";

interface ResourceCardProps {
  key?: string | number;
  resource: Resource & { unlocked?: boolean };
  onUnlock: () => void;
  onViewContent: () => void;
  language: "en" | "he";
}

export default function ResourceCard({ resource, onUnlock, onViewContent, language }: ResourceCardProps) {
  const isRtl = language === "he";
  const isFree = resource.price === 0;
  const isUnlocked = resource.unlocked;

  // Translate category titles
  const getCategoryLabel = (cat: string) => {
    if (isRtl) {
      switch (cat) {
        case "Sensory":
          return "ויסות תחושתי";
        case "Communication":
          return "תקשורת תומכת";
        case "Fine Motor Skills":
          return "מוטוריקה עדינה";
        case "Behavior":
          return "התנהגות מעצימה";
        default:
          return cat;
      }
    }
    return cat;
  };

  // Category theme classes
  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case "Sensory":
        return "bg-[#F0F7F7] text-[#2F5257] border-[#D2E4E6]";
      case "Communication":
        return "bg-[#FBF2EE] text-[#9B4D36] border-[#EAD3C8]";
      case "Fine Motor Skills":
        return "bg-[#EFF4F0] text-[#3B5B43] border-[#C9D9CC]";
      case "Behavior":
        return "bg-amber-50 text-amber-900 border-amber-200";
      default:
        return "bg-stone-50 text-stone-700 border-stone-200";
    }
  };

  // Resource type names in both languages
  const getResourceTypeLabel = (type: string) => {
    if (isRtl) {
      switch (type) {
        case "pdf":
          return "קובץ PDF להדפסה";
        case "interactive":
          return "לוח דיגיטלי אינטראקטיבי";
        case "package":
          return "ערכת מאסטר משולבת";
        default:
          return type;
      }
    }
    return type;
  };

  return (
    <div className={`flex flex-col justify-between rounded-3xl border-2 border-[#EAD3C8] bg-white p-6 shadow-sm hover:shadow-md transition-all ${isRtl ? "text-right" : "text-left"}`}>
      
      {/* Category and Type Header */}
      <div>
        <div className={`flex items-center justify-between border-b-2 border-dashed border-[#EAD3C8]/40 pb-3.5 mb-3.5 ${isRtl ? "flex-row-reverse" : ""}`}>
          <span className={`rounded-xl border-2 px-3 py-0.5 text-[10px] font-bold tracking-wide uppercase ${getCategoryTheme(resource.category)}`}>
            {getCategoryLabel(resource.category)}
          </span>
          
          <span className={`inline-flex items-center space-x-1.5 text-[10px] font-bold text-stone-500 font-mono ${isRtl ? "space-x-reverse flex-row-reverse" : ""}`}>
            <span className={`h-2 w-2 rounded-full ${resource.type === "interactive" ? "bg-cyan-500" : resource.type === "package" ? "bg-purple-500" : "bg-[#D98A72]"}`} />
            <span>{getResourceTypeLabel(resource.type)}</span>
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="font-sans text-base font-extrabold text-[#4A3E3D] leading-snug">
          {resource.title}
        </h3>
        
        <p className="mt-2.5 text-xs text-stone-600 leading-relaxed min-h-[58px] line-clamp-3">
          {resource.description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-4 border-t-2 border-stone-100">
        <div className={`flex items-center justify-between mb-4.5 ${isRtl ? "flex-row-reverse" : ""}`}>
          <div className={isRtl ? "text-right" : "text-left"}>
            <span className="block text-[9px] font-mono text-stone-400 font-semibold">
              {isRtl ? "סוג הרישיון" : "License model"}
            </span>
            <span className="font-sans text-xs font-black text-stone-800">
              {isFree ? (
                <span className="text-[#3B5B43]">{isRtl ? "פוליו חינמי פתוח" : "Free Access"}</span>
              ) : (
                `$${(resource.price / 100).toFixed(2)}`
              )}
            </span>
          </div>

          {/* Locked indicators */}
          <div className="flex items-center">
            {isUnlocked ? (
              <span className="inline-flex items-center space-x-1 rounded-lg bg-[#EFF4F0] text-[#3B5B43] border border-[#C9D9CC] px-2.5 py-0.5 text-[10px] font-bold">
                <Unlock className="h-3 w-3 shrink-0 text-[#3B5B43]" />
                <span className="mx-0.5">{isRtl ? "פתוח לשימושיך" : "Unlocked"}</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1 rounded-lg bg-stone-100 text-stone-550 border border-stone-250 px-2.5 py-0.5 text-[10px] font-bold">
                <Lock className="h-3 w-3 shrink-0 text-stone-400" />
                <span className="mx-0.5">{isRtl ? "תוכן נעול" : "Gated"}</span>
              </span>
            )}
          </div>
        </div>

        {/* Primary action buttons */}
        {isUnlocked ? (
          <button
            onClick={onViewContent}
            className={`flex w-full items-center justify-center space-x-1.5 rounded-xl bg-[#3B5B43] hover:bg-[#2D4532] px-4 py-3 text-xs font-bold text-white transition-all shadow-sm cursor-pointer ${isRtl ? "space-x-reverse" : ""}`}
            id={`btn-view-${resource.id}`}
          >
            {resource.type === "interactive" ? (
              <>
                <Play className="h-4 w-4 fill-current" />
                <span>{isRtl ? "הפעל פעילות אינטראקטיבית" : "Launch Interactive Playroom"}</span>
              </>
            ) : resource.type === "package" ? (
              <>
                <Download className="h-4 w-4" />
                <span>{isRtl ? "פתח חומרי למידה של המארז" : "Access Master Bundle"}</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                <span>{isRtl ? "הורד קובץ הנחיות PDF" : "Download PDF Guidelines"}</span>
              </>
            )}
          </button>
        ) : (
          <button
            onClick={onUnlock}
            className={`flex w-full items-center justify-center space-x-1.5 rounded-xl bg-stone-900 hover:bg-stone-850 px-4 py-3 text-xs font-bold text-white transition-all shadow-sm cursor-pointer ${isRtl ? "space-x-reverse" : ""}`}
            id={`btn-unlock-${resource.id}`}
          >
            <ShoppingCart className="h-4 w-4 shrink-0 text-stone-300" />
            <span>{isRtl ? "פתיחת המוצר / סימולציית רכישה" : "Unlock item / Simulate Purchase"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
