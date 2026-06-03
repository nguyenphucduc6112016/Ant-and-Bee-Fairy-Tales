import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini client on the server.
  // Set User-Agent to 'aistudio-build' as specified in guidelines
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Helper function to draw beautiful children-friendly cartoon vector graphics in fallback scenarios
  function getFallbackSvg(theme: string, pageNum: number, eng: string, vi: string): string {
    let bgColor = "#ECFDF5"; // Emerald light
    let mainColor = "#10B981";
    let accentColor = "#F59E0B";

    if (theme === "insect") {
      bgColor = "#FAF5FF"; // Purple light
      mainColor = "#8B5CF6"; // Purple
      accentColor = "#FBBF24"; // Amber gold
    } else if (theme === "pet") {
      bgColor = "#FEF2F2"; // Rose light
      mainColor = "#F87171"; // Coral
      accentColor = "#FCD34D"; // Yellow
    } else {
      bgColor = "#EFF6FF"; // Blue light
      mainColor = "#3B82F6"; // Vivid blue
      accentColor = "#F472B6"; // Pink
    }

    const sunX = 400;
    const sunY = 70;
    const sunR = pageNum === 0 ? 45 : 30;

    let elements = "";
    if (pageNum === 0) {
      elements = `
        <!-- Clouds -->
        <path d="M 50 120 Q 75 100 100 120 Q 125 100 150 120 L 150 150 L 50 150 Z" fill="#FFFFFF" opacity="0.95" />
        <path d="M 320 140 Q 340 120 360 140 Q 380 120 400 140 L 400 170 L 320 170 Z" fill="#FFFFFF" opacity="0.95" />
        
        <!-- Big tree backdrop -->
        <path d="M 250 200 C 200 200 120 280 120 350 L 380 350 C 380 280 300 200 250 200 Z" fill="${mainColor}" opacity="0.3" />
        
        <!-- Character Avatar Ring -->
        <circle cx="250" cy="230" r="65" fill="#FFFFFF" stroke="${mainColor}" stroke-width="6" />
        
        <!-- Avatar elements -->
        ${theme === "insect" ? `
          <circle cx="225" cy="230" r="18" fill="#8B5CF6" />
          <circle cx="215" cy="225" r="5" fill="#FFFFFF" /> <circle cx="215" cy="225" r="2.5" fill="#000000" />
          <circle cx="270" cy="230" r="18" fill="#FBBF24" />
          <ellipse cx="270" cy="215" rx="14" ry="7" fill="#E0F2FE" opacity="0.8" />
          <path d="M 265 230 L 275 230" stroke="#000000" stroke-width="2" />
        ` : theme === "pet" ? `
          <circle cx="225" cy="230" r="18" fill="#FFFFFF" stroke="#F87171" stroke-width="1" />
          <polygon points="212,215 220,205 225,215" fill="#FDA4AF" />
          <polygon points="238,215 230,205 225,215" fill="#FDA4AF" />
          <circle cx="220" cy="228" r="2" fill="#000000" /> <circle cx="230" cy="228" r="2" fill="#000000" />
          <circle cx="270" cy="230" r="18" fill="#D97706" />
          <circle cx="265" cy="228" r="2" fill="#FFFFFF" /> <circle cx="275" cy="228" r="2" fill="#FFFFFF" />
        ` : `
          <circle cx="250" cy="230" r="20" fill="#FFEDD5" />
          <path d="M 230 215 C 240 200 260 200 270 215 Z" fill="#F59E0B" />
          <circle cx="245" cy="228" r="2" fill="#000000" /> <circle cx="255" cy="228" r="2" fill="#000000" />
          <path d="M 245 238 Q 250 242 255 238" stroke="#000000" stroke-width="2" fill="none" />
        `}

        <!-- Storybook title banner -->
        <rect x="50" y="300" width="400" height="70" rx="15" fill="#FFFFFF" opacity="0.9" stroke="${mainColor}" stroke-width="3" />
        <text x="250" y="332" font-family="'Comic Sans MS', sans-serif, system-ui" font-size="20" font-weight="bold" fill="#1F2937" text-anchor="middle">
          ${theme === "insect" ? "Andy & Bella's Story" : theme === "pet" ? "Mimi & Bobby's Day" : "The Explorer's Dream"}
        </text>
        <text x="250" y="356" font-family="'Comic Sans MS', sans-serif, system-ui" font-size="14" fill="#6B7280" text-anchor="middle">
          Kiến Tím & Chị Ong Vàng Đồng Hành
        </text>
      `;
    } else {
      const grassDepth = 300 + (pageNum * 5) % 30;
      elements = `
        <g opacity="0.6">
          <path d="M 100 80 Q 110 70 120 80 Q 130 70 140 80" stroke="#4B5563" stroke-width="2" fill="none" />
          <path d="M 280 60 Q 290 50 300 60 Q 310 50 320 60" stroke="#4B5563" stroke-width="2" fill="none" />
        </g>
        
        <polygon points="120,${grassDepth} 200,180 280,${grassDepth}" fill="#D1FAE5" opacity="0.5" />
        <polygon points="260,${grassDepth} 350,150 440,${grassDepth}" fill="#A7F3D0" opacity="0.3" />

        <g transform="translate(40, ${grassDepth - 80}) scale(0.8)" opacity="0.8">
          <rect x="0" y="40" width="60" height="50" fill="#FEE2E2" stroke="#991B1B" stroke-width="2" />
          <polygon points="-10,40 30,10 70,40" fill="#EF4444" stroke="#991B1B" stroke-width="2" />
          <rect x="20" y="60" width="20" height="30" fill="#B45309" />
          <circle cx="15" cy="55" r="5" fill="#FBBF24" />
        </g>

        <g transform="translate(190, 0)">
           <circle cx="20" cy="${grassDepth + 20}" r="8" fill="#F87171" />
           <rect x="18" y="${grassDepth + 20}" width="4" height="15" fill="#FFFFFF" />
           <circle cx="50" cy="${grassDepth + 25}" r="6" fill="#FBBF24" />
           <rect x="48" y="${grassDepth + 25}" width="4" height="12" fill="#FFFFFF" />
        </g>

        ${theme === "insect" ? `
          <g transform="translate(${50 + (pageNum * 28) % 150}, ${grassDepth - 35})">
            <ellipse cx="40" cy="20" rx="15" ry="10" fill="#8B5CF6" />
            <ellipse cx="20" cy="20" rx="10" ry="10" fill="#8B5CF6" />
            <circle cx="10" cy="15" r="8" fill="#8B5CF6" />
            <circle cx="8" cy="13" r="1.5" fill="#FFFFFF" />
            <path d="M 20 28 L 15 38" stroke="#7C3AED" stroke-width="2" />
            <path d="M 30 28 L 30 38" stroke="#7C3AED" stroke-width="2" />
            <path d="M 40 28 L 45 38" stroke="#7C3AED" stroke-width="2" />
            <path d="M 5 8 Q 0 0 5 0" stroke="#7C3AED" stroke-width="1.5" fill="none" />
            <circle cx="30" cy="20" r="4" fill="#FBBF24" />
          </g>
          
          ${pageNum >= 2 ? `
            <g transform="translate(${300 - (pageNum * 15) % 120}, ${120 + (pageNum * 10) % 65})">
              <ellipse cx="25" cy="-8" rx="10" ry="18" fill="#E0F2FE" opacity="0.8" stroke="#0284C7" stroke-width="1" />
              <ellipse cx="38" cy="-8" rx="8" ry="15" fill="#E0F2FE" opacity="0.6" stroke="#0284C7" stroke-width="1" />
              <ellipse cx="30" cy="10" rx="20" ry="14" fill="#FBBF24" stroke="#D97706" stroke-width="2" />
              <path d="M 23 -1 A 14 14 0 0 0 23 21" stroke="#1F2937" stroke-width="2.5" fill="none" />
              <path d="M 33 -3 A 14 14 0 0 0 33 23" stroke="#1F2937" stroke-width="2.5" fill="none" />
              <circle cx="12" cy="10" r="10" fill="#FBBF24" stroke="#D97706" stroke-width="2" />
              <circle cx="10" cy="8" r="1.5" fill="#1F2937" />
              <path d="M 8 13 Q 12 16 14 13" stroke="#1F2937" stroke-width="1.5" fill="none" />
            </g>
          ` : ""}
          
          ${pageNum === 2 || pageNum === 4 || pageNum === 8 ? `
            <g transform="translate(180, ${grassDepth - 25})">
              <polygon points="0,15 20,0 45,10 40,30 10,25" fill="#E0F2FE" stroke="#38BDF8" stroke-width="2" />
              <polygon points="10,20 18,5 25,12" fill="#FFFFFF" opacity="0.7" />
              <text x="22" y="38" font-size="9" fill="#0369A1" font-weight="bold" font-family="monospace">SUGAR</text>
            </g>
          ` : ""}
        ` : theme === "pet" ? `
          <g transform="translate(${60 + (pageNum * 20) % 130}, ${grassDepth - 45})">
            <ellipse cx="30" cy="30" rx="16" ry="12" fill="#FFFFFF" stroke="#F43F5E" stroke-width="1.5" />
            <circle cx="30" cy="14" r="13" fill="#FFFFFF" stroke="#F43F5E" stroke-width="1.5" />
            <polygon points="18,8 14,-2 25,4" fill="#FDA4AF" />
            <polygon points="42,8 46,-2 35,4" fill="#FDA4AF" />
            <circle cx="26" cy="12" r="1.5" fill="#0F172A" />
            <circle cx="34" cy="12" r="1.5" fill="#0F172A" />
            <polygon points="29,16 31,16 30,17.5" fill="#F43F5E" />
            <path d="M 15 14 L 5 13" stroke="#94A3B8" stroke-width="1" />
            <path d="M 15 16 L 4 17" stroke="#94A3B8" stroke-width="1" />
            <path d="M 45 14 L 55 13" stroke="#94A3B8" stroke-width="1" />
            <circle cx="30" cy="22" r="4" fill="#F43F5E" />
            <path d="M 45 32 Q 55 25 50 15" stroke="#FFFFFF" stroke-width="4.5" fill="none" stroke-linecap="round" />
          </g>
          
          <g transform="translate(${250 - (pageNum * 12) % 100}, ${grassDepth - 48})">
            <ellipse cx="40" cy="32" rx="20" ry="14" fill="#D97706" />
            <circle cx="22" cy="18" r="14" fill="#D97706" />
            <path d="M 16 8 Q 8 12 12 24 Q 18 20 18 10" fill="#B45309" />
            <circle cx="18" cy="15" r="2" fill="#FFFFFF" />
            <circle cx="18" cy="15" r="1" fill="#000000" />
            <circle cx="12" cy="18" r="3" fill="#000000" />
            <path d="M 58 28 Q 70 20 65 15" stroke="#D97706" stroke-width="4.5" fill="none" stroke-linecap="round" />
          </g>
          
          <g transform="translate(${160 + (pageNum * 25) % 100}, ${grassDepth - 20})">
            <circle cx="15" cy="15" r="12" fill="#EF4444" />
            <circle cx="11" cy="11" r="3" fill="#FCA5A5" />
            <path d="M 3 15 Q 15 22 27 15" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round" />
          </g>
        ` : `
          <g transform="translate(${100 + (pageNum * 18) % 140}, ${grassDepth - 58})">
            <rect x="14" y="45" width="5" height="15" fill="#B45309" />
            <rect x="25" y="45" width="5" height="15" fill="#B45309" />
            <rect x="8" y="24" width="28" height="25" rx="5" fill="#FBBF24" />
            <circle cx="22" cy="13" r="11" fill="#FFD8A8" />
            <path d="M 6 5 C 10 -5 34 -5 38 5 Z" fill="#D97706" />
            <ellipse cx="22" cy="6" rx="20" ry="2" fill="#B45309" />
            <circle cx="18" cy="11" r="1.5" fill="#000000" />
            <circle cx="26" cy="11" r="1.5" fill="#000000" />
            <path d="M 18 16 Q 22 19 26 16" stroke="#000000" stroke-width="1.5" fill="none" />
            <rect x="-2" y="26" width="10" height="18" rx="2" fill="#10B981" />
          </g>
          
          ${pageNum >= 7 ? `
            <g transform="translate(320, ${grassDepth - 40})">
              <rect x="0" y="15" width="50" height="30" fill="#F59E0B" rx="3" stroke="#78350F" stroke-width="2.5" />
              <path d="M -5 15 L 55 15 L 45 0 L 5 0 Z" fill="#D97706" stroke="#78350F" stroke-width="2.5" />
              <polygon points="25,-10 27,-2 35,0 27,2 25,10 23,2 15,0 23,-2" fill="#FBBF24" />
              <polygon points="5,-15 7,-10 12,-9 7,-8 5,-3 3,-8 -2,-9 3,-10" fill="#FDE047" />
            </g>
          ` : `
            <g transform="translate(330, 150)">
              <ellipse cx="20" cy="15" rx="14" ry="10" fill="#3B82F6" />
              <polygon points="6,15 0,10 8,8" fill="#FBBF24" />
              <circle cx="14" cy="12" r="1.5" fill="#FFFFFF" />
              <path d="M 15 20 Q 20 28 25 18" stroke="#3B82F6" stroke-width="2" fill="none" />
            </g>
          `}
        `}

        <!-- Bottom Ground overlay -->
        <path d="M 0 ${grassDepth} Q 150 ${grassDepth - 15} 300 ${grassDepth} T 500 ${grassDepth} L 500 400 L 0 400 Z" fill="#34D399" />
        <path d="M 0 ${grassDepth + 15} Q 250 ${grassDepth + 5} 500 ${grassDepth + 15} L 500 400 L 0 400 Z" fill="#059669" />

        <!-- Page counter tag -->
        <g transform="translate(440, 20)">
          <circle cx="20" cy="20" r="16" fill="#FFFFFF" stroke="${mainColor}" stroke-width="2" />
          <text x="20" y="25" font-family="sans-serif" font-weight="bold" font-size="13" fill="${mainColor}" text-anchor="middle">${pageNum}</text>
        </g>
      `;
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" width="100%" height="100%" style="background-color: ${bgColor}; border-radius: 12px; overflow: hidden; display: block; user-select: none;">
      <circle cx="${sunX}" cy="${sunY}" r="${sunR}" fill="#FDE047" opacity="0.95" />
      <circle cx="${sunX}" cy="${sunY}" r="${sunR + 10}" fill="#FEF08A" opacity="0.4" />
      ${elements}
    </svg>`;
  }

  // Fallback programmatic kids story builder when Gemini hits 503 capacity issues
  function generateFallbackStory(prompt: string) {
    const cleanAlert = (prompt || "").toLowerCase();
    
    // Theme 1: Insect (ant, bee, ong, kien)
    const isInsect = cleanAlert.includes("ant") || cleanAlert.includes("bee") || cleanAlert.includes("kiến") || cleanAlert.includes("ong") || cleanAlert.includes("insect") || cleanAlert.includes("chăm");
    
    // Theme 2: Pet (kitten, puppy, cat, dog, meo, cho)
    const isPet = cleanAlert.includes("cat") || cleanAlert.includes("dog") || cleanAlert.includes("mèo") || cleanAlert.includes("chó") || cleanAlert.includes("pet") || cleanAlert.includes("mimi") || cleanAlert.includes("bobby") || cleanAlert.includes("thỏ") || cleanAlert.includes("rabbit");
    
    let theme = "adventure";
    let title = "";
    let titleVi = "";
    
    if (isInsect) {
      theme = "insect";
      title = "The Busy Ant and the Golden Bee";
      titleVi = "Kiến Nhỏ Chăm Chỉ và Ong Vàng Huy Hoàng";
    } else if (isPet) {
      theme = "pet";
      title = "The Playful Kitten and the Tiny Puppy";
      titleVi = "Mèo Vàng Tinh Nghịch và Cún Con Bé Nhỏ";
    } else {
      theme = "adventure";
      const displayPrompt = prompt.length > 30 ? prompt.substring(0, 30) + "..." : prompt;
      title = `The Brave Child and the Magic of ${displayPrompt}`;
      titleVi = `Bé Dũng Cảm và Bí Mật Của ${displayPrompt}`;
    }

    const coverSvg = getFallbackSvg(theme, 0, title, titleVi);
    const pages: any[] = [];
    
    if (theme === "insect") {
      const insectPages = [
        {
          eng: "Andy is a tiny purple ant. He lives in a cozy underground nest.",
          vi: "Andy là một chú kiến nhỏ màu tím. Chú sống trong một chiếc tổ ấm áp dưới lòng đất.",
          vocab: [
            { word: "ant", pronunciation: "/ænt/", meaning: "con kiến", example: "The tiny ant carries a leafy seed." },
            { word: "underground", pronunciation: "/ˌʌndərˈɡraʊnd/", meaning: "dưới lòng đất", example: "Ants build their homes underground." },
            { word: "cozy", pronunciation: "/ˈkoʊzi/", meaning: "ấm cúng, dễ chịu", example: "Our room is very warm and cozy." }
          ]
        },
        {
          eng: "Andy finds a sweet sugar crystal. It is very heavy for a little ant.",
          vi: "Andy tìm thấy một viên đường ngọt lịm. Nó rất nặng so với một chú kiến nhỏ.",
          vocab: [
            { word: "sugar", pronunciation: "/ˈʃʊɡər/", meaning: "đường ngọt", example: "Sugar is very sweet." },
            { word: "crystal", pronunciation: "/ˈkrɪstl/", meaning: "tinh thể, viên", example: "She saw a beautiful salt crystal." },
            { word: "heavy", pronunciation: "/ˈhevi/", meaning: "nặng nề", example: "This big bag is too heavy for me." }
          ]
        },
        {
          eng: "Buzz! Buzz! Bella the golden bee flies down. 'Need some help, Andy?' she asks.",
          vi: "Vút! Vút! Bella - cô ong vàng bay xuống. 'Cậu cần tớ giúp một tay không Andy?' cô hỏi.",
          vocab: [
            { word: "bee", pronunciation: "/biː/", meaning: "con ong", example: "The golden bee makes sweet honey." },
            { word: "buzz", pronunciation: "/bʌz/", meaning: "tiếng vo ve", example: "We can hear the buzz of bees in summer." },
            { word: "fly", pronunciation: "/flaɪ/", meaning: "bay", example: "Birds can fly high in the sky." }
          ]
        },
        {
          eng: "Bella uses her wings to lift the sweet sugar. They work as a great team.",
          vi: "Bella dùng đôi cánh của mình để nhấc viên đường ngọt ngào. Họ làm việc cực kỳ ăn ý.",
          vocab: [
            { word: "wings", pronunciation: "/wɪŋz/", meaning: "đôi cánh", example: "The butterfly has colorful wings." },
            { word: "lift", pronunciation: "/lɪft/", meaning: "nâng lên, nhấc", example: "Can you help me lift this box?" },
            { word: "team", pronunciation: "/tiːm/", meaning: "đồng đội, nhóm", example: "Our team won the soccer game today." }
          ]
        },
        {
          eng: "They walk past lovely purple flowers and tall green grass.",
          vi: "Họ đi qua những bông hoa tím đáng yêu và những ngọn cỏ xanh cao vút.",
          vocab: [
            { word: "flower", pronunciation: "/ˈflaʊər/", meaning: "bông hoa", example: "Bees love yellow and white flowers." },
            { word: "grass", pronunciation: "/ɡræs/", meaning: "bãi cỏ", example: "The green grass is soft to sit on." },
            { word: "tall", pronunciation: "/tɔːl/", meaning: "cao lớn", example: "A giraffe is very tall." }
          ]
        },
        {
          eng: "At the nest, Andy's family cheers. 'Hooray! Thank you, Bella!'",
          vi: "Tại tổ kiến, gia đình của Andy reo hò vui sướng. 'Yeah! Cảm ơn bạn nhiều, Bella!'",
          vocab: [
            { word: "family", pronunciation: "/ˈfæməli/", meaning: "gia đình", example: "I love my happy family." },
            { word: "cheer", pronunciation: "/tʃɪr/", meaning: "reo hò, cổ vũ", example: "We always cheer for our friends." },
            { word: "hooray", pronunciation: "/huˈreɪ/", meaning: "hoan hô", example: "Hooray! Tomorrow is Sunday!" }
          ]
        },
        {
          eng: "Bella sings a happy song. Her gold wings glow beautifully under the warm sun.",
          vi: "Bella hát một bài hát vui nhộn. Đôi cánh vàng lấp lánh tuyệt đẹp dưới ánh nắng ấm.",
          vocab: [
            { word: "sing", pronunciation: "/sɪŋ/", meaning: "ca hát", example: "She loves to sing happy songs." },
            { word: "glow", pronunciation: "/ɡloʊ/", meaning: "phát sáng, tỏa sáng", example: "The fireflies glow in the dark." },
            { word: "sun", pronunciation: "/sʌn/", meaning: "mặt trời", example: "The sun is bright and warm today." }
          ]
        },
        {
          eng: "Andy says: 'Shared work is sweet and light!' They all share the sugar.",
          vi: "Andy nói: 'Công việc cùng chia sẻ thật ngọt ngào và nhẹ nhàng!' Tất cả cùng ăn viên đường.",
          vocab: [
            { word: "share", pronunciation: "/ʃer/", meaning: "chia sẻ", example: "Please share your toys with your friends." },
            { word: "sweet", pronunciation: "/swiːt/", meaning: "ngọt ngào", example: "This strawberry is very sweet." },
            { word: "light", pronunciation: "/laɪt/", meaning: "nhẹ nhàng", example: "Feathers are extremely light." }
          ]
        },
        {
          eng: "They drink clean water droplets together and smile happily.",
          vi: "Họ cùng uống những giọt nước mát lành hạnh phúc bên gốc cây.",
          vocab: [
            { word: "drink", pronunciation: "/drɪŋk/", meaning: "uống nước", example: "Drink plenty of water every morning." },
            { word: "droplet", pronunciation: "/ˈdrɑːplət/", meaning: "giọt nước nhỏ", example: "A pure water droplet shines like diamond." },
            { word: "happily", pronunciation: "/ˈhæpɪli/", meaning: "một cách vui vẻ", example: "They lived happily ever after." }
          ]
        },
        {
          eng: "Now they are best friends. Together, the ant and the bee can do anything!",
          vi: "Giờ đây họ là đôi bạn thân thiết nhất. Cùng nhau, kiến nhỏ và ong vàng có thể làm mọi thứ!",
          vocab: [
            { word: "friend", pronunciation: "/frend/", meaning: "bạn bè", example: "A loyal friend is a great treasure." },
            { word: "best", pronunciation: "/best/", meaning: "tốt nhất, thân nhất", example: "You are my best friend in class." },
            { word: "together", pronunciation: "/təˈɡeðər/", meaning: "cùng nhau", example: "The kids play together in the playground." }
          ]
        }
      ];
      insectPages.forEach((p, idx) => {
        pages.push({
          pageNumber: idx + 1,
          englishText: p.eng,
          vietnameseText: p.vi,
          svgCode: getFallbackSvg(theme, idx + 1, p.eng, p.vi),
          vocabulary: p.vocab
        });
      });
    } else if (theme === "pet") {
      const petPages = [
        {
          eng: "Mimi is a playful white kitten. She wears a pretty pink ribbon around her neck.",
          vi: "Mimi là chú mèo con màu trắng tinh nghịch. Bé đeo một chiếc ruy băng màu hồng xinh xắn quanh cổ.",
          vocab: [
            { word: "kitten", pronunciation: "/ˈkɪtn/", meaning: "mèo con", example: "The cute kitten sleeps in the wool basket." },
            { word: "ribbon", pronunciation: "/ˈrɪbən/", meaning: "ruy băng, nơ", example: "She tied a pink ribbon on her hair." },
            { word: "neck", pronunciation: "/nek/", meaning: "cổ", example: "The giraffe has a long neck." }
          ]
        },
        {
          eng: "Mimi meets Bobby, a happy puppy. Bobby loves to play with a shiny red ball.",
          vi: "Mimi gặp Bobby, một chú cún con vui tươi. Bobby thích chơi đùa với một quả bóng đỏ lấp lánh.",
          vocab: [
            { word: "puppy", pronunciation: "/ˈpʌpi/", meaning: "cún con", example: "The playful puppy barks at the grass." },
            { word: "meet", pronunciation: "/miːt/", meaning: "gặp gỡ", example: "Nice to meet you in our school!" },
            { word: "ball", pronunciation: "/bɔːl/", meaning: "quả bóng", example: "Let's roll the ball back and forth." }
          ]
        },
        {
          eng: "'Let's play together!' says Mimi. Bobby wags his little tail with joy.",
          vi: "'Chúng ta cùng chơi nhé!' Mimi rủ rê. Bobby vẫy vẫy chiếc đuôi nhỏ đầy vui sướng.",
          vocab: [
            { word: "wag", pronunciation: "/wæɡ/", meaning: "vẫy vẫy (đuôi)", example: "The dog wags its tail when hungry." },
            { word: "tail", pronunciation: "/teɪl/", meaning: "cái đuôi", example: "The rabbit has a short, fluffy tail." },
            { word: "joy", pronunciation: "/dʒɔɪ/", meaning: "sự vui sướng", example: "Children make noise with absolute joy." }
          ]
        },
        {
          eng: "They run around the sunny garden. The green grass feels soft and warm.",
          vi: "Họ đuổi bắt nhau quanh khu vườn tràn ngập nắng vàng. Thảm cỏ xanh mượt mà dịu êm.",
          vocab: [
            { word: "garden", pronunciation: "/ˈɡɑːrdn/", meaning: "khu vườn", example: "Our garden is full of organic tomatoes." },
            { word: "feel", pronunciation: "/fiːl/", meaning: "cảm nhận", example: "I feel very warm under this thick blanket." },
            { word: "sunny", pronunciation: "/ˈsʌni/", meaning: "đầy nắng", example: "We go for a walk on a sunny afternoon." }
          ]
        },
        {
          eng: "Oh no! The red ball rolls under a narrow dark bench. It is too tight!",
          vi: "Ôi không! Quả bóng đỏ lăn xuống dưới một chiếc ghế băng tối tăm chật hẹp. Nó quá hẹp!",
          vocab: [
            { word: "roll", pronunciation: "/roʊl/", meaning: "lăn tròn", example: "The orange rolls off the glass table." },
            { word: "bench", pronunciation: "/bentʃ/", meaning: "ghế dài, ghế băng", example: "We sat on a wooden bench under the tree." },
            { word: "tight", pronunciation: "/taɪt/", meaning: "chật hẹp, bó sát", example: "These shoes are too tight for my feet." }
          ]
        },
        {
          eng: "Mimi is small and swift. She climbs under the wooden bench easily.",
          vi: "Mimi nhỏ bé và lanh lợi. Cô mèo chui dưới ghế một cách rất dễ dàng.",
          vocab: [
            { word: "small", pronunciation: "/smɔːl/", meaning: "nhỏ bé", example: "A mouse is a very small animal." },
            { word: "swift", pronunciation: "/swɪft/", meaning: "nhẹ nhàng, lanh lẹ", example: "The eagle is swift and powerful." },
            { word: "climb", pronunciation: "/klaɪm/", meaning: "leo lên, bò chui", example: "Cats love to climb high trees." }
          ]
        },
        {
          eng: "Mimi pushes the red ball out! Bobby barks happily, 'Woof! Thank you Mimi!'",
          vi: "Mimi đẩy quả bóng đỏ ra ngoài! Bobby sủa hớn hở, 'Gấu gấu! Cảm ơn Mimi!'",
          vocab: [
            { word: "push", pronunciation: "/pʊʃ/", meaning: "đẩy đi", example: "Push the door to open it." },
            { word: "bark", pronunciation: "/bɑːrk/", meaning: "tiếng sủa", example: "Dogs bark when a stranger approaches." },
            { word: "happily", pronunciation: "/ˈhæpɪli/", meaning: "đầy vui sướng", example: "They smiled happily at the cute baby." }
          ]
        },
        {
          eng: "Now they are best friends. They sit together and enjoy sweet bones and tuna.",
          vi: "Giờ đây họ đã là tri kỷ. Họ ngồi cạnh nhau thưởng thức xương sữa thơm ngon và cá ngừ.",
          vocab: [
            { word: "enjoy", pronunciation: "/ɪnˈdʒɔɪ/", meaning: "thưởng thức, thích", example: "We enjoy eating delicious fruits." },
            { word: "bone", pronunciation: "/boʊn/", meaning: "khúc xương", example: "The puppy chews on a big calcium bone." },
            { word: "tuna", pronunciation: "/ˈtuːnə/", meaning: "cá ngừ", example: "Cats love eating freshwater tuna." }
          ]
        },
        {
          eng: "In the cool evening, they lie down under the giant oak tree.",
          vi: "Vào buổi tối mát mẻ, cặp đôi nằm sưởi ấm dưới gốc cây sồi khổng lồ.",
          vocab: [
            { word: "evening", pronunciation: "/ˈiːvnɪŋ/", meaning: "buổi tối", example: "We read bedtime stories every evening." },
            { word: "giant", pronunciation: "/ˈdʒaɪənt/", meaning: "khổng lồ, vĩ đại", example: "A whale is a giant ocean creature." },
            { word: "oak", pronunciation: "/oʊk/", meaning: "cây sồi", example: "The old oak tree stands in the central park." }
          ]
        },
        {
          eng: "'Goodnight Bobby,' whispers Mimi. They sleep soundly under the starry sky.",
          vi: "'Chúc Bobby ngủ ngon,' Mimi thì thầm. Cả hai ngủ say dưới bầu trời đêm đầy sao lấp lánh.",
          vocab: [
            { word: "whisper", pronunciation: "/ˈwɪspər/", meaning: "thì thầm", example: "She whispers a loving secret to her mother." },
            { word: "soundly", pronunciation: "/ˈsaʊndli/", meaning: "một cách ngon giấc", example: "The baby is sleeping soundly." },
            { word: "starry", pronunciation: "/ˈstɑːri/", meaning: "đầy sao", example: "The starry night is extremely peaceful." }
          ]
        }
      ];
      petPages.forEach((p, idx) => {
        pages.push({
          pageNumber: idx + 1,
          englishText: p.eng,
          vietnameseText: p.vi,
          svgCode: getFallbackSvg(theme, idx + 1, p.eng, p.vi),
          vocabulary: p.vocab
        });
      });
    } else {
      const displayP = prompt;
      const advPages = [
        {
          eng: `Joy is an adventurous child. Today, Joy sets out to find the magic of ${displayP}.`,
          vi: `Joy là một bạn nhỏ thích thám hiểm. Hôm nay, bạn lên đường tìm kiếm sự kỳ diệu từ ${displayP}.`,
          vocab: [
            { word: "adventure", pronunciation: "/ədˈventʃər/", meaning: "cuộc phiêu lưu", example: "Life is a beautiful adventure." },
            { word: "child", pronunciation: "/tʃaɪld/", meaning: "đứa trẻ, bạn nhỏ", example: "The child makes a paper boat." },
            { word: "magic", pronunciation: "/ˈmædʒɪk/", meaning: "sự kỳ quặc, kỳ diệu", example: "The magician did a great magic trick." }
          ]
        },
        {
          eng: "Joy packs a bright yellow backpack with a sweet red apple.",
          vi: "Joy gói vào chiếc ba lô màu vàng sáng của mình một trái táo đỏ chín mọng.",
          vocab: [
            { word: "pack", pronunciation: "/pæk/", meaning: "gói ghém, xếp đồ", example: "We pack our bags for the summer camp." },
            { word: "backpack", pronunciation: "/ˈbækpæk/", meaning: "ba lô", example: "My school backpack is blue and orange." },
            { word: "apple", pronunciation: "/ˈæpl/", meaning: "quả táo", example: "An apple a day keeps the doctor away." }
          ]
        },
        {
          eng: "Entering the deep green forest, Joy hears birds singing pleasant melodies.",
          vi: "Bước vào rừng xanh thẳm, Joy lắng nghe tiếng chim ca hát những khúc nhạc êm đềm.",
          vocab: [
            { word: "forest", pronunciation: "/ˈfɔːrɪst/", meaning: "khu rừng", example: "Many sweet animals live inside the forest." },
            { word: "deep", pronunciation: "/diːp/", meaning: "sâu thẳm, rậm rạp", example: "The scuba diver swam in deep water." },
            { word: "melody", pronunciation: "/ˈmelədi/", meaning: "giai điệu", example: "The classical song has a nice melody." }
          ]
        },
        {
          eng: "A glowing gold dust highlights a small hidden path on the ground.",
          vi: "Một thảm bụi vàng óng ánh thắp sáng con đường mòn nhỏ ẩn hiện trên mặt đất.",
          vocab: [
            { word: "dust", pronunciation: "/dʌst/", meaning: "bụi, bột mịn", example: "Golden dust glows on the fairy's wings." },
            { word: "hidden", pronunciation: "/ˈhɪdn/", meaning: "được ẩn giấu, ẩn hiện", example: "They searched for a hidden gold treasure." },
            { word: "path", pronunciation: "/pæθ/", meaning: "lối đi, con đường mòn", example: "We walked along a small garden path." }
          ]
        },
        {
          eng: "A friendly blue bird flies down and warns Joy of a giant sleepy mountain.",
          vi: "Một chú chim xanh thân thiện sà xuống báo sớm cho Joy về ngọn núi khổng lồ ngái ngủ phía trước.",
          vocab: [
            { word: "bird", pronunciation: "/bɜːrd/", meaning: "chú chim", example: "The blue bird eats small sunflower seeds." },
            { word: "warn", pronunciation: "/wɔːrn/", meaning: "cảnh báo", example: "The sirens warn us about lightning." },
            { word: "sleepy", pronunciation: "/ˈsliːpi/", meaning: "buồn ngủ, ngái ngủ", example: "I always feel sleepy after eating lunch." }
          ]
        },
        {
          eng: "Joy walks slowly yet bravely up the high green stone steps.",
          vi: "Joy leo từng bước chậm mà dũng cảm lên những bậc đá phủ rêu xanh cao lớn.",
          vocab: [
            { word: "slowly", pronunciation: "/ˈsloʊli/", meaning: "một cách chậm rãi", example: "The cute turtle walks slowly." },
            { word: "bravely", pronunciation: "/ˈbreɪvli/", meaning: "một cách dũng cảm", example: "She stepped forward and spoke bravely." },
            { word: "steps", pronunciation: "/steps/", meaning: "bậc thang, bước đi", example: "These steps are very steep." }
          ]
        },
        {
          eng: `At the top, Joy finds a magical glowing chest filled with ${displayP}.`,
          vi: `At the top, Joy phát hiện một chiếc hòm nhiệm màu phát sáng ngập tràn vị ngọt ${displayP}.`,
          vocab: [
            { word: "top", pronunciation: "/tɑːp/", meaning: "đỉnh cao, chóp", example: "The snow covers the top of the mountain." },
            { word: "chest", pronunciation: "/tʃest/", meaning: "chiếc rương, hòm", example: "The old pirate treasure chest was empty." },
            { word: "magical", pronunciation: "/ˈmædʒɪkl/", meaning: "kỳ ảo, nhiệm màu", example: "Harry Potter lived in a magical castle." }
          ]
        },
        {
          eng: "The glowing box opens with a gentle wind, scattering beautiful colorful balloons.",
          vi: "Chiếc hộp phát sáng mở ra cùng một làn gió nhẹ, làm tung bay những bóng bóng sặc sỡ sắc màu.",
          vocab: [
            { word: "gentle", pronunciation: "/ˈdʒentl/", meaning: "bao dung, dịu nhẹ", example: "A gentle breeze cools down the summer afternoon." },
            { word: "wind", pronunciation: "/wɪnd/", meaning: "cơn gió", example: "Strong wind blew away my hat." },
            { word: "balloons", pronunciation: "/bəˈluːnz/", meaning: "quả bong bóng", example: "Balloons make the kids birthday party fun." }
          ]
        },
        {
          eng: "Everyone in the forest celebrates Joy's discovery with delicious treats and games.",
          vi: "Mọi thành viên trong rừng mở tiệc linh đình chúc mừng khám phá lớn của Joy bằng các trò chơi tinh nghịch.",
          vocab: [
            { word: "celebrate", pronunciation: "/ˈselɪbreɪt/", meaning: "quây quần chúc mừng", example: "Let's celebrate your high exam scores!" },
            { word: "discovery", pronunciation: "/dɪˈskʌvəri/", meaning: "sự phát hiện, khám phá", example: "We made an interesting discovery today." },
            { word: "games", pronunciation: "/ɡeɪmz/", meaning: "các trò chơi", example: "The children played nice board games." }
          ]
        },
        {
          eng: "Joy goes home, hugging the happy memories, ready for a warm sleep.",
          vi: "Joy quay về ngôi nhà của mình, ôm ấp những kỷ niệm đầy ắp niềm vui, sẵn sàng đón nhận giấc ngủ ngon lành.",
          vocab: [
            { word: "hug", pronunciation: "/hʌɡ/", meaning: "ôm, ôm ấp", example: "Give your lovely father a tight big hug." },
            { word: "memories", pronunciation: "/ˈmeməriz/", meaning: "kỷ niệm", example: "We have wonderful childhood memories." },
            { word: "ready", pronunciation: "/ˈredi/", meaning: "sẵn sàng", example: "Are you ready to learn English with me?" }
          ]
        }
      ];
      advPages.forEach((p, idx) => {
        pages.push({
          pageNumber: idx + 1,
          englishText: p.eng,
          vietnameseText: p.vi,
          svgCode: getFallbackSvg(theme, idx + 1, p.eng, p.vi),
          vocabulary: p.vocab
        });
      });
    }

    return {
      title,
      titleVi,
      coverSvg,
      pages
    };
  }

  // Helper function to handle Google GenAI calls with retry, backoff, and fallback models to mitigate high demand / 503 exceptions
  async function generateContentWithRetry(aiClient: any, params: any) {
    const modelsToTry = [
      "gemini-3.1-flash-lite",
      "gemini-3.5-flash",
      "gemini-flash-latest"
    ];
    let lastError: any = null;

    for (const model of modelsToTry) {
      let attempts = 2; // Fast failover to try more models quickly
      let delay = 1000;
      while (attempts > 0) {
        try {
          console.log(`Calling Gemini with model "${model}" (${attempts} attempts remaining)...`);
          const response = await aiClient.models.generateContent({
            ...params,
            model: model,
          });
          return response;
        } catch (err: any) {
          lastError = err;
          const statusStr = String(err?.status || err?.code || "");
          const errMsg = String(err?.message || "");

          // Detect transient busy states like 503 (UNAVAILABLE), 429 (RESOURCE_EXHAUSTED) or quota limits
          const isTransient = 
            statusStr.includes("UNAVAILABLE") || 
            statusStr.includes("503") || 
            statusStr.includes("RESOURCE_EXHAUSTED") || 
            statusStr.includes("429") ||
            errMsg.includes("experiencing high demand") ||
            errMsg.includes("UNAVAILABLE") ||
            errMsg.includes("503");

          if (isTransient) {
            console.log(`Note: Model "${model}" is busy (${statusStr || "Service Unavailable"}).`);
            if (attempts > 1) {
              console.log(`Retrying "${model}" in ${delay}ms...`);
              await new Promise((resolve) => setTimeout(resolve, delay));
              delay *= 1.5;
              attempts--;
            } else {
              console.log(`Model "${model}" retries exhausted. Cascading to next model...`);
              break;
            }
          } else {
            console.log(`Note: Non-transient response status from "${model}" (${statusStr}). Cascading to next model...`);
            break;
          }
        }
      }
    }
    throw lastError;
  }

  // API Route to generate stories using gemini-3.5-flash or elegant fallbacks
  app.post("/api/generate-story", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ error: "Vui lòng nhập tên hoặc chủ đề câu chuyện!" });
      }

      console.log(`Đang chuẩn bị vẽ và tạo câu chuyện cho bé: "${prompt}"...`);

      const systemInstruction = 
        "You are a friendly children's English-learning helper and an amazing illustrator of simple vector graphics. " +
        "You must generate a story named or based on the user's requested title in Vietnamese/English. " +
        "Generate a story with precisely 1 cover and exactly 10 sequence pages. " +
        "For each page, write high-quality English sentences perfect for learning, detailed Vietnamese translating text, and 3 key vocabulary words. " +
        "You must output exactly 1 cover SVG and exactly 10 illustration page SVGs. " +
        "Each SVG must be a beautiful, colorful, friendly, cartoon vector graphic. " +
        "DO NOT use raw markdown formatting around the SVG fields within the JSON output; they must be clean, valid, inline XML SVG tags " +
        "with viewBox='0 0 500 400', width='100%', height='100%', styled beautifully with children-friendly pastel backgrounds, trees, suns, mountains, simple characters (e.g., ants, bees, people, pigs, houses, wolfs) composed of <rect>, <circle>, <ellipse>, <path>, <polygon>, <g>, and text elements. " +
        "Make sure the illustrations depict the corresponding page content perfectly!";

      const promptMessage = `Create an English story titled "${prompt}" for Vietnamese kids learning English with exactly 10 pages. The output must adhere strictly to the JSON schema, offering English sentences, Vietnamese definitions, a cover SVG illustration, and 10 detailed page illustrations.`;

      let storyData;
      try {
        const response = await generateContentWithRetry(ai, {
          contents: promptMessage,
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "Story title in English" },
                titleVi: { type: Type.STRING, description: "Story title in Vietnamese" },
                coverSvg: { type: Type.STRING, description: "A beautifully styled complete XML SVG string. Use viewBox='0 0 500 400'. It should render beautiful vector graphics of the book cover with nice colorful shapes, items, skies, characters, and cute visuals. Do not use markdown backticks in the string." },
                pages: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      pageNumber: { type: Type.INTEGER, description: "Page sequence index starting at 1" },
                      englishText: { type: Type.STRING, description: "Simple English sentences (1-3 sentences) suitable for beginners" },
                      vietnameseText: { type: Type.STRING, description: "Vietnamese translation of the englishText" },
                      svgCode: { type: Type.STRING, description: "A complete vector SVG string with viewBox='0 0 500 400' illustrating the scenario described on this page. No markdown backticks." },
                      vocabulary: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            word: { type: Type.STRING, description: "English vocab word" },
                            pronunciation: { type: Type.STRING, description: "IPA formatting, e.g. /ænt/" },
                            meaning: { type: Type.STRING, description: "Vietnamese translated term" },
                            example: { type: Type.STRING, description: "A simple example sentence using this word" }
                          },
                          required: ["word", "pronunciation", "meaning", "example"]
                        }
                      }
                    },
                    required: ["pageNumber", "englishText", "vietnameseText", "svgCode", "vocabulary"]
                  }
                }
              },
              required: ["title", "titleVi", "coverSvg", "pages"]
            }
          }
        });

        const responseText = response.text || "";
        storyData = JSON.parse(responseText.trim());
      } catch (geminiError: any) {
        console.warn("Gemini is currently overloaded or down. Responding with the elegant, custom fallback storyteller:", geminiError);
        storyData = generateFallbackStory(prompt);
      }

      res.json(storyData);
    } catch (err: any) {
      console.error("Backend error:", err);
      res.status(500).json({ error: err.message || "Lỗi bất thường xảy ra trên hệ thống." });
    }
  });

  // Vite development or production setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running internally on port ${PORT}`);
  });
}

startServer();
