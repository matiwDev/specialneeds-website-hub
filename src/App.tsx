import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import SandboxControls from "./components/SandboxControls";
import Hero from "./components/Hero";
import ResourceShop from "./components/ResourceShop";
import LearningBoard from "./components/LearningBoard";
import About from "./components/About";
import Contact from "./components/Contact";
import { translations, mockResources, PATH_POINTS, SHAPES_LIST, WORD_ASSOCIATION_LIST, initialProgressState } from "./data";

export default function App() {
  const [lang, setLang] = useState<"en" | "he">("he"); // default to Hebrew
  const [currentTab, setCurrentTab] = useState("home");
  const [unlockedResources, setUnlockedResources] = useState<string[]>([]);
  const [activePersona, setActivePersona] = useState("subscriber"); // Default to subscriber for easy testing
  const [score, setScore] = useState(150);
  const [pulsingId, setPulsingId] = useState<string | null>(null);

  // Core lesson progress
  const [progress, setProgress] = useState<Record<string, number>>(initialProgressState);

  // Derived progress statistics
  const totalCompletedModules = Object.entries(progress).filter(
    ([id, pct]) => unlockedResources.includes(id) && pct === 100
  ).length;

  const totalXP = Object.entries(progress)
    .filter(([id]) => unlockedResources.includes(id))
    .reduce((acc, [id, pct]) => {
      const isCompleted = pct === 100;
      return acc + (isCompleted ? 100 : 0) + (pct as number) * 10;
    }, 0);

  // Active Interactive Lesson ID inside My Learning view
  const [activeInteractiveId, setActiveInteractiveId] = useState<string | null>(null);
  const [downloadModalFile, setDownloadModalFile] = useState<string | null>(null);

  // Sub-tabs configurations
  const [shopTab, setShopTab] = useState<"pdf" | "interactive">("pdf");
  const [learningTab, setLearningTab] = useState<"pdf" | "interactive">("pdf");

  // Game 1 state: Breathing balloon & Sandy Sandbox Orbs
  const [balloonScale, setBalloonScale] = useState(1);
  const [isBreathedIn, setIsBreathedIn] = useState(false);
  interface Orb {
    id: number;
    x: number;
    y: number;
    color: string;
    scale: number;
    opacity: number;
  }
  const [orbs, setOrbs] = useState<Orb[]>([]);

  // Game 2 state: Emotion Matcher
  const EMOTIONS_LIST = [
    { key: "feelHappy", icon: "😊", feel: "happy" },
    { key: "feelCalm", icon: "😌", feel: "calm" },
    { key: "feelProud", icon: "😎", feel: "proud" },
    { key: "feelExcited", icon: "🤩", feel: "excited" }
  ];
  const [activeEmotionIndex, setActiveEmotionIndex] = useState(0);
  const [emotionFeedback, setEmotionFeedback] = useState<string | null>(null);

  // Game 3 state: Gentle SVG Line Path Tracing
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [isDraggingPathPoint, setIsDraggingPathPoint] = useState(false);
  const [hasCompletedTracing, setHasCompletedTracing] = useState(false);
  const [driftMessageActive, setDriftMessageActive] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Game 4 state: Daily milestone checklist planner
  const [plannerChecked, setPlannerChecked] = useState({
    wash: false,
    teeth: false,
    water: false,
    shoes: false,
    jacket: false
  });
  const [plannerFeedback, setPlannerFeedback] = useState("");

  // Game 5 state: Pattern & Shape sorting
  const [activeShapeIndex, setActiveShapeIndex] = useState(0);
  const [shapeFeedback, setShapeFeedback] = useState<string | null>(null);

  // Game 6 state: Word association match
  const [activeAssocIndex, setActiveAssocIndex] = useState(0);
  const [assocFeedback, setAssocFeedback] = useState<string | null>(null);

  // Form submission feedback simulation state
  const [formSubmitted, setFormSubmitted] = useState(false);

  const t = translations[lang];

  // Cozy acoustic synthetic notes generator
  const playTone = (frequency: number, waveType: "sine" | "triangle" = "sine", duration: number = 0.8) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = waveType;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration + 0.1);
    } catch (_) {
      // Audio sandbox restricted or not supported in preview browser frame environment
    }
  };

  const CHIME_PENTATONIC = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];

  // Coordinate Sandbox customer personas to unlock maps
  useEffect(() => {
    if (activePersona === "guest") {
      setUnlockedResources([]);
      setActiveInteractiveId(null);
    } else if (activePersona === "buyer") {
      // Sensory Regulation & Fine Motor
      setUnlockedResources(["res-1", "res-2", "res-5", "res-6"]);
      setActiveInteractiveId(null);
    } else if (activePersona === "subscriber") {
      // Entire 12 items
      setUnlockedResources([
        "res-1", "res-2", "res-3", "res-4", "res-5", "res-6",
        "res-7", "res-8", "res-9", "res-10", "res-11", "res-12"
      ]);
    }
  }, [activePersona]);

  // Handle watercolor particle orbs fade logic
  useEffect(() => {
    if (orbs.length === 0) return;
    const interval = setInterval(() => {
      setOrbs((prev) =>
        prev
          .map((orb) => ({
            ...orb,
            scale: orb.scale + 2.4,
            opacity: orb.opacity - 0.03
          }))
          .filter((orb) => orb.opacity > 0)
      );
    }, 30);
    return () => clearInterval(interval);
  }, [orbs]);

  // Handle HTML document direction on language switch
  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t]);

  // Handle direct custom mock purchase
  const handlePurchaseMock = (id: string) => {
    if (!unlockedResources.includes(id)) {
      setUnlockedResources((prev) => [...prev, id]);
      setScore((s) => s + 20);
      playTone(523.25, "sine"); // Sweet high C
    }
  };

  // Cross links guide controller
  const handleCrossGuide = (partnerId: string, currentContext: "shop" | "learning") => {
    const partnerResource = mockResources.find((r) => r.id === partnerId);
    if (!partnerResource) return;

    if (currentContext === "shop") {
      setShopTab(partnerResource.type as "pdf" | "interactive");
    } else {
      setLearningTab(partnerResource.type as "pdf" | "interactive");
    }

    setPulsingId(partnerId);
    setTimeout(() => {
      setPulsingId(null);
    }, 2800);

    // Scroll slightly to the cards
    const element = document.getElementById(`resource-card-${partnerId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handlePdfDownload = (id: string) => {
    setProgress((p) => {
      const next = { ...p, [id]: 100 };
      return next;
    });
    playTone(523.25, "sine", 0.6);
  };

  // Playable interactive mechanics
  const handleBreatheToggle = () => {
    if (!isBreathedIn) {
      setBalloonScale(1.48);
      setIsBreathedIn(true);
      playTone(293.66, "sine", 1.2); // Calm Re tone
      setProgress((p) => ({ ...p, "res-2": Math.min(100, (p["res-2"] || 0) + 10) }));
    } else {
      setBalloonScale(1.0);
      setIsBreathedIn(false);
      playTone(392.00, "sine", 1.2); // Calm Sol tone
      setScore((s) => s + 5);
      setProgress((p) => ({ ...p, "res-2": Math.min(100, (p["res-2"] || 0) + 10) }));
    }
  };

  const spawnOrb = (clientX: number, clientY: number, container: HTMLDivElement) => {
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const ratio = Math.max(0, Math.min(1, x / rect.width));
    const pitchIndex = Math.min(Math.floor(ratio * CHIME_PENTATONIC.length), CHIME_PENTATONIC.length - 1);
    const triggerTone = CHIME_PENTATONIC[pitchIndex];

    playTone(triggerTone, "sine", 0.9);

    const softPastelColors = [
      "rgba(147, 197, 253, 0.5)", // soft blue
      "rgba(167, 243, 208, 0.5)", // soft green
      "rgba(253, 186, 116, 0.5)", // soft orange
      "rgba(244, 180, 26, 0.5)",  // soft yellow
      "rgba(216, 180, 254, 0.5)", // soft purple
      "rgba(251, 182, 206, 0.5)"  // soft pink
    ];

    const newOrb: Orb = {
      id: Date.now() + Math.random(),
      x,
      y,
      color: softPastelColors[Math.floor(Math.random() * softPastelColors.length)],
      scale: 10,
      opacity: 0.9
    };

    setOrbs((prev) => [...prev, newOrb]);
    setScore((s) => s + 2);
    setProgress((p) => ({ ...p, "res-2": Math.min(100, (p["res-2"] || 0) + 2) }));
  };

  // Emotion matcher game
  const handleEmotionGuess = (selectedFeel: string) => {
    const target = EMOTIONS_LIST[activeEmotionIndex];
    if (selectedFeel === target.feel) {
      setEmotionFeedback("correct");
      playTone(523.25, "sine", 0.5); // high positive chime
      setScore((s) => s + 15);
      setProgress((p) => ({ ...p, "res-4": Math.min(100, (p["res-4"] || 0) + 25) }));
    } else {
      setEmotionFeedback("wrong");
      playTone(261.63, "triangle", 0.6); // quiet focus tone
    }
  };

  const handleNextEmotion = () => {
    setEmotionFeedback(null);
    setActiveEmotionIndex((prev) => (prev + 1) % EMOTIONS_LIST.length);
  };

  // Daily milestones game
  const handlePlannerToggle = (key: "wash" | "teeth" | "water" | "shoes" | "jacket") => {
    const nextChecked = { ...plannerChecked, [key]: !plannerChecked[key] };
    setPlannerChecked(nextChecked);
    playTone(329.63, "sine", 0.45); // cheerful Mi chime

    const numChecked = Object.values(nextChecked).filter(Boolean).length;
    setProgress((p) => ({ ...p, "res-8": numChecked * 20 }));

    const allDone = numChecked === 5;
    if (allDone) {
      setPlannerFeedback("finished");
      playTone(523.25, "sine", 0.8);
      setScore((s) => s + 40);
    } else {
      setScore((s) => s + 5);
    }
  };

  const handleResetPlanner = () => {
    setPlannerChecked({ wash: false, teeth: false, water: false, shoes: false, jacket: false });
    setPlannerFeedback("");
    playTone(392.00, "sine", 0.6);
  };

  // Shape sorter match game
  const handleShapeSort = (selectedColorKey: string) => {
    const target = SHAPES_LIST[activeShapeIndex];
    if (selectedColorKey === target.color) {
      setShapeFeedback("correct");
      playTone(440.00, "sine", 0.45);
      setScore((s) => s + 15);
      setProgress((p) => ({ ...p, "res-10": Math.min(100, (p["res-10"] || 0) + 34) }));
    } else {
      setShapeFeedback("wrong");
      playTone(293.66, "triangle", 0.6);
    }
  };

  const handleNextShape = () => {
    setShapeFeedback(null);
    setActiveShapeIndex((prev) => (prev + 1) % SHAPES_LIST.length);
  };

  // Object sound word association helper
  const handleAssocGuess = (selectedKey: string) => {
    const target = WORD_ASSOCIATION_LIST[activeAssocIndex];
    if (selectedKey === target.key) {
      setAssocFeedback("correct");
      playTone(587.33, "sine", 0.5);
      setScore((s) => s + 15);
      setProgress((p) => ({ ...p, "res-12": Math.min(100, (p["res-12"] || 0) + 20) }));
    } else {
      setAssocFeedback("wrong");
      playTone(261.63, "triangle", 0.65);
    }
  };

  const handleNextAssoc = () => {
    setAssocFeedback(null);
    setActiveAssocIndex((prev) => (prev + 1) % WORD_ASSOCIATION_LIST.length);
  };

  // Smooth SVG stellar path tracing drag controls
  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDraggingPathPoint || hasCompletedTracing || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();

    // Convert client touch context to SVG 1000 width, 300 height mapping
    const mouseX = ((clientX - rect.left) / rect.width) * 1000;
    const mouseY = ((clientY - rect.top) / rect.height) * 300;

    let closestDistance = Infinity;
    let closestIndex = 0;

    for (let i = 0; i < PATH_POINTS.length; i++) {
      const pt = PATH_POINTS[i];
      const dist = Math.sqrt((pt.x - mouseX) ** 2 + (pt.y - mouseY) ** 2);
      if (dist < closestDistance) {
        closestDistance = dist;
        closestIndex = i;
      }
    }

    const targetPos = PATH_POINTS[closestIndex];
    const dragDeviation = Math.sqrt((targetPos.x - mouseX) ** 2 + (targetPos.y - mouseY) ** 2);

    // Lock dragging to slow, controlled motor trace width logic
    if (dragDeviation > 65) {
      setDriftMessageActive(true);
      setIsDraggingPathPoint(false);
      playTone(196.0, "triangle", 0.7); // Low quiet G
      return;
    }

    if (closestIndex === currentPathIndex + 1) {
      setCurrentPathIndex(closestIndex);
      setDriftMessageActive(false);

      const sequentialPitch = 261.63 + closestIndex * 26.16;
      playTone(sequentialPitch, "sine", 0.4);

      const pct = Math.round((closestIndex / (PATH_POINTS.length - 1)) * 100);
      setProgress((p) => ({ ...p, "res-6": Math.max(p["res-6"] || 0, pct) }));

      if (closestIndex === PATH_POINTS.length - 1) {
        setHasCompletedTracing(true);
        setIsDraggingPathPoint(false);
        setScore((s) => s + 50);

        // Success chords chimes
        playTone(329.63, "sine", 0.3);
        setTimeout(() => playTone(392.0, "sine", 0.3), 110);
        setTimeout(() => playTone(523.25, "sine", 0.6), 220);
      }
    } else if (closestIndex === currentPathIndex - 1) {
      setCurrentPathIndex(closestIndex);
    } else if (closestIndex === currentPathIndex) {
      setDriftMessageActive(false);
    }
  };

  const handleRestartTracing = () => {
    setCurrentPathIndex(0);
    setHasCompletedTracing(false);
    setDriftMessageActive(false);
    setIsDraggingPathPoint(false);
    playTone(329.63, "sine", 0.8);
  };

  // Return to classroom dashboard safely & reset game states
  const exitActiveInteractiveSession = () => {
    setActiveInteractiveId(null);
    setBalloonScale(1.0);
    setIsBreathedIn(false);
    setEmotionFeedback(null);
    setPlannerChecked({ wash: false, teeth: false, water: false, shoes: false, jacket: false });
    setPlannerFeedback("");
    setShapeFeedback(null);
    setAssocFeedback(null);
    handleRestartTracing();
  };

  const handleResetSandbox = () => {
    let defaultUnlocked: string[] = [];
    if (activePersona === "guest") {
      defaultUnlocked = [];
    } else if (activePersona === "buyer") {
      defaultUnlocked = ["res-1", "res-2", "res-5", "res-6"];
    } else if (activePersona === "subscriber") {
      defaultUnlocked = [
        "res-1", "res-2", "res-3", "res-4", "res-5", "res-6",
        "res-7", "res-8", "res-9", "res-10", "res-11", "res-12"
      ];
    }
    setUnlockedResources(defaultUnlocked);

    const defaultProgress = {
      "res-1": 40,
      "res-2": 100,
      "res-3": 0,
      "res-4": 40,
      "res-5": 100,
      "res-6": 0,
      "res-7": 0,
      "res-8": 40,
      "res-9": 100,
      "res-10": 0,
      "res-11": 40,
      "res-12": 0
    };
    setProgress(defaultProgress);

    setScore(150);
    setBalloonScale(1.0);
    setIsBreathedIn(false);
    setOrbs([]);
    setActiveEmotionIndex(0);
    setEmotionFeedback(null);
    setCurrentPathIndex(0);
    setIsDraggingPathPoint(false);
    setHasCompletedTracing(false);
    setDriftMessageActive(false);
    setPlannerChecked({ wash: false, teeth: false, water: false, shoes: false, jacket: false });
    setPlannerFeedback("");
    setActiveShapeIndex(0);
    setShapeFeedback(null);
    setActiveAssocIndex(0);
    setAssocFeedback(null);

    setActiveInteractiveId(null);
    setDownloadModalFile(null);

    playTone(329.63, "triangle", 0.8);
  };

  const currentWindingPathStr = PATH_POINTS.map((pt, i) =>
    i === 0 ? `M ${pt.x} ${pt.y}` : `L ${pt.x} ${pt.y}`
  ).join(" ");

  // Handle mock message submit
  const handleSimulateMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    playTone(523.25, "sine", 0.6);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const handleNavigate = (tab: string, subTab?: "pdf" | "interactive") => {
    setCurrentTab(tab);
    if (subTab) {
      if (tab === "shop") {
        setShopTab(subTab);
      } else if (tab === "myLearning") {
        setLearningTab(subTab);
      }
    }
  };

  return (
    <div dir={t.dir} className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-705 transition-all duration-300">
      {/* Dynamic Bilingual Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        isLessonActive={activeInteractiveId !== null}
        setIsLessonActive={(active) => {
          if (!active) {
            exitActiveInteractiveSession();
          } else {
            setActiveInteractiveId("res-2");
          }
        }}
        t={t}
      />

      {/* Developer Sandbox Controls */}
      <SandboxControls
        activePersona={activePersona}
        setActivePersona={setActivePersona}
        lang={lang}
        t={t}
        onResetSandbox={handleResetSandbox}
      />

      {/* Main Classroom Portal Body */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-6 py-8">
        {/* =============== TAB: HOME VIEW =============== */}
        {currentTab === "home" && activeInteractiveId === null && (
          <Hero lang={lang} t={t} onNavigate={handleNavigate} />
        )}

        {/* =============== TAB: RESOURCE SHOP VIEW =============== */}
        {currentTab === "shop" && activeInteractiveId === null && (
          <ResourceShop
            lang={lang}
            t={t}
            shopTab={shopTab}
            setShopTab={setShopTab}
            mockResources={mockResources}
            unlockedResources={unlockedResources}
            pulsingId={pulsingId}
            handleCrossGuide={handleCrossGuide}
            handlePurchaseMock={handlePurchaseMock}
            handlePdfDownload={handlePdfDownload}
            setDownloadModalFile={setDownloadModalFile}
            setCurrentTab={setCurrentTab}
            setLearningTab={setLearningTab}
            setActiveInteractiveId={setActiveInteractiveId}
            playTone={playTone}
          />
        )}

        {/* =============== TAB: LEARNING BOARD WORKSPACE =============== */}
        {currentTab === "myLearning" && (
          <LearningBoard
            lang={lang}
            t={t}
            mockResources={mockResources}
            unlockedResources={unlockedResources}
            progress={progress}
            totalXP={totalXP}
            totalCompletedModules={totalCompletedModules}
            learningTab={learningTab}
            setLearningTab={setLearningTab}
            pulsingId={pulsingId}
            handlePdfDownload={handlePdfDownload}
            setDownloadModalFile={setDownloadModalFile}
            setCurrentTab={setCurrentTab}
            setShopTab={setShopTab}
            activeInteractiveId={activeInteractiveId}
            setActiveInteractiveId={setActiveInteractiveId}
            playTone={playTone}
            exitActiveInteractiveSession={exitActiveInteractiveSession}
            balloonScale={balloonScale}
            isBreathedIn={isBreathedIn}
            handleBreatheToggle={handleBreatheToggle}
            orbs={orbs}
            spawnOrb={spawnOrb}
            clearOrbs={() => {
              setOrbs([]);
              playTone(196.0, "sine", 0.5);
            }}
            activeEmotionIndex={activeEmotionIndex}
            emotionFeedback={emotionFeedback}
            handleEmotionGuess={handleEmotionGuess}
            handleNextEmotion={handleNextEmotion}
            currentPathIndex={currentPathIndex}
            isDraggingPathPoint={isDraggingPathPoint}
            setIsDraggingPathPoint={setIsDraggingPathPoint}
            hasCompletedTracing={hasCompletedTracing}
            driftMessageActive={driftMessageActive}
            setDriftMessageActive={setDriftMessageActive}
            handleRestartTracing={handleRestartTracing}
            handleDragMove={handleDragMove}
            svgRef={svgRef}
            currentWindingPathStr={currentWindingPathStr}
            PATH_POINTS={PATH_POINTS}
            plannerChecked={plannerChecked}
            plannerFeedback={plannerFeedback}
            handlePlannerToggle={handlePlannerToggle}
            handleResetPlanner={handleResetPlanner}
            activeShapeIndex={activeShapeIndex}
            shapeFeedback={shapeFeedback}
            handleShapeSort={handleShapeSort}
            handleNextShape={handleNextShape}
            activeAssocIndex={activeAssocIndex}
            assocFeedback={assocFeedback}
            handleAssocGuess={handleAssocGuess}
            handleNextAssoc={handleNextAssoc}
          />
        )}

        {/* =============== TAB: ABOUT ME =============== */}
        {currentTab === "about" && activeInteractiveId === null && (
          <About lang={lang} t={t} />
        )}

        {/* =============== TAB: CONTACT ME =============== */}
        {currentTab === "contact" && activeInteractiveId === null && (
          <Contact
            lang={lang}
            t={t}
            onSubmitMock={handleSimulateMessage}
            formSubmitted={formSubmitted}
          />
        )}

        {/* Elegant Simulated Download Modal Pop-up */}
        {downloadModalFile && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn select-none">
            <div className="bg-white border-2 border-[#DACCE5]/40 rounded-3xl p-8 max-w-md w-full shadow-2xl relative text-center space-y-6 transform scale-100 transition-all duration-300">
              {/* Absolute Close Option */}
              <button
                onClick={() => setDownloadModalFile(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 text-lg cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>

              {/* Soothing pastel mint circular backdrop icon */}
              <div className="w-16 h-16 bg-[#E2F5EE] border border-[#B7EBD0] rounded-full flex items-center justify-center text-3xl mx-auto text-[#23704C] animate-bounce">
                📄
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-800">
                  {lang === "en" ? "Simulating Secure Download" : "הורדת קובץ עבודה וקטורי"}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {lang === "en"
                    ? "Creating child-safe printable vectors tailored for sensitive sensory eyes."
                    : "מייצר קובץ PDF מותאם אישית ברזולוציה גבוהה, ללא הסחות דעת וגירויים מיותרים."}
                </p>
              </div>

              {/* Decorative Progress indicator stream simulating active request */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5 text-slate-800 text-xs font-mono font-bold leading-relaxed text-center break-words select-all">
                <span className="text-sky-500 font-sans block text-xxs font-black uppercase tracking-widest mb-1.5">
                  {lang === "en" ? "Target File Saved" : "שם הקובץ שהורד"}
                </span>
                🔑 {downloadModalFile}.pdf
              </div>

              <div className="bg-[#E7E2FA] border border-[#D5CBEF] rounded-2xl p-4 text-[#55409E] text-xs font-bold leading-relaxed">
                🎉 {lang === "en" ? "Simulating secure PDF download... File successfully saved!" : "הורדת הסימולציה הושלמה! הקובץ נשמר בהצלחה בתיקיית ההורדות."}
              </div>

              <button
                onClick={() => setDownloadModalFile(null)}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-xs py-3.5 rounded-xl transition shadow-xs cursor-pointer"
              >
                {lang === "en" ? "Return to Sanctuary" : "חזרה למרחב הלמידה"}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Accessible Footer block */}
      <footer className="bg-slate-800 text-slate-400 py-6 border-t border-slate-700/60 text-center text-xs space-y-2 mt-auto">
        <p className="font-semibold text-slate-350">
          🕊️ {t.brand} — {lang === "en" ? "Calm Classroom and Developmental Sensory Workspace" : 'רשת "צעדים עדינים" — וויסות, פיתוח ומוטוריקה עדינה לחינוך מיוחד'}
        </p>
        <p className="font-mono text-[10px] text-slate-500">
          WCAG 2.1 AA Compliant • Safe Tone Synthesis Engine • Bilingual Hebrew / English
        </p>
      </footer>
    </div>
  );
}
