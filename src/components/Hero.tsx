import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { HeartTreeBloom } from "./HeartTreeBloom";
import { Particles } from "./Particles";

export function Hero() {
  const [treeOpen, setTreeOpen] = useState(false);
  const [loveFlash, setLoveFlash] = useState(false);

  const scrollDown = useCallback(() => {
    document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleBloomComplete = useCallback(() => {
    setTreeOpen(false);
    scrollDown();
  }, [scrollDown]);

  const handleCTAClick = useCallback(() => {
    setLoveFlash(true);
    setTreeOpen(true);
    window.setTimeout(() => setLoveFlash(false), 900);
  }, []);

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <HeartTreeBloom open={treeOpen} onComplete={handleBloomComplete} />

      <AnimatePresence>
        {loveFlash ? (
          <motion.div
            key="love-flash"
            className="pointer-events-none fixed inset-0 z-[47] bg-[radial-gradient(circle_at_50%_52%,rgba(251,113,133,0.5),rgba(244,63,94,0.18)_38%,transparent_62%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 0.35, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            aria-hidden
          />
        ) : null}
      </AnimatePresence>

      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="A cinematic silhouette of two people"
          width={1920}
          height={1280}
          className="h-full w-full scale-[1.05] object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-glow" />
        {/* soft moving spotlight */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(251,113,133,0.18), transparent 55%)",
            mixBlendMode: "screen",
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Particles count={50} />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Tiny chip */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-light tracking-[0.4em] text-foreground/80 uppercase backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-pink-300 shadow-[0_0_10px_rgba(251,207,232,0.9)]" />
          a love letter — in code
        </motion.div>

        <div
          className="inline-block [perspective:min(920px,96vw)]"
          style={{ perspectiveOrigin: "50% 35%" }}
        >
          <motion.div
            animate={{
              rotateX: [-5, 6, -5],
              rotateY: [-6, 7, -6],
              translateZ: [0, 16, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative inline-block will-change-transform [transform-style:preserve-3d]"
          >
            {/* Soft halo behind title */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(251,113,133,0.45), rgba(168,85,247,0.18) 40%, transparent 70%)",
              }}
              animate={{ opacity: [0.55, 0.85, 0.55], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-[3.25rem] font-extralight leading-[1.05] tracking-tight drop-shadow-[0_22px_48px_rgba(0,0,0,0.5)] sm:text-6xl md:text-7xl lg:text-8xl"
            >
              <span className="text-gradient">Annoii!</span>
              <span className="text-foreground">😽</span>
            </motion.h1>
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.0 }}
          className="mx-auto mt-7 max-w-md text-sm font-extralight italic leading-relaxed text-foreground/75 sm:text-base"
        >
          some people send edits.
          <br className="hidden sm:block" />{" "}
          <span className="text-pink-200/90">i opened VS Code — for you.</span>
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.25 }}
          className="mx-auto mt-8 h-px w-24 origin-center bg-gradient-to-r from-transparent via-pink-300/70 to-transparent"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-8 flex justify-center"
        >
          <button
            type="button"
            onClick={handleCTAClick}
            disabled={treeOpen}
            className="group glass relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full border border-white/15 px-7 py-3.5 text-xs font-light tracking-[0.3em] text-foreground uppercase transition-all hover:scale-[1.04] hover:border-white/30 hover:shadow-[0_0_60px_var(--glow-pink)] enabled:active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 sm:px-10 sm:py-4 sm:text-sm"
          >
            {/* Shimmer */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:animate-[shimmer_1.4s_ease-in-out_infinite] group-hover:opacity-100"
            />
            <span className="relative z-10 text-base leading-none" aria-hidden>
              🌹
            </span>
            <span className="relative z-10">Bloom for me</span>
            <span className="relative z-10 text-base leading-none" aria-hidden>
              ✨
            </span>
            <span className="absolute inset-0 -z-0 bg-gradient-to-r from-pink-400/0 via-pink-400/30 to-amber-300/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </button>
        </motion.div>

        {/* Tiny hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2 }}
          className="mt-5 text-[10px] font-light tracking-[0.4em] text-muted-foreground uppercase"
        >
          tap to bloom
        </motion.p>
      </div>

      <motion.button
        type="button"
        onClick={scrollDown}
        aria-label="Scroll down"
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-muted-foreground"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="h-5 w-5" />
      </motion.button>
    </section>
  );
}
