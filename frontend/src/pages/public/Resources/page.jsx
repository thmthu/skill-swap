import { useState, useEffect } from "react";
import { CourseCarousel } from "../../../components/Carousel";
import { CategoryFilter } from "../../../components/filter";
import { Loader2 } from "lucide-react";
import GradientHeading from "@/components/Text/GradientHeading";
import { RecommendedDocs } from "@/components/RecommendedDocs";
import { CertificateSection } from "@/components/CertificateSection";

const allCourses = [
  // UI/UX Design
  {
    title: "UI/UX Basics",
    description: "Design fundamentals for beginners.",
    category: "UI/UX Design",
    url: "https://www.coursera.org/specializations/ui-ux-design",
    tags: ["Design", "Beginner", "Free"]
  },
  {
    title: "Advanced UX Research",
    description: "Understand user behavior deeply.",
    category: "UI/UX Design",
    url: "https://www.coursera.org/learn/user-research",
    tags: ["Design", "Intermediate", "Free"]
  },
  {
    title: "Interaction Design",
    description: "Building seamless experiences.",
    category: "UI/UX Design",
    url: "https://www.udemy.com/course/interaction-design/",
    tags: ["Design", "Intermediate", "Paid"]
  },
  {
    title: "Wireframing & Prototyping",
    description: "Create fast design iterations.",
    category: "UI/UX Design",
    url: "https://www.udemy.com/course/wireframing-and-prototyping/",
    tags: ["Design", "Beginner", "Paid"]
  },
  {
    title: "Design Thinking",
    description: "Solve real-world problems creatively.",
    category: "UI/UX Design",
    url: "https://www.coursera.org/learn/uva-darden-design-thinking-innovation",
    tags: ["Design", "Beginner", "Free"]
  },
  {
    title: "Accessibility Design",
    description: "Build inclusive apps and sites.",
    category: "UI/UX Design",
    url: "https://www.coursera.org/learn/web-accessibility",
    tags: ["Design", "Frontend", "Free"]
  },
  {
    title: "Visual Design Basics",
    description: "Color, typography, layout.",
    category: "UI/UX Design",
    url: "https://www.udemy.com/course/visual-design-principles/",
    tags: ["Design", "Beginner", "Paid"]
  },

  // Frontend
  {
    title: "React Developer",
    description: "Learn modern React essentials.",
    category: "Frontend",
    url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
    tags: ["React", "Frontend", "Intermediate", "Paid"]
  },
  {
    title: "Next.js Crash Course",
    description: "Fullstack React with Next.js.",
    category: "Frontend",
    url: "https://www.udemy.com/course/nextjs-dev-to-deployment/",
    tags: ["React", "Fullstack", "Frontend", "Intermediate", "Paid"]
  },
  {
    title: "Frontend Developer Basics",
    description: "HTML, CSS, JavaScript intro.",
    category: "Frontend",
    url: "https://www.coursera.org/learn/html-css-javascript-for-web-developers",
    tags: ["Frontend", "Beginner", "Free"]
  },
  {
    title: "TypeScript Fundamentals",
    description: "Type-safe frontend development.",
    category: "Frontend",
    url: "https://www.udemy.com/course/understanding-typescript/",
    tags: ["TypeScript", "Frontend", "Intermediate", "Paid"]
  },
  {
    title: "Responsive Web Design",
    description: "Master Flexbox and Grid.",
    category: "Frontend",
    url: "https://www.udemy.com/course/responsive-web-design/",
    tags: ["CSS", "Frontend", "Beginner", "Paid"]
  },
  {
    title: "Tailwind CSS Mastery",
    description: "Modern CSS without headache.",
    category: "Frontend",
    url: "https://www.udemy.com/course/tailwindcss-from-scratch/",
    tags: ["CSS", "Tailwind", "Frontend", "Paid"]
  },
  {
    title: "State Management with Redux",
    description: "Manage app state properly.",
    category: "Frontend",
    url: "https://www.udemy.com/course/redux-tutorial/",
    tags: ["React", "Redux", "Frontend", "Paid"]
  },

  // Backend
  {
    title: "Backend Node.js",
    description: "Server-side development basics.",
    category: "Backend",
    url: "https://www.udemy.com/course/the-complete-nodejs-developer-course-2/",
    tags: ["Node.js", "Backend", "Intermediate", "Paid"]
  },
  {
    title: "API Development with Express",
    description: "Build REST APIs easily.",
    category: "Backend",
    url: "https://www.coursera.org/projects/building-restful-apis-with-nodejs-and-express",
    tags: ["Backend", "Express", "Free"]
  },
  {
    title: "MongoDB Essentials",
    description: "Learn NoSQL databases.",
    category: "Backend",
    url: "https://www.udemy.com/course/mongodb-the-complete-developers-guide/",
    tags: ["Backend", "Database", "Paid"]
  },
  {
    title: "Authentication & Authorization",
    description: "Secure your backend.",
    category: "Backend",
    url: "https://www.udemy.com/course/nodejs-api-authentication/",
    tags: ["Backend", "Security", "Paid"]
  },
  {
    title: "Docker for Developers",
    description: "Containerize your applications.",
    category: "Backend",
    url: "https://www.udemy.com/course/docker-mastery/",
    tags: ["DevOps", "Backend", "Tool", "Paid"]
  },
  {
    title: "Microservices with Node.js",
    description: "Modern backend architecture.",
    category: "Backend",
    url: "https://www.udemy.com/course/microservices-with-node-js-and-react/",
    tags: ["Node.js", "Backend", "Microservices", "Paid"]
  },

  // Program Design
  {
    title: "Program Management Basics",
    description: "Intro to managing programs.",
    category: "Program Design",
    url: "https://www.coursera.org/specializations/program-management",
    tags: ["Program", "Beginner", "Free"]
  },
  {
    title: "Agile Program Design",
    description: "Scale Agile practices.",
    category: "Program Design",
    url: "https://www.coursera.org/learn/agile-development",
    tags: ["Agile", "Program", "Free"]
  },
  {
    title: "Risk Management",
    description: "Identify and manage risks.",
    category: "Program Design",
    url: "https://www.udemy.com/course/risk-management-principles-and-practices/",
    tags: ["Program", "Management", "Paid"]
  },
  {
    title: "Portfolio Management",
    description: "Prioritize and deliver projects.",
    category: "Program Design",
    url: "https://www.coursera.org/learn/portfolio-management",
    tags: ["Project", "Program", "Free"]
  },
  {
    title: "Communication Strategies",
    description: "Communicate effectively with stakeholders.",
    category: "Program Design",
    url: "https://www.udemy.com/course/communication-strategies/",
    tags: ["Communication", "Program", "Paid"]
  },
  {
    title: "Change Management",
    description: "Lead teams through change.",
    category: "Program Design",
    url: "https://www.coursera.org/learn/leading-transformational-change",
    tags: ["Leadership", "Program", "Free"]
  }
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
      <section className="">
        <div className="flex justify-center items-center mb-6 md:text-2xl lg:text-3xl">
        </div>
        <RecommendedDocs />
      </section>
      <section className="mb-0.5">
        <div className="flex justify-center items-center mb-6 md:text-2xl lg:text-3xl">
        </div>
        <CertificateSection />
      </section>
    </div>

  );
}
