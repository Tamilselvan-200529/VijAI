"use client";

import { useState } from "react";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { WhyVijai } from "@/components/landing/why-vijai";
import { Footer } from "@/components/landing/footer";
import { Modal } from "@/components/ui/modal";

type ModalContent = "about" | "contact" | "privacy" | null;

export default function Home() {
  const [activeModal, setActiveModal] = useState<ModalContent>(null);

  const handleOpenModal = (modal: ModalContent) => {
    setActiveModal(modal);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <WhyVijai />
      </main>
      <Footer onLinkClick={handleOpenModal} />

      <Modal
        isOpen={activeModal === "about"}
        onClose={handleCloseModal}
        title="About VijAI"
      >
        <p className="text-sm text-muted-foreground">
          VijAI is an AI-powered chatbot built using NVIDIA APIs. It helps users
          with conversations, file analysis, and voice-enabled interactions.
          Designed with a sleek UI, dark/light themes, and multi-language
          support, VijAI is your smart digital partner.
        </p>
      </Modal>

      <Modal
        isOpen={activeModal === "contact"}
        onClose={handleCloseModal}
        title="Contact Us"
      >
        <div className="space-y-2 text-sm">
           <p>You can reach us through the following channels:</p>
            <ul className="list-disc list-inside space-y-1">
                <li>
                    <strong>Email:</strong>{" "}
                    <a
                    href="mailto:support@vijai.ai"
                    className="text-primary hover:underline"
                    >
                    support@vijai.ai
                    </a>
                </li>
                <li>
                    <strong>Twitter:</strong>{" "}
                    <a
                    href="https://twitter.com/vijai_ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                    >
                    @vijai_ai
                    </a>
                </li>
            </ul>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "privacy"}
        onClose={handleCloseModal}
        title="Privacy Policy"
      >
        <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
          <li>Your data is private and secure.</li>
          <li>Chat history is saved only for your account.</li>
          <li>We don’t sell or share your information.</li>
          <li>You can delete your account and data anytime.</li>
        </ul>
      </Modal>
    </div>
  );
}
