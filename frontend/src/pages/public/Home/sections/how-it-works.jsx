"use client";

import React, { useRef } from "react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { UserIcon } from "@heroicons/react/24/solid";
import GradientHeading from "@/components/Text/GradientHeading";

function Circle({ children, innerRef }) {
  return (
    <div
      ref={innerRef}
      className="z-10 flex size-16 items-center justify-center rounded-full border-2 border-primary bg-white dark:bg-bg-dark p-3 shadow-md"
    >
      <div className="text-5xl">{children}</div>
    </div>
  );
}

export default function HowItWorks() {
  const containerRef = useRef(null);
  const user1Ref = useRef(null);
  const skillSwapRef = useRef(null);
  const user2Ref = useRef(null);

  return (
    <section className="max-w-6xl mx-auto px-6 py-24 text-center space-y-12">
      {/* Section Heading */}
      <GradientHeading>How It Works?</GradientHeading>

      {/* Animated Beam Visualization */}
      <div
        className="relative flex w-full items-center justify-center overflow-hidden p-10"
        ref={containerRef}
      >
        <div className="flex w-full max-w-4xl items-center justify-between">
          {/* User 1 */}
          <Circle innerRef={user1Ref}>
            <UserIcon className="h-10 w-10 text-text-light dark:text-text-dark" />
          </Circle>

          {/* SkillSwap Icon Center */}
          <Circle innerRef={skillSwapRef}>
            <img
              src="/nab-icon.png"
              alt="SkillSwap Icon"
              className="h-20 w-20 object-contain"
            />
          </Circle>

          {/* User 2 */}
          <Circle innerRef={user2Ref}>
            <UserIcon className="h-10 w-10 text-text-light dark:text-text-dark" />
          </Circle>
        </div>

        {/* Animated Beams */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={user1Ref}
          toRef={skillSwapRef}
          curvature={20}
          gradientStartColor="#893C3E"
          gradientStopColor="#1B0705"
          startYOffset={-10}
          endYOffset={-10}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={user1Ref}
          toRef={skillSwapRef}
          curvature={-20}
          gradientStartColor="#893C3E"
          gradientStopColor="#1B0705"
          startYOffset={10}
          endYOffset={10}
          reverse
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={skillSwapRef}
          toRef={user2Ref}
          curvature={20}
          gradientStartColor="#893C3E"
          gradientStopColor="#1B0705"
          startYOffset={-10}
          endYOffset={-10}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={skillSwapRef}
          toRef={user2Ref}
          curvature={-20}
          gradientStartColor="#893C3E"
          gradientStopColor="#1B0705"
          startYOffset={10}
          endYOffset={10}
          reverse
        />
      </div>

      {/* Text Explanation */}
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-body2 md:text-body1 text-text-light dark:text-text-dark font-body px-6">
          SkillSwap bridges employees together — connecting individuals seeking
          new skills with internal experts ready to mentor. Whether switching
          roles or growing within your current path, support is just a
          conversation away.
        </p>
      </div>
    </section>
  );
}
