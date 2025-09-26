'use client';

type ModalContent = "about" | "contact" | "privacy" | null;

interface FooterProps {
  onLinkClick: (modal: ModalContent) => void;
}

export function Footer({ onLinkClick }: FooterProps) {
  const handleLinkClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    modal: ModalContent
  ) => {
    e.preventDefault();
    onLinkClick(modal);
  };
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Copyright © Tamil {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <button onClick={(e) => handleLinkClick(e, 'about')} className="transition-colors hover:text-foreground">About</button>
          <button onClick={(e) => handleLinkClick(e, 'contact')} className="transition-colors hover:text-foreground">Contact</button>
          <button onClick={(e) => handleLinkClick(e, 'privacy')} className="transition-colors hover:text-foreground">Privacy Policy</button>
        </div>
      </div>
    </footer>
  );
}
