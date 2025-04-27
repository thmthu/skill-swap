"use client";

import { Button } from "@/components/ui/button";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { LineShadowText } from "@/components/magicui/line-shadow-text";

export default function HeroSection() {
  return (
    <section className="flex h-[700px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
      <div className="max-w-4xl space-y-4 z-10">
        <h1 className="text-display font-heading font-bold text-text-light dark:text-text-dark">
          Skill
          <LineShadowText className="italic">Swap</LineShadowText>
        </h1>

        <p className="mx-auto max-w-[400px] text-body2 md:text-body1 text-text-light dark:text-text-dark">
          Empower employees to grow internally using mentorship and
          skill-building.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="font-semibold !bg-primary text-text-dark hover:bg-primary-dark hover:text-text-light"
          >
            Get Started
          </Button>
          <Button
            size="lg"
            className="font-semibold !border-primary !text-primary !bg-transparent hover:!bg-primary-light hover:!border-primary-medium hover:!text-primary dark:text-text-dark! dark:hover:!text-text-light dark:hover:!bg-primary-medium"
          >
            Learn More
          </Button>
        </div>
      </div>

      <RetroGrid className="h-[700px] w-full bg-transparent dark:bg-transparent" />
    </section>
  );
}
