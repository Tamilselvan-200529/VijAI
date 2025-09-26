import { ThemeToggle } from "@/components/theme-toggle";
import { VijAILogo } from "@/components/chat/logo";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <VijAILogo className="h-8 w-8 text-primary" />
          <span className="font-headline text-xl font-bold">VijAI</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
