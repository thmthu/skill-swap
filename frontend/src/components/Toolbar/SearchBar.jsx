"use client";

import { Input } from "@/components/ui/input";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="w-full max-w-sm">
      <Input
        type="text"
        placeholder="Search mentors by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
