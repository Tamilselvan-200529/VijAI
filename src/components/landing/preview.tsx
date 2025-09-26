'use client';
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const images = [
  {
    src: "https://storage.googleapis.com/aethermind-ai-project-assets/chat-light.png",
    alt: "Chat UI Light Mode",
  },
  {
    src: "https://storage.googleapis.com/aethermind-ai-project-assets/chat-dark.png",
    alt: "Chat UI Dark Mode",
  },
];

export function Preview() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">See it in Action</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A clean and modern interface designed for a seamless chat experience.
          </p>
        </div>
        <Carousel 
          className="mx-auto w-full max-w-4xl"
          plugins={[Autoplay({ delay: 3000, stopOnInteraction: true })]}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={1200}
                      height={800}
                      className="rounded-lg border-2 border-border shadow-2xl"
                    />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
