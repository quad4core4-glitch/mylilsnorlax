import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { HeartTreeBloom } from "./HeartTreeBloom";
import { Particles } from "./Particles";

export function Hero() {
  const [treeOpen, setTreeOpen] = useState(false);

  const scrollDown = useCallback(() => {
    document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleBloomComplete = useCallback(() => {
    setTreeOpen(false);
    scrollDown();
  }, [scrollDown]);

  const handleCTAClick = useCallback(() => {
    setTreeOpen(true);
  }, []);

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <HeartTreeBloom open={treeOpen} onComplete={handleBloomComplete} />

      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="A cinematic silhouette of two people"
          width={1920}
          height={1280}
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-glow" />
      </div>

      <Particles count={50} />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
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
            className="inline-block will-change-transform [transform-style:preserve-3d]"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl font-extralight leading-[1.1] tracking-tight drop-shadow-[0_22px_48px_rgba(0,0,0,0.42)] md:text-7xl lg:text-8xl"
            >
              <span className="text-gradient">Annoii!</span>
              <span className="text-foreground">😽</span>
            </motion.h1>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-12 flex justify-center"
        >
          <button
            type="button"
            onClick={handleCTAClick}
            disabled={treeOpen}
            className="group glass relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-9 py-4 text-sm font-light tracking-widest text-foreground transition-all hover:scale-[1.03] hover:shadow-[0_0_50px_var(--glow-pink)] enabled:active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
          >
            <span className="relative z-10 text-lg leading-none" aria-hidden>
              🧸
            </span>
            <span className="relative z-10">Click Me</span>
            <span className="absolute inset-0 -z-0 bg-gradient-to-r from-accent/0 via-accent/30 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        </motion.div>
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
