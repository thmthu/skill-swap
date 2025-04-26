import { Button } from "@/components/ui/button";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { SectionParagraphEffect } from "@/components/text-effects/SectionParagraphEffect";

export default function HomePage() {
    return (
      <section>
             <div className=" flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background">
             <div className="max-w-4xl space-y-8 z-10">
             <h1 className="text-display font-heading font-bold ">
      Skill

      <LineShadowText className="italic" >
        Swap
      </LineShadowText>
    </h1>

                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Empower marketers to release on-brand pages fast while using your tech stack.
                    The headless page builder for Next.js, Nuxt, and SvelteKit sites.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="font-semibold">
                        Get started
                    </Button>
                    <Button variant="outline" size="lg" className="font-semibold">
                        Try editor
                    </Button>
                </div>
            </div>

      <RetroGrid className="h-full w-full"/>
    </div>


  <div className="max-w-6xl mx-auto px-4 text-center space-y-12">
    <div>
    <AnimatedGradientText   colorFrom="#893C3E"  // gradient-start
  colorTo="#1B0705"    // gradient-end
  className="text-4xl font-bold tracking-tight">
    Why Choose SkillSwap?
  </AnimatedGradientText>
  <SectionParagraphEffect />

    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Feature Card 1 */}
      <div className="space-y-4">
        <div className="text-5xl">👨‍🏫</div>
        <h3 className="text-xl font-semibold">Expert Mentors</h3>
        <p className="text-gray-500">Learn from real professionals across industries.</p>
      </div>

      {/* Feature Card 2 */}
      <div className="space-y-4">
        <div className="text-5xl">🚀</div>
        <h3 className="text-xl font-semibold">Flexible Scheduling</h3>
        <p className="text-gray-500">Book lessons when you want, where you want.</p>
      </div>

      {/* Feature Card 3 */}
      <div className="space-y-4">
        <div className="text-5xl">🔒</div>
        <h3 className="text-xl font-semibold">Safe and Secure</h3>
        <p className="text-gray-500">Verified mentors, secure payment protection.</p>
      </div>

      {/* Feature Card 4 */}
      <div className="space-y-4">
        <div className="text-5xl">🏆</div>
        <h3 className="text-xl font-semibold">Track Your Progress</h3>
        <p className="text-gray-500">Earn certificates, track skills growth.</p>
      </div>
    </div>
  </div>
</section>


    
    
        
    );
}