import { useState } from "react";
import { FilterIcon } from "lucide-react";

export default function Filter({ filters = [], selected, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative text-foreground">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:shadow transition"
      >
        <FilterIcon className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium">{selected}</span>
      </button>

      {isOpen && (
        <ul className="absolute mt-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-10">
          {filters.map((item) => (
            <li
              key={item}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                selected === item
                  ? "font-semibold text-primary"
                  : "text-foreground"
              }`}
              onClick={() => {
                onChange(item);
                setIsOpen(false);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
