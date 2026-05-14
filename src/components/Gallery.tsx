import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { HeartParticles } from "./HeartParticles";

// Curated cinematic layout: varied sizes + staggered offsets + captions.
// Each tile has its own column/row span and a small y-offset to feel organic.
type Tile = {
  seed: string;
  ratio: string; // tailwind aspect ratio
  span: string; // grid column/row span
  offset: string; // translateY offset
  caption?: string;
  sub?: string;
};

const tiles: Tile[] = [
  { seed: "snor-01", ratio: "aspect-[3/4]", span: "md:col-span-2 md:row-span-2", offset: "md:translate-y-0", caption: "First frame", sub: "where it began" },
  { seed: "snor-02", ratio: "aspect-square", span: "md:col-span-1", offset: "md:translate-y-8" },
  { seed: "snor-03", ratio: "aspect-[4/5]", span: "md:col-span-1 md:row-span-2", offset: "md:-translate-y-4", caption: "Quiet hours" },
  { seed: "snor-04", ratio: "aspect-[4/3]", span: "md:col-span-2", offset: "md:translate-y-12" },
  { seed: "snor-05", ratio: "aspect-square", span: "md:col-span-1", offset: "md:translate-y-2", caption: "Snorlax mode" },
  { seed: "snor-06", ratio: "aspect-[3/4]", span: "md:col-span-1 md:row-span-2", offset: "md:translate-y-6" },
  { seed: "snor-07", ratio: "aspect-[5/4]", span: "md:col-span-2", offset: "md:-translate-y-2", caption: "Golden hour", sub: "you, glowing" },
  { seed: "snor-08", ratio: "aspect-square", span: "md:col-span-1", offset: "md:translate-y-10" },
  { seed: "snor-09", ratio: "aspect-[4/5]", span: "md:col-span-1", offset: "md:translate-y-0" },
  { seed: "snor-10", ratio: "aspect-[4/3]", span: "md:col-span-2 md:row-span-2", offset: "md:translate-y-4", caption: "Soft chaos" },
];

const imgUrl = (seed: string, w = 900) => `https://picsum.photos/seed/${seed}/${w}/${w}`;

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative overflow-hidden px-4 py-20 sm:px-6 md:py-32">
      {/* 3D heart particles drifting behind the grid */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <HeartParticles count={60} />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-12 text-center md:mb-20"
        >
          <p className="mb-3 text-[10px] font-light tracking-[0.4em] text-muted-foreground uppercase sm:text-xs">
            Frames
          </p>
          <h2 className="text-gradient text-3xl font-extralight sm:text-4xl md:text-6xl">
            Ten pieces of us
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[13px] font-light leading-relaxed text-muted-foreground/80 sm:text-sm">
            small moments, scattered like stars — each one quietly proving you were here.
          </p>
        </motion.div>

        {/* Cinematic staggered grid */}
        <div className="grid auto-rows-[120px] grid-cols-2 gap-3 sm:auto-rows-[150px] sm:gap-4 md:auto-rows-[180px] md:grid-cols-6 md:gap-6">
          {tiles.map((t, i) => (
            <motion.div
              key={t.seed}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.9,
                delay: (i % 6) * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`${t.span} ${t.offset} relative`}
            >
              <motion.button
                onClick={() => setActive(i)}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 6 + (i % 5),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i % 7) * 0.4,
                }}
                whileHover={{ scale: 1.02 }}
                className="group glass relative h-full w-full overflow-hidden rounded-2xl transition-shadow duration-700 hover:shadow-[0_0_40px_var(--glow-purple),0_0_80px_var(--glow-pink)]"
              >
                <img
                  src={imgUrl(t.seed)}
                  alt={t.caption ?? `Memory ${i + 1}`}
                  loading="lazy"
                  className={`h-full w-full object-cover ${t.ratio} grayscale-[15%] transition-all duration-[1200ms] ease-out group-hover:scale-110 group-hover:grayscale-0`}
                />
                {/* gradient veil */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-40" />
                {/* soft glow ring on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5 transition-all duration-700 group-hover:ring-white/20" />

                {t.caption && (
                  <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                    <p className="text-[10px] font-light tracking-[0.3em] uppercase text-foreground/60 transition-colors group-hover:text-foreground/90">
                      {t.caption}
                    </p>
                    {t.sub && (
                      <p className="mt-1 text-sm font-extralight italic text-foreground/70">
                        {t.sub}
                      </p>
                    )}
                  </div>
                )}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* closing caption */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="mt-20 text-center text-sm font-extralight italic tracking-wide text-muted-foreground/70"
        >
          ten frames. one feeling. infinite reruns.
        </motion.p>
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
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              src={imgUrl(tiles[active].seed, 1600)}
              alt={tiles[active].caption ?? `Memory ${active + 1}`}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-[0_0_80px_var(--glow-purple)]"
            />
            {tiles[active].caption && (
              <div className="absolute bottom-10 left-0 right-0 text-center">
                <p className="text-[10px] font-light tracking-[0.4em] uppercase text-foreground/70">
                  {tiles[active].caption}
                </p>
                {tiles[active].sub && (
                  <p className="mt-2 text-base font-extralight italic text-foreground/80">
                    {tiles[active].sub}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
