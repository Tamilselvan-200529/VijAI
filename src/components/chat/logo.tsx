import { cn } from "@/lib/utils";

export const VijAILogo = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn("fill-current", className)}
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path d="M 20,80 C 20,40 80,40 80,80" stroke="url(#grad1)" strokeWidth="8" fill="none" />
      <path d="M 50,20 V 50" stroke="url(#grad1)" strokeWidth="8" />
      <circle cx="35" cy="35" r="5" fill="hsl(var(--accent))" />
      <circle cx="65" cy="35" r="5" fill="hsl(var(--accent))" />
    </svg>
  );
  