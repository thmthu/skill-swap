import { useTheme } from "@/context/ThemeContext";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";

export default function GradientHeading({ children }) {
  const { theme } = useTheme();

  // If theme is not ready yet, avoid rendering
  if (!theme) return null;

  const colorFrom = theme === "dark" ? "#D14444" : "#AA0000";
  const colorTo = theme === "dark" ? "#E6A38B" : "#3D0000";

  return (
    <AnimatedGradientText
      colorFrom={colorFrom}
      colorTo={colorTo}
      className="text-4xl md:text-display font-bold font-heading tracking-tight"
    >
      {children}
    </AnimatedGradientText>
  );
}
