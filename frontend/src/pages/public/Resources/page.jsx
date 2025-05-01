import { useState, useEffect } from "react";
import { CourseCarousel } from "../../../components/Carousel";
import { CategoryFilter } from "../../../components/filter";
import { Loader2 } from "lucide-react";
import GradientHeading from "@/components/Text/GradientHeading";
import { RecommendedDocs } from "@/components/RecommendedDocs";
import { CertificateSection } from "@/pages/public/Resources/CertificateSection";
const allCourses = [
  // UI/UX Design
  { title: "UI/UX Basics", description: "Design fundamentals for beginners.", category: "UI/UX Design", url: "https://www.coursera.org/specializations/ui-ux-design" },
  { title: "Advanced UX Research", description: "Understand user behavior deeply.", category: "UI/UX Design", url: "https://www.coursera.org/learn/user-research" },
  { title: "Interaction Design", description: "Building seamless experiences.", category: "UI/UX Design", url: "https://www.udemy.com/course/interaction-design/" },
  { title: "Wireframing & Prototyping", description: "Create fast design iterations.", category: "UI/UX Design", url: "https://www.udemy.com/course/wireframing-and-prototyping/" },
  { title: "Design Thinking", description: "Solve real-world problems creatively.", category: "UI/UX Design", url: "https://www.coursera.org/learn/uva-darden-design-thinking-innovation" },
  { title: "Accessibility Design", description: "Build inclusive apps and sites.", category: "UI/UX Design", url: "https://www.coursera.org/learn/web-accessibility" },
  { title: "Visual Design Basics", description: "Color, typography, layout.", category: "UI/UX Design", url: "https://www.udemy.com/course/visual-design-principles/" },

  // Frontend
  { title: "React Developer", description: "Learn modern React essentials.", category: "Frontend", url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/" },
  { title: "Next.js Crash Course", description: "Fullstack React with Next.js.", category: "Frontend", url: "https://www.udemy.com/course/nextjs-dev-to-deployment/" },
  { title: "Frontend Developer Basics", description: "HTML, CSS, JavaScript intro.", category: "Frontend", url: "https://www.coursera.org/learn/html-css-javascript-for-web-developers" },
  { title: "TypeScript Fundamentals", description: "Type-safe frontend development.", category: "Frontend", url: "https://www.udemy.com/course/understanding-typescript/" },
  { title: "Responsive Web Design", description: "Master Flexbox and Grid.", category: "Frontend", url: "https://www.udemy.com/course/responsive-web-design/" },
  { title: "Tailwind CSS Mastery", description: "Modern CSS without headache.", category: "Frontend", url: "https://www.udemy.com/course/tailwindcss-from-scratch/" },
  { title: "State Management with Redux", description: "Manage app state properly.", category: "Frontend", url: "https://www.udemy.com/course/redux-tutorial/" },

  // Backend
  { title: "Backend Node.js", description: "Server-side development basics.", category: "Backend", url: "https://www.udemy.com/course/the-complete-nodejs-developer-course-2/" },
  { title: "API Development with Express", description: "Build REST APIs easily.", category: "Backend", url: "https://www.coursera.org/projects/building-restful-apis-with-nodejs-and-express" },
  { title: "MongoDB Essentials", description: "Learn NoSQL databases.", category: "Backend", url: "https://www.udemy.com/course/mongodb-the-complete-developers-guide/" },
  { title: "Authentication & Authorization", description: "Secure your backend.", category: "Backend", url: "https://www.udemy.com/course/nodejs-api-authentication/" },
  { title: "Docker for Developers", description: "Containerize your applications.", category: "Backend", url: "https://www.udemy.com/course/docker-mastery/" },
  { title: "Microservices with Node.js", description: "Modern backend architecture.", category: "Backend", url: "https://www.udemy.com/course/microservices-with-node-js-and-react/" },

  // Program Design
  { title: "Program Management Basics", description: "Intro to managing programs.", category: "Program Design", url: "https://www.coursera.org/specializations/program-management" },
  { title: "Agile Program Design", description: "Scale Agile practices.", category: "Program Design", url: "https://www.coursera.org/learn/agile-development" },
  { title: "Risk Management", description: "Identify and manage risks.", category: "Program Design", url: "https://www.udemy.com/course/risk-management-principles-and-practices/" },
  { title: "Portfolio Management", description: "Prioritize and deliver projects.", category: "Program Design", url: "https://www.coursera.org/learn/portfolio-management" },
  { title: "Communication Strategies", description: "Communicate effectively with stakeholders.", category: "Program Design", url: "https://www.udemy.com/course/communication-strategies/" },
  { title: "Change Management", description: "Lead teams through change.", category: "Program Design", url: "https://www.coursera.org/learn/leading-transformational-change" },
];

const categories = ["All", "UI/UX Design", "Frontend", "Backend", "Program Design"];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredCourses, setFilteredCourses] = useState(allCourses);
  const [loading, setLoading] = useState(false);

  const handleFilter = (category) => {
    setSelectedCategory(category);
    setLoading(true);
    setTimeout(() => {
      if (category === "All") {
        setFilteredCourses(allCourses);
      } else {
        setFilteredCourses(allCourses.filter((course) => course.category === category));
      }
      setLoading(false);
    }, 200); // fake loading time
  };

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16">
      <div className="sticky top-0 z-1 pb-2 mb-4">
        {/* <h1 className="italic font-heading text-primary text-center mb-4 font-bold text-2xl md:text-3xl lg:text-4xl">Popular Courses</h1> */}
        <div className="flex justify-center items-center mb-6 md:text-2xl lg:text-3xl">
          <GradientHeading>Popular Courses</GradientHeading>
        </div>

        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={handleFilter}
        />
      </div>

      <div className="mt-4">
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="max-w-[90%] mx-auto">
            <CourseCarousel courses={filteredCourses} />
          </div>
        )}
      </div>
      <div className="flex justify-center items-center mb-6 md:text-2xl lg:text-3xl">
        {/* <GradientHeading>Recommended Docs</GradientHeading> */}
        <RecommendedDocs />
      </div>
      <div className="flex justify-center items-center mb-6 md:text-2xl lg:text-3xl">
        {/* <GradientHeading>Recommended Certificates</GradientHeading> */}
        <CertificateSection />
      </div>
    </div>

  );
}
