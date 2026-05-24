import React from "react";

interface HeroProps {
  lang: "en" | "he";
  t: any;
  onNavigate: (tab: string, subTab?: "pdf" | "interactive") => void;
}

export default function Hero({ lang, t, onNavigate }: HeroProps) {
  return (
    <div className="space-y-16 animate-fadeIn">
      {/* Hero Card block */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="inline-block bg-sky-50 text-sky-600 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest text-start md:text-center select-none">
            ✨ {lang === "en" ? "Bespoke Special Needs Curriculum" : "תכנית לימודים מותאמת לחינוך מיוחד"}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight tracking-tight">
            {t.heroTitle}
          </h1>
          <p className="text-md text-slate-400 leading-relaxed max-w-lg">
            {t.heroSub}
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onNavigate("shop", "pdf")}
              className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-4 rounded-2xl shadow-xs transition transform hover:-translate-y-0.5 text-base flex items-center gap-2 cursor-pointer"
            >
              📥 {lang === "en" ? "Browse Printable PDFs" : "דפי עבודה להדפסה"}
            </button>
            <button
              onClick={() => onNavigate("myLearning", "interactive")}
              className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-6 py-4 rounded-2xl shadow-xs transition transform hover:-translate-y-0.5 text-base flex items-center gap-2 cursor-pointer"
            >
              🎮 {lang === "en" ? "Play Interactive Games" : "שחקו במשחקים אינטראקטיביים"}
            </button>
          </div>
        </div>

        {/* Classroom Hero Artwork Banner */}
        <div className="flex justify-center items-center">
          <div className="relative p-2 w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 to-purple-500/10 rounded-3xl blur-2xl"></div>
            <img
              src="https://lh3.googleusercontent.com/d/1zzBaVgRUzrilZWwKfQfV6UlkGVn9SI-2"
              alt="Classroom routine cards"
              className="relative z-10 w-full h-auto max-h-[380px] object-contain rounded-3xl shadow-sm border border-slate-100/40 bg-white"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Curriculum Pillar Areas */}
      <div className="space-y-8 border-t border-slate-200/60 pt-16">
        <div className="text-center space-y-3 max-w-lg mx-auto">
          <h2 className="text-3xl font-bold text-slate-800">{t.featuredHeading}</h2>
          <p className="text-slate-450 text-xs text-stone-400">{t.featuredSub}</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100/80 text-center space-y-4 hover:shadow-xs transition">
            <div className="w-14 h-14 mx-auto bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 text-2xl select-none">
              🧠
            </div>
            <h3 className="text-lg font-bold text-slate-850">{t.cognitive}</h3>
            <p className="text-slate-450 text-xs leading-relaxed">{t.cognitiveDesc}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100/80 text-center space-y-4 hover:shadow-xs transition">
            <div className="w-14 h-14 mx-auto bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 text-2xl select-none">
              🌬️
            </div>
            <h3 className="text-lg font-bold text-slate-850">{t.sensory}</h3>
            <p className="text-slate-450 text-xs leading-relaxed">{t.sensoryDesc}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100/80 text-center space-y-4 hover:shadow-xs transition">
            <div className="w-14 h-14 mx-auto bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500 text-2xl select-none">
              ✍️
            </div>
            <h3 className="text-lg font-bold text-slate-850">{t.motor}</h3>
            <p className="text-slate-450 text-xs leading-relaxed">{t.motorDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
