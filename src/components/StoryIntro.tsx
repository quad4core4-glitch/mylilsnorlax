import { motion } from "framer-motion";
import { HeartSticker } from "@/components/HeartSticker";
import { SnorlaxSticker } from "@/components/SnorlaxSticker";

export function StoryIntro() {
  return (
    <section
      id="story"
      className="relative flex min-h-[100dvh] flex-col justify-center px-4 py-24 sm:px-6 md:py-32 lg:py-40"
    >
      <HeartSticker className="absolute bottom-10 left-4 h-9 w-9 sm:bottom-14 sm:left-8 md:h-10 md:w-10" />
      <SnorlaxSticker className="absolute bottom-8 right-4 h-14 w-14 sm:bottom-12 sm:right-8 md:h-16 md:w-16" />
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-6 text-xs font-light tracking-[0.4em] text-muted-foreground uppercase"
        >
          Chapter One
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="text-2xl font-extralight leading-relaxed text-foreground/90 sm:text-3xl md:text-5xl"
        >
          There are a thousand ways to say it.
          <br />
          <span className="text-gradient italic">I picked the slow one.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, delay: 0.5 }}
          className="mx-auto mt-8 max-w-xl text-base font-light leading-relaxed text-muted-foreground"
        >
          Yk, I&apos;m kinda bad at expressing things—
          <br />
          so I made this instead 🙃
        </motion.p>
      </div>
    </section>
  );
}
