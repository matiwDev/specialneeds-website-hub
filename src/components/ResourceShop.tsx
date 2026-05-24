import React from "react";

interface ResourceShopProps {
  lang: "en" | "he";
  t: any;
  shopTab: "pdf" | "interactive";
  setShopTab: (tab: "pdf" | "interactive") => void;
  mockResources: any[];
  unlockedResources: string[];
  pulsingId: string | null;
  handleCrossGuide: (partnerId: string, currentContext: "shop" | "learning") => void;
  handlePurchaseMock: (id: string) => void;
  handlePdfDownload: (id: string) => void;
  setDownloadModalFile: (file: string | null) => void;
  setCurrentTab: (tab: string) => void;
  setLearningTab: (tab: "pdf" | "interactive") => void;
  setActiveInteractiveId: (id: string | null) => void;
  playTone: (freq: number, type?: "sine" | "triangle", duration?: number) => void;
}

export default function ResourceShop({
  lang,
  t,
  shopTab,
  setShopTab,
  mockResources,
  unlockedResources,
  pulsingId,
  handleCrossGuide,
  handlePurchaseMock,
  handlePdfDownload,
  setDownloadModalFile,
  setCurrentTab,
  setLearningTab,
  setActiveInteractiveId,
  playTone,
}: ResourceShopProps) {
  // Coordinate styled visual icons mapping to 6 subjects
  const subjectIcons: Record<string, string> = {
    sensory: "🌬️",
    emotional: "🎭",
    motor: "✍️",
    routines: "📅",
    cognitive: "🧩",
    language: "🗣️"
  };

  return (
    <div className="space-y-10 animate-fadeIn text-start">
      <div className="space-y-3 max-w-2xl">
        <h2 className="text-3xl font-black text-slate-800">{t.shopTitle}</h2>
        <p className="text-slate-400 text-sm leading-relaxed">{t.shopSub}</p>
      </div>

      {/* Highly Distinct Visual Curriculum Tabs */}
      <div className="flex bg-slate-200/70 p-1.5 rounded-2xl max-w-md w-full border border-slate-200">
        <button
          onClick={() => setShopTab("pdf")}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            shopTab === "pdf" ? "bg-white text-sky-600 shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-white/40"
          }`}
          id="shop-tab-btn-pdf"
        >
          📥 {t.tabPrintable}
        </button>
        <button
          onClick={() => setShopTab("interactive")}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            shopTab === "interactive" ? "bg-white text-purple-600 shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-white/40"
          }`}
          id="shop-tab-btn-interactive"
        >
          🎮 {t.tabInteractive}
        </button>
      </div>

      {/* Filtered 6 Core Corresponding Products */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockResources
          .filter((res) => res.type === shopTab)
          .map((res) => {
            const isUnlocked = unlockedResources.includes(res.id);
            const isPulsing = pulsingId === res.id;
            const itemData = lang === "en" ? res.en : res.he;
            const matchingIcon = subjectIcons[res.category] || "📘";

            return (
              <div
                key={res.id}
                id={`resource-card-${res.id}`}
                className={`bg-white border rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-md transition-all duration-300 ${
                  isPulsing ? "border-sky-400 ring-4 ring-sky-100 scale-102 animate-pulse" : "border-slate-100"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-2xl">
                    <span className="text-xl select-none">{matchingIcon}</span>
                    <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest block font-sans">
                      {itemData.subject}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-slate-805 tracking-tight leading-snug text-slate-800">
                      {itemData.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {itemData.desc}
                    </p>
                  </div>
                </div>

                {/* Coordinates Section: Coordinating resource pairing card links */}
                <div className="space-y-4">
                  <button
                    onClick={() => handleCrossGuide(res.partnerId, "shop")}
                    className="w-full text-start text-xxs font-extrabold text-sky-505 text-sky-500 hover:text-sky-600 bg-sky-50/50 hover:bg-sky-50 py-2.5 px-3 rounded-lg border border-sky-100/50 block transition cursor-pointer"
                  >
                    {t.partnerLinkMsg}
                    <span className="underline">{res.type === "pdf" ? t.partnerTypeInteractive : t.partnerTypePdf}</span>
                  </button>

                  <div className="flex items-center justify-between border-t border-slate-100/80 pt-4 gap-2">
                    <span className="text-sm font-black text-[#55409E] bg-[#E7E2FA] px-3 py-1.5 rounded-lg border border-[#D5CBEF] tracking-tight shrink-0">
                      {res.price}
                    </span>

                    {isUnlocked ? (
                      res.type === "pdf" ? (
                        <button
                          onClick={() => {
                            handlePdfDownload(res.id);
                            setDownloadModalFile(itemData.title);
                          }}
                          className="bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition inline-flex items-center gap-1 shadow-xs font-sans shrink-0 cursor-pointer"
                        >
                          📥 {lang === "en" ? "Download PDF" : "הורדת קובץ"}
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setCurrentTab("myLearning");
                            setLearningTab("interactive");
                            setActiveInteractiveId(res.id);
                            playTone(392.00, "sine", 0.6);
                          }}
                          className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition inline-flex items-center gap-1 shadow-xs font-sans shrink-0 cursor-pointer"
                        >
                          ⚡ {lang === "en" ? "Launch Activity" : "הפעלת משחק"}
                        </button>
                      )
                    ) : (
                      <button
                        onClick={() => handlePurchaseMock(res.id)}
                        className="bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition inline-flex items-center gap-1 shadow-xs font-sans shrink-0 cursor-pointer"
                      >
                        🔓 {lang === "en" ? `Unlock • ${res.price}` : `פתחו • ${res.price}`}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
