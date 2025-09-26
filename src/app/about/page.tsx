import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-12 md:py-24">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-headline">About VijAI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              VijAI is an AI-powered chatbot built using NVIDIA APIs. It helps users with conversations, file analysis, and voice-enabled interactions.
            </p>
            <p>
              Designed with a sleek UI, dark/light themes, and multi-language support, VijAI is your smart digital partner. Our mission is to make advanced AI accessible and easy to use for everyone, from students to developers.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
