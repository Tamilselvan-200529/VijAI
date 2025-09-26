import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mic, Upload, Moon, History } from "lucide-react";

const features = [
  {
    icon: <Mic className="h-8 w-8 text-primary" />,
    title: "Voice Chat",
    description: "Talk naturally with VijAI in real-time.",
  },
  {
    icon: <Upload className="h-8 w-8 text-primary" />,
    title: "File Upload",
    description: "Share files and get instant insights.",
  },
  {
    icon: <Moon className="h-8 w-8 text-primary" />,
    title: "Dark/Light Mode",
    description: "Your style, your control.",
  },
  {
    icon: <History className="h-8 w-8 text-primary" />,
    title: "Chat History",
    description: "Pick up where you left off.",
  },
];

export function Features() {
  return (
    <section className="py-20 md:py-32 bg-secondary">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Features</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to have a productive conversation with your AI assistant.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="transform-gpu transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl flex flex-col">
              <CardHeader className="flex flex-1 flex-col items-center text-center p-6">
                <div className="mb-4 rounded-full bg-primary/10 p-4">{feature.icon}</div>
                <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                <CardDescription className="mt-2">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
