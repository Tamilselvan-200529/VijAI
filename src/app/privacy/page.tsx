import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-12 md:py-24">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-headline">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>Your data is private and secure.</li>
              <li>Chat history is saved only for your account.</li>
              <li>We don’t sell or share your information.</li>
              <li>You can delete your account and data anytime.</li>
            </ul>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
