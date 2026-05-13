import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo } from "react";

/** Crown rows from wide (bottom of crown) to tip — flex-col-reverse order. */
const CROWN_ROWS = [6, 5, 4, 3, 2, 1];

const LEAF_PATH =
  "M12 26.5 C7 25.5 3.5 20 4 14 C4.5 8 8 4 12 6 C16 4 19.5 8 20 14 C20.5 20 17 25.5 12 26.5 Z";

const TRUNK_PATH =
  "M24 148 C10 147 4 132 4 112 C4 78 9 42 15 8 Q24 2 33 8 C39 42 44 78 44 112 C44 132 38 147 24 148 Z";

type HeartTreeBloomProps = {
  open: boolean;
  onComplete: () => void;
};

const TOTAL_MS = 5200;

type BurstKind = "leaf" | "spark" | "shine";

type BurstSpec = {
  x: number;
  y: number;
  z: number;
  delay: number;
  duration: number;
  rot: number;
  scale: number;
  kind: BurstKind;
};

function makeBurstSpecs(open: boolean): BurstSpec[] {
  if (!open) return [];
  const out: BurstSpec[] = [];
  const n = 72;
  for (let i = 0; i < n; i++) {
    const u = (i + 0.31) / n;
    const v = Math.random();
    const theta = 2 * Math.PI * u + (Math.random() - 0.5) * 0.55;
    const phi = Math.acos(2 * v - 1);
    const r = 85 + Math.random() * 240;
    const sinP = Math.sin(phi);
    out.push({
      x: sinP * Math.cos(theta) * r,
      y: -Math.cos(phi) * r * 0.52 - 30 - Math.random() * 120,
      z: sinP * Math.sin(theta) * r * 1.15,
      delay: 0.95 + Math.random() * 0.45,
      duration: 1.35 + Math.random() * 0.85,
      rot: (Math.random() - 0.5) * 620,
      scale: 0.35 + Math.random() * 0.75,
      kind: i % 6 === 0 ? "shine" : i % 4 === 0 ? "spark" : "leaf",
    });
  }
  return out;
}

function LoveBurst3D({ specs }: { specs: BurstSpec[] }) {
  if (specs.length === 0) return null;
  return (
    <div className="pointer-events-none absolute inset-0 flex items-end justify-center [transform-style:preserve-3d]">
      {specs.map((b, i) => {
        const base = "absolute left-1/2 will-change-transform [transform-style:preserve-3d]";
        if (b.kind === "spark") {
          return (
            <motion.span
              key={`sp-${i}`}
              className={`${base} top-[58%] h-2.5 w-2.5 rounded-full bg-gradient-to-br from-pink-200 via-rose-400 to-orange-300 shadow-[0_0_18px_6px_rgba(251,113,133,0.65)]`}
              initial={{ x: "-50%", y: 0, z: 0, opacity: 0, scale: 0 }}
              animate={{
                x: `calc(-50% + ${b.x}px)`,
                y: `${b.y}px`,
                z: b.z,
                opacity: [0, 1, 0.9, 0],
                scale: [0, b.scale * 1.4, b.scale, 0],
                rotateZ: b.rot,
              }}
              transition={{ delay: b.delay, duration: b.duration, ease: [0.22, 1, 0.36, 1] }}
            />
          );
        }
        if (b.kind === "shine") {
          return (
            <motion.span
              key={`sh-${i}`}
              className={`${base} top-[58%] h-3 w-3 rotate-45 bg-gradient-to-br from-amber-100 via-pink-300 to-rose-500 opacity-90 shadow-lg`}
              initial={{ x: "-50%", y: 0, z: 0, opacity: 0, scale: 0 }}
              animate={{
                x: `calc(-50% + ${b.x}px)`,
                y: `${b.y}px`,
                z: b.z,
                opacity: [0, 1, 0.85, 0],
                scale: [0, b.scale * 1.1, 0.2],
                rotateZ: b.rot,
              }}
              transition={{ delay: b.delay, duration: b.duration * 0.95, ease: [0.22, 1, 0.36, 1] }}
            />
          );
        }
        return (
          <motion.span
            key={`lf-${i}`}
            className={`${base} top-[58%] h-4 w-4 md:h-5 md:w-5`}
            initial={{ x: "-50%", y: 0, z: 0, opacity: 0, scale: 0, rotateX: 0, rotateZ: 0 }}
            animate={{
              x: `calc(-50% + ${b.x}px)`,
              y: `${b.y}px`,
              z: b.z,
              opacity: [0, 1, 0.95, 0],
              scale: [0, b.scale, b.scale * 0.85, 0],
              rotateX: b.rot * 0.25,
              rotateZ: b.rot * 0.5,
            }}
            transition={{ delay: b.delay, duration: b.duration, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg viewBox="0 0 24 28" className="h-full w-full drop-shadow-[0_4px_12px_rgba(244,63,94,0.55)]" aria-hidden>
              <path fill="url(#leafCrownGrad)" d={LEAF_PATH} />
            </svg>
          </motion.span>
        );
      })}
    </div>
  );
}

export function HeartTreeBloom({ open, onComplete }: HeartTreeBloomProps) {
  const burstSpecs = useMemo(() => makeBurstSpecs(open), [open]);

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
          className="pointer-events-auto fixed inset-0 z-[48] flex items-end justify-center bg-black/35 backdrop-blur-[4px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.38 }}
          role="presentation"
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_72%,rgba(251,113,133,0.42),rgba(244,63,94,0.12)_40%,transparent_72%)]"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: [0, 0.95, 0.55], scale: [1.05, 1, 1.02] }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />

          <motion.div
            aria-hidden
            className="pointer-events-none absolute bottom-[6%] left-1/2 h-[min(52vh,420px)] w-[min(92vw,520px)] -translate-x-1/2 rounded-full border border-pink-400/25 shadow-[0_0_60px_rgba(251,113,133,0.35)]"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: [0.2, 1.05, 1], opacity: [0, 0.55, 0.25] }}
            transition={{ delay: 0.55, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />

          <div
            className="pointer-events-none absolute inset-0 flex items-end justify-center [perspective:min(1100px,96vw)] [perspective-origin:50%_78%] [transform-style:preserve-3d] pb-[min(18vh,8rem)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <LoveBurst3D specs={burstSpecs} />
          </div>

          <svg width="0" height="0" className="absolute overflow-hidden" aria-hidden>
            <defs>
              <linearGradient id="leafCrownGrad" x1="10%" y1="100%" x2="90%" y2="0%">
                <stop offset="0%" stopColor="#fb7185" />
                <stop offset="45%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
            </defs>
          </svg>

          <div
            className="relative mb-0 flex w-full max-w-lg flex-col-reverse items-center justify-end px-4 pb-6 md:max-w-2xl md:pb-14 [perspective:min(1100px,96vw)] [perspective-origin:50%_88%]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="relative flex w-full flex-col-reverse items-center justify-end [transform-style:preserve-3d]"
              initial={{ y: "110%", rotateX: 26, rotateY: -10, scale: 0.82 }}
              animate={{
                y: 0,
                rotateX: [26, -4, 1.5, 0],
                rotateY: [-10, 6, -2, 0],
                scale: [0.82, 1.04, 0.99, 1],
              }}
              transition={{
                y: { type: "spring", stiffness: 88, damping: 15, mass: 0.9 },
                rotateX: { duration: 1.35, ease: [0.22, 1, 0.36, 1] },
                rotateY: { duration: 1.35, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 1.35, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              <motion.div
                animate={{
                  rotateX: [0, 2.5, 0],
                  rotateY: [0, -3, 0],
                  translateZ: [0, 10, 0],
                }}
                transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
                className="relative flex w-full flex-col-reverse items-center [transform-style:preserve-3d] drop-shadow-[0_40px_70px_rgba(244,63,94,0.35)]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.svg
                  aria-hidden
                  viewBox="0 0 48 148"
                  preserveAspectRatio="xMidYMax meet"
                  className="relative z-[1] w-[3.35rem] overflow-visible md:w-[4.5rem]"
                  style={{ height: "clamp(7.25rem, 23vh, 11.5rem)" }}
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

                <motion.svg
                  aria-hidden
                  viewBox="0 0 220 320"
                  preserveAspectRatio="xMidYMax meet"
                  className="pointer-events-none absolute bottom-[calc(clamp(7.25rem,23vh,11.5rem)-0.5rem)] left-1/2 z-0 w-[min(88vw,22rem)] -translate-x-1/2 overflow-visible md:w-[26rem]"
                  style={{ height: "min(48vh, 340px)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.35 }}
                >
                  <motion.path
                    d="M110 300 Q45 210 28 95"
                    fill="none"
                    stroke="#4a2c18"
                    strokeWidth="4.2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.92 }}
                    transition={{ delay: 0.58, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <motion.path
                    d="M110 300 Q175 205 192 88"
                    fill="none"
                    stroke="#4a2c18"
                    strokeWidth="4.2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.92 }}
                    transition={{ delay: 0.68, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <motion.path
                    d="M110 295 Q108 180 112 72"
                    fill="none"
                    stroke="#5c3d2e"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.75 }}
                    transition={{ delay: 0.78, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <motion.path
                    d="M110 300 Q72 235 55 160"
                    fill="none"
                    stroke="#3d2614"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    opacity={0.55}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.82, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <motion.path
                    d="M110 300 Q148 232 165 158"
                    fill="none"
                    stroke="#3d2614"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    opacity={0.55}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.82, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.svg>

                {CROWN_ROWS.map((count, rowIndex) => (
                  <div
                    key={`row-${count}`}
                    className="relative z-[2] mb-0.5 flex flex-row justify-center gap-0.5 md:mb-1 md:gap-1"
                    style={{
                      transform: `translateZ(${-32 + rowIndex * 11}px)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {Array.from({ length: count }).map((_, hi) => {
                      const tilt = ((hi + rowIndex) % 5) * 4 - 8;
                      const tz = -6 + hi * 3 + rowIndex * 2;
                      return (
                        <motion.div
                          key={`h-${rowIndex}-${hi}`}
                          initial={{ scale: 0, opacity: 0, rotate: -48 + tilt * 0.35, y: 36, z: -40 }}
                          animate={{
                            scale: 1,
                            opacity: 1,
                            rotate: tilt,
                            y: 0,
                            z: tz,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 15,
                            delay: 0.48 + rowIndex * 0.095 + hi * 0.032,
                          }}
                          className="drop-shadow-[0_8px_18px_rgba(244,63,94,0.5)] [transform-style:preserve-3d]"
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          <motion.div
                            animate={{
                              rotateY: [0, 14, -10, 0],
                              rotateX: [0, -6, 4, 0],
                            }}
                            transition={{
                              duration: 5.2 + (hi % 4) * 0.4,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: rowIndex * 0.08 + hi * 0.05,
                            }}
                            className="[transform-style:preserve-3d]"
                          >
                            <svg viewBox="0 0 24 28" className="h-5 w-5 md:h-7 md:w-7" aria-hidden>
                              <path fill="url(#leafCrownGrad)" d={LEAF_PATH} />
                            </svg>
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </div>
                ))}

                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[58%] rounded-full opacity-0 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(ellipse 82% 72% at 50% 100%, rgba(251,113,133,0.6), rgba(244,63,94,0.28) 42%, transparent 70%)",
                  }}
                  initial={{ opacity: 0, scale: 0.45 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.75, duration: 1.15, ease: "easeOut" }}
                />

                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -top-10 left-1/2 z-[3] h-28 w-28 -translate-x-1/2 rounded-full bg-gradient-to-t from-pink-400/45 to-transparent opacity-0 blur-2xl md:h-36 md:w-36"
                  animate={{ opacity: [0, 1, 0.45], scale: [0.5, 1.25, 1] }}
                  transition={{ delay: 1.05, duration: 1.5, ease: "easeOut" }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
