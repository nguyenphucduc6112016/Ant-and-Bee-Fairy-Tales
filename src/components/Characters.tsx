import React from "react";
import { motion } from "motion/react";

// === 1. BẠN KIẾN TÍM (Purple Ant) ===
export const PurpleAnt: React.FC<{ 
  className?: string; 
  isPainting?: boolean; 
  isPulling?: boolean;
}> = ({ className = "", isPainting = false, isPulling = false }) => {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Decorative tooltip/speech if painting */}
      {isPainting && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
          className="absolute -top-12 bg-purple-600 text-white text-xs px-2.5 py-1 rounded-full shadow-lg border-2 border-white whitespace-nowrap z-10 font-medium"
        >
          Tớ đang vẽ tranh... 🎨
        </motion.div>
      )}

      {/* Purple Ant SVG */}
      <svg
        width="110"
        height="120"
        viewBox="0 0 100 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
      >
        {/* Antennas (Râu) */}
        <motion.g
          animate={isPainting ? { rotate: [0, -10, 10, 0] } : { rotate: [0, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="origin-[50px_40px]"
        >
          {/* Left râu */}
          <path d="M42 40 C35 25, 25 25, 22 28" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" />
          <circle cx="21" cy="28" r="4" fill="#A78BFA" />

          {/* Right râu */}
          <path d="M58 40 C65 25, 75 25, 78 28" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" />
          <circle cx="79" cy="28" r="4" fill="#A78BFA" />
        </motion.g>

        {/* Six Legs (Sáu chân) */}
        <g>
          {/* Chân trái trước */}
          <path d="M35 65 C20 65, 15 75, 10 85" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
          {/* Chân trái giữa */}
          <path d="M38 72 C22 75, 18 85, 15 95" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
          {/* Chân trái sau */}
          <path d="M42 80 C25 85, 20 95, 18 105" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />

          {/* Chân phải trước */}
          <path d="M65 65 C80 65, 85 75, 90 85" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
          {/* Chân phải giữa */}
          <path d="M62 72 C78 75, 82 85, 85 95" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
          {/* Chân phải sau */}
          <path d="M58 80 C75 85, 80 95, 82 105" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Ant Head (Đầu kiến) */}
        <motion.g
          animate={isPainting ? { rotate: [0, -4, 4, 0] } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="origin-center"
        >
          <ellipse cx="50" cy="48" rx="20" ry="18" fill="#8B5CF6" />
          <ellipse cx="50" cy="46" rx="17" ry="14" fill="#A78BFA" />

          {/* Big cute eyes (Mắt) */}
          <circle cx="42" cy="46" r="5" fill="white" />
          <circle cx="41" cy="45" r="2" fill="black" />
          <circle cx="58" cy="46" r="5" fill="white" />
          <circle cx="59" cy="45" r="2" fill="black" />

          {/* Cheerful Mouth (Miệng cười) */}
          <path d="M45 54 Q50 59 55 54" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Tiny painter cap if painting */}
          {isPainting && (
            <g transform="translate(36, 23)">
              <rect x="2" y="4" width="24" height="6" rx="3" fill="#EF4444" />
              <path d="M6 4 C10 -3, 18 -3, 22 4 Z" fill="#EF4444" />
              <circle cx="14" cy="-2" r="3" fill="#FBBF24" />
            </g>
          )}
        </motion.g>

        {/* Ant Neck (Cổ) */}
        <rect x="47" y="62" width="6" height="8" fill="#7C3AED" rx="2" />

        {/* Ant Chest and Belly (Ngực và Bụng kiến) */}
        <g>
          {/* Chest (Ngực) */}
          <circle cx="50" cy="74" r="11" fill="#8B5CF6" />
          <circle cx="50" cy="74" r="8" fill="#A78BFA" />

          {/* Big Oval Belly (Bụng to) */}
          <ellipse cx="50" cy="92" rx="16" ry="12" fill="#7C3AED" />
          {/* Stripes on belly */}
          <line x1="40" y1="90" x2="60" y2="90" stroke="#9061F9" strokeWidth="2" />
          <line x1="42" y1="95" x2="58" y2="95" stroke="#9061F9" strokeWidth="2" />
        </g>

        {/* Paintbrush in hand if painting */}
        {isPainting && (
          <motion.g
            animate={{ rotate: [-20, 20, -20] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            className="origin-[38px_74px]"
          >
            {/* Hand left */}
            <path d="M44 74 L30 68" stroke="#7C3AED" strokeWidth="3" />
            {/* Brush handle */}
            <rect x="20" y="50" width="4" height="24" rx="1" fill="#D97706" transform="rotate(30 20 50)" />
            {/* Metal holder */}
            <rect x="28" y="52" width="6" height="5" fill="#9CA3AF" />
            {/* Tip (blue color tip) */}
            <path d="M29 52 L32 42 L35 52 Z" fill="#3B82F6" />
          </motion.g>
        )}

        {/* Pulling hands if pulling */}
        {isPulling && (
          <g>
            <path d="M44 74 L30 55" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
            <path d="M56 74 L70 55" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
            {/* Ropes hanging down into hands */}
            <line x1="30" y1="0" x2="30" y2="55" stroke="#FBBF24" strokeWidth="2" strokeDasharray="3,3" />
            <line x1="70" y1="0" x2="70" y2="55" stroke="#FBBF24" strokeWidth="2" strokeDasharray="3,3" />
          </g>
        )}
      </svg>
    </div>
  );
};


// === 2. CHÚ ONG THÔNG THÁI (Smart Bee) ===
export const SmartBee: React.FC<{ 
  className?: string; 
  statusMessage?: string;
  isBuzzing?: boolean;
}> = ({ className = "", statusMessage, isBuzzing = false }) => {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Floating animation */}
      <motion.div
        animate={isBuzzing ? {
          y: [-5, 5, -5],
          x: [-3, 3, -3],
          scale: [1, 1.05, 1],
        } : {
          y: [-6, 6, -6],
        }}
        transition={{
          repeat: Infinity,
          duration: isBuzzing ? 1 : 2.5,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center"
      >
        {statusMessage && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-14 bg-amber-100 text-amber-900 text-xs px-3 py-1.5 rounded-xl border-2 border-amber-400 shadow-md whitespace-nowrap z-10 font-bold flex items-center gap-1"
          >
            <span className="text-sm">🐝</span> {statusMessage}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-amber-100"></div>
          </motion.div>
        )}

        <svg
          width="85"
          height="85"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Wings (Cánh bay) */}
          <g>
            {/* Left wing */}
            <motion.ellipse
              cx="35"
              cy="30"
              rx="8"
              ry="18"
              fill="rgba(191, 219, 254, 0.75)"
              stroke="#3B82F6"
              strokeWidth="1.5"
              className="origin-[45px_42px]"
              animate={{ rotate: [-40, 10, -40], skewY: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 0.15 }}
            />
            {/* Right wing */}
            <motion.ellipse
              cx="65"
              cy="30"
              rx="8"
              ry="18"
              fill="rgba(191, 219, 254, 0.75)"
              stroke="#3B82F6"
              strokeWidth="1.5"
              className="origin-[55px_42px]"
              animate={{ rotate: [40, -10, 40], skewY: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 0.15 }}
            />
          </g>

          {/* Antennae (Râu ong) */}
          <g>
            <path d="M42 35 C38 25, 30 25, 28 28" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="28" cy="28" r="3" fill="#D97706" />
            <path d="M58 35 C62 25, 70 25, 72 28" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="72" cy="28" r="3" fill="#D97706" />
          </g>

          {/* Stinger (Ngòi mật) */}
          <polygon points="50,88 47,78 53,78" fill="#111827" />

          {/* Bee Body (Thân ong bụ bẫm) */}
          <ellipse cx="50" cy="56" rx="22" ry="24" fill="#FBBF24" />

          {/* Black Stripes (Sọc vằn màu đen) */}
          <path d="M31 46 C38 41, 62 41, 69 46 C67 42, 33 42, 31 46 Z" fill="#1F2937" />
          <path d="M28 56 C38 51, 62 51, 72 56 C70 52, 30 52, 28 56 Z" fill="#1F2937" />
          <path d="M30 66 C38 61, 62 61, 70 66 C68 62, 32 62, 30 66 Z" fill="#1F2937" />

          {/* Cute face cheeks */}
          <circle cx="36" cy="56" r="3" fill="#F87171" opacity="0.6" />
          <circle cx="64" cy="56" r="3" fill="#F87171" opacity="0.6" />

          {/* Big eyes */}
          <circle cx="40" cy="48" r="5" fill="white" />
          <circle cx="40" cy="48" r="2.5" fill="black" />
          <circle cx="40" cy="47" r="1" fill="white" />

          <circle cx="60" cy="48" r="5" fill="white" />
          <circle cx="60" cy="48" r="2.5" fill="black" />
          <circle cx="60" cy="47" r="1" fill="white" />

          {/* Smiling Mouth */}
          <path d="M46 58 Q50 63 54 58" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </motion.div>
    </div>
  );
};


// === 3. CÔ TIÊN TINKER BELL (Fairy Tinker Bell) ===
export const TinkerBell: React.FC<{ 
  className?: string; 
  isCasting?: boolean;
}> = ({ className = "", isCasting = false }) => {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <motion.div
        animate={{
          y: [-8, 8, -8],
          rotate: isCasting ? [-3, 3, -3] : [0, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }}
        className="relative"
      >
        {/* Fairydust sparkles if casting */}
        {isCasting && (
          <div className="absolute -top-16 -right-16 pointer-events-none w-32 h-32 z-25">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 1,
                  scale: 0.2,
                  x: 35,
                  y: 15
                }}
                animate={{
                  opacity: [1, 1, 0],
                  scale: [0.2, 1.2, 0.1],
                  x: [35, 35 + (Math.random() * 80 - 40), 35 + (Math.random() * 120 - 60)],
                  y: [15, 15 + (Math.random() * 80 - 20), 15 + (Math.random() * 140)]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.12,
                }}
                className="absolute text-yellow-400 text-sm font-bold drop-shadow-md"
              >
                ✦
              </motion.div>
            ))}
          </div>
        )}

        <svg
          width="110"
          height="120"
          viewBox="0 0 100 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Wings (Cánh tiên lấp lánh) */}
          <g>
            {/* Left large wing */}
            <motion.path
              d="M38 45 C30 15, 5 5, 20 28 C28 40, 34 44, 38 45 Z"
              fill="rgba(147, 197, 253, 0.4)"
              stroke="#60A5FA"
              strokeWidth="1.5"
              className="origin-[38px_45px]"
              animate={{ rotate: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            />
            {/* Left small wing */}
            <motion.path
              d="M39 48 C30 35, 10 35, 22 55 C28 65, 35 55, 39 48 Z"
              fill="rgba(147, 197, 253, 0.3)"
              stroke="#93C5FD"
              strokeWidth="1"
              className="origin-[39px_48px]"
              animate={{ rotate: [-5, 12, -5] }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            />
            
            {/* Right large wing */}
            <motion.path
              d="M62 45 C70 15, 95 5, 80 28 C72 40, 66 44, 62 45 Z"
              fill="rgba(147, 197, 253, 0.4)"
              stroke="#60A5FA"
              strokeWidth="1.5"
              className="origin-[62px_45px]"
              animate={{ rotate: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            />
            {/* Right small wing */}
            <motion.path
              d="M61 48 C70 35, 90 35, 78 55 C72 65, 65 55, 61 48 Z"
              fill="rgba(147, 197, 253, 0.3)"
              stroke="#93C5FD"
              strokeWidth="1"
              className="origin-[61px_48px]"
              animate={{ rotate: [5, -12, 5] }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            />
          </g>

          {/* Blonde Hair bun (Tóc búi vàng) */}
          <circle cx="50" cy="24" r="10" fill="#FBBF24" />
          <circle cx="50" cy="24" r="7" fill="#F59E0B" opacity="0.6" />

          {/* Fairy Face */}
          <circle cx="50" cy="38" r="11" fill="#FBCFE8" /> {/* soft peach */}
          {/* Hair bangs */}
          <path d="M39 36 C42 30, 58 30, 61 36 C57 32, 43 32, 39 36 Z" fill="#FBBF24" />
          {/* Eyes */}
          <circle cx="46" cy="38" r="1.5" fill="#1F2937" />
          <circle cx="54" cy="38" r="1.5" fill="#1F2937" />
          {/* Smile */}
          <path d="M48 43 Q50 45 52 43" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />

          {/* Green Dress (Váy xanh lá của Tinker Bell) */}
          <path d="M42 48 L35 78 L65 78 L58 48 Z" fill="#10B981" />
          {/* Skirt leaf cuts */}
          <path d="M35 78 L42 85 L50 78 L58 85 L65 78 Z" fill="#059669" />

          {/* Legs (Chân thon thả) */}
          <rect x="44" y="78" width="4" height="18" fill="#FBCFE8" rx="1.5" />
          <rect x="52" y="78" width="4" height="18" fill="#FBCFE8" rx="1.5" />
          {/* Green slippers */}
          <ellipse cx="45" cy="96" rx="4" ry="2.5" fill="#10B981" />
          <ellipse cx="55" cy="96" rx="4" ry="2.5" fill="#10B981" />
          <circle cx="45" cy="93" r="1.5" fill="white" />
          <circle cx="55" cy="93" r="1.5" fill="white" />

          {/* Arms and Magic Wand (Đũa phép thuật) */}
          {/* Left arm */}
          <path d="M42 50 L32 60" stroke="#FBCFE8" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Right arm waving magic wand */}
          <motion.g
            animate={isCasting ? {
              rotate: [0, -45, -30, -50, 0],
            } : {
              rotate: [0, -5, 5, 0]
            }}
            transition={{
              duration: isCasting ? 0.8 : 2.5,
              repeat: isCasting ? 2 : Infinity,
              ease: "easeInOut"
            }}
            className="origin-[58px_50px]"
          >
            {/* Right arm path */}
            <path d="M58 50 L72 38" stroke="#FBCFE8" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Magic Wand (Đũa phép) */}
            <line x1="72" y1="38" x2="85" y2="20" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
            {/* Wand star glowing */}
            <motion.polygon
              points="85,15 87,19 91,20 87,21 85,25 83,21 79,20 83,19"
              fill="#FBBF24"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
              className="origin-[85px_20px]"
            />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
};


// === 4. BÀ CỤ (Dear Granny) ===
export const OldLady: React.FC<{ 
  className?: string; 
  isWalking?: boolean;
}> = ({ className = "", isWalking = false }) => {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <motion.div
        animate={isWalking ? {
          y: [-2, 2, -2],
          rotate: [-2, 2, -2]
        } : {}}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="flex flex-col items-center"
      >
        <svg
          width="90"
          height="125"
          viewBox="0 0 90 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* White Hair Bun (Tóc búi cụ bà) */}
          <circle cx="45" cy="18" r="8" fill="#E5E7EB" />
          <circle cx="45" cy="18" r="6" fill="#F3F4F6" />

          {/* Granny Head (Đầu cụ bà hơi cúi) */}
          <circle cx="45" cy="35" r="16" fill="#FED7AA" />
          {/* Hair block */}
          <path d="M30 32 C35 22, 55 22, 60 32" stroke="#E5E7EB" strokeWidth="6" strokeLinecap="round" fill="none" />
          
          {/* Glasses (Gọng kính tròn) */}
          <circle cx="39" cy="35" r="5" fill="none" stroke="#4B5563" strokeWidth="1.5" />
          <circle cx="51" cy="35" r="5" fill="none" stroke="#4B5563" strokeWidth="1.5" />
          <line x1="44" y1="35" x2="46" y2="35" stroke="#4B5563" strokeWidth="1.5" />

          {/* Smiley Eyes behind glasses */}
          <path d="M37 34 Q39 33 41 34" stroke="#1F2937" strokeWidth="1.5" />
          <path d="M49 34 Q51 33 53 34" stroke="#1F2937" strokeWidth="1.5" />

          {/* Kindly smile and rosy cheeks */}
          <circle cx="33" cy="40" r="2.5" fill="#F87171" opacity="0.5" />
          <circle cx="57" cy="40" r="2.5" fill="#F87171" opacity="0.5" />
          <path d="M42 45 Q45 48 48 45" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />

          {/* Warm Overcoat Dress (Áo khoác ấm màu tím/nâu) */}
          <path d="M28 50 C33 50, 57 50, 62 50 L68 100 L22 100 Z" fill="#9333EA" /> {/* Purple overcoat */}
          {/* Apron or scarf (Khăn len quàng cổ màu vàng nhạt) */}
          <path d="M36 50 C40 60, 50 60, 54 50" fill="none" stroke="#FDE047" strokeWidth="5" strokeLinecap="round" />

          {/* Legs & Shoes */}
          <rect x="36" y="100" width="6" height="12" fill="#FED7AA" />
          <rect x="48" y="100" width="6" height="12" fill="#FED7AA" />
          {/* Brown boots */}
          <ellipse cx="36" cy="111" rx="6" ry="3.5" fill="#78350F" />
          <ellipse cx="48" cy="111" rx="6" ry="3.5" fill="#78350F" />

          {/* Hand holding cane (Gậy chống gỗ) */}
          <g>
            {/* Cane path */}
            <path d="M20 62 L20 115" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
            <path d="M20 62 Q15 62 13 65" stroke="#78350F" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Arm pointing to cane */}
            <path d="M31 56 L19 65" stroke="#FED7AA" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
};
