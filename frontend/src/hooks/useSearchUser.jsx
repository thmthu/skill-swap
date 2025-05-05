"use client";

import { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import axios from "axios";
import { API_CONFIG } from "../lib/config";

export function useSearchUser(initialSearch = "", initialSkills = "") {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedSkills, setSelectedSkills] = useState(initialSkills);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = useCallback(async (search, skills) => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_CONFIG.BASE_URL_SOCKET}/api/users/`
      );

      // Use mock data instead of API call
      let filteredUsers = response.data || mockUsers;

      // Filter by search term
      if (search.trim() !== "") {
        filteredUsers = filteredUsers.filter((user) =>
          user.username.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Filter by skills
      if (skills.length > 0) {
        filteredUsers = filteredUsers.filter((user) =>
          skills.some((skill) => user.skills.includes(skill))
        );
      }

      // Map to the expected format
      const mappedUsers = filteredUsers.map((user) => ({
        id: user._id,
        image: user.avatar || "/NAB.png",
        name: user.username,
        tags: user.skills || [],
        department: user.bio || "Unknown Department",
      }));

      setUsers(mappedUsers);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load mentors. Please try again.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedFetch = useCallback(
    debounce((search, skills) => {
      fetchUsers(search, skills);
    }, 500),
    [fetchUsers]
  );

  useEffect(() => {
    debouncedFetch(searchTerm, selectedSkills);

    return () => {
      debouncedFetch.cancel();
    };
  }, [searchTerm, selectedSkills, debouncedFetch]);

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
