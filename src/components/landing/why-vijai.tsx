import { Zap, Lock, Palette } from "lucide-react";

const reasons = [
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Lightning Fast",
      description: "Get instant responses powered by high-performance NVIDIA AI.",
    },
    {
      icon: <Lock className="h-6 w-6 text-primary" />,
      title: "Secure & Private",
      description: "Your conversations are your own. We respect your privacy.",
    },
    {
      icon: <Palette className="h-6 w-6 text-primary" />,
      title: "Beautiful UI",
      description: "A thoughtfully designed interface that's a joy to use.",
    },
];

export function WhyVijai() {
  return (
    <section className="py-20 md:py-32 bg-secondary">
      <div className="container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Why VijAI?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
                Developed with NVIDIA AI, customized for Tamil + English users.
            </p>
        </div>
        <div className="mx-auto grid max-w-5xl justify-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div key={reason.title} className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                {reason.icon}
              </div>
              <div>
                <h3 className="font-headline text-lg font-semibold">{reason.title}</h3>
                <p className="mt-1 text-muted-foreground">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
