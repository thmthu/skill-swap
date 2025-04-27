// import { Button } from "@/components/ui/button";
// import { RetroGrid } from "@/components/magicui/retro-grid";
// import { LineShadowText } from "@/components/magicui/line-shadow-text";
// import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
// import { TextEffect } from '@/components/ui/text-effect';
// import { AnimatedGroup } from '@/components/ui/animated-group';



// export default function HomePage() {
//     return (
//       <section>
//              <div className=" flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background">
//              <div className="max-w-4xl space-y-8 z-10">
//              <h1 className="text-display font-heading font-bold ">
//       Skill

//       <LineShadowText className="italic" >
//         Swap
//       </LineShadowText>
//     </h1>

//                 <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
//                     Empower marketers to release on-brand pages fast while using your tech stack.
//                     The headless page builder for Next.js, Nuxt, and SvelteKit sites.
//                 </p>

//                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                     <Button size="lg" className="font-semibold">
//                         Get started
//                     </Button>
//                     <Button variant="outline" size="lg" className="font-semibold">
//                         Try editor
//                     </Button>
//                 </div>
//             </div>

//       <RetroGrid className="h-full w-full"/>
//     </div>


//     <section className="max-w-6xl mx-auto px-6 py-24 text-center space-y-16">
  
//   {/* Section Heading */}
//   <AnimatedGradientText
//     colorFrom="#893C3E"
//     colorTo="#1B0705"
//     className="text-4xl font-bold tracking-tight"
//   >
//     Why Choose SkillSwap?
//   </AnimatedGradientText>

//   {/* TextEffect Short Phrases */}
//   <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 pt-4 ubtitle2">
//     <TextEffect
//       as="span"
//       per="char"
//       delay={0.5}
//       preset="fade"
//     >
//       Grow faster.
//     </TextEffect>

//     <TextEffect
//       as="span"
//       per="char"
//       delay={1}
//       preset="fade"
//     >
//       Learn smarter.
//     </TextEffect>

//     <TextEffect
//       as="span"
//       per="char"
//       delay={1.5}
//       preset="fade"
//     >
//       Switch confidently.
//     </TextEffect>
//   </div>

//   {/* Feature Cards appear after TextEffect */}
//   <AnimatedGroup
//     className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4"
//     preset="scale"
//   >
//     {/* Feature Card 1 */}
//     <div className="space-y-4">
//       <div className="text-5xl">🤝</div>
//       <h3 className="text-xl font-semibold">Connect with Experts</h3>
//       <p className="text-gray-500">Find mentors already working inside your company.</p>
//     </div>

//     {/* Feature Card 2 */}
//     <div className="space-y-4">
//       <div className="text-5xl">🎯</div>
//       <h3 className="text-xl font-semibold">Upskill for Your Next Role</h3>
//       <p className="text-gray-500">Learn new skills from trusted colleagues and industry leaders.</p>
//     </div>

//     {/* Feature Card 3 */}
//     <div className="space-y-4">
//       <div className="text-5xl">🛤️</div>
//       <h3 className="text-xl font-semibold">Personalized Paths</h3>
//       <p className="text-gray-500">Get mentorship and training customized to your career goals.</p>
//     </div>

//     {/* Feature Card 4 */}
//     <div className="space-y-4">
//       <div className="text-5xl">🚪</div>
//       <h3 className="text-xl font-semibold">Internal Career Mobility</h3>
//       <p className="text-gray-500">Move across departments and grow without leaving your company.</p>
//     </div>
//   </AnimatedGroup>
  
// </section>

// </section>


    
    
        
//     );
// }



import { HeroSection } from "@/components/sections/hero";
import { WhyChooseSkillSwapSection } from "@/components/sections/why-choose";
import { FAQ } from "@/components/sections/FAQ";
import HowItWorks from "../../../components/sections/how-it-works";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseSkillSwapSection />
      <HowItWorks />
      <FAQ />
    </>
  );
}
