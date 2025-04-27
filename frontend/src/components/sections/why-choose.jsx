"use client";

import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";
import {
  UserGroupIcon,
  AcademicCapIcon,
  MapIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/solid";
import GradientHeading from "@/components/Text/GradientHeading";

export default function WhyChoose() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 text-center space-y-16 bg-bg-light dark:bg-bg-dark">
      {/* Section Heading */}
      <div className="space-y-6">
        <GradientHeading>Frequently Asked Questions</GradientHeading>

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
      </div>

      {/* Feature Cards */}
      <AnimatedGroup
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 text-text-light dark:text-text-dark"
        preset="scale"
      >
        {/* Feature Card 1 */}
        <div className="space-y-4">
          <UserGroupIcon className="h-10 w-10 mx-auto text-primary" />
          <h3 className="text-h2 font-semibold font-heading">
            Connect with Experts
          </h3>
          <p className="text-body2 md:text-body1 font-body">
            Find mentors already working inside your company.
          </p>
        </div>

        {/* Feature Card 2 */}
        <div className="space-y-4">
          <AcademicCapIcon className="h-10 w-10 mx-auto text-primary" />
          <h3 className="text-h2 font-semibold font-heading">
            Upskill for Your Next Role
          </h3>
          <p className="text-body2 md:text-body1 font-body">
            Learn new skills from trusted colleagues and industry leaders.
          </p>
        </div>

        {/* Feature Card 3 */}
        <div className="space-y-4">
          <MapIcon className="h-10 w-10 mx-auto text-primary" />
          <h3 className="text-h2 font-semibold font-heading">
            Personalized Paths
          </h3>
          <p className="text-body2 md:text-body1 font-body">
            Get mentorship and training customized to your career goals.
          </p>
        </div>

        {/* Feature Card 4 */}
        <div className="space-y-4">
          <BriefcaseIcon className="h-10 w-10 mx-auto text-primary" />
          <h3 className="text-h2 font-semibold font-heading">
            Internal Career Mobility
          </h3>
          <p className="text-body2 md:text-body1 font-body">
            Move across departments and grow without leaving your company.
          </p>
        </div>
      </AnimatedGroup>
    </section>
  );
}
