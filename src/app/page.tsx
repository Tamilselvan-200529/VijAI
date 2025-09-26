import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { WhyVijai } from "@/components/landing/why-vijai";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <WhyVijai />
      </main>
      <Footer />
    </div>
  );
}
