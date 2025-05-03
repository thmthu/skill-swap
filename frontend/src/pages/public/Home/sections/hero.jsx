"use client";

import { Button } from "@/components/ui/button";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { LineShadowText } from "@/components/magicui/line-shadow-text";

export default function HeroSection() {
  return (
    <section className="relative flex h-[700px] w-full flex-col items-center justify-center overflow-hidden bg-white dark:bg-black">
      {/* Retro Grid Background */}
      <RetroGrid className="absolute inset-0 h-full w-full bg-transparent z-0" />

      {/* Content */}
      <div className="relative max-w-4xl space-y-6 z-10 flex flex-col items-center">
        <h1
          style={{ fontSize: "3.2em", lineHeight: "1.1" }}
          className="text-display font-heading font-bold  text-text-light dark:text-text-dark"
        >
          Skill
          <LineShadowText className="italic">Swap</LineShadowText>
        </h1>

        <p className="mx-auto max-w-[400px] text-body2 md:text-body1 text-text-light dark:text-text-dark">
          Empower employees to grow internally using mentorship and
          skill-building.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            className="font-semibold bg-primary text-white shadow-md hover:bg-primary-dark hover:shadow-lg transition-colors"
          >
            Get Started
          </Button>

          <Button
            size="lg"
            className="font-semibold border border-primary text-primary bg-white 
    hover:bg-primary-extra-light hover:border-primary-medium 
    hover:text-primary dark:bg-transparent dark:text-primary 
    dark:hover:bg-primary-light dark:hover:text-white"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
