import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo } from "react";

/** Vertically symmetric petal; radial copies form an 8-fold flower. */
const PETAL_PATH =
  "M50 112 C14 78 10 32 50 4 C90 32 86 78 50 112 Z";

const STEM_PATH =
  "M24 148 C11 147 5 132 5 112 C5 82 10 52 18 22 Q24 6 30 22 C38 52 43 82 43 112 C43 132 37 147 24 148 Z";

const PETAL_COUNT = 8;

type HeartTreeBloomProps = {
  open: boolean;
  onComplete: () => void;
};

const TOTAL_MS = 5600;

type BurstKind = "leaf" | "spark" | "shine" | "bokeh";

type BurstSpec = {
  x: number;
  y: number;
  z: number;
  delay: number;
  duration: number;
  rot: number;
  scale: number;
  kind: BurstKind;
  hue: number;
};

function makeBurstSpecs(open: boolean): BurstSpec[] {
  if (!open) return [];
  const out: BurstSpec[] = [];
  const n = 96;
  for (let i = 0; i < n; i++) {
    const u = (i + 0.31) / n;
    const v = Math.random();
    const theta = 2 * Math.PI * u + (Math.random() - 0.5) * 0.55;
    const phi = Math.acos(2 * v - 1);
    const r = 90 + Math.random() * 280;
    const sinP = Math.sin(phi);
    const k = i % 7;
    const kind: BurstKind =
      k === 0 ? "shine" : k === 1 ? "spark" : k === 2 ? "bokeh" : "leaf";
    out.push({
      x: sinP * Math.cos(theta) * r,
      y: -Math.cos(phi) * r * 0.55 - 30 - Math.random() * 140,
      z: sinP * Math.sin(theta) * r * 1.3,
      delay: 0.9 + Math.random() * 0.55,
      duration: 1.5 + Math.random() * 1.1,
      rot: (Math.random() - 0.5) * 720,
      scale: 0.35 + Math.random() * 0.95,
      kind,
      hue: Math.random() * 30 - 10,
    });
  }
  return out;
}

function LoveBurst3D({ specs }: { specs: BurstSpec[] }) {
  if (specs.length === 0) return null;
  return (
    <div className="pointer-events-none absolute inset-0 flex items-end justify-center [transform-style:preserve-3d]">
      {specs.map((b, i) => {
        const base =
          "absolute left-1/2 will-change-transform [transform-style:preserve-3d]";
        if (b.kind === "spark") {
          return (
            <motion.span
              key={`sp-${i}`}
              className={`${base} top-[58%] h-2 w-2 rounded-full bg-gradient-to-br from-pink-100 via-rose-400 to-orange-300 shadow-[0_0_22px_8px_rgba(251,113,133,0.7)]`}
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
        if (b.kind === "bokeh") {
          return (
            <motion.span
              key={`bk-${i}`}
              className={`${base} top-[58%] h-6 w-6 rounded-full md:h-8 md:w-8`}
              style={{
                background:
                  "radial-gradient(circle, rgba(251,207,232,0.9), rgba(244,114,182,0.35) 45%, transparent 72%)",
                filter: "blur(4px)",
                mixBlendMode: "screen",
              }}
              initial={{ x: "-50%", y: 0, z: 0, opacity: 0, scale: 0 }}
              animate={{
                x: `calc(-50% + ${b.x}px)`,
                y: `${b.y}px`,
                z: b.z,
                opacity: [0, 0.95, 0.55, 0],
                scale: [0, b.scale * 1.6, b.scale * 1.2, 0],
              }}
              transition={{ delay: b.delay, duration: b.duration * 1.1, ease: "easeOut" }}
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
            className={`${base} top-[58%] h-3.5 w-3.5 md:h-5 md:w-5`}
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
            <svg viewBox="0 0 100 120" className="h-full w-full drop-shadow-[0_4px_12px_rgba(244,63,94,0.55)]" aria-hidden>
              <path fill="url(#petalFlowerGrad)" d={PETAL_PATH} />
            </svg>
          </motion.span>
        );
      })}
    </div>
  );
}

function LightRays() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.55, 0.3] }}
      transition={{ delay: 0.7, duration: 2, ease: "easeOut" }}
      style={{ mixBlendMode: "screen" }}
    >
      {Array.from({ length: 7 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 bottom-[12%] origin-bottom"
          style={{
            width: "2px",
            height: "120vh",
            background:
              "linear-gradient(to top, rgba(251,113,133,0.45), rgba(251,207,232,0.18) 40%, transparent 80%)",
            filter: "blur(6px)",
            transform: `translateX(-50%) rotate(${(i - 3) * 9}deg)`,
          }}
          animate={{
            opacity: [0, 0.85, 0.4, 0.7],
            scaleY: [0.7, 1.05, 0.95, 1],
          }}
          transition={{
            delay: 0.8 + i * 0.08,
            duration: 3.4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
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
          key="heart-flower"
          className="pointer-events-auto fixed inset-0 z-[48] flex items-end justify-center bg-black/55 backdrop-blur-[10px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          role="presentation"
        >
          {/* Cinematic vignette */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 50% 70%, transparent 35%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.85) 100%)",
            }}
          />

          {/* Aurora wash */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 80%, rgba(251,113,133,0.55), rgba(168,85,247,0.18) 38%, transparent 70%), radial-gradient(ellipse 60% 50% at 30% 30%, rgba(56,189,248,0.18), transparent 60%)",
            }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: [0, 1, 0.65], scale: [1.1, 1, 1.04] }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />

          <LightRays />

          {/* Glassmorphism circular halo */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute bottom-[8%] left-1/2 -translate-x-1/2 rounded-full border border-white/20"
            style={{
              width: "min(94vw, 560px)",
              height: "min(56vh, 460px)",
              background:
                "radial-gradient(circle at 50% 60%, rgba(255,255,255,0.08), rgba(255,255,255,0.02) 55%, transparent 75%)",
              backdropFilter: "blur(14px) saturate(160%)",
              WebkitBackdropFilter: "blur(14px) saturate(160%)",
              boxShadow:
                "0 0 80px rgba(251,113,133,0.35), inset 0 0 60px rgba(255,255,255,0.06)",
            }}
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: [0.2, 1.06, 1], opacity: [0, 0.8, 0.55] }}
            transition={{ delay: 0.5, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Concentric ripple rings */}
          {[0, 1, 2].map((r) => (
            <motion.div
              key={`ring-${r}`}
              aria-hidden
              className="pointer-events-none absolute bottom-[10%] left-1/2 -translate-x-1/2 rounded-full border border-pink-300/30"
              style={{ width: "min(80vw, 460px)", height: "min(80vw, 460px)", maxHeight: "50vh" }}
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{ scale: [0.1, 1.6 + r * 0.25], opacity: [0, 0.6, 0] }}
              transition={{
                delay: 0.95 + r * 0.35,
                duration: 2.6,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Burst particles */}
          <div
            className="pointer-events-none absolute inset-0 flex items-end justify-center [perspective:min(1100px,96vw)] [perspective-origin:50%_78%] [transform-style:preserve-3d] pb-[min(18vh,8rem)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <LoveBurst3D specs={burstSpecs} />
          </div>

          <svg width="0" height="0" className="absolute overflow-hidden" aria-hidden>
            <defs>
              <linearGradient id="petalFlowerGrad" x1="10%" y1="100%" x2="90%" y2="0%">
                <stop offset="0%" stopColor="#fb7185" />
                <stop offset="45%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
              <linearGradient id="trunkWoodGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#451a03" />
                <stop offset="35%" stopColor="#78350f" />
                <stop offset="72%" stopColor="#b45309" />
                <stop offset="100%" stopColor="#d4a574" />
              </linearGradient>
              <linearGradient id="trunkSheen" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="42%" stopColor="rgba(255,255,255,0.18)" />
                <stop offset="58%" stopColor="rgba(255,255,255,0.08)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.18)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Symmetric 3D flower stage */}
          <div
            className="relative mb-0 flex w-full max-w-md flex-col-reverse items-center justify-end px-4 pb-4 sm:max-w-lg md:max-w-2xl md:pb-14 [perspective:min(1100px,96vw)] [perspective-origin:50%_88%]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="relative flex w-full flex-col-reverse items-center justify-end [transform-style:preserve-3d]"
              initial={{ y: "115%", rotateX: 30, rotateY: -12, scale: 0.78 }}
              animate={{
                y: 0,
                rotateX: [30, -6, 2, 0],
                rotateY: [-12, 8, -3, 0],
                scale: [0.78, 1.06, 0.99, 1],
              }}
              transition={{
                y: { type: "spring", stiffness: 88, damping: 15, mass: 0.95 },
                rotateX: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
                rotateY: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              <motion.div
                animate={{
                  rotateX: [0, 3, 0],
                  rotateY: [0, -4, 0],
                  translateZ: [0, 14, 0],
                }}
                transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="relative flex w-full flex-col-reverse items-center [transform-style:preserve-3d] drop-shadow-[0_50px_80px_rgba(244,63,94,0.45)]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.svg
                  aria-hidden
                  viewBox="0 0 48 148"
                  preserveAspectRatio="xMidYMax meet"
                  className="relative z-[1] w-[2.75rem] overflow-visible sm:w-[3.35rem] md:w-[4.5rem]"
                  style={{ height: "clamp(6rem, 22vh, 11.5rem)" }}
                >
                  <motion.g
                    style={{ transformOrigin: "24px 148px", transformBox: "fill-box" }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <path d={STEM_PATH} fill="url(#trunkWoodGrad)" />
                    <path
                      d={STEM_PATH}
                      fill="none"
                      stroke="rgba(62, 32, 10, 0.45)"
                      strokeWidth="0.55"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <path
                      d={STEM_PATH}
                      fill="url(#trunkSheen)"
                      opacity={1}
                      style={{ mixBlendMode: "soft-light" }}
                    />
                  </motion.g>
                </motion.svg>

                {/* Radial 8-fold bloom: two staggered rings + raised core for depth */}
                <div
                  className="relative z-[2] -mb-1 flex w-full min-h-[min(40vh,320px)] justify-center sm:-mb-2 md:min-h-[min(44vh,360px)]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="relative w-[min(92vw,23rem)] [transform-style:preserve-3d] md:w-[27rem]"
                    style={{
                      height: "min(44vh, 360px)",
                      transformOrigin: "50% 90%",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {Array.from({ length: PETAL_COUNT }).map((_, i) => {
                      const step = 360 / PETAL_COUNT;
                      return (
                        <motion.div
                          key={`petal-outer-${i}`}
                          className="absolute left-1/2 bottom-[11%] w-[min(16vw,4.35rem)] -translate-x-1/2 [transform-style:preserve-3d] sm:w-[min(15vw,4.75rem)]"
                          style={{
                            height: "min(36vw, 9.25rem)",
                            transformOrigin: "50% 100%",
                            transform: `rotateZ(${i * step}deg) rotateX(54deg) translateZ(6px)`,
                          }}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 220,
                            damping: 15,
                            delay: 0.48 + i * 0.042,
                          }}
                        >
                          <svg
                            viewBox="0 0 100 120"
                            className="h-full w-full drop-shadow-[0_12px_26px_rgba(244,63,94,0.48)]"
                            preserveAspectRatio="xMidYMax meet"
                            aria-hidden
                          >
                            <path fill="url(#petalFlowerGrad)" d={PETAL_PATH} />
                          </svg>
                        </motion.div>
                      );
                    })}
                    {Array.from({ length: PETAL_COUNT }).map((_, i) => {
                      const step = 360 / PETAL_COUNT;
                      return (
                        <motion.div
                          key={`petal-inner-${i}`}
                          className="absolute left-1/2 bottom-[13%] w-[min(14vw,3.75rem)] -translate-x-1/2 [transform-style:preserve-3d]"
                          style={{
                            height: "min(30vw, 7.75rem)",
                            transformOrigin: "50% 100%",
                            transform: `rotateZ(${i * step + step / 2}deg) rotateX(38deg) translateZ(34px)`,
                          }}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 0.9, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 240,
                            damping: 16,
                            delay: 0.62 + i * 0.038,
                          }}
                        >
                          <svg
                            viewBox="0 0 100 120"
                            className="h-full w-full drop-shadow-[0_8px_20px_rgba(244,63,94,0.42)]"
                            preserveAspectRatio="xMidYMax meet"
                            aria-hidden
                          >
                            <path fill="url(#petalFlowerGrad)" d={PETAL_PATH} opacity={0.96} />
                          </svg>
                        </motion.div>
                      );
                    })}
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute left-1/2 bottom-[14%] z-[4] h-[min(15vw,3.75rem)] w-[min(15vw,3.75rem)] -translate-x-1/2 rounded-full [transform-style:preserve-3d]"
                      style={{
                        background:
                          "radial-gradient(circle at 32% 30%, #fff7ed, #fde68a 38%, #f59e0b 62%, #9a3412 100%)",
                        boxShadow:
                          "inset 0 -8px 14px rgba(120,53,15,0.42), 0 0 32px rgba(251,113,133,0.55)",
                        transform: "translateZ(46px)",
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.88, type: "spring", stiffness: 280, damping: 16 }}
                    />
                  </div>
                </div>

                {/* base glow */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[58%] rounded-full opacity-0 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(ellipse 82% 72% at 50% 100%, rgba(251,113,133,0.72), rgba(244,63,94,0.32) 42%, transparent 70%)",
                  }}
                  initial={{ opacity: 0, scale: 0.45 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                />

                {/* bloom halo */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -top-12 left-1/2 z-[3] h-28 w-28 -translate-x-1/2 rounded-full bg-gradient-to-t from-pink-400/55 to-transparent opacity-0 blur-2xl md:h-40 md:w-40"
                  animate={{ opacity: [0, 1, 0.5], scale: [0.5, 1.3, 1] }}
                  transition={{ delay: 1.1, duration: 1.6, ease: "easeOut" }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Cinematic caption */}
          <motion.div
            className="pointer-events-none absolute top-[14%] left-1/2 -translate-x-1/2 px-6 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: [0, 1, 1, 0], y: [-10, 0, 0, -6] }}
            transition={{ delay: 1.2, duration: 3.6, times: [0, 0.18, 0.78, 1], ease: "easeOut" }}
          >
            <p className="text-[10px] font-light tracking-[0.45em] text-pink-200/80 uppercase">
              For you,
            </p>
            <p className="mt-2 text-2xl font-extralight italic text-white drop-shadow-[0_4px_20px_rgba(251,113,133,0.55)] sm:text-3xl md:text-4xl">
              this ones yours my lil snorlax
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
