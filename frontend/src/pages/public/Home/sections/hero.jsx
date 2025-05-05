"use client";

import { Button } from "@/components/ui/button";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { LineShadowText } from "@/components/magicui/line-shadow-text";

export default function HeroSection() {
	return (
		<section className="flex h-[700px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background text-foreground">
			<div className="max-w-4xl space-y-4 z-10">
				<h1 className="text-[2rem] md:text-[3rem] font-heading font-bold flex items-center justify-center">
					Skill
					<LineShadowText className="italic">Swap</LineShadowText>
				</h1>

				<p className="mx-auto max-w-[400px] text-body2 md:text-body1 text-center">
					Empower employees to grow internally using mentorship and
					skill-building.
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button className="font-semibold bg-primary text-white hover:bg-primary-dark">
						Get Started
					</Button>
					<Button className="font-semibold border border-primary text-primary bg-transparent hover:bg-primary-light hover:text-white">
						Learn More
					</Button>
				</div>
			</div>

			<RetroGrid className="h-[700px] w-full bg-transparent" />
		</section>
	);
}
