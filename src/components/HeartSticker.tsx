import { cn } from "@/lib/utils";

type HeartStickerProps = {
  className?: string;
};

/** Small filled heart for quiet corner accents (matches primary / rose tones). */
export function HeartSticker({ className }: HeartStickerProps) {
  return (
    <div
      className={cn("pointer-events-none select-none text-primary/25", className)}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-full w-full drop-shadow-[0_1px_6px_rgba(244,63,94,0.25)]">
        <path
          fill="currentColor"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A5.77 5.77 0 0116.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </div>
  );
}
