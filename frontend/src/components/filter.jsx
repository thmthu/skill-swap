import { Button } from "@/components/ui/button";

export function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="hidden md:flex flex-wrap justify-center gap-2 md:gap-4 mb-4 md:mb-8">
      {categories.map((cat) => (
        <Button
          key={cat}
          variant="secondary"
          className={`!transition-colors font-heading focus:!outline-none focus:!ring-0 text-btn2 md:text-btn1 ${
            selected === cat
              ? "!bg-primary !text-white hover:!bg-primary-light"
              : "!border-gray-300 !text-gray-600 hover:!bg-gray-100"
          }`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </Button>
      ))}
    </div>
  );
}