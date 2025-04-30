import { useRef, useState, useEffect } from "react";
import { CourseCard } from "@/components/CourseCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function CourseCarousel({ courses }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [numPages, setNumPages] = useState(1);

  const CARD_WIDTH = 280 + 24; // card width + gap (px)

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    // Calculate current page
    setCurrentPage(Math.round(scrollLeft / CARD_WIDTH));
  };

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const scrollAmount = clientWidth * 0.8;
    scrollContainerRef.current.scrollTo({
      left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: "smooth",
    });
    setTimeout(checkScroll, 350);
  };

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    container.addEventListener("scroll", checkScroll);
    checkScroll();
    // Calculate number of pages
    const { clientWidth } = container;
    setNumPages(Math.max(1, Math.ceil(courses.length - clientWidth / CARD_WIDTH + 1)));
    return () => container.removeEventListener("scroll", checkScroll);
  }, [courses.length]);

  return (
    <div className="relative flex flex-col items-center w-full">
      {/* Carousel Row */}
      <div className="w-full h-full relative flex items-center">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`absolute left-[-1.5rem] md:left-[-2rem] z-10 p-1.5 md:p-2 rounded-full border transition
                     ${canScrollLeft ? "bg-white hover:bg-primary hover:text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"}
                     hidden md:block`}
        >
          <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
        </button>

        {/* Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar px-4 md:px-8 py-4 w-full"
          style={{ scrollbarWidth: "none" }}
        >
          {courses.map((course, idx) => (
            <div key={idx} className="flex-shrink-0 w-[280px] md:w-[300px]">
              <CourseCard {...course} />
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`absolute right-[-1.5rem] md:right-[-2rem] z-10 p-1.5 md:p-2 rounded-full border transition
                     ${canScrollRight ? "bg-white hover:bg-primary hover:text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"}
                     hidden md:block`}
        >
          <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
        </button>
      </div>
      {/* Carousel Dots */}
      <div className="flex justify-center mt-3 md:mt-4 gap-1.5 md:gap-2">
        {Array.from({ length: numPages }).map((_, i) => (
          <span
            key={i}
            className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-200 ${i === currentPage ? "bg-primary" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
}


