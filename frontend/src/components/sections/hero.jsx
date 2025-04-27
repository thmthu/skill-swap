"use client";

import { Button } from "@/components/ui/button";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { LineShadowText } from "@/components/magicui/line-shadow-text";

export default function HeroSection() {
  return (
    <section className="flex h-[700px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
      <div className="max-w-4xl space-y-4 z-10">
        <h1 className="text-display font-heading font-bold">
          Skill
          <LineShadowText className="italic">Swap</LineShadowText>
        </h1>

        <p className="mx-auto max-w-[400px] text-gray-500 md:text-xl dark:text-gray-400">
          Empower employees to grow internally using mentorship and
          skill-building.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="font-semibold">
            Get Started
          </Button>
          <Button variant="outline" size="lg" className="font-semibold">
            Learn More
          </Button>
        </div>
      </div>

      <RetroGrid className="h-[700px] w-full" />
    </section>
  );
}
