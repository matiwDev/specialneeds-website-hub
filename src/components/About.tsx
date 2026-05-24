import React from "react";

function LeafIcon() {
  return (
    <svg className="w-8 h-8 text-[#A1B59F] inline-block shrink-0 select-none transition-transform" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 3s-6.32 0-11.23 4.2c-4.47 3.82-5.77 9.87-5.77 9.87s6 .52 10.47-3.3c4.91-4.2 6.53-10.77 6.53-10.77s.12-3.13-1-3.23z"/>
      <path d="M3 21s3.32-6.52 8.77-11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

interface AboutProps {
  lang: "en" | "he";
  t: any;
}

export default function About({ lang, t }: AboutProps) {
  const isRtl = lang === "he";

  return (
    <div className="bg-white border border-slate-100 p-8 md:p-12 rounded-3xl shadow-xs space-y-8 animate-fadeIn max-w-4xl mx-auto text-start">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <LeafIcon />
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">{t.aboutTitle}</h2>
        </div>
        <p className="text-sky-600 font-bold text-sm tracking-wide">{t.aboutSubtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2 space-y-6">
          <p className="text-slate-500 text-base leading-relaxed tracking-wide">
            {t.aboutP1}
          </p>
          <p className="text-slate-505 text-base leading-relaxed tracking-wide">
            {t.aboutP2}
          </p>

          <div className="bg-sky-50/50 p-6 rounded-2xl border border-sky-100 mt-2 text-xs font-bold leading-relaxed text-[#55409E]">
            {lang === "en" ? "❤️ High readability contrast ratios, oversized touch layouts, and muted auditory waveforms are custom adapted to conform fully to the WCAG accessibility design framework for neurodiverse children." : "❤️ רמת ניגודיות גבוהה במיוחד, פריסות מגע מוגדלות וצלילים אקוסטיים רכים מותאמים במיוחד להנחיות הנגישות הבינלאומיות של משרד החינוך וה-WCAG עבור ילדים נוירו-דייברגנטיים."}
          </div>
        </div>

        <div className="md:col-span-1 border-box">
          <div className="bg-[#FAF8F5] border-2 border-[#DACCE5]/30 p-3 rounded-2xl shadow-xs select-none max-w-xs mx-auto md:max-w-none w-full transform hover:scale-102 transition duration-200">
            <div className="relative overflow-hidden rounded-xl border border-slate-200/40">
              <img 
                src="https://lh3.googleusercontent.com/d/103hDjoPAzmheDdUZEjAzeUF46ayyOkhA" 
                alt={lang === "en" ? "Orit - Sanctuary Specialist & Teacher" : "אורית - מנחת המשאבים והלמידה"}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover aspect-[4/5]"
              />
              <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-[10px] font-black text-[#55409E] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs border border-[#DACCE5]/20 select-none">
                🌿 {lang === "en" ? "Special Educator" : "חינוך מיוחד"}
              </div>
            </div>
            <div className="text-center mt-3.5 pb-1">
              <span className="text-sm font-black text-slate-800 block">
                {lang === "en" ? "Orit" : "אורית"}
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans block mt-0.5">
                {lang === "en" ? "Founder of GentleSteps" : "מייסדת ועורכת פדגוגית"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
