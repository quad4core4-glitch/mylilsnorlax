import { cn } from "@/lib/utils";

type SnorlaxStickerProps = {
  className?: string;
};

/** Tiny decorative “sleepy blob” sticker — original minimal art, Snorlax-ish palette. */
export function SnorlaxSticker({ className }: SnorlaxStickerProps) {
  return (
    <div
      className={cn("pointer-events-none select-none opacity-[0.28]", className)}
      aria-hidden
    >
      <svg viewBox="0 0 64 64" className="h-full w-full drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
        <ellipse cx="32" cy="40" rx="24" ry="20" fill="#4a5d7c" />
        <ellipse cx="32" cy="42" rx="15" ry="12" fill="#efe6cf" />
        <path
          d="M14 38 Q10 28 18 22 Q22 18 28 20"
          fill="none"
          stroke="#3d4f6b"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M50 38 Q54 28 46 22 Q42 18 36 20"
          fill="none"
          stroke="#3d4f6b"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <ellipse cx="22" cy="18" rx="5" ry="6" fill="#4a5d7c" />
        <ellipse cx="42" cy="18" rx="5" ry="6" fill="#4a5d7c" />
        <path
          d="M24 34 Q32 38 40 34"
          fill="none"
          stroke="#2c3a52"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="26" cy="30" r="1.2" fill="#2c3a52" opacity="0.35" />
        <circle cx="38" cy="30" r="1.2" fill="#2c3a52" opacity="0.35" />
      </svg>
    </div>
  );
}
