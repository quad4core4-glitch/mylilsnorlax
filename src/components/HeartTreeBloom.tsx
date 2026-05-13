import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

/** Crown rows from wide (bottom of crown) to tip — drawn above trunk in flex-col-reverse order. */
const CROWN_ROWS = [6, 5, 4, 3, 2, 1];

const HEART_PATH =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

type HeartTreeBloomProps = {
  open: boolean;
  onComplete: () => void;
};

const TOTAL_MS = 3600;

export function HeartTreeBloom({ open, onComplete }: HeartTreeBloomProps) {
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => onComplete(), TOTAL_MS);
    return () => window.clearTimeout(id);
  }, [open, onComplete]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="heart-tree"
          className="pointer-events-auto fixed inset-0 z-[48] flex items-end justify-center bg-black/30 backdrop-blur-[3px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="presentation"
        >
          <svg width="0" height="0" className="absolute overflow-hidden" aria-hidden>
            <defs>
              <linearGradient id="heartTreeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fda4af" />
                <stop offset="45%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
            </defs>
          </svg>

          <motion.div
            className="relative mb-0 flex w-full max-w-lg flex-col-reverse items-center justify-end px-4 pb-6 md:max-w-xl md:pb-14"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 95, damping: 16, mass: 0.85 }}
          >
            <motion.div
              aria-hidden
              className="relative w-3 origin-bottom rounded-full shadow-[0_0_24px_rgba(251,146,60,0.35)] md:w-4"
              style={{
                height: "clamp(6.5rem, 20vh, 10rem)",
                background: "linear-gradient(to top, #713f12, #b45309, #eab308)",
                boxShadow:
                  "inset 0 -10px 18px rgba(0,0,0,0.4), inset 0 4px 12px rgba(255,255,255,0.12), 0 0 28px rgba(251,146,60,0.4)",
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            />

            {CROWN_ROWS.map((count, rowIndex) => (
              <div
                key={`row-${count}`}
                className="mb-0.5 flex flex-row justify-center gap-0.5 md:mb-1 md:gap-1"
              >
                {Array.from({ length: count }).map((_, hi) => (
                  <motion.div
                    key={`h-${rowIndex}-${hi}`}
                    initial={{ scale: 0, opacity: 0, rotate: -40, y: 24 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 16,
                      delay: 0.52 + rowIndex * 0.1 + hi * 0.035,
                    }}
                    className="drop-shadow-[0_8px_18px_rgba(244,63,94,0.55)]"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 md:h-7 md:w-7" aria-hidden>
                      <path fill="url(#heartTreeGrad)" d={HEART_PATH} />
                    </svg>
                  </motion.div>
                ))}
              </div>
            ))}

            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] rounded-full opacity-0 blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse 80% 70% at 50% 100%, rgba(251,113,133,0.55), rgba(244,63,94,0.25) 45%, transparent 70%)",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.85, duration: 1.1, ease: "easeOut" }}
            />

            <motion.div
              aria-hidden
              className="pointer-events-none absolute -top-8 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-gradient-to-t from-pink-400/30 to-transparent opacity-0 blur-xl md:h-32 md:w-32"
              animate={{ opacity: [0, 0.9, 0.5], scale: [0.6, 1.15, 1] }}
              transition={{ delay: 1.2, duration: 1.4, ease: "easeOut" }}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
