import React from "react";

interface SandboxControlsProps {
  activePersona: string;
  setActivePersona: (persona: string) => void;
  lang: "en" | "he";
  t: any;
  onResetSandbox: () => void;
}

export default function SandboxControls({
  activePersona,
  setActivePersona,
  lang,
  t,
  onResetSandbox,
}: SandboxControlsProps) {
  return (
    <div className="bg-sky-50 border-b border-sky-100 py-3.5 px-6 shadow-inner select-none">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-sm">⚙️</span>
          <span className="font-bold text-slate-600 uppercase tracking-wider">{t.personaTitle}</span>
        </div>
        <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
          <button
            onClick={() => setActivePersona("guest")}
            className={`px-3 py-2 rounded-xl font-bold text-xs transition duration-150 cursor-pointer ${
              activePersona === "guest"
                ? "bg-slate-800 text-white shadow-xs"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
            id="sandbox-btn-guest"
          >
            {lang === "en" ? "Guest Tier (Locked App)" : "אורח (נעול ללא רכישה)"}
          </button>
          <button
            onClick={() => setActivePersona("buyer")}
            className={`px-3 py-2 rounded-xl font-bold text-xs transition duration-150 cursor-pointer ${
              activePersona === "buyer"
                ? "bg-sky-500 text-white shadow-xs"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
            id="sandbox-btn-buyer"
          >
            {lang === "en" ? "Partial Buyer (Sensory & Motor Only)" : "רוכש משאבי ויסות חושי ומוטוריקה"}
          </button>
          <button
            onClick={() => setActivePersona("subscriber")}
            className={`px-3 py-2 rounded-xl font-bold text-xs transition duration-150 cursor-pointer ${
              activePersona === "subscriber"
                ? "bg-emerald-500 text-white shadow-xs"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
            id="sandbox-btn-subscriber"
          >
            {lang === "en" ? "Subscriber (All-Access 12 Resources)" : "מנוי גישה מלאה (כל 12 המשאבים)"}
          </button>
          <button
            onClick={onResetSandbox}
            className="bg-amber-600 hover:bg-amber-700 text-white font-black px-3.5 py-2 rounded-xl text-xs transition duration-150 flex items-center gap-1.5 shadow-sm cursor-pointer"
            id="sandbox-reset-btn"
          >
            🔄 {lang === "en" ? "Reset Progress & Data" : "איפוס נתונים"}
          </button>
        </div>
      </div>
    </div>
  );
}
