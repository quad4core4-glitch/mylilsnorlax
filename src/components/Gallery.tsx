import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const seeds = [
  "love-01","love-02","love-03","love-04","love-05",
  "love-06","love-07","love-08","love-09","love-10",
  "love-11","love-12","love-13","love-14","love-15",
  "love-16","love-17","love-18","love-19","love-20",
];

const images = seeds.map((s, i) => ({
  src: `https://picsum.photos/seed/${s}/800/${i % 3 === 0 ? 1100 : 800}`,
  span: i % 7 === 0 ? "row-span-2" : "",
}));

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs font-light tracking-[0.4em] text-muted-foreground uppercase">
            Frames
          </p>
          <h2 className="text-gradient text-4xl font-extralight md:text-6xl">
            Twenty pieces of us
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {images.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 8) * 0.04 }}
              className={`group glass relative overflow-hidden rounded-xl ${img.span}`}
            >
              <img
                src={img.src}
                alt={`Memory ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover grayscale-[20%] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-30" />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/90 p-6 backdrop-blur-xl"
          >
            <button
              className="absolute top-6 right-6 text-foreground/70 hover:text-foreground"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.img
              key={active}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              src={images[active].src.replace("/800/", "/1600/")}
              alt={`Memory ${active + 1}`}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-[0_0_80px_var(--glow-purple)]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
