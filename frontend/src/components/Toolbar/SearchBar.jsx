"use client";

import { Input } from "@/components/ui/input";
import MultipleSelector from "@/components/ui/multiple-selector";
import { OPTIONS } from "@/components/ToolBar/skill-options";
import { useEffect, useState } from "react";
import PreferenceService from "@/services/PreferenceService";
// import { Spinner } from "@/components/ui/spinner"; // Giả sử bạn có component Spinner

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
        console.log(data);
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

  console.log("Skills options:", OPTIONS);

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full">
      {/* Search by name */}
      <div className="flex flex-col w-full">
        <p className="text-base font-semibold text-primary-dark dark:text-white mb-2">
          Search by Name
        </p>
        <Input
          type="text"
          placeholder="Enter mentor name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-h-[48px] rounded-md border border-input bg-background px-3 py-2"
        />
      </div>

      {/* Filter by skills */}
      <div className="flex flex-col w-full">
        <p className="text-base font-semibold text-primary-dark dark:text-white mb-2">
          Filter by Skills
        </p>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[48px] border rounded-md">
            <span className="text-sm text-muted-foreground">
              Loading skills...
            </span>
            {/* Hoặc sử dụng component Spinner nếu có */}
          </div>
        ) : (
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
