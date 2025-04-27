'use client';

import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";
import {
  UserGroupIcon,
  AcademicCapIcon,
  MapIcon,
  BriefcaseIcon
} from '@heroicons/react/24/solid';


export function WhyChooseSkillSwapSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 text-center space-y-16">
      {/* Section Heading */}
      <AnimatedGradientText
        colorFrom="#893C3E"
        colorTo="#1B0705"
        className="text-4xl font-bold tracking-tight"
      >
        Why Choose SkillSwap?
      </AnimatedGradientText>

      {/* TextEffect Short Phrases */}
      <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 pt-4">
        <TextEffect as="span" per="char" delay={0.5} preset="fade">
          Grow faster.
        </TextEffect>

        <TextEffect as="span" per="char" delay={1} preset="fade">
          Learn smarter.
        </TextEffect>

        <TextEffect as="span" per="char" delay={1.5} preset="fade">
          Switch confidently.
        </TextEffect>
      </div>

      {/* Feature Cards */}
      <AnimatedGroup
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4"
        preset="scale"
      >
        {/* Feature 1 */}
        <div className="space-y-2">
        <UserGroupIcon className="h-10 w-10 mx-auto text-gray-900 dark:text-gray-100" />
        <h3 className="text-xl font-semibold">Connect with Experts</h3>
          <p className="text-gray-500">Find mentors already working inside your company.</p>
        </div>

        {/* Feature 2 */}
        <div className="space-y-2">
        <AcademicCapIcon className="h-10 w-10 mx-auto text-gray-900 dark:text-gray-100" />
        <h3 className="text-xl font-semibold">Upskill for Your Next Role</h3>
          <p className="text-gray-500">Learn new skills from trusted colleagues and industry leaders.</p>
        </div>

        {/* Feature 3 */}
        <div className="space-y-2">
        <MapIcon className="h-10 w-10 mx-auto text-gray-900 dark:text-gray-100" />
        <h3 className="text-xl font-semibold">Personalized Paths</h3>
          <p className="text-gray-500">Get mentorship and training customized to your career goals.</p>
        </div>

        {/* Feature 4 */}
        <div className="space-y-2">
        <BriefcaseIcon className="h-10 w-10 mx-auto text-gray-900 dark:text-gray-100" />
        <h3 className="text-xl font-semibold">Internal Career Mobility</h3>
          <p className="text-gray-500">Move across departments and grow without leaving your company.</p>
        </div>
      </AnimatedGroup>
    </section>
  );
}
