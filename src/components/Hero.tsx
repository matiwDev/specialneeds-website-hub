import { Sparkles, HelpingHand, Award, Star, BookOpen, Coffee } from "lucide-react";

interface HeroProps {
  onExploreProducts: () => void;
  language: "en" | "he";
}

export default function Hero({ onExploreProducts, language }: HeroProps) {
  const isRtl = language === "he";

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] py-12 md:py-16 border-2 border-[#EAD3C8] rounded-3xl p-6 md:p-10 shadow-sm">
      
      {/* Handcrafted scrapbook corner pieces */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#D98A72]/30 rounded-tl-xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#D98A72]/30 rounded-tr-xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#D98A72]/30 rounded-bl-xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#D98A72]/30 rounded-br-xl pointer-events-none" />

      {/* Decorative calm warm organic blobs */}
      <div className={`absolute top-0 ${isRtl ? "left-0" : "right-0"} -mr-20 -mt-20 h-80 w-80 rounded-full bg-[#FBF2EE]/80 blur-3xl pointer-events-none`} />
      <div className={`absolute bottom-0 ${isRtl ? "right-0" : "left-0"} -ml-20 -mb-20 h-96 w-96 rounded-full bg-[#EFF4F0]/90 blur-3xl pointer-events-none`} />

      <div className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Hero Copy - Column Left */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
            
            {/* Washi-Tape Sticker Badge */}
            <div className={`inline-flex self-start items-center space-x-2 bg-[#EFF4F0] rounded-lg px-3.5 py-1.5 border-2 border-[#C9D9CC] shadow-xs rotate-[-1deg] ${isRtl ? "space-x-reverse" : ""}`}>
              <Sparkles className="h-4 w-4 text-[#3B5B43] shrink-0" />
              <span className="text-[10px] font-bold text-[#3B5B43] tracking-wide font-mono uppercase">
                {isRtl 
                  ? "חדש בקליניקה: משחקי ויסות ולוחות סדר יום אינטראקטיביים" 
                  : "Now Live: Interactive Sensory Playrooms & Boards"}
              </span>
            </div>

            <h1 className={`font-sans text-3.5xl md:text-5xl font-extrabold tracking-tight text-[#4A3E3D] leading-tight ${isRtl ? "text-right" : "text-left"}`}>
              {isRtl ? (
                <>
                  מקום מפלט רגוע ל<span className="text-[#3B5B43]">משפחות ומחנכים</span> בחינוך המיוחד
                </>
              ) : (
                <>
                  A Peaceful Haven for <span className="text-[#3B5B43]">Special Needs</span> Families & Educators
                </>
              )}
            </h1>

            <p className={`text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl ${isRtl ? "text-right" : "text-left"}`}>
              {isRtl 
                ? "שלום לכם! המרחב התחושתי של מיס שרה נולד כמקלט דיגיטלי וכלי עזר עבור הורים, מלווים ומורים תומכים לילדים מדהימים על הרצף הנוירולוגי ובכלל. חומרי הלמידה והעזרים שלי מתוכננים במיוחד להפחתת חרדת מעברים, שיפור תקשורת תומכת, והפיכת תרגולי מוטוריקה עדינה לחוויה מרגיעה, פשוטה ומהנה."
                : "Hello! This space was crafted as a digital refuge for parents, guardians, and support teachers of neurodivergent superstars. My resources are engineered to reduce transitions anxiety, build communication milestones, and make fine motor sensory practice beautiful and fun."
              }
            </p>

            {/* Quick value props / badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 py-1">
              {[
                { 
                  icon: HelpingHand, 
                  titleEn: "Classroom Tested", descEn: "For families & schools",
                  titleHe: "מוכן ונבדק בכיתה", descHe: "להורים וכיתות שילוב"
                },
                { 
                  icon: Award, 
                  titleEn: "Sensory Aligned", descEn: "Evidence-based tools",
                  titleHe: "מותאם ויסות חושי", descHe: "כלים תומכים מגוונים"
                },
                { 
                  icon: Coffee, 
                  titleEn: "Calming Visuals", descEn: "Zero overstimulation",
                  titleHe: "עיצוב רגוע ומזמין", descHe: "למניעת מסיחים והצפה"
                }
              ].map((pill, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-start space-x-2.5 bg-white/95 backdrop-blur-xs rounded-2xl p-3 border-2 border-[#EAD3C8] shadow-xs hover:border-[#D98A72]/40 transition-colors ${
                    isRtl ? "space-x-reverse text-right" : "text-left"
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-[#FBF2EE] border border-[#EAD3C8] text-[#9B4D36] shrink-0">
                    <pill.icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-[#4A3E3D]">
                      {isRtl ? pill.titleHe : pill.titleEn}
                    </h3>
                    <p className="text-[10px] text-stone-500 font-mono leading-tight mt-0.5">
                      {isRtl ? pill.descHe : pill.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className={`flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-3 ${isRtl ? "sm:space-x-reverse" : ""}`}>
              <button
                onClick={onExploreProducts}
                className="inline-flex justify-center items-center rounded-2xl bg-[#3B5B43] px-6 py-3.5 text-xs font-extrabold text-[#FAF8F5] transition-all shadow-md hover:bg-[#2D4532] active:scale-95 cursor-pointer border-2 border-transparent hover:border-[#3B5B43]"
                id="hero-explore-button"
              >
                {isRtl ? "כניסה לחנות חומרי הלמידה" : "Browse Materials Store"}
              </button>
              
              <div className={`flex items-center justify-center space-x-3 px-1 py-1 text-stone-600 ${isRtl ? "space-x-reverse" : ""}`}>
                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120"
                    alt="Parent"
                    referrerPolicy="no-referrer"
                    className="h-8.5 w-8.5 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120"
                    alt="Teacher"
                    referrerPolicy="no-referrer"
                    className="h-8.5 w-8.5 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120"
                    alt="Educator"
                    referrerPolicy="no-referrer"
                    className="h-8.5 w-8.5 rounded-full border-2 border-white object-cover"
                  />
                </div>
                <div className={`text-[11px] font-bold ${isRtl ? "text-right" : "text-left"}`}>
                  <span className="block text-[#4A3E3D]">
                    {isRtl ? "בשימוש מעל 250 כיתות טיפוליות" : "Trusted by 250+ classrooms"}
                  </span>
                  <span className="text-stone-500 block font-mono text-[9px]">
                    {isRtl ? "סוללים שבילי למידה עצמאיים ומותאמים" : "Empowering autism learning pathways"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Teacher Bio Feature Widget - Column Right */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl bg-white border-2 border-[#EAD3C8] p-5.5 shadow-md overflow-hidden hover:scale-[1.01] transition-transform duration-300">
              
              {/* Handcrafted scrapbook scotch tape paper decorator effect */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-28 h-6 bg-amber-50/70 border-x border-b border-amber-200/50 rotate-[-1deg] rounded-b z-20 pointer-events-none" />

              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600&h=600"
                  alt="Teacher Ms. Sarah Baker M.Ed."
                  referrerPolicy="no-referrer"
                  className="object-cover w-full h-full"
                />
                
                {/* Floating Bio Label */}
                <div className={`absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-[#EAD3C8] shadow-md ${isRtl ? "text-right" : "text-left"}`}>
                  <div className={`flex items-center justify-between ${isRtl ? "flex-row-reverse" : ""}`}>
                    <div>
                      <h4 className="font-sans text-xs font-bold text-[#4A3E3D]">
                        {isRtl ? "שרה בייקר, M.Ed." : "Sarah Baker, M.Ed."}
                      </h4>
                      <p className="font-mono text-[9px] text-[#3B5B43] font-bold uppercase tracking-wider mt-0.5">
                        {isRtl ? "מפתחת פתרונות חינוך מיוחד" : "Special Education Developer"}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 bg-[#FBF2EE] border border-[#EAD3C8] rounded-md px-1.5 py-0.5">
                      <Star className="h-3 w-3 fill-amber-300 text-amber-500" />
                      <span className="text-[9px] font-bold text-[#9B4D36]">BCBA</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sarah's Personal Welcome Blurb */}
              <div className="mt-4.5 space-y-2.5">
                <div className={`flex items-center space-x-2 text-[#3B5B43] ${isRtl ? "space-x-reverse flex-row-reverse" : ""}`}>
                  <BookOpen className="h-4.5 w-4.5" />
                  <span className="font-sans text-[10.5px] font-bold uppercase tracking-wider text-[#3B5B43]">
                    {isRtl ? "החזון של מיס שרה" : "Ms. Sarah's Mission"}
                  </span>
                </div>
                <blockquote className={`text-xs text-stone-600 italic leading-relaxed pl-3 pr-2 border-stone-300 ${isRtl ? "text-right border-r-2 border-l-0 border-[#3B5B43] pr-3" : "border-l-2 border-[#3B5B43] pl-3"}`}>
                  {isRtl 
                    ? `"ההשראה לבניית המרכז נבעה מתוך 12 שנות עבודה כמחנכת מומחית בבתי ספר משלבים ובחינוך המיוחד. החיפוש אחרי דפי עבודה ומשחקי תווך המותאמים למצבי הצפה תחושתית - ללא מסיחים מבלבלים ועיצובים המייצרים רעש ויזואלי - היה כמעט בלתי אפשרי. הפורטל התומך הזה הוא הלב שלי המוקדש להתקדמותם השלווה של ילדיכם."`
                    : `"I was inspired to build this platform after spending 12 years in inclusive public special schools. Finding software and worksheets designed specifically for sensory sensory triggers, without complex visual noise, was nearly impossible. This portal is my heart and dedication to your student's calm progress."`
                  }
                </blockquote>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
