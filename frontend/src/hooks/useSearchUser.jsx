"use client";

import { useState, useEffect, useCallback } from "react";
import debounce from 'lodash/debounce';
import axios from "@/lib/axiosClient";

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
      const params = new URLSearchParams();

      if (search.trim() !== "") {
        params.append("name", search.trim());
      }

      if (skills.length > 0) {
        params.append("skills", skills.join(","));
      }

      const url = params.toString() ? `/users?${params.toString()}` : `/users`;
      const response = await axios.get(url);
      
      if (Array.isArray(response.data)) {
        const mappedUsers = response.data.map((user) => ({
          id: user._id,
          image: user.ava || "/NAB.png",
          name: user.username,
          tags: user.skills || [],
          department: user.bio || "Unknown Department",
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
