"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_CONFIG } from "@/lib/config";
import { generateDynamicDescription } from "@/utils/formatSkills"; // <--- Don't forget

export default function SearchBar({ onResultsUpdate }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.trim() === "") return;

    const timeoutId = setTimeout(async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.BASE_URL}/users?username=${encodeURIComponent(
            searchTerm
          )}`
        );

        if (Array.isArray(response.data)) {
          const mappedSearchUsers = response.data.map((user) => ({
            id: user.userId,
            image: "/NAB.png",
            name: user.username,
            tags: user.teach || [],
            description: generateDynamicDescription(user),
          }));

          onResultsUpdate(mappedSearchUsers);
        } else {
          console.error("Unexpected search response format", response.data);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, onResultsUpdate]);

  return (
    <div className="w-full max-w-sm">
      <Input
        type="text"
        placeholder="Search mentors by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
