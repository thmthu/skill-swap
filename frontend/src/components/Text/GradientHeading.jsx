"use client";

import { useTheme } from "@/context/ThemeContext";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";

export default function GradientHeading({ children }) {
  const { theme } = useTheme();

  const colorFrom = theme === "dark" ? "#D14444" : "#AA0000";
  const colorTo = theme === "dark" ? "#E6A38B" : "#3D0000";

  return (
    <AnimatedGradientText
      colorFrom={colorFrom}
      colorTo={colorTo}
      className="text-4xl px-4 font-bold tracking-tight"
    >
      {children}
    </AnimatedGradientText>
  );
}
