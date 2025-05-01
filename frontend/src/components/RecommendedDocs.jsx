import DocCard from "@/components/docsCard";
import { useState } from "react";
import { CategoryFilter } from "../components/filter";
import GradientHeading from "@/components/Text/GradientHeading";
import { Loader2 } from "lucide-react";


const docCategories = ["All", "Docs", "Tools", "React", "CSS", "Design", "Official"];
const docs = [
  {
    title: "React",
    description: "Build UI with components using the React library.",
    url: "https://react.dev/",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    tags: ["React", "Frontend", "Docs", "Official"]
  },
  {
    title: "TailwindCSS",
    description: "Utility-first CSS framework for rapid UI building.",
    url: "https://tailwindcss.com/docs",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg",
    tags: ["CSS", "Frontend", "Docs", "Official"]
  },
  {
    title: "TypeScript",
    description: "JavaScript with types. Strong tooling and safety.",
    url: "https://www.typescriptlang.org/docs/",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    tags: ["Frontend", "Backend", "Docs", "Official"]
  },
  {
    title: "Shadcn UI",
    description: "Accessible, composable components built with Tailwind.",
    url: "https://ui.shadcn.dev/",
    icon: "https://ui.shadcn.dev/favicon.ico",
    tags: ["UI", "Design", "Tool", "Popular"]
  },
  {
    title: "GitHub Docs",
    description: "Learn Git, version control, and GitHub best practices.",
    url: "https://docs.github.com/",
    icon: "https://github.githubassets.com/favicons/favicon.svg",
    tags: ["Tool", "Docs", "Official"]
  },
  {
    title: "Next.js",
    description: "React framework for building fullstack web apps.",
    url: "https://nextjs.org/docs",
    icon: "https://nextjs.org/static/favicon/favicon.ico",
    tags: ["React", "Fullstack", "Docs", "Popular"]
  }
];


export function RecommendedDocs() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredDocs, setFilteredDocs] = useState(docs);
  const [loading, setLoading] = useState(false);

  const handleFilter = (category) => {
    setSelectedCategory(category);
    setLoading(true);
    setTimeout(() => {
      setFilteredDocs(
        category === "All"
          ? docs
          : docs.filter((doc) => doc.tags?.includes(category))
      );
      setLoading(false);
    }, 400);
  };

  return (
    <section className="max-w-[1280px] mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-4xl font-heading text-center mb-6 text-primary">
        <GradientHeading>Recommended Docs</GradientHeading>
      </h2>

      <CategoryFilter
        categories={docCategories}
        selected={selectedCategory}
        onSelect={handleFilter}
      />

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc, index) => (
            <DocCard key={index} doc={doc} />
          ))}
        </div>
      )}
    </section>
  );
}