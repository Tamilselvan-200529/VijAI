'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex items-center justify-center py-20 md:py-32 min-h-[calc(100vh-56px)]">
       <div
        aria-hidden="true"
        className="absolute inset-0 top-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:3rem_3rem]"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_500px_at_50%_200px,#26a69a22,transparent)]"></div>
      </div>
      <div className="container text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          VijAI – Your Personal AI Assistant
        </h1>
        <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
          Chat, learn, and create with the power of VijAI. Smart. Simple. Tamil-powered.
        </p>
        <div className="mt-8 flex justify-center">
          <Button asChild size="lg" className="group">
            <Link href="/chat">
              Start Chatting
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
