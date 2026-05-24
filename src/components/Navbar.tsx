import { Heart, User, FlaskConical, Languages } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activePersona: "guest" | "one_time" | "all_access";
  changePersona: (persona: "guest" | "one_time" | "all_access") => void;
  language: "en" | "he";
  setLanguage: (lang: "en" | "he") => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  activePersona,
  changePersona,
  language,
  setLanguage,
}: NavbarProps) {
  const isRtl = language === "he";

  // Navigation Links
  const navItems = [
    { id: "home", labelEn: "Home", labelHe: "בית חם" },
    { id: "shop", labelEn: "Resource Shop", labelHe: "חנות עזרי למידה" },
    { id: "learning", labelEn: "My Learning Shelf", labelHe: "מדף הלמידה שלי" },
    { id: "dev-panel", labelEn: "Simulator Sandbox", labelHe: "פאנל בדיקה" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-[#EAD3C8] bg-[#FAF8F5]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Brand */}
        <button
          onClick={() => setActiveTab("home")}
          className={`flex items-center space-x-2.5 text-left focus:outline-none focus:ring-2 focus:ring-[#D98A72]/50 rounded-xl p-1.5 transition-all ${isRtl ? "space-x-reverse" : ""}`}
          id="nav-logo"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#FBF2EE] text-[#9B4D36] border-2 border-[#EAD3C8] rotate-[-2deg] hover:rotate-0 transition-transform shadow-xs">
            <Heart className="h-5 w-5 fill-[#EAD3C8] text-[#9B4D36]" />
          </div>
          <div>
            <span className="block font-sans text-sm font-extrabold tracking-tight text-[#4A3E3D] leading-none mb-1">
              {isRtl ? "מיס שרה" : "Ms. Sarah's"}
            </span>
            <span className="block font-mono text-[9px] font-bold uppercase tracking-wider text-[#3B5B43] bg-[#EFF4F0] px-1.5 py-0.5 rounded border border-[#C9D9CC]">
              {isRtl ? "פינת ויסות תומכת" : "Special Needs Hub"}
            </span>
          </div>
        </button>

        {/* Primary Navigation links */}
        <nav className={`hidden md:flex items-center space-x-2 ${isRtl ? "space-x-reverse" : ""}`} aria-label="Main Navigation">
          {navItems.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-link-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`relative rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-[#EAD3C8]/30 text-[#4A3E3D] border-2 border-[#D98A72]/40 shadow-xs"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 border-2 border-transparent"
                }`}
              >
                {isRtl ? tab.labelHe : tab.labelEn}
                {isActive && (
                  <span className="absolute bottom-1.5 left-4 right-4 h-[3px] bg-[#D98A72] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Simulated State Controls & Language Switcher */}
        <div className={`flex items-center space-x-3 ${isRtl ? "space-x-reverse" : ""}`}>
          
          {/* Custom scrapbook Language Switcher */}
          <div className="flex items-center bg-[#EFF4F0] p-1 rounded-xl border-2 border-[#C9D9CC] shrink-0">
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-1 text-[10px] font-mono font-bold uppercase rounded-lg transition-all ${
                language === "en" 
                  ? "bg-[#3B5B43] text-white shadow-xs" 
                  : "text-[#3B5B43] hover:bg-[#3B5B43]/10"
              }`}
            >
              EN
            </button>
            <span className="text-[#C9D9CC] px-0.5 font-bold text-[10px]">|</span>
            <button
              onClick={() => setLanguage("he")}
              className={`px-2 py-1 text-[10px] font-mono font-bold uppercase rounded-lg transition-all ${
                language === "he" 
                  ? "bg-[#3B5B43] text-white shadow-xs" 
                  : "text-[#3B5B43] hover:bg-[#3B5B43]/10"
              }`}
            >
              עב
            </button>
          </div>

          {/* Persona selector Dropdown */}
          <div className={`flex items-center space-x-2 bg-[#FDFBF7] border-2 border-[#EAD3C8] rounded-xl p-1 px-3 shadow-xs ${isRtl ? "space-x-reverse" : ""}`}>
            <span className="hidden lg:inline-flex items-center space-x-1.5 text-[9px] font-mono font-bold uppercase text-stone-500">
              <User className="h-3.5 w-3.5 text-[#D98A72]" />
              <span>{isRtl ? "סטטוס:" : "Role:"}</span>
            </span>
            <select
              value={activePersona}
              onChange={(e) => changePersona(e.target.value as any)}
              className="text-xs font-bold bg-transparent text-[#4A3E3D] border-none focus:outline-none focus:ring-0 cursor-pointer py-1"
              id="persona-dropdown"
              aria-label="Filter by Testing Role"
            >
              <option value="guest">
                {isRtl ? "אורח קיים" : "Guest / Unauthenticated"}
              </option>
              <option value="one_time">
                {isRtl ? "רוכש יחיד (מעקב חושי)" : "One-Time Buyer (owns Tracker)"}
              </option>
              <option value="all_access">
                {isRtl ? "מנוי מלא גישה (VIP)" : "All-Access Subscriber"}
              </option>
            </select>
          </div>

          {/* Dev Panel Indicator Icon shortcut */}
          <button
            onClick={() => setActiveTab("dev-panel")}
            className={`p-2.5 rounded-xl border-2 transition-all ${
              activeTab === "dev-panel"
                ? "bg-[#FBF2EE] text-[#9B4D36] border-[#D98A72]"
                : "bg-[#FDFBF7] text-stone-500 border-stone-250 hover:bg-[#FBF2EE]"
            }`}
            title={isRtl ? "פאנל בדיקה דיאגנוסטי" : "Developer Testing Panel"}
            id="nav-dev-shortcut"
          >
            <FlaskConical className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {/* Accessible Mobile Menu Helper Block */}
      <div className={`md:hidden flex h-11 items-center justify-around border-t-2 border-[#EAD3C8] bg-[#FAF8F5] px-2 ${isRtl ? "flex-row-reverse" : ""}`}>
        {navItems.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-[10.5px] font-extrabold px-2.5 py-1 rounded-lg transition-all ${
                isActive 
                  ? "bg-[#EAD3C8]/40 text-[#4A3E3D]" 
                  : "text-stone-600 hover:bg-stone-105"
              }`}
            >
              {isRtl ? tab.labelHe : tab.labelEn}
            </button>
          );
        })}
      </div>
    </header>
  );
}
