import { Button } from "@/components/ui/button";

export function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {categories.map((cat) => (
        <Button
          key={cat}
          className={`transition-colors ${
            selected === cat
              ? "bg-primary text-white hover:bg-primary-dark"
              : "border border-gray-300 text-gray-600 hover:bg-primary-light hover:text-white"
          }`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </Button>
      ))}
    </div>
  );
}
