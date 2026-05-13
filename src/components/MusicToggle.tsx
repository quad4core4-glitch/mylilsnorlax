import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music2, VolumeX } from "lucide-react";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(
      "https://cdn.pixabay.com/audio/2022/10/18/audio_31748d3584.mp3",
    );
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;
    return () => {
      audio.pause();
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={playing ? "Pause music" : "Play music"}
      className="glass fixed top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full text-foreground/90 transition-colors hover:text-foreground"
    >
      {playing ? (
        <Music2 className="h-5 w-5" />
      ) : (
        <VolumeX className="h-5 w-5" />
      )}
      {playing && (
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: "0 0 30px var(--glow-pink)" }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}
