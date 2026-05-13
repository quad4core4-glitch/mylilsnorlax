import { motion } from "framer-motion";

export function StoryIntro() {
  return (
    <section id="story" className="relative px-6 py-32">
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
          className="text-3xl font-extralight leading-relaxed text-foreground/90 md:text-5xl"
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
          Line by line, commit by commit. Not because words weren&apos;t enough —
          but because some feelings deserve their own little universe.
        </motion.p>
      </div>
    </section>
  );
}
