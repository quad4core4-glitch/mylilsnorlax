import { motion } from "framer-motion";

/**
 * Cinematic moving moonlight gradient + lens flare glow.
 * Renders fixed behind all content. Pointer-events disabled.
 */
export function Moonlight() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base deep gradient wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% -10%, oklch(0.32 0.08 220 / 0.7), transparent 55%), radial-gradient(ellipse at 50% 110%, oklch(0.22 0.06 230 / 0.6), transparent 60%)",
        }}
      />

      {/* Drifting moonlight orb */}
      <motion.div
        className="absolute h-[80vmax] w-[80vmax] rounded-full"
        style={{
          left: "-20vmax",
          top: "-20vmax",
          background:
            "radial-gradient(circle, oklch(0.92 0.05 90 / 0.18), oklch(0.7 0.1 220 / 0.08) 40%, transparent 65%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: ["0vmax", "40vmax", "10vmax", "0vmax"],
          y: ["0vmax", "20vmax", "40vmax", "0vmax"],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Counter-drifting teal aurora */}
      <motion.div
        className="absolute h-[70vmax] w-[70vmax] rounded-full"
        style={{
          right: "-25vmax",
          bottom: "-25vmax",
          background:
            "radial-gradient(circle, oklch(0.6 0.12 200 / 0.22), transparent 60%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: ["0vmax", "-30vmax", "-10vmax", "0vmax"],
          y: ["0vmax", "-20vmax", "-30vmax", "0vmax"],
        }}
        transition={{ duration: 55, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Lens flare core */}
      <motion.div
        className="absolute"
        style={{ top: "12%", left: "70%" }}
        animate={{ x: [0, -120, 40, 0], y: [0, 60, -30, 0], opacity: [0.7, 1, 0.85, 0.7] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Bright core */}
        <div
          className="absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.98 0.04 90 / 0.55), oklch(0.85 0.1 80 / 0.25) 35%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
        {/* Halo ring */}
        <div
          className="absolute h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, transparent 45%, oklch(0.85 0.08 200 / 0.18) 50%, transparent 56%)",
            filter: "blur(6px)",
          }}
        />
        {/* Streak */}
        <div
          className="absolute h-[2px] w-[120vmax] -translate-x-1/2 -translate-y-1/2 rotate-[15deg]"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.95 0.05 90 / 0.35), transparent)",
            filter: "blur(2px)",
          }}
        />
        {/* Secondary ghost flares */}
        <div
          className="absolute h-16 w-16 rounded-full"
          style={{
            transform: "translate(-260px, 140px)",
            background: "radial-gradient(circle, oklch(0.88 0.1 80 / 0.35), transparent 70%)",
            filter: "blur(4px)",
          }}
        />
        <div
          className="absolute h-24 w-24 rounded-full"
          style={{
            transform: "translate(180px, -120px)",
            background: "radial-gradient(circle, oklch(0.75 0.1 200 / 0.28), transparent 70%)",
            filter: "blur(6px)",
          }}
        />
      </motion.div>

      {/* Subtle vignette to keep it cinematic */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, oklch(0.08 0.03 230 / 0.7) 100%)",
        }}
      />
    </div>
  );
}
