import { X, FileText, Download, CheckCircle, FolderArchive, Layers, Check } from "lucide-react";
import { Resource } from "../types";
import EmotionsGame from "./EmotionsGame";
import FirstThenBoard from "./FirstThenBoard";
import { useState } from "react";

interface ResourceContentModalProps {
  resource: Resource & { content?: string; mockSecureUrl?: string };
  onClose: () => void;
  language?: "en" | "he";
}

export default function ResourceContentModal({ resource, onClose, language = "en" }: ResourceContentModalProps) {
  const isRtl = language === "he";
  const [downloadedFiles, setDownloadedFiles] = useState<Record<string, boolean>>({});

  const simulateFileDownload = (fileName: string) => {
    setDownloadedFiles(prev => ({ ...prev, [fileName]: true }));
    const msg = isRtl 
      ? `[רכיב הורדה מדומה] פרוקסי מאובטח אותחל בהצלחה! הקובץ "${fileName}" הורד לדפדפן בצורה מאובטחת.`
      : `[Simulated Download] Secure proxy initialized! "${fileName}" has been downloaded successfully into your browser context.`;
    alert(msg);
  };

  const renderCalmGuidelineshe = (text: string) => {
    // Elegant hardcoded bilingual rendering of manual guidelines
    if (resource.id === "sensory-routine-tracker") {
      return (
        <div className="space-y-3 text-right">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-900 bg-blue-50 border border-blue-150 p-2.5 rounded-lg mt-5 mb-3">
            מדריך מעקב שגרת ויסות חושי כיתתי
          </h3>
          <p className="text-xs text-stone-800 leading-relaxed font-sans">
            <strong>מטרה:</strong> לסייע לתלמידים וילדים על הרצף הנוירולוגי לתעד את הצלחת המעברים השגרתיים בכיתה או בבית.
          </p>
          <p className="text-xs text-stone-800 leading-relaxed font-sans">
            <strong>הנחיות שימוש:</strong> מומלץ להדפיס על דפי פסטל בצבע ירוק-בהיר או קרם כדי להפחית השתקפויות אור מבלבלות עבור ילדים עם רגישויות ראייה.
          </p>
          <ul className="list-disc pr-5 text-xs text-stone-700 space-y-2 font-sans">
            <li>סמנו פריטים תחושתיים מיד בתום כל משימת שולחן ממושכת.</li>
            <li><strong>פעילויות מומלצות להפסקה ממוקדת:</strong> דחיפות קיר מתונות, לחיצות יד קפיציות, שימוש באוזניות חוסמות רעשים ל-5 דקות, נשימות בטן עמוקות.</li>
          </ul>
        </div>
      );
    }
    
    if (resource.id === "emotion-matching-game") {
      return (
        <div className="space-y-3 text-right">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-900 bg-blue-50 border border-blue-150 p-2.5 rounded-lg mt-5 mb-3">
            משחק חקר רגשות ומחשבות
          </h3>
          <p className="text-xs text-stone-850 leading-relaxed font-sans">
            ברוכים הבאים לפינת חקר הרגשות של מיס שרה. סייעו לתלמיד להתאים בין דמויות החיות המביעות הבעות פנים שונות לבין הרגשות: רגוע, מוצף, שמח או מודאג.
          </p>
        </div>
      );
    }

    if (resource.id === "fine-motor-skills-master-pack") {
      return (
        <div className="space-y-3 text-right font-sans">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-900 bg-blue-50 border border-blue-150 p-2.5 rounded-lg mt-5 mb-3">
            מדריך מאסטר לחיזוק מוטוריקה עדינה
          </h3>
          <p className="text-xs text-stone-850 leading-relaxed">
            אנא השתמשו בסייר הקבצים המופיע משמאל. פתחתם בהצלחה 5 קבצי PDF הזמינים להורדה והדפסה ישירה לעידוד מוטוריקה ודיוק כתיבה.
          </p>
        </div>
      );
    }

    return (
      <div className="text-right text-xs text-stone-700 leading-relaxed">
        {text}
      </div>
    );
  };

  // Simple functional parser for rendering standard instructional guidelines (English)
  const renderCalmGuidelinesEn = (text: string) => {
    if (!text) return null;
    return text.split("\n").map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("### ")) {
        return (
          <h3
            key={idx}
            className="text-xs font-mono font-bold uppercase tracking-wider text-blue-900 bg-blue-50 border border-blue-150 p-2 rounded-lg mt-5 mb-3"
          >
            {trimmed.replace("### ", "")}
          </h3>
        );
      }
      if (trimmed.startsWith("- ")) {
        return (
          <li key={idx} className="text-xs text-stone-700 list-disc ml-5 mb-2 leading-relaxed">
            {trimmed.replace("- ", "")}
          </li>
        );
      }
      if (trimmed.match(/^\d+\./)) {
        return (
          <li key={idx} className="text-xs text-stone-700 list-decimal ml-5 mb-2 leading-relaxed">
            {trimmed.replace(/^\d+\s*\.\s*/, "")}
          </li>
        );
      }
      if (trimmed === "") {
        return <div key={idx} className="h-2" />;
      }
      return (
        <p key={idx} className="text-xs text-stone-850 leading-relaxed mb-2 font-sans">
          {line}
        </p>
      );
    });
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs ${isRtl ? "direction-rtl" : ""}`}>
      <div className="flex flex-col w-full max-w-5xl h-[85vh] bg-[#FAF8F5] rounded-3xl border-2 border-[#EAD3C8] shadow-xl overflow-hidden animate-fade-in text-left">
        
        {/* Modal Header */}
        <div className={`flex items-center justify-between px-6 py-4 bg-white border-b-2 border-dashed border-[#EAD3C8]/40 ${isRtl ? "flex-row-reverse" : ""}`}>
          <div className={`flex items-center space-x-3 ${isRtl ? "space-x-reverse flex-row-reverse" : ""}`}>
            <div className={`h-10 w-10 flex items-center justify-center rounded-2xl border-2 ${
              resource.type === "interactive" 
                ? "bg-[#F0F7F7] text-[#2F5257] border-[#D2E4E6]" 
                : resource.type === "package" 
                ? "bg-[#FBF2EE] text-[#9B4D36] border-[#EAD3C8]" 
                : "bg-[#EFF4F0] text-[#3B5B43] border-[#C9D9CC]"
            }`}>
              {resource.type === "package" ? (
                <FolderArchive className="h-5 w-5" />
              ) : (
                <FileText className="h-5 w-5" />
              )}
            </div>
            <div className={isRtl ? "text-right" : "text-left"}>
              <h2 className="text-sm font-black text-[#4A3E3D] line-clamp-1">{resource.title}</h2>
              <span className="block text-[10px] uppercase tracking-wider text-stone-400 font-mono font-bold mt-0.5">
                {isRtl 
                  ? `קטגוריה: ${resource.category} • תוכן מורשה לשימוש` 
                  : `Category: ${resource.category} • Licensed Resource`}
              </span>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="rounded-xl border-2 border-stone-200 bg-white p-2.5 text-stone-600 hover:bg-stone-50 hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-200 transition-all active:scale-95 cursor-pointer"
            aria-label="Close panel"
            id="close-gated-modal"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Modal Main Panel Workspace */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          
          {/* RENDER CASE 1: INTERACTIVE EMOTION GAME */}
          {resource.id === "emotion-matching-game" ? (
            <div className="space-y-6">
              <EmotionsGame language={language} />
              
              <div className={`rounded-2xl border-2 border-[#EAD3C8] bg-[#FAF8F5]/50 p-5 max-w-4xl mx-auto ${isRtl ? "text-right" : "text-left"}`}>
                <span className="text-[10px] font-mono font-bold uppercase text-stone-400">
                  {isRtl ? "הנחיות הפעלה למשפחה ולמלווה:" : "Activity Guidelines for Families:"}
                </span>
                <div className="mt-2 text-xs leading-relaxed text-stone-600 space-y-2">
                  {isRtl ? (
                    <>
                      <p>1. <strong>שיקוף פנים במצבים רגועים:</strong> מומלץ לעבור על הבעות הפנים ולהמחיש את סימני הגוף (למשל, חיוך רחב לעצב או נשימה מהירה לקושי) בזמנים שבהם הילד פנוי ונינוח רגשית.</p>
                      <p>2. <strong>חיזוק מילולי חיובי:</strong> כשהתלמיד יוצר התאמה מוצלחת, קראו איתו יחד את שם הרגש בקול רם כדי לחבר בין שפה דבורה להבנת רגשות פנימית.</p>
                    </>
                  ) : (
                    <>
                      <p>1. <strong>Explain in Neutral Times:</strong> Read about the feelings and express physical markers (e.g. smile for joy) together while the student is relaxed.</p>
                      <p>2. <strong>Verbal Reinforcement:</strong> When a matches is formed, praise of the emotion name aloud to establish receptive and expressive language links.</p>
                    </>
                  )}
                </div>
              </div>
            </div>

          /* RENDER CASE 2: MULTI-FILE WORKBOOK PACKAGE */
          ) : resource.id === "fine-motor-skills-master-pack" ? (
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto h-full ${isRtl ? "direction-rtl" : ""}`}>
              
              {/* Left Column: Bundle items list explorer */}
              <div className={`lg:col-span-7 flex flex-col justify-between rounded-3xl border-2 border-[#EAD3C8] bg-white p-6 shadow-xs overflow-y-auto ${isRtl ? "text-right" : "text-left"}`}>
                <div>
                  <div className={`inline-flex items-center space-x-1 bg-[#FBF2EE] border border-[#EAD3C8] text-[#9B4D36] rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-wide mb-3 ${isRtl ? "space-x-reverse" : ""}`}>
                    <Layers className="h-3.5 w-3.5" />
                    <span>{isRtl ? "מארז אימונים תומך פתוח לשימושיך" : "Unlocked Special Needs Master Bundle"}</span>
                  </div>
                  
                  <h3 className="font-sans text-base font-extrabold text-[#4A3E3D] pb-2 mb-4 border-b-2 border-dashed border-stone-100">
                    {isRtl ? `קבצי מארז מאסטר (5 דפי עבודה ו-2 הפעלות)` : `Master Package Folders (5 PDFs & 2 Activities)`}
                  </h3>

                  <p className="text-xs text-stone-600 mb-6 leading-relaxed">
                    {isRtl 
                      ? "רישיון זה מעניק הרשאת הדפסה מלאה ללא הגבלה בכיתה או בקליניקה הטיפולית שלך. הגופנים בעלי ניגודיות גבוהה מותאמים במיוחד לילדים עם דיסלקציה ודיספרקסיה."
                      : "This license grants complete unlimited prints permission at your classroom or home therapy facility. High-contrast typography optimized for kids with dyslexia and dyspraxia."}
                  </p>

                  <div className="space-y-2.5">
                    {[
                      { 
                        name: "Step_1_Wavy_Line_Coordination_Exercise.pdf", 
                        nameHe: "שלב_1_תרגול_תיאום_קווים_גליים_להדפסה.pdf",
                        type: "PDF Trace Sheet", 
                        typeHe: "דף עבודה PDF למעקב",
                        size: "1.4 MB" 
                      },
                      { 
                        name: "Step_2_Complex_Curves_Writing_Stencil.pdf", 
                        nameHe: "שלב_2_שבלונת_כתיבת_קווים_מעוגלים.pdf",
                        type: "PDF Trace Sheet", 
                        typeHe: "דף אימון PDF",
                        size: "2.1 MB" 
                      },
                      { 
                        name: "Bilateral_Integration_Scissors_Practice_Grid.pdf", 
                        nameHe: "רשת_אימון_גזירה_בטוחה_דו_צדדית.pdf",
                        type: "PDF Activity", 
                        typeHe: "אינטגרציה מוטורית",
                        size: "3.2 MB" 
                      },
                      { 
                        name: "Pencil_Grip_Adjustment_Teacher_Scorecard.pdf", 
                        nameHe: "כרטיס_מלווה_להתאמת_אחיזת_עיפרון_חינוכי.pdf",
                        type: "Educator PDF Guideline", 
                        typeHe: "דף ניקוד למורה",
                        size: "850 KB" 
                      },
                      { 
                        name: "Tactile_Sandpaper_Letters_Template.pdf", 
                        nameHe: "תבנית_יצירה_אותיות_תלת_מימד_תחושתיות.pdf",
                        type: "DIY Activity blueprint", 
                        typeHe: "מדריך יצירה רב-חושי",
                        size: "4.5 MB" 
                      }
                    ].map((file, idx) => {
                      const displayFileName = isRtl ? file.nameHe : file.name;
                      const displayFileType = isRtl ? file.typeHe : file.type;
                      return (
                        <div key={idx} className={`flex items-center justify-between p-3.5 rounded-xl border border-stone-200 hover:border-[#EAD3C8] transition-all bg-white ${isRtl ? "flex-row-reverse" : ""}`}>
                          <div className={`flex items-center space-x-3 truncate ${isRtl ? "space-x-reverse flex-row-reverse" : ""}`}>
                            <div className="h-8 w-8 rounded-lg bg-[#FBF2EE] text-[#9B4D36] flex items-center justify-center shrink-0 border border-[#EAD3C8]">
                              <FileText className="h-4 w-4" />
                            </div>
                            <div className={`truncate ${isRtl ? "text-right" : "text-left"}`}>
                              <span className="block text-xs font-bold text-stone-850 truncate">{displayFileName}</span>
                              <span className="text-[9px] font-mono text-stone-400 uppercase font-semibold">{displayFileType} • {file.size}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => simulateFileDownload(displayFileName)}
                            className={`inline-flex h-8 items-center space-x-1 rounded-lg px-3.5 text-[11px] font-bold tracking-wide transition-all shrink-0 cursor-pointer ${
                              downloadedFiles[displayFileName]
                                ? "bg-[#EFF4F0] text-[#3B5B43] border border-[#C9D9CC] cursor-default"
                                : "bg-stone-900 text-white hover:bg-stone-800 active:scale-95"
                            }`}
                          >
                            {downloadedFiles[displayFileName] ? (
                              <>
                                <Check className="h-3 w-3 stroke-[2.5]" />
                                <span>{isRtl ? "הורד בהצלחה" : "Downloaded"}</span>
                              </>
                            ) : (
                              <>
                                <Download className="h-3 w-3" />
                                <span>{isRtl ? "הורדה" : "Download"}</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-[#FAF8F5] border-2 border-dashed border-[#EAD3C8] p-4 rounded-xl mt-6">
                  <span className="block text-[10px] font-mono font-bold text-stone-400 uppercase">
                    {isRtl ? "הרחבה דיגיטלית אינטראקטיבית:" : "Interactive Digital Addition:"}
                  </span>
                  <p className="text-xs text-stone-600 mt-1">
                    {isRtl 
                      ? "המארז מכיל גם כרטיס סדר יום 'קודם-ואז' לחלוקת מטלות ומעברים תחושתיים. תוכלו להתנסות ולתרגל איתו ישירות כאן למטה:"
                      : "This bundle also includes Sarah's high-contrast iPad First-Then Board. Feel free to open it inside the 'Home' page tab or run a demo below."}
                  </p>
                  <div className="mt-4 border-t border-stone-200 pt-4">
                    <FirstThenBoard language={language} />
                  </div>
                </div>

              </div>

              {/* Right Column: PDF Preview / Information guide */}
              <div className="lg:col-span-5 rounded-3xl border-2 border-[#EAD3C8] bg-[#FAF8F5] p-5 flex flex-col justify-between text-center min-h-[300px]">
                <div className="flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#EAD3C8]/40 rounded-2xl bg-white shadow-xs aspect-[3/4] relative overflow-hidden">
                  <div className="absolute top-2 left-2 text-[9px] font-mono text-[#9B4D36] font-bold bg-[#FBF2EE] px-2.5 py-1 rounded-lg border border-[#EAD3C8]">
                    ZIP BUNDLE
                  </div>
                  
                  <span className="text-5xl">📦</span>
                  <h4 className="text-xs font-bold text-stone-800 mt-4 px-2 line-clamp-2">{resource.title}</h4>
                  <div className="w-16 h-0.5 bg-[#D98A72] my-3 rounded-full" />
                  
                  <div className="space-y-1.5 w-full px-4 mt-2">
                    <div className="h-2 bg-stone-150 rounded w-full border border-stone-200" />
                    <div className="h-2 bg-stone-150 rounded w-5/6 mx-auto border border-stone-200" />
                    <div className="h-2 bg-stone-150 rounded w-2/3 mx-auto border border-stone-200" />
                  </div>
                </div>
                
                <p className="text-[10px] text-stone-500 font-mono mt-3.5 leading-normal">
                  {isRtl 
                    ? "כל השבלונות מעודדות מיקוד ושליטה, תוך שימוש בגבולות מעובדים עבים ובמרחב פתוח למניעת רעש ראייתי." 
                    : "All stencils utilize heavy boundaries and matte light tones, lowering visual confusion during motor focus tasks."}
                </p>
              </div>

            </div>

          /* RENDER CASE 3: STANDARD MANUAL PDF GUIDELINE SHEET */
          ) : (
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto h-full ${isRtl ? "direction-rtl" : ""}`}>
              
              {/* Left Column: Guidelines Text content */}
              <div className={`lg:col-span-8 flex flex-col justify-between rounded-3xl border-2 border-[#EAD3C8] bg-white p-6 shadow-xs overflow-y-auto ${isRtl ? "text-right" : "text-left"}`}>
                <div>
                  <div className={`inline-flex items-center space-x-1.5 bg-[#EFF4F0] border border-[#C9D9CC] text-[#3B5B43] rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-wide mb-3 ${isRtl ? "space-x-reverse" : ""}`}>
                    <CheckCircle className="h-3.5 w-3.5 stroke-[2.5]" />
                    <span>{isRtl ? "מדריך למידה והנחיות מורשה" : "Authorized Learning PDF Tool"}</span>
                  </div>
                  
                  <h3 className="font-sans text-base font-extrabold text-[#4A3E3D] border-b-2 border-dashed border-stone-105 pb-2 mb-4">
                    {isRtl ? "חוברת הנחיות של מיס שרה לרצף הוויסות" : "Educator's Guideline Booklet"}
                  </h3>

                  <div className="space-y-2">
                    {isRtl 
                      ? renderCalmGuidelineshe(resource.content || "") 
                      : renderCalmGuidelinesEn(resource.content || "")
                    }
                  </div>
                </div>

                {/* Simulated file download triggering panel */}
                <div className="bg-[#FAF8F5] border-2 border-[#EAD3C8] p-4.5 rounded-2xl mt-6">
                  <span className="block text-[10px] font-mono font-bold text-stone-400 uppercase">
                    {isRtl ? "קישור מאובטח להורדת הקובץ המלא:" : "Secured Download Link:"}
                  </span>
                  <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 mt-2 ${isRtl ? "sm:flex-row-reverse" : ""}`}>
                    <span className="font-mono text-[9px] text-[#D98A72] truncate max-w-[340px]">
                      {resource.mockSecureUrl || "secured-assets/downloads/educational_pdf_workbook.pdf"}
                    </span>
                    <button
                      onClick={() => simulateFileDownload(`${resource.title.replace(/\s+/g, "_")}.pdf`)}
                      className="inline-flex items-center space-x-1.5 rounded-xl bg-[#3B5B43] hover:bg-[#2D4532] px-4 py-2.5 text-xs font-bold text-white shadow-xs cursor-pointer text-center shrink-0 w-full sm:w-auto justify-center"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>{isRtl ? "הורד חוברת עבודה ב-PDF" : "Download PDF Worksheet"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Print Simulation Sheet (Mock worksheet preview box) */}
              <div className="lg:col-span-4 rounded-3xl border-2 border-[#EAD3C8] bg-[#FAF8F5] p-5 flex flex-col justify-between text-center min-h-[300px]">
                <div className="flex-1 flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#EAD3C8]/40 rounded-xl bg-white shadow-xs aspect-[3/4] relative overflow-hidden">
                  <div className="absolute top-2 left-2 text-[10px] font-mono text-stone-400 font-bold border border-stone-200 px-2 py-0.5 rounded-lg">
                    {isRtl ? "עמוד 1 מתוך 8" : "Page 1 / 8"}
                  </div>
                  
                  <div className="text-4xl filter drop-shadow-xs">📚</div>
                  <h4 className="text-xs font-bold text-stone-800 mt-4 px-2 line-clamp-2">{resource.title}</h4>
                  <div className="w-20 h-0.5 bg-[#D98A72] my-3.5 rounded-full" />
                  
                  {/* Miniature abstract lines simulating stencils */}
                  <div className="space-y-1.5 w-full px-4 mt-2">
                    <div className="h-1.5 bg-stone-150 rounded w-full border border-stone-200" />
                    <div className="h-1.5 bg-stone-150 rounded w-3/4 mx-auto border border-stone-200" />
                    <div className="h-4 border border-dashed border-[#D98A72]/50 rounded w-5/6 mx-auto mt-2 bg-[#FBF2EE]/30" />
                  </div>
                </div>
                
                <p className="text-[10px] text-stone-500 font-mono mt-3.5 leading-normal">
                  {isRtl 
                    ? "החוברות הפיזיות שלנו מתאפיינות בגרפיקה נקייה, מרווחים מותאמים, וצבעי שוליים להפחתת הסחות קשב." 
                    : "Our worksheets boast clear typography, spacing templates, and calming blue and off-white negative borders."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
