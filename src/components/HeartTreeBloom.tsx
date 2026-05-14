import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo } from "react";

type HeartTreeBloomProps = {
  open: boolean;
  onComplete: () => void;
};

const TOTAL_MS = 5800;

// Petal shape — soft teardrop
const PETAL_PATH =
  "M50 4 C72 18 86 42 86 70 C86 92 70 108 50 108 C30 108 14 92 14 70 C14 42 28 18 50 4 Z";

type Ring = {
  count: number;
  radius: number; // px from center
  size: number; // petal size in px
  z: number; // depth
  tilt: number; // outward tilt
  delay: number;
  hueShift: number;
  opacity: number;
};

const RINGS: Ring[] = [
  { count: 12, radius: 96, size: 110, z: -20, tilt: 38, delay: 0.55, hueShift: 0, opacity: 0.95 },
  { count: 10, radius: 70, size: 92, z: 0, tilt: 22, delay: 0.75, hueShift: 8, opacity: 1 },
  { count: 8, radius: 46, size: 76, z: 18, tilt: 8, delay: 0.95, hueShift: 16, opacity: 1 },
  { count: 6, radius: 26, size: 58, z: 32, tilt: -6, delay: 1.1, hueShift: 24, opacity: 1 },
];

type BurstSpec = {
  x: number;
  y: number;
  z: number;
  delay: number;
  duration: number;
  rot: number;
  scale: number;
  kind: "petal" | "spark" | "bokeh" | "shine";
};

function makeBurstSpecs(open: boolean): BurstSpec[] {
  if (!open) return [];
  const out: BurstSpec[] = [];
  const n = 90;
  for (let i = 0; i < n; i++) {
    const u = (i + 0.31) / n;
    const v = Math.random();
    const theta = 2 * Math.PI * u + (Math.random() - 0.5) * 0.55;
    const phi = Math.acos(2 * v - 1);
    const r = 110 + Math.random() * 280;
    const sinP = Math.sin(phi);
    const k = i % 7;
    const kind: BurstSpec["kind"] =
      k === 0 ? "shine" : k === 1 ? "spark" : k === 2 ? "bokeh" : "petal";
    out.push({
      x: sinP * Math.cos(theta) * r,
      y: -Math.cos(phi) * r * 0.55 - 30 - Math.random() * 140,
      z: sinP * Math.sin(theta) * r * 1.3,
      delay: 1.4 + Math.random() * 0.6,
      duration: 1.6 + Math.random() * 1.1,
      rot: (Math.random() - 0.5) * 720,
      scale: 0.35 + Math.random() * 0.95,
      kind,
    });
  }
  return out;
}

function PetalParticles({ specs }: { specs: BurstSpec[] }) {
  if (specs.length === 0) return null;
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]">
      {specs.map((b, i) => {
        const base =
          "absolute left-1/2 top-1/2 will-change-transform [transform-style:preserve-3d]";
        if (b.kind === "spark") {
          return (
            <motion.span
              key={i}
              className={`${base} h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_18px_6px_rgba(251,207,232,0.8)]`}
              initial={{ x: "-50%", y: "-50%", z: 0, opacity: 0, scale: 0 }}
              animate={{
                x: `calc(-50% + ${b.x}px)`,
                y: `calc(-50% + ${b.y}px)`,
                z: b.z,
                opacity: [0, 1, 0.9, 0],
                scale: [0, b.scale * 1.4, b.scale, 0],
              }}
              transition={{ delay: b.delay, duration: b.duration, ease: [0.22, 1, 0.36, 1] }}
            />
          );
        }
        if (b.kind === "bokeh") {
          return (
            <motion.span
              key={i}
              className={`${base} h-7 w-7 rounded-full md:h-9 md:w-9`}
              style={{
                background:
                  "radial-gradient(circle, rgba(251,207,232,0.9), rgba(244,114,182,0.35) 45%, transparent 72%)",
                filter: "blur(5px)",
                mixBlendMode: "screen",
              }}
              initial={{ x: "-50%", y: "-50%", z: 0, opacity: 0, scale: 0 }}
              animate={{
                x: `calc(-50% + ${b.x}px)`,
                y: `calc(-50% + ${b.y}px)`,
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
              key={i}
              className={`${base} h-2.5 w-2.5 rotate-45 bg-gradient-to-br from-amber-100 via-pink-300 to-rose-500 shadow-lg`}
              initial={{ x: "-50%", y: "-50%", z: 0, opacity: 0, scale: 0 }}
              animate={{
                x: `calc(-50% + ${b.x}px)`,
                y: `calc(-50% + ${b.y}px)`,
                z: b.z,
                opacity: [0, 1, 0.85, 0],
                scale: [0, b.scale * 1.1, 0.2],
                rotateZ: b.rot,
              }}
              transition={{ delay: b.delay, duration: b.duration * 0.95, ease: [0.22, 1, 0.36, 1] }}
            />
          );
        }
        // drifting petal
        return (
          <motion.span
            key={i}
            className={`${base} h-3.5 w-3.5 md:h-5 md:w-5`}
            initial={{ x: "-50%", y: "-50%", z: 0, opacity: 0, scale: 0, rotateZ: 0 }}
            animate={{
              x: `calc(-50% + ${b.x}px)`,
              y: `calc(-50% + ${b.y}px)`,
              z: b.z,
              opacity: [0, 1, 0.95, 0],
              scale: [0, b.scale, b.scale * 0.85, 0],
              rotateX: b.rot * 0.3,
              rotateZ: b.rot * 0.6,
            }}
            transition={{ delay: b.delay, duration: b.duration, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg viewBox="0 0 100 112" className="h-full w-full drop-shadow-[0_4px_12px_rgba(244,63,94,0.6)]">
              <path fill="url(#petalDrift)" d={PETAL_PATH} />
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
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 origin-bottom"
          style={{
            width: "2px",
            height: "150vh",
            background:
              "linear-gradient(to top, rgba(251,113,133,0.5), rgba(251,207,232,0.18) 40%, transparent 80%)",
            filter: "blur(6px)",
            transform: `translateX(-50%) translateY(-100%) rotate(${(i - 4) * 8}deg)`,
          }}
          animate={{
            opacity: [0, 0.85, 0.4, 0.7],
            scaleY: [0.7, 1.05, 0.95, 1],
          }}
          transition={{
            delay: 0.8 + i * 0.07,
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

function Flower3D() {
  return (
    <motion.div
      className="relative [transform-style:preserve-3d]"
      initial={{ scale: 0.4, rotateX: 60, rotateZ: -30, opacity: 0 }}
      animate={{
        scale: [0.4, 1.08, 0.98, 1],
        rotateX: [60, -8, 4, 0],
        rotateZ: [-30, 6, -2, 0],
        opacity: [0, 1, 1, 1],
      }}
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="relative [transform-style:preserve-3d]"
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {RINGS.map((ring, ri) => (
          <div
            key={ri}
            className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
            style={{
              transform: `translate(-50%, -50%) translateZ(${ring.z}px)`,
            }}
          >
            {Array.from({ length: ring.count }).map((_, pi) => {
              const angle = (360 / ring.count) * pi;
              return (
                <motion.div
                  key={pi}
                  className="absolute left-0 top-0 [transform-style:preserve-3d]"
                  style={{
                    width: ring.size,
                    height: ring.size * 1.12,
                    marginLeft: -ring.size / 2,
                    marginTop: -ring.size * 0.56,
                    transformOrigin: "50% 100%",
                  }}
                  initial={{
                    rotateZ: angle,
                    rotateX: 90,
                    scale: 0.2,
                    opacity: 0,
                  }}
                  animate={{
                    rotateZ: angle,
                    rotateX: ring.tilt,
                    scale: 1,
                    opacity: ring.opacity,
                  }}
                  transition={{
                    delay: ring.delay + pi * 0.04,
                    duration: 1.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <motion.div
                    className="h-full w-full [transform-style:preserve-3d]"
                    animate={{ rotateX: [ring.tilt, ring.tilt - 4, ring.tilt] }}
                    transition={{
                      duration: 6 + ri,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: pi * 0.05,
                    }}
                    style={{
                      transformOrigin: "50% 100%",
                    }}
                  >
                    <svg
                      viewBox="0 0 100 112"
                      className="h-full w-full drop-shadow-[0_10px_22px_rgba(244,63,94,0.45)]"
                    >
                      <path d={PETAL_PATH} fill={`url(#petalGrad-${ri})`} />
                      <path
                        d={PETAL_PATH}
                        fill="url(#petalSheen)"
                        style={{ mixBlendMode: "soft-light" }}
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        ))}

        {/* Pollen / center */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]"
          style={{ transform: "translate(-50%, -50%) translateZ(48px)" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="h-14 w-14 rounded-full md:h-20 md:w-20"
            style={{
              background:
                "radial-gradient(circle at 38% 35%, #fffbe6 0%, #fde68a 30%, #f59e0b 65%, #b45309 100%)",
              boxShadow:
                "0 0 40px 8px rgba(251,191,36,0.55), inset -6px -6px 18px rgba(0,0,0,0.25), inset 6px 6px 16px rgba(255,255,255,0.45)",
            }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full"
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.15, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(circle, rgba(255,236,180,0.7), transparent 60%)",
              filter: "blur(8px)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Stem */}
      <motion.svg
        aria-hidden
        viewBox="0 0 60 220"
        preserveAspectRatio="xMidYMax meet"
        className="absolute left-1/2 top-[58%] -translate-x-1/2 overflow-visible"
        style={{
          width: "clamp(2.2rem, 6vw, 3.2rem)",
          height: "clamp(9rem, 28vh, 16rem)",
          transform: "translate(-50%, 0) translateZ(-10px)",
        }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <defs>
          <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14532d" />
            <stop offset="50%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>
        </defs>
        <path
          d="M30 0 C26 60 34 110 30 220"
          stroke="url(#stemGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <motion.path
          d="M30 110 C 8 100 -2 70 14 60 C 18 80 24 96 30 110 Z"
          fill="url(#leafGrad)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "30px 110px", transformBox: "fill-box" }}
        />
        <motion.path
          d="M30 150 C 52 140 62 110 46 100 C 42 120 36 136 30 150 Z"
          fill="url(#leafGrad)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "30px 150px", transformBox: "fill-box" }}
        />
      </motion.svg>
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
          key="flower-bloom"
          className="pointer-events-auto fixed inset-0 z-[48] flex items-center justify-center bg-black/65 backdrop-blur-[12px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          role="presentation"
        >
          {/* svg defs */}
          <svg width="0" height="0" className="absolute overflow-hidden" aria-hidden>
            <defs>
              <radialGradient id="petalGrad-0" cx="50%" cy="80%" r="80%">
                <stop offset="0%" stopColor="#fda4af" />
                <stop offset="55%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#9f1239" />
              </radialGradient>
              <radialGradient id="petalGrad-1" cx="50%" cy="80%" r="80%">
                <stop offset="0%" stopColor="#fecdd3" />
                <stop offset="55%" stopColor="#fb7185" />
                <stop offset="100%" stopColor="#be123c" />
              </radialGradient>
              <radialGradient id="petalGrad-2" cx="50%" cy="80%" r="80%">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="50%" stopColor="#fda4af" />
                <stop offset="100%" stopColor="#e11d48" />
              </radialGradient>
              <radialGradient id="petalGrad-3" cx="50%" cy="80%" r="80%">
                <stop offset="0%" stopColor="#fff7ed" />
                <stop offset="55%" stopColor="#fcd34d" />
                <stop offset="100%" stopColor="#f97316" />
              </radialGradient>
              <linearGradient id="petalSheen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
              </linearGradient>
              <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#065f46" />
              </linearGradient>
              <radialGradient id="petalDrift" cx="50%" cy="80%" r="80%">
                <stop offset="0%" stopColor="#fecdd3" />
                <stop offset="60%" stopColor="#fb7185" />
                <stop offset="100%" stopColor="#9f1239" />
              </radialGradient>
            </defs>
          </svg>

          {/* Vignette */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 50% 55%, transparent 30%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.9) 100%)",
            }}
          />

          {/* Aurora */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 55%, rgba(251,113,133,0.55), rgba(168,85,247,0.18) 38%, transparent 70%), radial-gradient(ellipse 60% 50% at 25% 30%, rgba(56,189,248,0.18), transparent 60%)",
            }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: [0, 1, 0.7], scale: [1.1, 1, 1.04] }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />

          <LightRays />

          {/* Glassmorphism halo */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
            style={{
              width: "min(94vw, 620px)",
              height: "min(70vh, 620px)",
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.10), rgba(255,255,255,0.02) 55%, transparent 75%)",
              backdropFilter: "blur(14px) saturate(160%)",
              WebkitBackdropFilter: "blur(14px) saturate(160%)",
              boxShadow:
                "0 0 100px rgba(251,113,133,0.45), inset 0 0 80px rgba(255,255,255,0.08)",
            }}
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: [0.2, 1.06, 1], opacity: [0, 0.85, 0.6] }}
            transition={{ delay: 0.45, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Ripple rings */}
          {[0, 1, 2].map((r) => (
            <motion.div
              key={r}
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pink-300/30"
              style={{ width: "min(70vw, 460px)", height: "min(70vw, 460px)", maxHeight: "55vh" }}
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{ scale: [0.1, 1.7 + r * 0.25], opacity: [0, 0.6, 0] }}
              transition={{ delay: 1 + r * 0.35, duration: 2.8, ease: "easeOut" }}
            />
          ))}

          {/* Flower stage */}
          <div
            className="relative flex items-center justify-center"
            style={{
              perspective: "min(1100px, 96vw)",
              perspectiveOrigin: "50% 50%",
              transformStyle: "preserve-3d",
              width: "min(80vw, 460px)",
              height: "min(80vw, 460px)",
              maxHeight: "60vh",
            }}
          >
            <Flower3D />
          </div>

          {/* Petal burst */}
          <PetalParticles specs={burstSpecs} />

          {/* Caption */}
          <motion.div
            className="pointer-events-none absolute top-[10%] left-1/2 -translate-x-1/2 px-6 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: [0, 1, 1, 0], y: [-10, 0, 0, -6] }}
            transition={{ delay: 1.4, duration: 3.8, times: [0, 0.16, 0.78, 1], ease: "easeOut" }}
          >
            <p className="text-[10px] font-light tracking-[0.5em] text-pink-200/80 uppercase">
              for you
            </p>
            <p className="mt-2 text-2xl font-extralight italic text-white drop-shadow-[0_4px_20px_rgba(251,113,133,0.55)] sm:text-3xl md:text-4xl">
              a flower that blooms only for you
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
