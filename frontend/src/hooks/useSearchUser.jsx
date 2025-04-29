"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { API_CONFIG } from "@/lib/config";
import { generateDynamicDescription } from "@/utils/formatSkills";

export function useSearchUser(initialSearch = "", initialSkills = "") {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedSkills, setSelectedSkills] = useState(initialSkills);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");
        const params = new URLSearchParams();

        if (searchTerm.trim() !== "") {
          params.append("username", searchTerm.trim());
        }

        if (selectedSkills.length > 0) {
          params.append("teach", selectedSkills.join(",")); // e.g., react,mongodb
        }

        const url = params.toString()
          ? `${API_CONFIG.BASE_URL}/users?${params.toString()}`
          : `${API_CONFIG.BASE_URL}/users`;

        const response = await axios.get(url);

        if (Array.isArray(response.data)) {
          const mappedUsers = response.data.map((user) => ({
            id: user.userId,
            image: user.ava, // chỗ này nè
            name: user.username,
            tags: user.teach || [],
            description: generateDynamicDescription(user),
            department: user.department || "Unknown Department",
          }));

          setUsers(mappedUsers);
        } else {
          setUsers([]);
          console.error("Unexpected response format:", response.data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load mentors. Please try again.");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, selectedSkills]);

  return {
    users,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedSkills,
    setSelectedSkills,
  };
}
