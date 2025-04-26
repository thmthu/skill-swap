import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { RetroGrid } from "@/components/magicui/retro-grid";

export default function Hero() {
  return (
    <section className="relative overflow-hidden flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Animated Grid Background */}
      <div className="relative h-[500px] w-full inset-0 -z-10 opacity-50 ">
  <RetroGrid />
</div>

      {/* Hero Content */}
      <div className="relative  text-center px-6">
        <h1 className="text-5xl font-bold mb-4">
          Find your perfect mentor
        </h1>
        <p className="text-lg text-gray-600">
          Learn from experts anytime, anywhere.
        </p>
      </div>
    </section>
  )
}

