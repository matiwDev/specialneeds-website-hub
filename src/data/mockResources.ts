export const mockResources = [
  // Subject 1: Sensory Regulation
  {
    id: "res-1",
    category: "sensory",
    type: "pdf",
    price: "$10.00",
    partnerId: "res-2",
    en: {
      title: "My Sensory Break Tracker",
      desc: "Printable visual cards helping children identify, request, and execute independent decompression breaks.",
      subject: "Sensory Regulation",
      partnerLabel: "Pair with Balloon Breathing module"
    },
    he: {
      title: "לוח מעקב הפסקות חושיות",
      desc: "כרטיסיות שגרה חזותיות להדפסה, המסייעות לילדים לבחור ולנהל הפסקות ויסות חושי עצמאיות.",
      subject: "וויסות חושי",
      partnerLabel: "שלבו עם משחק בלון הנשימה והחול"
    }
  },
  {
    id: "res-2",
    category: "sensory",
    type: "interactive",
    price: "$12.00",
    partnerId: "res-1",
    en: {
      title: "Calm Balloon Breathing & Sound Flow",
      desc: "An organic interactive breathing balloon accompanied by a tactile water-orb sensory sand field.",
      subject: "Sensory Regulation",
      partnerLabel: "Pair with print Sensory Break Cards"
    },
    he: {
      title: "בלון נשימה חושי וזרם צלילים",
      desc: "סימולטור נשימה אינטראקטיבי בשילוב מרחב צבעים אקוסטי למניעת הצפה חושית.",
      subject: "וויסות חושי",
      partnerLabel: "שלבו עם כרטיסיות שגרה להדפסה"
    }
  },

  // Subject 2: Emotional Communication
  {
    id: "res-3",
    category: "emotional",
    type: "pdf",
    price: "$11.00",
    partnerId: "res-4",
    en: {
      title: "Emotions Expressive Flashcards",
      desc: "Printable cut-and-color sheets showing clear, high-contrast emotion face cards to share feelings.",
      subject: "Emotional Communication",
      partnerLabel: "Pair with Emotion Matching game"
    },
    he: {
      title: "כרטיסיות הבעה ורגשות להדפסה",
      desc: "ערכת קלפי פרצופים ברורים להדפסה, המעודדים פיתוח שיח רגשי וזיהוי תחושות בכיתה ובבית.",
      subject: "תקשורת והבעה רגשית",
      partnerLabel: "שלבו עם משחק זיהוי הרגשות"
    }
  },
  {
    id: "res-4",
    category: "emotional",
    type: "interactive",
    price: "$15.00",
    partnerId: "res-3",
    en: {
      title: "Emotion Matcher Game",
      desc: "A soft, quiet drag-or-type matching quiz where children map illustrations to feelings.",
      subject: "Emotional Communication",
      partnerLabel: "Pair with print Emotions Flashcards"
    },
    he: {
      title: "משחק התאמת רגשות חביב",
      desc: "פעילות דיגיטלית שקטה להתאמת הבעת פני חבר למילת הרגש הנכונה, עם חיזוקים חיוביים.",
      subject: "תקשורת והבעה רגשית",
      partnerLabel: "שלבו עם כרטיסיות הרגשות להדפסה"
    }
  },

  // Subject 3: Fine Motor Skills
  {
    id: "res-5",
    category: "motor",
    type: "pdf",
    price: "Free",
    partnerId: "res-6",
    en: {
      title: "Pencil Control Line Tracing Packet",
      desc: "High-contrast printable worksheets with bold solid trails and wide guidelines for physical stability.",
      subject: "Fine Motor Skills",
      partnerLabel: "Pair with Interactive Star Tracing"
    },
    he: {
      title: "חוברת מעקב קווים ומוטוריקה",
      desc: "דפי עבודה להדפסה עם שבילים עבים, המעודדים תכנון מוטורי ויציבות אחיזת כלי כתיבה.",
      subject: "מוטוריקה עדינה",
      partnerLabel: "שלבו עם משחק מעקב הקווים"
    }
  },
  {
    id: "res-6",
    category: "motor",
    type: "interactive",
    price: "$14.00",
    partnerId: "res-5",
    en: {
      title: "Gentle Path Tracing Game",
      desc: "An SVG trace-along stellar playground where children drag a golden star along a winding path safely.",
      subject: "Fine Motor Skills",
      partnerLabel: "Pair with printable Pencil Control packet"
    },
    he: {
      title: "אימון מעקב קווים עדין",
      desc: "הובילו את כוכב השני לקצה השביל בזהירות ובקצב איטי מבלי לסטות מהקווים המנחים.",
      subject: "מוטוריקה עדינה",
      partnerLabel: "שלבו עם חוברת האימון להדפסה"
    }
  },

  // Subject 4: Daily Routines
  {
    id: "res-7",
    category: "routines",
    type: "pdf",
    price: "$13.00",
    partnerId: "res-8",
    en: {
      title: "Morning Routine Visual Board",
      desc: "Printable schedule worksheets featuring beautiful cutouts to make schedules tangible with velcro tape.",
      subject: "Daily Routines",
      partnerLabel: "Pair with Digital Routine planner"
    },
    he: {
      title: "לוח ויזואלי לשגרת הבוקר",
      desc: "עזרי הדפסה להרכבת לוחות תלייה ביתיים המסדרים את שגרת ההתארגנות של הילד שלב אחר שלב.",
      subject: "שגרת יום ומיומנויות",
      partnerLabel: "שלבו עם מתכנן שגרת היום הדיגיטלי"
    }
  },
  {
    id: "res-8",
    category: "routines",
    type: "interactive",
    price: "$15.00",
    partnerId: "res-7",
    en: {
      title: "Interactive Daily Planner",
      desc: "Tap and clear steps order in an organic checklist game that reinforces confidence with chimes and stars.",
      subject: "Daily Routines",
      partnerLabel: "Pair with print Morning Routine Sheets"
    },
    he: {
      title: "לוח התקדמות יומי אינטראקטיבי",
      desc: "מילוי ויזואלי מהמה של משימות בוקר קבועות המקדם למידה מובנית ועצמאות בבוקר.",
      subject: "שגרת יום ומיומנויות",
      partnerLabel: "שלבו עם דפי שגרת הבוקר להדפסה"
    }
  },

  // Subject 5: Cognitive Sorting
  {
    id: "res-9",
    category: "cognitive",
    type: "pdf",
    price: "$16.00",
    partnerId: "res-10",
    en: {
      title: "Shape & Color Sorting Board",
      desc: "Tactile cutout colored blocks and printable category trays matching shape sorting puzzles.",
      subject: "Cognitive Sorting",
      partnerLabel: "Pair with digital Shape Sorter"
    },
    he: {
      title: "לוחות מיון צורות וצבעים פיזיים",
      desc: "דפים להדפסה וגזירה של צורות צבעוניות, המיועדים לפעילות קוגניטיבית תומכת מיון שולחני.",
      subject: "מיון קוגניטיבי",
      partnerLabel: "שלבו עם משחק המיון המקביל"
    }
  },
  {
    id: "res-10",
    category: "cognitive",
    type: "interactive",
    price: "$18.00",
    partnerId: "res-9",
    en: {
      title: "Shape Sorter & Pattern Maker",
      desc: "Classify items in themed color coded frame baskets. Safe audio clicks reward correct pairs.",
      subject: "Cognitive Sorting",
      partnerLabel: "Pair with print Shape Sorting board"
    },
    he: {
      title: "ממיין צורות וצבעים דיגיטלי",
      desc: "מיינו את הצורה המוצגת לתוך סל הצבעים הנכון ופתרו תרגילים צורניים וצבעוניים נעימים.",
      subject: "מיון קוגניטיבי",
      partnerLabel: "שלבו עם דפי מיון הצורות להדפסה"
    }
  },

  // Subject 6: Language & Vocabulary
  {
    id: "res-11",
    category: "language",
    type: "pdf",
    price: "$12.00",
    partnerId: "res-12",
    en: {
      title: "Bilingual First-Words Flashcards",
      desc: "High-contrast printable flashcards introducing key objects in clear English and Hebrew titles.",
      subject: "Language & Vocabulary",
      partnerLabel: "Pair with Sound Word Association"
    },
    he: {
      title: "כרטיסיות דו-לשוניות למילים ראשונות",
      desc: "כרטיסיות מנוקדות ואיורים להדפסה ולימוד מלים ראשונות בעברית ובאנגלית בצורה קריאה וחביבה.",
      subject: "שפה ואוצר מילים",
      partnerLabel: "שלבו עם משחק זיהוי הפריטים"
    }
  },
  {
    id: "res-12",
    category: "language",
    type: "interactive",
    price: "$16.00",
    partnerId: "res-11",
    en: {
      title: "Sound & Word Association Game",
      desc: "Identify items matching target word definitions. Triggers beautiful acoustic chime bells.",
      subject: "Language & Vocabulary",
      partnerLabel: "Pair with print FirstWords Flashcards"
    },
    he: {
      title: "זיהוי מילים וצלילים מעצים",
      desc: "קראו את מילת המטרה ולחצו על המלבן המאויר הנכון כדי לצבור נקודות וליהנות מצלילי קסם.",
      subject: "שפה ואוצר מילים",
      partnerLabel: "שלבו עם כרטיסיות מילים ראשונות להדפסה"
    }
  }
];

export const PATH_POINTS = [
  { x: 80, y: 150 },
  { x: 160, y: 110 },
  { x: 240, y: 130 },
  { x: 320, y: 200 },
  { x: 400, y: 240 },
  { x: 480, y: 180 },
  { x: 560, y: 120 },
  { x: 640, y: 110 },
  { x: 720, y: 160 },
  { x: 800, y: 220 },
  { x: 880, y: 190 },
  { x: 940, y: 150 }
];

export const SHAPES_LIST = [
  { id: "shape-1", shape: "circle", display: "●", color: "colorRed", colorCode: "#EF4444" },
  { id: "shape-2", shape: "triangle", display: "▲", color: "colorBlue", colorCode: "#3B82F6" },
  { id: "shape-3", shape: "square", display: "■", color: "colorYellow", colorCode: "#F59E0B" }
];

export const WORD_ASSOCIATION_LIST = [
  { id: "assoc-1", key: "apple", val: "Apple 🍎", options: ["apple", "sun", "cookie"] },
  { id: "assoc-2", key: "sun", val: "Sun ☀️", options: ["tree", "sun", "car"] },
  { id: "assoc-3", key: "house", val: "House 🏠", options: ["house", "apple", "cookie"] },
  { id: "assoc-4", key: "tree", val: "Tree 🌳", options: ["car", "tree", "house"] },
  { id: "assoc-5", key: "car", val: "Car 🚗", options: ["sun", "cookie", "car"] },
  { id: "assoc-6", key: "cookie", val: "Cookie 🍪", options: ["cookie", "apple", "tree"] }
];

export const initialProgressState: Record<string, number> = {
  "res-1": 40,   // Sensory break tracker PDF: In Progress
  "res-2": 100,  // Breathing interactive: Completed
  "res-3": 0,    // Emotions PDF: Not Started
  "res-4": 40,   // Emotion matcher interactive: In Progress
  "res-5": 100,  // Fine motor PDF: Completed (or 100)
  "res-6": 0,    // Path tracing interactive: Not Started
  "res-7": 0,    // Morning routine PDF: Not Started
  "res-8": 40,   // Interactive planner: In Progress
  "res-9": 100,  // Shape sorting board PDF: Completed
  "res-10": 0,   // Shape sorter interactive: Not Started
  "res-11": 40,  // First-words PDF: In Progress
  "res-12": 0,   // Word association interactive: Not Started
};
