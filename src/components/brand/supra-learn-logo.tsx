import { cn } from "@/lib/utils";

type LogoSize = "xs" | "sm" | "md" | "lg";

const MARK_SIZES: Record<LogoSize, string> = {
  xs: "h-7 w-7",
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-14 w-14",
};

const TITLE_SIZES: Record<LogoSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

interface SupraLearnLogoProps {
  size?: LogoSize;
  showText?: boolean;
  showTagline?: boolean;
  tagline?: string;
  className?: string;
  /** Icon only — no wordmark */
  markOnly?: boolean;
}

export function SupraLearnMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="sl-bg" x1="4" y1="36" x2="36" y2="4" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4f46e5" />
          <stop stopColor="#7c3aed" />
          <stop stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="sl-shine" x1="8" y1="8" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.35" />
          <stop stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#sl-bg)" />
      <rect width="40" height="40" rx="11" fill="url(#sl-shine)" />
      {/* Ascending mastery layers */}
      <path
        d="M11 27.5L20 11.5L29 27.5"
        stroke="white"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 27.5L20 18.5L25.5 27.5"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      />
      {/* Peak node — technology / insight */}
      <circle cx="20" cy="10" r="2.25" fill="white" />
      <circle cx="20" cy="10" r="4.5" stroke="white" strokeWidth="1" opacity="0.35" />
    </svg>
  );
}

export function SupraLearnLogo({
  size = "sm",
  showText = true,
  showTagline = true,
  tagline = "Master Technology",
  className,
  markOnly = false,
}: SupraLearnLogoProps) {
  if (markOnly) {
    return <SupraLearnMark className={cn(MARK_SIZES[size], className)} />;
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <SupraLearnMark className={MARK_SIZES[size]} />
      {showText && (
        <div className="min-w-0">
          <p
            className={cn(
              "font-bold tracking-tight text-zinc-50",
              TITLE_SIZES[size]
            )}
          >
            Supra
            <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              Learn
            </span>
          </p>
          {showTagline && (
            <p className="truncate text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
              {tagline}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
