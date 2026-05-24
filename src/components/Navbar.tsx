import React, { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: "en" | "he";
  setLang: (lang: "en" | "he") => void;
  isLessonActive: boolean;
  setIsLessonActive: (active: boolean) => void;
  t: any;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  isLessonActive,
  setIsLessonActive,
  t,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isRtl = t.dir === "rtl";

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
    if (tabId !== "myLearning") {
      setIsLessonActive(false);
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: "home", label: t.home },
    { id: "shop", label: t.shop },
    { id: "myLearning", label: t.myLearning },
    { id: "about", label: t.about },
    { id: "contact", label: t.contact },
  ];

  return (
    <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200/50 z-40">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand Logo and Title */}
        <button
          onClick={() => handleTabClick("home")}
          className="flex items-center gap-3 hover:opacity-85 transition focus:outline-none focus:ring-2 focus:ring-sky-200 rounded-xl p-1"
          aria-label={t.brand}
        >
          <span className="bg-sky-500 text-white w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg">
            🕊️
          </span>
          <span className="font-semibold text-xl tracking-tight text-slate-800">
            {t.brand}
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {navItems.map((item) => {
            const isActive =
              currentTab === item.id || (item.id === "myLearning" && isLessonActive && currentTab === "myLearning");
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`pb-1 border-b-2 transition focus:outline-none focus:ring-2 focus:ring-sky-200 rounded-lg px-2 ${
                  isActive
                    ? "border-sky-500 text-slate-800"
                    : "border-transparent text-slate-400 hover:text-slate-850"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Custom Actions (Language switch + mobile drawer toggle) */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLang(lang === "en" ? "he" : "en")}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-xl border border-slate-200 transition text-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-slate-350"
            aria-label="Toggle Language"
          >
            <span className="text-xs">🌐</span>
            {lang === "en" ? "עברית" : "English"}
          </button>

          {/* Accessible Hamburger Menu Button - Touch Target is >= 44px (explicitly 48px) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-850 transition focus:outline-none focus:ring-2 focus:ring-sky-200"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            id="mobile-hamburger-btn"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive mobile overlay/drawer */}
      {isMenuOpen && (
        <>
          {/* Backdrop Blur Overlay with Click Handler to Close */}
          <div
            className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel Menu */}
          <div
            className={`md:hidden fixed inset-y-0 ${
              isRtl ? "right-0" : "left-0"
            } w-72 bg-white shadow-2xl z-50 p-6 flex flex-col justify-between border-t border-slate-100`}
            style={{
              animation: "slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
            role="dialog"
            aria-modal="true"
          >
            {/* Slide animation CSS rule */}
            <style>{`
              @keyframes slideIn {
                from {
                  transform: ${isRtl ? "translateX(100%)" : "translateX(-100%)"};
                }
                to {
                  transform: translateX(0);
                }
              }
            `}</style>

            <div className="space-y-6">
              {/* Drawer Brand Section */}
              <div className={`flex items-center justify-between border-b pb-4 border-slate-100 ${isRtl ? "flex-row-reverse" : ""}`}>
                <div className="flex items-center gap-2">
                  <span className="bg-sky-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-base">
                    🕊️
                  </span>
                  <span className="font-bold text-lg text-slate-800">
                    {t.brand}
                  </span>
                </div>
                {/* Close Button with 44px min touch target */}
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Items Link Stack */}
              <nav className="flex flex-col gap-4 text-base font-bold">
                {navItems.map((item) => {
                  const isActive =
                    currentTab === item.id || (item.id === "myLearning" && isLessonActive && currentTab === "myLearning");
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabClick(item.id)}
                      className={`w-full py-3 px-4 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-sky-200 ${
                        isRtl ? "text-right" : "text-left"
                      } ${
                        isActive
                          ? "bg-sky-50 text-sky-600 border border-sky-100"
                          : "text-slate-600 hover:bg-slate-105"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quiet accessibility indicator */}
            <div className={`border-t border-slate-100 pt-4 text-[11px] font-mono text-slate-400 ${isRtl ? "text-right" : "text-left"}`}>
              <span>GentleSteps Special Needs Classroom</span>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
