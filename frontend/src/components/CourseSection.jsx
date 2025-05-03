import { useState } from "react";
import { allCourses, categories } from "../data/course";
import { CourseCard } from "../components/CourseCard";
import { CategoryFilter } from "../components/filter";
import { Loader2 } from "lucide-react";
import GradientHeading from "../components/Text/GradientHeading";
import { CourseCarousel } from "../components/Carousel";

export default function CourseSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredCourses, setFilteredCourses] = useState(allCourses);
  const [loading, setLoading] = useState(false);

  const handleFilter = (category) => {
    setSelectedCategory(category);
    setLoading(true);
    setTimeout(() => {
      setFilteredCourses(
        category === "All"
          ? allCourses
          : allCourses.filter((course) => course.category === category)
      );
      setLoading(false);
    }, 200);
  };

  return (
    <section className="mb-12">
      <div className="flex justify-center items-center mb-6 md:text-2xl lg:text-3xl">
        <GradientHeading>Popular Courses</GradientHeading>
      </div>

      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={handleFilter}
      />

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : (
        <div className="max-w-[90%] mx-auto">
          <CourseCarousel courses={filteredCourses} />
        </div>
      )}
    </section>
  );
}
