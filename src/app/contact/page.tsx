import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Twitter } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-12 md:py-24">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-headline">Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">You can reach us through the following channels:</p>
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <a href="mailto:support@vijai.ai" className="text-primary hover:underline">
                support@vijai.ai
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Twitter className="h-5 w-5 text-muted-foreground" />
              <a href="https://twitter.com/vijai_ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                @vijai_ai
              </a>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
