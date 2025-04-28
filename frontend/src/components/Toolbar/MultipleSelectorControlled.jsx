"use client";

import React, { useState } from "react";
import MultipleSelector from "@/components/ui/multiple-selector"; // No `{ Option }` anymore, just import default

const OPTIONS = [
  { label: "Next.js", value: "nextjs" },
  { label: "React", value: "react" },
  { label: "Remix", value: "remix" },
  { label: "Vite", value: "vite" },
  { label: "Nuxt", value: "nuxt" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular" },
  { label: "Ember", value: "ember" },
  { label: "Gatsby", value: "gatsby" },
  { label: "Astro", value: "astro" },
];

export default function MultipleSelectorControlled() {
  const [value, setValue] = useState([]);

  return (
    <div className="flex w-full flex-col gap-5 px-10">
      <p className="text-primary font-medium">
        Your selection: {value.map((v) => v.label).join(", ") || "None"}
      </p>
      <MultipleSelector
        value={value}
        onChange={setValue}
        defaultOptions={OPTIONS}
        placeholder="Select frameworks you like..."
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-muted-foreground">
            No results found.
          </p>
        }
      />
    </div>
  );
}
