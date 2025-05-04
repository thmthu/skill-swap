import DocCard from "@/components/docsCard";
import { useState } from "react";
import { CategoryFilter } from "../components/filter";
import GradientHeading from "@/components/Text/GradientHeading";
import { Loader2 } from "lucide-react";
import { docCategories, docs } from "../data/docs";


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