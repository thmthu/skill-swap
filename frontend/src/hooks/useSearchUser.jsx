"use client";

import { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";

const mockUsers = [
  {
    _id: "1",
    avatar: "/NAB.png",
    username: "Jenny Tran",
    skills: ["Product", "Management"],
    bio: "Product Management",
  },
  {
    _id: "2",
    avatar: "/NAB.png",
    username: "David Nguyen",
    skills: ["Engineering", "Cloud", "DevOps", "Kubernetes"],
    bio: "Cloud Architecture",
  },
  {
    _id: "3",
    avatar: "/NAB.png",
    username: "Sarah Lee",
    skills: [
      "UX/UI",
      "Accessibility",
      "Design Research",
      "Prototyping",
      "Design Systems",
    ],
    bio: "UX Design",
  },
  {
    _id: "4",
    avatar: "/NAB.png",
    username: "Alex Kim",
    skills: [
      "React",
      "Node.js",
      "TypeScript",
      "Microservice Architecture",
      "AWS",
      "Agile",
    ],
    bio: "Full Stack Engineering",
  },
  {
    _id: "5",
    avatar: "/NAB.png",
    username: "Minh Tran",
    skills: [
      "Leadership",
      "Growth",
      "Learning",
      "Mentorship",
      "Inspiration",
      "Motivation",
    ],
    bio: "Leadership Coach",
  },
  {
    _id: "6",
    avatar: "/NAB.png",
    username: "Ella Dang",
    skills: ["C++", "C", "Java", "Python", "Swift", "Kotlin"],
    bio: "Mobile Developer",
  },
  {
    _id: "7",
    avatar: "/NAB.png",
    username: "Thomas Vu",
    skills: [
      "Enterprise Systems",
      "SAP",
      "ERP",
      "Business Analysis",
      "Technical Documentation",
      "Stakeholder Engagement",
    ],
    bio: "Enterprise Solutions Consultant",
  },
  {
    _id: "8",
    avatar: "/NAB.png",
    username: "Nina Ha",
    skills: [
      "Cybersecurity",
      "Risk Management",
      "Network Security",
      "Penetration Testing",
      "SOC Analysis",
      "Compliance Audits",
    ],
    bio: "Cybersecurity Analyst",
  },
  {
    _id: "9",
    avatar: "/NAB.png",
    username: "Daniel Lee",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Model Optimization",
      "TensorFlow",
      "PyTorch",
      "Natural Language Processing",
    ],
    bio: "AI Research Engineer",
  },
  {
    _id: "10",
    avatar: "/NAB.png",
    username: "Linh Pham",
    skills: [
      "Digital Marketing",
      "SEO",
      "SEM",
      "Content Strategy",
      "Email Campaigns",
      "Analytics",
    ],
    bio: "Digital Marketing Strategist",
  },
];

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

      // Use mock data instead of API call
      let filteredUsers = [...mockUsers];

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
