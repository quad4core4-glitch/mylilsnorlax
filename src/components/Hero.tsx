import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { Particles } from "./Particles";

export function Hero() {
  const scrollDown = () => {
    document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
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
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mb-6 text-xs font-light tracking-[0.4em] text-muted-foreground uppercase"
        >
          A Love Letter, In Code
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient text-5xl font-extralight leading-[1.1] tracking-tight md:text-7xl lg:text-8xl"
        >
          Some people send edits.
          <br />
          <span className="italic font-light">I opened VS Code.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={scrollDown}
            className="group glass relative overflow-hidden rounded-full px-9 py-4 text-sm font-light tracking-widest text-foreground uppercase transition-all hover:scale-[1.03] hover:shadow-[0_0_50px_var(--glow-pink)]"
          >
            <span className="relative z-10">Enter Our Story</span>
            <span className="absolute inset-0 -z-0 bg-gradient-to-r from-accent/0 via-accent/30 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        </motion.div>
      </div>

      <motion.button
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
