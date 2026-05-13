import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

/** Crown rows from wide (bottom of crown) to tip — drawn above trunk in flex-col-reverse order. */
const CROWN_ROWS = [6, 5, 4, 3, 2, 1];

/** Cordate (heart-shaped) leaf blade — rounded apex + two basal lobes, not a Valentine heart. */
const LEAF_PATH =
  "M12 26.5 C7 25.5 3.5 20 4 14 C4.5 8 8 4 12 6 C16 4 19.5 8 20 14 C20.5 20 17 25.5 12 26.5 Z";

/** Organic trunk: curved sides, wider base, narrow crown attachment, soft top. */
const TRUNK_PATH =
  "M24 148 C10 147 4 132 4 112 C4 78 9 42 15 8 Q24 2 33 8 C39 42 44 78 44 112 C44 132 38 147 24 148 Z";

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
              <linearGradient id="leafCrownGrad" x1="10%" y1="100%" x2="90%" y2="0%">
                <stop offset="0%" stopColor="#fb7185" />
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
            <motion.svg
              aria-hidden
              viewBox="0 0 48 148"
              preserveAspectRatio="xMidYMax meet"
              className="relative w-[3.25rem] overflow-visible drop-shadow-[0_10px_28px_rgba(251,146,60,0.35)] md:w-[4.25rem]"
              style={{ height: "clamp(7rem, 22vh, 11rem)" }}
              initial={{ opacity: 1 }}
            >
              <defs>
                <linearGradient id="trunkWoodGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#451a03" />
                  <stop offset="35%" stopColor="#78350f" />
                  <stop offset="72%" stopColor="#b45309" />
                  <stop offset="100%" stopColor="#d4a574" />
                </linearGradient>
                <linearGradient id="trunkSheen" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                  <stop offset="42%" stopColor="rgba(255,255,255,0.14)" />
                  <stop offset="58%" stopColor="rgba(255,255,255,0.06)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
                </linearGradient>
              </defs>
              <motion.g
                style={{ transformOrigin: "24px 148px", transformBox: "fill-box" }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              >
                <path d={TRUNK_PATH} fill="url(#trunkWoodGrad)" />
                <path
                  d={TRUNK_PATH}
                  fill="none"
                  stroke="rgba(62, 32, 10, 0.42)"
                  strokeWidth="0.55"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path
                  d={TRUNK_PATH}
                  fill="url(#trunkSheen)"
                  opacity={0.95}
                  style={{ mixBlendMode: "soft-light" }}
                />
              </motion.g>
            </motion.svg>

            {CROWN_ROWS.map((count, rowIndex) => (
              <div
                key={`row-${count}`}
                className="mb-0.5 flex flex-row justify-center gap-0.5 md:mb-1 md:gap-1"
              >
                {Array.from({ length: count }).map((_, hi) => {
                  const tilt = ((hi + rowIndex) % 5) * 4 - 8;
                  return (
                    <motion.div
                      key={`h-${rowIndex}-${hi}`}
                      initial={{ scale: 0, opacity: 0, rotate: -40 + tilt * 0.4, y: 24 }}
                      animate={{ scale: 1, opacity: 1, rotate: tilt, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 16,
                        delay: 0.52 + rowIndex * 0.1 + hi * 0.035,
                      }}
                      className="drop-shadow-[0_6px_14px_rgba(244,63,94,0.45)]"
                    >
                      <svg viewBox="0 0 24 28" className="h-5 w-5 md:h-7 md:w-7" aria-hidden>
                        <path fill="url(#leafCrownGrad)" d={LEAF_PATH} />
                      </svg>
                    </motion.div>
                  );
                })}
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
