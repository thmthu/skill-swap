"use client";

import { Input } from "@/components/ui/input";
import MultipleSelector from "@/components/ui/multiple-selector";
import { OPTIONS } from "@/components/ToolBar/skill-options";

export default function SearchBar({
  value,
  onChange,
  selectedSkills,
  onSkillsChange,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-8 w-full">
      {/* Search by name */}
      <div className="flex flex-col w-full">
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Search by Name
        </p>
        <Input
          type="text"
          placeholder="Enter mentor name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-h-[48px]"
        />
      </div>

      {/* Filter by skills */}
      <div className="flex flex-col w-full">
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Filter by Skills
        </p>
        <MultipleSelector
          defaultOptions={OPTIONS}
          className="w-full min-h-[48px]"
          value={(Array.isArray(selectedSkills) ? selectedSkills : []).map(
            (skill) => ({
              label: skill,
              value: skill,
            })
          )}
          onChange={(options) =>
            onSkillsChange(options.map((opt) => opt.value))
          }
          placeholder="Select skills..."
          hidePlaceholderWhenSelected={true}
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
