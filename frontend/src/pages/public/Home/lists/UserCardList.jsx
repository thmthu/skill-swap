"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "@/pages/public/Home/lists/UserCard";
import { API_CONFIG } from "@/lib/config";
import GradientHeading from "@/components/Text/GradientHeading";
import mockUsers from "@/pages/public/Home/lists/mockUsers";
import { UserCardSkeleton } from "@/components/Skeleton/LoadingSkeleton";

import { generateDynamicDescription } from "@/utils/formatSkills";

export default function UserCardList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  //Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("Fetching users...");
        const response = await axios.get(`${API_CONFIG.BASE_URL}/users`);
        console.log("Fetched users:", response.data);

        if (Array.isArray(response.data)) {
          const mappedUsers = response.data.map((user) => ({
            id: user.userId,
            image: "/NAB.png", // static image placeholder
            name: user.username,
            tags: user.teach || [],
            description: generateDynamicDescription(user),
          }));

          setUsers(mappedUsers);
        } else {
          console.error("Unexpected users format:", response.data);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  //   useEffect(() => {
  //     // Simulate async API fetching
  //     const fetchMockUsers = async () => {
  //       try {
  //         console.log("Loading mock users...");
  //         await new Promise((resolve) => setTimeout(resolve, 500)); // simulate 0.5s delay
  //         setUsers(mockUsers);
  //         console.log("Mock users loaded:", mockUsers);
  //       } catch (error) {
  //         console.error("Failed to load mock users:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchMockUsers();
  //   }, []);

  return (
    <section className="py-24 max-w-6xl mx-auto px-6">
      <GradientHeading>Explore Our Mentors</GradientHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 6 placeholder skeletons */}
            {Array.from({ length: 6 }).map((_, index) => (
              <UserCardSkeleton key={index} />
            ))}
          </div>
        ) : users.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.map((user) => (
              <UserCard
                key={user.userId}
                image="/NAB.png"
                name={user.username}
                tags={user.teach || []}
                description={generateDynamicDescription(user)}
              />
            ))}
          </div>
        ) : (
          <div className="col-span-full text-center mt-8 text-body1 font-medium text-text-light dark:text-text-dark">
            No mentors found at the moment.
            <br />
            Please check back later!
          </div>
        )}
      </div>
    </section>
  );
}
