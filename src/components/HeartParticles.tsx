import { useMemo } from "react";
import { motion } from "framer-motion";

// 3D-ish floating heart particles — generated with parametric heart curve,
// projected with subtle perspective + slow rotation for a "cloud of hearts" feel.
export function HeartParticles({ count = 70 }: { count?: number }) {
  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // Parametric heart curve
      const t = (i / count) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      // Add some random depth + jitter
      const z = (Math.random() - 0.5) * 20;
      const jitter = (Math.random() - 0.5) * 2;
      return {
        id: i,
        x: x + jitter,
        y: y + jitter,
        z,
        size: Math.random() * 6 + 4,
        delay: Math.random() * 4,
        duration: Math.random() * 6 + 6,
        hue: Math.random() > 0.5 ? "var(--glow-pink)" : "var(--glow-purple)",
      };
    });
  }, [count]);

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ perspective: "800px" }}
    >
      <motion.div
        className="relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {hearts.map((h) => (
          <motion.span
            key={h.id}
            className="absolute"
            style={{
              left: `${h.x * 6}px`,
              top: `${h.y * 6}px`,
              width: h.size,
              height: h.size,
              transform: `translateZ(${h.z * 4}px)`,
              background: h.hue,
              clipPath:
                "path('M10 17s-6-4.35-6-9a4 4 0 0 1 7-2.65A4 4 0 0 1 18 8c0 4.65-6 9-6 9z')",
              WebkitClipPath:
                "path('M10 17s-6-4.35-6-9a4 4 0 0 1 7-2.65A4 4 0 0 1 18 8c0 4.65-6 9-6 9z')",
              filter: `drop-shadow(0 0 6px ${h.hue})`,
              transformStyle: "preserve-3d",
            }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.15, 0.8],
            }}
            transition={{
              duration: h.duration,
              delay: h.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
