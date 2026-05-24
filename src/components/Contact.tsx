import React, { useState } from "react";

interface ContactProps {
  lang: "en" | "he";
  t: any;
  onSubmitMock: (e: React.FormEvent) => void;
  formSubmitted: boolean;
}

export default function Contact({ lang, t, onSubmitMock, formSubmitted }: ContactProps) {
  return (
    <div className="bg-white border border-slate-100 p-8 md:p-12 rounded-3xl shadow-xs animate-fadeIn max-w-2xl mx-auto space-y-6">
      <div className="space-y-2 text-start">
        <h2 className="text-3xl font-black text-slate-800">{t.contactTitle}</h2>
        <p className="text-slate-400 text-xs leading-relaxed">{t.contactSub}</p>
      </div>

      <form onSubmit={onSubmitMock} className="space-y-6">
        <div className="space-y-1.5 text-start">
          <label className="text-xs font-black text-slate-500 uppercase block">{t.nameLabel}</label>
          <input
            type="text"
            required
            placeholder={lang === "en" ? "Enter your name" : "הקלידו את שמכם"}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-sky-100 font-medium text-sm text-slate-850"
          />
        </div>

        <div className="space-y-1.5 text-start">
          <label className="text-xs font-black text-slate-500 uppercase block">{t.emailLabel}</label>
          <input
            type="email"
            required
            placeholder="name@educator.com"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-sky-100 font-medium text-sm text-slate-850"
          />
        </div>

        <div className="space-y-1.5 text-start">
          <label className="text-xs font-black text-slate-500 uppercase block">{t.msgLabel}</label>
          <textarea
            required
            rows={4}
            placeholder={lang === "en" ? "How can I support your classroom?" : "פרטו כאן על הצרכים וכלי הלמידה הרצויים לילדכם..."}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-4 focus:ring-sky-100 font-medium text-sm text-slate-850"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-black text-sm py-4 rounded-xl transition shadow-xs cursor-pointer"
        >
          📬 {t.sendBtn}
        </button>
      </form>

      {formSubmitted && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl text-xs font-bold text-center animate-pulse border border-emerald-100">
          ⭐ {lang === "en" ? "Thank you warmth! Classroom contact simulation message submitted successfully." : "תודה רבה! הודעת הסימולציה נמסרה בהצלחה. אצור אתכם קשר בהקדם."}
        </div>
      )}
    </div>
  );
}
