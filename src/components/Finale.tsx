import { motion } from "framer-motion";
import { Particles } from "./Particles";

export function Finale() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6">
      <Particles count={30} />
      <div className="absolute inset-0 bg-glow opacity-50" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl font-extralight leading-tight text-foreground md:text-6xl lg:text-7xl"
        >
          I could&apos;ve sent an edit.
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 1.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient mt-6 text-4xl font-light italic leading-tight md:text-6xl lg:text-7xl"
        >
          Instead, I built something.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 1.8 }}
          className="mx-auto mt-16 h-px w-32 origin-center bg-gradient-to-r from-transparent via-primary to-transparent"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 2.4 }}
          className="mt-10 text-xs font-light tracking-[0.5em] text-muted-foreground uppercase"
        >
          For you — always
        </motion.p>
      </div>
    </section>
  );
}
