import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Copyright © Tamil {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/about" className="transition-colors hover:text-foreground">About</Link>
          <Link href="/contact" className="transition-colors hover:text-foreground">Contact</Link>
          <Link href="/privacy" className="transition-colors hover:text-foreground">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
