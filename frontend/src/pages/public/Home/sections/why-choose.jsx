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
    <section className="max-w-8xl mx-auto px-6 py-24 text-center space-y-16 ">
      {/* Section Heading */}
      <div className="space-y-6">
        <GradientHeading>Why Choose SkillSwap?</GradientHeading>

        {/* TextEffect Short Phrases */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 pt-4 text-text-light dark:text-text-dark">
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-8"
        preset="scale"
      >
        {/* Feature Card Template */}
        {[
          {
            icon: (
              <UserGroupIcon className="h-10 w-10 text-primary dark:text-primary-medium" />
            ),
            title: "Connect with Experts",
            desc: "Find mentors already working inside your company.",
          },
          {
            icon: (
              <AcademicCapIcon className="h-10 w-10 text-primary dark:text-primary-medium" />
            ),
            title: "Upskill for Your Next Role",
            desc: "Learn new skills from trusted colleagues and industry leaders.",
          },
          {
            icon: (
              <MapIcon className="h-10 w-10 text-primary dark:text-primary-medium" />
            ),
            title: "Personalized Paths",
            desc: "Get mentorship and training customized to your career goals.",
          },
          {
            icon: (
              <BriefcaseIcon className="h-10 w-10 text-primary dark:text-primary-medium" />
            ),
            title: "Internal Career Mobility",
            desc: "Move across departments and grow without leaving your company.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-4 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white p-8 shadow-sm hover:shadow-md transition"
          >
            {item.icon}
            <h3 className="text-h2 font-semibold font-heading">{item.title}</h3>
            <p className="text-body2 md:text-body1 font-body text-text-light dark:text-text-dark">
              {item.desc}
            </p>
          </div>
        ))}
      </AnimatedGroup>
    </section>
  );
}
