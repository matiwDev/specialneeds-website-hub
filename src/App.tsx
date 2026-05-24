import React, { useState, useEffect } from 'react';

// Highly legible, bilingual localization dictionary supporting LTR English and RTL Hebrew
const translations = {
  en: {
    dir: 'ltr',
    brand: 'GentleSteps',
    home: 'Home',
    shop: 'Resource Shop',
    myLearning: 'My Learning',
    about: 'About Me',
    contact: 'Contact Me',
    heroTitle: 'Calm, Structured & Tailored Learning',
    heroSub: 'Empowering children with special needs through structured visual aids, downloadable PDF checklists, and interactive developmental sensory tools.',
    heroBtn: 'Explore Resources',
    featuredHeading: 'Targeted Growth Areas',
    featuredSub: 'Designed to target physical and cognitive milestones while keeping sensory distractions to an absolute minimum.',
    cognitive: 'Cognitive Development',
    cognitiveDesc: 'Fosters sorting, pattern tracking, and logical flow with clear step indicators.',
    sensory: 'Sensory Balance',
    sensoryDesc: 'Calms overstimulation through soft color blocking, gentle tasks, and paced breathing guides.',
    motor: 'Fine Motor Control',
    motorDesc: 'Facilitates coordination using clean tracing layouts, bold borders, and simple click-targets.',
    shopTitle: 'Curated Educational Worksheets',
    shopSub: 'Browse digital PDF downloads and interactive learning modules. Test access instant triggers via the simulation control panel.',
    all: 'All Materials',
    pdf: 'PDF Worksheet',
    interactive: 'Interactive Lesson',
    bundle: 'Resource Bundle',
    unlockBtn: 'Add to My Learning',
    unlockedLabel: 'Owned & Ready',
    dashboardTitle: 'My Learning Sanctuary',
    dashboardSub: 'Access your purchased materials, download visual routines, or start playable educational activities.',
    noResources: 'No resources unlocked yet. Select a tester persona in the simulation header above or visit our shop to unlock packages instantly!',
    launchBtn: 'Launch Interactive Module',
    downloadBtn: 'Download PDF Worksheets',
    contactTitle: 'Reach Out Warmly',
    contactSub: 'Have questions about bespoke resources, special educational packages, or custom adjustments? Drop me a direct message.',
    nameLabel: 'Your Name (Parent or Educator)',
    emailLabel: 'Email Address',
    msgLabel: 'How can I support your child?',
    sendBtn: 'Send Message via Formspree',
    aboutTitle: 'About Me & My Mission',
    aboutSubtitle: 'Specialist Educator for Neurodivergent Learners',
    aboutP1: 'Hello! I am a certified Special Education Specialist dedicated to guiding children with sensory, motor, and cognitive learning unique needs. Over my years of classroom teaching, I discovered that traditional learning packets are often too cluttered and overwhelming.',
    aboutP2: 'I create resources with intent: visual layouts that are quiet, step-by-step instructions that prevent overwhelm, and soft tactile colors that let children relax and focus. My goal is to empower parents and educators with structured materials that build independent learning habits.',
    score: 'Progress Points:',
    personaTitle: 'Sandbox Mode Simulator Controls',
    personaLabel: 'Choose Active Customer Tier:',
    lessonTitle: 'Morning Focus Warm-Up',
    lessonSubtitle: 'Interactive Session',
    lessonBack: 'Return to Dashboard',
    lessonStep: 'Step',
    lessonOf: 'of',
    lessonNext: 'Next Step',
    lessonPrev: 'Previous Step',
    lessonFinish: 'Finish & Exit',
    lessonBreatheTitle: '1. Calm Breathing Exercise',
    lessonBreatheDesc: 'Click the balloon to watch it slowly grow as you inhale, then release it to watch it shrink as you exhale. Let\'s breathe together.',
    lessonBreatheIn: 'Inhale...',
    lessonBreatheOut: 'Exhale...',
    lessonCheckTitle: '2. Visually Structured Success Board',
    lessonCheckDesc: 'Review and click your tasks as you complete them. Clear daily targets help ease anxiety and daily transitions.',
    taskWash: 'Wash Face & Hands',
    taskTeeth: 'Brush Teeth',
    taskWater: 'Drink water',
    taskPajamas: 'Change clothes',
    lessonMatchTitle: '3. Calm Color-Shape Matcher',
    lessonMatchDesc: 'Help the child identify the shape silhouette in the active frame by selecting the correct shape below.',
    targetLabel: 'Target Silhouette:',
    matchSuccess: 'Wonderful matching! You are doing great! 🎉',
    matchTryAgain: 'That shape is slightly different, let\'s try again!',
    lessonCompleteTitle: 'Great Job, You Completed the Lesson!',
    lessonCompleteDesc: 'You completed your morning warm-up routine. You are focused, relaxed, and fully prepared to start your day!'
  },
  he: {
    dir: 'rtl',
    brand: 'צעדים עדינים',
    home: 'דף הבית',
    shop: 'חנות המשאבים',
    myLearning: 'הלמידה שלי',
    about: 'קצת עליי',
    contact: 'צור קשר',
    heroTitle: 'למידה רגועה, מובנית ומותאמת אישית',
    heroSub: 'העצמת ילדים עם צרכים מיוחדים באמצעות עזרי למידה ויזואליים, דפי עבודה להורדה ב-PDF, ופעילויות אינטראקטיביות חושיות.',
    heroBtn: 'גלה משאבים',
    featuredHeading: 'תחומי התפתחות ממוקדים',
    featuredSub: 'עוצב בקפידה במיוחד כדי לתמוך במטרות התפתחותיות תוך הפחתת עומס גירויים חושי.',
    cognitive: 'פיתוח קוגניטיבי',
    cognitiveDesc: 'מעודד מיון, מעקב אחר דפוסים ותפיסה מרחבית באמצעות שלבים פשוטים וברורים.',
    sensory: 'וויסות חושי',
    sensoryDesc: 'מרגיע עומס רגשי וחושי באמצעות צבעים רכים, פעילויות בקצב אישי, ונשימה מודרכת.',
    motor: 'מוטוריקה עדינה',
    motorDesc: 'מחזק קואורדינציה באמצעות גבולות עבים, דפי מעקב נקיים, וכפתורי לחיצה מוגדלים.',
    shopTitle: 'חנות חומרי למידה ודפי עבודה',
    shopSub: 'עיינו במגוון דפי העבודה ב-PDF ובפעילויות האינטראקטיביות שלנו. בדקו את המערכת באמצעות סרגל הסימולטור.',
    all: 'כל המשאבים',
    pdf: 'דף עבודה ב-PDF',
    interactive: 'שיעור אינטראקטיבי',
    bundle: 'חבילת משאבים',
    unlockBtn: 'הוסף ללמידה שלי',
    unlockedLabel: 'זמין באזור האישי שלי',
    dashboardTitle: 'מרחב הלמידה הרגוע שלי',
    dashboardSub: 'גש לחומרי הלמידה שלך, הורד קבצי PDF שימושיים או הפעל מודולים אינטראקטיביים.',
    noResources: 'עדיין לא פתחת חומרי למידה. השתמש בסימולטור למעלה או בקר בחנות כדי לפתוח חבילות למידה באופן מיידי!',
    launchBtn: 'הפעל מודול אינטראקטיבי',
    downloadBtn: 'הורד קובץ PDF',
    contactTitle: 'צרו קשר חם',
    contactSub: 'רוצים להתייעץ איתי על משאב מיוחד, חומרי למידה מותאמים אישית או הדרכות? שלחו לי הודעה ישירה.',
    nameLabel: 'שם מלא (הורה או איש חינוך)',
    emailLabel: 'כתובת אימייל',
    msgLabel: 'כיצד אוכל לסייע לילדכם?',
    sendBtn: 'שלח הודעה',
    aboutTitle: 'עליי ועל החזון שלי',
    aboutSubtitle: 'מורה מומחית לחינוך מיוחד עבור ילדים עם רגישויות חושיות וקוגניטיביות',
    aboutP1: 'שלום! אני מורה מוסמכת לחינוך מיוחד עם ניסיון רב בליווי ותמיכה בילדים נוירו-דייברגנטיים. במהלך עבודתי בכיתה גיליתי שדפי עבודה ומשחקים מסורתיים עמוסים ומסיחי דעת מדי.',
    aboutP2: 'אני יוצרת משאבים מתוך כוונה מלאה: מבנים חזותיים רגועים, משימות ממוקדות המונעות תסכול, וצבעים עדינים המאפשרים לילדים להירגע ולהתרכז. השאיפה שלי היא לתת להורים ולמורים כלים שמפתחים למידה עצמאית ומהנה.',
    score: 'נקודות הצלחה:',
    personaTitle: 'בקרת בדיקת סימולציה',
    personaLabel: 'בחר סוג מנוי לבדיקה:',
    lessonTitle: 'חימום ומיקוד בוקר',
    lessonSubtitle: 'מודול שיעור אינטראקטיבי',
    lessonBack: 'חזרה לאזור הלמידה',
    lessonStep: 'שלב',
    lessonOf: 'מתוך',
    lessonNext: 'השלב הבא',
    lessonPrev: 'השלב הקודם',
    lessonFinish: 'סיום ויציאה',
    lessonBreatheTitle: '1. תרגיל נשימה מרגיע',
    lessonBreatheDesc: 'לחץ על הבלון כדי להגדיל אותו בזמן שאתה שואף אוויר, ושחרר כדי לנשוף. בוא ננשום יחד ברגיעה.',
    lessonBreatheIn: 'שאיפה...',
    lessonBreatheOut: 'נשיפה...',
    lessonCheckTitle: '2. לוח הצלחות ויזואלי יומי',
    lessonCheckDesc: 'סמן משימות פשוטות שסיימת בבוקר. סדר יום ברור מסייע בהפחתת חששות ומתחים.',
    taskWash: 'שטיפת פנים וידיים',
    taskTeeth: 'צחצוח שיניים',
    taskWater: 'שתיית כוס מים',
    taskPajamas: 'להחליף פיג׳מה',
    lessonMatchTitle: '3. התאמת צורות שקטה',
    lessonMatchDesc: 'עזור לילד לזהות את הצללית המוצגת על ידי לחיצה על הצורה התואמת למטה.',
    targetLabel: 'צללית היעד:',
    matchSuccess: 'התאמה נפלאה! כל הכבוד! 🎉',
    matchTryAgain: 'הצורה הזו קצת שונה, בוא ננסה שוב!',
    lessonCompleteTitle: 'עבודה מדהימה, סיימת את השיעור!',
    lessonCompleteDesc: 'סיימת את שגרת החימום לבוקר זה. אתה ממוקד, רגוע ומוכן להתחיל יום נפלא!'
  }
};

const mockResources = [
  {
    id: 'res-1',
    category: 'sensory',
    type: 'pdf',
    price: '$12.00',
    en: {
      title: 'Sensory Routine Tracker',
      desc: 'A calming morning visual tracking board designed to lower transition state anxiety.'
    },
    he: {
      title: 'לוח מעקב שגרה חושית',
      desc: 'לוח ויזואלי מרגיע לשגרת הבוקר, המיועד להפחתת חרדה במצבי מעבר.'
    }
  },
  {
    id: 'res-2',
    category: 'cognitive',
    type: 'interactive',
    price: '$15.00',
    en: {
      title: 'Morning Focus Warm-Up',
      desc: 'An interactive, sensory-friendly daily sequence containing visual checklist markers and focus exercises.'
    },
    he: {
      title: 'חימום ומיקוד בוקר',
      desc: 'שיעור אינטראקטיבי המשלב בלון נשימה מודרך, לוח משימות יומי ומשחק התאמת צורות שקט.'
    }
  },
  {
    id: 'res-3',
    category: 'motor',
    type: 'pdf',
    price: '$18.00',
    en: {
      title: 'Fine Motor Tracing Pack',
      desc: 'High-contrast, bold-bordered tracing lines to support motor planning and hand stability.'
    },
    he: {
      title: 'חבילת מוטוריקה עדינה',
      desc: 'דפי עבודה עם קווים עבים ובניגודיות גבוהה, המעודדים תכנון מוטורי וייצוב אחיזה.'
    }
  }
];

export default function App() {
  const [lang, setLang] = useState('he'); // Target Hebrew as default
  const [currentTab, setCurrentTab] = useState('home');
  const [unlockedResources, setUnlockedResources] = useState([]);
  const [activePersona, setActivePersona] = useState('guest');
  
  // Interactive Session states
  const [isLessonActive, setIsLessonActive] = useState(false);
  const [lessonStep, setLessonStep] = useState(1);
  const [balloonScale, setBalloonScale] = useState(1);
  const [isBreathedIn, setIsBreathedIn] = useState(false);
  const [checklist, setChecklist] = useState({
    wash: false,
    teeth: false,
    water: false,
    pajamas: false
  });
  const [selectedShape, setSelectedShape] = useState(null);
  const [matchFeedback, setMatchFeedback] = useState('');
  const [targetShape, setTargetShape] = useState('circle');

  const t = translations[lang];

  useEffect(() => {
    if (activePersona === 'guest') {
      setUnlockedResources([]);
      setIsLessonActive(false);
    } else if (activePersona === 'buyer') {
      setUnlockedResources(['res-1']);
      setIsLessonActive(false);
    } else if (activePersona === 'subscriber') {
      setUnlockedResources(['res-1', 'res-2', 'res-3']);
    }
  }, [activePersona]);

  const handlePurchaseMock = (id) => {
    if (!unlockedResources.includes(id)) {
      setUnlockedResources([...unlockedResources, id]);
    }
  };

  const handleBreatheToggle = () => {
    if (!isBreathedIn) {
      setBalloonScale(1.5);
      setIsBreathedIn(true);
    } else {
      setBalloonScale(1.0);
      setIsBreathedIn(false);
    }
  };

  const handleCheckToggle = (key) => {
    setChecklist({ ...checklist, [key]: !checklist[key] });
  };

  const handleShapeMatch = (shape) => {
    setSelectedShape(shape);
    if (shape === targetShape) {
      setMatchFeedback(t.matchSuccess);
    } else {
      setMatchFeedback(t.matchTryAgain);
    }
  };

  const handleNextTargetShape = () => {
    setSelectedShape(null);
    setMatchFeedback('');
    const shapes = ['circle', 'triangle', 'square'];
    const next = shapes.filter(s => s !== targetShape)[Math.floor(Math.random() * 2)];
    setTargetShape(next);
  };

  const handleResetLesson = () => {
    setLessonStep(1);
    setIsLessonActive(false);
    setBalloonScale(1.0);
    setIsBreathedIn(false);
    setChecklist({ wash: false, teeth: false, water: false, pajamas: false });
    setSelectedShape(null);
    setMatchFeedback('');
  };

  return (
    <div dir={t.dir} className="min-h-screen flex flex-col bg-slate-50 text-slate-700 transition-all duration-300">
      
      {/* Primary Workspace Navigation Bar */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200/50 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => { setCurrentTab('home'); setIsLessonActive(false); }}
            className="flex items-center gap-3 hover:opacity-85 transition"
          >
            <span className="bg-sky-500 text-white w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg">🕊️</span>
            <span className="font-semibold text-xl tracking-tight text-slate-800">{t.brand}</span>
          </button>

          {/* Desktop Links Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <button 
              onClick={() => { setCurrentTab('home'); setIsLessonActive(false); }} 
              className={`pb-1 border-b-2 transition ${currentTab === 'home' && !isLessonActive ? 'border-sky-500 text-slate-800' : 'border-transparent text-slate-400 hover:text-slate-800'}`}
            >
              {t.home}
            </button>
            <button 
              onClick={() => { setCurrentTab('shop'); setIsLessonActive(false); }} 
              className={`pb-1 border-b-2 transition ${currentTab === 'shop' ? 'border-sky-500 text-slate-800' : 'border-transparent text-slate-400 hover:text-slate-800'}`}
            >
              {t.shop}
            </button>
            <button 
              onClick={() => setCurrentTab('myLearning')} 
              className={`pb-1 border-b-2 transition ${currentTab === 'myLearning' || isLessonActive ? 'border-sky-500 text-slate-800' : 'border-transparent text-slate-400 hover:text-slate-800'}`}
            >
              {t.myLearning}
            </button>
            <button 
              onClick={() => { setCurrentTab('about'); setIsLessonActive(false); }} 
              className={`pb-1 border-b-2 transition ${currentTab === 'about' ? 'border-sky-500 text-slate-800' : 'border-transparent text-slate-400 hover:text-slate-800'}`}
            >
              {t.about}
            </button>
            <button 
              onClick={() => { setCurrentTab('contact'); setIsLessonActive(false); }} 
              className={`pb-1 border-b-2 transition ${currentTab === 'contact' ? 'border-sky-500 text-slate-800' : 'border-transparent text-slate-400 hover:text-slate-800'}`}
            >
              {t.contact}
            </button>
          </nav>

          {/* Language Switch Panel */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'en' ? 'he' : 'en')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-xl border border-slate-200 transition text-sm flex items-center gap-2"
              aria-label="Toggle Language"
            >
              <span className="text-xs">🌐</span>
              {lang === 'en' ? 'עברית' : 'English'}
            </button>
          </div>
        </div>
      </header>

      {/* Simulator Control Area (Mocking Sandbox Experience) */}
      <div className="bg-sky-50 border-b border-sky-100 py-3 px-6 shadow-inner">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <span className="font-semibold text-slate-600 flex items-center gap-2 uppercase tracking-wider">
            ⚙️ {t.personaTitle}
          </span>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setActivePersona('guest')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${activePersona === 'guest' ? 'bg-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              {lang === 'en' ? 'Guest Access' : 'אורח'}
            </button>
            <button 
              onClick={() => setActivePersona('buyer')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${activePersona === 'buyer' ? 'bg-sky-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              {lang === 'en' ? 'One-Time Buyer (Sensory Tracker)' : 'רוכש חלקי (שגרת יום)'}
            </button>
            <button 
              onClick={() => setActivePersona('subscriber')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${activePersona === 'subscriber' ? 'bg-emerald-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              {lang === 'en' ? 'All-Access Pass Member' : 'מנוי גישה מלאה'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-6 py-12">
        
        {/* HOME SECTION */}
        {currentTab === 'home' && !isLessonActive && (
          <div className="space-y-16 animate-fadeIn">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight">
                  {t.heroTitle}
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
                  {t.heroSub}
                </p>
                <button 
                  onClick={() => setCurrentTab('shop')}
                  className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-sm transition-all duration-300 flex items-center gap-3 w-fit text-lg"
                >
                  {t.heroBtn}
                  <span>{lang === 'en' ? '→' : '←'}</span>
                </button>
              </div>
              <div className="flex justify-center items-center">
                <div className="relative p-2 w-full max-w-md">
                  <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 to-purple-500/15 rounded-full blur-3xl"></div>
                  <img 
                    src="https://lh3.googleusercontent.com/d/1zzBaVgRUzrilZWwKfQfV6UlkGVn9SI-2" 
                    alt="Calm structured visuals" 
                    className="relative z-10 w-full h-auto max-h-[380px] object-contain rounded-3xl"
                  />
                </div>
              </div>
            </div>

            {/* Curated Pedagogical Pillars */}
            <div className="text-center space-y-4 max-w-2xl mx-auto pt-8">
              <h2 className="text-3xl font-bold text-slate-800">{t.featuredHeading}</h2>
              <p className="text-slate-400">{t.featuredSub}</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 mx-auto bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 text-2xl">
                  🧠
                </div>
                <h3 className="text-xl font-bold text-slate-800">{t.cognitive}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{t.cognitiveDesc}</p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-slate-100 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 text-2xl">
                  🌬️
                </div>
                <h3 className="text-xl font-bold text-slate-800">{t.sensory}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{t.sensoryDesc}</p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-slate-100 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 mx-auto bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500 text-2xl">
                  ✍️
                </div>
                <h3 className="text-xl font-bold text-slate-800">{t.motor}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{t.motorDesc}</p>
              </div>
            </div>
          </div>
        )}

        {/* RESOURCE SHOP SECTION */}
        {currentTab === 'shop' && !isLessonActive && (
          <div className="space-y-10 animate-fadeIn">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-3xl font-bold text-slate-800">{t.shopTitle}</h2>
              <p className="text-slate-400">{t.shopSub}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {mockResources.map((res) => {
                const isUnlocked = unlockedResources.includes(res.id);
                const rText = lang === 'en' ? res.en : res.he;
                
                return (
                  <div key={res.id} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-all duration-300">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold tracking-wider uppercase bg-sky-50 text-sky-500 px-3 py-1 rounded-full">
                          {res.type === 'pdf' ? t.pdf : t.interactive}
                        </span>
                        <span className="text-lg font-bold text-slate-800">{res.price}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-800">{rText.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{rText.desc}</p>
                    </div>

                    {isUnlocked ? (
                      <button 
                        onClick={() => setCurrentTab('myLearning')}
                        className="w-full bg-emerald-50 text-emerald-600 font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all"
                      >
                        ✓ {t.unlockedLabel}
                      </button>
                    ) : (
                      <button 
                        onClick={() => handlePurchaseMock(res.id)}
                        className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 px-4 rounded-2xl shadow-sm transition flex items-center justify-center gap-2"
                      >
                        🔓 {t.unlockBtn}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* MY LEARNING / INTERACTIVE LESSON SECTION */}
        {(currentTab === 'myLearning' || isLessonActive) && (
          <div className="space-y-10 animate-fadeIn">
            {!isLessonActive ? (
              <div className="space-y-10">
                <div className="space-y-4 max-w-2xl">
                  <h2 className="text-3xl font-bold text-slate-800">{t.dashboardTitle}</h2>
                  <p className="text-slate-400">{t.dashboardSub}</p>
                </div>

                {unlockedResources.length === 0 ? (
                  <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-6 shadow-sm">
                    <div className="w-16 h-16 mx-auto bg-slate-50 rounded-full flex items-center justify-center text-slate-300 text-2xl">
                      🔒
                    </div>
                    <p className="text-slate-500 text-lg leading-relaxed">{t.noResources}</p>
                    <button 
                      onClick={() => setCurrentTab('shop')}
                      className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-3 rounded-2xl shadow-sm transition"
                    >
                      {t.shop}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-12">
                    
                    {/* Locked/Unlocked Interactive Warmup Launcher */}
                    {unlockedResources.includes('res-2') && (
                      <div className="bg-gradient-to-r from-purple-500/5 via-sky-500/5 to-white border border-slate-100 rounded-3xl p-8 max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                        <div className="space-y-3 text-center md:text-left">
                          <span className="bg-purple-100 text-purple-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            {t.interactive}
                          </span>
                          <h3 className="text-2xl font-bold text-slate-800">
                            {lang === 'en' ? mockResources[1].en.title : mockResources[1].he.title}
                          </h3>
                          <p className="text-slate-500 text-sm max-w-md">
                            {lang === 'en' ? mockResources[1].en.desc : mockResources[1].he.desc}
                          </p>
                        </div>
                        <button 
                          onClick={() => setIsLessonActive(true)}
                          className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-6 py-4 rounded-2xl shadow-md flex items-center gap-2 whitespace-nowrap transition-all duration-300"
                        >
                          ▶ {t.launchBtn}
                        </button>
                      </div>
                    )}

                    {/* PDF Worksheets Panel */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                      {mockResources
                        .filter(r => unlockedResources.includes(r.id) && r.type === 'pdf')
                        .map(res => {
                          const rText = lang === 'en' ? res.en : res.he;
                          return (
                            <div key={res.id} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex items-center gap-6">
                              <div className="w-14 h-14 bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                                📄
                              </div>
                              <div className="space-y-1.5 flex-grow">
                                <h4 className="text-lg font-bold text-slate-800">{rText.title}</h4>
                                <button 
                                  onClick={() => alert('Mocking direct PDF download from cloud secure storage.')}
                                  className="text-sm font-bold text-sky-500 hover:underline flex items-center gap-2"
                                >
                                  📥 {t.downloadBtn}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              
              /* STEP-BY-STEP INTERACTIVE LESSON SESSION CONTAINER */
              <div className="max-w-3xl mx-auto bg-white border border-slate-100 rounded-3xl shadow-md overflow-hidden animate-fadeIn">
                <div className="bg-slate-50 px-8 py-5 flex items-center justify-between border-b border-slate-100">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-800">{t.lessonTitle}</h3>
                    <p className="text-xs text-slate-400">{t.lessonSubtitle}</p>
                  </div>
                  <button 
                    onClick={handleResetLesson}
                    className="text-sm font-semibold text-sky-500 hover:text-sky-600 flex items-center gap-2"
                  >
                    <span>{lang === 'en' ? '←' : '→'}</span>
                    {t.lessonBack}
                  </button>
                </div>

                <div className="bg-slate-100 h-2 w-full flex">
                  <div 
                    className="bg-sky-500 h-full transition-all duration-500" 
                    style={{ width: `${(lessonStep / 4) * 100}%` }}
                  ></div>
                </div>

                <div className="p-8 md:p-12 min-h-[380px] flex flex-col justify-center">
                  
                  {/* STEP 1: Calming Breathing Balloon */}
                  {lessonStep === 1 && (
                    <div className="space-y-8 text-center animate-fadeIn">
                      <div className="space-y-3">
                        <h4 className="text-2xl font-bold text-slate-800">{t.lessonBreatheTitle}</h4>
                        <p className="text-slate-400 text-sm max-w-md mx-auto">{t.lessonBreatheDesc}</p>
                      </div>

                      <div className="flex justify-center items-center h-48">
                        <button 
                          onClick={handleBreatheToggle}
                          style={{ transform: `scale(${balloonScale})` }}
                          className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-400 to-purple-400 flex items-center justify-center text-white font-bold text-xs shadow-md transition-all duration-700 ease-out outline-none focus:ring-4 focus:ring-sky-200"
                        >
                          {isBreathedIn ? t.lessonBreatheOut : t.lessonBreatheIn}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Morning Interactive Goal Checklist */}
                  {lessonStep === 2 && (
                    <div className="space-y-8 animate-fadeIn">
                      <div className="space-y-3 text-center">
                        <h4 className="text-2xl font-bold text-slate-800">{t.lessonCheckTitle}</h4>
                        <p className="text-slate-400 text-sm max-w-md mx-auto">{t.lessonCheckDesc}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                        <button 
                          onClick={() => handleCheckToggle('wash')}
                          className={`p-5 rounded-2xl border text-left flex items-center justify-between transition ${checklist.wash ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-slate-200'}`}
                        >
                          <span className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                            <span className="text-2xl">🧼</span> {t.taskWash}
                          </span>
                          <span className={`text-lg ${checklist.wash ? 'text-emerald-500' : 'text-slate-200'}`}>✓</span>
                        </button>
                        <button 
                          onClick={() => handleCheckToggle('teeth')}
                          className={`p-5 rounded-2xl border text-left flex items-center justify-between transition ${checklist.teeth ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-slate-200'}`}
                        >
                          <span className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                            <span className="text-2xl">🪥</span> {t.taskTeeth}
                          </span>
                          <span className={`text-lg ${checklist.teeth ? 'text-emerald-500' : 'text-slate-200'}`}>✓</span>
                        </button>
                        <button 
                          onClick={() => handleCheckToggle('water')}
                          className={`p-5 rounded-2xl border text-left flex items-center justify-between transition ${checklist.water ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-slate-200'}`}
                        >
                          <span className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                            <span className="text-2xl">💧</span> {t.taskWater}
                          </span>
                          <span className={`text-lg ${checklist.water ? 'text-emerald-500' : 'text-slate-200'}`}>✓</span>
                        </button>
                        <button 
                          onClick={() => handleCheckToggle('pajamas')}
                          className={`p-5 rounded-2xl border text-left flex items-center justify-between transition ${checklist.pajamas ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-slate-200'}`}
                        >
                          <span className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                            <span className="text-2xl">👕</span> {t.taskPajamas}
                          </span>
                          <span className={`text-lg ${checklist.pajamas ? 'text-emerald-500' : 'text-slate-200'}`}>✓</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Shape Matcher Activity */}
                  {lessonStep === 3 && (
                    <div className="space-y-8 text-center animate-fadeIn">
                      <div className="space-y-3">
                        <h4 className="text-2xl font-bold text-slate-800">{t.lessonMatchTitle}</h4>
                        <p className="text-slate-400 text-sm max-w-md mx-auto">{t.lessonMatchDesc}</p>
                      </div>

                      <div className="flex justify-center items-center gap-12 bg-slate-50 p-6 rounded-3xl border border-slate-100 max-w-md mx-auto">
                        <div>
                          <span className="text-xs font-semibold text-slate-400 block mb-2">{t.targetLabel}</span>
                          <div className="w-20 h-20 bg-sky-100 rounded-2xl flex items-center justify-center text-3xl font-bold text-sky-800 select-none">
                            {targetShape === 'circle' && '●'}
                            {targetShape === 'triangle' && '▲'}
                            {targetShape === 'square' && '■'}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <button 
                            onClick={() => handleShapeMatch('triangle')}
                            className={`w-14 h-14 bg-white border-2 rounded-xl flex items-center justify-center text-xl hover:bg-slate-50 transition ${selectedShape === 'triangle' ? (targetShape === 'triangle' ? 'border-emerald-400' : 'border-red-300') : 'border-slate-200'}`}
                          >
                            ▲
                          </button>
                          <button 
                            onClick={() => handleShapeMatch('circle')}
                            className={`w-14 h-14 bg-white border-2 rounded-xl flex items-center justify-center text-xl hover:bg-slate-50 transition ${selectedShape === 'circle' ? (targetShape === 'circle' ? 'border-emerald-400' : 'border-red-300') : 'border-slate-200'}`}
                          >
                            ●
                          </button>
                          <button 
                            onClick={() => handleShapeMatch('square')}
                            className={`w-14 h-14 bg-white border-2 rounded-xl flex items-center justify-center text-xl hover:bg-slate-50 transition ${selectedShape === 'square' ? (targetShape === 'square' ? 'border-emerald-400' : 'border-red-300') : 'border-slate-200'}`}
                          >
                            ■
                          </button>
                        </div>
                      </div>

                      {matchFeedback && (
                        <div className="space-y-3">
                          <p className={`text-sm font-semibold ${selectedShape === targetShape ? 'text-emerald-500' : 'text-red-400'}`}>
                            {matchFeedback}
                          </p>
                          {selectedShape === targetShape && (
                            <button 
                              onClick={handleNextTargetShape}
                              className="text-xs bg-sky-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-sky-600 transition animate-pulse"
                            >
                              Play Next Shape 🌟
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 4: Success Module Completion */}
                  {lessonStep === 4 && (
                    <div className="space-y-6 text-center animate-fadeIn">
                      <div className="text-7xl select-none animate-bounce">🏆</div>
                      <div className="space-y-3">
                        <h4 className="text-3xl font-bold text-slate-800">{t.lessonCompleteTitle}</h4>
                        <p className="text-slate-400 text-sm max-w-md mx-auto">{t.lessonCompleteDesc}</p>
                      </div>
                    </div>
                  )}

                </div>

                <div className="bg-slate-50 px-8 py-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-bold">
                    {t.lessonStep} {lessonStep} {t.lessonOf} 4
                  </span>

                  <div className="flex items-center gap-3">
                    {lessonStep > 1 && lessonStep < 4 && (
                      <button 
                        onClick={() => setLessonStep(lessonStep - 1)}
                        className="bg-white border border-slate-200 text-slate-700 text-sm font-semibold py-2 px-4 rounded-xl hover:bg-slate-50 transition"
                      >
                        {t.lessonPrev}
                      </button>
                    )}
                    
                    {lessonStep < 4 ? (
                      <button 
                        onClick={() => setLessonStep(lessonStep + 1)}
                        className="bg-sky-500 text-white text-sm font-bold py-2.5 px-5 rounded-xl hover:bg-sky-600 transition shadow-sm"
                      >
                        {t.lessonNext}
                      </button>
                    ) : (
                      <button 
                        onClick={handleResetLesson}
                        className="bg-slate-800 text-white text-sm font-bold py-2.5 px-5 rounded-xl hover:bg-slate-900 transition shadow-sm"
                      >
                        {t.lessonFinish}
                      </button>
                    )}
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* ABOUT ME SECTION */}
        {currentTab === 'about' && !isLessonActive && (
          <div className="space-y-12 animate-fadeIn max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1 text-center">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-sky-500/15 rounded-full blur-2xl animate-pulse"></div>
                  <div className="relative w-44 h-44 rounded-full overflow-hidden shadow-md mx-auto border-4 border-white">
                    <img 
                      src="https://lh3.googleusercontent.com/d/103hDjoPAzmheDdUZEjAzeUF46ayyOkhA" 
                      alt="Special Education Educator" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 space-y-4 text-center md:text-left">
                <h2 className="text-3xl font-bold text-slate-800">{t.aboutTitle}</h2>
                <h3 className="text-lg font-semibold text-sky-500">{t.aboutSubtitle}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{t.aboutP1}</p>
                <p className="text-slate-500 leading-relaxed text-sm">{t.aboutP2}</p>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT ME SECTION */}
        {currentTab === 'contact' && !isLessonActive && (
          <div className="space-y-10 animate-fadeIn max-w-2xl mx-auto">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold text-slate-800">{t.contactTitle}</h2>
              <p className="text-slate-400 text-sm">{t.contactSub}</p>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
              <form action="https://formspree.io/f/your_formspree_endpoint_id" method="POST" className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-800">{t.nameLabel}</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none bg-slate-50/50 transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-800">{t.emailLabel}</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none bg-slate-50/50 transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-800">{t.msgLabel}</label>
                  <textarea 
                    name="message" 
                    rows="5" 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none bg-slate-50/50 transition"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 px-6 rounded-2xl shadow-sm transition duration-300"
                >
                  {t.sendBtn}
                </button>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* Grounding Footer */}
      <footer className="bg-white border-t border-slate-100 py-8 text-center text-sm text-slate-400 mt-12">
        <div className="max-w-6xl mx-auto px-6">
          &copy; 2026 {t.brand}. Designed gently for special learners.
        </div>
      </footer>

    </div>
  );
}