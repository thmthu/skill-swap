"use client";

import { Input } from "@/components/ui/input";
import MultipleSelector from "@/components/ui/multiple-selector";
import { useEffect, useState } from "react";
import PreferenceService from "@/services/PreferenceService";

export default function SearchBar({
  value,
  onChange,
  selectedSkills,
  onSkillsChange,
}) {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSkillsDepartment = async () => {
      try {
        setIsLoading(true);
        const { data } = await PreferenceService.getSkillsDepartment();
        setSkills(data["SKILLS"] || []);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSkillsDepartment();
  }, []);

  const OPTIONS = skills.map((skill) => ({
    value: skill,
    label: skill,
  }));

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full">
      {/* Search by name */}
      <div className="flex flex-col w-full">
        <p className="text-sm font-medium text-muted-foreground dark:text-white/80 mb-2">
          Search by Name
        </p>
        <Input
          type="text"
          placeholder="Enter mentor name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-h-[48px] dark:text-white dark:bg-gray-800 dark:border-gray-600"
        />
      </div>

      {/* Filter by skills */}
      <div className="flex flex-col w-full">
        <p className="text-sm font-medium text-muted-foreground dark:text-white/80 mb-2">
          Filter by Skills
        </p>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[48px] border rounded-md dark:border-gray-600">
            <span className="text-sm text-muted-foreground dark:text-white/70">
              Loading skills...
            </span>
          </div>
        ) : (
          <MultipleSelector
            defaultOptions={OPTIONS}
            className="w-full min-h-[48px] dark:text-white dark:bg-gray-800 dark:border-gray-600"
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
              <p className="text-center text-muted-foreground dark:text-white/70">
                {skills.length > 0
                  ? "No matching skills found."
                  : "No skills available."}
              </p>
            }
          />
        )}
      </div>
    </div>
  );
}
