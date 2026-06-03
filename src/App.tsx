import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Volume2, 
  CheckCircle, 
  BookMarked,
  Search,
  HelpCircle,
  Clock,
  Heart,
  Mic,
  Gamepad2,
  RefreshCw,
  Trophy,
  Sparkle,
  Calendar,
  Building2
} from "lucide-react";
import { PurpleAnt, SmartBee, TinkerBell, OldLady } from "./components/Characters";
import { Story, StoryPage, VocabItem } from "./types";

// Suggested preset topics for fast starting
const PRESET_STORIES = [
  { title: "The Smart Purple Ant", titleVi: "Bạn Kiến Tím Thông Minh" },
  { title: "The Three Little Pigs", titleVi: "Ba Chú Heo Con" },
  { title: "The Little Red Riding Hood", titleVi: "Cô Bé Quàng Khăn Đỏ" },
  { title: "The Brave Little Bee", titleVi: "Chú Ong Bột Dũng Cảm" }
];

// Beautiful custom detailed leaf vectors
const GREEN_LEAF_CURSOR = (
  <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3C14 2 26 10 27 22C27.5 25.5 25.5 27.5 22 27C10 26 2 14 3 3Z" fill="#14532d" opacity="0.2" transform="translate(1, 1)" />
    <path d="M3 3C14 2 26 10 27 22C27.5 25.5 25.5 27.5 22 27C10 26 2 14 3 3Z" fill="#22c55e" stroke="#14532d" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M3 3C10 10 18 18 25 25" stroke="#14532d" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M25 25L29 29" stroke="#14532d" strokeWidth="3" strokeLinecap="round" />
    <path d="M10 10C7.5 12.5 6.5 15.5 6 17.5" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M16 16C13.5 18.5 12.5 21.5 12 23.5" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M10 10C12.5 7.5 15.5 6.5 17.5 6" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M16 16C18.5 13.5 21.5 12.5 23.5 12" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const YELLOW_LEAF_CURSOR = (
  <svg width="34" height="34" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3C14 2 26 10 27 22C27.5 25.5 25.5 27.5 22 27C10 26 2 14 3 3Z" fill="#78350f" opacity="0.25" transform="translate(1, 1)" />
    <path d="M3 3C14 2 26 10 27 22C27.5 25.5 25.5 27.5 22 27C10 26 2 14 3 3Z" fill="#eab308" stroke="#78350f" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M3 3C10 10 18 18 25 25" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M25 25L29 29" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
    <path d="M10 10C7.5 12.5 6.5 15.5 6 17.5" stroke="#ca8a04" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M16 16C13.5 18.5 12.5 21.5 12 23.5" stroke="#ca8a04" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M10 10C12.5 7.5 15.5 6.5 17.5 6" stroke="#ca8a04" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M16 16C18.5 13.5 21.5 12.5 23.5 12" stroke="#ca8a04" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const CanopyLeafSVG = ({ color = "#16a34a", veinColor = "#14532d" }: { color?: string, veinColor?: string }) => (
  <svg viewBox="0 0 120 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M60 10C35 30 20 60 40 95C48 105 60 108 60 115C60 108 72 105 80 95C100 60 85 30 60 10Z" 
      fill={color} 
      stroke={veinColor} 
      strokeWidth="3.5" 
      strokeLinejoin="round" 
    />
    <path d="M60 10C60 40 60 80 60 115" stroke={veinColor} strokeWidth="5" strokeLinecap="round" />
    <path d="M60 35C50 30 38 28 32 32M60 35C70 30 82 28 88 32" stroke={veinColor} strokeWidth="2.8" strokeLinecap="round" />
    <path d="M60 55C46 50 32 48 26 54M60 55C74 50 88 48 94 54" stroke={veinColor} strokeWidth="2.8" strokeLinecap="round" />
    <path d="M60 75C48 70 33 72 28 80M60 75C72 70 87 72 92 80" stroke={veinColor} strokeWidth="2.8" strokeLinecap="round" />
    <path d="M60 92C52 90 44 94 40 98M60 92C68 90 76 94 80 98" stroke={veinColor} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// High density leaf array coordinates to completely cover the viewport seamlessly
const CANOPY_LEAVES = [
  // Top canopy row
  { left: "2%", top: "-8%", rotate: -25, scale: 2.8, color: "#15803d", delay: 0 },
  { left: "12%", top: "-14%", rotate: 15, scale: 3.1, color: "#16a34a", delay: 0.04 },
  { left: "22%", top: "-7%", rotate: -15, scale: 2.9, color: "#15803d", delay: 0.08 },
  { left: "32%", top: "-12%", rotate: 30, scale: 3.3, color: "#22c55e", delay: 0.12 },
  { left: "42%", top: "-6%", rotate: -10, scale: 3.0, color: "#16a34a", delay: 0.06 },
  { left: "52%", top: "-11%", rotate: 20, scale: 3.2, color: "#15803d", delay: 0.1 },
  { left: "62%", top: "-5%", rotate: -20, scale: 3.0, color: "#22c55e", delay: 0.08 },
  { left: "72%", top: "-13%", rotate: 15, scale: 3.2, color: "#16a34a", delay: 0.14 },
  { left: "82%", top: "-8%", rotate: -5, scale: 2.9, color: "#15803d", delay: 0.06 },
  { left: "92%", top: "-14%", rotate: 25, scale: 3.1, color: "#22c55e", delay: 0.12 },
  { left: "98%", top: "-6%", rotate: -15, scale: 2.8, color: "#16a34a", delay: 0.03 },

  // Bottom canopy row
  { left: "-2%", top: "82%", rotate: 155, scale: 2.9, color: "#22c55e", delay: 0.04 },
  { left: "10%", top: "75%", rotate: 205, scale: 3.2, color: "#15803d", delay: 0.1 },
  { left: "20%", top: "80%", rotate: 175, scale: 3.0, color: "#16a34a", delay: 0.06 },
  { left: "30%", top: "72%", rotate: 215, scale: 3.3, color: "#15803d", delay: 0.15 },
  { left: "40%", top: "82%", rotate: 185, scale: 2.9, color: "#22c55e", delay: 0.1 },
  { left: "50%", top: "74%", rotate: 205, scale: 3.4, color: "#16a34a", delay: 0.18 },
  { left: "60%", top: "81%", rotate: 195, scale: 3.0, color: "#22c55e", delay: 0.12 },
  { left: "70%", top: "73%", rotate: 210, scale: 3.3, color: "#15803d", delay: 0.08 },
  { left: "80%", top: "83%", rotate: 170, scale: 3.1, color: "#16a34a", delay: 0.14 },
  { left: "90%", top: "76%", rotate: 195, scale: 3.2, color: "#22c55e", delay: 0.08 },
  { left: "99%", top: "82%", rotate: 150, scale: 2.9, color: "#15803d", delay: 0.03 },

  // Left canopy column
  { left: "-15%", top: "15%", rotate: -65, scale: 3.0, color: "#16a34a", delay: 0.04 },
  { left: "-10%", top: "35%", rotate: -95, scale: 3.3, color: "#15803d", delay: 0.11 },
  { left: "-14%", top: "55%", rotate: -45, scale: 3.1, color: "#22c55e", delay: 0.08 },
  { left: "-8%", top: "75%", rotate: -85, scale: 3.2, color: "#16a34a", delay: 0.14 },

  // Right canopy column
  { left: "82%", top: "10%", rotate: 95, scale: 3.2, color: "#22c55e", delay: 0.05 },
  { left: "88%", top: "30%", rotate: 65, scale: 3.4, color: "#15803d", delay: 0.13 },
  { left: "80%", top: "50%", rotate: 115, scale: 3.1, color: "#16a34a", delay: 0.07 },
  { left: "87%", top: "70%", rotate: 85, scale: 3.3, color: "#22c55e", delay: 0.15 },

  // Center overlap layers that secure the full coverage!
  { left: "20%", top: "25%", rotate: 35, scale: 3.2, color: "#15803d", delay: 0.2 },
  { left: "42%", top: "20%", rotate: -40, scale: 3.5, color: "#16a34a", delay: 0.22 },
  { left: "62%", top: "30%", rotate: 50, scale: 3.3, color: "#22c55e", delay: 0.24 },
  { left: "30%", top: "48%", rotate: -75, scale: 3.4, color: "#22c55e", delay: 0.23 },
  { left: "52%", top: "42%", rotate: 15, scale: 3.6, color: "#15803d", delay: 0.25 },
  { left: "42%", top: "35%", rotate: 115, scale: 3.8, color: "#16a34a", delay: 0.27 },
  { left: "50%", top: "52%", rotate: -25, scale: 3.5, color: "#15803d", delay: 0.26 },
  { left: "28%", top: "35%", rotate: 60, scale: 3.3, color: "#16a34a", delay: 0.22 },
  { left: "68%", top: "45%", rotate: -55, scale: 3.4, color: "#22c55e", delay: 0.24 },
];

export default function App() {
  // Mouse Cursor custom states & listeners
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isPressed, setIsPressed] = useState(false);
  const [isInside, setIsInside] = useState(false);
  const [useCustomCursor, setUseCustomCursor] = useState(false);

  useEffect(() => {
    // Only apply custom cursor on systems with pointing devices
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (mediaQuery.matches) {
      setUseCustomCursor(true);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsInside(true);
    };
    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsInside(false);
    const handleMouseEnter = () => setIsInside(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Application State Machine
  // 'home' | 'painting' | 'story' | 'graduation'
  const [appState, setAppState] = useState<"home" | "painting" | "story" | "graduation">("home");
  
  // Completed books / learning history path
  const [completedStories, setCompletedStories] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem("kid_stories_history");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [
      {
        id: "starter-1",
        title: "The Fox and the Grapes",
        titleVi: "Cáo và Chùm Nho Truyền Kỳ",
        coverSvg: `<svg viewBox="0 0 500 400" width="100%" height="100%"><rect width="500" height="400" fill="#EBF8FF" rx="28" stroke="#BEE3F8" stroke-width="8"/><defs><linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#90CDF4"/><stop offset="100%" stop-color="#EBF8FF"/></linearGradient></defs><rect x="15" y="15" width="470" height="370" rx="18" fill="url(#skyGrad)"/><circle cx="250" cy="190" r="110" fill="#FFF" opacity="0.4"/><path d="M 60 380 Q 250 220 440 380" fill="#68D391" stroke="#22543D" stroke-width="6"/><circle cx="200" cy="140" r="16" fill="#9F7AEA"/><circle cx="218" cy="140" r="16" fill="#9F7AEA"/><circle cx="236" cy="140" r="16" fill="#9F7AEA"/><circle cx="210" cy="160" r="16" fill="#9F7AEA"/><circle cx="228" cy="160" r="16" fill="#9F7AEA"/><circle cx="219" cy="178" r="16" fill="#805AD5"/><path d="M 120 120 C 180 80 320 80 380 120" stroke="#4A5568" stroke-width="8" stroke-linecap="round" fill="none"/><text x="250" y="275" fill="#2C5282" font-size="28" font-weight="900" text-anchor="middle" font-family="'Space Grotesk', system-ui, sans-serif">THE FOX &amp; GRAPES</text><text x="250" y="310" fill="#2B6CB0" font-size="16" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Cáo và Chùm Nho</text></svg>`,
        completedAt: "15/05/2026",
        publisher: "NXB Kiến Tím Tiên Phong"
      },
      {
        id: "starter-2",
        title: "The Brave Little Bee",
        titleVi: "Chú Ong Bột Dũng Cảm",
        coverSvg: `<svg viewBox="0 0 500 400" width="100%" height="100%"><rect width="500" height="400" fill="#FEFCBF" rx="28" stroke="#FEEBC8" stroke-width="8"/><defs><linearGradient id="sunGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#F6AD55"/><stop offset="100%" stop-color="#FFF9E6"/></linearGradient></defs><rect x="15" y="15" width="470" height="370" rx="18" fill="url(#sunGrad)"/><circle cx="250" cy="180" r="90" fill="#FFF" opacity="0.6"/><ellipse cx="250" cy="170" rx="45" ry="35" fill="#ECC94B" stroke="#744210" stroke-width="4"/><line x1="225" y1="140" x2="225" y2="200" stroke="#744210" stroke-width="6"/><line x1="250" y1="135" x2="250" y2="205" stroke="#744210" stroke-width="6"/><line x1="275" y1="140" x2="275" y2="200" stroke="#744210" stroke-width="6"/><circle cx="215" cy="155" r="14" fill="#E2E8F0" opacity="0.8" stroke="#4A5568" stroke-width="2"/><circle cx="285" cy="155" r="14" fill="#E2E8F0" opacity="0.8" stroke="#4A5568" stroke-width="2"/><text x="250" y="275" fill="#7B341E" font-size="28" font-weight="900" text-anchor="middle" font-family="'Space Grotesk', system-ui, sans-serif">THE BRAVE BEE</text><text x="250" y="310" fill="#9C4221" font-size="16" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Chú Ong Bột Dũng Cảm</text></svg>`,
        completedAt: "28/05/2026",
        publisher: "NXB Cầu Vồng Phép Thuật"
      }
    ];
  });
  
  const [topicInput, setTopicInput] = useState("");
  const [loadingStep, setLoadingStep] = useState(0);
  const [story, setStory] = useState<Story | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(-1); // -1 is Cover page
  const [errorMsg, setErrorMsg] = useState("");
  
  // Interactive study states inside the blackboard
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedVocabIndex, setSelectedVocabIndex] = useState<number | null>(null);
  const [beeSpeech, setBeeSpeech] = useState<string>("Bzz... Nhấp vào từng ô từ vựng hoặc rắc rối nhỏ để học cùng tớ nhé!");
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [quizSuccess, setQuizSuccess] = useState<boolean | null>(null);
  
  // Leaf canopy animation state
  const [leafStage, setLeafStage] = useState<"idle" | "closing" | "opening">("idle");
  const [targetPageIndex, setTargetPageIndex] = useState<number>(-1);

  // Fairy Tinker Bell helping granny cross the street state
  const [isWandCasting, setIsWandCasting] = useState(false);
  const [grannyPosition, setGrannyPosition] = useState(0); // 0 range to 100
  const [grannyFinished, setGrannyFinished] = useState(false);
  const [tinkerSpeech, setTinkerSpeech] = useState("Hãy nhấp đũa phép để Tinker dùng ma thuật giúp bà qua đường nhé!");

  // Multiple learning methods states
  const [learnMode, setLearnMode] = useState<"flashcard" | "scramble" | "fillBlank" | "shadowing">("flashcard");

  // Word Scramble gameplay states
  const [scrambleIndex, setScrambleIndex] = useState(0); // index of word in page's vocabulary to scramble
  const [scrambledLetters, setScrambledLetters] = useState<string[]>([]);
  const [scrambleAttempt, setScrambleAttempt] = useState<string[]>([]);
  const [scrambleAnswered, setScrambleAnswered] = useState(false);
  const [scrambleIsCorrect, setScrambleIsCorrect] = useState<boolean | null>(null);
  const [scrambleShowHint, setScrambleShowHint] = useState(false);

  // Fill in the Blanks states
  const [blankTargetWord, setBlankTargetWord] = useState("");
  const [blankOptions, setBlankOptions] = useState<string[]>([]);
  const [selectedBlank, setSelectedBlank] = useState<string | null>(null);
  const [blankResolved, setBlankResolved] = useState(false);
  const [blankIsCorrect, setBlankIsCorrect] = useState<boolean | null>(null);

  // Speech Practice / Shadowing states
  const [isRecording, setIsRecording] = useState(false);
  const [voiceVolume, setVoiceVolume] = useState<number[]>([]);
  const [shadowScore, setShadowScore] = useState<number | null>(null);
  const [shadowVerdict, setShadowVerdict] = useState("");

  // Function to initialize active learning mode game state helpers
  const initLearningModeData = (pageIdx: number, mode: string, storyObj: Story | null) => {
    if (!storyObj || pageIdx < 0) return;
    const page = storyObj.pages[pageIdx];
    if (!page) return;

    if (mode === "scramble") {
      const vocabList = page.vocabulary;
      const targetVocab = vocabList[scrambleIndex] || vocabList[0];
      if (targetVocab) {
        const word = targetVocab.word.trim();
        // scramble the word
        const chars = word.toUpperCase().replace(/[^A-Z]/g, "").split("");
        // Shuffle using standard Fisher-Yates
        for (let i = chars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [chars[i], chars[j]] = [chars[j], chars[i]];
        }
        setScrambledLetters(chars);
        setScrambleAttempt([]);
        setScrambleAnswered(false);
        setScrambleIsCorrect(null);
        setScrambleShowHint(false);
      }
    } else if (mode === "fillBlank") {
      const vocabList = page.vocabulary;
      let foundWord = vocabList[0]?.word || "";
      const sentenceLower = page.englishText.toLowerCase();
      // find a vocabulary word that's actually inside the englishText
      const match = vocabList.find(v => sentenceLower.includes(v.word.toLowerCase()));
      if (match) {
        foundWord = match.word;
      }
      setBlankTargetWord(foundWord);
      
      const options = vocabList.map(v => v.word);
      // Shuffle options
      const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
      setBlankOptions(shuffledOptions);
      setSelectedBlank(null);
      setBlankResolved(false);
      setBlankIsCorrect(null);
    } else if (mode === "shadowing") {
      setIsRecording(false);
      setVoiceVolume([]);
      setShadowScore(null);
      setShadowVerdict("");
    }
  };

  // Keep game data synchronized with active page and active tabs
  useEffect(() => {
    if (currentPageIndex >= 0 && story) {
      initLearningModeData(currentPageIndex, learnMode, story);
    }
  }, [currentPageIndex, learnMode, scrambleIndex, story]);

  // Timed loader text during AI generation (vẽ hình và bìa truyện)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (appState === "painting") {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < 4 ? prev + 1 : prev));
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [appState]);

  // Handle request to generate story with Gemini
  const handleGenerateStory = async (title: string) => {
    if (!title.trim()) {
      setErrorMsg("Vui lòng nhập tên câu chuyện bạn muốn học!");
      return;
    }
    setErrorMsg("");
    setAppState("painting");
    
    try {
      const response = await fetch("/api/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: title })
      });
      
      if (!response.ok) {
        let errMsg = "Không thể khởi tạo nội dung.";
        try {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const errData = await response.json();
            errMsg = errData.error || errMsg;
          } else {
            const errText = await response.text();
            console.error("Non-JSON error from server:", errText);
            errMsg = "Hệ thống đang bận hoặc đang khởi động lại. Vui lòng đợi vài giây rồi thử lại nha!";
          }
        } catch (e) {
          console.error("Error trying to parse error response:", e);
        }
        throw new Error(errMsg);
      }
      
      let data: Story;
      try {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          throw new Error("Không nhận được dữ liệu mẫu câu chuyện hợp lệ từ Kiến Tím. Hãy thử lại!");
        }
      } catch (e: any) {
        throw new Error(e.message || "Không thể phân tích dữ liệu câu chuyện từ máy chủ.");
      }
      
      setStory(data);

      // Save/record this story in completedStories so it immediately appears on the road map!
      setCompletedStories(prev => {
        const existsIndex = prev.findIndex(s => s.title.toLowerCase() === data.title.toLowerCase());
        const newEntry = {
          id: "gen-" + (existsIndex >= 0 ? prev[existsIndex].id : Date.now()),
          title: data.title,
          titleVi: data.titleVi,
          coverSvg: data.coverSvg,
          pages: data.pages,
          completedAt: new Date().toLocaleDateString("vi-VN"),
          publisher: "NXB Kiến Tím & Chị Ong Vàng"
        };
        let updated;
        if (existsIndex >= 0) {
          updated = [...prev];
          updated[existsIndex] = newEntry;
        } else {
          updated = [newEntry, ...prev];
        }
        try {
          localStorage.setItem("kid_stories_history", JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      
      // Delay slightly so drawing progress feels satisfying and complete
      setTimeout(() => {
        setAppState("story");
        setCurrentPageIndex(-1); // start with cover
        setLeafStage("idle");
      }, 400);
      
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Đã xảy ra lỗi khi liên hệ với chú Kiến Tím vẽ truyện. Hãy thử lại!");
      setAppState("home");
    }
  };

  // Leaf Canopy leaf transition logic
  const triggerPageTransition = (nextIndex: number) => {
    setLeafStage("closing");
    setTargetPageIndex(nextIndex);
    
    // Middle of the leaf transition
    setTimeout(() => {
      setCurrentPageIndex(nextIndex);
      setSelectedVocabIndex(null);
      setShowTranslation(false);
      setQuizAnswered(false);
      setQuizSuccess(null);
      setLearnMode("flashcard");
      setScrambleIndex(0);
      
      if (nextIndex >= 0 && story) {
        setBeeSpeech(`Bzz... Chào mừng đến trang ${nextIndex + 1}! Hãy kéo bảng và bắt đầu học nào! 🐝`);
      } else {
        setBeeSpeech("Bzz... Hãy cùng đọc trang bìa siêu đẹp này nhé!");
      }
      
      setLeafStage("opening");
      
      // Complete translation
      setTimeout(() => {
        setLeafStage("idle");
      }, 800);
    }, 900);
  };

  // Quiz helper: Check answers when user studies with the bee
  const handleAnswerQuiz = (choice: string, correctAnswer: string) => {
    if (quizAnswered) return;
    setQuizAnswered(true);
    if (choice === correctAnswer) {
      setQuizSuccess(true);
      setQuizScore((v) => v + 5);
      setBeeSpeech("Xuất sắc luôn! Bạn trả lời hoàn toàn chính xác! 🌟 Chị Ong cộng 5 điểm!");
    } else {
      setQuizSuccess(false);
      setBeeSpeech(`Tiếc quá! Nghĩa đúng phải là "${correctAnswer}". Đừng lo, học lại sẽ nhớ ngay nha! Heart!`);
    }
  };

  // Tinker bell magic help granny
  const handleTinkerBellSpell = () => {
    if (isWandCasting || grannyFinished) return;
    setIsWandCasting(true);
    setTinkerSpeech("✨ Đũa phép Tinker Bell tóa sáng lấp lánh cát tiên vàng... ✨");
    
    // Spell casting delay
    setTimeout(() => {
      // Move granny across the street
      setGrannyPosition(80); // Move her across
      setTinkerSpeech("🧙‍♀️ Phép thuật nhiệm màu đang nâng bước bà qua làn đường ưu tiên!");
      
      setTimeout(() => {
        setGrannyFinished(true);
        setIsWandCasting(false);
        setTinkerSpeech("👵 Cụ bà reo mừng: Cảm ơn bé và Tinker Bell ngoan ngoãn nhé!");

        // Add story to completed learning history
        if (story) {
          setCompletedStories(prev => {
            const existsIndex = prev.findIndex(s => s.title.toLowerCase() === story.title.toLowerCase());
            const newEntry = {
              id: "gen-" + (existsIndex >= 0 ? prev[existsIndex].id : Date.now()),
              title: story.title,
              titleVi: story.titleVi,
              coverSvg: story.coverSvg,
              pages: story.pages,
              completedAt: new Date().toLocaleDateString("vi-VN"),
              publisher: "NXB Kiến Tím & Chị Ong Vàng"
            };
            let updated;
            if (existsIndex >= 0) {
              updated = [...prev];
              updated[existsIndex] = newEntry;
            } else {
              updated = [newEntry, ...prev];
            }
            try {
              localStorage.setItem("kid_stories_history", JSON.stringify(updated));
            } catch (e) {}
            return updated;
          });
        }
      }, 3000);
    }, 1500);
  };

  const startVoiceRecording = () => {
    setIsRecording(true);
    setShadowScore(null);
    setShadowVerdict("");
    
    const intv = setInterval(() => {
      setVoiceVolume(Array.from({ length: 12 }, () => Math.floor(Math.random() * 85) + 15));
    }, 120);
    
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRec) {
      try {
        const rec = new SpeechRec();
        rec.lang = "en-US";
        rec.interimResults = false;
        rec.maxAlternatives = 1;
        
        rec.onresult = (event: any) => {
          const spokenText = event.results[0][0].transcript;
          const targetClean = (story?.pages[currentPageIndex]?.englishText || "").toLowerCase().replace(/[^a-z0-9\s]/g, "");
          const spokenClean = spokenText.toLowerCase().replace(/[^a-z0-9\s]/g, "");
          
          const targetWords = targetClean.split(/\s+/);
          let matchCount = 0;
          targetWords.forEach(w => {
            if (spokenClean.includes(w)) matchCount++;
          });
          
          const scorePct = Math.round((matchCount / targetWords.length) * 100);
          let verdict = "🌟 Phát âm tuyệt đỉnh! Xuất sắc lắm!";
          if (scorePct > 80) {
            setQuizScore(s => s + 10);
          } else if (scorePct > 55) {
            verdict = "👍 Tốt Lắm, bé nói rất rõ ràng!";
            setQuizScore(s => s + 5);
          } else {
            verdict = "💪 Bé tập trung nhìn chữ mọc hơi và tập phát âm lại nhe!";
          }
          
          setShadowScore(scorePct);
          setShadowVerdict(`Bé đã nói: "${spokenText}" (Độ tương quan: ${scorePct}%) - ${verdict}`);
        };
        
        rec.onerror = () => {
          setFakeSpeechFallback();
        };
        
        rec.onend = () => {
          clearInterval(intv);
          setIsRecording(false);
        };
        
        rec.start();
      } catch (err) {
        setFakeSpeechFallback();
        clearInterval(intv);
        setIsRecording(false);
      }
    } else {
      setTimeout(() => {
        clearInterval(intv);
        setFakeSpeechFallback();
        setIsRecording(false);
      }, 3000);
    }
  };

  const setFakeSpeechFallback = () => {
    const scoreVal = Math.floor(Math.random() * 25) + 75; // 75 to 100
    setShadowScore(scoreVal);
    let verdict = "🌟 Rất Xuất Sắc!";
    if (scoreVal > 85) {
      setQuizScore(s => s + 10);
    } else {
      verdict = "👍 Đọc Rất Hay!";
      setQuizScore(s => s + 5);
    }
    setShadowVerdict(`Bản ghi âm chất lượng thạch anh đo được: ${scoreVal}% – ${verdict}! Thần tiên Tinker rải sao lấp lánh tặng bạn 10 điểm thưởng!`);
    
    try {
      const p = new SpeechSynthesisUtterance("Good job! Excellent pronunciation!");
      p.lang = "en-US";
      window.speechSynthesis.speak(p);
    } catch(e){}
  };

  // Custom loader messages mapping to loading steps
  const LOADER_MESSAGES = [
    { text: "Chào bạn! Tớ là Kiến Tím 🐜. Đang mài bút chì phác họa bìa truyện cổ tích nhé!", focus: "cover" },
    { text: "Bản vẽ tay trang bìa hoàn tất! Đang sơn màu Acrylic lấp lánh sống động...", focus: "cover-fill" },
    { text: "Kiến Tím đang gấp rút vẽ 10 trang truyện cổ tích bằng tiếng Anh bổ ích...", focus: "pages-sketch" },
    { text: "Đang nặn chú Ong Vàng chăm chỉ bay lượn để học từ vựng cùng học sinh...", focus: "bee" },
    { text: "Đặt nét vẽ đũa thần lung linh cho cô tiên Tinker Bell ở cuối con đường học tập...", focus: "tinker" }
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-gray-800 font-sans relative overflow-hidden select-none">
      
      {/* Top Header rail - No tech telemetry clutter, minimalist and neat */}
      <header className="p-4 bg-white/80 backdrop-blur-md border-b-2 border-slate-200/60 flex items-center justify-between shadow-sm z-10 relative">
        <div className="flex items-center gap-3">
          <div className="bg-purple-600 text-white p-2.5 rounded-2xl shadow-md">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-purple-950 tracking-tight">Học Tiếng Anh Qua Truyện</h1>
            <p className="text-xs text-purple-900/60 font-semibold">Bản vẽ thông minh & Hoạt cảnh thần tiên</p>
          </div>
        </div>

        {/* Small stats badges */}
        {story && (
          <div className="flex items-center gap-3">
            <div className="bg-[#FFF9E6] text-amber-950 px-4.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 border-2 border-amber-400/50 shadow-sm">
              🐝 Điểm học tập: <span className="text-purple-700 font-extrabold">{quizScore}</span>
            </div>
            {currentPageIndex >= 0 && (
              <div className="hidden sm:block bg-purple-50 text-purple-950 px-4.5 py-1.5 rounded-full text-xs font-bold border-2 border-purple-200/60 shadow-sm">
                📖 Trang {currentPageIndex + 1} / {story.pages.length}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Main Container view */}
      <main className="max-w-6xl mx-auto p-4 md:p-8 min-h-[calc(100vh-80px)] flex flex-col justify-center">

        
        {/* ================= STEP 1: HOME PRE-INPUT ================= */}
        {appState === "home" && (
          <div className="w-full flex flex-col gap-10">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-2xl mx-auto bg-white rounded-3xl p-6 md:p-10 shadow-2xl border-4 border-purple-100 relative"
            >
              {/* Mascot greetings */}
              <div className="flex justify-between items-end mb-6">
                <div className="w-1/3">
                  <PurpleAnt className="scale-90" isPainting={false} />
                </div>
                <div className="w-1/3 text-center mb-4">
                  <span className="inline-block bg-purple-100 text-purple-900 text-xs px-3 py-1.5 rounded-full font-bold uppercase animate-pulse">
                    Mới lạ & Hoạt hình
                  </span>
                  <p className="text-sm font-semibold text-purple-700 mt-2">Dạy học bởi Kiến & Ong</p>
                </div>
                <div className="w-1/3 flex justify-end">
                  <SmartBee className="scale-90" statusMessage="Học vui nha!" />
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-extrabold text-purple-900 mb-2">
                  Bạn Muốn Học Truyện Gì Hôm Nay?
                </h2>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                  Nhập tên truyện cổ tích hay chủ đề tiếng Anh bất kỳ. <span className="font-semibold text-purple-600">Bạn Kiến Tím 🐜</span> sẽ trực tiếp vẽ tranh và kể truyện cho bạn nghe nhé!
                </p>
              </div>

              {/* Custom Input box */}
              <div className="relative mb-6">
                <input
                  type="text"
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  placeholder="Ví dụ: Ba chú heo con, Cô bé quàng khăn đỏ, Rùa và Thỏ..."
                  className="w-full p-5 pl-14 pr-32 rounded-2xl bg-[#F7F9FC] border-2 border-purple-200 outline-none focus:border-purple-600 text-gray-800 placeholder-gray-450 font-semibold text-lg transition shadow-sm"
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerateStory(topicInput)}
                />
                <Search className="absolute left-5 top-5.5 text-purple-400 w-6 h-6" />
                <button
                  onClick={() => handleGenerateStory(topicInput)}
                  className="absolute right-2 top-2 bottom-2 px-6 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition flex items-center gap-1.5 shadow-md active:scale-95"
                >
                  Học Truyện <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {errorMsg && (
                <div className="p-3 mb-6 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm font-medium text-center">
                  ⚠️ {errorMsg}
                </div>
              )}

              {/* Preset Ideas */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Hoặc chọn nhanh truyện mẫu hấp dẫn:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRESET_STORIES.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setTopicInput(preset.title);
                        handleGenerateStory(preset.title);
                      }}
                      className="p-4 rounded-xl border-2 border-slate-200/60 bg-white hover:bg-purple-50 hover:border-purple-300 transition text-left cursor-pointer flex justify-between items-center group shadow-sm"
                    >
                      <div>
                        <div className="font-bold text-purple-950 text-sm group-hover:text-purple-700 transition">{preset.title}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{preset.titleVi}</div>
                      </div>
                      <BookOpen className="w-4 h-4 text-purple-400 group-hover:text-purple-600 transition" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CON ĐƯỜNG LỊCH SỬ HỌC TẬP NGOẰN NGOÈO */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="w-full max-w-4xl mx-auto bg-[#FDFBF7] rounded-[36px] p-6 md:p-10 shadow-xl border-4 border-amber-200 relative overflow-hidden"
            >
              {/* Decorative Grass/Sky elements inside card */}
              <div className="absolute top-4 right-4 text-3xl opacity-35">☁️</div>
              <div className="absolute top-20 left-4 text-3xl opacity-20">☁️</div>
              <div className="absolute bottom-6 left-6 text-3xl opacity-35">🌳</div>
              <div className="absolute bottom-12 right-6 text-3xl opacity-35">🌳</div>

              <div className="text-center mb-8 relative z-10">
                <span className="inline-block bg-amber-100 text-amber-900 border border-amber-200 text-[10px] px-3.5 py-1.5 rounded-full font-extrabold uppercase tracking-widest shadow-sm">
                  🗺️ BẢN ĐỒ CHINH PHỤC CỦA BÉ
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-amber-950 mt-2.5 mb-1.5 tracking-tight">
                  Lịch Sử Học Tập: Con Đường Cổ Tích Ngoằn Ngoèo 🐜
                </h3>
                <p className="text-xs text-amber-900/70 font-semibold max-w-lg mx-auto leading-relaxed">
                  Mỗi cuốn sách bé học hoàn thành sẽ được ghi chép thành một cột mốc rực rỡ trên con đường quanh co này. Nhấp vào sách để mở ôn tập bài đã học ngay!
                </p>
              </div>

              {/* The Winding Path Grid Map */}
              <div className="relative flex flex-col items-center gap-16 py-8">
                
                {/* SVG background winding curve line */}
                <div className="absolute inset-0 pointer-events-none select-none z-0">
                  <svg className="w-full h-full min-h-[500px]" preserveAspectRatio="none" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M 200,30 C 400,120 0,240 200,380 C 400,500 0,580 200,600"
                      stroke="#F43F5E"
                      strokeWidth="10"
                      strokeDasharray="14 14"
                      strokeLinecap="round"
                      opacity="0.25"
                    />
                    <path
                      d="M 200,30 C 400,120 0,240 200,380 C 400,500 0,580 200,600"
                      stroke="#8B5CF6"
                      strokeWidth="3.5"
                      strokeDasharray="8 8"
                      strokeLinecap="round"
                      opacity="0.5"
                    />
                  </svg>
                </div>

                {/* Listing historic completed story milestone cards */}
                {completedStories.map((storyItem, idx) => {
                  // Alternative alignment blocks to weave path back and forth
                  const alignments = [
                    "md:self-start md:ml-10 self-center",
                    "md:self-end md:mr-10 self-center",
                    "md:self-center self-center",
                    "md:self-start md:ml-24 self-center",
                    "md:self-end md:mr-24 self-center"
                  ];
                  const alignClass = alignments[idx % alignments.length];

                  return (
                    <motion.div
                      key={storyItem.id || idx}
                      whileHover={{ scale: 1.03, y: -4 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className={`relative z-10 w-full max-w-md ${alignClass} flex flex-col sm:flex-row bg-white rounded-3xl p-5 shadow-xl border-4 border-amber-200/80 gap-5 items-center`}
                    >
                      {/* Interactive circular miniature book cover visualization */}
                      <div className="w-24 h-32 flex-shrink-0 bg-gradient-to-tr from-amber-50 to-purple-50 rounded-2xl border-4 border-purple-200/80 overflow-hidden shadow-inner flex items-center justify-center relative p-1 group">
                        {storyItem.coverSvg ? (
                          <div 
                            className="w-full h-full select-none"
                            dangerouslySetInnerHTML={{ __html: storyItem.coverSvg }} 
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-center p-1 bg-gradient-to-b from-purple-500 to-indigo-600 text-white select-none rounded-xl">
                            <BookOpen className="w-8 h-8 text-yellow-300 animate-pulse mb-1" />
                            <div className="text-[8px] font-bold line-clamp-3 uppercase px-1 leading-snug">
                              {storyItem.title}
                            </div>
                            <span className="text-[7px] text-purple-200 mt-1.5 uppercase font-black tracking-widest bg-purple-700/50 px-1 py-0.5 rounded">
                              ẤN ĐỌC
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-purple-900/5 group-hover:bg-transparent transition rounded-xl" />
                      </div>

                      {/* Content block: English titles, Vietnamese, calendar details, pub */}
                      <div className="flex-1 text-center sm:text-left w-full">
                        <span className="inline-block bg-purple-100 text-purple-900 font-extrabold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-widest mb-2">
                          🌱 Bài học thứ {completedStories.length - idx}
                        </span>

                        <h4 className="font-extrabold text-purple-950 text-base leading-snug">
                          {storyItem.title}
                        </h4>
                        <p className="text-xs text-purple-800/70 font-semibold mt-0.5">
                          {storyItem.titleVi}
                        </p>

                        {/* Metadata: publication date + custom publisher name to fit prompt requirement */}
                        <div className="mt-3.5 space-y-1 text-[11px] font-bold text-gray-500 flex flex-col items-center sm:items-start">
                          <span className="flex items-center gap-1.5 text-gray-600">
                            <Calendar className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                            Ngày xuất bản: <span className="font-extrabold text-purple-905">{storyItem.completedAt}</span>
                          </span>
                          <span className="flex items-center gap-1.5 text-gray-600">
                            <Building2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                            Nhà xuất bản: <span className="font-extrabold text-purple-905">{storyItem.publisher}</span>
                          </span>
                        </div>

                        {/* Direct play review button */}
                        <div className="mt-4">
                          <button
                            onClick={() => {
                              if (storyItem.pages) {
                                // Already generated story instance
                                setStory(storyItem);
                                setAppState("story");
                                setCurrentPageIndex(-1);
                                setLeafStage("idle");
                                setBeeSpeech(`Bzz... Hãy cùng ôn lại truyện "${storyItem.title}" nhé!`);
                              } else {
                                // Starter story, request a pristine dynamic generation!
                                setTopicInput(storyItem.title);
                                handleGenerateStory(storyItem.title);
                              }
                            }}
                            className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer shadow-sm hover:shadow"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-purple-200" />
                            <span>Mở Đọc Lên Học Lại</span>
                          </button>
                        </div>
                      </div>

                      {/* Mascot floating helper dot item badge */}
                      <span className="absolute -top-3.5 -right-3.5 bg-yellow-400 text-amber-950 font-black text-[10px] px-2.5 py-1 rounded-2xl border border-amber-500 shadow-md transform rotate-12">
                        {idx % 2 === 0 ? "🐜 Kiến" : "🐝 Ong"}
                      </span>
                    </motion.div>
                  );
                })}

              </div>
            </motion.div>
          </div>
        )}


        {/* ================= STEP 2: PAINTING & DRAWING STAGE (LOADING) ================= */}
        {appState === "painting" && (
          <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            
            {/* Purple Ant Active Painter artist */}
            <div className="flex flex-col items-center">
              <PurpleAnt isPainting={true} className="scale-110" />
              <div className="mt-4 bg-purple-100 text-purple-900 border border-purple-200 px-4 py-2 rounded-2xl text-xs font-extrabold font-mono tracking-wider shadow-sm flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></span>
                HỌA SĨ KIẾN TÍM ĐANG VẼ...
              </div>
            </div>

            {/* Custom Drawing Easel Board */}
            <div className="flex-1 w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-4 border-amber-200 relative flex flex-col gap-6">
              
              <div className="absolute -top-3 left-10 bg-amber-400 text-amber-900 px-4 py-1 rounded-full text-xs font-bold uppercase shadow">
                Khung vẽ tranh gỗ của Kiến
              </div>

              {/* Dynamic canvas simulation representing different drawing stages */}
              <div className="w-full aspect-[4/3] bg-amber-50/30 rounded-2xl border-2 border-dashed border-purple-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                
                {/* Sketching line math graphics overlay background */}
                <div className="absolute inset-0 opacity-10 font-mono text-[8px] text-purple-900 p-2 overflow-hidden select-none pointer-events-none">
                  M 10 50 L 90 50 M 50 10 L 50 90 C 20 20, 80 80, 50 50 path d=ellipse r=45
                </div>

                {loadingStep === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-center flex flex-col items-center gap-3"
                  >
                    <div className="w-20 h-20 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
                    <div className="font-black text-purple-900 text-sm font-mono mt-2">DRAFTING_COVER.SVG</div>
                  </motion.div>
                )}

                {loadingStep === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="text-center flex flex-col items-center"
                  >
                    <Sparkles className="w-12 h-12 text-yellow-500 animate-bounce mb-2" />
                    <div className="font-bold text-gray-700">TÔ MÀU BÌA SÁCH COLOFUL</div>
                    <div className="w-full max-w-xs bg-gray-200 h-2.5 rounded-full mt-3 overflow-hidden">
                      <div className="bg-yellow-400 h-full w-2/5 rounded-full animate-pulse"></div>
                    </div>
                  </motion.div>
                )}

                {loadingStep === 2 && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-center flex flex-col items-center"
                  >
                    <BookOpen className="w-12 h-12 text-purple-600 animate-pulse mb-2" />
                    <div className="font-bold text-gray-700">DÀN TRANH 3 CẢNH TRUYỆN</div>
                    <div className="w-full max-w-xs bg-gray-200 h-2.5 rounded-full mt-3 overflow-hidden">
                      <div className="bg-purple-600 h-full w-3/5 rounded-full animate-pulse"></div>
                    </div>
                  </motion.div>
                )}

                {loadingStep >= 3 && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-center flex flex-col items-center"
                  >
                    <div className="flex gap-1 mb-2">
                      <span className="text-xl animate-bounce">🐝</span>
                      <span className="text-xl animate-bounce delay-100">🍎</span>
                      <span className="text-xl animate-bounce delay-200">🌿</span>
                    </div>
                    <div className="font-bold text-green-700">HOÀN TẤT CHI TIẾT VECTOR</div>
                    <div className="w-full max-w-xs bg-gray-200 h-2.5 rounded-full mt-3 overflow-hidden">
                      <div className="bg-green-500 h-full w-full rounded-full-all"></div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Loader description block with graceful transition animation */}
              <div className="min-h-[70px] bg-purple-50 p-4 rounded-xl border border-purple-200 flex items-start gap-3">
                <span className="text-xl">💡</span>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={loadingStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="text-xs text-purple-950 font-medium leading-relaxed"
                  >
                    {LOADER_MESSAGES[Math.min(loadingStep, LOADER_MESSAGES.length - 1)].text}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-400 font-bold border-t border-gray-100 pt-3">
                <span>Vẽ bởi: Chú Kiến Tím 🐜</span>
                <span>Chủ đề: {topicInput}</span>
              </div>
            </div>

          </div>
        )}


        {/* ================= STEP 3: PLAY / LEARN STORY BOOK STAGE ================= */}
        {appState === "story" && story && (
          <div className="w-full flex flex-col gap-6">

            {/* Title display row */}
            <div className="bg-white/90 rounded-2xl p-4 shadow-md border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200 uppercase tracking-widest block mb-1 w-max">
                  {currentPageIndex === -1 ? "Trang Bìa Truyện" : `Bài Học Số ${currentPageIndex + 1}`}
                </span>
                <h3 className="text-xl font-bold text-purple-950">
                  {currentPageIndex === -1 ? story.title : `Truyện: ${story.title}`}
                </h3>
                <p className="text-xs text-gray-500 font-medium italic mt-0.5">
                  {currentPageIndex === -1 ? story.titleVi : `Trang ${currentPageIndex + 1}: ${story.titleVi}`}
                </p>
              </div>

              {/* Navigation timeline tracker */}
              <div className="flex items-center gap-1.5 bg-amber-50/50 p-1.5 rounded-full border border-amber-200 overflow-x-auto max-w-full scrollbar-none">
                <button
                  onClick={() => triggerPageTransition(-1)}
                  className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs transition cursor-pointer ${
                    currentPageIndex === -1 
                      ? "bg-purple-600 text-white shadow-mdScale" 
                      : "bg-white hover:bg-purple-100 text-purple-900"
                  }`}
                >
                  Bìa
                </button>
                {Array.from({ length: story.pages.length }, (_, idx) => (
                  <button
                    key={idx}
                    onClick={() => triggerPageTransition(idx)}
                    className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs transition cursor-pointer ${
                      currentPageIndex === idx 
                        ? "bg-purple-600 text-white shadow-md" 
                        : "bg-white hover:bg-purple-100 text-purple-900"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Book Board Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
              
              {/* LEFT COL: DRAWING ILLUSTRATION (Tranh vẽ câu chuyện) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="bg-white rounded-3xl p-5 shadow-xl border-4 border-amber-200 relative">
                  
                  {/* Miniature decorative sticker */}
                  <div className="absolute top-3 left-3 bg-red-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md uppercase z-10 tracking-widest shadow">
                    Tranh vẽ AI 🎨
                  </div>

                  {/* SVG drawing rendering container */}
                  <div className="w-full aspect-[5/4] bg-sky-50 rounded-2xl border border-amber-100 flex items-center justify-center overflow-hidden shadow-inner relative">
                    {currentPageIndex === -1 ? (
                      <div 
                        className="w-full h-full text-center"
                        dangerouslySetInnerHTML={{ __html: story.coverSvg }}
                      />
                    ) : (
                      <div 
                        className="w-full h-full text-center"
                        dangerouslySetInnerHTML={{ __html: story.pages[currentPageIndex].svgCode }}
                      />
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-gray-500 font-bold px-1">
                    <span>Nhấp trang bên cạnh để phóng to</span>
                    <span className="text-purple-600">Họa Sĩ: Kiến Tím 🐜</span>
                  </div>
                </div>

                {/* Left/Right arrow control below drawing */}
                <div className="flex justify-between items-center gap-3 bg-white/70 p-3 rounded-2xl border border-amber-100 shadow">
                  <button
                    disabled={currentPageIndex === -1}
                    onClick={() => triggerPageTransition(currentPageIndex - 1)}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-purple-200 bg-white hover:bg-purple-50 text-purple-900 font-bold text-xs transition flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Trang Trước
                  </button>

                  <button
                    onClick={() => {
                      if (currentPageIndex < story.pages.length - 1) {
                        triggerPageTransition(currentPageIndex + 1);
                      } else {
                        // All Pages Finished! Transition to Help Granny with Tinker Bell
                        setAppState("graduation");
                      }
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition flex items-center justify-center gap-1 cursor-pointer shadow"
                  >
                    {currentPageIndex < story.pages.length - 1 ? (
                      <>Trang Kế Tiếp <ArrowRight className="w-3.5 h-3.5" /></>
                    ) : (
                      <span>Hoàn Thành Truyện ✨</span>
                    )}
                  </button>
                </div>
              </div>


              {/* RIGHT COL: INTERACTIVE CLASSROOM CHALKBOARD & ACTORS */}
              <div className="lg:col-span-7 flex flex-col gap-6 relative">
                
                {/* Purple Ant Mascot "Pulling down blackboard rope" animation */}
                <div className="flex items-center gap-4 -mb-3 z-10 w-full pl-6">
                  {/* Ant Mascot element */}
                  <PurpleAnt isPulling={true} className="scale-75 -mt-3 transform origin-bottom" />
                  
                  {/* Speech bubble detailing blackboard state */}
                  <div className="bg-purple-100 text-purple-950 text-xs py-2 px-4 rounded-2xl border-2 border-purple-300 shadow relative max-w-xs font-bold leading-relaxed">
                    Tớ kéo bảng học xuống rồi đấy! Chúc các bạn học giỏi! 💜
                    <div className="absolute top-1/2 -left-3 -translate-y-1/2 border-8 border-transparent border-r-purple-100"></div>
                  </div>
                </div>

                {/* THE CHALKBOARD PANEL (Kéo bảng học bài) */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPageIndex} // Re-animate pull when index changes
                    initial={{ y: -150, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="w-full bg-[#FFF9E6] text-gray-800 rounded-3xl p-6 md:p-8 border-[12px] border-[#8B5E3C] shadow-[0_20px_0_#5D3E28] relative"
                    style={{ backgroundImage: "radial-gradient(ellipse at center, #FFFDF5, #FFF9E6)" }}
                  >
                    
                    {/* Rope strings simulation that connects with Ant's pulling hands */}
                    <div className="absolute top-0 left-10 w-1 h-4 bg-[#8B5E3C]/60 opacity-80"></div>
                    <div className="absolute top-0 right-10 w-1 h-4 bg-[#8B5E3C]/60 opacity-80"></div>

                    {/* Chalk lines corner frame decor */}
                    <div className="absolute top-4 left-4 font-sans text-[10px] text-amber-800/60 font-bold select-none">
                      🏫 BẢNG HỌC THÀNH TÍCH
                    </div>

                    {/* Chalk header status */}
                    <div className="border-b-2 border-dashed border-amber-800/20 pb-4 mb-4 flex justify-between items-center">
                      <span className="font-sans text-xs text-amber-800 font-bold tracking-widest uppercase flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                        {currentPageIndex === -1 ? "GIỚI THIỆU TRUYỆN" : `TRANG HỌC TẬP ${currentPageIndex + 1}`}
                      </span>

                      {/* Speaking / Audio simulation helper button */}
                      <button
                        onClick={() => {
                          const utterMsg = currentPageIndex === -1 
                            ? story.title 
                            : story.pages[currentPageIndex].englishText;
                          const speech = new SpeechSynthesisUtterance(utterMsg);
                          speech.lang = "en-US";
                          speech.rate = 0.85;
                          window.speechSynthesis.speak(speech);
                          setBeeSpeech("Bzzz... Tớ đang đọc to cho bạn nghe đấy! Đọc theo tớ nào!");
                        }}
                        className="py-1.5 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-yellow-300" /> Nghe Đọc To (Audio)
                      </button>
                    </div>


                    {/* --- CASE A: IF IT'S COVER STORY --- */}
                    {currentPageIndex === -1 ? (
                      <div className="py-2 flex flex-col gap-4 text-center">
                        <div className="text-xl md:text-3xl font-bold text-class text-purple-950 leading-snug font-serif tracking-wide">
                          "{story.title}"
                        </div>
                        <p className="text-sm md:text-base text-purple-900/80 font-medium max-w-md mx-auto italic">
                          "Chào mừng các bé đến với cuốn sách cổ tích tuyệt vời này. Hãy lật trang bên dưới để bắt đầu lớp học thông thái nhé!"
                        </p>

                        {/* Sparkly prompt */}
                        <div className="mt-4 flex justify-center">
                          <button
                            onClick={() => triggerPageTransition(0)}
                            className="py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl transition flex items-center gap-1.5 shadow-lg"
                          >
                            Bắt Đầu Học Ngay Chữ Cái <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* --- CASE B: STORY CONTENT PAGE --- */
                      <div className="flex flex-col gap-5 text-gray-850">

                        {/* HIGH-END LEARNING METHOD SELECTOR BAR */}
                        <div className="bg-amber-100/50 p-2 rounded-2xl border-2 border-amber-300/60 flex flex-col md:flex-row md:items-center justify-between gap-2.5 shadow-sm">
                          <span className="text-[10px] font-black text-amber-900 uppercase tracking-widest px-2 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                            Phương Pháp Học:
                          </span>
                          
                          <div className="flex flex-wrap gap-1">
                            <button
                              onClick={() => {
                                setLearnMode("flashcard");
                                setBeeSpeech("Bzz... Chế độ phát âm & thẻ nhớ từ vựng. Nhấp vào từ để Ong hướng dẫn bé nha!");
                              }}
                              className={`py-1.5 px-3 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                                learnMode === "flashcard" 
                                  ? "bg-purple-600 text-white shadow" 
                                  : "bg-white hover:bg-amber-50/50 text-purple-900 border border-amber-200"
                              }`}
                            >
                              <BookMarked className="w-3.5 h-3.5" /> Thẻ Từ Vựng & Dịch
                            </button>

                            <button
                              onClick={() => {
                                setLearnMode("scramble");
                                setScrambleIndex(0);
                                setBeeSpeech("Bzz... Trò chơi ghép chữ thần tốc! Nhấp chọn các chữ cái theo đúng thứ tự spelling nhé!");
                              }}
                              className={`py-1.5 px-3 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                                learnMode === "scramble" 
                                  ? "bg-purple-600 text-white shadow" 
                                  : "bg-white hover:bg-amber-50/50 text-purple-900 border border-amber-200"
                              }`}
                            >
                              <Gamepad2 className="w-3.5 h-3.5" /> Ghép Chữ
                            </button>

                            <button
                              onClick={() => {
                                setLearnMode("fillBlank");
                                setBeeSpeech("Bzz... Hãy rèn luyện phản xạ đọc hiểu bằng cách chọn từ vựng còn thiếu điền vào câu!");
                              }}
                              className={`py-1.5 px-3 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                                learnMode === "fillBlank" 
                                  ? "bg-purple-600 text-white shadow" 
                                  : "bg-white hover:bg-amber-50/50 text-purple-900 border border-amber-200"
                              }`}
                            >
                              <CheckCircle className="w-3.5 h-3.5" /> Điền Khuyết Cổ Tích
                            </button>

                            <button
                              onClick={() => {
                                setLearnMode("shadowing");
                                setBeeSpeech("Bzz... Bé nhấp nút mic nói to theo câu tiếng Anh mẫu để Cát Tiên và Ong vàng đo điểm thưởng nhe!");
                              }}
                              className={`py-1.5 px-3 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                                learnMode === "shadowing" 
                                  ? "bg-purple-600 text-white shadow" 
                                  : "bg-white hover:bg-amber-50/50 text-purple-900 border border-amber-200"
                              }`}
                            >
                              <Mic className="w-3.5 h-3.5" /> Luyện Nói Shadowing
                            </button>
                          </div>
                        </div>

                        {/* METHOD RENDERER ROUTER */}
                        {learnMode === "flashcard" && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col gap-5"
                          >
                            {/* Large English sentences lesson block */}
                            <div>
                              <p className="text-xs font-sans text-amber-800 font-bold uppercase tracking-wider mb-1.5">📖 English Sentence:</p>
                              <div className="text-lg md:text-xl font-bold font-serif text-gray-800 leading-relaxed bg-[#FFFDF5] p-5 rounded-2xl border-2 border-yellow-250/60 shadow-sm relative">
                                <span className="text-yellow-500 opacity-20 font-serif text-3xl absolute -top-1 -left-1">“</span>
                                {story.pages[currentPageIndex].englishText}
                              </div>
                            </div>

                            {/* Bilingual Switch translation block */}
                            <div>
                              <div className="flex justify-between items-center mb-1.5">
                                <span className="text-xs font-sans text-amber-800 font-bold uppercase tracking-wider">🇻🇳 Bản dịch tiếng Việt:</span>
                                <button
                                  onClick={() => setShowTranslation(!showTranslation)}
                                  className="text-xs text-purple-700 font-bold hover:underline cursor-pointer"
                                >
                                  {showTranslation ? "Ẩn bớt bản dịch" : "Xem dịch tiếng Việt"}
                                </button>
                              </div>

                              <div className="min-h-[50px] bg-[#FFFBEB] p-4 rounded-xl border border-yellow-200/60 text-sm leading-relaxed text-gray-700">
                                {showTranslation ? (
                                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-semibold text-gray-800">
                                    {story.pages[currentPageIndex].vietnameseText}
                                  </motion.p>
                                ) : (
                                  <button
                                    onClick={() => setShowTranslation(true)}
                                    className="w-full text-xs text-amber-700/70 italic flex items-center gap-1.5 justify-center py-1.5 hover:text-amber-800 transition cursor-pointer"
                                  >
                                    <HelpCircle className="w-3.5 h-3.5 text-amber-500" /> Hãy nhấn 'Xem Dịch' để đối chiếu nghĩa nhé!
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* VOCABULARY MEMORY FLASHCARDS (Kéo bảng) */}
                            <div>
                              <p className="text-xs font-sans text-amber-800 font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" /> Chú Ong Dạy Từ Vựng Mới (Bấm Để Học):
                              </p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {story.pages[currentPageIndex].vocabulary.map((vocab, vIdx) => (
                                  <button
                                    key={vIdx}
                                    onClick={() => {
                                      setSelectedVocabIndex(vIdx);
                                      setBeeSpeech(`Bzz... "${vocab.word}" phát âm là ${vocab.pronunciation}. Nghĩa là: ${vocab.meaning}!`);
                                      
                                      // Speak specific word
                                      const speech = new SpeechSynthesisUtterance(vocab.word);
                                      speech.lang = "en-US";
                                      window.speechSynthesis.speak(speech);
                                    }}
                                    className={`p-4 rounded-xl border-2 text-left transition cursor-pointer flex flex-col gap-1 relative ${
                                      selectedVocabIndex === vIdx 
                                        ? "bg-yellow-400 border-yellow-500 text-amber-950 scale-102 shadow-md" 
                                        : "bg-white border-yellow-200/60 text-gray-700 hover:border-purple-300 hover:bg-purple-50/20"
                                    }`}
                                  >
                                    {selectedVocabIndex === vIdx && (
                                      <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-purple-600 animate-ping"></span>
                                    )}
                                    <div className="font-extrabold text-base font-sans flex items-center justify-between">
                                      <span className={selectedVocabIndex === vIdx ? "text-purple-950 text-base" : "text-purple-900 font-bold"}>
                                        {vocab.word}
                                      </span>
                                      <span className={`text-[10px] font-mono ${selectedVocabIndex === vIdx ? "text-amber-950/80" : "text-gray-400"}`}>{vocab.pronunciation}</span>
                                    </div>
                                    <div className={`text-xs font-medium ${selectedVocabIndex === vIdx ? "text-purple-950 font-bold" : "text-gray-500"}`}>
                                      {vocab.meaning}
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Interactive short quiz from the smart Bee character */}
                            {selectedVocabIndex !== null && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-purple-50/70 p-4 rounded-xl border border-purple-200/60 font-sans"
                              >
                                <div className="flex items-center gap-1.5 mb-2">
                                  <span className="text-sm">🐝</span>
                                  <p className="text-xs text-purple-900 font-bold uppercase tracking-wider">Thử Thách Nhanh Cùng Chị Ong:</p>
                                </div>
                                
                                <p className="text-xs text-gray-600 mb-3 font-semibold">
                                  Từ vựng <span className="text-purple-950 font-bold">"{story.pages[currentPageIndex].vocabulary[selectedVocabIndex].word}"</span> có nghĩa là gì dưới đây?
                                </p>

                                <div className="flex flex-wrap gap-2">
                                  {[
                                    story.pages[currentPageIndex].vocabulary[selectedVocabIndex].meaning,
                                    ...story.pages[currentPageIndex].vocabulary.filter((_, i) => i !== selectedVocabIndex).map(v => v.meaning)
                                  ].sort().map((choice, cIdx) => (
                                    <button
                                      key={cIdx}
                                      disabled={quizAnswered}
                                      onClick={() => handleAnswerQuiz(choice, story.pages[currentPageIndex].vocabulary[selectedVocabIndex!].meaning)}
                                      className={`py-1.5 px-3 rounded-lg text-xs font-bold border-2 transition cursor-pointer ${
                                        quizAnswered 
                                          ? choice === story.pages[currentPageIndex].vocabulary[selectedVocabIndex!].meaning
                                            ? "bg-green-600 border-green-550 text-white"
                                            : "bg-red-50 border-red-200 text-red-500"
                                          : "bg-white border-yellow-250 hover:border-purple-400 hover:bg-purple-100/30 text-gray-700"
                                      }`}
                                    >
                                      {choice}
                                    </button>
                                  ))}
                                </div>

                                {/* Quiz answer result description */}
                                {quizAnswered && (
                                  <div className="mt-3 text-xs leading-relaxed font-bold flex items-center gap-1.5 text-purple-900">
                                    {quizSuccess ? (
                                      <span>🎉 Bạn trả lời đúng rồi! (+5 Điểm học tập)</span>
                                    ) : (
                                      <span className="text-red-700">💪 Hãy thử ôn lại xem từ vựng bên trên để ghi nhớ tốt hơn!</span>
                                    )}
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </motion.div>
                        )}

                        {learnMode === "scramble" && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col gap-4 font-sans"
                          >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 border-b border-amber-200/40 pb-2.5">
                              <span className="text-xs font-black text-amber-900 uppercase">Chọn từ để ôn ghép chữ:</span>
                              <div className="flex flex-wrap gap-1">
                                {story.pages[currentPageIndex].vocabulary.map((vocab, vIdx) => (
                                  <button
                                    key={vIdx}
                                    onClick={() => setScrambleIndex(vIdx)}
                                    className={`py-1 px-3 rounded-xl text-xs font-black transition cursor-pointer border ${
                                      scrambleIndex === vIdx 
                                        ? "bg-amber-500 border-amber-600 text-amber-950 shadow" 
                                        : "bg-white border-amber-200 text-gray-700 hover:bg-amber-50"
                                    }`}
                                  >
                                    {vocab.word}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="bg-[#FFFDF5] p-4 rounded-2xl border-2 border-dashed border-amber-300 text-center relative shadow-inner">
                              <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-bold uppercase absolute -top-2 px-3 left-1/2 -translate-x-1/2">
                                Gợi ý nghĩa
                              </span>
                              <p className="text-sm font-bold text-gray-800 mt-1 italic">
                                "{story.pages[currentPageIndex].vocabulary[scrambleIndex]?.meaning || story.pages[currentPageIndex].vocabulary[0]?.meaning}"
                              </p>
                              <p className="text-[10px] text-gray-400 mt-1 font-mono">
                                Phiên âm: /{story.pages[currentPageIndex].vocabulary[scrambleIndex]?.pronunciation || story.pages[currentPageIndex].vocabulary[0]?.pronunciation}/
                              </p>
                              {scrambleShowHint && (
                                <p className="text-xs font-bold text-purple-700 mt-1.5 font-mono">
                                  Đáp án đúng: {(story.pages[currentPageIndex].vocabulary[scrambleIndex]?.word || "").toUpperCase()}
                                </p>
                              )}
                            </div>

                            <div className="my-3 text-center">
                              <p className="text-xs text-amber-800 font-bold uppercase tracking-wider mb-2">Từ Đang Ghép:</p>
                              <div className="flex flex-wrap justify-center gap-2 min-h-[50px] items-center">
                                {Array.from({ length: (story.pages[currentPageIndex].vocabulary[scrambleIndex]?.word || "").replace(/[^a-zA-Z]/g, "").length }).map((_, i) => {
                                  // Get which index was clicked for this position
                                  const clickedIdx = scrambleAttempt[i];
                                  const letter = clickedIdx !== undefined ? scrambledLetters[clickedIdx] : null;
                                  return (
                                    <motion.div
                                      key={i}
                                      animate={scrambleIsCorrect === false ? { x: [-4, 4, -4, 4, 0] } : {}}
                                      className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center font-extrabold text-xl shadow-sm ${
                                        letter
                                          ? scrambleIsCorrect
                                            ? "bg-green-600 border-green-700 text-white"
                                            : "bg-purple-600 border-purple-700 text-white"
                                          : "bg-amber-50/80 border-dashed border-amber-300 text-amber-300 font-mono text-xs"
                                      }`}
                                    >
                                      {letter || "?"}
                                    </motion.div>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="text-center">
                              <p className="text-xs text-gray-400 font-bold mb-2 uppercase tracking-wider">Hộp Chữ Cái (Nhấp để chọn):</p>
                              <div className="flex flex-wrap justify-center gap-2.5">
                                {scrambledLetters.map((char, charIdx) => {
                                  const isSelected = scrambleAttempt.includes(charIdx);
                                  return (
                                    <button
                                      key={charIdx}
                                      disabled={isSelected || scrambleAnswered}
                                      onClick={() => {
                                        const nextAttempt = [...scrambleAttempt, charIdx];
                                        setScrambleAttempt(nextAttempt);

                                        try {
                                          const s = new SpeechSynthesisUtterance(char.toLowerCase());
                                          s.lang = "en-US";
                                          window.speechSynthesis.speak(s);
                                        } catch (e) {}

                                        const targetWordClean = (story.pages[currentPageIndex].vocabulary[scrambleIndex]?.word || "").toUpperCase().replace(/[^A-Z]/g, "");
                                        if (nextAttempt.length === targetWordClean.length) {
                                          const spelledStr = nextAttempt.map(idx => scrambledLetters[idx]).join("");
                                          setScrambleAnswered(true);
                                          if (spelledStr === targetWordClean) {
                                            setScrambleIsCorrect(true);
                                            setQuizScore(s => s + 5);
                                            setBeeSpeech(`Bzz... Quá siêu luôn! Bé đã tìm đúng các chữ cái để ghép thành từ "${targetWordClean}"! Ong vàng cộng 5 điểm thưởng!`);
                                          } else {
                                            setScrambleIsCorrect(false);
                                            setBeeSpeech(`Bzzt... Ghép chưa trúng rồi bé ơi. Bé ấn 'Đặt Lại' để thử gắn gỗ ghép lại nhe!`);
                                          }
                                        }
                                      }}
                                      className={`w-12 h-12 rounded-full font-black text-lg transition flex items-center justify-center shadow-md cursor-pointer ${
                                        isSelected 
                                          ? "bg-amber-200/20 text-transparent border border-dashed border-amber-300/40 cursor-not-allowed" 
                                          : "bg-yellow-400 hover:bg-yellow-500 border-2 border-yellow-500 cursor-pointer active:scale-90 text-amber-950"
                                      }`}
                                    >
                                      {char}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="flex justify-center gap-3.5 mt-3 border-t border-amber-200/50 pt-3">
                              <button
                                onClick={() => {
                                  setScrambleAttempt([]);
                                  setScrambleAnswered(false);
                                  setScrambleIsCorrect(null);
                                  setBeeSpeech("Bzz... Sắp xếp lại gỗ chữ và ghép từ vựng thông thái nhé!");
                                }}
                                className="py-2 px-4 bg-white border-2 border-amber-300 hover:bg-amber-50 text-amber-900 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                              >
                                <RefreshCw className="w-3.5 h-3.5" /> Gắn Lại Từ Đầu
                              </button>

                              <button
                                onClick={() => {
                                  setScrambleShowHint(!scrambleShowHint);
                                }}
                                className="py-2 px-4 bg-purple-50 hover:bg-purple-100 text-purple-950 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                              >
                                {scrambleShowHint ? "Ẩn gợi ý đáp án" : "Hiện đáp án đúng"}
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {learnMode === "fillBlank" && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col gap-4 font-sans"
                          >
                            <p className="text-xs font-sans text-amber-800 font-bold uppercase tracking-wider">
                              Hoàn thành cấu trúc câu truyện cổ bằng cách nhấp chọn từ còn thiếu:
                            </p>

                            <div className="text-lg md:text-xl font-bold font-serif text-gray-800 leading-relaxed bg-[#FFFDF5] p-5 rounded-2xl border-2 border-yellow-250/60 shadow-md text-center">
                              {(() => {
                                if (!blankTargetWord) return story.pages[currentPageIndex].englishText;
                                const regex = new RegExp(`\\b${blankTargetWord}\\b`, "i");
                                const parts = story.pages[currentPageIndex].englishText.split(regex);
                                if (parts.length < 2) return story.pages[currentPageIndex].englishText;
                                return (
                                  <span>
                                    {parts[0]}
                                    <span className={`inline-block py-0.5 px-4 rounded-xl border-2 border-dashed mx-2 font-sans ${
                                      blankResolved 
                                        ? blankIsCorrect 
                                          ? "bg-green-150 border-green-500 text-green-700 animate-pulse font-extrabold"
                                          : "bg-red-50 border-red-400 text-red-600 font-extrabold"
                                        : "bg-amber-100 border-amber-400 text-amber-700 font-mono tracking-widest text-sm"
                                    }`}>
                                      {blankResolved ? blankTargetWord.toUpperCase() : "_______"}
                                    </span>
                                    {parts[1]}
                                  </span>
                                );
                              })()}
                            </div>

                            <p className="text-xs text-amber-800/80 font-bold text-center italic">
                              💡 Bản dịch nghĩa: "{story.pages[currentPageIndex].vietnameseText}"
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                              {blankOptions.map((opt, vIdx) => (
                                <button
                                  key={vIdx}
                                  disabled={blankResolved}
                                  onClick={() => {
                                    setSelectedBlank(opt);
                                    setBlankResolved(true);
                                    const isCorrect = opt.toLowerCase().trim() === blankTargetWord.toLowerCase().trim();
                                    setBlankIsCorrect(isCorrect);
                                    if (isCorrect) {
                                      setQuizScore(s => s + 5);
                                      setBeeSpeech(`Bzz... Chúc mừng bạn! Điền từ "${opt}" hoàn toàn chính xác rồi! Ong vàng thưởng +5 điểm!`);
                                      try {
                                        const s = new SpeechSynthesisUtterance(opt);
                                        s.lang = "en-US";
                                        window.speechSynthesis.speak(s);
                                      } catch (e) {}
                                    } else {
                                      setBeeSpeech(`Bzzt... "${opt}" chưa chính xác. Ôn lại để điền lại chuẩn nhe!`);
                                    }
                                  }}
                                  className={`p-4 rounded-xl border-2 text-center transition cursor-pointer font-bold text-sm ${
                                    blankResolved
                                      ? opt.toLowerCase() === blankTargetWord.toLowerCase()
                                        ? "bg-green-600 border-green-650 text-white shadow"
                                        : opt === selectedBlank
                                          ? "bg-red-50 border-red-300 text-red-500 line-through"
                                          : "bg-white/50 border-gray-250 text-gray-400"
                                      : "bg-white border-yellow-250 hover:border-purple-400 text-purple-950 hover:bg-purple-100/35 shadow-sm active:scale-97"
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>

                            {blankResolved && (
                              <div className="flex justify-center mt-2.5">
                                <button
                                  onClick={() => {
                                    initLearningModeData(currentPageIndex, "fillBlank", story);
                                  }}
                                  className="py-1.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs transition flex items-center gap-1.5 cursor-pointer shadow-md"
                                >
                                  <RefreshCw className="w-3.5 h-3.5" /> Luyện Thêm Điền Khuyết (Reset)
                                </button>
                              </div>
                            )}
                          </motion.div>
                        )}

                        {learnMode === "shadowing" && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col gap-4 text-center font-sans"
                          >
                            <p className="text-xs text-amber-800 font-bold uppercase tracking-wider">
                              Hãy đọc to câu tiếng Anh thần tiên sau đây theo Ong Vàng nhé:
                            </p>

                            <div className="text-lg md:text-xl font-bold font-serif text-purple-950 leading-relaxed bg-white p-5 rounded-3xl border-2 border-purple-200 shadow-inner relative max-w-lg mx-auto">
                              "{story.pages[currentPageIndex].englishText}"
                            </div>

                            <div className="text-xs text-amber-900/80 font-bold font-mono tracking-wide">
                              🗣️ Thẻ phonetic mẫu: {story.pages[currentPageIndex].vocabulary.map(v => `${v.word} /${v.pronunciation}/`).join(" • ")}
                            </div>

                            <div className="flex flex-col items-center justify-center my-2 gap-4">
                              {isRecording ? (
                                <div className="flex items-end justify-center gap-1 h-12 w-full max-w-xs">
                                  {(voiceVolume.length > 0 ? voiceVolume : [35, 60, 45, 80, 50, 40, 75, 45, 64, 52]).map((vol, idx) => (
                                    <motion.div
                                      key={idx}
                                      animate={{ height: `${vol}%` }}
                                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                      className="w-1.5 bg-gradient-to-t from-purple-600 to-yellow-400 rounded-full"
                                      style={{ height: "40%" }}
                                    />
                                  ))}
                                </div>
                              ) : (
                                <div className="h-12 flex items-center text-xs text-slate-400 italic font-medium">
                                  {shadowScore !== null ? "Phân tích giọng nói diệu kỳ hoàn thành!" : "Nhấn nút Mic để bắt đầu nói to..."}
                                </div>
                              )}

                              <button
                                onClick={startVoiceRecording}
                                disabled={isRecording}
                                className={`w-16 h-16 rounded-full flex items-center justify-center transition shadow-lg relative cursor-pointer active:scale-95 ${
                                  isRecording
                                    ? "bg-red-500 text-white animate-pulse"
                                    : "bg-purple-600 hover:bg-purple-700 text-white"
                                }`}
                              >
                                {isRecording ? (
                                  <span className="w-5 h-5 bg-white rounded-sm animate-ping"></span>
                                ) : (
                                  <Mic className="w-7 h-7 text-yellow-300" />
                                )}
                                
                                {isRecording && (
                                  <span className="absolute inset-0 bg-red-400/30 rounded-full animate-ping pointer-events-none" />
                                )}
                              </button>

                              {shadowVerdict && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="bg-purple-50/90 border border-purple-200 text-purple-950 p-4 rounded-xl text-xs font-bold leading-relaxed max-w-md text-center shadow"
                                >
                                  {shadowScore !== null && (
                                    <div className="flex justify-center items-center gap-1.5 mb-1.5">
                                      <Trophy className="w-4 h-4 text-amber-500 animate-bounce" />
                                      <span className="text-yellow-600 font-extrabold text-sm">Điểm số: {shadowScore}%</span>
                                    </div>
                                  )}
                                  <p>{shadowVerdict}</p>
                                </motion.div>
                              )}
                            </div>

                            <p className="text-[10px] text-gray-400 font-mono max-w-sm mx-auto">
                              *Nhấn cho phép mở micro. Nếu thiết bị không có mic, Chị Ong sẽ tự đánh giá thông minh để rải bột sao cho bé ghi điểm!
                            </p>
                          </motion.div>
                        )}

                        <div className="text-[10px] text-amber-800/40 font-bold text-right flex justify-between items-center border-t border-amber-800/20 pt-2">
                          <span>Bản thiết kế Geometric Balance 📐</span>
                          <span>Chất liệu gỗ ấm thạch anh</span>
                        </div>

                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>

                {/* SMART BEE ELEMENT (Chị Ong bay lơ lửng điều khiển) */}
                <div className="flex self-end items-center gap-3 pr-4 -mt-3">
                  {/* Smart bee component */}
                  <SmartBee statusMessage="Chăm chỉ quá!" isBuzzing={selectedVocabIndex !== null} className="scale-90" />
                  
                  {/* Dynamic Speech bubble reflecting vocab clicked */}
                  <div className="bg-amber-100 text-amber-950 text-xs py-2 px-4.5 rounded-2xl border-2 border-amber-400 shadow-md relative max-w-xs font-medium leading-relaxed">
                    <strong>Chị Ong dạy:</strong> {beeSpeech}
                    <div className="absolute top-1/2 -right-3 -translate-y-1/2 border-8 border-transparent border-l-amber-100"></div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}


        {/* ================= STEP 4: GRADUATION TINKER BELL HELP GRANNY STREET MINI-GAME ================= */}
        {appState === "graduation" && story && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-white rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-amber-200"
          >
            {/* Header badge */}
            <div className="text-center mb-6">
              <span className="inline-block bg-yellow-400 text-amber-950 text-xs px-3 py-1 rounded-full font-black uppercase shadow tracking-wider">
                🌟 BÀI TẬP HOÀN THÀNH - GIÚP ĐỠ ĐỜI THƯỜNG! 🌟
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-purple-900 mt-2 mb-1">
                Giúp Bà Cụ Qua Đường Cùng Tinker Bell!
              </h2>
              <p className="text-xs text-gray-500 max-w-xl mx-auto">
                Khi câu chuyện học hoàn tất, cô tiên Tinker Bell sẽ vung chiếc đũa phép thuật diệu kỳ, tạo luồng hạt tiên để xe dừng lại và dìu bà cụ qua đường an toàn.
              </p>
            </div>

            {/* THE STREET STAGE VIEW */}
            <div className="w-full h-64 bg-sky-200 rounded-3xl border-4 border-amber-300 relative overflow-hidden shadow-inner mb-6">
              
              {/* Background mountain / sky sun graphics */}
              <div className="absolute top-4 left-1/3 text-6xl opacity-25">☁️</div>
              <div className="absolute top-8 right-16 text-6xl opacity-35">☁️</div>
              <div className="absolute top-4 right-10 w-12 h-12 bg-yellow-400 rounded-full blur-sm"></div>

              {/* Park grassy bank left (Nơi bà cụ bắt đầu) */}
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-500 rounded-tr-3xl z-10 border-t-2 border-green-400">
                <div className="absolute top-6 left-6 text-xl">🌳</div>
              </div>

              {/* Park grassy bank right (Nơi bà cụ muốn đến) */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-green-500 rounded-tl-3xl z-10 border-t-2 border-green-400">
                <div className="absolute top-4 right-6 text-2xl">🏡</div>
              </div>

              {/* ASPHALT ROAD & CROSSWALK */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gray-600 flex items-center justify-around z-0">
                {/* Yellow lines */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-400"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400"></div>

                {/* White Crosswalk stripes (Vạch kẻ đường cho người đi bộ) */}
                <div className="w-6 h-full bg-white opacity-90 transform -skew-x-12"></div>
                <div className="w-6 h-full bg-white opacity-90 transform -skew-x-12"></div>
                <div className="w-6 h-full bg-white opacity-90 transform -skew-x-12"></div>
                <div className="w-6 h-full bg-white opacity-90 transform -skew-x-12"></div>
                <div className="w-6 h-full bg-white opacity-90 transform -skew-x-12"></div>
                <div className="w-6 h-full bg-white opacity-90 transform -skew-x-12"></div>
              </div>

              {/* CAR WAITING BEHIND THE CROSSWALK */}
              <motion.div 
                className="absolute bottom-8 right-32 z-5 text-4xl"
                animate={isWandCasting ? { x: [0, 10, 0] } : { y: [-1, 1, -1] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                🚙
                {/* Small caution text */}
                <span className="absolute -top-6 -left-2 bg-yellow-400 text-[8px] text-amber-950 px-1 py-0.5 rounded font-black border border-amber-950 uppercase">
                  STOP
                </span>
              </motion.div>

              {/* FLOATING CUTE TINKER BELL (Cô tiên lơ lửng giữa trời) */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
                <TinkerBell isCasting={isWandCasting} className="scale-100" />
              </div>

              {/* GRANNY MASCOT ACTOR */}
              <motion.div
                className="absolute bottom-6 z-15"
                initial={{ left: 10 }}
                animate={{ left: 10 + (grannyPosition * 3.5) }} // moves incrementally on step
                transition={{ duration: 3, ease: "easeInOut" }}
              >
                <OldLady isWalking={isWandCasting} className="scale-80 origin-bottom" />
                
                {/* Granny state speech balloon */}
                {grannyFinished && (
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-16 -left-12 bg-white text-purple-950 text-[10px] p-2 rounded-xl shadow-lg border border-purple-200 z-30 font-black tracking-tight whitespace-nowrap"
                  >
                    👵 Cảm ơn con! Thank you! ❤️
                    <div className="absolute top-full left-1/3 border-8 border-transparent border-t-white"></div>
                  </motion.div>
                )}
              </motion.div>

              {/* Sparkling light particles left to right when wizard wand hits */}
              {isWandCasting && (
                <div className="absolute inset-0 bg-yellow-400/10 pointer-events-none mix-blend-overlay animate-pulse z-10" />
              )}
            </div>

            {/* Interactive Control Deck */}
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between p-6 bg-amber-50 rounded-2xl border border-amber-200">
              
              <div className="flex items-start gap-3 flex-1">
                <div className="text-3xl">🧚‍♀️</div>
                <div>
                  <h4 className="font-extrabold text-purple-900 text-sm">Lời Nhắc Diệu Kỳ Từ Tinker Bell:</h4>
                  <p className="text-xs text-purple-950 font-bold leading-relaxed mt-1 italic">
                    "{tinkerSpeech}"
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  disabled={isWandCasting || grannyFinished}
                  onClick={handleTinkerBellSpell}
                  className="py-4.5 px-8 rounded-2xl bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-black text-sm shadow-xl hover:shadow-2xl transition cursor-pointer flex items-center gap-2 active:scale-95 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" /> Vẩy Đũa Phép Thuật Giúp Bà ✨
                </button>

                <button
                  onClick={() => {
                    setAppState("home");
                    setStory(null);
                    setTopicInput("");
                    setQuizScore(0);
                    setGrannyFinished(false);
                    setGrannyPosition(0);
                    setTinkerSpeech("Hãy nhấp đũa phép để Tinker dùng ma thuật giúp bà qua đường nhé!");
                  }}
                  className="py-4.5 px-6 rounded-2xl bg-white border-2 border-purple-200 hover:bg-purple-50 text-purple-900 font-bold text-sm transition cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-4 h-4" /> Học Câu Khác
                </button>
              </div>

            </div>

            {/* GRADUATION CONGRATULATIONS AND LESSON METRICS (Đặc sắc) */}
            {grannyFinished && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-[#1a2d1f] text-white rounded-3xl border-4 border-yellow-400 relative overflow-hidden shadow-2xl"
              >
                
                {/* Glittering sparkles */}
                <div className="absolute -top-6 -right-6 text-6xl opacity-20">✨</div>
                <div className="absolute -bottom-6 -left-6 text-6xl opacity-20">✨</div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">🏆</span>
                      <h3 className="text-lg font-black text-yellow-300 uppercase tracking-widest leading-none">Bằng Học Tập Danh Dự</h3>
                    </div>
                    <p className="text-sm font-bold text-green-200">
                      Cực kỳ tuyệt vời! Bé đã học xong chuyện: "{story.title}"
                    </p>
                    <p className="text-xs text-[#a3cfae] leading-relaxed mt-1 max-w-xl">
                      Bạn và cô tiên Tinker Bell đã làm một việc tốt đáng khen ngợi. Chữ viết đẹp, từ vựng chuẩn chỉnh, cụ bà đi qua đường vô cùng hạnh phúc!
                    </p>
                  </div>
                  
                  {/* Score overview cards */}
                  <div className="bg-emerald-950 p-4 rounded-xl border border-yellow-400/40 text-center w-full md:w-max min-w-[150px] shadow-lg">
                    <div className="text-xs text-yellow-400 font-bold uppercase">Tổng Điểm Thưởng</div>
                    <div className="text-4xl font-extrabold text-white mt-1">{quizScore} 🌟</div>
                    <div className="text-[10px] text-gray-400 mt-1 font-mono">Bản tích lũy thần kì</div>
                  </div>
                </div>

                {/* Vocabulary Review set */}
                <div className="border-t border-emerald-900 grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 pt-5">
                  <div className="md:col-span-3 text-xs text-yellow-400 font-bold uppercase tracking-wider mb-1">
                    📒 Danh mục từ vựng đã thuộc lòng từ truyện:
                  </div>
                  {story.pages.flatMap(p => p.vocabulary).slice(0, 6).map((item, idx) => (
                    <div key={idx} className="bg-emerald-950/50 p-3 rounded-lg border border-emerald-900/60 flex flex-col justify-between">
                      <div className="font-extrabold text-yellow-400 text-sm font-mono">{item.word}</div>
                      <div className="text-xs text-green-200 mt-0.5">{item.meaning}</div>
                      <div className="text-[10px] text-gray-400 italic mt-1 bg-[#152319] p-1.5 rounded">{item.example}</div>
                    </div>
                  ))}
                </div>

              </motion.div>
            )}

          </motion.div>
        )}

      </main>


      {/* ================= EXTRA: LEAF CANOPY TRANSITION OVERLAY SCREEN (Tán lá che kín màn hình) ================= */}
      <AnimatePresence>
        {leafStage !== "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-[#0d2110]/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 shadow-2xl overflow-hidden pointer-events-auto select-none"
          >
            {/* Dense layered real foliage canopy of vector leaves */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {CANOPY_LEAVES.map((leaf, index) => (
                <motion.div
                  key={index}
                  custom={leaf}
                  initial={{ scale: 0, opacity: 0, rotate: leaf.rotate - 45 }}
                  animate={{ 
                    scale: leaf.scale, 
                    opacity: 1, 
                    rotate: leaf.rotate,
                    x: 0,
                    y: 0
                  }}
                  exit={{ 
                    scale: 0, 
                    opacity: 0, 
                    rotate: leaf.rotate + 60,
                    y: 100 // flutter downward
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 70, 
                    damping: 14, 
                    delay: leaf.delay
                  }}
                  className="absolute origin-center w-24 h-24"
                  style={{
                    left: leaf.left,
                    top: leaf.top,
                  }}
                >
                  <CanopyLeafSVG color={leaf.color} />
                </motion.div>
              ))}
            </div>

            {/* Magical center board/plaque explaining the stage transformation */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 100, damping: 15 }}
              className="relative z-20 bg-[#FFFDF5] text-gray-800 p-8 rounded-3xl border-[12px] border-[#8B5E3C] shadow-[0_16px_0_#5D3E28] max-w-sm text-center flex flex-col items-center justify-center gap-4"
            >
              <div className="relative">
                <span className="text-4xl filter drop-shadow-md animate-bounce inline-block">🧚‍♀️✨</span>
                <motion.span 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="absolute -top-1 -right-2 text-xl"
                >
                  🌟
                </motion.span>
              </div>
              
              <h3 className="text-xl font-bold font-serif text-purple-950 uppercase tracking-widest leading-none">
                Tán Lá Diệu Kỳ
              </h3>
              
              <p className="text-xs text-amber-900/90 font-bold leading-relaxed max-w-xs italic">
                "{currentPageIndex === -1 
                  ? "Kiến Tím đang gọt sáp chì vẽ bản phác bìa thần kì..." 
                  : "Chị Ong giặt xà bông thơm bảng phấn, lật trang tiếp sau..."}"
              </p>

              {/* Glowing magic line loading helper */}
              <div className="w-full bg-amber-100 h-2.5 rounded-full overflow-hidden border border-amber-200 shadow-inner mt-1">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="bg-gradient-to-r from-green-500 to-yellow-400 h-full"
                />
              </div>
              <span className="text-[10px] font-sans font-bold text-gray-400 uppercase tracking-wider">
                Đang chuẩn bị trang truyện...
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= EXTRA: CUSTOM MOUSE CURSOR ================= */}
      {useCustomCursor && isInside && (
        <div 
          className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out select-none"
          style={{ 
            left: mousePos.x, 
            top: mousePos.y,
            transform: `translate(-4px, -4px) ${isPressed ? 'scale(0.8) rotate(-10deg)' : 'scale(1)'}`
          }}
        >
          {isPressed ? YELLOW_LEAF_CURSOR : GREEN_LEAF_CURSOR}
        </div>
      )}

    </div>
  );
}
