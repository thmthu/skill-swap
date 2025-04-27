"use client";

import React, { useRef } from "react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { UserIcon } from "@heroicons/react/24/solid";

function Circle({ children, innerRef }) {
  return (
    <div
      ref={innerRef}
      className="z-10 flex size-16 items-center justify-center rounded-full border-2 bg-white p-3 shadow-md"
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
    <div className="max-w-6xl mx-auto px-6 py-24 text-center ">
      {/* Section Heading */}
      <AnimatedGradientText
        colorFrom="#893C3E"
        colorTo="#1B0705"
        className="text-4xl px-4 font-bold tracking-tight"
      >
        How It Works?{" "}
      </AnimatedGradientText>
      <div
        className="relative flex w-full items-center justify-center overflow-hidden p-10"
        ref={containerRef}
      >
        <div className="flex w-full max-w-4xl items-center justify-between">
          <Circle innerRef={user1Ref}>
            <UserIcon className="h-10 w-10 mx-auto text-gray-900 dark:text-gray-100" />
          </Circle>
          <Circle innerRef={skillSwapRef}>
            <img
              src="/nab-icon.png"
              alt="SkillSwap Icon"
              className="h-20 w-20 object-contain"
            />
          </Circle>
          <Circle innerRef={user2Ref}>
            <UserIcon className="h-10 w-10 mx-auto text-gray-900 dark:text-gray-100" />
          </Circle>
        </div>

        {/* Beam from left user to SkillSwap */}
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

        {/* Beam from SkillSwap to right user */}
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

      <div className="pt-3 max-w-4xl mx-auto text-center">
        <p className="mt-2 text-body2 md:text-body1  font-body">
          SkillSwap connects employees internally — linking those seeking new
          skills with experienced mentors across the company. Our platform
          enables two-way learning, empowering your next career move with
          guidance and support.
        </p>
      </div>
    </div>
  );
}
