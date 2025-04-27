// import React, { useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { CourseCard } from "./CourseCard";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// export function CourseCarousel({ courses }) {
//   const scrollRef = useRef(null);

//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       const scrollAmount = scrollRef.current.offsetWidth * 0.8;
//       scrollRef.current.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <div className="relative w-full">
//       <Button
//         variant="ghost"
//         size="icon"
//         className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
//         onClick={() => scroll("left")}
//       >
//         <ChevronLeft />
//       </Button>
//       <div
//         ref={scrollRef}
//         className="flex gap-6 overflow-x-auto scrollbar-hide px-12 py-4 snap-x snap-mandatory"
//       >
//         {courses.map((course, idx) => (
//           <div key={idx} className="snap-center w-full max-w-xs h-[350px] flex-shrink-0">
//             <CourseCard {...course} />
//           </div>
//         ))}
//       </div>
//       <Button
//         variant="ghost"
//         size="icon"
//         className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
//         onClick={() => scroll("right")}
//       >
//         <ChevronRight />
//       </Button>
//     </div>
//   );
// }


import { useRef } from "react";
import { CourseCard } from "@/components/CourseCard";
import { ChevronLeft, ChevronRight } from "lucide-react"; // or any icon

export function CourseCarousel({ courses }) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const scrollAmount = clientWidth * 0.8; // scroll by 80% of container

    scrollContainerRef.current.scrollTo({
      left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Left Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-900 border border-gray-300 rounded-full p-2 shadow hover:bg-primary hover:text-white transition"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto no-scrollbar px-8"
        style={{ scrollbarWidth: "none" }}
      >
        {courses.map((course, idx) => (
          <div key={idx} className="flex-shrink-0 w-72">
            <CourseCard {...course} />
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-900 border border-gray-300 rounded-full p-2 shadow hover:bg-primary hover:text-white transition"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}

