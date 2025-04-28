"use client";

import { Input } from "@/components/ui/input";
import MultipleSelector from "@/components/ui/multiple-selector";

const OPTIONS = [
  { label: "React", value: "react" },
  { label: "Node.js", value: "nodejs" },
  { label: "MongoDB", value: "mongodb" },
  { label: "AWS", value: "aws" },
  { label: "Next.js", value: "nextjs" },
  { label: "Docker", value: "docker" },
  { label: "Python", value: "python" },
];

export default function SearchBar({
  value,
  onChange,
  selectedSkills,
  onSkillsChange,
}) {
  const safeSkills = Array.isArray(selectedSkills) ? selectedSkills : [];

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center w-full">
      {/* Search by name */}
      <div className="w-full max-w-xs">
        <Input
          type="text"
          placeholder="Search mentors by name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      {/* Filter by skills */}
      <div className="w-full max-w-md">
        <MultipleSelector
          defaultOptions={OPTIONS}
          value={safeSkills.map((skill) => ({
            label: skill,
            value: skill,
          }))}
          onChange={(options) =>
            onSkillsChange(options.map((opt) => opt.value))
          }
          placeholder="Filter by skills..."
          emptyIndicator={
            <p className="text-center text-muted-foreground">
              No skills found.
            </p>
          }
        />
      </div>
    </div>
  );
}
