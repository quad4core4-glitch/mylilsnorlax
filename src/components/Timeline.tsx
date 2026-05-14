import { motion } from "framer-motion";
import { SnorlaxSticker } from "@/components/SnorlaxSticker";

const moments = [
  {
    date: "The First Line",
    title: "git init",
    text: "Every story starts with an empty folder and an impossible idea. Mine started with you.",
  },
  {
    date: "Late Nights",
    title: "Commit by commit",
    text: "I learned how you take your coffee somewhere between two error messages and a fixed bug.",
  },
  {
    date: "First Deploy",
    title: "It went live",
    text: "I shipped a small thing for you. You smiled. Best build of my life.",
  },
  {
    date: "Today",
    title: "Still building",
    text: "Some chapters write themselves in pull requests. This one was always for you.",
  },
];

export function Timeline() {
  return (
    <section id="memories" className="relative px-4 py-20 sm:px-6 md:py-32">
      <SnorlaxSticker className="absolute right-3 top-36 hidden h-12 w-12 opacity-[0.22] sm:right-6 sm:block md:top-44 md:h-14 md:w-14" />
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-12 text-center md:mb-20"
        >
          <p className="mb-3 text-[10px] font-light tracking-[0.4em] text-muted-foreground uppercase sm:text-xs">
            Memory Log
          </p>
          <h2 className="text-gradient text-3xl font-extralight sm:text-4xl md:text-6xl">
            Moments, in order
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent md:left-1/2" />

          {moments.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.05 }}
              className={`relative mb-14 flex md:mb-20 ${
                i % 2 === 0 ? "md:justify-start" : "md:justify-end"
              }`}
            >
              <div className="absolute left-4 top-3 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_20px_var(--glow-pink)] md:left-1/2" />
              <div
                className={`glass ml-12 max-w-md rounded-2xl p-6 md:ml-0 md:w-[44%] ${
                  i % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                }`}
              >
                <p className="text-xs tracking-[0.3em] text-accent uppercase">
                  {m.date}
                </p>
                <h3 className="mt-2 text-2xl font-light text-foreground">
                  {m.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {m.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
